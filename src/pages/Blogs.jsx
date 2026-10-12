import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Clock3,
  CalendarDays,
  UserRound,
  Sparkles,
  TrendingUp,
  Code2,
  Megaphone,
  BarChart3,
  Globe,
  X,
  ChevronDown,
} from "lucide-react";

import digitalMarketingSmallBusiness from "../assets/images/blog/digital-marketing-small-business.jpg";
import seoSmallBusiness from "../assets/images/blog/seo-small-business.jpg";
import googleAdsVsSeo from "../assets/images/blog/google-ads-vs-seo.jpg";
import socialMediaMarketing from "../assets/images/blog/social-media-marketing.jpg";
import websiteDigitalMarketing from "../assets/images/blog/website-digital-marketing.jpg";
import digitalMarketingStrategy from "../assets/images/blog/digital-marketing-strategy.jpg";
import seoIndianBusinesses from "../assets/images/blog/seo-indian-businesses.jpg";
import googleAdsBudget from "../assets/images/blog/google-ads-budget.jpg";
import digitalMarketingMistakes from "../assets/images/blog/digital-marketing-mistakes.jpg";

/*
=========================================================
ADNEX MEDIA - BLOGS PAGE
=========================================================
*/

const categories = [
  "All",
  "Digital Marketing",
  "SEO",
  "Paid Ads",
  "Social Media",
  "Web Development",
  "Business Growth",
];

const blogPosts = [
  {
    id: 1,
    slug: "digital-marketing-for-small-businesses",
    category: "Digital Marketing",
    title:
      "Digital Marketing for Small Businesses: A Practical Growth Guide",
    excerpt:
      "A practical guide to building an online presence, attracting the right audience and turning website visitors into real customers.",
    date: "September 24, 2026",
    datePublished: "2026-09-24",
    readTime: "8 min read",
    author: "AdNex Media",
    icon: Megaphone,
    image: digitalMarketingSmallBusiness,
    featured: true,
    keywords: [
      "digital marketing for small businesses",
      "online marketing strategy",
      "digital marketing agency",
    ],
  },

  {
    id: 2,
    slug: "how-seo-helps-small-businesses",
    category: "SEO",
    title: "How SEO Helps Small Businesses Get Found on Google",
    excerpt:
      "Learn how search engine optimization can increase organic visibility, bring qualified traffic and create long-term business growth.",
    date: "September 20, 2026",
    datePublished: "2026-09-20",
    readTime: "7 min read",
    author: "AdNex Media",
    icon: TrendingUp,
    image: seoSmallBusiness,
    keywords: [
      "SEO for small businesses",
      "SEO services",
      "Google ranking",
    ],
  },

  {
    id: 3,
    slug: "google-ads-vs-seo",
    category: "Paid Ads",
    title:
      "Google Ads vs SEO: Which One Should Your Business Focus On?",
    excerpt:
      "Understand the difference between Google Ads and SEO, when to use each channel and how both can work together.",
    date: "September 16, 2026",
    datePublished: "2026-09-16",
    readTime: "6 min read",
    author: "AdNex Media",
    icon: BarChart3,
    image: googleAdsVsSeo,
    keywords: [
      "Google Ads vs SEO",
      "Google Ads agency",
      "SEO strategy",
    ],
  },

  {
    id: 4,
    slug: "social-media-marketing-for-business-growth",
    category: "Social Media",
    title:
      "Social Media Marketing That Actually Helps a Business Grow",
    excerpt:
      "From content planning to community building, discover how businesses can use social media to build trust and generate demand.",
    date: "September 12, 2026",
    datePublished: "2026-09-12",
    readTime: "7 min read",
    author: "AdNex Media",
    icon: Megaphone,
    image: socialMediaMarketing,
    keywords: [
      "social media marketing",
      "social media strategy",
      "social media marketing agency",
    ],
  },

  {
    id: 5,
    slug: "why-your-website-matters-for-digital-marketing",
    category: "Web Development",
    title:
      "Why Your Website Matters More Than Your Digital Marketing Ads",
    excerpt:
      "Your ads may bring visitors, but your website has to convince them to stay, trust your business and take action.",
    date: "September 8, 2026",
    datePublished: "2026-09-08",
    readTime: "6 min read",
    author: "AdNex Media",
    icon: Code2,
    image: websiteDigitalMarketing,
    keywords: [
      "website development",
      "website conversion",
      "web development company",
    ],
  },

  {
    id: 6,
    slug: "how-to-build-a-digital-marketing-strategy",
    category: "Business Growth",
    title:
      "How to Build a Digital Marketing Strategy for Your Business",
    excerpt:
      "A step-by-step framework for choosing the right channels, setting realistic goals and measuring marketing performance.",
    date: "September 4, 2026",
    datePublished: "2026-09-04",
    readTime: "9 min read",
    author: "AdNex Media",
    icon: Sparkles,
    image: digitalMarketingStrategy,
    keywords: [
      "digital marketing strategy",
      "business growth strategy",
      "online business growth",
    ],
  },

  {
    id: 7,
    slug: "seo-tips-for-indian-businesses",
    category: "SEO",
    title:
      "SEO Tips for Indian Businesses That Want More Organic Traffic",
    excerpt:
      "Simple SEO improvements that can help Indian businesses improve search visibility and attract more relevant customers.",
    date: "August 30, 2026",
    datePublished: "2026-08-30",
    readTime: "8 min read",
    author: "AdNex Media",
    icon: Globe,
    image: seoIndianBusinesses,
    keywords: [
      "SEO tips India",
      "SEO services India",
      "organic traffic",
    ],
  },

  {
    id: 8,
    slug: "how-much-should-business-spend-on-google-ads",
    category: "Paid Ads",
    title:
      "How Much Should a Business Spend on Google Ads?",
    excerpt:
      "Learn how to think about Google Ads budgets, cost per lead, conversion rates and return on advertising spend.",
    date: "August 26, 2026",
    datePublished: "2026-08-26",
    readTime: "7 min read",
    author: "AdNex Media",
    icon: BarChart3,
    image: googleAdsBudget,
    keywords: [
      "Google Ads budget",
      "Google Ads management",
      "paid advertising",
    ],
  },

  {
    id: 9,
    slug: "digital-marketing-mistakes-to-avoid",
    category: "Digital Marketing",
    title:
      "7 Digital Marketing Mistakes That Can Waste Your Marketing Budget",
    excerpt:
      "Avoid common mistakes involving targeting, content, landing pages, tracking and campaign optimization.",
    date: "August 22, 2026",
    datePublished: "2026-08-22",
    readTime: "6 min read",
    author: "AdNex Media",
    icon: Megaphone,
    image: digitalMarketingMistakes,
    keywords: [
      "digital marketing mistakes",
      "marketing budget",
      "digital marketing strategy",
    ],
  },
];

const faqs = [
  {
    question: "What is digital marketing?",
    answer:
      "Digital marketing is the process of promoting a business through online channels such as search engines, websites, social media, email and paid advertising. A good digital marketing strategy connects these channels with clear business goals.",
  },
  {
    question: "Why is SEO important for a business?",
    answer:
      "SEO helps a website appear in relevant search results when people are looking for products, services or information. Strong organic visibility can help businesses attract relevant visitors over time.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO results depend on competition, website quality, industry, content and technical factors. Some improvements can appear relatively quickly, while meaningful organic growth usually requires consistent work over several months.",
  },
  {
    question: "Should a business use SEO and Google Ads together?",
    answer:
      "SEO and Google Ads serve different purposes. Paid ads can generate targeted traffic quickly, while SEO focuses on building sustainable organic visibility. Using both can create a broader search marketing strategy.",
  },
  {
    question: "What should a small business post on social media?",
    answer:
      "Businesses can share educational content, customer stories, product information, behind-the-scenes content, industry insights, FAQs and useful tips. The goal should be to create content that genuinely helps the target audience.",
  },
];

function BlogCard({ post }) {
  const Icon = post.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
    >
      <Link
        to={`/blogs/${post.slug}`}
        className="flex h-full flex-col"
      >
        {/* IMAGE / VISUAL */}
        {/* BLOG IMAGE */}
<div className="relative h-52 overflow-hidden bg-slate-900">

  <img
    src={post.image}
    alt={post.title}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    loading="lazy"
  />

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  {/* Icon */}
  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
    <Icon size={22} className="text-white" />
  </div>

  {/* Category */}
  <div className="absolute bottom-5 left-6 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
    {post.category}
  </div>

</div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-white/45">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              {post.date}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock3 size={13} />
              {post.readTime}
            </span>
          </div>

          <h2 className="text-xl font-semibold leading-snug text-white transition-colors group-hover:text-blue-300">
            {post.title}
          </h2>

          <p className="mt-3 flex-1 text-sm leading-6 text-white/55">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="flex items-center gap-2 text-xs text-white/45">
              <UserRound size={14} />
              {post.author}
            </span>

            <span className="flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-3">
              Read article
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-medium text-white md:text-lg">
          {item.question}
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 text-white/50 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-8 text-sm leading-7 text-white/55 md:text-base">
          {item.answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("date_published", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        setLoadingBlogs(false);
        return;
      }

      const mappedBlogs = (data || []).map((post) => {
  const fallbackBlog = blogPosts.find(
    (localPost) => localPost.slug === post.slug
  );

  return {
    ...post,

    // Keep existing design fields
    date: post.date_published
      ? new Date(post.date_published).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : fallbackBlog?.date || "",

    datePublished:
      post.date_published || fallbackBlog?.datePublished || "",

    readTime: post.read_time || fallbackBlog?.readTime || "5 min read",

    author: post.author || "AdNex Media",

    // Use existing local icon
    icon: fallbackBlog?.icon || Megaphone,

    // Use Supabase image if available
    image: post.featured_image || fallbackBlog?.image,

    featured: post.featured || false,

    keywords: post.keywords || [],
  };
});

setBlogPosts(mappedBlogs);
      setLoadingBlogs(false);
    };

    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category === activeCategory;

      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.keywords || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || searchableText.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, activeCategory, searchTerm]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AdNex Media",
    url: "https://adnexmedia.in",
    description:
      "AdNex Media is a digital marketing agency helping businesses grow through SEO, paid advertising, social media marketing and web development.",
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AdNex Media Blog",
    description:
      "Digital marketing, SEO, Google Ads, social media marketing and business growth insights from AdNex Media.",
    url: "https://adnexmedia.in/blogs",
    publisher: {
      "@type": "Organization",
      name: "AdNex Media",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      author: {
        "@type": "Organization",
        name: "AdNex Media",
      },
      datePublished: post.datePublished,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://adnexmedia.in/blogs/${post.slug}`,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* SEO STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="min-h-screen overflow-hidden bg-[#070B16] text-white">

        {/* HERO */}

        <section className="relative px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
          <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/65 backdrop-blur-xl"
              >
                <Sparkles
                  size={14}
                  className="text-blue-400"
                />

                Ideas that help businesses grow online
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Digital Marketing

                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  Insights That Matter
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 md:text-lg md:leading-8"
              >
                Practical insights on SEO, digital marketing,
                Google Ads, social media, websites and online
                business growth — written to help you make
                smarter marketing decisions.
              </motion.p>
            </div>

            {/* SEARCH */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mx-auto mt-10 max-w-2xl"
            >
              <div className="relative">

                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/35"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search digital marketing topics..."
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.055] py-4 pl-14 pr-12 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/30 focus:border-blue-400/50"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}

              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURED ARTICLE */}

        <section className="px-5 pb-20 md:px-8">
          <div className="mx-auto max-w-7xl">

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Featured insight
              </p>

              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                Start with what matters
              </h2>
            </div>

            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/[0.13] via-white/[0.035] to-violet-500/[0.08]"
            >
              <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />

              <div className="relative grid gap-10 p-7 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">

                <div className="flex flex-col justify-center">

                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-300">
                      Digital Marketing
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50">
                      8 min read
                    </span>
                  </div>

                  <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                    Digital Marketing for Small Businesses:

                    <span className="text-white/45">
                      {" "}A Practical Growth Guide
                    </span>
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                    Growing a business online is not about being
                    everywhere. It is about understanding your
                    customers, choosing the right channels and
                    consistently improving what works.
                  </p>

                  <Link
                    to="/blogs/digital-marketing-for-small-businesses"
                    className="mt-8 flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070B16] transition-transform hover:scale-[1.02]"
                  >
                    Read featured article
                    <ArrowRight size={17} />
                  </Link>

                </div>

                <div className="relative min-h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1020]">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_75%_65%,rgba(139,92,246,0.3),transparent_38%)]" />

                  <div className="absolute left-[18%] top-[22%] h-28 w-28 rounded-full border border-blue-400/20 bg-blue-500/10 blur-sm" />

                  <div className="absolute right-[16%] top-[20%] h-20 w-20 rounded-full border border-violet-400/20 bg-violet-500/10" />

                  <div className="absolute bottom-[18%] left-[25%] h-16 w-40 rounded-full border border-cyan-400/20 bg-cyan-400/10 blur-sm" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
                      <TrendingUp
                        size={50}
                        strokeWidth={1.3}
                        className="text-blue-300"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </motion.article>
          </div>
        </section>

        {/* CATEGORIES */}

        <section className="sticky top-0 z-30 border-y border-white/10 bg-[#070B16]/90 px-5 py-4 backdrop-blur-xl md:px-8">
          <div className="mx-auto max-w-7xl overflow-x-auto">
            <div className="flex min-w-max gap-2">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-white text-[#070B16]"
                      : "bg-white/[0.045] text-white/55 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>
          </div>
        </section>

        {/* BLOG GRID */}

        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Latest articles
                </p>

                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                  Learn. Apply. Grow.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
                  Straightforward digital marketing advice for
                  businesses looking to improve visibility,
                  generate leads and grow online.
                </p>
              </div>

              <p className="text-sm text-white/35">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1
                  ? "article"
                  : "articles"}
              </p>

            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                  />
                ))}

              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">

                <Search
                  size={35}
                  className="mx-auto text-white/25"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  No articles found
                </h3>

                <p className="mt-2 text-sm text-white/45">
                  Try another search term or choose a
                  different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#070B16]"
                >
                  View all articles
                </button>

              </div>
            )}

          </div>
        </section>

        {/* TOPICS */}

        <section className="border-y border-white/10 bg-white/[0.018] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Explore topics
              </p>

              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Find the marketing knowledge you need
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/45 md:text-base">
                From improving your Google rankings to building
                campaigns that generate leads, explore practical
                ideas across the digital marketing journey.
              </p>

            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {[
                {
                  title: "SEO",
                  description:
                    "Search optimization, content strategy and organic growth.",
                  icon: TrendingUp,
                },
                {
                  title: "Paid Advertising",
                  description:
                    "Google Ads, Meta Ads and performance marketing insights.",
                  icon: BarChart3,
                },
                {
                  title: "Social Media",
                  description:
                    "Content, engagement and social media growth strategies.",
                  icon: Megaphone,
                },
                {
                  title: "Web Development",
                  description:
                    "Websites designed for performance, users and conversions.",
                  icon: Code2,
                },
              ].map((topic, index) => {

                const Icon = topic.icon;

                return (
                  <motion.button
                    key={topic.title}
                    type="button"
                    onClick={() => {

                      const categoryMap = {
                        SEO: "SEO",
                        "Paid Advertising": "Paid Ads",
                        "Social Media": "Social Media",
                        "Web Development": "Web Development",
                      };

                      setActiveCategory(
                        categoryMap[topic.title]
                      );

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-left transition-all hover:-translate-y-1 hover:bg-white/[0.06]"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">

                      <Icon
                        size={20}
                        className="text-blue-300"
                      />

                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {topic.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {topic.description}
                    </p>

                    <span className="mt-5 flex items-center gap-2 text-sm font-medium text-white/70">

                      Explore

                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />

                    </span>

                  </motion.button>
                );
              })}

            </div>
          </div>
        </section>

        {/* FAQ */}

        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-4xl">

            <div className="text-center">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Frequently asked questions
              </p>

              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Digital marketing questions, answered
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45 md:text-base">
                Clear answers to common questions businesses
                have about SEO, digital marketing, paid
                advertising and online growth.
              </p>

            </div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.025] px-6 md:px-8">

              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  item={faq}
                  isOpen={openFaq === index}
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index
                        ? null
                        : index
                    )
                  }
                />
              ))}

            </div>

          </div>
        </section>

        {/* CTA */}

        <section className="px-5 pb-24 md:px-8 md:pb-32">
          <div className="mx-auto max-w-7xl">

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-blue-600/[0.16] via-white/[0.04] to-violet-500/[0.12] p-8 md:p-12 lg:p-16">

              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />

              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />

              <div className="relative max-w-3xl">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Ready to grow?
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                  Turn your digital presence into a growth engine.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
                  Whether you need SEO, paid advertising,
                  social media marketing or a high-performing
                  website, AdNex Media can help you build a
                  digital strategy around your business goals.
                </p>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#070B16] transition-transform hover:scale-[1.02]"
                >
                  Talk to AdNex Media
                  <ArrowUpRight size={17} />
                </Link>

              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}