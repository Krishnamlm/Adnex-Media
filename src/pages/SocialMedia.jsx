import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Sparkles,
  Target,
  PenTool,
  Video,
  CalendarDays,
  MessageCircle,
  BarChart3,
  Layers3,
  Megaphone,
  Users,
  Search,
  Palette,
  Workflow,
  RefreshCcw,
  Smartphone,
  Play,
  Heart,
  Send,
  MousePointerClick,
  Globe,
  Building2,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  CheckCircle2,
  Settings2,
  Plus,
  Minus,
} from "lucide-react";

import Footer from "../components/Footer/Footer";

/* =========================================================
   DATA
========================================================= */

const services = [
  {
    number: "01",
    title: "Social Strategy",
    tag: "Direction",
    description:
      "Build a clear social direction around your audience, positioning, platforms and business objectives.",
    icon: Target,
  },
  {
    number: "02",
    title: "Content Creation",
    tag: "Creative",
    description:
      "Static creatives, carousels, stories and visual content designed around your brand.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Reels & Short Form",
    tag: "Video",
    description:
      "Concepts, editing, hooks and motion-led content for short attention spans.",
    icon: Video,
  },
  {
    number: "04",
    title: "Content Planning",
    tag: "Planning",
    description:
      "Structured content calendars that keep your communication consistent and purposeful.",
    icon: CalendarDays,
  },
  {
    number: "05",
    title: "Community",
    tag: "Engagement",
    description:
      "Keep conversations active through comments, messages and meaningful audience interactions.",
    icon: MessageCircle,
  },
  {
    number: "06",
    title: "Brand Positioning",
    tag: "Identity",
    description:
      "Create a recognizable social identity through consistent visual and verbal communication.",
    icon: Sparkles,
  },
  {
    number: "07",
    title: "Paid Social",
    tag: "Campaigns",
    description:
      "Campaign creative, audience-focused messaging and performance-led social advertising support.",
    icon: Megaphone,
  },
  {
    number: "08",
    title: "Social Analytics",
    tag: "Insights",
    description:
      "Understand content signals, audience response and campaign performance.",
    icon: BarChart3,
  },
];

const platforms = [
  {
    name: "Instagram",
    short: "IG",
    description:
      "Reels, carousels, stories and visual storytelling designed for everyday attention.",
    icon: Smartphone,
    metric: "Visual-first",
  },
  {
    name: "Facebook",
    short: "FB",
    description:
      "Content distribution, communities and campaigns built around audience interaction.",
    icon: Users,
    metric: "Community",
  },
  {
    name: "LinkedIn",
    short: "IN",
    description:
      "Professional content, authority and B2B communication.",
    icon: BriefcaseBusiness,
    metric: "Authority",
  },
  {
    name: "YouTube",
    short: "YT",
    description:
      "Short-form video, long-form content and channel development.",
    icon: Play,
    metric: "Video",
  },
  {
    name: "X",
    short: "X",
    description:
      "Real-time communication and brand conversations.",
    icon: MessageCircle,
    metric: "Realtime",
  },
];

const formats = [
  ["Reels", Video],
  ["Carousels", Layers3],
  ["Static Creatives", Palette],
  ["Stories", Smartphone],
  ["Short Videos", Play],
  ["Campaign Creatives", Megaphone],
  ["Educational Content", GraduationCap],
  ["Founder Content", BriefcaseBusiness],
];

const pillars = [
  {
    number: "01",
    title: "Educate",
    description: "Share knowledge, insights and useful information.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Engage",
    description: "Create conversations and encourage interaction.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Inspire",
    description: "Build emotional connection through meaningful stories.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Promote",
    description: "Communicate products, services and campaigns clearly.",
    icon: Megaphone,
  },
  {
    number: "05",
    title: "Humanize",
    description: "Show the people, culture and personality behind the brand.",
    icon: Users,
  },
  {
    number: "06",
    title: "Convert",
    description: "Move audiences toward meaningful business actions.",
    icon: MousePointerClick,
  },
];

const industries = [
  ["Real Estate", Building2, "Project launches, property showcases and lifestyle content."],
  ["Technology", Globe, "Product storytelling and thought leadership."],
  ["E-commerce", ShoppingBag, "Product discovery and conversion-focused creatives."],
  ["Healthcare", HeartPulse, "Educational communication and trust-focused storytelling."],
  ["Education", GraduationCap, "Institutional and student-focused communication."],
  ["Professional Services", BriefcaseBusiness, "Expert positioning and credibility-driven content."],
];

const process = [
  ["Discover", "Understand your brand, audience, market and current social presence.", Search],
  ["Strategize", "Define platforms, content pillars, campaigns and communication direction.", Target],
  ["Create", "Develop designs, videos, captions and campaign assets.", PenTool],
  ["Review", "Refine content according to your brand guidelines and objectives.", CheckCircle2],
  ["Publish", "Schedule and distribute content across selected platforms.", Send],
  ["Optimize", "Use audience and content signals to improve the next cycle.", RefreshCcw],
];

const faqs = [
  {
    question: "What social media platforms do you manage?",
    answer:
      "We can create and manage content for platforms such as Instagram, Facebook, LinkedIn, YouTube, X and Pinterest depending on your audience and objectives.",
  },
  {
    question: "Do you create Reels and short-form videos?",
    answer:
      "Yes. Our content services can include Reel concepts, editing, motion graphics, short-form videos and platform-specific creative formats.",
  },
  {
    question: "Do you provide social media strategy?",
    answer:
      "Yes. We develop content pillars, platform direction, campaign ideas and publishing plans based on your brand and audience.",
  },
  {
    question: "Can you manage our social media accounts?",
    answer:
      "Yes. Depending on the engagement, management can include planning, content creation, scheduling, publishing and community management.",
  },
  {
    question: "Do you provide paid social media advertising?",
    answer:
      "Yes. We can support paid social campaigns with campaign creatives, audience-focused messaging and performance analysis.",
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer:
      "Yes. We can work within an existing identity or help create a more consistent social-media visual system.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, dark = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] ${
        dark
          ? "border-white/10 bg-white/[0.05] text-blue-300"
          : "border-slate-200 bg-white text-blue-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          dark ? "bg-cyan-300" : "bg-blue-600"
        }`}
      />
      {children}
    </div>
  );
}

/* =========================================================
   HERO VISUAL
========================================================= */

function SocialCommandCenter() {
  const cards = [
    {
      label: "REELS",
      title: "Hook → Story → Action",
      icon: Video,
    },
    {
      label: "CONTENT",
      title: "12 assets ready",
      icon: Palette,
    },
    {
      label: "INSIGHTS",
      title: "Audience signals",
      icon: BarChart3,
    },
  ];

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[620px]">
      {/* glow */}
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px]" />

      {/* orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-400/20"
      />

      {/* center */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(37,99,235,.1)",
            "0 0 0 25px rgba(37,99,235,0)",
            "0 0 0 0 rgba(37,99,235,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2.2rem] border border-white/15 bg-[#101827]/90 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500">
          <Sparkles size={22} />
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Social
        </span>

        <span className="mt-1 text-lg font-bold text-white">
          Command Center
        </span>
      </motion.div>

      {/* floating cards */}
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            animate={{
              y: [0, index % 2 === 0 ? -12 : 12, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={[
              "absolute z-30 rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl",
              index === 0
                ? "left-0 top-[18%]"
                : index === 1
                  ? "right-0 top-[43%]"
                  : "bottom-[7%] left-[12%]",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                <Icon size={18} />
              </div>

              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-white/40">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {item.title}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* orbit dots */}
      {[0, 1, 2, 3].map((item) => (
        <motion.span
          key={item}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2 + item * 0.4,
            repeat: Infinity,
          }}
          className={[
            "absolute h-2 w-2 rounded-full bg-cyan-300",
            item === 0
              ? "left-[22%] top-[12%]"
              : item === 1
                ? "right-[17%] top-[22%]"
                : item === 2
                  ? "right-[21%] bottom-[18%]"
                  : "left-[19%] bottom-[27%]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

/* =========================================================
   SOCIAL FEED
========================================================= */

function FeedPreview() {
  return (
    <div className="relative mx-auto max-w-[520px]">
      <div className="absolute -inset-10 rounded-[4rem] bg-blue-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        {/* top */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white">
              <Smartphone size={19} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                adnex.media
              </p>
              <p className="text-[10px] text-slate-400">
                Social content system
              </p>
            </div>
          </div>

          <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
            LIVE
          </div>
        </div>

        {/* visual */}
        <div className="relative mx-4 mt-4 h-[260px] overflow-hidden rounded-[1.5rem] bg-[#08111F]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,.4),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(139,92,246,.35),transparent_35%)]" />

          <div className="absolute left-6 top-7">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-200">
              New Campaign
            </span>

            <h3 className="mt-5 max-w-[270px] text-3xl font-black leading-[0.95] tracking-tight text-white">
              MAKE YOUR
              <br />
              BRAND
              <br />
              <span className="text-blue-300">VISIBLE.</span>
            </h3>
          </div>

          <motion.div
            animate={{ rotate: [0, 6, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -bottom-8 -right-5 h-44 w-44 rounded-[2rem] border border-white/10 bg-white/[0.08] backdrop-blur-xl"
          />

          <div className="absolute bottom-5 left-6 flex items-center gap-2 text-xs text-white/50">
            <Heart size={13} />
            <span>Creative direction</span>
          </div>
        </div>

        {/* content */}
        <div className="grid grid-cols-3 gap-2 px-4 py-4">
          {["Strategy", "Creative", "Insights"].map((item, index) => (
            <div
              key={item}
              className="rounded-xl bg-slate-50 p-3 text-center"
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                0{index + 1}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-800">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SocialMedia() {
  const [activePlatform, setActivePlatform] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Helmet>
        <title>
          Social Media Marketing Agency in Noida | AdNex Media
        </title>

        <meta
          name="description"
          content="AdNex Media is a social media marketing agency in Noida offering social media management, content creation, graphic design, Instagram marketing, Facebook marketing and brand growth strategies."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.adnexmedia.in/social-media"
        />
      </Helmet>

      <main className="overflow-hidden bg-white text-[#090E1B]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[#070B16] text-white">
  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.20),transparent_30%),radial-gradient(circle_at_90%_75%,rgba(139,92,246,0.16),transparent_30%)]" />

    <motion.div
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -25, 20, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[100px]"
    />

    <motion.div
      animate={{
        x: [0, -30, 20, 0],
        y: [0, 25, -20, 0],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[100px]"
    />

    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
    <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      
      {/* LEFT CONTENT */}
      <Reveal>
        <div className="max-w-2xl">
          <Label dark>Social Media · Adnex Media</Label>

          <h1 className="mt-7 text-[clamp(3.2rem,7vw,6.6rem)] font-black leading-[0.9] tracking-[-0.065em]">
            Turn attention
            <br />
            into{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              momentum.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Strategy, content and creative systems that help brands show up
            consistently, communicate clearly and build stronger connections
            across social platforms.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#070B16] transition hover:bg-blue-50"
            >
              Build Your Social Strategy
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              Explore Services
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* MINI FEATURE ROW */}
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/10 pt-6">
            {[
              ["01", "Strategy"],
              ["02", "Creative"],
              ["03", "Content"],
              ["04", "Analytics"],
            ].map(([number, item]) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-blue-300">
                  {number}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* RIGHT VISUAL */}
      <Reveal delay={0.15}>
        <div className="relative mx-auto w-full max-w-[650px]">
          
          {/* Outer glow */}
          <div className="absolute -inset-10 rounded-[4rem] bg-blue-500/10 blur-3xl" />

          {/* Decorative floating dots */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-[8%] top-[4%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,.8)]"
          />

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-[5%] top-[45%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,.8)]"
          />

          {/* MAIN DASHBOARD */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C1220]/95 p-3 shadow-[0_40px_100px_rgba(0,0,0,.45)] backdrop-blur-xl sm:rounded-[2.5rem] sm:p-4">

            {/* Browser Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4 sm:px-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <span className="h-2 w-2 rounded-full bg-green-400/80" />
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[9px] font-semibold text-slate-500">
                adnex.media / social
              </div>

              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
            </div>

            <div className="grid gap-3 p-2 sm:grid-cols-[1.15fr_.85fr] sm:p-3">

              {/* SOCIAL FEED */}
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#111827]">
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,.4),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,.35),transparent_35%)]" />

                <div className="relative p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <Smartphone size={15} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-white">
                          adnex.media
                        </p>
                        <p className="text-[8px] text-white/40">
                          Campaign Preview
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[8px] font-bold text-emerald-300">
                      LIVE
                    </span>
                  </div>

                  <div className="mt-10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-blue-300">
                      Campaign 01
                    </p>

                    <h3 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-black leading-[0.9] tracking-[-0.05em]">
                      MAKE
                      <br />
                      YOUR
                      <br />
                      <span className="text-blue-300">VISIBLE.</span>
                    </h3>
                  </div>

                  <div className="mt-12 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[9px] text-white/40">
                      <Heart size={12} />
                      Creative direction
                    </div>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((item) => (
                        <span
                          key={item}
                          className={`h-1.5 w-1.5 rounded-full ${
                            item === 1
                              ? "bg-blue-300"
                              : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT MINI DASHBOARD */}
              <div className="grid gap-3">
                
                {/* REEL CARD */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        Short Form
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        Reel Studio
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                      <Play size={15} />
                    </div>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: ["30%", "78%", "45%", "85%"] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-[8px] text-slate-500">
                    <span>Hook</span>
                    <span>Story</span>
                    <span>Action</span>
                  </div>
                </motion.div>

                {/* CONTENT CARD */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        Content
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        Publishing Flow
                      </p>
                    </div>

                    <CalendarDays
                      size={17}
                      className="text-cyan-300"
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 21 }).map((_, index) => (
                      <motion.span
                        key={index}
                        animate={{
                          opacity:
                            index % 4 === 0
                              ? [0.25, 1, 0.25]
                              : 0.25,
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.04,
                          repeat: Infinity,
                        }}
                        className={`aspect-square rounded-[3px] ${
                          index % 4 === 0
                            ? "bg-blue-400"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* INSIGHT CARD */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-violet-600 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                        Insights
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        Audience Signals
                      </p>
                    </div>

                    <BarChart3 size={17} className="text-white" />
                  </div>

                  <div className="mt-5 flex items-end gap-1.5">
                    {[35, 52, 42, 68, 58, 82, 72, 94].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          animate={{
                            height: [`${height}%`, `${height + 8}%`, `${height}%`],
                          }}
                          transition={{
                            duration: 2.2,
                            delay: index * 0.08,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="flex-1 rounded-t-sm bg-white/60"
                        />
                      )
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* BOTTOM STATUS */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-3 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" />
                <span className="text-[9px] font-medium text-slate-500">
                  Content system active
                </span>
              </div>

              <div className="flex gap-2">
                {["IG", "FB", "IN", "YT"].map((item) => (
                  <span
                    key={item}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[8px] font-bold text-slate-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FLOATING CARD — TOP RIGHT */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-3 -top-7 hidden w-44 rounded-2xl border border-white/10 bg-[#101827]/90 p-3 shadow-2xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">
                Reels
              </span>

              <Video size={13} className="text-blue-300" />
            </div>

            <p className="mt-2 text-xs font-bold text-white">
              Hook → Story → Action
            </p>
          </motion.div>

          {/* FLOATING CARD — LEFT */}
          <motion.div
            animate={{
              y: [0, 9, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-6 bottom-12 hidden w-40 rounded-2xl border border-white/10 bg-[#101827]/90 p-3 shadow-2xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                <Sparkles size={13} />
              </div>

              <div>
                <p className="text-[8px] text-slate-500">
                  Creative system
                </p>

                <p className="text-xs font-bold text-white">
                  Always on brand
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </div>

    {/* BOTTOM SCROLL INDICATOR */}
    <motion.div
      animate={{ y: [0, 7, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="mt-16 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600"
    >
      <span className="h-8 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
      Scroll to explore
    </motion.div>
  </div>
</section>

      {/* =====================================================
          INTRO STRIP
      ===================================================== */}

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
  <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
    <Reveal>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
          Social, with purpose
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-[#090E1B] sm:text-5xl lg:text-6xl">
          Your feed should feel like a brand.
          <span className="text-slate-300"> Not a content dump.</span>
        </h2>
      </div>
    </Reveal>

    <Reveal delay={0.1}>
      <p className="max-w-sm text-sm leading-6 text-slate-500">
        We combine strategy, creative direction, content production and
        performance insights into one connected social system.
      </p>
    </Reveal>
  </div>
</section>

      {/* =====================================================
          SERVICES - ASYMMETRIC
      ===================================================== */}

      <section id="services" className="px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label>What we do</Label>

            <div className="mt-6 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <h2 className="max-w-lg text-5xl font-black tracking-[-0.055em] sm:text-6xl">
                  Your social presence,
                  <span className="text-blue-600"> engineered.</span>
                </h2>
              </div>

              <p className="max-w-2xl self-end text-base leading-7 text-slate-500">
                We don't treat social media as a collection of posts. We build
                a connected system where strategy, creative, publishing,
                community and insights work together.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.number} delay={(index % 4) * 0.05}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`group relative h-full overflow-hidden rounded-[1.7rem] border border-slate-200 bg-[#F7F9FC] p-6 transition hover:border-blue-200 hover:bg-white hover:shadow-[0_25px_60px_rgba(37,99,235,0.10)] ${
                      index === 0 || index === 7
                        ? "lg:min-h-[270px]"
                        : "lg:min-h-[230px]"
                    }`}
                  >
                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/15" />

                    <div className="relative flex items-start justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        {service.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm">
                        <Icon size={18} />
                      </div>
                    </div>

                    <div className="relative mt-16">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600">
                        {service.tag}
                      </span>

                      <h3 className="mt-2 text-xl font-black tracking-tight">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        {service.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="absolute bottom-6 right-6 text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL SYSTEM
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F7F9FC] px-5 py-24 sm:px-8 lg:px-16">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <Label>Social system</Label>

              <h2 className="mt-6 text-5xl font-black tracking-[-0.055em] sm:text-6xl">
                One system.
                <br />
                <span className="text-blue-600">Many touchpoints.</span>
              </h2>

              <p className="mt-7 max-w-lg text-base leading-7 text-slate-500">
                Every social touchpoint should feel like it belongs to the
                same brand. We connect strategy, design, video, distribution
                and audience interaction into one visual system.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Consistent visual language",
                  "Platform-specific content",
                  "Connected campaign thinking",
                  "Continuous optimization",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={13} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <FeedPreview />
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          PLATFORMS
      ===================================================== */}

      <section className="bg-[#070B16] px-5 py-24 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label dark>Platform intelligence</Label>

            <div className="mt-7 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                  Different
                  <br />
                  platforms.
                  <br />
                  <span className="text-blue-300">Different rules.</span>
                </h2>
              </div>

              <p className="max-w-2xl self-end text-white/45">
                We adapt the content system to the behavior, format and
                communication style of each platform instead of publishing the
                same thing everywhere.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className="space-y-2">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                const active = activePlatform === index;

                return (
                  <button
                    key={platform.name}
                    onClick={() => setActivePlatform(index)}
                    className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-blue-400/30 bg-blue-500/10"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          active
                            ? "bg-blue-500 text-white"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-bold">{platform.name}</p>
                        <p className="mt-0.5 text-[10px] text-white/35">
                          {platform.metric}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      size={15}
                      className={`transition ${
                        active
                          ? "translate-x-0 text-blue-300"
                          : "-translate-x-1 text-white/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C1322]">
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex h-full flex-col justify-between p-7 sm:p-10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">
                        0{activePlatform + 1} / PLATFORM
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white/40">
                        {platforms[activePlatform].metric}
                      </span>
                    </div>

                    <h3 className="mt-14 text-5xl font-black tracking-[-0.05em]">
                      {platforms[activePlatform].name}
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-7 text-white/45">
                      {platforms[activePlatform].description}
                    </p>
                  </div>

                  <div className="mt-12 grid gap-3 sm:grid-cols-3">
                    {["Content", "Creative", "Distribution"].map(
                      (item, index) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                        >
                          <span className="text-xs text-blue-300">
                            0{index + 1}
                          </span>
                          <p className="mt-4 text-sm font-bold">{item}</p>
                          <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${65 + index * 10}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORMATS MARQUEE
      ===================================================== */}

      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <Reveal>
            <Label>Content formats</Label>

            <h2 className="mt-7 max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              Built for how people
              <span className="text-blue-600"> actually scroll.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-4 px-5"
          >
            {[...formats, ...formats].map(([title, Icon], index) => (
              <div
                key={`${title}-${index}`}
                className="flex min-w-[230px] items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-[#F7F9FC] p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <Icon size={19} />
                </div>

                <div>
                  <p className="text-sm font-black">{title}</p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Social content
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PILLARS
      ===================================================== */}

      <section className="bg-[#F7F9FC] px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label>Content philosophy</Label>

            <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                Content should
                <br />
                <span className="text-blue-600">do something.</span>
              </h2>

              <p className="max-w-xl self-end text-slate-500">
                From education to conversion, every content piece needs a
                reason to exist.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <motion.button
                    key={pillar.number}
                    onClick={() => setActivePillar(index)}
                    whileHover={{ y: -4 }}
                    className={`rounded-2xl border p-5 text-left transition ${
                      activePillar === index
                        ? "border-blue-200 bg-white shadow-lg"
                        : "border-slate-200 bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        {pillar.number}
                      </span>
                      <Icon
                        size={17}
                        className={
                          activePillar === index
                            ? "text-blue-600"
                            : "text-slate-300"
                        }
                      />
                    </div>

                    <p className="mt-10 text-lg font-black">
                      {pillar.title}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <div className="relative min-h-[350px] overflow-hidden rounded-[2rem] bg-[#0A0F1D] p-8 text-white sm:p-12">
              <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-600/15 blur-[100px]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative flex h-full flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                      {pillars[activePillar].number} / Content pillar
                    </span>

                    <h3 className="mt-12 text-5xl font-black tracking-[-0.05em]">
                      {pillars[activePillar].title}
                    </h3>

                    <p className="mt-5 max-w-lg text-base leading-7 text-white/45">
                      {pillars[activePillar].description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/25">
                      Content direction
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                      {React.createElement(pillars[activePillar].icon, {
                        size: 24,
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GROWTH LOOP
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label>Growth loop</Label>

            <h2 className="mt-7 max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              Social media is a
              <br />
              <span className="text-blue-600">continuous system.</span>
            </h2>
          </Reveal>

          <div className="relative mx-auto mt-20 max-w-5xl">
            {/* center */}
            <div className="relative z-10 mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_20px_60px_rgba(37,99,235,.15)]">
              <div className="text-center">
                <Sparkles className="mx-auto text-blue-600" size={23} />
                <p className="mt-2 text-xs font-black uppercase tracking-widest">
                  Brand
                </p>
              </div>
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-200"
            />

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["Research", Search],
                ["Create", PenTool],
                ["Publish", Send],
                ["Engage", MessageCircle],
                ["Measure", BarChart3],
                ["Optimize", RefreshCcw],
              ].map(([title, Icon], index) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
                >
                  <span className="text-[9px] font-bold text-slate-300">
                    0{index + 1}
                  </span>

                  <div className="mx-auto mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </div>

                  <p className="mt-3 text-sm font-bold">{title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CREATIVE PROCESS TIMELINE
      ===================================================== */}

      <section className="bg-[#070B16] px-5 py-24 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label dark>Creative workflow</Label>

            <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                From blank
                <br />
                canvas to
                <br />
                <span className="text-blue-300">published.</span>
              </h2>

              <p className="max-w-xl self-end text-white/40">
                A structured production flow keeps ideas moving while
                maintaining quality, consistency and strategic direction.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-20">
            <div className="absolute left-[25px] top-0 hidden h-full w-px bg-white/10 md:block" />

            <div className="space-y-4">
              {process.map(([title, description, Icon], index) => (
                <Reveal key={title} delay={index * 0.04}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="group relative grid gap-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[52px_180px_1fr_auto] md:items-center"
                  >
                    <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-white/10 bg-[#101827] text-blue-300">
                      <Icon size={19} />
                    </div>

                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-300">
                        Step 0{index + 1}
                      </span>

                      <h3 className="mt-1 text-lg font-black">{title}</h3>
                    </div>

                    <p className="text-sm leading-6 text-white/40">
                      {description}
                    </p>

                    <ArrowUpRight className="text-white/20 transition group-hover:text-blue-300" />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label>Industries</Label>

            <div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                Social strategy
                <br />
                <span className="text-blue-600">without a template.</span>
              </h2>

              <p className="max-w-sm text-sm leading-6 text-slate-500">
                Every industry has a different audience, buying cycle and
                communication style.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 divide-y divide-slate-200 border-y border-slate-200">
            {industries.map(([title, Icon, description], index) => (
              <motion.div
                key={title}
                whileHover={{ paddingLeft: 15 }}
                className="group grid gap-4 py-7 transition md:grid-cols-[80px_280px_1fr_auto] md:items-center"
              >
                <span className="text-xs font-bold text-slate-300">
                  0{index + 1}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-blue-600">
                    <Icon size={17} />
                  </div>

                  <h3 className="text-lg font-black">{title}</h3>
                </div>

                <p className="text-sm text-slate-500">{description}</p>

                <ArrowUpRight className="text-slate-300 transition group-hover:text-blue-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DELIVERABLES
      ===================================================== */}

      <section className="bg-[#F7F9FC] px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label>What you get</Label>

            <h2 className="mt-7 max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              Everything your social system
              <span className="text-blue-600"> needs.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-3 md:grid-cols-2">
            {[
              {
                title: "Strategy",
                icon: Target,
                items: [
                  "Monthly content direction",
                  "Content pillars",
                  "Campaign concepts",
                  "Platform planning",
                ],
              },
              {
                title: "Creative",
                icon: Palette,
                items: ["Social posts", "Carousels", "Reels", "Stories"],
              },
              {
                title: "Management",
                icon: Workflow,
                items: [
                  "Content scheduling",
                  "Publishing",
                  "Community management",
                  "Profile support",
                ],
              },
              {
                title: "Reporting",
                icon: BarChart3,
                items: [
                  "Performance summary",
                  "Content insights",
                  "Audience signals",
                  "Optimization recommendations",
                ],
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-[1.7rem] border border-slate-200 bg-white p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={20} />
                      </div>

                      <span className="text-xs font-bold text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-10 text-2xl font-black">
                      {item.title}
                    </h3>

                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {item.items.map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-2 text-xs font-medium text-slate-500"
                        >
                          <Check size={14} className="text-blue-600" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PORTFOLIO / VISUAL BOARD
      ===================================================== */}

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Label>Creative direction</Label>

            <div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                Design that looks
                <br />
                <span className="text-blue-600">native to the feed.</span>
              </h2>

              <a
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold"
              >
                Discuss your brand
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#0A0F1D] p-8 text-white lg:col-span-7 lg:row-span-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,.35),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,.25),transparent_35%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">
                  Campaign 01
                </span>

                <div>
                  <p className="text-sm text-white/40">Creative direction</p>
                  <h3 className="mt-3 max-w-xl text-5xl font-black tracking-[-0.06em]">
                    Stop the scroll.
                    <br />
                    Start the conversation.
                  </h3>
                </div>
              </div>
            </motion.div>

            {[
              ["01", "Brand Story", "bg-blue-50"],
              ["02", "Campaign System", "bg-violet-50"],
              ["03", "Content Engine", "bg-cyan-50"],
              ["04", "Audience Signals", "bg-emerald-50"],
            ].map(([number, title, bg]) => (
              <motion.div
                key={number}
                whileHover={{ y: -5 }}
                className={`group rounded-[2rem] ${bg} p-7 lg:col-span-5`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    {number}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition group-hover:text-blue-600"
                  />
                </div>

                <div className="mt-16">
                  <p className="text-2xl font-black tracking-tight">{title}</p>
                  <div className="mt-4 h-1 w-14 rounded-full bg-blue-600 transition group-hover:w-24" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="bg-[#070B16] px-5 py-24 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <Label dark>FAQ</Label>

            <h2 className="mt-7 text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              Questions,
              <br />
              <span className="text-blue-300">answered.</span>
            </h2>
          </Reveal>

          <div className="mt-14 border-t border-white/10">
            {faqs.map((faq, index) => {
              const open = openFaq === index;

              return (
                <div key={faq.question} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenFaq(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-center gap-5">
                      <span className="text-xs font-bold text-white/20">
                        0{index + 1}
                      </span>

                      <span className="text-sm font-bold sm:text-base">
                        {faq.question}
                      </span>
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-white/30 transition ${
                        open ? "rotate-180 text-blue-300" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-7 pl-10 text-sm leading-7 text-white/40 sm:pl-12">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0A0F1D] px-7 py-16 text-white sm:px-12 lg:px-20 lg:py-20">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-600/25 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <Label dark>Let's build</Label>

              <h2 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                Your next
                <br />
                <span className="text-blue-300">social chapter.</span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                Tell us what you're building, where your brand is today and
                where you want your social presence to go.
              </p>
            </div>

            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-[#090E1B] transition hover:-translate-y-1"
            >
              Start a project
              <ArrowUpRight
                size={17}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <Footer />
    </main>
    </>
  );
}