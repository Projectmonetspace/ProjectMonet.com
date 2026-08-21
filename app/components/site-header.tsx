"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandMark from "./brand-mark";

const links = [
  { label: "Results", href: "/#results" },
  { label: "Method", href: "/#method" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Viral Mandate", href: "/viral-mandate" },
  { label: "About", href: "/about" },
];

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`site-nav ${overlay ? "site-nav-overlay" : "site-nav-solid"}`} aria-label="Primary navigation">
        <Link href="/" aria-label="Project Monet home" onClick={() => setIsOpen(false)}>
          <BrandMark />
        </Link>

        <div className="desktop-nav glass-surface" aria-label="Homepage sections">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>

        <div className="desktop-actions glass-surface">
          <a
            className="websites-link"
            href="https://www.projectmonet.space"
            target="_blank"
            rel="noreferrer"
            data-analytics-event="websites_link_click"
            data-analytics-location="header"
          >Websites ↗</a>
          <Link className="nav-primary" href="/audit" data-analytics-event="audit_request_click" data-analytics-location="header">Free Audit</Link>
        </div>

        <button
          className="menu-toggle glass-surface"
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="menu-icon-stack" aria-hidden="true">
            <Menu className={isOpen ? "menu-icon hidden-icon" : "menu-icon visible-icon"} />
            <X className={isOpen ? "menu-icon visible-icon" : "menu-icon hidden-icon reverse"} />
          </span>
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <button className="mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={() => setIsOpen(false)} />
        <div className="mobile-menu-panel glass-surface">
          <div className="mobile-links">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)} style={{ transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms" }}>
                <span>{link.label}</span><span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <div className="mobile-menu-divider" />
          <Link className="button button-light" href="/audit" tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>Get a Free Social Presence Audit</Link>
          <a className="button button-outline" href="https://www.projectmonet.space" target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1}>Websites ↗</a>
        </div>
      </div>
    </>
  );
}
