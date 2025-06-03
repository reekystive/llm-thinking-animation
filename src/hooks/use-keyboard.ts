import { useEffect } from 'react';

export interface UseKeyboardProps {
  key: string;
  preventDefault?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
}

export const useKeyboard = (props: UseKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('handleKeyDown', event.key);
      if (event.key === props.key) {
        if (props.preventDefault) {
          event.preventDefault();
        }
        props.onKeyDown?.(event);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === props.key) {
        if (props.preventDefault) {
          event.preventDefault();
        }
        props.onKeyUp?.(event);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === props.key) {
        if (props.preventDefault) {
          event.preventDefault();
        }
        props.onKeyPress?.(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [props.preventDefault, props.onKeyDown, props.onKeyUp, props.onKeyPress, props.key, props]);
};
