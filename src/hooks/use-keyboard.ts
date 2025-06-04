import { useEffect, useState } from 'react';
import { useEventCallback } from './use-event-callback.ts';

export interface UseKeyboardProps {
  key: string;
  preventDefault?: boolean;
  onKeyDown?: (withShift: boolean) => void;
  onKeyUp?: () => void;
}

export const useKeyboard = (props: UseKeyboardProps) => {
  const [activeWithoutShift, setActiveWithoutShift] = useState(false);
  const [activeWithShift, setActiveWithShift] = useState(false);

  const handleKeyDownCallback = useEventCallback(props.onKeyDown);
  const handleKeyUpCallback = useEventCallback(props.onKeyUp);

  const { key, preventDefault } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== key) {
        return;
      }
      if (event.repeat) {
        if (preventDefault) event.preventDefault();
        return;
      }
      if (preventDefault) {
        event.preventDefault();
      }
      if (event.shiftKey) {
        setActiveWithShift(true);
        handleKeyDownCallback?.(true);
      } else {
        setActiveWithoutShift(true);
        handleKeyDownCallback?.(false);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key !== key && event.key !== 'Meta') {
        return;
      }
      if (preventDefault) {
        event.preventDefault();
      }
      setActiveWithoutShift(false);
      setActiveWithShift(false);
      handleKeyUpCallback?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      setActiveWithoutShift(false);
      setActiveWithShift(false);
    };
  }, [key, handleKeyDownCallback, handleKeyUpCallback, preventDefault]);

  return {
    activeWithoutShift,
    activeWithShift,
  };
};
