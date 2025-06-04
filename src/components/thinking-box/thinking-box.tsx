import type {
  EndThinkingData,
  PlaintextData,
  SearchData,
  StartThinkingData,
  ThinkingData,
} from '#src/mocks/thinking-interface.ts';
import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { AnimatePresence, motion } from 'motion/react';
import { FC, forwardRef } from 'react';
import { Paragraphs } from './paragraph.tsx';

interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;
  currentStep: number;
  className?: string;
}

export const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData, currentStep, className }) => {
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();

  return (
    <motion.div
      className={cn('relative', showOutlines && 'outline outline-red-300/50', className)}
      layout
      transition={{ layout: { duration: s(0.4), type: 'spring', bounce: 0 } }}
    >
      <AnimatePresence initial={false} mode="popLayout">
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
    </motion.div>
  );
};

const ThinkingStepStartThinking = forwardRef<HTMLDivElement, { data: StartThinkingData }>(
  function ThinkingStepStartThinking(_props, ref) {
    const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
    return (
      <motion.div
        className={cn(
          'flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900',
          showOutlines && 'outline outline-green-400/50'
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
        layout
        ref={ref}
      >
        <div>Thinking</div>
      </motion.div>
    );
  }
);

const ThinkingStepEnd = forwardRef<HTMLDivElement, { data: EndThinkingData }>(function ThinkingStepEnd(_props, ref) {
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900',
        showOutlines && 'outline outline-blue-400/50'
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
      layout
      ref={ref}
    >
      <div>Thought for 2m 7s</div>
    </motion.div>
  );
});

const ThinkingStepPlaintext = forwardRef<HTMLDivElement, { data: PlaintextData }>(
  function ThinkingStepPlaintext(props, ref) {
    const { data } = props;
    const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
    return (
      <motion.div
        className={cn(
          'flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900',
          showOutlines && 'outline outline-yellow-400/50'
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
        layout
        ref={ref}
      >
        <div className="mb-2 font-medium">{data.title}</div>
        <div className="flex flex-col gap-2">
          <Paragraphs contentText={data.content} />
        </div>
      </motion.div>
    );
  }
);

const ThinkingStepSearch = forwardRef<HTMLDivElement, { data: SearchData }>(function ThinkingStepSearch(_props, ref) {
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-fit flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900',
        showOutlines && 'outline outline-purple-400/50'
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
      layout
      ref={ref}
    >
      <div>Searching the Web</div>
    </motion.div>
  );
});
