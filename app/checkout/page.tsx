import Image from "next/image";
import { Header, Footer } from "../components/brand";
import { KitOrder } from "../components/kit-order";
import { shop } from "@/lib/content";
export const metadata = { title: "First Pour Kit | Phin & Foam" };
export default function Checkout() {
  return (
    <>
      <Header active="checkout" />
      <main id="main" className="wrap checkout-page">
        <div className="checkout-intro">
          <p className="eyebrow">YOUR FIRST POUR STARTS HERE</p>
          <h1>
            Make Vietnamese
            <br />
            coffee <em>at home.</em>
          </h1>
          <p className="lead">
            Our bold House Blend, a traditional phin, and everything you need to
            brew your first cup.
          </p>
        </div>
        <div className="checkout-grid">
          <div>
            <div className="kit-photo">
              <Image
                src="/images/first-pour-kit-kraft.png"
                alt="Illustrative First Pour Kit: House Blend coffee in a kraft paper bag with a peel-and-stick label and a stainless steel phin, styled with a glass and brew card"
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                preload
              />
              <span className="photo-badge">
                YOUR NEW
                <br />
                DAILY RITUAL ✳
              </span>
            </div>
            <p className="photo-note">
              Illustrative kit photo. Final contents and photography coming
              soon; glass and styling props are not confirmed inclusions.
            </p>
            <div className="included">
              <p className="eyebrow">A SMALL KIT. A WHOLE NEW RITUAL.</p>
              <h2>Good things inside.</h2>
              <ul>
                <li>
                  <span>01</span>
                  <div>
                    <h4>House Blend · 12 oz (340 g)</h4>
                    <p>Dark chocolate. Toasted nuts. Smooth finish.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h4>A traditional Vietnamese phin</h4>
                    <p>Slow coffee, simply made. No paper filters needed.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h4>Your digital brew guide</h4>
                    <p>A little guidance for your first cup, and the next.</p>
                  </div>
                </li>
              </ul>
              <small>
                Proposed kit contents · final inclusions to be confirmed. Water,
                milk, ice, and glassware supplied by you.
              </small>
            </div>
          </div>
          <div className="checkout-right">
            <div className="product-title">
              <span className="pill">
                {shop.availability === "sold-out"
                  ? "FIRST DROP · SOLD OUT"
                  : `FIRST DROP · ONLY ${shop.batchSize} AVAILABLE AT LAUNCH`}
              </span>
              <h2>The First Pour Kit</h2>
              <p>Bold flavor. Good beginnings.</p>
              <div className="price">
                $39 <small>ONE KIT. YOUR NEW COFFEE RITUAL.</small>
              </div>
            </div>
            <KitOrder />
            <div className="checkout-faq">
              <details>
                <summary>
                  Coffee & label information <span>+</span>
                </summary>
                <p>
                  House Blend · 100% coffee · net wt. 12 oz (340 g).
                  Ingredients: roasted coffee beans. “Dark chocolate” and
                  “toasted nuts” describe tasting notes, not added ingredients.
                </p>
                <p>
                  Packaged by Phin & Foam Coffee LLC, Austin, TX. DSHS CFPO ID:
                  #20181 (as supplied on your label). Store in a cool, dry place
                  and seal tightly after opening. See the package for roast
                  date.
                </p>
                <p className="disclosure">
                  THIS PRODUCT WAS PRODUCED IN A PRIVATE RESIDENCE THAT IS NOT
                  SUBJECT TO GOVERNMENTAL LICENSING OR INSPECTION.
                </p>
                <p>
                  Label information is reproduced from the supplied artwork and
                  awaits final seller verification.
                </p>
                <div className="label-links">
                  <a
                    href="/images/front-label.png"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View front label ↗
                  </a>
                  <a
                    href="/images/back-label.png"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View back label ↗
                  </a>
                </div>
              </details>
              <details>
                <summary>
                  Cancellation & refunds <span>+</span>
                </summary>
                <p>
                  Policy coming before orders open. The cancellation cutoff,
                  refund eligibility, missed-pickup handling, and refund timing
                  will be shown here before you can pay.
                </p>
              </details>
              <details>
                <summary>
                  A question before your first pour? <span>+</span>
                </summary>
                <p>
                  Find us on{" "}
                  <a href={shop.instagram} target="_blank" rel="noreferrer">
                    Instagram @phinandfoam ↗
                  </a>
                  .
                </p>
                <p>
                  {shop.contactEmail ? (
                    <a href={`mailto:${shop.contactEmail}`}>
                      {shop.contactEmail}
                    </a>
                  ) : (
                    "Order support email coming before launch."
                  )}
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
