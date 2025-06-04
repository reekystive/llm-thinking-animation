import { useEventCallback } from '#src/hooks/use-event-callback.ts';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAutoPlayProps {
  initialStep: number;
  totalSteps: number;
  autoSwitchIntervalInMs: number;
  onStepChange?: (currentStep: number) => void;
  onAutoPlayEnd?: () => void;
}

export const useAutoPlay = (props: UseAutoPlayProps) => {
  const { autoSwitchIntervalInMs, totalSteps, onStepChange, onAutoPlayEnd } = props;
  const [currentStep, setCurrentStep] = useState(props.initialStep);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleStepChangeCallback = useEventCallback(onStepChange);
  const handleAutoPlayEndCallback = useEventCallback(onAutoPlayEnd);

  useEffect(() => {
    const clearAutoPlayInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isPlaying) {
      clearAutoPlayInterval();
      return;
    }

    const next = () => {
      setCurrentStep((prev) => {
        handleStepChangeCallback?.(prev + 1);
        if (prev + 1 >= totalSteps - 1) {
          setIsPlaying(false);
          handleAutoPlayEndCallback?.();
        }
        return prev + 1;
      });
    };

    intervalRef.current = setInterval(next, autoSwitchIntervalInMs);

    return () => {
      clearAutoPlayInterval();
    };
  }, [isPlaying, autoSwitchIntervalInMs, totalSteps, handleStepChangeCallback, handleAutoPlayEndCallback]);

  const setCurrentStepAndPause = useCallback(
    (targetStep: number) => {
      setCurrentStep(targetStep);
      if (targetStep !== currentStep) {
        handleStepChangeCallback?.(targetStep);
      }
      setIsPlaying(false);
    },
    [currentStep, handleStepChangeCallback]
  );

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (!isPlaying && currentStep === totalSteps - 2) {
      setCurrentStepAndPause(totalSteps - 1);
      return;
    }
    if (!isPlaying && currentStep === totalSteps - 1) {
      setCurrentStepAndPause(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying(true);
  }, [isPlaying, currentStep, totalSteps, setCurrentStepAndPause]);

  const previousStep = useCallback(() => {
    setCurrentStepAndPause(Math.max(0, currentStep - 1));
  }, [currentStep, setCurrentStepAndPause]);

  const nextStep = useCallback(() => {
    setCurrentStepAndPause(Math.min(totalSteps - 1, currentStep + 1));
  }, [currentStep, totalSteps, setCurrentStepAndPause]);

  return {
    currentStep,
    isPlaying,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === props.totalSteps - 1,
    setCurrentStepAndPause,
    pause,
    play,
    previousStep,
    nextStep,
  };
};
