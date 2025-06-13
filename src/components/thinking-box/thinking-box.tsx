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
import { AnimatePresence, cubicBezier, motion, useAnimationControls } from 'motion/react';
import { FC, forwardRef, memo, RefCallback, useCallback, useLayoutEffect, useRef } from 'react';
import { LightSweepText } from './light-sweep-text.tsx';
import { MemoizedParagraphs } from './paragraph.tsx';
import { SearchItem } from './search-item.tsx';

interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;
  currentStep: number;
  className?: string;
}

export const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData, currentStep, className }) => {
  const { getAnimationDuration: s, showBorders } = useAppAnimationControl();
  const [contentMeasure, contentMeasureRef] = useMeasure<HTMLDivElement>(true);
  const [containerMeasure, containerMeasureRef] = useMeasure<HTMLDivElement>(true);
  const immediateContentWidth = useRef<number | undefined>(undefined);

  // immediate content measure is only for first mount while the useMeasure is still undefined
  const immediateContentMeasureRef: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (!node) {
        return;
      }
      contentMeasureRef.current = node;
      immediateContentWidth.current = node.getBoundingClientRect().width;
    },
    [contentMeasureRef]
  );

  const isSmall = currentData?.type === 'start-thinking' || currentData?.type === 'end';
  const hideThinkingBoxBorder = currentData?.type === 'end';

  const controls = useAnimationControls();
  useLayoutEffect(() => {
    if (contentMeasure?.width === undefined) {
      controls.set({ width: immediateContentWidth.current });
      return;
    }
    void controls.start({
      height: contentMeasure.height,
      width: contentMeasure.width,
    });
  }, [contentMeasure?.height, contentMeasure?.width, controls]);

  return (
    <>
      {/* phantom element for measuring the width of the container */}
      <div ref={containerMeasureRef} className="invisible h-0 w-full"></div>

      {/* animated container with adaptive width (measured from the content) */}
      <motion.div
        className={cn('relative overflow-clip rounded-lg')}
        animate={controls}
        transition={{
          duration: s(0.5),
          type: 'spring',
          bounce: 0,
        }}
      >
        {/* border */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-lg outline-1 -outline-offset-1 transition-all duration-300 ease-out',
            hideThinkingBoxBorder && 'outline-transparent',
            !hideThinkingBoxBorder && 'outline-gray-300/90 dark:outline-gray-700'
          )}
        ></div>

        {/* fix the width of the inner container to avoid the layout being affected by the parent container */}
        <div
          className={cn(showBorders && 'outline outline-red-300/50', className)}
          style={{ width: containerMeasure?.width }}
        >
          {/* measure the width and height of the content, and use is as the */}
          <div ref={immediateContentMeasureRef} className={cn(isSmall && 'w-fit', !isSmall && 'w-full')}>
            <AnimatePresence initial={false} mode="popLayout">
              <MemoizedThinkingStep data={currentData} currentStep={currentStep} key={currentStep} />
            </AnimatePresence>
          </div>
        </div>
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

const MemoizedThinkingStep = memo(ThinkingStep);

const ThinkingStepStartThinking = forwardRef<
  HTMLDivElement,
  { data: StartThinkingData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepStartThinking(props, ref) {
  const { stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showBorders } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-fit flex-col items-start px-4 py-3',
        showBorders && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      initial={{ x: -2, opacity: 0, filter: 'blur(2px)' }}
      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      exit={{ x: 6, opacity: 0, filter: 'blur(2px)' }}
      transition={{
        duration: s(0.75),
        type: 'spring',
        bounce: 0,
        ...(disableAllAnimations && { duration: 0 }),
      }}
      key={stepKey}
      ref={ref}
    >
      <LightSweepText className="font-medium" content="Thinking" disableAllAnimations={disableAllAnimations} />
    </motion.div>
  );
});

const ThinkingStepEnd = forwardRef<
  HTMLDivElement,
  { data: EndThinkingData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepEnd(props, ref) {
  const { stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showBorders } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-fit flex-col items-start px-4 py-3',
        showBorders && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      initial={{ x: -2, opacity: 0, filter: 'blur(2px)' }}
      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      exit={{ x: 6, opacity: 0, filter: 'blur(2px)' }}
      transition={{
        duration: s(0.75),
        type: 'spring',
        bounce: 0,
        ...(disableAllAnimations && { duration: 0 }),
      }}
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
  const { getAnimationDuration: s, showBorders } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-full flex-col items-start px-4 py-3',
        showBorders && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      key={stepKey}
      ref={ref}
    >
      <motion.div
        initial={{ x: -2, opacity: 0, filter: 'blur(2px)' }}
        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ x: 6, opacity: 0, filter: 'blur(2px)' }}
        transition={{
          duration: s(0.75),
          type: 'spring',
          bounce: 0,
          ...(disableAllAnimations && { duration: 0 }),
        }}
        className="mb-1"
      >
        <LightSweepText className="font-medium" content={data.title} disableAllAnimations={disableAllAnimations} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -12, filter: 'blur(1px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 0, filter: 'blur(4px)' }}
        transition={{
          default: {
            duration: s(0.75),
            type: 'spring',
            bounce: 0,
            ...(disableAllAnimations && { duration: 0 }),
          },
          y: {
            type: 'tween',
            duration: s(0.5),
            ease: cubicBezier(0.1, 1, 0.8, 1),
            ...(disableAllAnimations && { duration: 0 }),
          },
        }}
        className="flex w-full flex-col gap-2 pb-1"
      >
        <MemoizedParagraphs contentText={data.content} disableAllAnimations={disableAllAnimations} />
      </motion.div>
    </motion.div>
  );
});

const ThinkingStepSearch = forwardRef<
  HTMLDivElement,
  { data: SearchData; stepKey: string; disableAllAnimations?: boolean }
>(function ThinkingStepSearch(props, ref) {
  const { data, stepKey, disableAllAnimations } = props;
  const { getAnimationDuration: s, showBorders } = useAppAnimationControl();
  return (
    <motion.div
      className={cn(
        'flex w-full flex-col items-start px-4 py-3',
        showBorders && 'outline outline-yellow-400/50',
        disableAllAnimations && 'transition-none'
      )}
      layout
      key={stepKey}
      ref={ref}
    >
      <motion.div
        initial={{ x: -2, opacity: 0, filter: 'blur(2px)' }}
        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ x: 6, opacity: 0, filter: 'blur(2px)' }}
        transition={{
          duration: s(0.75),
          type: 'spring',
          bounce: 0,
          ...(disableAllAnimations && { duration: 0 }),
        }}
        className="mb-2"
      >
        <LightSweepText
          className="font-medium"
          content="Searching the Web"
          disableAllAnimations={disableAllAnimations}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -6, filter: 'blur(1px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 0, filter: 'blur(4px)' }}
        transition={{
          default: {
            duration: s(0.75),
            type: 'spring',
            bounce: 0,
            ...(disableAllAnimations && { duration: 0 }),
          },
          y: {
            type: 'tween',
            duration: s(0.5),
            ease: cubicBezier(0.1, 1, 0.8, 1),
            ...(disableAllAnimations && { duration: 0 }),
          },
        }}
        className="mx-[-2px] flex w-[calc(100%+4px)] flex-wrap gap-1 pb-1"
      >
        {data.websites.map((website, index) => (
          <SearchItem data={website} key={`${website.url}-${index}`} />
        ))}
      </motion.div>
    </motion.div>
  );
});
