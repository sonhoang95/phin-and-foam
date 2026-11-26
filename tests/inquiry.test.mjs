import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../lib/inquiry.ts";
import { handleInquiry } from "../lib/server/inquiry-handler.ts";
const valid = {
  name: "Test Guest",
  email: "guest@example.com",
  phone: "",
  organization: "",
  eventType: "Birthday or celebration",
  date: "2099-12-05",
  startTime: "10:00",
  endTime: "15:00",
  location: "North Austin",
  guests: "40",
  access: "Private",
  payment: "Host-sponsored",
  setting: "Indoor",
  power: "Yes",
  notes: "Test inquiry only",
  consent: true,
  website: "",
  submissionId: "12345678-1234-1234-1234-123456789012",
};
let count = 0;
function request(data = valid, options = {}) {
  return new Request("https://phinandfoam.example/api/inquiries", {
    method: "POST",
    headers: {
      origin: "https://phinandfoam.example",
      "content-type": "application/json",
      "x-vercel-forwarded-for": `test-${++count}`,
      ...options.headers,
    },
    body: options.body ?? JSON.stringify(data),
  });
}
const config = {
  enabled: true,
  apiKey: "test-key",
  from: "Phin & Foam <events@example.com>",
  vercel: true,
};
const forbidden = async () => {
  throw new Error("Provider must not be called");
};
test("validation accepts estimates and optional blank fields", () =>
  assert.deepEqual(validateInquiry(valid).errors, {}));
test("validation rejects invalid dates, emails, counts, header injection, and missing consent", () => {
  for (const patch of [
    { date: "2026-02-30" },
    { date: "2000-01-01" },
    { email: "x@example.com\r\nBcc: other@example.com" },
    { name: "Name\nInjected" },
    { guests: "0" },
    { guests: "1.5" },
    { guests: "Infinity" },
    { eventType: "not listed" },
    { consent: false },
    { notes: "x".repeat(3001) },
  ])
    assert.ok(
      Object.keys(validateInquiry({ ...valid, ...patch }).errors).length,
      JSON.stringify(patch),
    );
});
test("rejects cross-origin requests, oversized bodies, malformed JSON, and spam without sending", async () => {
  assert.equal(
    (
      await handleInquiry(
        request(valid, { headers: { origin: "https://other.example" } }),
        config,
        forbidden,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await handleInquiry(
        request(valid, { body: "x".repeat(16001) }),
        config,
        forbidden,
      )
    ).status,
    413,
  );
  assert.equal(
    (await handleInquiry(request(valid, { body: "{" }), config, forbidden))
      .status,
    400,
  );
  assert.equal(
    (
      await handleInquiry(
        request({ ...valid, website: "spam" }),
        config,
        forbidden,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await handleInquiry(
        request({ ...valid, email: "invalid" }),
        config,
        forbidden,
      )
    ).status,
    422,
  );
});
test("placeholder/disabled configuration never sends", async () => {
  assert.equal(
    (await handleInquiry(request(), { ...config, enabled: false }, forbidden))
      .status,
    503,
  );
  assert.equal(
    (
      await handleInquiry(
        request(),
        { ...config, apiKey: undefined },
        forbidden,
      )
    ).status,
    503,
  );
});
test("provider submission uses fixed recipient, reply-to, plain text, and stable idempotency", async () => {
  const calls = [];
  const send = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return Response.json({ id: "test-email" });
  };
  assert.equal((await handleInquiry(request(), config, send)).status, 200);
  await handleInquiry(request(), config, send);
  assert.deepEqual(calls[0].body.to, ["phinandfoam@gmail.com"]);
  assert.equal(calls[0].body.reply_to, valid.email);
  assert.ok(calls[0].body.text.includes("North Austin"));
  assert.equal(calls[0].body.html, undefined);
  assert.equal(
    calls[0].init.headers["Idempotency-Key"],
    calls[1].init.headers["Idempotency-Key"],
  );
  await handleInquiry(
    request({ ...valid, notes: "Changed details" }),
    config,
    send,
  );
  assert.notEqual(
    calls[0].init.headers["Idempotency-Key"],
    calls[2].init.headers["Idempotency-Key"],
  );
});
test("provider failures and timeouts are never reported as success", async () => {
  for (const send of [
    async () => Response.json({ error: "no domain" }, { status: 403 }),
    async () => {
      throw new Error("timeout");
    },
    async () => Response.json({}),
  ]) {
    const res = await handleInquiry(request(), config, send);
    assert.equal(res.status, 502);
    assert.equal((await res.json()).ok, undefined);
  }
});
test("repeated requests are throttled", async () => {
  const options = { headers: { "x-vercel-forwarded-for": "same-test-client" } };
  for (let i = 0; i < 5; i++)
    assert.equal(
      (await handleInquiry(request({}, options), config, forbidden)).status,
      422,
    );
  assert.equal(
    (await handleInquiry(request({}, options), config, forbidden)).status,
    429,
  );
});

test("honors the incoming host when Next normalizes the internal request URL", async () => {
  const req = new Request("http://localhost:3000/api/inquiries", {
    method: "POST",
    headers: {
      origin: "http://127.0.0.1:3000",
      host: "127.0.0.1:3000",
      "content-type": "application/json",
      "x-vercel-forwarded-for": "proxy-test",
    },
    body: JSON.stringify(valid),
  });
  assert.equal(
    (await handleInquiry(req, { ...config, enabled: false }, forbidden)).status,
    503,
  );
});
