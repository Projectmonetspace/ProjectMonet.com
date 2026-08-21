"use client";

import { X } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/app/lib/analytics";
import AuditForm from "./audit-form";

type AuditModalContextValue = {
  openAuditModal: (trigger?: HTMLElement | null, location?: string) => void;
};

const AuditModalContext = createContext<AuditModalContextValue | null>(null);

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useAuditModal() {
  const context = useContext(AuditModalContext);
  if (!context) throw new Error("useAuditModal must be used within AuditModalProvider");
  return context;
}

export function AuditModalTrigger({ children, className, location }: { children: ReactNode; className?: string; location: string }) {
  const { openAuditModal } = useAuditModal();
  return (
    <button
      className={className}
      type="button"
      onClick={(event) => openAuditModal(event.currentTarget, location)}
    >
      {children}
    </button>
  );
}

export default function AuditModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function openAuditModal(trigger?: HTMLElement | null, location = "unknown") {
    returnFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setSessionKey((value) => value + 1);
    setIsOpen(true);
    trackAnalyticsEvent("audit_request_click", { location, page_path: window.location.pathname });
  }

  function closeAuditModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const page = pageRef.current as (HTMLDivElement & { inert: boolean }) | null;
    if (page) page.inert = isOpen;
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAuditModal();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [isOpen]);

  return (
    <AuditModalContext.Provider value={{ openAuditModal }}>
      <div ref={pageRef} aria-hidden={isOpen ? "true" : undefined}>{children}</div>
      {isOpen && (
        <div
          className="audit-modal-layer"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAuditModal();
          }}
        >
          <div
            ref={panelRef}
            className="audit-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
            tabIndex={-1}
          >
            <div className="audit-modal-header">
              <div>
                <p className="eyebrow">Free · concise · qualification-based</p>
                <h2 id="audit-modal-title">Free Social Presence Audit</h2>
              </div>
              <button ref={closeRef} className="audit-modal-close" type="button" onClick={closeAuditModal} aria-label="Close audit form">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="audit-modal-body">
              <AuditForm key={sessionKey} compact onClose={closeAuditModal} />
            </div>
          </div>
        </div>
      )}
    </AuditModalContext.Provider>
  );
}
