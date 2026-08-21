import { NextResponse } from "next/server";
import { parseAuditPayload, WEB3FORMS_ACCESS_KEY } from "@/app/lib/audit";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = parseAuditPayload(input);
  if (!parsed.data) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 422 });
  }

  const data = parsed.data;
  const providerPayload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Free Social Presence Audit — ${data.businessName}`,
    from_name: "ProjectMonet.com Audit",
    name: data.name,
    email: data.email,
    "Phone / WhatsApp": data.phone,
    "Business / Creator": data.businessName,
    Instagram: data.instagram,
    "Niche / Category": data.niche,
    "Primary goal": data.primaryGoal,
    "Current content / resources": data.resources,
    "Decision-maker": data.decisionMaker,
    "Open to management": data.openToManagement,
    "Additional context": data.message || "Not provided",
    Source: data.source,
    botcheck: "",
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(providerPayload),
      cache: "no-store",
    });
    const result = (await response.json()) as { success?: boolean; message?: string };
    if (!response.ok || !result.success) {
      return NextResponse.json(
        { ok: false, message: "Your request could not be sent. Please try again or email contact@projectmonet.com." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, message: "Your audit request is in. We’ll review the account and reply by email." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Your request could not be sent. Please try again or email contact@projectmonet.com." },
      { status: 502 },
    );
  }
}
