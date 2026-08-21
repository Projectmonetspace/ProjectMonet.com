"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { auditLimits } from "@/app/lib/audit";
import { trackAnalyticsEvent } from "@/app/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function AuditForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setErrors({});
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.privacyConsent = formData.get("privacyConsent") === "on";

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setMessage(result.message ?? "Please check the highlighted fields and try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setMessage(result.message ?? "Your audit request is in.");
      form.reset();
      trackAnalyticsEvent("generate_lead", { form_name: "free_social_presence_audit", page_path: window.location.pathname });
    } catch {
      setStatus("error");
      setMessage("Your request could not be sent. Please try again or email contact@projectmonet.com.");
    }
  }

  const fieldError = (name: string) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  const describedBy = (name: string) => errors[name] ? `${name}-error` : undefined;

  return (
    <form className={`audit-form ${compact ? "audit-form-compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="source" value="projectmonet.com-free-audit" />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <label>Name<input name="name" required maxLength={auditLimits.name} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />{fieldError("name")}</label>
        <label>Email<input type="email" name="email" required maxLength={auditLimits.email} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />{fieldError("email")}</label>
        <label>Phone / WhatsApp<input type="tel" name="phone" required maxLength={auditLimits.phone} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />{fieldError("phone")}</label>
        <label>Business / Creator name<input name="businessName" required maxLength={auditLimits.businessName} autoComplete="organization" aria-invalid={Boolean(errors.businessName)} aria-describedby={describedBy("businessName")} />{fieldError("businessName")}</label>
        <label className="form-span">Instagram handle or profile URL<input name="instagram" required maxLength={auditLimits.instagram} placeholder="@yourhandle or instagram.com/yourhandle" autoCapitalize="none" spellCheck={false} aria-invalid={Boolean(errors.instagram)} aria-describedby={describedBy("instagram")} />{fieldError("instagram")}</label>
        <label>Niche / category<input name="niche" required maxLength={auditLimits.niche} aria-invalid={Boolean(errors.niche)} aria-describedby={describedBy("niche")} />{fieldError("niche")}</label>
        <label>Primary goal<select name="primaryGoal" required defaultValue="" aria-invalid={Boolean(errors.primaryGoal)} aria-describedby={describedBy("primaryGoal")}><option value="" disabled>Choose one</option><option>Build authority and presence</option><option>Grow the right audience</option><option>Generate DMs or leads</option><option>Improve content performance</option><option>Clarify positioning</option></select>{fieldError("primaryGoal")}</label>
        <label className="form-span">Current content and resources<textarea name="resources" required maxLength={auditLimits.resources} rows={4} placeholder="Tell us about your team, footage, editing, cadence and what you can consistently provide." aria-invalid={Boolean(errors.resources)} aria-describedby={describedBy("resources")} />{fieldError("resources")}</label>
        <fieldset><legend>Are you the decision-maker?</legend><label className="radio"><input type="radio" name="decisionMaker" value="yes" defaultChecked /> Yes</label><label className="radio"><input type="radio" name="decisionMaker" value="no" /> No</label></fieldset>
        <fieldset><legend>Open to ongoing management if the diagnosis makes sense?</legend><label className="radio"><input type="radio" name="openToManagement" value="yes" defaultChecked /> Yes</label><label className="radio"><input type="radio" name="openToManagement" value="unsure" /> Unsure</label><label className="radio"><input type="radio" name="openToManagement" value="no" /> No</label></fieldset>
        <label className="form-span">Optional context<textarea name="message" maxLength={auditLimits.message} rows={4} placeholder="Anything we should understand before reviewing the account?" /></label>
      </div>

      <label className="consent-check">
        <input type="checkbox" name="privacyConsent" required aria-invalid={Boolean(errors.privacyConsent)} aria-describedby={describedBy("privacyConsent")} />
        <span>I agree that Project Monet may process these details to assess and respond to my audit request. See the <Link href="/privacy">Privacy Policy</Link> and <Link href="/audit-terms">Audit Terms</Link>.</span>
      </label>
      {fieldError("privacyConsent")}

      <div className="form-submit-row">
        <button className="button button-orange" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : status === "success" ? "Request received" : "Get My Free Audit"}
        </button>
        <p>The audit is a concise diagnosis, not a complete strategy. Submissions are reviewed for fit.</p>
      </div>
      {(message || errors.form) && <p className={`form-status ${status}`} role="status" aria-live="polite">{errors.form ?? message}</p>}
    </form>
  );
}
