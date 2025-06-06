/**
 * Split text by visible characters.
 */
export function splitByVisibleCharacters(text: string): string[] {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const graphemes = [...segmenter.segment(text)].map((s) => s.segment);
  return graphemes;
}

export function splitByVisibleCharacterGroups(text: string, groupSize: number): string[] {
  const graphemes = splitByVisibleCharacters(text);
  const result: string[] = [];
  for (let i = 0; i < graphemes.length; i += groupSize) {
    result.push(graphemes.slice(i, i + groupSize).join(''));
  }
  return result;
}
