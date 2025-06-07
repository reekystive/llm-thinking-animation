import { ArrowLeftToLine, ArrowRightToLine, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';

import { useKeyboard } from '#src/hooks/use-keyboard.ts';
import { cn } from '#src/utils/cn.ts';
import { MemoizedKeyboardKey } from '../keyboard-key.tsx';
import { useAutoPlay } from './use-auto-play.ts';

interface PlaybackControlProps {
  totalSteps: number;
  autoSwitchIntervalInMs?: number;
  onStepChange?: (currentStep: number) => void;
}

const getVisualProgress = (currentStep: number, totalSteps: number) => {
  if (currentStep === 0) {
    return 0;
  }
  if (currentStep === totalSteps - 1) {
    return 1;
  }
  const realProgress = (currentStep + 1) / totalSteps;
  const visualProgress = realProgress * (1 - 2 * 0.08) + 0.08;
  return visualProgress;
};

export const PlaybackControl: FC<PlaybackControlProps> = ({
  totalSteps,
  autoSwitchIntervalInMs = 2000,
  onStepChange,
}) => {
  const {
    currentStep,
    isPlaying,
    pause,
    play,
    previousStep,
    nextStep,
    isFirstStep,
    isLastStep,
    setCurrentStepAndPause,
  } = useAutoPlay({
    initialStep: 0,
    totalSteps,
    autoSwitchIntervalInMs,
    onStepChange,
  });

  const playRef = useRef(play);
  // auto play on page load
  useEffect(() => {
    playRef.current();
  }, []);

  const handlePlay = useCallback(() => {
    play();
  }, [play]);

  const handlePause = useCallback(() => {
    pause();
  }, [pause]);

  const handlePreviousClick = useCallback(() => {
    previousStep();
  }, [previousStep]);

  const handleNextClick = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const { activeWithoutShift: arrowLeftActiveWithoutShift, activeWithShift: arrowLeftActiveWithShift } = useKeyboard({
    key: 'ArrowLeft',
    preventDefault: true,
    onKeyDown: (withShift) => {
      if (withShift) {
        setCurrentStepAndPause(0);
      } else {
        handlePreviousClick();
      }
    },
  });

  const { activeWithoutShift: arrowRightActiveWithoutShift, activeWithShift: arrowRightActiveWithShift } = useKeyboard({
    key: 'ArrowRight',
    preventDefault: true,
    onKeyDown: (withShift) => {
      if (withShift) {
        setCurrentStepAndPause(totalSteps - 1);
      } else {
        handleNextClick();
      }
    },
  });

  const handleSpacePress = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePause, handlePlay]);

  const { activeWithoutShift: spaceActive } = useKeyboard({
    key: ' ',
    preventDefault: true,
    onKeyDown: handleSpacePress,
  });

  return (
    <div className="relative flex flex-row items-stretch justify-center overflow-clip rounded-lg border border-gray-200 bg-white p-2 sm:justify-between sm:p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="absolute right-0 bottom-0 left-0 h-[1px] [mask:linear-gradient(to_right,transparent_3%,white_10%,white_90%,transparent_97%)]">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 [mask:linear-gradient(to_right,white_calc(100%-10px),transparent_100%)] dark:from-blue-500 dark:to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${100 * getVisualProgress(currentStep, totalSteps)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className={'flex flex-row items-center justify-end gap-2'}>
        <NavigateButton
          onClick={() => setCurrentStepAndPause(0)}
          disabled={isFirstStep}
          activeByKeyboard={arrowLeftActiveWithShift}
          variant="secondary"
          ariaLabel="First Step"
          title="First Step"
        >
          <ArrowLeftToLine className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </NavigateButton>

        <NavigateButton
          onClick={handlePreviousClick}
          disabled={isFirstStep}
          activeByKeyboard={arrowLeftActiveWithoutShift}
          variant="secondary"
          ariaLabel="Previous"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </NavigateButton>

        <NavigateButton
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={false}
          activeByKeyboard={spaceActive}
          variant="primary"
          ariaLabel={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        >
          <div className="relative h-4 w-4">
            <AnimatePresence mode="sync" initial={false}>
              {isPlaying ? (
                <motion.div
                  key="pause-icon"
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Pause className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="play-icon"
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Play className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </NavigateButton>

        <NavigateButton
          onClick={handleNextClick}
          disabled={isLastStep}
          activeByKeyboard={arrowRightActiveWithoutShift}
          variant="secondary"
          ariaLabel="Next"
          title="Next (Right Arrow)"
        >
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </NavigateButton>

        <NavigateButton
          onClick={() => setCurrentStepAndPause(totalSteps - 1)}
          disabled={isLastStep}
          activeByKeyboard={arrowRightActiveWithShift}
          variant="secondary"
          ariaLabel="Last Step"
          title="Last Step"
        >
          <ArrowRightToLine className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </NavigateButton>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="hidden flex-col justify-end sm:flex">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="inline-flex gap-1 px-1 align-bottom">
            <MemoizedKeyboardKey className="block" keyText="⇧" />
            <MemoizedKeyboardKey className="block" keyText="←" />
            <MemoizedKeyboardKey className="block" keyText="→" />
          </div>
          <span>Navigate</span>
          <span className="mx-1"> • </span>
          <span className="inline-flex gap-1 px-1 align-bottom">
            <MemoizedKeyboardKey className="inline-block" keyText="␣" />
          </span>
          <span>Play / Pause</span>
        </div>
      </div>
    </div>
  );
};

const NavigateButton: FC<{
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  activeByKeyboard?: boolean;
  variant: 'primary' | 'secondary';
  ariaLabel: string;
  title: string;
}> = ({ children, className, onClick, disabled, activeByKeyboard, variant, ariaLabel, title }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'cursor-pointer rounded-full p-2.5 transition-colors outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2',
        variant === 'primary' && 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500',
        variant === 'secondary' && 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600',
        activeByKeyboard && !disabled && 'scale-95',
        activeByKeyboard && !disabled && variant === 'primary' && 'bg-gray-200 dark:bg-gray-600',
        activeByKeyboard && !disabled && variant === 'secondary' && 'bg-gray-200 dark:bg-gray-600',
        className
      )}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  );
};
