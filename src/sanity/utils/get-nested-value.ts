export function getNestedValue(obj: Record<string, any>, path: string): string {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    result = result?.[key];
    if (result === undefined || result === null) {
      return ""; // Return empty string if path doesn't exist
    }
  }

  return String(result);
}
