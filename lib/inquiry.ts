export const inquiryFields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    required: true,
    max: 100,
    autoComplete: "name",
    group: "contact",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
    max: 254,
    autoComplete: "email",
    group: "contact",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    required: false,
    max: 40,
    autoComplete: "tel",
    group: "contact",
  },
  {
    name: "organization",
    label: "Company or organization",
    type: "text",
    required: false,
    max: 150,
    autoComplete: "organization",
    group: "contact",
  },
  {
    name: "eventType",
    label: "What are you planning?",
    type: "select",
    required: true,
    options: [
      "Wedding or wedding weekend",
      "Birthday or celebration",
      "Baby or bridal shower",
      "Office or team event",
      "Market or community event",
      "Shop pop-up",
      "Something else",
    ],
    group: "event",
  },
  {
    name: "date",
    label: "Event date",
    type: "date",
    required: true,
    group: "event",
  },
  {
    name: "startTime",
    label: "Start time (Central)",
    type: "time",
    required: false,
    group: "event",
  },
  {
    name: "endTime",
    label: "End time (Central)",
    type: "time",
    required: false,
    group: "event",
  },
  {
    name: "location",
    label: "Venue or area / city",
    type: "text",
    required: true,
    max: 300,
    group: "event",
  },
  {
    name: "guests",
    label: "Estimated guest count",
    type: "number",
    required: true,
    group: "event",
  },
  {
    name: "access",
    label: "Public or private?",
    type: "select",
    required: false,
    options: ["Public", "Private", "Not sure yet"],
    group: "setup",
  },
  {
    name: "payment",
    label: "Who would cover the coffee?",
    type: "select",
    required: false,
    options: [
      "Host-sponsored",
      "Guests purchase their own",
      "A mix of both",
      "Let’s talk through it",
    ],
    group: "setup",
  },
  {
    name: "setting",
    label: "Indoor or outdoor?",
    type: "select",
    required: false,
    options: ["Indoor", "Outdoor", "Both", "Not sure yet"],
    group: "setup",
  },
  {
    name: "power",
    label: "Power outlet near the setup?",
    type: "select",
    required: false,
    options: ["Yes", "No", "Not sure yet"],
    group: "setup",
  },
  {
    name: "notes",
    label: "Anything else we should know?",
    type: "textarea",
    required: false,
    max: 3000,
    group: "setup",
  },
] as const;
export type InquiryName = (typeof inquiryFields)[number]["name"];
export type Inquiry = Record<InquiryName, string>;
export type FieldErrors = Partial<Record<InquiryName | "consent", string>>;

export function centralToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function validateInquiry(
  input: unknown,
  today = centralToday(),
): { data: Inquiry; errors: FieldErrors } {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const data = {} as Inquiry;
  const errors: FieldErrors = {};
  for (const field of inquiryFields) {
    const raw = source[field.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    data[field.name] = value;
    if (raw !== undefined && typeof raw !== "string")
      errors[field.name] = "Please enter a valid value.";
    else if (field.required && !value)
      errors[field.name] = "Please fill this in.";
    else if (value && "max" in field && value.length > field.max)
      errors[field.name] = `Please use ${field.max} characters or fewer.`;
    else if (field.type !== "textarea" && /[\r\n\x00-\x1f\x7f]/.test(value))
      errors[field.name] = "Please use a single line of text.";
    else if (
      value &&
      "options" in field &&
      !(field.options as readonly string[]).includes(value)
    )
      errors[field.name] = "Please choose one of the listed options.";
  }
  if (data.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (data.phone && !/^[+()\d\s.\-]{7,40}$/.test(data.phone))
    errors.phone = "Please enter a valid phone number.";
  if (
    data.date &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      !Number.isFinite(Date.parse(data.date)) ||
      new Date(data.date).toISOString().slice(0, 10) !== data.date ||
      data.date < today)
  )
    errors.date = "Choose today or a future date.";
  for (const key of ["startTime", "endTime"] as const)
    if (data[key] && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data[key]))
      errors[key] = "Please enter a valid time.";
  if (
    data.guests &&
    (!/^\d{1,5}$/.test(data.guests) ||
      Number(data.guests) < 1 ||
      Number(data.guests) > 10000)
  )
    errors.guests = "Enter an estimate between 1 and 10,000.";
  if (source.consent !== true)
    errors.consent = "Please agree so we can follow up about your event.";
  return { data, errors };
}
