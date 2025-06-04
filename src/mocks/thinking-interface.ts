export interface Website {
  /**
   * @description The type of website.
   * `browsed-website` is a specific website like Wikipedia or Reddit.
   * `web-search` is a search request from a search engine like Google.
   */
  type: 'browsed-website' | 'web-search';
  title: string;
  /**
   * @description The URL of the website. `web-search` has no URL.
   */
  url?: string;
  /**
   * @description The favicon URL of the website. `web-search` has no favicon URL.
   */
  faviconUrl?: string;
}

export interface StartThinkingData {
  type: 'start-thinking';
}

export interface EndThinkingData {
  type: 'end';
}

export interface PlaintextData {
  type: 'plaintext';
  title: string;
  content: string;
}

export interface SearchData {
  type: 'search';
  title: string;
  websites: Website[];
}

export type ThinkingData = StartThinkingData | EndThinkingData | PlaintextData | SearchData;
