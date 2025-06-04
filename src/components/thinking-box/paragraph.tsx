import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { motion } from 'motion/react';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import {
  getSingleParagraphAnimationDurationInSeconds,
  SPLIT_UNIT,
  UNIT_ANIMATION_DURATION_IN_SECONDS,
  UNIT_DELAY_IN_SECONDS,
} from './utils.ts';

export const Paragraphs: FC<{ contentText: string; className?: string }> = ({ contentText, className }) => {
  const paragraphs = useMemo(() => contentText.split(/\n+/).map((line) => line), [contentText]);
  const { getAnimationDuration: s } = useAppAnimationControl();

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animationDuration = paragraphs.reduce(
      (acc, paragraph) => acc + getSingleParagraphAnimationDurationInSeconds(paragraph),
      0
    );
    const timeoutId = setTimeout(
      () => {
        setIsAnimating(false);
      },
      s(animationDuration + UNIT_ANIMATION_DURATION_IN_SECONDS) * 1000
    );
    return () => {
      clearTimeout(timeoutId);
      setIsAnimating(true);
    };
  }, [contentText, paragraphs, s]);

  const renderParagraph = (paragraph: string, previousParagraphAnimationDuration: number) => {
    const slices = paragraph.match(new RegExp(`.{1,${SPLIT_UNIT}}`, 'g')) ?? [];
    return slices.map((slice, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: s(UNIT_ANIMATION_DURATION_IN_SECONDS),
          type: 'tween',
          ease: 'easeInOut',
          delay: s(previousParagraphAnimationDuration + index * UNIT_DELAY_IN_SECONDS),
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
          {isAnimating ? (
            renderParagraph(
              paragraph,
              paragraphs.slice(0, index).reduce((acc, p) => acc + getSingleParagraphAnimationDurationInSeconds(p), 0)
            )
          ) : (
            <Fragment>{paragraph}</Fragment>
          )}
        </p>
      ))}
    </Fragment>
  );
};
