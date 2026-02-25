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

export function clearUrlOnInput(
  form: HTMLFormElement,
  selectors: string[],
  onInput: () => void
): () => void {
  const elements = selectors
    .map((sel) => form.querySelector<HTMLInputElement>(sel))
    .filter((el): el is HTMLInputElement => el != null);
  elements.forEach((el) => el.addEventListener("input", onInput));
  return () => elements.forEach((el) => el.removeEventListener("input", onInput));
}
