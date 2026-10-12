import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const SITE_URL = "https://www.adnexmedia.in";

function setMetaTag(attribute, key, content) {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = url;
}

// Supports plain paragraphs plus optional Markdown-style headings and lists.
// Example: ## Why SEO matters, followed by a blank line and a paragraph.
function parseContent(content = "") {
  return content
    .trim()
    .split(/\n\s*\n/)
    .map((block, index) => {
      const text = block.trim();
      if (!text) return null;

      if (text.startsWith("### ")) {
        return { type: "h3", text: text.slice(4), key: index };
      }
      if (text.startsWith("## ")) {
        return { type: "h2", text: text.slice(3), key: index };
      }
      if (text.startsWith("# ")) {
        return { type: "h2", text: text.slice(2), key: index };
      }

      const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length && lines.every((line) => /^[-*]\s+/.test(line))) {
        return {
          type: "list",
          items: lines.map((line) => line.replace(/^[-*]\s+/, "")),
          key: index,
        };
      }

      return { type: "p", text, key: index };
    })
    .filter(Boolean);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchArticle() {
      setLoading(true);
      setLoadError(false);
      setArticle(null);

      const { data, error } = await supabase
        .from("blogs")
        .select(
          "id,title,slug,category,excerpt,content,featured_image,date_published,read_time,author,keywords,meta_title,meta_description,status,created_at,updated_at"
        )
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error("Unable to load blog article:", error);
        setLoadError(true);
        setLoading(false);
        return;
      }

      setArticle(data || null);
      setLoading(false);
    }

    fetchArticle();

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!article) return undefined;

    const pageTitle = article.meta_title || article.title;
    const description = article.meta_description || article.excerpt || "";
    const canonicalUrl = `${SITE_URL}/blogs/${article.slug}`;
    const previousTitle = document.title;

    document.title = `${pageTitle} | AdNex Media`;
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index, follow");
    setMetaTag("property", "og:type", "article");
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:site_name", "AdNex Media");

    if (article.featured_image) {
      setMetaTag("property", "og:image", article.featured_image);
    }

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", description);

    setCanonical(canonicalUrl);

    let schema = document.head.querySelector(
      'script[data-blog-schema="true"]'
    );

    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.blogSchema = "true";
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description,
      datePublished: article.date_published || article.created_at || undefined,
      dateModified: article.updated_at || undefined,
      image: article.featured_image || undefined,
      articleSection: article.category || undefined,
      keywords: article.keywords || undefined,
      author: {
        "@type": "Person",
        name: article.author || "AdNex Media",
      },
      publisher: {
        "@type": "Organization",
        name: "AdNex Media",
        url: SITE_URL,
      },
      mainEntityOfPage: canonicalUrl,
    });

    return () => {
      document.title = previousTitle;
      schema?.remove();
    };
  }, [article]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070B16] px-5 text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-blue-400" />
          <p className="mt-4 text-sm text-white/60">Loading article...</p>
        </div>
      </main>
    );
  }

  if (loadError || !article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070B16] px-6 text-white">
        <div className="max-w-lg text-center">
          <p className="text-sm font-medium text-blue-300">ADNEX MEDIA BLOG</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            {loadError ? "Unable to load this article" : "Article not found"}
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
            {loadError
              ? "Please check your connection and try again."
              : "This article may have been removed, its URL may have changed, or it may not be published."}
          </p>
          <Link
            to="/blogs"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070B16] transition hover:bg-blue-100"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>
        </div>
      </main>
    );
  }

  const contentBlocks = parseContent(article.content || "");
  const formattedDate = formatDate(article.date_published);

  return (
    <main className="min-h-screen bg-[#070B16] text-white">
      <article className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 md:px-8 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <header className="mt-8 sm:mt-10">
            {article.category && (
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-300">
                {article.category}
              </span>
            )}

            <h1 className="mt-5 break-words text-3xl font-semibold leading-tight tracking-tight sm:mt-6 sm:text-4xl md:text-6xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-5 text-base leading-7 text-white/60 sm:mt-6 sm:text-lg sm:leading-8">
                {article.excerpt}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/45 sm:mt-7">
              {formattedDate && (
                <span className="flex items-center gap-2">
                  <CalendarDays size={15} />
                  {formattedDate}
                </span>
              )}
              {article.read_time && (
                <span className="flex items-center gap-2">
                  <Clock3 size={15} />
                  {article.read_time}
                </span>
              )}
              <span className="flex items-center gap-2">
                <UserRound size={15} />
                {article.author || "AdNex Media"}
              </span>
            </div>
          </header>

          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title || "Blog article image"}
              fetchPriority="high"
              className="mt-8 max-h-[520px] w-full rounded-2xl border border-white/10 object-cover sm:mt-10 sm:rounded-3xl"
            />
          )}

          <div className="my-9 h-px bg-white/10 sm:my-12" />

          <div className="space-y-6 sm:space-y-8">
            {contentBlocks.length > 0 ? (
              contentBlocks.map((block) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={block.key}
                      className="pt-3 text-2xl font-semibold leading-snug tracking-tight text-white sm:pt-5 sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "h3") {
                  return (
                    <h3
                      key={block.key}
                      className="pt-2 text-xl font-semibold leading-snug text-white sm:text-2xl"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={block.key}
                      className="list-disc space-y-3 pl-6 text-base leading-8 text-white/70 sm:text-lg"
                    >
                      {block.items.map((item, index) => (
                        <li key={`${block.key}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={block.key}
                    className="whitespace-pre-line break-words text-base leading-8 text-white/70 sm:text-lg sm:leading-9"
                  >
                    {block.text}
                  </p>
                );
              })
            ) : (
              <p className="text-base leading-8 text-white/55 sm:text-lg">
                This article&apos;s full content has not been added yet. Please
                update the content from the Admin Panel.
              </p>
            )}
          </div>

          <section className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/[0.15] via-white/[0.035] to-violet-500/[0.12] p-6 sm:mt-16 sm:rounded-[30px] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              AdNex Media
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Need help growing your business online?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              AdNex Media helps businesses with SEO, digital marketing, paid
              advertising, social media marketing and web development.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070B16] transition hover:bg-blue-100"
            >
              Talk to AdNex Media
              <ArrowUpRight size={16} />
            </Link>
          </section>

          <nav className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 sm:mt-12 sm:flex-row">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              All articles
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              Start a conversation
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      </article>
    </main>
  );
}
