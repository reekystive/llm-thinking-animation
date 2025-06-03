import { FC, useCallback, useState } from 'react';
import { PlaybackControl } from './components/playback-control/playback-control';
import { ThemeToggle } from './components/theme-toggle';
import { ThinkingBox } from './components/thinking-box';
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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-clip bg-gray-100 px-6 py-6 transition-colors dark:bg-slate-900">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <h1 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">LLM Thinking Animation</h1>
      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">A ChatGPT-o3-like LLM thinking animation demo.</p>
      </div>
      <div className="mb-4 w-full max-w-2xl">
        <PlaybackControl totalSteps={mockData.length} autoSwitchIntervalInMs={2000} onStepChange={handleStepChange} />
      </div>
      <div className="w-full max-w-2xl">
        <ThinkingBox currentData={currentData} currentStep={currentStep} />
      </div>
    </div>
  );
};
