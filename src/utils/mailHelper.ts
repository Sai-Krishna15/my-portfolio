export const DEFAULT_EMAIL = "saikrishna152002@gmail.com";

export function getMailtoUrl(
  email: string = DEFAULT_EMAIL,
  subject: string = "Software Engineering Role / Inquiry",
  body: string = ""
): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}${params.length ? `?${params.join("&")}` : ""}`;
}

export function getGmailWebUrl(
  email: string = DEFAULT_EMAIL,
  subject: string = "Software Engineering Role / Inquiry",
  body: string = ""
): string {
  const params: string[] = [`view=cm`, `fs=1`, `to=${encodeURIComponent(email)}`];
  if (subject) params.push(`su=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `https://mail.google.com/mail/?${params.join("&")}`;
}

export function openMailbox(
  email: string = DEFAULT_EMAIL,
  subject: string = "Software Engineering Role / Inquiry",
  body: string = ""
) {
  const mailto = getMailtoUrl(email, subject, body);
  // Attempt to open native mailto client
  window.location.href = mailto;
}
