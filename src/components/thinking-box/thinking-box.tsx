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
import { SearchItem } from './search-item.tsx';

interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;
  currentStep: number;
  className?: string;
}

export const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData, currentStep, className }) => {
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  const small = currentData?.type === 'start-thinking' || currentData?.type === 'end';
  return (
    <motion.div
      className={cn(
        'relative overflow-clip rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900',
        showOutlines && 'outline outline-red-300/50',
        small && 'w-fit',
        className
      )}
      layout
      layoutId="thinking-box"
      transition={{ layout: { duration: s(0.4), type: 'spring', bounce: 0 } }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {(() => {
          switch (currentData?.type) {
            case 'start-thinking':
              return (
                <ThinkingStepStartThinking
                  data={currentData}
                  stepKey={`start-thinking-${currentStep}`}
                  key={`start-thinking-${currentStep}`}
                />
              );
            case 'end':
              return <ThinkingStepEnd data={currentData} stepKey={`end-${currentStep}`} key={`end-${currentStep}`} />;
            case 'plaintext':
              return (
                <ThinkingStepPlaintext
                  data={currentData}
                  stepKey={`plaintext-${currentStep}`}
                  key={`plaintext-${currentStep}`}
                />
              );
            case 'search':
              return (
                <ThinkingStepSearch
                  data={currentData}
                  stepKey={`search-${currentStep}`}
                  key={`search-${currentStep}`}
                />
              );
            default:
              currentData satisfies undefined;
              return null;
          }
        })()}
      </AnimatePresence>
    </motion.div>
  );
};

const ThinkingStepStartThinking = forwardRef<HTMLDivElement, { data: StartThinkingData; stepKey: string }>(
  function ThinkingStepStartThinking(props, ref) {
    const { stepKey } = props;
    const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
    return (
      <motion.div
        className={cn('flex w-fit flex-col items-start', showOutlines && 'outline outline-green-400/50')}
        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
        layout
        key={stepKey}
        ref={ref}
      >
        <div className="font-medium">Thinking</div>
      </motion.div>
    );
  }
);

const ThinkingStepEnd = forwardRef<HTMLDivElement, { data: EndThinkingData; stepKey: string }>(
  function ThinkingStepEnd(props, ref) {
    const { stepKey } = props;
    const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
    return (
      <motion.div
        className={cn('flex w-fit flex-col items-start', showOutlines && 'outline outline-blue-400/50')}
        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
        layout
        key={stepKey}
        ref={ref}
      >
        <div className="font-medium">Thought for 2m 7s</div>
      </motion.div>
    );
  }
);

const ThinkingStepPlaintext = forwardRef<HTMLDivElement, { data: PlaintextData; stepKey: string }>(
  function ThinkingStepPlaintext(props, ref) {
    const { data, stepKey } = props;
    const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
    return (
      <motion.div
        className={cn('flex flex-col items-start', showOutlines && 'outline outline-yellow-400/50')}
        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
        layout
        key={stepKey}
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

const ThinkingStepSearch = forwardRef<HTMLDivElement, { data: SearchData; stepKey: string }>(
  function ThinkingStepSearch(props, ref) {
    const { data, stepKey } = props;
    const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
    return (
      <motion.div
        className={cn('flex flex-col items-start', showOutlines && 'outline outline-purple-400/50')}
        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
        layout
        key={stepKey}
        ref={ref}
      >
        <div className="mb-2 font-medium">Searching the Web</div>
        <div className="flex flex-wrap gap-1">
          {data.websites.map((website, index) => (
            <SearchItem data={website} key={`${website.url}-${index}`} />
          ))}
        </div>
      </motion.div>
    );
  }
);
