import type { ThinkingData } from '#src/mocks/thinking-interface.ts';
import { FC } from 'react';

interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;
  currentStep: number;
}

export const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <pre className="text-sm whitespace-pre-wrap">
        {currentData ? JSON.stringify(currentData, null, 2) : 'No data'}
      </pre>
    </div>
  );
};
