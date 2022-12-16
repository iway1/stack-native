import { useRef } from 'react';

/**
 * Returns the last value passed to the hook that was not undefined.
 * Can be useful for situations where you want your conditionally rendered UI to stay
 * rendered when the data becomes undefined (IE when you navigate away from a screen using react navigation
 * conditional navigation, depending on data that the first screen needed.).
 * @param v A value
 * @returns The same value, or the last defined version of it.
 */
export function useLastDefinedValue<T extends any>(v: T) {
  const lastDefined = useRef<T | undefined>();
  if (typeof v !== 'undefined') lastDefined.current = v;
  return lastDefined.current;
}
