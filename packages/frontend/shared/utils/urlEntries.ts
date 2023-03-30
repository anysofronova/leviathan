export function createEntries(queries: Record<string, string>) {
  return Object.entries(queries)
    .filter(([, v]) => v !== '')
    .map(([key, value]) => ({ [key]: value }))
}
