import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';

const LIGHT_STRIP_WIDTH_PERCENT = 30;

export interface LightSweepTextProps {
  content: string;
  className?: string;
  delayInSeconds?: number;
  durationInSeconds?: number;
  repeatDelayInSeconds?: number;
  disableAllAnimations?: boolean;
}

// p means percent
// if the text width is M, the sweep width is N, the mask should looks like
// M - N - M
const pSweepWidthRelativeToText = LIGHT_STRIP_WIDTH_PERCENT;
const pMaskWidthRelativeToText = 200 + pSweepWidthRelativeToText;
const pLeftMaskSolidWidthRelativeToSelf = (100 / pMaskWidthRelativeToText) * 100;
const pMiddleGradientWidthRelativeToSelf = 100 - 2 * pLeftMaskSolidWidthRelativeToSelf;

const sweepOpacity = 0.3;
const invertSweepOpacity = 0.6;
const defaultInvertOpacity = true;

const getMaskImage = (config: { enableDebug: boolean; invertOpacity: boolean }) => {
  const o = sweepOpacity;
  const io = invertSweepOpacity;
  const s = pLeftMaskSolidWidthRelativeToSelf;
  const w = pMiddleGradientWidthRelativeToSelf;
  const e = s + w;

  if (config.enableDebug) {
    if (config.invertOpacity) {
      return `linear-gradient(
      90deg,
      rgba(0,0,0,${io}) ${s}%,
      black ${s + 0.1}%,
      black ${e - 0.1}%,
      rgba(0,0,0,${io}) ${e}%)`;
    } else {
      return `linear-gradient(
      90deg,
      black ${s}%,
      rgba(0,0,0,${o}) ${s + 0.1}%,
      rgba(0,0,0,${o}) ${e - 0.1}%,
      black ${e}%)`;
    }
  } else {
    if (config.invertOpacity) {
      return `linear-gradient(90deg,
      rgba(0,0,0,${io}) ${s}%,
      black ${s + w * 0.5}%,
      rgba(0,0,0,${io}) ${e}%)`;
    } else {
      return `linear-gradient(90deg,
      black ${s}%,
      rgba(0,0,0,${o}) ${s + w * 0.5}%,
      black ${e}%)`;
    }
  }
};

export const LightSweepText: FC<LightSweepTextProps> = ({
  content,
  className,
  durationInSeconds = 2,
  delayInSeconds = 0.75,
  repeatDelayInSeconds = 1,
  disableAllAnimations = false,
}) => {
  const { getAnimationDuration: s, showBorders } = useAppAnimationControl();

  const getMaskPositionPercent = (percentRelativeToText: number) => {
    // if the text width is A, the mask width is B = 2A
    // 100% always means move the mask by (A - B) * 100% which is -A * 100%
    // so 100% actually means moves the mask to the left by A * 100%
    const pDelta = 100 - pMaskWidthRelativeToText;
    return (percentRelativeToText / pDelta) * 100;
  };

  return (
    <AnimatePresence initial={true}>
      <motion.div
        className={cn(showBorders && 'bg-red-600/30', className)}
        style={{
          maskImage: getMaskImage({ enableDebug: showBorders, invertOpacity: defaultInvertOpacity }),
          maskSize: `${pMaskWidthRelativeToText}% 100%`,
          maskRepeat: 'no-repeat',
        }}
        initial={{
          maskPosition: `${getMaskPositionPercent(-(100 + pSweepWidthRelativeToText))} 0%`,
        }}
        animate={{
          maskPosition: `${getMaskPositionPercent(0)}% 0%`,
        }}
        transition={{
          duration: s(durationInSeconds),
          repeat: Infinity,
          type: 'tween',
          ease: 'easeOut',
          delay: s(delayInSeconds),
          repeatDelay: s(repeatDelayInSeconds),
          ...(disableAllAnimations && { duration: 0, delay: 0, repeat: 0 }),
        }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
};
