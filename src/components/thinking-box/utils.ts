/** configured values */
export const CHARACTERS_PER_SECOND = 200;
export const SPLIT_UNIT = 10;
export const ANIMATING_CHARACTERS_IN_SCREEN = 200;
export const FIRST_FRAME_ANIMATING_CHARACTER_COUNT = 80;

/** calculated values */
export const CHARACTER_DELAY_IN_SECONDS = 1 / CHARACTERS_PER_SECOND;
export const UNIT_DELAY_IN_SECONDS = CHARACTER_DELAY_IN_SECONDS * SPLIT_UNIT;
export const ANIMATING_UNITS_IN_SCREEN = ANIMATING_CHARACTERS_IN_SCREEN / SPLIT_UNIT;
export const UNIT_ANIMATION_DURATION_IN_SECONDS = ANIMATING_UNITS_IN_SCREEN * UNIT_DELAY_IN_SECONDS;
export const FIRST_FRAME_DELAY_OFFSET_IN_SECONDS = -FIRST_FRAME_ANIMATING_CHARACTER_COUNT / CHARACTERS_PER_SECOND;

export const getSingleParagraphAnimationDurationInSeconds = (paragraph: string) => {
  const slices = paragraph.match(new RegExp(`.{1,${SPLIT_UNIT}}`, 'g')) ?? [];
  return slices.length * UNIT_DELAY_IN_SECONDS;
};

export const getContentTextAnimationDurationInSeconds = (contentText: string) => {
  const paragraphs = contentText.split(/\n+/).map((line) => line);
  return (
    paragraphs.reduce((acc, paragraph) => acc + getSingleParagraphAnimationDurationInSeconds(paragraph), 0) +
    UNIT_ANIMATION_DURATION_IN_SECONDS
  );
};
