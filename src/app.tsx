import { FC, useCallback, useState } from 'react';
import { MemoizedAnimationControl } from './components/animation-control.tsx';
import { PlaybackControl } from './components/playback-control/playback-control';
import { MemoizedSignature } from './components/signature.tsx';
import { MemoizedThemeToggle } from './components/theme-toggle';
import { ThinkingBox } from './components/thinking-box/thinking-box';
import { mockData } from './mocks/thinking-data';
import type { ThinkingData } from './mocks/thinking-interface';

export const App: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentData, setCurrentData] = useState<ThinkingData | undefined>(mockData[0]);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
    setCurrentData(mockData[step]);
  }, []);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-start overflow-clip bg-gray-100 px-2 py-4 transition-colors sm:px-6 sm:py-6 dark:bg-slate-900">
      <div className="absolute top-2 right-2 sm:top-6 sm:right-6">
        <MemoizedThemeToggle />
      </div>

      <h1 className="mb-2 px-12 text-center text-xl font-bold text-gray-900 sm:px-0 sm:text-3xl dark:text-gray-100">
        LLM Thinking Animation
      </h1>

      <div className="mb-4 text-center sm:mb-8">
        <p className="text-gray-600 dark:text-gray-400">A ChatGPT-o3-like LLM thinking animation</p>
      </div>

      <div className="mb-2 flex w-full max-w-2xl flex-col items-center gap-2 sm:mb-4">
        <MemoizedAnimationControl />
      </div>

      <div className="mb-2 w-full max-w-2xl sm:mb-4">
        <PlaybackControl totalSteps={mockData.length} autoSwitchIntervalInMs={3000} onStepChange={handleStepChange} />
      </div>

      <div className="w-full max-w-2xl">
        <ThinkingBox currentData={currentData} currentStep={currentStep} />
      </div>

      <div className="mt-2 flex w-full items-center justify-center sm:mt-4">
        <MemoizedSignature className="opacity-80" />
      </div>
    </div>
  );
};
