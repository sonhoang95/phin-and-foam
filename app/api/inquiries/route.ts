import { handleInquiry } from "@/lib/server/inquiry-handler";

export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleInquiry(request, {
    enabled: process.env.INQUIRY_EMAIL_ENABLED === "true",
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM,
    vercel: process.env.VERCEL === "1",
  });
}
