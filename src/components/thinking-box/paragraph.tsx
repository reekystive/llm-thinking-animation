import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { motion } from 'motion/react';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';

/** configured values */
const CHARACTERS_PER_SECOND = 150;
const SPLIT_UNIT = 5;
const ANIMATING_CHARACTERS_IN_SCREEN = 400;

/** calculated values */
const CHARACTER_DELAY_IN_SECONDS = 1 / CHARACTERS_PER_SECOND;
const UNIT_DELAY_IN_SECONDS = CHARACTER_DELAY_IN_SECONDS * SPLIT_UNIT;
const ANIMATING_UNITS_IN_SCREEN = ANIMATING_CHARACTERS_IN_SCREEN / SPLIT_UNIT;
const UNIT_ANIMATION_DURATION_IN_SECONDS = ANIMATING_UNITS_IN_SCREEN * UNIT_DELAY_IN_SECONDS;

export const Paragraphs: FC<{ contentText: string; className?: string }> = ({ contentText, className }) => {
  const paragraphs = useMemo(() => contentText.split(/\n+/).map((line) => line), [contentText]);
  const { getAnimationDuration: s } = useAppAnimationControl();

  const getParagraphAnimationDuration = (paragraph: string) => {
    const slices = paragraph.match(new RegExp(`.{1,${SPLIT_UNIT}}`, 'g')) ?? [];
    return slices.length * UNIT_DELAY_IN_SECONDS;
  };

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animationDuration = paragraphs.reduce((acc, paragraph) => acc + getParagraphAnimationDuration(paragraph), 0);
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
          type: 'spring',
          bounce: 0,
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
              paragraphs.slice(0, index).reduce((acc, p) => acc + getParagraphAnimationDuration(p), 0)
            )
          ) : (
            <Fragment>{paragraph}</Fragment>
          )}
        </p>
      ))}
    </Fragment>
  );
};
