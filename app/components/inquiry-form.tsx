"use client";

import { useRef, useState } from "react";
import {
  centralToday,
  inquiryFields,
  validateInquiry,
  type FieldErrors,
} from "@/lib/inquiry";
import { shop } from "@/lib/content";

const groups = [
  {
    id: "contact",
    title: "01 / A little about you",
    description: "Who should we say hello to?",
  },
  {
    id: "event",
    title: "02 / Your gathering",
    description:
      "An estimate is perfect. Leave times blank if you’re still planning.",
  },
  {
    id: "setup",
    title: "03 / The little details",
    description:
      "Optional, but helpful. We’ll talk through what’s possible together.",
  },
];

export function InquiryForm({ enabled }: { enabled: boolean }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const submissionId = useRef("");
  const busy = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !enabled) return;
    const form = event.currentTarget;
    const input = Object.fromEntries(new FormData(form));
    const payload = { ...input, consent: input.consent === "on" };
    const result = validateInquiry(payload);
    setErrors(result.errors);
    setMessage("");
    if (Object.keys(result.errors).length) {
      const name = Object.keys(result.errors)[0];
      (form.elements.namedItem(name) as HTMLElement | null)?.focus();
      return;
    }
    busy.current = true;
    setState("sending");
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const body = await response.json();
      if (!response.ok || !body.ok) {
        setErrors(body.fields || {});
        setMessage(
          body.error ||
            "We couldn’t send your inquiry. Please try again or email us.",
        );
        setState("idle");
      } else {
        setState("sent");
        form.reset();
      }
    } catch {
      setMessage(
        "We couldn’t confirm your submission. Your details are still here. Please retry, or email us if the problem continues.",
      );
      setState("idle");
    } finally {
      busy.current = false;
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }

  if (state === "sent")
    return (
      <div
        className="inquiry-feedback success"
        tabIndex={-1}
        ref={feedback}
        role="status"
      >
        <h3>Thanks for thinking of us!</h3>
        <p>
          Your inquiry is on its way to Son & Tina. We’ll follow up at the email
          address you shared to talk through your event.
        </p>
        <p>
          This is an inquiry, not a confirmed booking. We’ll confirm
          availability and details with you.
        </p>
      </div>
    );

  return (
    <form
      className="inquiry-form"
      onSubmit={submit}
      noValidate
      aria-busy={state === "sending"}
    >
      {!enabled && (
        <div className="inquiry-feedback" role="status">
          <strong>Our inquiry form is opening soon.</strong>
          <p>
            Online submissions aren’t available yet. For now, reach Son & Tina
            at <a href={`mailto:${shop.contactEmail}`}>{shop.contactEmail}</a>.
          </p>
        </div>
      )}
      <p className="form-intro">
        Fields marked * are required. Everything else can wait until we chat.
      </p>
      {groups.map((group) => (
        <fieldset key={group.id} disabled={state === "sending"}>
          <legend>{group.title}</legend>
          <p className="fieldset-intro">{group.description}</p>
          <div className="inquiry-grid">
            {inquiryFields
              .filter((field) => field.group === group.id)
              .map((field) => {
                const id = `inquiry-${field.name}`;
                const shared = {
                  id,
                  name: field.name,
                  required: field.required,
                  "aria-invalid": !!errors[field.name],
                  "aria-describedby": errors[field.name]
                    ? `${id}-error`
                    : field.name === "notes"
                      ? "notes-help"
                      : undefined,
                };
                return (
                  <div
                    className={
                      field.type === "textarea"
                        ? "form-field full-width"
                        : "form-field"
                    }
                    key={field.name}
                  >
                    <label htmlFor={id}>
                      {field.label}
                      {field.required ? " *" : ""}
                    </label>
                    {field.type === "select" ? (
                      <select {...shared} defaultValue="">
                        <option value="">
                          {field.required
                            ? "Choose one…"
                            : "Select if you know…"}
                        </option>
                        {field.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea {...shared} rows={4} maxLength={field.max} />
                    ) : (
                      <input
                        {...shared}
                        type={field.type}
                        maxLength={"max" in field ? field.max : undefined}
                        autoComplete={
                          "autoComplete" in field
                            ? field.autoComplete
                            : undefined
                        }
                        min={
                          field.type === "date"
                            ? centralToday()
                            : field.type === "number"
                              ? 1
                              : undefined
                        }
                        max={field.type === "number" ? 10000 : undefined}
                        step={field.type === "number" ? 1 : undefined}
                      />
                    )}
                    {field.name === "notes" && (
                      <p className="field-help" id="notes-help">
                        Share your ideas, setup questions, or dietary
                        accommodations you’d like to discuss. Please avoid
                        sensitive personal details.
                      </p>
                    )}
                    {errors[field.name] && (
                      <p className="field-error" id={`${id}-error`}>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </fieldset>
      ))}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="inquiry-website">Leave this field empty</label>
        <input
          id="inquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="inquiry-consent">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={state === "sending"}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          Phin & Foam may contact me about this inquiry. No marketing emails.
          {"\u00a0"}
          <span className="consent-required" aria-hidden="true">
            *
          </span>
        </span>
      </label>
      {errors.consent && (
        <p className="field-error" id="consent-error">
          {errors.consent}
        </p>
      )}
      {message && (
        <div
          className="inquiry-feedback form-error"
          role="alert"
          tabIndex={-1}
          ref={feedback}
        >
          {message}{" "}
          <a href={`mailto:${shop.contactEmail}`}>Email us instead ↗</a>
        </div>
      )}
      <button
        className="button inquiry-submit"
        type="submit"
        disabled={!enabled || state === "sending"}
      >
        {state === "sending" ? "Sending your inquiry…" : "Send event inquiry"}
        <span aria-hidden="true">↗</span>
      </button>
      <noscript>
        <p>
          Please enable JavaScript to use this form, or email{" "}
          {shop.contactEmail}.
        </p>
      </noscript>
    </form>
  );
}
