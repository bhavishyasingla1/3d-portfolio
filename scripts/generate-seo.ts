/**
 * Auto-generates SEO static files from blogData.ts.
 * Run before build: `tsx scripts/generate-seo.ts`
 *
 * Generated files:
 *   public/sitemap.xml
 *   public/llms.txt
 *   (also patches the <noscript> block in index.html)
 */

import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { blogPosts, blogCategories } from "../src/data/blogData.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE_URL = "https://bhavishyasingla.com";
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ─── sitemap.xml ────────────────────────────────────────────────
function generateSitemap() {
  const blogEntries = blogPosts
    .map(
      (p) => `  <url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${blogEntries}
</urlset>
`;
  writeFileSync(resolve(root, "public/sitemap.xml"), xml);
  console.log(`✓ sitemap.xml  (${2 + blogPosts.length} URLs)`);
}

// ─── llms.txt ───────────────────────────────────────────────────
function generateLlmsTxt() {
  const blogSection =
    blogPosts.length > 0
      ? blogPosts
          .map(
            (p) =>
              `### ${p.title}\nURL: ${SITE_URL}/blog/${p.slug}\n${p.excerpt}`
          )
          .join("\n\n")
      : "No blog posts published yet.";

  const categoriesSection = blogCategories
    .map((c) => `- ${c.name}: ${c.description}`)
    .join("\n");

  const txt = `# Bhavishya Singla — Portfolio & Blog

> Personal website of Bhavishya Singla, a computer engineering student at Thapar Institute (2023–2027) building AI content systems, digital marketing projects, and freelance web development.

## About

Bhavishya Singla is a creator, AI content strategist, and digital marketer based in India. He has 17,000+ LinkedIn followers, 6,000+ newsletter subscribers (AI This Week), and hosts the Mindscape Expansion podcast with 285,000+ views. He builds websites, runs SEO experiments, and ships AI-driven workflows for brands.

## Contact

- Email: say@hibhavishya.in
- LinkedIn: https://www.linkedin.com/in/bhavishyasingla1/
- GitHub: https://github.com/bhavishyasingla1/
- YouTube: https://www.youtube.com/@bhavishyasingla1
- Instagram: https://instagram.com/bhavishyasingla1
- Newsletter: https://www.linkedin.com/newsletters/7353859555715436544/
- Podcast: https://www.youtube.com/@bhavishyasingla1/podcasts

## Pages

- Home: ${SITE_URL}/
- Blog: ${SITE_URL}/blog

## Skills & Services

- AI Tools & Workflows
- Content Strategy & Newsletter Systems
- SEO & Digital Marketing
- Web Development (React, Next.js, Framer)
- Podcast Production
- Freelance Website Building & SEO Optimization

## Experience

- Marketing & Growth Intern — Codju Technologies (Current)
- Digital Marketing Intern — brandMongo (2025–26)
- Marketing & Branding — AuraFlo (2025)

## Certifications

- McKinsey Forward
- GitHub Foundations
- Microsoft Generative AI

## Leadership

- Microsoft Student Ambassador (Gold)
- Innovation Ambassador — IIC TIET
- Senior Coordinator — CTD TIET

## Blog Categories

${categoriesSection}

## Blog Posts

${blogSection}
`;
  writeFileSync(resolve(root, "public/llms.txt"), txt);
  console.log(`✓ llms.txt     (${blogPosts.length} posts)`);
}

// ─── index.html <noscript> patch ────────────────────────────────
function patchNoscript() {
  const htmlPath = resolve(root, "index.html");
  let html = readFileSync(htmlPath, "utf-8");

  const blogLinks =
    blogPosts.length > 0
      ? blogPosts
          .map(
            (p) =>
              `      <li><a href="/blog/${p.slug}">${p.title}</a></li>`
          )
          .join("\n")
      : "      <li>No blog posts yet — check back soon!</li>";

  const noscriptBlock = `  <noscript>
    <h1>Bhavishya Singla — AI, Marketing & Digital Projects</h1>
    <p>Bhavishya Singla is a computer engineering student at Thapar Institute, AI content creator with 17,000+ LinkedIn followers, and digital marketer. He runs the AI This Week newsletter (6,000+ subscribers) and hosts the Mindscape Expansion podcast (285,000+ views).</p>
    <h2>Services</h2>
    <ul>
      <li>AI Content Strategy & Newsletter Systems</li>
      <li>Web Development — React, Next.js, Framer</li>
      <li>SEO & Digital Marketing</li>
      <li>Podcast Production</li>
    </ul>
    <h2>Blog</h2>
    <ul>
${blogLinks}
    </ul>
    <h2>Contact</h2>
    <p>Email: <a href="mailto:say@hibhavishya.in">say@hibhavishya.in</a></p>
    <p>
      <a href="https://www.linkedin.com/in/bhavishyasingla1/">LinkedIn</a> ·
      <a href="https://github.com/bhavishyasingla1/">GitHub</a> ·
      <a href="https://www.youtube.com/@bhavishyasingla1">YouTube</a> ·
      <a href="https://instagram.com/bhavishyasingla1">Instagram</a>
    </p>
  </noscript>`;

  // Replace the existing <noscript>...</noscript> block
  html = html.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    noscriptBlock
  );

  writeFileSync(htmlPath, html);
  console.log(`✓ index.html   (noscript patched)`);
}

// ─── Run ────────────────────────────────────────────────────────
console.log(`\n🔍 Generating SEO files from ${blogPosts.length} blog post(s)…\n`);
generateSitemap();
generateLlmsTxt();
patchNoscript();
console.log("\n✅ SEO files are up to date.\n");
