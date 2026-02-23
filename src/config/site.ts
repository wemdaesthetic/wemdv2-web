
export const SITE = {
  ACCENT: "#B71919",
  CONSULT_TEL: "02-6959-8989",
};

export function toTelHref(tel: string) {
  return `tel:${tel.replaceAll("-", "").replaceAll(" ", "")}`;
}