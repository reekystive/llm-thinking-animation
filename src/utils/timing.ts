import {
  FIRST_FRAME_DELAY_OFFSET_IN_SECONDS,
  getContentTextAnimationDurationInSeconds,
} from '#src/components/thinking-box/utils.ts';
import type { ThinkingData } from '#src/mocks/thinking-interface.ts';

const DEFAULT_STEP_DURATION_IN_SECONDS = 2;
const PLAIN_TEXT_STEP_EXTRA_DURATION_IN_SECONDS = 0.75;

export const getStepDurationInSeconds = (thinkingData?: ThinkingData) => {
  if (thinkingData?.type === 'plaintext') {
    const duration =
      getContentTextAnimationDurationInSeconds(thinkingData.content) +
      PLAIN_TEXT_STEP_EXTRA_DURATION_IN_SECONDS +
      FIRST_FRAME_DELAY_OFFSET_IN_SECONDS;
    const roundedDuration = Math.ceil(duration * 1000) / 1000;
    return roundedDuration;
  }
  return DEFAULT_STEP_DURATION_IN_SECONDS;
};
