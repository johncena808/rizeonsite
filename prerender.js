// Post-build prerender: injects real HTML + per-route meta into each page
// so crawlers and answer engines see full content, headings and H1s.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "dist");

// Per-route SEO: title, description, canonical, H1 + crawlable body content.
// This content mirrors what the React app renders, so crawlers get real text.
const ROUTES = {
  "/": {
    title: "Rizeon AI | AI Consultancy in Singapore",
    desc: "Rizeon AI is a Singapore AI consultancy building AI infrastructure for professional service firms and private healthcare. We automate document chasing, lead response, client communication and admin operations.",
    body: `
      <h1>We build AI operating systems for service businesses.</h1>
      <p>Rizeon AI is an AI consultancy based in Singapore. We build AI operating systems for professional service firms and private healthcare providers, so the business stops running on the owner and starts running on systems.</p>
      <h2>The solution: an AI Operating System</h2>
      <p>Not a tool, a system. It centralises your knowledge, automates the repetitive admin, and puts AI agents on the jobs that eat the most time, trained on how you already work. We come to you, on-site with the owner and team, built on your accounts, so you own it. Info flows on its own: an enquiry comes in, the right people know, follow-up happens, and nobody chases anybody. The owner sets direction instead of processing everything.</p>
      <h2>What we build</h2>
      <p>AI infrastructure, built around your business. We focus on the four workflows where automation returns the most for professional service firms and specialist clinics.</p>
      <ul>
        <li><strong>Document Chasing &amp; Collection.</strong> Every file stalls on missing documents. We chase, collect and organise client paperwork automatically, following up politely and persistently until everything is in.</li>
        <li><strong>Lead Response &amp; Qualification.</strong> Every enquiry answered in under a minute, qualified against your criteria, and booked straight into your calendar. No lead waits, no lead slips.</li>
        <li><strong>Client Communication &amp; Follow-up.</strong> Follow-ups, reminders and status updates that go out on time, every time, across WhatsApp and email, trained on your tone and protocols.</li>
        <li><strong>Admin &amp; Data Operations.</strong> Data entry and reporting handled automatically, so your team stops re-keying information between CRM, calendar and inbox.</li>
      </ul>
      <h2>Who we work with</h2>
      <p>We work with professional service firms and private healthcare providers across Singapore, including law firms, recruitment agencies, accounting practices, property and real estate agencies, insurance firms, specialist clinics and aesthetic practices.</p>
      <h2>The problem we solve</h2>
      <p>Most firms invest in AI to improve efficiency and accelerate growth. Months later the tools are underused, the team isn't adopting them, and the expected ROI never arrived. This is where most AI initiatives lose momentum, not because of the technology, but because AI was never embedded into the way the business actually operates.</p>
      <h2>How we work: the Rizeon OS Method</h2>
      <p>Our engagement runs in four phases over 30 days: Discover, Design, Deploy and Drive. We map where the owner has become the bottleneck, design your AI Operating System around how you already work, deploy it on your own accounts, and stay on to tune and iterate. If the business is not noticeably easier to run, we offer a full refund.</p>
      <h2>What clients are saying</h2>
      <p>Clients across real estate, insurance and recruitment report saving 15 or more hours a week, lifting show-up rates, binding more policies, and cutting time-to-shortlist from days to the same morning.</p>
      <h2>Frequently asked questions</h2>
      <h3>Do I need to migrate away from my current software?</h3>
      <p>No. We build our AI systems to wrap around your existing stack, including your CRM, calendar and WhatsApp, so you don't have to learn a new tool or migrate any data.</p>
      <h3>How long does it take to deploy?</h3>
      <p>The Rizeon OS Method runs in 30 days, from the on-site Discover phase through to a live system driving your operation. If the business is not noticeably easier to run, you get a full refund.</p>
      <h3>Is it compliant with data protection laws?</h3>
      <p>Yes. We build with strict data privacy in mind and comply with Singapore's PDPA, handling sensitive client information securely.</p>
      <p>Rizeon AI is located at 60 Paya Lebar Road, #06-28 Paya Lebar Square, Singapore 409051. Contact hello@rizeonai.com.</p><p><a href="/services">Explore our services</a> &middot; <a href="/insights">Insights</a> &middot; <a href="/audit">Book an audit call</a> &middot; <a href="/privacy">Privacy Policy</a> &middot; <a href="/terms">Terms of Service</a></p>
    `,
  },
  "/services": {
    title: "Rizeon AI | Services",
    desc: "Our three-phase engagement: Audit, Build and Launch. Rizeon AI builds custom AI infrastructure for professional service firms and private healthcare in Singapore.",
    body: `
      <h1>Discover. Design. Deploy. Drive.</h1>
      <p>The Rizeon OS Method. One AI Operating System, built around how your business already runs, delivered in 30 days. If the business is not noticeably easier to run, full refund. Rizeon AI serves professional service firms and private healthcare providers in Singapore.</p>
      <h2>Phase 01: Discover</h2>
      <p>We come on-site with you and your team to map how work actually flows and where the owner has become the bottleneck. You get an on-site workflow and bottleneck mapping, a revenue-leak analysis quantified in dollars, a diagnostic report, and a fixed-price build roadmap.</p>
      <h2>Phase 02: Design</h2>
      <p>We design your AI Operating System around how you already work, centralising your knowledge and deciding which repetitive jobs get automated and which get an AI agent. Built on your own accounts, so you own it, and trained on your protocols, tone and policies.</p>
      <h2>Phase 03: Deploy</h2>
      <p>We build and deploy inside your live environment with zero disruption, integrated with your CRM, calendar and WhatsApp, sandbox tested before anything goes live, and rolled out in phases with team onboarding.</p>
      <h2>Phase 04: Drive</h2>
      <p>After launch we stay on to monitor, tune and iterate as your business changes, adding new agents as needs emerge, with performance monitoring, weekly tuning, ongoing iteration and support.</p>
      <p><a href="/">Back to home</a> &middot; <a href="/audit">Book an audit call</a></p>
    `,
  },
  "/audit": {
    title: "Rizeon AI | Book a Call",
    desc: "Book a 30-minute audit call with Rizeon AI to map where your operation is losing time and revenue. AI consultancy for firms and clinics in Singapore.",
    body: `
      <h1>Let's find what's leaking.</h1>
      <p>Book a 30-minute audit call with Rizeon AI. We'll walk through your operation and show you exactly where AI fits. No commitment, no pitch. Rizeon AI is an AI consultancy in Singapore serving professional service firms and private healthcare providers.</p>
      <p><a href="/">Back to home</a> &middot; <a href="/services">Explore our services</a></p>
    `,
  },
  "/privacy": {
    title: "Rizeon AI | Privacy Policy",
    desc: "Rizeon AI privacy policy. How we collect, use and protect personal data in line with Singapore's Personal Data Protection Act (PDPA).",
    body: `
      <h1>Privacy Policy</h1>
      <p>Rizeon AI is an AI consultancy based in Singapore. This policy explains how we collect, use and protect personal data in line with Singapore's Personal Data Protection Act (PDPA). We collect your email when you submit it, use it only to respond and deliver services, never sell your data, and honour access, correction and deletion requests. Contact hello@rizeonai.com for any privacy request.</p>
      <p><a href="/">Back to home</a> &middot; <a href="/terms">Terms of Service</a></p>
    `,
  },
  "/terms": {
    title: "Rizeon AI | Terms of Service",
    desc: "Rizeon AI terms of service. Terms governing use of our website and services, governed by the laws of Singapore.",
    body: `
      <h1>Terms of Service</h1>
      <p>By accessing this website or engaging Rizeon AI for services, you agree to these terms. Rizeon AI provides AI consultancy and builds AI infrastructure for businesses in Singapore. Website content is for general information only and is not professional advice. These terms are governed by the laws of Singapore. Contact hello@rizeonai.com with any questions.</p>
      <p><a href="/">Back to home</a> &middot; <a href="/privacy">Privacy Policy</a></p>
    `,
  },
};

const template = readFileSync(join(dist, "index.html"), "utf-8");

// Hidden container style: present in DOM for crawlers, invisible to users.
// React hydrates #root separately and overwrites its own content; this SEO
// block sits outside #root so it never flickers for users but stays crawlable.
const seoWrap = (html) =>
  `<div id="seo-content" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${html}</div>`;

for (const [route, data] of Object.entries(ROUTES)) {
  let html = template;

  // Swap title
  html = html.replace(/<title>.*?<\/title>/, `<title>${data.title}</title>`);

  // Swap meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${data.desc}" />`
  );

  // Swap canonical
  const canon = route === "/" ? "https://rizeonai.com/" : `https://rizeonai.com${route}`;
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canon}" />`
  );

  // Per-page Open Graph + Twitter
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${data.title}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canon}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${data.desc}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${data.title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${data.desc}" />`);

  // Inject crawlable content right after <body>
  html = html.replace(/(<body>)/, `$1\n    ${seoWrap(data.body)}`);

  // Write to dist at the route path
  const outPath =
    route === "/"
      ? join(dist, "index.html")
      : join(dist, route.slice(1), "index.html");

  if (route !== "/") mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf-8");
  console.log(`prerendered ${route} -> ${outPath.replace(dist, "dist")}`);
}

console.log("prerender complete");

// ─── Blog prerendering (append) ───
import { POSTS as BLOG_POSTS } from "./src/posts.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const blockToHtml = (b) => {
  if (b.type === "h2") return `<h2>${esc(b.text)}</h2>`;
  if (b.type === "h3") return `<h3>${esc(b.text)}</h3>`;
  if (b.type === "p") return `<p>${esc(b.text)}</p>`;
  if (b.type === "ul") return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  if (b.type === "quote") return `<blockquote>${esc(b.text)}</blockquote>`;
  if (b.type === "stat") return `<p><strong>${esc(b.big)}</strong> — ${esc(b.small)}</p>`;
  return "";
};

// Insights index page
{
  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>Rizeon AI | Insights</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="Research and practical thinking on AI implementation for professional service firms and private healthcare in Singapore." />`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://rizeonai.com/insights" />`);
  const list = BLOG_POSTS.map((p) =>
    `<article><h2><a href="/insights/${p.slug}">${esc(p.title)}</a></h2><p>${esc(p.description)}</p></article>`
  ).join("");
  const body = `<h1>Insights on AI in Singapore</h1><p>Research and practical thinking on AI implementation for professional service firms and private healthcare in Singapore.</p>${list}<p><a href="/">Home</a> &middot; <a href="/services">Services</a> &middot; <a href="/audit">Book a call</a></p>`;
  html = html.replace(/(<body>)/, `$1\n    ${seoWrap(body)}`);
  mkdirSync(join(dist, "insights"), { recursive: true });
  writeFileSync(join(dist, "insights", "index.html"), html, "utf-8");
  console.log("prerendered /insights");
}

// Individual posts
for (const post of BLOG_POSTS) {
  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>Rizeon AI | ${esc(post.title)}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${esc(post.description)}" />`);
  const canon = `https://rizeonai.com/insights/${post.slug}`;
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canon}" />`);

  // Article JSON-LD
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Rizeon AI", url: "https://rizeonai.com" },
    publisher: {
      "@type": "Organization",
      name: "Rizeon AI",
      logo: { "@type": "ImageObject", url: "https://rizeonai.com/favicon-192.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canon },
    keywords: post.tags.join(", "),
  };
  // Per-post Open Graph
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(post.title)}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canon}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(post.description)}" />`);
  html = html.replace(/<meta property="og:type" content="website" \/>/, `<meta property="og:type" content="article" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${esc(post.title)}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${esc(post.description)}" />`);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rizeonai.com/" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://rizeonai.com/insights" },
      { "@type": "ListItem", position: 3, name: post.title, item: canon },
    ],
  };

  html = html.replace(/(<\/head>)/, `  <script type="application/ld+json">${JSON.stringify(articleLd)}</script>\n  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n  $1`);

  const bodyHtml = `<h1>${esc(post.title)}</h1>` + post.body.map(blockToHtml).join("");
  html = html.replace(/(<body>)/, `$1\n    ${seoWrap(bodyHtml)}`);

  mkdirSync(join(dist, "insights", post.slug), { recursive: true });
  writeFileSync(join(dist, "insights", post.slug, "index.html"), html, "utf-8");
  console.log(`prerendered /insights/${post.slug}`);
}
console.log("blog prerender complete");
