import { useRef } from 'react';

export function useIsFirstRender() {
  const isFirstRenderRef = useRef<boolean>(true);
  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false;
    return true;
  }
  return false;
}
