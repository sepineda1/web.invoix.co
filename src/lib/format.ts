export function cop(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export const PLAN_IDS = ["basico", "pro", "elite"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export function planLabel(id: string) {
  if (id === "basico") return "Básico";
  if (id === "pro") return "PRO";
  if (id === "elite") return "Élite";
  return "PRO";
}

export function trialDaysLeft(createdAt: Date) {
  const elapsed = Math.floor((Date.now() - createdAt.getTime()) / 86_400_000);
  return Math.max(0, 15 - elapsed);
}

export function normalizeSubdomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.invoix\.co$/, "")
    .replace(/[^a-z0-9-]/g, "");
}

export function isSubdomain(value: string) {
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(value);
}

export function platformUrl(subdomain: string) {
  return `https://${subdomain}.invoix.co`;
}
