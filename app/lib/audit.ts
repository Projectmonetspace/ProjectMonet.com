export const WEB3FORMS_ACCESS_KEY = "68c5446a-5663-4fb3-b70a-968ad99e0360";

export const auditLimits = {
  name: 80,
  email: 160,
  phone: 40,
  businessName: 120,
  instagram: 160,
  niche: 100,
  primaryGoal: 120,
  resources: 800,
  message: 1200,
} as const;

export type AuditPayload = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  instagram: string;
  niche: string;
  primaryGoal: string;
  resources: string;
  decisionMaker: "yes" | "no";
  openToManagement: "yes" | "no" | "unsure";
  message: string;
  privacyConsent: boolean;
  source: string;
  botcheck: string;
};

export function buildWeb3FormsPayload(data: AuditPayload) {
  return {
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
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const handlePattern = /^@?[A-Za-z0-9._]{1,30}$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, limit) : "";
}

export function normalizeInstagram(value: unknown) {
  const input = clean(value, auditLimits.instagram);
  if (handlePattern.test(input)) return input.startsWith("@") ? input : `@${input}`;
  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "instagram.com") return "";
    const handle = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return handlePattern.test(handle) ? `https://www.instagram.com/${handle}/` : "";
  } catch {
    return "";
  }
}

export function parseAuditPayload(input: unknown): { data?: AuditPayload; errors: Record<string, string> } {
  const raw = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const data: AuditPayload = {
    name: clean(raw.name, auditLimits.name),
    email: clean(raw.email, auditLimits.email).toLowerCase(),
    phone: clean(raw.phone, auditLimits.phone),
    businessName: clean(raw.businessName, auditLimits.businessName),
    instagram: normalizeInstagram(raw.instagram),
    niche: clean(raw.niche, auditLimits.niche),
    primaryGoal: clean(raw.primaryGoal, auditLimits.primaryGoal),
    resources: clean(raw.resources, auditLimits.resources),
    decisionMaker: raw.decisionMaker === "no" ? "no" : "yes",
    openToManagement: raw.openToManagement === "no" || raw.openToManagement === "unsure" ? raw.openToManagement : "yes",
    message: clean(raw.message, auditLimits.message),
    privacyConsent: raw.privacyConsent === true,
    source: clean(raw.source, 80) || "projectmonet.com",
    botcheck: clean(raw.botcheck, 120),
  };
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Enter your name.";
  if (!emailPattern.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.phone.length < 7) errors.phone = "Enter a valid phone or WhatsApp number.";
  if (!data.businessName) errors.businessName = "Enter the business or creator name.";
  if (!data.instagram) errors.instagram = "Enter a valid Instagram handle or profile URL.";
  if (!data.niche) errors.niche = "Enter the niche or category.";
  if (!data.primaryGoal) errors.primaryGoal = "Choose a primary goal.";
  if (!data.resources) errors.resources = "Tell us briefly what content resources you have.";
  if (!data.privacyConsent) errors.privacyConsent = "Consent is required to process this audit request.";
  if (data.botcheck) errors.form = "Unable to process this request.";
  return Object.keys(errors).length ? { errors } : { data, errors };
}
