export function ensureUrlCanParse() {
  const urlConstructor = URL as unknown as {
    canParse?: (input: string | URL, base?: string | URL) => boolean;
  };

  if (typeof urlConstructor.canParse !== "function") {
    urlConstructor.canParse = (input: string | URL, base?: string | URL) => {
      try {
        const value = input instanceof URL ? input.toString() : input;
        void new URL(value, base);
        return true;
      } catch {
        return false;
      }
    };
  }
}
