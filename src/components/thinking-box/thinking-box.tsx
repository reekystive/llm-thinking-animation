import type {
  EndThinkingData,
  PlaintextData,
  SearchData,
  StartThinkingData,
  ThinkingData,
} from '#src/mocks/thinking-interface.ts';
import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { useMeasure } from '@react-hookz/web';
import { AnimatePresence, motion } from 'motion/react';
import { FC, forwardRef } from 'react';
import { LightSweepText } from './light-sweep-text.tsx';
import { MemoizedParagraphs } from './paragraph.tsx';
import { SearchItem } from './search-item.tsx';

interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;
  currentStep: number;
  className?: string;
}

export const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData, currentStep, className }) => {
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  const [contentMeasure, contentMeasureRef] = useMeasure<HTMLDivElement>(true);
  const [containerMeasure, containerMeasureRef] = useMeasure<HTMLDivElement>(true);

  const SHOW_PHANTOM_ELEMENT = false as boolean;
  const isSmall = currentData?.type === 'start-thinking' || currentData?.type === 'end';
  const hideThinkingBoxBorder = currentData?.type === 'start-thinking' || currentData?.type === 'end';

  return (
    <>
      {/* phantom element for measuring the size of the thinking box */}
      <div
        ref={containerMeasureRef}
        className={cn(
          'relative w-full',
          !SHOW_PHANTOM_ELEMENT && 'invisible overflow-clip',
          SHOW_PHANTOM_ELEMENT && 'outline outline-red-400/50'
        )}
      >
        <div
          className={cn(
            isSmall ? 'w-fit' : 'w-full',
            !SHOW_PHANTOM_ELEMENT && 'absolute',
            SHOW_PHANTOM_ELEMENT && 'outline outline-blue-400/50'
          )}
          ref={contentMeasureRef}
        >
          <ThinkingStep data={currentData} currentStep={currentStep} key={currentStep} disableAllAnimations />
        </div>
      </div>

      {/* real element */}
      <motion.div
        className={cn('relative overflow-clip rounded-lg')}
        animate={{
          height: contentMeasure?.height,
          width: contentMeasure?.width,
        }}
        transition={{
          duration: s(0.5),
          type: 'spring',
          bounce: 0,
        }}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-lg outline-1 -outline-offset-1 transition-all duration-300 ease-out',
            hideThinkingBoxBorder && 'outline-transparent',
            !hideThinkingBoxBorder && 'outline-gray-300/90 dark:outline-gray-700'
          )}
        ></div>
        <motion.div
          className={cn('relative', showOutlines && 'outline outline-red-300/50', className)}
          style={{ width: containerMeasure?.width }}
          layout
          transition={{
            duration: s(0.5),
            type: 'spring',
            bounce: 0,
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <ThinkingStep data={currentData} currentStep={currentStep} key={currentStep} />
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

const ThinkingStep = forwardRef<
  HTMLDivElement,
  { data: ThinkingData | undefined; currentStep: number; disableAllAnimations?: boolean }
>(function ThinkingStep(props, ref) {
  const { data, currentStep, disableAllAnimations } = props;
  return (() => {
    switch (data?.type) {
      case 'start-thinking':
        return (
          <ThinkingStepStartThinking
            ref={ref}
            data={data}
            stepKey={`start-thinking-${currentStep}`}
            key={`start-thinking-${currentStep}`}
            disableAllAnimations={disableAllAnimations}
          />
        );
      case 'end':
        return (
          <ThinkingStepEnd
            ref={ref}
            data={data}
            stepKey={`end-${currentStep}`}
            key={`end-${currentStep}`}
            disableAllAnimations={disableAllAnimations}
          />
        );
      case 'plaintext':
        return (
          <ThinkingStepPlaintext
            ref={ref}
            data={data}
            stepKey={`plaintext-${currentStep}`}
            key={`plaintext-${currentStep}`}
            disableAllAnimations={disableAllAnimations}
          />
        );
      case 'search':
        return (
          <ThinkingStepSearch
            ref={ref}
            data={data}
            stepKey={`search-${currentStep}`}
            key={`search-${currentStep}`}
            disableAllAnimations={disableAllAnimations}
          />
        );
      default:
        data satisfies undefined;
        return null;
    }
  })();
});

const ThinkingStepStartThinking = forwardRef<
  HTMLDivElement,
  { data: StartThinkingData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepStartThinking(props, ref) {
  const { stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-fit flex-col items-start px-4 py-3',
        showOutlines && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
      transition={{
        duration: s(0.5),
        type: 'spring',
        bounce: 0,
        ...(disableAllAnimations && { duration: 0 }),
      }}
      layout
      key={stepKey}
      ref={ref}
    >
      <LightSweepText className="font-medium" content="Thinking" />
    </motion.div>
  );
});

const ThinkingStepEnd = forwardRef<
  HTMLDivElement,
  { data: EndThinkingData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepEnd(props, ref) {
  const { stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-fit flex-col items-start px-4 py-3',
        showOutlines && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
      transition={{
        duration: s(0.5),
        type: 'spring',
        bounce: 0,
        ...(disableAllAnimations && { duration: 0 }),
      }}
      layout
      key={stepKey}
      ref={ref}
    >
      <div className="font-medium">Thought for 2m 7s</div>
    </motion.div>
  );
});

const ThinkingStepPlaintext = forwardRef<
  HTMLDivElement,
  { data: PlaintextData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepPlaintext(props, ref) {
  const { data, stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex flex-col items-start px-4 py-3',
        showOutlines && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
      transition={{
        duration: s(0.5),
        type: 'spring',
        bounce: 0,
        ...(disableAllAnimations && { duration: 0 }),
      }}
      layout
      key={stepKey}
      ref={ref}
    >
      <LightSweepText className="mb-2 font-medium" content={data.title} />
      <div className="flex flex-col gap-2">
        <MemoizedParagraphs contentText={data.content} disableAllAnimations={disableAllAnimations} />
      </div>
    </motion.div>
  );
});

const ThinkingStepSearch = forwardRef<
  HTMLDivElement,
  { data: SearchData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepSearch(props, ref) {
  const { data, stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showOutlines } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex flex-col items-start px-4 py-3',
        showOutlines && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 0, filter: 'blur(5px)' }}
      transition={{
        duration: s(0.5),
        type: 'spring',
        bounce: 0,
        ...(disableAllAnimations && { duration: 0 }),
      }}
      layout
      key={stepKey}
      ref={ref}
    >
      <LightSweepText className="mb-2 font-medium" content="Searching the Web" />
      <div className="flex flex-wrap gap-1">
        {data.websites.map((website, index) => (
          <SearchItem data={website} key={`${website.url}-${index}`} />
        ))}
      </div>
    </motion.div>
  );
});
