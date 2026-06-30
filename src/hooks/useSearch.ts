export function normalizeSearch(text: string) {
  return text.trim().toLowerCase();
}

export function includesSearch(fields: string[], query: string) {
  const normalized = normalizeSearch(query);
  if (!normalized) return true;
  return fields.some((field) => field.toLowerCase().includes(normalized));
}
