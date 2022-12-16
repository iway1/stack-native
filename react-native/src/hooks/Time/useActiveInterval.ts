import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

/**
 * Runs an interval while the app is active. Please remember to wrap your callback in useCallback or this will behave
 * unexpectedly. The interval will reset any time this hooks parameter changes or the app becomes active.
 * @param f Your callback function to run on the interval.
 * @param time How often the interval will fire.
 */
export function useActiveInterval(f: () => void, time: number) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (active) {
      f();
      const i = setInterval(f, time);
      return () => {
        clearInterval(i);
      };
    }
    return;
  }, [active, f, time]);
  useEffect(() => {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, []);
}
