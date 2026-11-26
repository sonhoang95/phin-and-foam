import Link from "next/link";
import { Header, Footer } from "../components/brand";
import { InquiryForm } from "../components/inquiry-form";
import { shop } from "@/lib/content";

export const metadata = {
  title: "Plan Your Event | Phin & Foam",
  description:
    "Bring a little Vietnamese coffee to your Austin gathering. Tell Son and Tina about your event, guest count, and plans.",
};

export default function InquiryPage() {
  return (
    <>
      <Header />
      <main id="main" className="wrap section inquiry-page">
        <Link className="text-link" href="/">
          ← Back to Phin & Foam
        </Link>
        <div className="inquiry-page-heading">
          <p className="eyebrow">YOUR PEOPLE. OUR COFFEE.</p>
          <h1>
            Let’s plan
            <br />
            <em>something good.</em>
          </h1>
          <p className="lead">
            Hey! Tell us what you’re planning—we’d love to bring the coffee. —
            Son & Tina
          </p>
        </div>
        <section className="inquiry-card" aria-label="Event inquiry form">
          <InquiryForm
            enabled={
              process.env.INQUIRY_EMAIL_ENABLED === "true" &&
              !!process.env.RESEND_API_KEY &&
              !!process.env.EMAIL_FROM
            }
          />
        </section>
        <p className="inquiry-page-footer">
          Have a question first? Say hello at{" "}
          <a href={`mailto:${shop.contactEmail}`}>{shop.contactEmail}</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
