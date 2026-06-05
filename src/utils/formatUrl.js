/**
 * Formats a URL to ensure it has a protocol (http:// or https://)
 * so that it doesn't resolve as relative to the application's domain.
 */
export function formatUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
