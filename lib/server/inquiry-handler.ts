import { createHash } from "node:crypto";
import { inquiryFields, validateInquiry } from "../inquiry.ts";

const unavailable =
  "The inquiry form isn’t available right now. Please email phinandfoam@gmail.com; your details have not been sent.";
const attempts = new Map<string, { count: number; expires: number }>();
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// Best-effort per-instance throttling. Use Vercel WAF rate limiting for a shared production limit.
function rateLimited(key: string) {
  const now = Date.now();
  for (const [ip, entry] of attempts)
    if (entry.expires <= now) attempts.delete(ip);
  const entry = attempts.get(key);
  if (entry) return ++entry.count > 5;
  if (attempts.size >= 5000) return true;
  attempts.set(key, { count: 1, expires: now + 15 * 60 * 1000 });
  return false;
}

export async function handleInquiry(
  request: Request,
  config: {
    enabled: boolean;
    apiKey?: string;
    from?: string;
    vercel?: boolean;
  },
  send: typeof fetch = fetch,
) {
  // Next may normalize request.url to localhost behind its local server/proxy.
  // Compare the browser's Origin with the actual incoming Host instead.
  let sameOrigin = false;
  try {
    const origin = new URL(request.headers.get("origin") || "");
    const host = request.headers.get("host") || new URL(request.url).host;
    sameOrigin =
      ["http:", "https:"].includes(origin.protocol) && origin.host === host;
  } catch {
    /* Missing or malformed Origin is rejected. */
  }
  if (!sameOrigin)
    return json({ error: "Please submit the form from our website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Please submit the website form." }, 415);
  const ip = config.vercel
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    : "local";
  if (rateLimited(ip))
    return json(
      {
        error:
          "Too many attempts. Please wait 15 minutes or email phinandfoam@gmail.com.",
      },
      429,
    );
  let input: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Please complete the form." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return json(
          {
            error: "Your message is too long. Please shorten it and try again.",
          },
          413,
        );
      }
      chunks.push(value);
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    input = parsed;
  } catch {
    return json({ error: "We couldn’t read the form. Please try again." }, 400);
  }
  if (input.website)
    return json(
      { error: "We couldn’t accept this submission. Please email us instead." },
      400,
    );
  const { data, errors } = validateInquiry(input);
  if (Object.keys(errors).length)
    return json(
      { error: "Please check the highlighted fields.", fields: errors },
      422,
    );
  if (
    typeof input.submissionId !== "string" ||
    !/^[0-9a-f-]{36}$/i.test(input.submissionId)
  )
    return json({ error: "Please refresh the page and try again." }, 400);
  if (!config.enabled || !config.apiKey || !config.from)
    return json({ error: unavailable }, 503);
  const text = [
    "New Phin & Foam event inquiry",
    "Reply to this email to reach the customer.",
    "Times are in America/Chicago. If the end time is earlier than the start time, confirm whether this is an overnight event.",
    ...inquiryFields.map(
      (field) => `${field.label}: ${data[field.name] || "Not provided"}`,
    ),
    "Customer agreed to be contacted about this inquiry. This is not a confirmed booking.",
  ].join("\n\n");
  const digest = createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry/${input.submissionId}/${digest}`,
      },
      body: JSON.stringify({
        from: config.from,
        to: ["phinandfoam@gmail.com"],
        reply_to: data.email,
        subject: `Event inquiry · ${data.eventType} · ${data.date}`,
        text,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return json(
        {
          error:
            "We couldn’t send your inquiry. Your details are still here—please try again or email phinandfoam@gmail.com.",
        },
        502,
      );
    const result = await response.json();
    if (!result.id) throw new Error();
    return json({ ok: true });
  } catch {
    return json(
      {
        error:
          "We couldn’t confirm your submission. Please retry with the same details, or email phinandfoam@gmail.com.",
      },
      502,
    );
  }
}
