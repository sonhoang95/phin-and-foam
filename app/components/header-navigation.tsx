"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function HeaderNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="header-navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      <nav id="main-navigation" aria-label="Main navigation" data-open={open}>
        <Link href="/#upcoming" onClick={() => setOpen(false)}>
          Find us
        </Link>
        <Link href="/#about" onClick={() => setOpen(false)}>
          Meet us
        </Link>
        <Link
          className="nav-cta"
          href="/inquire"
          onClick={() => setOpen(false)}
        >
          Book an event
        </Link>
      </nav>
    </div>
  );
}
