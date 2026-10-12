import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Layers,
  LineChart,
  Wrench,
  Search,
  Compass,
  Rocket,
  Gauge,
  ShieldCheck,
  Users,
  Building2,
  ShoppingBag,
  Video,
  HeartPulse,
  GraduationCap,
  Landmark,
  Home as HomeIcon,
  Plus,
  Minus,
  Quote,
  MousePointerClick,
  Eye,
  UserCheck,
  Wallet,
  ArrowRight,
  Check,
  Activity,
  BarChart3,
  Zap,
  Crosshair,
  Database,
  CircleDollarSign,
} from "lucide-react";

import Footer from "../components/Footer/Footer";

/* ================================================================
   DESIGN SYSTEM
================================================================ */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* ================================================================
   COUNT UP
================================================================ */

function useCountUp(
  target,
  {
    decimals = 0,
    duration = 1400,
    suffix = "",
    prefix = "",
  } = {}
) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let animationFrame;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(target * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, target, duration]);

  return [
    `${prefix}${value.toFixed(decimals)}${suffix}`,
    ref,
  ];
}

/* ================================================================
   SMALL COMPONENTS
================================================================ */

function SectionLabel({ children, light = false }) {
  return (
    <div
      className={`flex items-center gap-3 font-[IBM_Plex_Mono] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] ${
        light ? "text-[#8C96BA]" : "text-[#2A4DFF]"
      }`}
    >
      <span
        className={`h-px w-8 ${
          light ? "bg-[#536080]" : "bg-[#2A4DFF]"
        }`}
      />

      {children}
    </div>
  );
}

function StatItem({ value, opts, label, index }) {
  const [display, ref] = useCountUp(value, opts);

  return (
    <div
      ref={ref}
      className="group relative min-w-0 border-t border-[#DDD9D0] pt-6"
    >
      <span className="font-[IBM_Plex_Mono] text-[10px] text-[#9A9CA5]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="mt-3 font-[IBM_Plex_Mono] text-4xl sm:text-5xl font-medium tracking-[-0.05em] text-[#12172B] tabular-nums">
        {display}
      </div>

      <p className="mt-3 max-w-[20ch] text-[13px] leading-[1.6] text-[#656873]">
        {label}
      </p>

      <div className="mt-5 h-[2px] w-0 bg-[#2A4DFF] transition-all duration-500 group-hover:w-10" />
    </div>
  );
}

/* ================================================================
   HERO
================================================================ */

function Hero() {
  const bars = [32, 44, 38, 55, 48, 68, 62, 78, 70, 88, 80, 96];

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#080B18] px-4 pb-16 pt-28 text-[#FAF9F6] sm:px-6 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#2A4DFF]/20 blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-60 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#FF6A3D]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* LEFT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="min-w-0"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel light>
                Performance Marketing · Data · Growth
              </SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-4xl font-[Space_Grotesk] text-[44px] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[78px]"
            >
              Turn every
              <br />
              ad spend into
              <br />
              <span className="text-[#7187FF]">
                measurable growth.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-[15px] leading-[1.8] text-[#AEB5CB] sm:text-[17px]"
            >
              Adnex builds performance marketing systems that connect
              strategy, creative, media buying, and analytics — helping
              ambitious brands attract better customers and scale with
              confidence.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#final-cta"
                className="group inline-flex items-center justify-center gap-2 bg-[#2A4DFF] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#4664FF] hover:shadow-[0_15px_50px_rgba(42,77,255,.3)]"
              >
                Get a growth audit
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#results"
                className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04]"
              >
                Explore our results
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
            >
              {[
                "Google Ads",
                "Meta Ads",
                "Conversion Tracking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-[#858EAC]"
                >
                  <Check size={14} className="text-[#7187FF]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative min-w-0"
          >
            {/* Floating top badge */}
            <div className="absolute -right-2 -top-8 z-20 hidden rounded-full border border-white/10 bg-[#171C31] px-4 py-2 text-[10px] font-[IBM_Plex_Mono] uppercase tracking-wider text-[#A9B3D0] shadow-xl sm:flex">
              <span className="mr-2 h-1.5 w-1.5 self-center rounded-full bg-[#55D99A] shadow-[0_0_10px_#55D99A]" />
              Live campaign data
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11172A] p-5 shadow-[0_35px_100px_rgba(0,0,0,.4)] sm:p-7">
              {/* Dashboard glow */}
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#2A4DFF]/10 blur-[90px]" />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="font-[IBM_Plex_Mono] text-[10px] uppercase tracking-[0.16em] text-[#697390]">
                    Campaign overview
                  </p>

                  <h3 className="mt-1 font-[Space_Grotesk] text-lg font-semibold">
                    Performance
                  </h3>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Activity size={17} className="text-[#7187FF]" />
                </div>
              </div>

              {/* Main metric */}
              <div className="relative mt-7 rounded-2xl border border-white/[0.07] bg-[#0B1020] p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] text-[#737C99]">
                      Revenue attributed
                    </p>

                    <p className="mt-2 font-[Space_Grotesk] text-3xl font-semibold sm:text-4xl">
                      ₹42.8L
                    </p>
                  </div>

                  <span className="rounded-full bg-[#163629] px-2.5 py-1 text-[10px] font-medium text-[#62D69D]">
                    +28.4%
                  </span>
                </div>

                {/* Graph */}
                <div className="mt-7 flex h-32 items-end gap-2">
                  {bars.map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4 + index * 0.04,
                      }}
                      className={`flex-1 rounded-t-sm ${
                        index === bars.length - 1
                          ? "bg-[#7187FF]"
                          : "bg-[#7187FF]/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-3 flex justify-between font-[IBM_Plex_Mono] text-[9px] text-[#555E7A]">
                  <span>JAN</span>
                  <span>JUN</span>
                  <span>DEC</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Ad Spend", "₹12.4L", "+18.4%"],
                  ["Conversions", "18.4K", "+24.8%"],
                  ["Avg. CTR", "3.8%", "+12.2%"],
                  ["ROAS", "3.4×", "+16.7%"],
                ].map(([label, value, change]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                  >
                    <p className="text-[10px] text-[#697390]">
                      {label}
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-2">
                      <span className="font-[IBM_Plex_Mono] text-lg font-medium">
                        {value}
                      </span>

                      <span className="text-[9px] text-[#5CD39A]">
                        {change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["Clicks", "286K"],
                  ["CPC", "₹43"],
                  ["Leads", "8.2K"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-t border-white/[0.08] pt-3"
                  >
                    <p className="text-[9px] uppercase tracking-wider text-[#626B86]">
                      {label}
                    </p>
                    <p className="mt-1 font-[IBM_Plex_Mono] text-sm">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating KPI */}
            <div className="absolute -bottom-7 -left-3 hidden rounded-2xl border border-white/10 bg-[#FAF9F6] p-4 shadow-[0_20px_60px_rgba(0,0,0,.3)] sm:block">
              <p className="text-[9px] uppercase tracking-wider text-[#737784]">
                Efficiency
              </p>

              <div className="mt-1 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#2A4DFF]" />
                <span className="font-[IBM_Plex_Mono] text-lg font-semibold text-[#12172B]">
                  +34.7%
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom hero line */}
        <div className="mt-20 grid grid-cols-2 border-t border-white/[0.08] pt-7 sm:grid-cols-4">
          {[
            ["ROI", "Focused campaigns"],
            ["DATA", "Driven decisions"],
            ["360°", "Growth approach"],
            ["WEEKLY", "Optimization"],
          ].map(([value, label]) => (
            <div key={value} className="border-white/[0.08] py-3 sm:border-r sm:px-7 first:pl-0 last:border-0">
              <p className="font-[Space_Grotesk] text-xl font-semibold sm:text-2xl">
                {value}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-[#68718D]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   STATS
================================================================ */

function AnimatedStats() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel>
              Performance by numbers
            </SectionLabel>

            <h2 className="mt-5 max-w-xl font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#12172B] sm:text-5xl lg:text-6xl">
              Numbers that move
              <span className="text-[#2A4DFF]">
                {" "}businesses forward.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-[15px] leading-[1.8] text-[#656873]">
            We don't chase vanity metrics. We focus on the numbers that
            actually impact your business — from acquisition to revenue.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[#DDD9D0] pt-0 lg:grid-cols-4 lg:gap-0">
          <div className="pt-7 lg:pr-8">
            <StatItem
              index={0}
              value={182}
              opts={{ prefix: "$", suffix: "M+" }}
              label="Ad spend actively managed"
            />
          </div>

          <div className="pt-7 lg:border-l lg:border-[#DDD9D0] lg:px-8">
            <StatItem
              index={1}
              value={3.4}
              opts={{ decimals: 1, suffix: "x" }}
              label="Average ROAS lift, first 90 days"
            />
          </div>

          <div className="pt-7 lg:border-l lg:border-[#DDD9D0] lg:px-8">
            <StatItem
              index={2}
              value={240}
              opts={{ suffix: "+" }}
              label="Campaigns launched to date"
            />
          </div>

          <div className="pt-7 lg:border-l lg:border-[#DDD9D0] lg:pl-8">
            <StatItem
              index={3}
              value={92}
              opts={{ suffix: "%" }}
              label="Clients still with us after year one"
            />
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 font-[IBM_Plex_Mono] text-[9px] uppercase tracking-[0.16em] text-[#858894] sm:text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#2A4DFF]/50" />
            <span className="relative h-2 w-2 rounded-full bg-[#2A4DFF]" />
          </span>
          Data-led. Performance-focused. Always optimizing.
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PERFORMANCE SOLUTIONS
================================================================ */

const solutions = [
  {
    icon: Search,
    title: "Paid search",
    copy: "Google and Bing campaigns built around intent, not just keywords, with query-level bid control.",
  },
  {
    icon: Users,
    title: "Paid social",
    copy: "Meta, TikTok, and LinkedIn media buying with creative that's tested weekly, not launched and left.",
  },
  {
    icon: Layers,
    title: "Programmatic & retargeting",
    copy: "Display and video that keeps warm audiences moving toward a decision instead of just staying visible.",
  },
  {
    icon: MousePointerClick,
    title: "Conversion rate optimization",
    copy: "Landing pages and checkout flows tested against real traffic until the numbers move.",
  },
  {
    icon: LineChart,
    title: "Attribution & analytics",
    copy: "One dashboard that reconciles ad platforms, CRM, and revenue so spend decisions use real data.",
  },
  {
    icon: Target,
    title: "Creative testing",
    copy: "A steady pipeline of ad variants, scored on performance and refreshed before fatigue sets in.",
  },
  {
    icon: Video,
    title: "YouTube Ads",
    copy: "Build awareness, consideration and conversions through targeted video advertising across YouTube.",
  },
];

function PerformanceSolutions() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <SectionLabel>
              Our capabilities
            </SectionLabel>

            <h2 className="mt-6 max-w-3xl font-[Space_Grotesk] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#12172B] sm:text-5xl lg:text-7xl">
              Built for brands
              <br />
              that want to{" "}
              <span className="text-[#2A4DFF]">
                scale.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-[15px] leading-[1.8] text-[#686B75]">
            One team across strategy, technology, creative and performance —
            connected around the metrics that matter.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* FEATURED */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative min-h-[500px] overflow-hidden rounded-[30px] bg-[#12172B] p-7 text-white sm:p-10 lg:col-span-7 lg:p-12"
          >
            <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#2A4DFF]/20 blur-[100px]" />

            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "55px 55px",
              }}
            />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-[IBM_Plex_Mono] text-[10px] text-[#707A9C]">
                  01 / PERFORMANCE
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <ArrowUpRight size={18} className="text-[#7187FF]" />
                </div>
              </div>

              <div className="mt-20">
                <p className="mb-4 font-[IBM_Plex_Mono] text-[10px] uppercase tracking-[0.18em] text-[#7187FF]">
                  The operating system
                </p>

                <h3 className="max-w-2xl font-[Space_Grotesk] text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                  Performance marketing that knows what to optimize.
                </h3>

                <p className="mt-6 max-w-lg text-[14px] leading-[1.8] text-[#AEB5CB]">
                  Paid search, social, retargeting and conversion optimization
                  designed around your actual business goals.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {[
                  "Paid Media",
                  "Meta Ads",
                  "Google Ads",
                  "Analytics",
                  "Conversion",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-[#B8BED1]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SMALL CARDS */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            {solutions.slice(1, 7).map(
              ({ icon: Icon, title, copy }, index) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4 }}
                  className="group relative min-w-0 overflow-hidden rounded-[24px] border border-[#E3E0D8] bg-[#FAF9F6] p-6 transition-all duration-300 hover:border-[#C9CCDA] hover:bg-white hover:shadow-[0_20px_50px_rgba(18,23,43,.07)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF1FF] transition-colors group-hover:bg-[#2A4DFF]">
                      <Icon
                        size={19}
                        className="text-[#2A4DFF] group-hover:text-white"
                      />
                    </div>

                    <span className="font-[IBM_Plex_Mono] text-[9px] text-[#A0A2A9]">
                      0{index + 2}
                    </span>
                  </div>

                  <h3 className="mt-7 font-[Space_Grotesk] text-lg font-semibold text-[#12172B]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-[1.65] text-[#686B75]">
                    {copy}
                  </p>

                  <ArrowUpRight
                    size={16}
                    className="absolute bottom-6 right-6 text-[#B4B6BE] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2A4DFF]"
                  />
                </motion.div>
              )
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-[#E0DDD5] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[Space_Grotesk] text-lg font-medium text-[#12172B] sm:text-xl">
            One ecosystem. Every growth lever connected.
          </p>

          <a
            href="#final-cta"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#12172B] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2A4DFF]"
          >
            Talk to Adnex
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SERVICES
================================================================ */

const services = [
  {
    title: "Strategy & media planning",
    copy: "Channel mix, budget allocation, and quarterly targets set before a dollar goes out the door.",
  },
  {
    title: "Ad creative production",
    copy: "Static, video, and UGC-style assets produced in-house and matched to each platform's format.",
  },
  {
    title: "Landing page design & build",
    copy: "Pages designed to convert a specific offer, shipped fast, and iterated against test data.",
  },
  {
    title: "Tracking & tagging setup",
    copy: "Server-side tracking, conversion APIs, and event schemas configured once, correctly.",
  },
  {
    title: "Marketing automation",
    copy: "Lifecycle flows that pick up where the ad left off, so leads don't go cold in a spreadsheet.",
  },
  {
    title: "Reporting & dashboards",
    copy: "A live view of spend, pipeline, and payback, shared with your team, not locked in ours.",
  },
];

function Services() {
  return (
    <section className="relative overflow-hidden bg-[#11162A] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="pointer-events-none absolute right-[-15%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[#2A4DFF]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div>
            <SectionLabel light>
              What we deliver
            </SectionLabel>

            <h2 className="mt-6 max-w-3xl font-[Space_Grotesk] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              The capabilities
              <br />
              behind{" "}
              <span className="text-[#7187FF]">
                the growth.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-[14px] leading-[1.8] text-[#AEB5CB]">
            From acquisition to optimization, we bring strategy,
            technology, and creative together to create measurable
            business growth.
          </p>
        </div>

        <div className="mt-16 border-t border-white/[0.1]">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative grid gap-5 border-b border-white/[0.1] py-7 transition-all duration-300 hover:bg-white/[0.025] sm:py-9 lg:grid-cols-[70px_1fr_0.9fr_50px] lg:items-center lg:gap-8 lg:px-5"
            >
              <span className="font-[IBM_Plex_Mono] text-[10px] text-[#626C8A]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-[Space_Grotesk] text-xl font-medium tracking-[-0.025em] text-[#FAF9F6] transition-transform group-hover:translate-x-1 sm:text-2xl">
                {service.title}
              </h3>

              <p className="text-[13.5px] leading-[1.75] text-[#858EAA]">
                {service.copy}
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all group-hover:border-[#7187FF] group-hover:bg-[#2A4DFF]">
                <ArrowUpRight
                  size={15}
                  className="text-[#7D87A7] group-hover:text-white"
                />
              </div>

              <div className="absolute bottom-[-1px] left-0 h-px w-0 bg-[#5C78FF] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   HOW WE WORK
================================================================ */

const workSteps = [
  {
    icon: Compass,
    title: "Discover",
    copy: "We audit current spend, tracking, and creative to find where the money is actually leaking.",
  },
  {
    icon: Layers,
    title: "Architect",
    copy: "Channel plan, budget split, and tracking blueprint, reviewed with you before anything launches.",
  },
  {
    icon: Rocket,
    title: "Launch",
    copy: "Campaigns go live in a structured test, so we learn what works before scaling spend behind it.",
  },
  {
    icon: Gauge,
    title: "Optimize",
    copy: "Weekly review of every campaign against target CPA and ROAS, with changes made the same day.",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    copy: "Budget moves toward what's proven to work, and we widen the funnel without losing efficiency.",
  },
];

function HowWeWork() {
  return (
    <section className="bg-[#F2F1EC] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div>
            <SectionLabel>
              How we work
            </SectionLabel>

            <h2 className="mt-6 max-w-3xl font-[Space_Grotesk] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#12172B] sm:text-5xl lg:text-7xl">
              How an engagement
              <br />
              <span className="text-[#2A4DFF]">
                actually runs.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-[14px] leading-[1.8] text-[#686C77]">
            A structured performance process built to find opportunities,
            test intelligently, and scale what consistently delivers results.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-[5%] right-[5%] top-7 hidden h-px bg-[#D1D3D9] lg:block" />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
            {workSteps.map(({ icon: Icon, title, copy }, index) => (
              <div key={title} className="group relative">
                <div className="relative z-10 flex items-center gap-4 lg:block">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9CCD4] bg-[#F2F1EC] transition-all duration-300 group-hover:border-[#2A4DFF] group-hover:bg-[#12172B]">
                    <Icon
                      size={19}
                      className="text-[#12172B] transition-colors group-hover:text-white"
                    />
                  </div>

                  <h3 className="font-[Space_Grotesk] text-lg font-semibold text-[#12172B] lg:mt-6">
                    <span className="mr-2 font-[IBM_Plex_Mono] text-[10px] text-[#2A4DFF]">
                      0{index + 1}
                    </span>
                    {title}
                  </h3>
                </div>

                <p className="mt-4 text-[13px] leading-[1.75] text-[#686C77]">
                  {copy}
                </p>

                {index !== workSteps.length - 1 && (
                  <div className="absolute left-7 top-14 h-[calc(100%+48px)] w-px bg-[#D3D5DC] lg:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-[#D7D8DD] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-[#2A4DFF]" />
              <span className="absolute h-7 w-7 rounded-full border border-[#2A4DFF]/20" />
            </span>

            <span className="font-[IBM_Plex_Mono] text-[9px] uppercase tracking-[0.16em] text-[#777B86]">
              Every decision backed by performance data
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-[#12172B]">
            Test
            <ArrowRight size={14} className="text-[#2A4DFF]" />
            Learn
            <ArrowRight size={14} className="text-[#2A4DFF]" />
            Scale
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CONVERSION FUNNEL
================================================================ */

const funnelStages = [
  {
    icon: Eye,
    label: "Impressions",
    value: "1,240,000",
    width: 100,
  },
  {
    icon: MousePointerClick,
    label: "Clicks",
    value: "38,200",
    width: 76,
  },
  {
    icon: Users,
    label: "Landing page visits",
    value: "34,900",
    width: 62,
  },
  {
    icon: UserCheck,
    label: "Qualified leads",
    value: "4,120",
    width: 40,
  },
  {
    icon: Wallet,
    label: "Customers",
    value: "890",
    width: 22,
  },
];

function ConversionFunnel() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel>
              Conversion architecture
            </SectionLabel>

            <h2 className="mt-6 max-w-xl font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#12172B] sm:text-5xl">
              We watch every stage of the funnel,
              <span className="text-[#2A4DFF]">
                {" "}not just the last one.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-[14px] leading-[1.8] text-[#5B5F6B]">
              Most agencies report on clicks and hope the rest works itself
              out. We track spend all the way through to paying customers,
              so we know exactly where a campaign is losing people.
            </p>

            <p className="mt-4 max-w-lg text-[14px] leading-[1.8] text-[#5B5F6B]">
              A sample funnel from an active client account, updated weekly
              inside your dashboard.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#E0DDD5] px-4 py-2.5">
              <BarChart3 size={15} className="text-[#2A4DFF]" />
              <span className="font-[IBM_Plex_Mono] text-[10px] uppercase tracking-wider text-[#676A73]">
                Full-funnel visibility
              </span>
            </div>
          </div>

          {/* FUNNEL */}
          <div className="relative rounded-[30px] border border-[#E1DED7] bg-[#F8F7F3] p-5 sm:p-8">
            <div className="absolute right-7 top-7 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2A4DFF]" />
              <span className="font-[IBM_Plex_Mono] text-[9px] uppercase tracking-wider text-[#777984]">
                Weekly snapshot
              </span>
            </div>

            <div className="pt-8">
              {funnelStages.map(
                ({ icon: Icon, label, value, width }, index) => (
                  <div key={label} className="mb-5 last:mb-0">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-[#12172B]">
                        <Icon
                          size={14}
                          className="shrink-0 text-[#2A4DFF]"
                        />
                        <span className="truncate">{label}</span>
                      </span>

                      <span className="shrink-0 font-[IBM_Plex_Mono] text-[11px] text-[#686B75]">
                        {value}
                      </span>
                    </div>

                    <div className="h-9 overflow-hidden bg-[#E8E6DF]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1,
                        }}
                        className="h-full bg-[#2A4DFF]"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   WHY CHOOSE US
================================================================ */

const reasons = [
  {
    icon: Target,
    title: "Media and creative, one team",
    copy: "The people buying the media also brief the creative, so there's no handoff lag when something needs to change.",
  },
  {
    icon: BarChart3,
    title: "Dashboards you can actually open",
    copy: "Live reporting on spend, pipeline, and payback, shared with your team from day one, not sent as a monthly PDF.",
  },
  {
    icon: Gauge,
    title: "Weekly optimization, not quarterly",
    copy: "Budgets and bids get adjusted against target CPA every week, so underperformance gets caught early.",
  },
  {
    icon: ShieldCheck,
    title: "No lock-in contracts",
    copy: "Engagements run month to month after the first quarter. We keep clients by keeping the results ahead of the fee.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-[#11162A] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <SectionLabel light>
              Why Adnex
            </SectionLabel>

            <h2 className="mt-6 max-w-lg font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl">
              What changes when you
              <span className="text-[#7187FF]">
                {" "}work with us.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-[14px] leading-[1.8] text-[#8E97B2]">
              Less guesswork. Better visibility. A performance system
              designed around the economics of your business.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, copy }, index) => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.025] p-7 transition-all hover:border-[#5C78FF]/40 hover:bg-white/[0.045]"
              >
                <span className="absolute right-5 top-5 font-[IBM_Plex_Mono] text-[9px] text-[#4D5777]">
                  0{index + 1}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A2140]">
                  <Icon
                    size={19}
                    className="text-[#7187FF]"
                  />
                </div>

                <h3 className="mt-8 font-[Space_Grotesk] text-xl font-semibold">
                  {title}
                </h3>

                <p className="mt-3 text-[13.5px] leading-[1.75] text-[#929BB7]">
                  {copy}
                </p>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#5C78FF] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TECHNOLOGY
================================================================ */

const stack = [
  "GA4",
  "Meta CAPI",
  "Server-side GTM",
  "Northbeam",
  "Triple Whale",
  "HubSpot",
  "Salesforce",
  "Segment",
  "Looker Studio",
  "Shopify",
];

const trackingPoints = [
  {
    icon: ShieldCheck,
    title: "First-party by default",
    copy: "Server-side tagging and conversion APIs so tracking survives browser and platform changes.",
  },
  {
    icon: LineChart,
    title: "Marketing mix, not last click",
    copy: "Blended models that credit upper-funnel channels instead of handing everything to the last touch.",
  },
  {
    icon: Wrench,
    title: "Built into your stack",
    copy: "Tracking lives in your GA4, CRM, and warehouse, not a black box that leaves when we do.",
  },
];

function Technology() {
  return (
    <section className="bg-[#FAF9F6] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionLabel>
              Measurement infrastructure
            </SectionLabel>

            <h2 className="mt-6 max-w-lg font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#12172B] sm:text-5xl">
              Tracking that holds up once you
              <span className="text-[#2A4DFF]">
                {" "}scale spend.
              </span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {trackingPoints.map(
              ({ icon: Icon, title, copy }) => (
                <div key={title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDEFFF]">
                    <Icon
                      size={19}
                      className="text-[#2A4DFF]"
                    />
                  </div>

                  <h3 className="mt-5 font-[Space_Grotesk] font-semibold text-[#12172B]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[13.5px] leading-[1.7] text-[#5B5F6B]">
                    {copy}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-16 rounded-[24px] border border-[#E0DDD5] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-[IBM_Plex_Mono] text-[10px] uppercase tracking-[0.18em] text-[#777A84]">
              Connected stack
            </span>

            <div className="flex flex-wrap gap-2">
              {stack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[#E1DED7] bg-[#FAF9F6] px-3 py-1.5 font-[IBM_Plex_Mono] text-[10px] text-[#5B5F6B]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   INDUSTRIES
================================================================ */

const industries = [
  {
    icon: ShoppingBag,
    title: "DTC & ecommerce",
  },
  {
    icon: Building2,
    title: "B2B SaaS",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & wellness",
  },
  {
    icon: Landmark,
    title: "Financial services",
  },
  {
    icon: GraduationCap,
    title: "Education",
  },
  {
    icon: HomeIcon,
    title: "Home services",
  },
];

function Industries() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>
              Where we work
            </SectionLabel>

            <h2 className="mt-6 max-w-2xl font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#12172B] sm:text-5xl">
              Industries where we've spent
              <span className="text-[#2A4DFF]">
                {" "}real budget.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-[13.5px] leading-[1.7] text-[#686B75]">
            Different economics. Different audiences. The same discipline:
            connect media spend to business outcomes.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-[#E1DED7] bg-[#E1DED7] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, title }, index) => (
            <motion.div
              key={title}
              whileHover={{ y: -2 }}
              className="group relative min-h-[190px] overflow-hidden bg-[#FAF9F6] p-7 transition-colors hover:bg-white"
            >
              <span className="absolute right-5 top-2 font-[Space_Grotesk] text-[100px] font-bold leading-none text-[#12172B]/[0.025]">
                0{index + 1}
              </span>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:bg-[#12172B]">
                <Icon
                  size={20}
                  className="text-[#12172B] group-hover:text-white"
                />
              </div>

              <h3 className="relative mt-8 font-[Space_Grotesk] text-lg font-semibold text-[#12172B]">
                {title}
              </h3>

              <ArrowUpRight
                size={16}
                className="absolute bottom-7 right-7 text-[#A2A4AB] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2A4DFF]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   RESULTS
================================================================ */

const cases = [
  {
    brand: "Norden Outdoor",
    industry: "DTC ecommerce",
    headline: "3.1x ROAS in the first quarter, up from 1.4x",
    copy: "Rebuilt the paid social account structure and creative testing cadence for a seasonal outdoor gear brand.",
  },
  {
    brand: "Ledger & Co.",
    industry: "B2B SaaS",
    headline: "Cost per qualified lead down 47%",
    copy: "Rebuilt search account structure and landing pages around bottom-funnel intent, cutting wasted spend.",
  },
  {
    brand: "Harlow Clinic Group",
    industry: "Healthcare",
    headline: "Booked appointments up 2.6x in six months",
    copy: "Combined local search, retargeting, and a new booking flow to move more visits from click to appointment.",
  },
];

function Results() {
  return (
    <section
      id="results"
      className="relative overflow-hidden bg-[#11162A] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-10"
    >
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#2A4DFF]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel light>
              Selected outcomes
            </SectionLabel>

            <h2 className="mt-6 max-w-2xl font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl">
              Results,
              <span className="text-[#7187FF]">
                {" "}not activity reports.
              </span>
            </h2>
          </div>

          <span className="font-[IBM_Plex_Mono] text-[9px] uppercase tracking-[0.18em] text-[#68718D]">
            03 / Selected case studies
          </span>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.div
              key={item.brand}
              whileHover={{ y: -5 }}
              className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[25px] border border-white/[0.09] bg-white/[0.025] p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-[IBM_Plex_Mono] text-[9px] uppercase tracking-[0.16em] text-[#68718D]">
                  {item.industry}
                </span>

                <span className="font-[IBM_Plex_Mono] text-[9px] text-[#4E5878]">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-7 font-[Space_Grotesk] text-xl font-semibold">
                {item.brand}
              </h3>

              <p className="mt-4 font-[Space_Grotesk] text-lg font-medium leading-[1.35] text-[#8194FF]">
                {item.headline}
              </p>

              <p className="mt-4 flex-1 text-[13.5px] leading-[1.75] text-[#929BB7]">
                {item.copy}
              </p>

              <div className="mt-7 flex items-center gap-2 border-t border-white/[0.08] pt-5 text-[12px] font-medium">
                Read the case study
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TESTIMONIALS
================================================================ */

const testimonials = [
  {
    quote:
      "They found budget we were wasting on branded search inside the first two weeks and put it somewhere it actually moved the needle.",
    name: "Priya Shah",
    role: "VP Marketing, Norden Outdoor",
  },
  {
    quote:
      "The weekly reporting call is the only marketing meeting on my calendar I don't dread. Numbers first, then the plan.",
    name: "Marcus Webb",
    role: "Founder, Ledger & Co.",
  },
  {
    quote:
      "We'd worked with two other agencies before this one. This is the first time our CRM and ad platform numbers actually matched.",
    name: "Elena Ruiz",
    role: "Growth Lead, Harlow Clinic Group",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#F2F1EC] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <SectionLabel>
              Client perspective
            </SectionLabel>

            <h2 className="mt-6 max-w-lg font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#12172B] sm:text-5xl">
              What's it like on the other side of the
              <span className="text-[#2A4DFF]">
                {" "}dashboard.
              </span>
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-[22px] border border-[#DEDAD1] bg-[#FAF9F6] p-6"
              >
                <Quote
                  size={19}
                  className="text-[#2A4DFF]"
                  strokeWidth={1.75}
                />

                <p className="mt-5 text-[14px] leading-[1.75] text-[#12172B]">
                  {testimonial.quote}
                </p>

                <div className="mt-6 border-t border-[#E1DED7] pt-4 text-[12px]">
                  <span className="font-medium text-[#12172B]">
                    {testimonial.name}
                  </span>

                  <span className="mt-1 block text-[#686B75]">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FAQ
================================================================ */

const faqs = [
  {
    q: "What's the minimum monthly ad spend you'll work with?",
    a: "Most engagements start around $15,000 per month in media spend, excluding our fee. Below that, media platforms rarely have enough volume to optimize against.",
  },
  {
    q: "How long before we see results?",
    a: "Tracking and account structure go live in the first two to three weeks. Most clients see a measurable shift in cost per result by week six, once we've collected enough data to optimize.",
  },
  {
    q: "Do you require a long-term contract?",
    a: "The first three months are a fixed engagement so we have time to test properly. After that, it's month to month.",
  },
  {
    q: "Which platforms do you manage?",
    a: "Google, Meta, TikTok, LinkedIn, and programmatic display and video. We'll recommend a mix based on where your customers actually are, not run every channel by default.",
  },
  {
    q: "Who owns the ad accounts and data?",
    a: "You do. Every account, pixel, and dashboard is set up under your ownership from day one, so nothing leaves with us if you ever do.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <SectionLabel>
            FAQ
          </SectionLabel>

          <h2 className="mt-6 max-w-2xl font-[Space_Grotesk] text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[#12172B] sm:text-5xl">
            Questions worth asking
            <span className="text-[#2A4DFF]">
              {" "}before you sign anything.
            </span>
          </h2>
        </div>

        <div className="border-t border-[#E0DDD5]">
          {faqs.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={item.q}
                className="border-b border-[#E0DDD5]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="pt-1 font-[IBM_Plex_Mono] text-[9px] text-[#A1A3AA]">
                      0{index + 1}
                    </span>

                    <span className="font-[Space_Grotesk] text-[16px] font-medium text-[#12172B] sm:text-lg">
                      {item.q}
                    </span>
                  </div>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E0DDD5]">
                    {isOpen ? (
                      <Minus size={15} />
                    ) : (
                      <Plus size={15} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden pl-8 sm:pl-9">
                    <p className="max-w-2xl text-[14px] leading-[1.8] text-[#5B5F6B]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FINAL CTA
================================================================ */

function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[#080B18] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-10"
    >
      {/* Background mesh */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2A4DFF]/15 blur-[130px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionLabel light>
          Let's grow together
        </SectionLabel>

        <h2 className="mt-7 font-[Space_Grotesk] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
          Ready to know exactly
          <br />
          what your{" "}
          <span className="text-[#7187FF]">
            ad spend is doing?
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-[14px] leading-[1.8] text-[#AEB5CB] sm:text-[16px]">
          A growth audit takes about a week. You'll get a clear read on
          where your budget is working, where it isn't, and what we'd
          change first — no commitment required.
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Work email"
            className="min-w-0 flex-1 border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none placeholder:text-[#646D8B] transition-colors focus:border-[#7187FF]"
          />

          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 bg-[#2A4DFF] px-6 py-4 text-sm font-medium text-white transition-all hover:bg-[#4664FF] hover:shadow-[0_15px_50px_rgba(42,77,255,.3)]"
          >
            Get my audit
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-wider text-[#59627E]">
          <span className="flex items-center gap-2">
            <Check size={12} className="text-[#7187FF]" />
            No commitment
          </span>

          <span className="flex items-center gap-2">
            <Check size={12} className="text-[#7187FF]" />
            Data-backed
          </span>

          <span className="flex items-center gap-2">
            <Check size={12} className="text-[#7187FF]" />
            Actionable recommendations
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
================================================================ */

export default function Performance() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9F6] font-[Inter] antialiased">
      <style>{FONT_IMPORT}</style>

      <Hero />

      <AnimatedStats />

      <PerformanceSolutions />

      <Services />

      <HowWeWork />

      <ConversionFunnel />

      <WhyChooseUs />

      <Technology />

      <Industries />

      <Results />

      <Testimonials />

      <FAQAccordion />

      <FinalCTA />

      <Footer />
    </div>
  );
}