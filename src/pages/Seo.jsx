import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Code2,
  Globe2,
  Gauge,
  Link2,
  MapPin,
  MousePointerClick,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import Footer from "../components/Footer/Footer";

/* =========================================================
   ANIMATION PRESETS
========================================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   DATA
========================================================= */

const services = [
  {
    number: "01",
    icon: Settings2,
    title: "Technical SEO",
    description:
      "Build a technically strong website that search engines can crawl, understand and index efficiently.",
    tags: ["Crawl Analysis", "Core Web Vitals", "Schema Markup"],
  },
  {
    number: "02",
    icon: Search,
    title: "Keyword Research & Strategy",
    description:
      "Identify high-intent search opportunities and build a keyword strategy around your business goals.",
    tags: ["Intent Mapping", "Competitor Gap", "Keyword Clusters"],
  },
  {
    number: "03",
    icon: Target,
    title: "Content Marketing & SEO",
    description:
      "Create authoritative content designed to attract qualified traffic, build topical authority and convert.",
    tags: ["E-E-A-T", "Pillar Pages", "Content Strategy"],
  },
  {
    number: "04",
    icon: Link2,
    title: "Link Building",
    description:
      "Build relevant editorial backlinks that strengthen domain authority and support competitive rankings.",
    tags: ["DA 50+ Links", "Digital PR", "Authority Building"],
  },
  {
    number: "05",
    icon: MapPin,
    title: "Local SEO",
    description:
      "Increase your visibility in local search and connect your business with customers ready to take action.",
    tags: ["GBP Management", "Local Citations", "Local Content"],
  },
  {
    number: "06",
    icon: MousePointerClick,
    title: "On-Page SEO",
    description:
      "Optimize page structure, metadata, internal links and content relevance for better search visibility.",
    tags: ["Product Pages", "Rich Results", "Internal Linking"],
  },
  {
    number: "07",
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Track rankings, organic traffic, conversions and backlink growth through transparent reporting.",
    tags: ["GA4", "Search Console", "Looker Studio"],
  },
];

const phases = [
  {
    number: "01",
    title: "Technical Audit & Baseline",
    description:
      "Full site crawl to identify indexation issues, page-speed bottlenecks, cannibalisation problems and structural weaknesses before content production begins.",
    metric: "200+",
    metricLabel: "Audit checkpoints",
  },
  {
    number: "02",
    title: "Keyword & Topical Research",
    description:
      "Map your keyword universe by intent, volume and difficulty. Build topical clusters where every piece of content strengthens the wider SEO ecosystem.",
    metric: "1K+",
    metricLabel: "Keywords mapped",
  },
  {
    number: "03",
    title: "On-Page & Technical Fixes",
    description:
      "Implement technical recommendations, optimize metadata, improve internal linking, add schema and strengthen crawlability.",
    metric: "90+",
    metricLabel: "PageSpeed target",
  },
  {
    number: "04",
    title: "Content Production",
    description:
      "Produce authoritative pillar pages, supporting articles and landing pages designed to earn visibility and convert organic visitors.",
    metric: "8+",
    metricLabel: "Pieces / month",
  },
  {
    number: "05",
    title: "Link Acquisition",
    description:
      "Earn high-authority editorial links through digital PR, expert commentary, data studies and relevant niche publications.",
    metric: "DA 50+",
    metricLabel: "Average link quality",
  },
  {
    number: "06",
    title: "Monitor, Report & Scale",
    description:
      "Monitor rankings, traffic, backlinks and conversions while continuously expanding successful keyword clusters and markets.",
    metric: "3×",
    metricLabel: "Avg traffic lift",
  },
];

const faqs = [
  {
    question: "How does an SEO agency improve rankings?",
    answer:
      "A structured SEO strategy combines technical optimization, keyword research, content, internal linking, authority building and ongoing measurement to improve a website's organic search visibility.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO is a compounding channel. Early technical improvements can appear sooner, while meaningful organic growth generally requires consistent optimization and content over several months.",
  },
  {
    question: "Are SEO services suitable for small businesses?",
    answer:
      "Yes. SEO can be structured around local, regional or niche search opportunities so smaller businesses can focus resources on the audiences and queries most relevant to them.",
  },
  {
    question: "Can SEO target customers in different countries?",
    answer:
      "Yes. International SEO can use country-specific landing pages, localized content, technical internationalization and search-intent research for different markets.",
  },
  {
    question: "Can SEO help my local business grow?",
    answer:
      "Yes. Local SEO focuses on visibility in location-based searches, Google Business Profile optimization, local landing pages, reviews, citations and relevant local content.",
  },
  {
    question: "What SEO tools do you use?",
    answer:
      "SEO campaigns can combine platforms such as Google Analytics, Google Search Console, Screaming Frog, Semrush, PageSpeed Insights and Looker Studio depending on the campaign requirements.",
  },
];

const logos = [
  "EMIRATES",
  "FLIPKART",
  "HDFC BANK",
  "BURGER KING",
  "AXIS BANK",
  "ETIHAD",
  "MAKEMYTRIP",
  "CITIBANK",
  "PEPPERFRY",
  "STC PAY",
  "AMAZON",
];

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ children }) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
      <Sparkles size={13} className="shrink-0" />
      <span>{children}</span>
    </div>
  );
}

/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {value}
    </motion.span>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070B16] px-4 pb-16 pt-10 text-white sm:px-6 sm:pb-20 sm:pt-14 md:px-10 md:py-24 lg:px-16 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-25%] top-[-15%] h-[320px] w-[320px] rounded-full bg-blue-600/15 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]" />

        <div className="absolute bottom-[-20%] right-[-20%] h-[350px] w-[350px] rounded-full bg-violet-600/15 blur-[100px] sm:h-[550px] sm:w-[550px] sm:blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid min-w-0 items-center gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-16"
        >
          {/* LEFT */}
          <div className="min-w-0">
            <motion.div variants={fadeUp}>
              <SectionLabel>SEO · AdNex Media</SectionLabel>
            </motion.div>

            <motion.h1
  variants={fadeUp}
  className="mt-6 max-w-4xl break-words text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[76px]"
>
  SEO Agency in Noida for
  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
    {" "}Organic Growth
  </span>
  , Rankings & Qualified Leads.
</motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base md:text-lg"
            >
              We build search strategies that combine technical SEO,
              authoritative content and high-quality links to create sustainable
              organic growth in competitive markets.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 xs:flex-row sm:flex-row"
            >
              <a
                href="#contact"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#070B16] transition hover:scale-[1.02]"
              >
                Get a Free SEO Audit
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#services"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Explore Services
                <ArrowRight size={17} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-xl grid-cols-2 gap-x-5 gap-y-6 sm:mt-12 sm:grid-cols-4 sm:gap-x-8"
            >
              {[
                ["3×", "Avg Traffic Lift"],
                ["6mo", "Time to Results"],
                ["80+", "Brands Ranked"],
                ["20+", "Markets"],
              ].map(([number, label]) => (
                <div key={label} className="min-w-0">
                  <div className="text-xl font-semibold tracking-tight sm:text-2xl">
                    <AnimatedNumber value={number} />
                  </div>

                  <div className="mt-1 text-[10px] leading-4 text-white/40 sm:text-xs">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT DASHBOARD */}
          {/* RIGHT SEO ORBIT VISUALIZATION */}
<motion.div
  variants={fadeUp}
  className="relative mx-auto flex w-full max-w-[560px] min-w-0 items-center justify-center lg:mt-0"
>
  {/* Ambient glow */}
  <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/[0.08] blur-[90px] sm:h-[430px] sm:w-[430px]" />

  <div className="relative aspect-square w-full max-w-[520px]">

    {/* Subtle radial atmosphere */}
    <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.08),transparent_68%)]" />

    {/* ================================= */}
    {/* OUTER ORBIT */}
    {/* ================================= */}

    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 42,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 h-[84%] w-[43%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-blue-300/[0.10]"
    />

    {/* ================================= */}
    {/* OUTER ORBIT HIGHLIGHT */}
    {/* ================================= */}

    <motion.div
      animate={{
        rotate: -360,
        opacity: [0.2, 0.55, 0.2],
      }}
      transition={{
        rotate: {
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        },
        opacity: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="absolute left-1/2 top-1/2 h-[76%] w-[39%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-300/[0.08]"
    />

    {/* ================================= */}
    {/* MIDDLE ORBIT */}
    {/* ================================= */}

    <motion.div
      animate={{ rotate: -360 }}
      transition={{
        duration: 29,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 h-[64%] w-[33%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-blue-400/[0.12]"
    />

    {/* ================================= */}
    {/* INNER ORBIT */}
    {/* ================================= */}

    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 19,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 h-[46%] w-[25%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-emerald-400/[0.10]"
    />

    {/* ================================= */}
    {/* CENTER GLOW */}
    {/* ================================= */}

    <motion.div
      animate={{
        scale: [0.92, 1.08, 0.92],
        opacity: [0.25, 0.55, 0.25],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[60px]"
    />

    {/* ================================= */}
    {/* CENTRAL SEO CORE */}
    {/* ================================= */}

    <motion.div
      animate={{
        boxShadow: [
          "0 0 45px rgba(37,99,235,.10)",
          "0 0 90px rgba(37,99,235,.25)",
          "0 0 45px rgba(37,99,235,.10)",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute left-1/2 top-1/2 z-30 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0c1425]/90 shadow-2xl backdrop-blur-2xl sm:h-[170px] sm:w-[170px]"
    >
      {/* Core gradient */}
      <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(96,165,250,.28),rgba(37,99,235,.10),transparent_70%)]" />

      {/* Rotating inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-4 rounded-full border border-dashed border-blue-300/20"
      />

      {/* Inner highlight */}
      <div className="absolute left-[22%] top-[17%] h-5 w-5 rounded-full bg-blue-300/20 blur-md" />

      <div className="relative text-center">

        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-300/15 bg-blue-500/10 shadow-lg">
          <Search
            size={21}
            strokeWidth={1.5}
            className="text-blue-300"
          />
        </div>

        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-blue-300/60">
          Organic
        </p>

        <p className="mt-1 text-sm font-semibold tracking-tight text-white sm:text-base">
          SEO Growth
        </p>

      </div>
    </motion.div>

    {/* ================================= */}
    {/* RANKING ORBIT NODE */}
    {/* ================================= */}

    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 19,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 z-40 h-[46%] w-[25%] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-6 left-1/2 -translate-x-1/2"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-[#0c1725]/95 shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 blur-xl" />

          <TrendingUp
            size={19}
            strokeWidth={1.5}
            className="relative text-emerald-300"
          />
        </div>
      </motion.div>
    </motion.div>

    {/* ================================= */}
    {/* TRAFFIC ORBIT NODE */}
    {/* ================================= */}

    <motion.div
      animate={{ rotate: -360 }}
      transition={{
        duration: 29,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 z-40 h-[64%] w-[33%] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 29,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-[-25px] top-1/2 -translate-y-1/2"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-[#0c1725]/95 shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-2xl bg-blue-400/10 blur-xl" />

          <BarChart3
            size={19}
            strokeWidth={1.5}
            className="relative text-blue-300"
          />
        </div>
      </motion.div>
    </motion.div>

    {/* ================================= */}
    {/* KEYWORD ORBIT NODE */}
    {/* ================================= */}

    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 42,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 z-40 h-[84%] w-[43%] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[1%] left-1/2 -translate-x-1/2"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#0c1725]/95 shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl" />

          <Target
            size={19}
            strokeWidth={1.5}
            className="relative text-cyan-300"
          />
        </div>
      </motion.div>
    </motion.div>

    {/* ================================= */}
    {/* LEFT FLOATING CARD */}
    {/* ================================= */}

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute left-[-5px] top-[20%] z-50 hidden rounded-2xl border border-white/10 bg-[#0b1220]/90 p-4 shadow-2xl backdrop-blur-xl sm:block"
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
          <TrendingUp
            size={17}
            className="text-emerald-300"
          />
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">
            Organic Traffic
          </p>

          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-lg font-semibold text-white">
              +284%
            </span>

            <span className="text-[9px] text-emerald-400">
              growth
            </span>
          </div>
        </div>

      </div>
    </motion.div>

    {/* ================================= */}
    {/* RIGHT FLOATING CARD */}
    {/* ================================= */}

    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8,
      }}
      className="absolute right-[-5px] top-[27%] z-50 hidden rounded-2xl border border-white/10 bg-[#0b1220]/90 p-4 shadow-2xl backdrop-blur-xl sm:block"
    >
      <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">
        Average Position
      </p>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-xl font-semibold text-white">
          #1.8
        </span>

        <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold text-emerald-400">
          ↑ 12
        </span>
      </div>
    </motion.div>

    {/* ================================= */}
    {/* BOTTOM STATUS */}
    {/* ================================= */}

    <motion.div
      animate={{
        opacity: [0.55, 1, 0.55],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-[3%] left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 backdrop-blur-xl">

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />

        <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.16em] text-white/45">
          Search Visibility Active
        </span>

      </div>
    </motion.div>

    {/* ================================= */}
    {/* FLOATING PARTICLES */}
    {/* ================================= */}

    <motion.span
      animate={{
        y: [0, -12, 0],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute left-[17%] top-[12%] h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_15px_rgba(96,165,250,.9)]"
    />

    <motion.span
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute right-[18%] bottom-[16%] h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(110,231,183,.9)]"
    />

    <motion.span
      animate={{
        y: [0, 10, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-[24%] left-[9%] h-1 w-1 rounded-full bg-cyan-300"
    />

    <motion.span
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute right-[10%] top-[17%] h-1 w-1 rounded-full bg-blue-200"
    />

  </div>
</motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SEARCH RESULT
========================================================= */

function SearchResult({ rank, title, domain, active }) {
  return (
    <div
      className={`min-w-0 rounded-xl border p-2.5 transition sm:p-4 ${
        active
          ? "border-blue-200 bg-blue-50/70 shadow-sm"
          : "border-slate-100 bg-white"
      }`}
    >
      <div className="flex min-w-0 gap-2.5 sm:gap-4">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold sm:h-7 sm:w-7 sm:text-xs ${
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {rank}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-[10px] font-semibold sm:text-sm ${
              active ? "text-blue-700" : "text-slate-800"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 truncate text-[8px] text-slate-400 sm:text-[11px]">
            {domain}
          </p>
        </div>

        {active && (
          <div className="ml-auto shrink-0">
            <TrendingUp size={15} className="text-emerald-500 sm:size-[17px]" />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({ icon: Icon, value, label }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-3 sm:rounded-2xl sm:p-4">
      <Icon size={15} className="text-blue-600 sm:size-[17px]" />

      <div className="mt-2 text-lg font-semibold sm:mt-3 sm:text-xl">
        {value}
      </div>

      <div className="mt-1 truncate text-[9px] text-slate-400 sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   LOGO MARQUEE
========================================================= */

function LogoMarquee() {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-white py-7 sm:py-8">
      <div className="mb-4 px-4 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:mb-5 sm:text-[10px] sm:tracking-[0.25em]">
        Trusted by leading brands globally
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max gap-8 whitespace-nowrap px-4 sm:gap-12 sm:px-6"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="text-xs font-bold tracking-tight text-slate-300 sm:text-sm md:text-base"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function Services() {
  return (
    <section
      id="services"
      className="overflow-hidden bg-[#F7F9FC] px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <SectionLabel>Our SEO Services</SectionLabel>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#090E1B] sm:text-4xl md:text-5xl">
            Search strategy built for
            <span className="text-blue-600"> sustainable growth.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Every service is delivered by specialists — not generalists. We
            connect technical SEO, content and authority into one coordinated
            growth system.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className={`group relative min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.04)] sm:rounded-[24px] sm:p-7 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition group-hover:bg-blue-500/10" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-blue-600 sm:h-12 sm:w-12 sm:rounded-2xl">
                      <Icon size={20} />
                    </div>

                    <span className="text-xs font-semibold tracking-widest text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900 sm:mt-7 sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-500 sm:px-3 sm:text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-blue-600 sm:mt-8">
                    Explore service
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS
========================================================= */

function Process() {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <section className="overflow-hidden bg-[#070B16] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>Our Process</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-5xl">
              From audit to
              <span className="text-blue-400"> authority.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/45 sm:text-base">
              A six-phase SEO framework designed to build compounding organic
              growth — not short-lived ranking spikes.
            </p>

            <div className="mt-8 flex items-center gap-3 sm:mt-10">
              <button
                onClick={() =>
                  setActive((prev) => (prev === 0 ? 5 : prev - 1))
                }
                aria-label="Previous phase"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 sm:h-11 sm:w-11"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-medium text-white/40">
                Phase {String(active + 1).padStart(2, "0")} of 06
              </span>

              <button
                onClick={() =>
                  setActive((prev) => (prev === 5 ? 0 : prev + 1))
                }
                aria-label="Next phase"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 sm:h-11 sm:w-11"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="min-w-0">
            <div className="grid grid-cols-3 gap-1.5 border-b border-white/10 pb-4 sm:grid-cols-6 sm:gap-2">
              {phases.map((item, index) => (
                <button
                  key={item.number}
                  onClick={() => setActive(index)}
                  className={`relative min-h-[42px] rounded-lg px-2 py-2 text-left transition sm:rounded-none sm:py-3 ${
                    active === index
                      ? "bg-white/5 text-white sm:bg-transparent"
                      : "text-white/25"
                  }`}
                >
                  <span className="text-xs font-semibold">{item.number}</span>

                  {active === index && (
                    <motion.div
                      layoutId="activePhase"
                      className="absolute bottom-[-17px] left-0 right-0 hidden h-[2px] bg-blue-500 sm:block"
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-9 sm:mt-12"
            >
              <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-10">
                <div className="min-w-0 max-w-2xl">
                  <span className="text-sm font-semibold text-blue-400">
                    PHASE {phase.number}
                  </span>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                    {phase.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                    {phase.description}
                  </p>
                </div>

                <div className="shrink-0 md:text-right">
                  <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {phase.metric}
                  </div>

                  <div className="mt-2 text-[10px] uppercase tracking-widest text-white/30 sm:text-xs">
                    {phase.metricLabel}
                  </div>
                </div>
              </div>

              <div className="mt-9 grid gap-2 sm:mt-12 sm:grid-cols-3 sm:gap-3">
                {[
                  "Data-led decisions",
                  "Technical excellence",
                  "Compounding growth",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3.5 sm:rounded-2xl sm:p-4"
                  >
                    <CircleCheck
                      size={17}
                      className="shrink-0 text-blue-400"
                    />

                    <span className="text-xs text-white/60 sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RESULTS
========================================================= */

function Results() {
  const stats = [
    {
      number: "3×",
      title: "Average Organic Traffic Lift",
      description:
        "Average lift measured within six months across client campaigns.",
      icon: TrendingUp,
    },
    {
      number: "80+",
      title: "Brands Taken to Page 1",
      description:
        "Commercial keywords across competitive markets and industries.",
      icon: Target,
    },
    {
      number: "DA 50+",
      title: "Average Link Authority",
      description:
        "Editorial backlinks from relevant and established publications.",
      icon: Link2,
    },
    {
      number: "100%",
      title: "Core Web Vitals Focus",
      description:
        "Technical performance optimization built into every campaign.",
      icon: Gauge,
    },
    {
      number: "92%",
      title: "Annual Client Retention",
      description:
        "Long-term partnerships built around continuous organic growth.",
      icon: Users,
    },
    {
      number: "20+",
      title: "Markets Active",
      description:
        "SEO campaigns across India, GCC, UK, Europe, US and Asia.",
      icon: Globe2,
    },
  ];

  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>Proven Results</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl md:text-5xl">
              Measurable results
              <span className="text-blue-600"> that matter.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
              SEO should not be a black box. Every campaign is connected to
              measurable visibility, traffic, authority and business outcomes.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 sm:px-4 sm:text-xs">
              <Check size={14} />
              Transparent reporting
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-3 sm:grid-cols-2"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  variants={fadeUp}
                  key={stat.title}
                  className="min-w-0 rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 sm:rounded-[22px] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm sm:h-10 sm:w-10">
                      <Icon size={18} />
                    </div>

                    <span className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {stat.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-slate-900 sm:mt-6">
                    {stat.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHY TRACKBACK
========================================================= */

function WhyAdNex() {
  const reasons = [
    {
      number: "01",
      title: "Data-Driven SEO",
      text: "Use search data, competitor intelligence and performance analytics to prioritize opportunities that support real business goals.",
    },
    {
      number: "02",
      title: "Customized Strategies",
      text: "No generic SEO packages. Strategy is built around your industry, competition, audience, market and growth objectives.",
    },
    {
      number: "03",
      title: "Transparent Reporting",
      text: "Understand exactly what is changing across rankings, traffic, conversions, backlinks and technical performance.",
    },
  ];

  return (
    <section className="overflow-hidden bg-[#F7F9FC] px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>Why AdNex</SectionLabel>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl md:text-5xl">
              SEO built around
              <span className="text-blue-600"> your growth.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
              We combine technical expertise, content strategy and authority
              building to create search equity that compounds over time.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-3"
          >
            {reasons.map((reason) => (
              <motion.div
                variants={fadeUp}
                key={reason.number}
                className="group min-w-0 rounded-[20px] border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:rounded-[22px] sm:p-7"
              >
                <div className="grid gap-3 sm:gap-5 md:grid-cols-[60px_220px_1fr] md:items-start">
                  <span className="text-sm font-semibold text-blue-600">
                    {reason.number}
                  </span>

                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {reason.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate-500">
                    {reason.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMMITMENT
========================================================= */

function Commitment() {
  const items = [
    {
      icon: Globe2,
      title: "Multi-Market SEO Expertise",
      text: "GCC, India, UK, Europe and South-East Asia — localized search strategy built around regional search behaviour.",
    },
    {
      icon: BarChart3,
      title: "Full Attribution Transparency",
      text: "GA4, Search Console and reporting dashboards connect organic traffic with measurable actions and conversions.",
    },
    {
      icon: Code2,
      title: "Content + Links + Technical",
      text: "Three core SEO disciplines working together instead of disconnected services managed by separate teams.",
    },
    {
      icon: ShieldCheck,
      title: "Sustainable SEO",
      text: "No shortcuts built around manipulative tactics. We focus on sustainable optimization and long-term domain health.",
    },
  ];

  return (
    <section className="overflow-hidden bg-[#070B16] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Our Commitment</SectionLabel>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-5xl">
            Built for
            <span className="text-blue-400"> long-term organic growth.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base">
            SEO works best when every part of the system is connected. Our
            strategy is designed to strengthen your search presence month after
            month.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-10 grid gap-3 sm:mt-14 md:grid-cols-2"
        >
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                variants={fadeUp}
                key={item.title}
                className="min-w-0 rounded-[20px] border border-white/10 bg-white/[0.035] p-5 transition hover:bg-white/[0.055] sm:rounded-[24px] sm:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 sm:h-11 sm:w-11">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-base font-semibold sm:mt-6 sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/40 sm:mt-3">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   CLIENT STORY
========================================================= */

function ClientStory() {
  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="overflow-hidden rounded-[26px] bg-[#EEF4FF] p-5 sm:rounded-[32px] sm:p-8 md:p-12 lg:p-16"
        >
          <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-[1fr_.8fr]">
            <div className="min-w-0">
              <SectionLabel>Client Story</SectionLabel>

              <blockquote className="mt-6 max-w-3xl text-xl font-medium leading-[1.4] tracking-tight text-slate-900 sm:mt-7 sm:text-2xl md:text-3xl">
                “We went from zero presence in UAE search to top 3 for our
                core keywords in 8 months.”
              </blockquote>

              <div className="mt-7 sm:mt-8">
                <p className="font-semibold text-slate-900">
                  Nadia Al-Khalidi
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  CMO · E-Commerce Brand, Dubai
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {[
                ["8 mo", "Campaign period"],
                ["Top 3", "Core keywords"],
                ["UAE", "Target market"],
                ["Organic", "Growth channel"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-blue-200/60 bg-white p-4 sm:rounded-2xl sm:p-5"
                >
                  <div className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    {value}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="overflow-hidden bg-[#F7F9FC] px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionLabel>FAQs</SectionLabel>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl md:text-5xl">
            Questions we
            <span className="text-blue-600"> answer every day.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Still have questions? Our SEO team can walk you through your
            opportunities and explain what a campaign could look like.
          </p>
        </div>

        <div className="mt-9 space-y-2.5 sm:mt-12 sm:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[18px] border border-slate-200 bg-white sm:rounded-[20px]"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex min-h-[60px] w-full items-center justify-between gap-4 p-4 text-left sm:min-h-0 sm:p-6"
                >
                  <span className="text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 text-sm leading-7 text-slate-500 sm:px-6 sm:pb-6">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function CTA() {
  return (
    <section
      id="contact"
      className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[26px] bg-[#0A0F1D] px-5 py-12 text-white sm:rounded-[34px] sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[90px] sm:h-80 sm:w-80" />

          <div className="pointer-events-none absolute -bottom-40 left-1/4 h-64 w-64 rounded-full bg-violet-600/15 blur-[90px] sm:h-80 sm:w-80" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold text-white/70 sm:px-4 sm:text-xs">
                <Zap size={13} className="shrink-0 text-blue-400" />
                Start growing organically
              </div>

              <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:mt-7 sm:text-4xl md:text-5xl">
                Data-driven SEO services.
                <span className="text-blue-400">
                  {" "}
                  Results that deliver growth.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:mt-5 sm:text-base">
                Tell us your goals. We'll build a custom SEO strategy around
                your market, competition and growth opportunities.
              </p>

              <div className="mt-7 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                {[
                  "Free 30-minute SEO audit",
                  "Top technical issues identified",
                  "Competitor keyword gap analysis",
                  "Custom strategy proposal",
                  "Dedicated SEO account manager",
                  "No lock-in contracts",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-w-0 items-center gap-2 text-xs text-white/60 sm:text-sm"
                  >
                    <Check size={15} className="shrink-0 text-blue-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 lg:text-center">
              <a
                href="/contact"
                className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#0A0F1D] transition hover:scale-[1.02] sm:w-auto"
              >
                Get My Free Audit

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <p className="mt-3 text-center text-[10px] text-white/30 sm:mt-4 sm:text-xs">
                No obligation · Response within 1 business day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function SEO() {
  return (
    <>
      <Helmet>
        <title>SEO Agency in Noida | SEO Services | AdNex Media</title>

        <meta
          name="description"
          content="AdNex Media provides professional SEO services in Noida including technical SEO, keyword research, content marketing, local SEO, on-page SEO and link building."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.adnexmedia.in/seo"
        />
      </Helmet>

      <main className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-slate-900">
        <Hero />

        <LogoMarquee />

        <Services />

        <Process />

        <Results />

        <WhyAdNex />

        <Commitment />

        <ClientStory />

        <FAQ />

        <CTA />

        <Footer />
      </main>
    </>
  );
}