import Image from "next/image";
import { Footer, Header, Phin } from "./components/brand";
import { eventInquiry, nextDrop, shop } from "@/lib/content";

export const metadata = {
  title: "Phin & Foam | Coffee Drops, Pop-Ups & Catering in Austin",
  description:
    "Slow drip. Big mood. Find our next North Austin coffee pickup, follow our pop-ups, or invite Phin & Foam to your next celebration. Meet Son and Tina, the people behind the coffee.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="wrap hero">
          <div className="hero-copy">
            <p className="eyebrow">VIETNAMESE ROOTS. A LITTLE ATX SOUL.</p>
            <h1>
              Slow drip.
              <br />
              <em>Big mood.</em>
            </h1>
            <p className="lead">
              Your North Austin coffee stop, with Vietnamese roots. Bold coffee,
              a slow drip, and time to catch up. Swing by on your weekend rounds
              or bring us along for your next get-together.
            </p>
            <div className="hero-actions">
              <a className="button" href="#upcoming">
                Find our next stop <span>↓</span>
              </a>
              <a className="text-link" href="#events">
                Bring us to your event ↗
              </a>
            </div>
            <p className="hero-footnote">
              VIETNAMESE ROOTS · NORTH AUSTIN, TEXAS
            </p>
          </div>
          <figure className="hero-photo">
            <Image
              src="/images/people/son-and-tina.webp"
              alt="Son and Tina smiling together with a Phin & Foam coffee"
              width={1400}
              height={1400}
              sizes="(max-width: 700px) 100vw, 50vw"
              preload
            />
            <figcaption>Hi, we’re Son & Tina. See you over coffee.</figcaption>
          </figure>
        </section>
        <div className="values-strip">
          <span>COFFEE DROPS</span>
          <b aria-hidden="true">✳</b>
          <span>LOCAL POP-UPS</span>
          <b aria-hidden="true">✳</b>
          <span>YOUR NEXT CELEBRATION</span>
        </div>
        <section className="wrap section" id="upcoming">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHERE TO FIND US</p>
              <h2>
                A little something
                <br />
                <em>to look forward to.</em>
              </h2>
            </div>
            <p>
              Out for breakfast tacos or making your Saturday rounds? Make a
              little room for coffee. Here’s where to find us next.
            </p>
          </div>
          <div className="upcoming-grid">
            <article className="drop-card">
              <p className="eyebrow">NEXT COFFEE DROP · PICKUP</p>
              <h3>
                <time dateTime={nextDrop.dateTime}>{nextDrop.date}</time>
              </h3>
              <p className="event-year">{nextDrop.year}</p>
              <dl>
                <div>
                  <dt>Time</dt>
                  <dd>
                    {nextDrop.hours} <span>Central Time</span>
                  </dd>
                </div>
                <div>
                  <dt>Area</dt>
                  <dd>{nextDrop.location}</dd>
                </div>
              </dl>
              <p>{nextDrop.orderingNote}</p>
              <a
                className="text-link"
                href={shop.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Follow for drop details ↗
              </a>
            </article>
            <article className="popup-card">
              <Phin className="phin-icon" />
              <p className="eyebrow">POP-UPS</p>
              <h3>
                Our next little stop?
                <br />
                <em>Coming soon.</em>
              </h3>
              <p>
                We’re looking forward to meeting more of our Austin neighbors,
                one coffee stop at a time. Confirmed dates will land here. Have
                a local shop, market, or community gathering in mind? Say hi.
              </p>
              <a className="text-link" href="#contact">
                Let’s pop up together ↗
              </a>
            </article>
          </div>
        </section>
        <section className="events-section" id="events">
          <div className="wrap section">
            <div className="event-intro">
              <figure className="event-photo">
                <Image
                  src="/images/people/behind-the-coffee.webp"
                  alt="Son and Tina at their Phin & Foam coffee setup"
                  width={1600}
                  height={1200}
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <figcaption>
                  A little behind the scenes, a lot of love for coffee.
                </figcaption>
              </figure>
              <div>
                <p className="eyebrow">CATERING & PRIVATE EVENTS</p>
                <h2>
                  Your people.
                  <br />
                  <em>Our coffee.</em>
                </h2>
                <p className="lead">
                  A little Vietnamese coffee at your next Austin get-together?
                  We’d love to be there. Give your people a cup to linger over,
                  from the first hello to the last catch-up.
                </p>
                <p>
                  Backyard birthday, wedding weekend, or a well-earned team
                  break—tell us what you’re planning in Austin or nearby. You’ll
                  talk directly with us, Son and Tina, about what fits.
                </p>
                <a className="button" href="#contact">
                  Ask about your event <span>↗</span>
                </a>
              </div>
            </div>
            <div className="occasion-grid">
              <div>
                <span className="eyebrow">01 / CELEBRATE</span>
                <h3>Big days. Little moments.</h3>
                <p>
                  Weddings, birthdays, showers, and just-because get-togethers.
                  A coffee break worth sharing.
                </p>
              </div>
              <div>
                <span className="eyebrow">02 / BRING THE TEAM</span>
                <h3>Out of the usual routine.</h3>
                <p>
                  Office gatherings, team appreciation, and company
                  celebrations. Give everyone something to catch up over.
                </p>
              </div>
              <div>
                <span className="eyebrow">03 / MEET THE NEIGHBORS</span>
                <h3>A familiar face. A fresh cup.</h3>
                <p>
                  Local markets, shop openings, and neighborhood gatherings.
                  Let’s give your corner of ATX another reason to come together.
                </p>
              </div>
            </div>
            <section
              className="contact-panel"
              id="contact"
              aria-labelledby="contact-heading"
            >
              <div>
                <p className="eyebrow">LET’S MAKE IT HAPPEN</p>
                <h2 id="contact-heading">
                  Got a date in mind?
                  <br />
                  <em>Talk coffee with us.</em>
                </h2>
                <p>
                  Tell us a little about your gathering. No need to have every
                  detail figured out—we’ll work through it with you.
                </p>
                <p className="contact-signoff">
                  You’re emailing Son & Tina. That’s us in the aprons.
                </p>
              </div>
              <div className="contact-details">
                <h3>Here’s how to reach us</h3>
                <a
                  className="contact-email"
                  href={`mailto:${shop.contactEmail}`}
                >
                  {shop.contactEmail}
                </a>
                <p>Include whatever you know so far:</p>
                <ul>
                  <li>Your event date & time</li>
                  <li>Where you’re gathering</li>
                  <li>The occasion & estimated guest count</li>
                </ul>
                <a className="button" href={eventInquiry}>
                  Email Son & Tina <span>↗</span>
                </a>
                <p className="contact-help">
                  Opens a ready-to-fill email in your mail app. We’ll confirm
                  availability and details together before anything is booked.
                </p>
              </div>
            </section>
          </div>
        </section>
        <section className="wrap section about-section" id="about">
          <div>
            <p className="eyebrow">THE PEOPLE BEHIND THE PHIN</p>
            <h2>
              Hi, we’re
              <br />
              <em>Son & Tina.</em>
            </h2>
          </div>
          <div>
            <p>
              We’re Son and Tina, the two people behind Phin & Foam. We’re
              sharing a piece of our Vietnamese roots right here in North
              Austin: bold coffee, a patient drip through the phin, and a reason
              to sit a little longer.
            </p>
            <p>
              That little filter is part of what we love about Vietnamese
              coffee—it takes its time. In the middle of a busy Austin week, we
              like having a reason to slow down and share something good.
            </p>
            <p>
              Already know your way around a phin? Trying Vietnamese coffee for
              the first time? There’s room for you here. Come say hi, tell us
              what you think, and let’s get to know each other.
            </p>
            <p className="signature">Vietnamese roots. Austin neighbors.</p>
          </div>
        </section>
        <section className="social-band">
          <p>Good coffee. Better company.</p>
          <a href={shop.instagram} target="_blank" rel="noreferrer">
            Follow the next chapter at @phinandfoam ↗
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
