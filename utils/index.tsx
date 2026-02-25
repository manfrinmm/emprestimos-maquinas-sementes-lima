export function parseError(error: string | undefined): { message?: string; fieldErrors?: Record<string, string[]> } {
    if (!error) return {};
    try {
      const decoded = decodeURIComponent(error);
      const parsed = JSON.parse(decoded) as Record<string, string[]>;
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        return { fieldErrors: parsed };
      }
    } catch {
      return { message: decodeURIComponent(error) };
    }
    return { message: decodeURIComponent(error) };
  }