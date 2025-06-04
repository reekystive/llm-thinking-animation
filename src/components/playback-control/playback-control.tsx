import { ArrowLeftToLine, ArrowRightToLine, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useCallback } from 'react';

import { useKeyboard } from '#src/hooks/use-keyboard.ts';
import { KeyboardKey } from '../keyboard-key.tsx';
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
  autoSwitchIntervalInMs: autoPlaySpeed = 2000,
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
    autoSwitchIntervalInMs: autoPlaySpeed,
    onStepChange,
  });

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

  useKeyboard({
    key: 'ArrowLeft',
    preventDefault: true,
    onKeyDown: (e) => {
      if (e.metaKey) {
        setCurrentStepAndPause(0);
      } else {
        handlePreviousClick();
      }
    },
  });

  useKeyboard({
    key: 'ArrowRight',
    preventDefault: true,
    onKeyDown: (e) => {
      if (e.metaKey) {
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

  useKeyboard({
    key: ' ',
    preventDefault: true,
    onKeyDown: handleSpacePress,
  });

  return (
    <div className="relative flex flex-row items-stretch justify-center overflow-clip rounded-lg border border-gray-200 bg-white p-4 sm:justify-between dark:border-gray-700 dark:bg-gray-800">
      <div className="absolute right-0 bottom-0 left-0 h-[1px] [mask:linear-gradient(to_right,transparent_3%,white_10%,white_90%,transparent_97%)]">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 [mask:linear-gradient(to_right,white_calc(100%-10px),transparent_100%)] dark:from-blue-500 dark:to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${100 * getVisualProgress(currentStep, totalSteps)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <button
          onClick={() => setCurrentStepAndPause(totalSteps - 1)}
          disabled={isFirstStep}
          className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors outline-none hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="First Step"
          title="First Step"
        >
          <ArrowLeftToLine className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={handlePreviousClick}
          disabled={isFirstStep}
          className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors outline-none hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Previous"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="cursor-pointer rounded-full bg-slate-500 p-2 text-white transition-colors outline-none hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isPlaying ? (
              <motion.div
                key="pause-icon"
                initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-4 w-4"
              >
                <Pause className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="play-icon"
                initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-4 w-4"
              >
                <Play className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={handleNextClick}
          disabled={isLastStep}
          className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors outline-none hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Next"
          title="Next (Right Arrow)"
        >
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => setCurrentStepAndPause(totalSteps - 1)}
          disabled={isLastStep}
          className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors outline-none hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Last Step"
          title="Last Step"
        >
          <ArrowRightToLine className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="hidden flex-col justify-end sm:flex">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="inline-flex gap-1 px-1 align-bottom">
            <KeyboardKey className="block" keyText="←" />
            <KeyboardKey className="block" keyText="→" />
          </div>
          <span>Navigate</span>
          <span className="mx-1"> • </span>
          <span className="inline-flex gap-1 px-1 align-bottom">
            <KeyboardKey className="inline-block" keyText="␣" />
          </span>
          <span>Play / Pause</span>
        </div>
      </div>
    </div>
  );
};
