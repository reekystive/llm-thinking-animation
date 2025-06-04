import type {
  EndThinkingData,
  PlaintextData,
  SearchData,
  StartThinkingData,
  ThinkingData,
} from '#src/mocks/thinking-interface.ts';
import { cn } from '#src/utils/cn.ts';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { Paragraphs } from './paragraph.tsx';

interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;
  currentStep: number;
  className?: string;
}

export const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData, currentStep, className }) => {
  return (
    <div className={cn('relative border border-red-300', className)}>
      <AnimatePresence mode="sync">
        {(() => {
          switch (currentData?.type) {
            case 'start-thinking':
              return <ThinkingStepStartThinking data={currentData} key={`start-thinking-${currentStep}`} />;
            case 'end':
              return <ThinkingStepEnd data={currentData} key={`end-${currentStep}`} />;
            case 'plaintext':
              return <ThinkingStepPlaintext data={currentData} key={`plaintext-${currentStep}`} />;
            case 'search':
              return <ThinkingStepSearch data={currentData} key={`search-${currentStep}`} />;
            default:
              currentData satisfies undefined;
              return null;
          }
        })()}
      </AnimatePresence>
    </div>
  );
};

const ThinkingStepStartThinking: FC<{ data: StartThinkingData }> = () => {
  return (
    <motion.div
      className="flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
    >
      <div>Thinking</div>
    </motion.div>
  );
};

const ThinkingStepEnd: FC<{ data: EndThinkingData }> = () => {
  return (
    <motion.div
      className="flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
    >
      <div>End</div>
    </motion.div>
  );
};

const ThinkingStepPlaintext: FC<{ data: PlaintextData }> = ({ data }) => {
  return (
    <motion.div
      className="flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
    >
      <div>Plaintext</div>
      <div className="flex flex-col gap-2">
        <Paragraphs contentText={data.content} />
      </div>
    </motion.div>
  );
};

const ThinkingStepSearch: FC<{ data: SearchData }> = () => {
  return (
    <motion.div
      className="flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
    >
      <div>Search</div>
    </motion.div>
  );
};
