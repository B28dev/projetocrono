export const ALLOWED_EMAIL_DOMAINS = ['@gmail.com', '@somosicev.com'];

export const ALLOWED_EMAIL_DOMAINS_LABEL = '@gmail.com ou @somosicev.com';

export function hasAllowedEmailDomain(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.some((domain) => normalizedEmail.endsWith(domain));
}
