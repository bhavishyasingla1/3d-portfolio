const SITE_URL = "https://bhavishyasingla.in";
const SITE_NAME = "Bhavishya Singla";
const DEFAULT_IMAGE = `${SITE_URL}/images/preview1.webp`;

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

/**
 * Sets <title> and updates/creates all SEO-relevant <meta> tags
 * for the current page. Call on every route change.
 */
export function setSEO({
  title,
  description,
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  tags,
}: SEOProps) {
  document.title = title;

  const metas: Record<string, string> = {
    description,
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:image": image,
    "og:type": type,
    "og:site_name": SITE_NAME,
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
  };

  if (publishedTime) {
    metas["article:published_time"] = publishedTime;
  }

  if (tags && tags.length > 0) {
    metas["article:tag"] = tags.join(", ");
  }

  for (const [key, value] of Object.entries(metas)) {
    const isOG = key.startsWith("og:") || key.startsWith("article:");
    const selector = isOG
      ? `meta[property="${key}"]`
      : `meta[name="${key}"]`;

    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      if (isOG) {
        el.setAttribute("property", key);
      } else {
        el.setAttribute("name", key);
      }
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  // Update canonical
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

/**
 * Injects a JSON-LD <script> block into <head>.
 * Removes any previous dynamic schema first.
 */
export function setSchema(schema: Record<string, unknown>) {
  const id = "dynamic-schema";
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Remove dynamic schema when navigating away from a page that set one.
 */
export function clearSchema() {
  const existing = document.getElementById("dynamic-schema");
  if (existing) existing.remove();
}

/**
 * Build Article schema for a blog post.
 */
export function buildArticleSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "url": `${SITE_URL}/blog/${post.slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": SITE_NAME,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Person",
      "name": SITE_NAME,
      "url": SITE_URL,
    },
    "image": DEFAULT_IMAGE,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    "keywords": post.tags.join(", "),
    "wordCount": post.readTime * 200,
    "inLanguage": "en-US",
  };
}

/**
 * Build BreadcrumbList schema.
 */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/**
 * Build CollectionPage schema for the blog list.
 */
export function buildBlogListSchema(posts: { title: string; slug: string; excerpt: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog — Bhavishya Singla",
    "description": "Practical insights on AI tools, content strategy, and digital marketing for students and creators.",
    "url": `${SITE_URL}/blog`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${SITE_URL}/blog/${post.slug}`,
        "name": post.title,
      })),
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
