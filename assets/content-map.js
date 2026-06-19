// assets/content-map.js
// Site content partition, tag indexing, and search filtering helpers

const siteBaseUrl = "https://portalindex-hth.com.cn";

const contentSections = [
  {
    id: "overview",
    title: "Overview",
    tags: ["华体会", "intro", "summary"],
    url: `${siteBaseUrl}/overview`,
  },
  {
    id: "services",
    title: "Services",
    tags: ["华体会", "solutions", "platform"],
    url: `${siteBaseUrl}/services`,
  },
  {
    id: "blog",
    title: "Blog",
    tags: ["华体会", "articles", "updates"],
    url: `${siteBaseUrl}/blog`,
  },
  {
    id: "support",
    title: "Support",
    tags: ["华体会", "help", "faq"],
    url: `${siteBaseUrl}/support`,
  },
  {
    id: "about",
    title: "About",
    tags: ["华体会", "company", "team"],
    url: `${siteBaseUrl}/about`,
  },
];

const keywordTags = [
  "华体会",
  "portal",
  "index",
  "guide",
  "reference",
  "demo",
  "quickstart",
];

/**
 * Filter sections whose tags contain any of the given keywords.
 * Matching is case-insensitive and partial.
 * @param {string[]} keywords
 * @returns {object[]}
 */
function searchSectionsByKeywords(keywords) {
  if (!keywords || keywords.length === 0) return contentSections;

  const lowerKeywords = keywords.map((kw) => kw.toLowerCase());

  return contentSections.filter((section) => {
    const lowerTags = section.tags.map((tag) => tag.toLowerCase());
    return lowerKeywords.some((kw) =>
      lowerTags.some((tag) => tag.includes(kw))
    );
  });
}

/**
 * Get all tags across sections, deduplicated.
 * @returns {string[]}
 */
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach((section) => {
    section.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

/**
 * Simple full-text search across section titles and tags.
 * @param {string} query
 * @returns {object[]}
 */
function searchSections(query) {
  if (!query || query.trim() === "") return contentSections;
  const lowerQuery = query.toLowerCase();
  return contentSections.filter(
    (section) =>
      section.title.toLowerCase().includes(lowerQuery) ||
      section.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export {
  contentSections,
  keywordTags,
  siteBaseUrl,
  searchSectionsByKeywords,
  getAllTags,
  searchSections,
};