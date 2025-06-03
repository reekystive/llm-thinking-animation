/* cspell:disable */

import { ThinkingData } from './thinking-interface.ts';

const THINKING_CONTENT_1 = `
I should check the Summer Sonic 2025 lineup and performance dates, since the user specifically asked for up-to-date details.
I'll need to search carefully for the full lineup and relevant info, then provide a suggested itinerary for traveling from Singapore (presumably) to Japan.
Once I get the details, I'll lay them out in markdown format with headers and give proper citations for the information, ensuring I meet the request as accurately as I can.
`.trim();

const THINKING_CONTENT_2 = `
I'll start by recommending travel options from Singapore to Tokyo or Osaka. The user likely wants to arrive a few days before the festival
`.trim();

const THINKING_CONTENT_3 = `
I'll start by recommending travel options from Singapore to Tokyo or Osaka. The user likely wants to arrive a few days before the festival, so I'll include that detail. For lodging, I'll suggest places close to Makuhari Messe/Zozo Marine Stadium (Tokyo) and Intex Osaka or Maishima Sonic Park. I'll also provide optional side trips and a recommended daily schedule. Since the user didn't request any flight booking or code, I'll focus on general travel suggestions. Markdown format will help organize the information neatly.
`.trim();

const THINKING_CONTENT_4 = `
I think it might be a good idea to include the itinerary as narrative paragraphs instead of just a list. It'll keep it engaging and provide a smoother flow.
Also, since the user is communicating in mixed Chinese and English, I'll make sure to use proper spacing between them. Once I've outlined the narrative, I'll switch to Markdown for structure and clarity. This approach should make everything easier to follow!
`.trim();

const THINKING_CONTENT_5 = `
The user likely wants a travel itinerary in addition to the Summer Sonic 2025 lineup. Since they're in Singapore, I'll tailor the travel suggestions around flights or transport options from there to Japan.
I'll deliver the lineup and performance schedule in Markdown, using both Chinese and English where relevant.
Once I gather all the necessary information, I'll ensure the response smoothly blends details about the event and travel suggestions in narrative form.
`.trim();

// Searchd the web here

const THINKING_CONTENT_6 = `
I need to search for several sources to confirm the 2025 Summer Sonic lineup. I've already found some information on Tokyo day 1, specifically for the Pacific stage, but I think I need to dig deeper by accessing additional pages to verify the full set of performers. I'll explore more of the official site for both Tokyo and Osaka stages to ensure I have the complete lineup. Let's open those pages and double-check everything.
`.trim();

const THINKING_CONTENT_7 = `
I'm checking multiple sources for the Summer Sonic 2025 dates. Sites like Songkick and Japan Travel show August
`.trim();

const THINKING_CONTENT_8 = `
I'm cross-referencing several sources for Summer Sonic 2025 by checking aggregator sites like Festivawl, Jambase, Songkick, and others for event dates, which are listed as August 16–17, 2025, by both Songkick and Japan Travel. I did not capture the official site earlier, possibly due to access issues, but I've found lineup info from other reliable sources. I'll explore the Songkick page further to confirm the details.
`.trim();

const THINKING_CONTENT_9 = `
I'm using aggregator sites like Festivawl, MusicFestivalWizard, Songkick, and Jambase to gather the Summer Sonic 2025 lineup and verify the event dates, which Songkick and Japan Travel show as August 16-17, 2025. My previous search didn't capture the official site because I got older results. There's still useful info from other sources. To be more accurate, I'll open the official lineup for Day 1 from the site and check it more thoroughly.
`.trim();

const THINKING_CONTENT_10 = `
It looks like I'm using aggregator sites like Songkick, Festivawl, and Japan Travel to confirm the Summer Sonic 2025 dates, which appear to be August 16-17. I couldn't access the official site directly due to some network restrictions, so I'm turning to other sources for lineup details. Despite some issues with redirects, I can still rely on those aggregator sites for the event's lineup. I'll focus on gathering the needed information from these alternative resources.
`.trim();

const THINKING_CONTENT_11 = `
Some sources we've captured are JapanTravel Tokyo, Festivawl, and MusicFestivalWizard. I'm having issues with outdated results showing up, likely because of pre-crawled pages. Instead of relying on these flawed calls, I'll focus on the earlier data we gathered from sites like JapanTravel and Festivawl. Still, I need more lineup details. Next, I'll open the MusicFestivalWizard page to see if it gives me the extra information I'm looking for.
`.trim();

const THINKING_CONTENT_12 = `
I'm going to open a search result to check for the lineup of Summer Sonic 2025, specifically looking for details on Fall Out Boy and Alicia Keys. Let's see if I can find an official or reliable source with the lineup info from this search.
`.trim();

const THINKING_CONTENT_13 = `
It looks like we've encountered some issues with stale data or redirections when trying to check official websites. Despite this, we've got useful snippets from sources like JapanTravel and Festivawl, though we need more detailed lineup info. Attempts to load certain pages are being redirected to irrelevant content (like Reddit), possibly due to website restrictions or cloud limitations. I'll focus on the information already gathered and try compiling it from these aggregator sources instead.
`.trim();

// Searchd the web here

const THINKING_CONTENT_14 = `
I've found a better result for Summer Sonic 2025! The official site provides details for the Tokyo Day 2 lineup on August 17, including the Marine Stage. Additionally, earlier I found information about Pacific Stage for Day 1, but now I'll go ahead and open the official Day 1 lineup page directly and search again for specifics like "Tokyo August 16 Marine Stage Summer Sonic 2025" to gather more details about that date too.
`.trim();

// Searchd the web here

const THINKING_CONTENT_15 = `
I found much better results! We now have the official lineup for Tokyo Day 2 (August 17), including the Marine Stage details. I also captured Pacific Stage information for Day 1 earlier. I'll try the official Day 1 lineup pages again, and search for "Tokyo 08/16 Marine Stage Summer Sonic 2025" for better results. Also, I'll need to gather details for Osaka, so my next step is searching "Osaka 08/17 Marine Stage Summer Sonic 2025" to complete both event days.
`.trim();

// Searchd the web here

const THINKING_CONTENT_16 = `
Now, I have a solid lineup for Tokyo Day 2, including Marine Stage details, from the official site. I also captured some of Day 1's Pacific Stage lineup earlier. I'll try again for the official Day 1 lineup and search for "Tokyo 08/16 Marine Stage Summer Sonic 2025" to be sure. Also, the Osaka Day 1 and Day 2 lineups will need more searching. I'll look up "Osaka 08/17 Marine Stage Summer Sonic 2025" and use aggregator lists if scrolling through results is needed.
`.trim();

const THINKING_CONTENT_17 = `
It looks like I need to summarize major Summer Sonic 2025 details. For Tokyo, Day 1 includes Fall Out Boy and Official Hige Dandism, while Day 2 showcases Alicia Keys, aespa, and Camila Cabello. In Osaka, Day 1 has artists like Alicia Keys and Be:First, and Day 2 features Fall Out Boy. I'm also drafting travel itineraries for the user based in Singapore, suggesting 4-5 day trips between Tokyo and Osaka. I'll ensure it's professional, including travel details, event dates, and lineups from reliable sources. I'll also apply proper citations as required.
`.trim();

const THINKING_CONTENT_18 = `
For a clear and detailed response, I'll summarize the festival lineup for Summer Sonic 2025. I'll cover Tokyo's Day 1 and Day 2 with bands like Fall Out Boy, Official Hige Dandism, Alicia Keys, aespa, and Camila Cabello. Osaka's lineup shares some artists, like Alicia Keys and Be:First. For itinerary recommendations, I'll propose a mix of Tokyo-only and Tokyo+Osaka options, focusing on flights from Singapore and professional travel details, along with relevant citations for dates and lineups.
`.trim();

const THINKING_CONTENT_19 = `
I'm putting everything together now. The answer needs to be organized with clear sections, such as an overall summary, lineup details for Tokyo and Osaka, and even travel itinerary suggestions for attending the festival. I'll provide recommended travel strategies, including options for Tokyo only, Tokyo + Osaka, and Osaka-only trips. I also need to gather citations and reference sources like JapanTravel and Songkick for accurate lineup and event info. I'll be careful to structure it with the right headings in Markdown.
`.trim();

const THINKING_CONTENT_20 = `
I'm setting up a summary paragraph to kick things off, then I'll organize everything into clear sections: an overview, lineup details for Tokyo and Osaka, and travel itinerary suggestions. I'll detail accommodation options and travel strategies, like Tokyo-only or Tokyo + Osaka itineraries. I'll also make sure to reference some key sources to provide accurate event information, taking extra care to include 10 citations while double-checking stage lineups for Osaka via reliable sources. This will come together with clear Markdown formatting.
`.trim();

const THINKING_CONTENT_21 = `
It looks like gathering the full lineup for Osaka is turning into a challenge. I'll rely on aggregator sources like Bandwagon, Songkick, and JapanTravel, since the official site isn't coming through. I've already captured part of the Osaka day 16 lineup from JapanTravel. Even if I don't have full confirmation, I can at least stick with the Tokyo lineups we have, which are more definitive. I'll cross-check these sources and move forward!
`.trim();

export const mockData: ThinkingData[] = [
  {
    type: 'plaintext',
    title: 'Gathering Summer Sonic 2025 info',
    content: THINKING_CONTENT_1,
  },
  {
    type: 'plaintext',
    title: 'Planning travel itinerary',
    content: THINKING_CONTENT_2,
  },
  {
    type: 'plaintext',
    title: 'Considering itinerary and lineup details',
    content: THINKING_CONTENT_3,
  },
  {
    type: 'plaintext',
    title: 'Narrative itinerary suggestion',
    content: THINKING_CONTENT_4,
  },
  {
    type: 'plaintext',
    title: 'Tailoring travel suggestions',
    content: THINKING_CONTENT_5,
  },
  {
    type: 'search',
    title: 'Searching the web',
    websites: [
      {
        type: 'web-search',
        title: 'Summer Sonic 2025 lineup Tokyo',
      },
      {
        type: 'web-search',
        title: 'Summer Sonic 2025 lineup Osaka',
      },
      {
        type: 'web-search',
        title: 'Summer Sonic 2025 dates',
      },
      {
        type: 'browsed-website',
        title: 'www.reddit.com',
        url: 'https://www.reddit.com/r/indieheads/comments/1btvyj8/summer_sonic_2024_2nd_line_up',
        faviconUrl: 'https://www.google.com/s2/favicons?domain=https%3A%2F%2Fwww.reddit.com&sz=32',
      },
      {
        type: 'browsed-website',
        title: 'www.facebook.com',
        url: 'https://www.facebook.com/unipatw/posts/971637124329042/',
        faviconUrl: 'https://www.google.com/s2/favicons?domain=https%3A%2F%2Fwww.facebook.com&sz=32',
      },
      {
        type: 'browsed-website',
        title: 'en.wikipedia.org',
        url: 'https://en.wikipedia.org/wiki/Summer_Sonic_Festival',
        faviconUrl: 'https://www.google.com/s2/favicons?domain=https%3A%2F%2Fen.wikipedia.org&sz=32',
      },
    ],
  },
  {
    type: 'plaintext',
    title: 'Verifying Summer Sonic lineup',
    content: THINKING_CONTENT_6,
  },
  {
    type: 'plaintext',
    title: 'Verifying event dates',
    content: THINKING_CONTENT_7,
  },
  {
    type: 'plaintext',
    title: 'Cross-referencing lineup sources',
    content: THINKING_CONTENT_8,
  },
  {
    type: 'plaintext',
    title: 'Exploring official lineup pages',
    content: THINKING_CONTENT_9,
  },
  {
    type: 'plaintext',
    title: 'Relying on aggregator sites',
    content: THINKING_CONTENT_10,
  },
  {
    type: 'plaintext',
    title: 'Addressing outdated data issues',
    content: THINKING_CONTENT_11,
  },
  {
    type: 'plaintext',
    title: 'Summarizing lineup details',
    content: THINKING_CONTENT_12,
  },
  {
    type: 'plaintext',
    title: 'Drafting travel itineraries',
    content: THINKING_CONTENT_13,
  },
  {
    type: 'search',
    title: 'Searching the web',
    websites: [
      {
        type: 'web-search',
        title: 'Alicia Keys Summer Sonic 2025 lineup',
      },
    ],
  },
  {
    type: 'plaintext',
    title: 'Organizing response structure',
    content: THINKING_CONTENT_14,
  },
  {
    type: 'search',
    title: 'Searching the web',
    websites: [
      {
        type: 'web-search',
        title: 'Summer Sonic 2025 Tokyo 08/16 lineup Marine Stage',
      },
    ],
  },
  {
    type: 'plaintext',
    title: 'Setting up summary and sections',
    content: THINKING_CONTENT_15,
  },
  {
    type: 'search',
    title: 'Searching the web',
    websites: [
      {
        type: 'web-search',
        title: 'OSAKA 08/17 MARINE STAGE Summer Sonic 2025 Alicia Keys Osaka',
      },
    ],
  },
  {
    type: 'plaintext',
    title: 'Challenges in gathering Osaka lineup',
    content: THINKING_CONTENT_16,
  },
  {
    type: 'plaintext',
    title: 'Summarizing major details',
    content: THINKING_CONTENT_17,
  },
  {
    type: 'plaintext',
    title: 'Detailed response summary',
    content: THINKING_CONTENT_18,
  },
  {
    type: 'plaintext',
    title: 'Compiling information',
    content: THINKING_CONTENT_19,
  },
  {
    type: 'plaintext',
    title: 'Structuring the response',
    content: THINKING_CONTENT_20,
  },
  {
    type: 'plaintext',
    title: 'Finalizing lineup and itinerary',
    content: THINKING_CONTENT_21,
  },
];
