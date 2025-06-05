import { readFile } from 'fs/promises';

const bannerContentFilePath = new URL('./resources/banner-content.mjs', import.meta.url);

const bannerContent = (await readFile(bannerContentFilePath, 'utf-8'))
  .replace('<PLACEHOLDER_YEAR>', new Date().getFullYear().toString())
  .replace('<PLACEHOLDER_AUTHOR>', 'Mingxuan Wang');

export { bannerContent };
