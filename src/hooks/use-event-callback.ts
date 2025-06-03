import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEventCallback = <T extends ((...args: any[]) => any) | undefined>(fn: T): T => {
  const ref = useRef<T | undefined>(fn);
  ref.current = fn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const optionalCallback = useCallback((...args: Parameters<NonNullable<T>>) => ref.current?.(...args), []) as T;
  if (fn === undefined) {
    return undefined as T;
  }
  return optionalCallback;
};
