import { Dispatch, RefObject, SetStateAction, useCallback, useRef, useState } from 'react';

export type ReadonlyRefObject<T> = Readonly<RefObject<T>>;

/**
 * Custom hook that manages both state and a ref keeping the latest value
 *
 * @param initialValue - Initial state value
 * @returns [value, setValue, valueRef] - Current value, setter function, and ref with the latest value
 */
export function useStateWithRef<T>(initialValue: T): [T, Dispatch<SetStateAction<T>>, ReadonlyRefObject<T>] {
  const [value, setValueRaw] = useState<T>(initialValue);
  const valueRef = useRef<T>(initialValue);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (newValueOrFn) => {
      if (typeof newValueOrFn === 'function') {
        setValueRaw((prev) => {
          // FIXME: Maybe this function is the value itself, not a update function. Try to not use as.
          const next = (newValueOrFn as (prev: T) => T)(prev);
          valueRef.current = next;
          return next;
        });
      } else {
        setValueRaw(newValueOrFn);
        valueRef.current = newValueOrFn;
      }
    },
    [setValueRaw]
  );

  return [value, setValue, valueRef];
}
