import { useCallback } from "react";

export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number
) => {
  const debounceFn = useCallback(
    (...args: unknown[]) => {
      const clearId = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(clearId);
    },
    [callback, delay]
  );
  return debounceFn;
};
