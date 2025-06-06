import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { motion } from 'motion/react';
import { FC, Fragment, memo, useMemo } from 'react';
import {
  getSingleParagraphAnimationDurationInSeconds,
  SPLIT_UNIT,
  UNIT_ANIMATION_DURATION_IN_SECONDS,
  UNIT_DELAY_IN_SECONDS,
} from './utils.ts';

export const Paragraphs: FC<{ contentText: string; className?: string; disableAllAnimations?: boolean }> = ({
  contentText,
  className,
  disableAllAnimations,
}) => {
  const paragraphs = useMemo(() => contentText.split(/\n+/).map((line) => line), [contentText]);
  const { getAnimationDuration: s } = useAppAnimationControl();
  const { showOutlines } = useAppAnimationControl();

  const renderParagraph = (paragraph: string, previousParagraphAnimationDuration: number) => {
    const slices = paragraph.match(new RegExp(`.{1,${SPLIT_UNIT}}`, 'g')) ?? [];
    return slices.map((slice, index) => (
      <motion.span
        key={index}
        className={cn(showOutlines && 'outline-1 -outline-offset-1 outline-yellow-400/50')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: s(UNIT_ANIMATION_DURATION_IN_SECONDS),
          type: 'tween',
          ease: 'easeInOut',
          delay: s(previousParagraphAnimationDuration + index * UNIT_DELAY_IN_SECONDS),
          ...(disableAllAnimations && { duration: 0, delay: 0 }),
        }}
      >
        {slice}
      </motion.span>
    ));
  };

  return (
    <Fragment key={contentText}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={cn(className)}>
          {renderParagraph(
            paragraph,
            paragraphs.slice(0, index).reduce((acc, p) => acc + getSingleParagraphAnimationDurationInSeconds(p), 0)
          )}
        </p>
      ))}
    </Fragment>
  );
};

export const MemoizedParagraphs = memo(Paragraphs);
