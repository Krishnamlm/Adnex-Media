import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  Target,
  Search,
  MousePointerClick,
  BarChart3,
  ShoppingBag,
  ChevronUp,
  Video,
  RefreshCcw,
  Users,
  Database,
  Zap,
  LineChart,
  Layers3,
  Megaphone,
  Building2,
  GraduationCap,
  HeartPulse,
  BriefcaseBusiness,
  Rocket,
  Eye,
  Settings2,
  Gauge,
  Sparkles,
  Globe,
  Crosshair,
  PieChart,
  Activity,
  TrendingUp,
  SlidersHorizontal,
  CircleDollarSign,
  ChartNoAxesCombined,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
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

const services = [
  {
    icon: Search,
    title: "Google Search Ads",
    description:
      "Capture high-intent searches and connect your business with customers actively looking for your products or services.",
    tags: ["Search", "Keywords", "PPC"],
  },
  {
    icon: Target,
    title: "Meta Ads",
    description:
      "Reach highly relevant audiences across Facebook and Instagram with creative-led campaigns built around measurable goals.",
    tags: ["Facebook", "Instagram", "Leads"],
  },
  {
    icon: Video,
    title: "YouTube Ads",
    description:
      "Build awareness, consideration and conversions through targeted video advertising across YouTube.",
    tags: ["Video", "Awareness", "Reach"],
  },
  {
    icon: Eye,
    title: "Display Advertising",
    description:
      "Expand your reach with strategic display campaigns designed to attract new audiences and support remarketing.",
    tags: ["Display", "Banner", "Reach"],
  },
  {
    icon: RefreshCcw,
    title: "Remarketing",
    description:
      "Reconnect with website visitors and potential customers who interacted with your brand but didn't convert.",
    tags: ["Retargeting", "Audiences", "ROAS"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Ads",
    description:
      "Promote products through shopping and catalog campaigns focused on traffic, conversions and revenue.",
    tags: ["Shopping", "Catalog", "Sales"],
  },
];

const campaignTypes = [
  {
    title: "Search Ads",
    goal: "Capture high-intent demand",
    icon: Search,
    accent: "bg-blue-500",
  },
  {
    title: "Performance Max",
    goal: "Reach customers across Google",
    icon: Gauge,
    accent: "bg-violet-500",
  },
  {
    title: "Meta Lead Ads",
    goal: "Generate qualified enquiries",
    icon: Users,
    accent: "bg-pink-500",
  },
  {
    title: "Conversion Ads",
    goal: "Drive valuable actions",
    icon: MousePointerClick,
    accent: "bg-orange-500",
  },
  {
    title: "Shopping Ads",
    goal: "Promote products",
    icon: ShoppingBag,
    accent: "bg-emerald-500",
  },
  {
    title: "Remarketing",
    goal: "Re-engage interested users",
    icon: RefreshCcw,
    accent: "bg-cyan-500",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Generate property enquiries and reach high-intent buyers and investors.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Drive product discovery, conversions and measurable online revenue.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Connect courses and institutions with relevant prospective students.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Reach audiences actively searching for relevant healthcare services.",
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B & Services",
    description:
      "Build qualified lead pipelines for service-based businesses.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description:
      "Test acquisition channels and identify scalable growth opportunities.",
  },
];

const process = [
  {
    number: "01",
    title: "Research",
    description:
      "We analyze your business, competitors, audience, keywords and market opportunity.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We create the campaign structure, targeting approach, budget and conversion strategy.",
  },
  {
    number: "03",
    title: "Setup",
    description:
      "Tracking, pixels, audiences, keywords, creatives and conversion events are configured.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Campaigns go live with multiple audience, creative and messaging variations.",
  },
  {
    number: "05",
    title: "Optimize",
    description:
      "We analyze performance and continuously refine campaigns to improve efficiency.",
  },
  {
    number: "06",
    title: "Scale",
    description:
      "Winning campaigns receive strategic budget increases while protecting efficiency.",
  },
];

const optimizationItems = [
  "Audience targeting",
  "Keyword strategy",
  "Ad creatives",
  "Ad copy",
  "Landing pages",
  "Conversion tracking",
  "Budget allocation",
  "Bidding strategy",
  "Retargeting",
  "A/B testing",
];

const faqs = [
  {
    question: "How much should I spend on paid advertising?",
    answer:
      "There is no universal advertising budget. We recommend a starting budget based on your industry, competition, target audience, customer value and campaign objective.",
  },
  {
    question: "Which platforms do you manage?",
    answer:
      "We can manage Google Ads, Meta Ads, Instagram, Facebook, YouTube, Display, Shopping and remarketing campaigns depending on your business requirements.",
  },
  {
    question: "How quickly can I see results?",
    answer:
      "Paid advertising can start generating traffic and enquiries quickly, but meaningful optimization requires sufficient campaign data to identify winning audiences, creatives and strategies.",
  },
  {
    question: "Do you create ad creatives?",
    answer:
      "Yes. AdNex can combine paid advertising with creative design and video production, allowing campaigns to be supported by multiple creative variations for testing.",
  },
  {
    question: "Do you provide campaign reports?",
    answer:
      "Yes. Reports can include spend, impressions, clicks, CTR, CPC, conversions, CPL, CPA and ROAS depending on the campaign objective.",
  },
  {
    question: "Can you manage my existing campaigns?",
    answer:
      "Yes. We can audit existing campaigns, identify optimization opportunities and take over ongoing campaign management.",
  },
];

const platforms = [
  { name: "Google Ads", icon: Globe },
  { name: "Meta", icon: Layers3 },
  { name: "Instagram", icon: Layers3 },
  { name: "Facebook", icon: Users },
  { name: "YouTube", icon: Video },
  { name: "Display", icon: Eye },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Remarketing", icon: RefreshCcw },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  dark = false,
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <div
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${
          dark
            ? "border-white/10 bg-white/[0.05] text-violet-300"
            : "border-slate-200 bg-white text-violet-600"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            dark ? "bg-violet-400" : "bg-violet-600"
          }`}
        />
        {eyebrow}
      </div>

      <h2
        className={`text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl ${
          dark ? "text-white" : "text-[#111426]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${
            center ? "mx-auto" : ""
          } ${dark ? "text-slate-400" : "text-slate-600"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

function Metric({ label, value, change }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <span className="shrink-0 text-[10px] font-bold text-emerald-600">
          {change}
        </span>
      </div>

      <div className="mt-2 text-2xl font-black tracking-tight text-[#111426]">
        {value}
      </div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-[#111426]">{value}</p>
    </div>
  );
}

function FeaturePanel({
  icon: Icon,
  eyebrow,
  title,
  description,
  items,
  dark = false,
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10 ${
        dark
          ? "border-white/10 bg-[#101329] text-white"
          : "border-slate-200 bg-white text-[#111426]"
      }`}
    >
      <div
        className={`absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl ${
          dark ? "bg-violet-600/15" : "bg-violet-500/10"
        }`}
      />

      <div className="relative">
        <div
          className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl ${
            dark
              ? "bg-violet-500/15 text-violet-300"
              : "bg-violet-50 text-violet-600"
          }`}
        >
          <Icon size={23} />
        </div>

        <p
          className={`text-xs font-bold uppercase tracking-[0.18em] ${
            dark ? "text-violet-300" : "text-violet-600"
          }`}
        >
          {eyebrow}
        </p>

        <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
          {title}
        </h3>

        <p
          className={`mt-4 text-sm leading-7 ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {description}
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold ${
                dark
                  ? "border-white/10 bg-white/[0.03] text-slate-300"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <Check
                size={14}
                className={dark ? "text-violet-300" : "text-violet-600"}
              />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PaidAds() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Helmet>
        <title>Google & Meta Ads Agency in Noida | AdNex Media</title>

        <meta
          name="description"
          content="AdNex Media is a paid advertising agency in Noida offering Google Ads, Meta Ads, YouTube Ads, PPC, remarketing, e-commerce advertising and performance marketing."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.adnexmedia.in/paid-ads"
        />
      </Helmet>

      <main className="min-w-0 overflow-hidden bg-[#F7F7FB] text-[#111426]">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#070817] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-15%] h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-5%] h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 md:px-8 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Hero Copy */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="min-w-0"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200"
              >
                <Sparkles size={14} />
                Performance Marketing
              </motion.div>

              <motion.h1
  variants={fadeUp}
  className="max-w-4xl text-[42px] font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[78px]"
>
  Google & Meta Ads
  <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-200 bg-clip-text text-transparent">
    Agency in Noida.
  </span>
</motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg"
              >
                Turn advertising budgets into measurable business outcomes
                with full-funnel campaigns built around targeting, creative,
                data and continuous optimization.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#111426] transition hover:bg-violet-100"
                >
                  Start Your Campaign
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
                >
                  Explore Services
                  <ArrowRight size={16} />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3"
              >
                {[
                  "Google Ads",
                  "Meta Ads",
                  "Conversion Tracking",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
                      <Check size={12} className="text-violet-300" />
                    </span>
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 35, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative min-w-0"
            >
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-violet-600/15 to-orange-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#F9F9FC] p-4 text-[#111426] shadow-[0_40px_100px_rgba(0,0,0,0.35)] sm:p-5 lg:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Campaign Overview
                    </p>
                    <h3 className="mt-1 text-lg font-black">Performance</h3>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Live
                  </div>
                </div>

                <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
                  <Metric
                    label="Ad Spend"
                    value="₹12.4L"
                    change="+18.4%"
                  />
                  <Metric
                    label="Conversions"
                    value="18.4K"
                    change="+24.8%"
                  />
                  <Metric
                    label="Avg. CTR"
                    value="3.8%"
                    change="+12.2%"
                  />
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold">Conversion Growth</p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        Last 12 months
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-600">
                      <TrendingUp size={13} />
                      +31.8%
                    </div>
                  </div>

                  <div className="mt-6 flex h-32 items-end gap-1.5 sm:gap-2">
                    {[25, 35, 30, 48, 42, 57, 50, 68, 61, 78, 72, 92].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 0.7,
                            delay: 0.4 + index * 0.04,
                          }}
                          className={`min-w-0 flex-1 rounded-t-md ${
                            index === 11
                              ? "bg-[#111426]"
                              : "bg-violet-200"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <div className="mt-2 flex justify-between text-[9px] font-medium text-slate-400">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white py-4">
                  <div className="px-3">
                    <MiniMetric label="Clicks" value="286K" />
                  </div>
                  <div className="px-3">
                    <MiniMetric label="CPC" value="₹43" />
                  </div>
                  <div className="px-3">
                    <MiniMetric label="Leads" value="8.2K" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-y divide-slate-200 px-4 sm:px-6 md:px-8 lg:grid-cols-4 lg:divide-y-0 lg:px-12">
          {[
            ["250+", "Projects Delivered"],
            ["120+", "Clients Served"],
            ["3.4×", "Average ROAS"],
            ["98%", "Client Retention"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <p className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================== */}
      <section
        id="services"
        className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <SectionHeading
            eyebrow="What We Do"
            title="Full-Funnel Paid Advertising."
            description="Every campaign is built to move the right audience from discovery to action — and from first conversion to repeat growth."
          />

          <div className="mt-10 grid min-w-0 gap-5 lg:grid-cols-12">
            {/* Featured */}
            <motion.div
              variants={fadeUp}
              className="group relative min-w-0 overflow-hidden rounded-[2rem] bg-[#111426] p-7 text-white sm:p-9 lg:col-span-7 lg:p-11"
            >
              <div className="absolute right-[-10%] top-[-15%] h-72 w-72 rounded-full bg-violet-600/20 blur-3xl transition duration-700 group-hover:bg-violet-500/30" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                      <Search size={22} />
                    </div>

                    <span className="text-sm font-black text-white/30">
                      01 / 06
                    </span>
                  </div>

                  <h3 className="mt-10 max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    Google Search Ads
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Capture high-intent searches and connect your business
                    with customers actively looking for your products or
                    services.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {services[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Smaller services */}
            <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:col-span-5">
              {services.slice(1).map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="group min-w-0 rounded-[1.7rem] border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#111426] transition group-hover:bg-violet-600 group-hover:text-white">
                        <Icon size={19} />
                      </div>

                      <span className="text-[10px] font-bold text-slate-300">
                        0{index + 2}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-black tracking-tight">
                      {service.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-xs leading-6 text-slate-500">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          PLATFORMS
      ========================================================== */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 md:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Advertising Ecosystem
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                One strategy. Multiple channels.
              </h3>
            </div>

            <div className="flex max-w-3xl flex-wrap gap-2.5">
              {platforms.map((platform) => {
                const Icon = platform.icon;

                return (
                  <div
                    key={platform.name}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F7F7FB] px-3.5 py-2.5 text-xs font-bold text-slate-700"
                  >
                    <Icon size={14} />
                    {platform.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAMPAIGN MATRIX
      ========================================================== */}
      <section className="bg-[#0B0D20] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid min-w-0 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
          >
            <SectionHeading
              eyebrow="Campaign Architecture"
              title="The Right Campaign For Every Objective."
              description="Different goals need different campaign structures. We align channels, audiences, creative and measurement with the outcome that matters."
              dark
            />

            <motion.div
              variants={stagger}
              className="grid min-w-0 gap-3 sm:grid-cols-2"
            >
              {campaignTypes.map((campaign, index) => {
                const Icon = campaign.icon;

                return (
                  <motion.div
                    key={campaign.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07]"
                  >
                    <div
                      className={`absolute left-0 top-0 h-1 w-full ${campaign.accent}`}
                    />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-violet-300">
                        <Icon size={19} />
                      </div>

                      <span className="text-[10px] font-bold text-white/20">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-black">
                      {campaign.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {campaign.goal}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-[11px] font-bold text-violet-300">
                      Explore setup
                      <ArrowUpRight
                        size={13}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FUNNEL
      ========================================================== */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <SectionHeading
              center
              eyebrow="Full Funnel"
              title="Don't Optimize One Step. Build The System."
              description="Your paid media should work as one connected acquisition engine — from the first impression to repeat business."
            />

            <div className="relative mt-14">
              <div className="absolute left-[11%] right-[11%] top-10 hidden h-px bg-gradient-to-r from-violet-200 via-violet-500 to-orange-200 lg:block" />

              <div className="grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    icon: Eye,
                    title: "Awareness",
                    text: "Reach relevant audiences.",
                  },
                  {
                    icon: Users,
                    title: "Consideration",
                    text: "Build interest and intent.",
                  },
                  {
                    icon: MousePointerClick,
                    title: "Conversion",
                    text: "Drive valuable actions.",
                  },
                  {
                    icon: RefreshCcw,
                    title: "Retargeting",
                    text: "Reconnect with prospects.",
                  },
                  {
                    icon: LineChart,
                    title: "Growth",
                    text: "Scale winning campaigns.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      variants={fadeUp}
                      key={item.title}
                      className="relative text-center"
                    >
                      <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-[#111426] text-white shadow-xl">
                        <Icon size={24} />
                      </div>

                      <p className="mt-6 text-xs font-black text-violet-600">
                        0{index + 1}
                      </p>

                      <h3 className="mt-1 text-lg font-black">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CREATIVE + TRACKING
      ========================================================== */}
      <section className="bg-[#F7F7FB] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] min-w-0 gap-5 lg:grid-cols-2">
          <FeaturePanel
            icon={Megaphone}
            eyebrow="Creative Performance"
            title="Ads People Actually Notice."
            description="Performance starts with the creative. We build multiple visual and messaging variations so campaigns can learn what gets attention and drives action."
            items={[
              "Static ad creatives",
              "Video ads",
              "Reels & short-form content",
              "Ad copy & headlines",
              "CTA variations",
              "Creative A/B testing",
            ]}
          />

          <FeaturePanel
            dark
            icon={Database}
            eyebrow="Tracking & Analytics"
            title="Every Important Action Gets Measured."
            description="Without accurate measurement, optimization becomes guesswork. We connect campaign activity with meaningful business outcomes."
            items={[
              "Google Analytics 4",
              "Google Tag Manager",
              "Meta Pixel",
              "Conversion API",
              "Conversion tracking",
              "UTM tracking",
            ]}
          />
        </div>
      </section>

      {/* =========================================================
          OPTIMIZATION
      ========================================================== */}
      <section className="bg-[#111426] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid min-w-0 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20"
          >
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <Settings2 size={22} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                Continuous Optimization
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                We Don't Just
                <span className="block text-slate-500">
                  Launch & Leave.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                Every campaign is treated as a living growth system. We
                monitor signals, test variables and shift budget toward what
                is working.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <Activity className="text-violet-300" size={20} />
                  <p className="mt-4 text-2xl font-black">24/7</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                    Performance Signals
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <SlidersHorizontal className="text-orange-300" size={20} />
                  <p className="mt-4 text-2xl font-black">10+</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                    Optimization Levers
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              variants={stagger}
              className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {optimizationItems.map((item, index) => (
                <motion.div
                  variants={fadeUp}
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-white/20">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <Zap
                      size={14}
                      className="text-violet-300 opacity-0 transition group-hover:opacity-100"
                    />
                  </div>

                  <p className="mt-7 text-xs font-bold leading-5 text-slate-300 sm:text-sm">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          INDUSTRIES
      ========================================================== */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <SectionHeading
              eyebrow="Industries"
              title="Built For Different Growth Models."
              description="Campaign strategy changes depending on your audience, buying cycle, economics and business objective."
            />

            <div className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => {
                const Icon = industry.icon;

                return (
                  <motion.div
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    key={industry.title}
                    className="group relative min-w-0 overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-6 sm:p-7"
                  >
                    <span className="pointer-events-none absolute -right-2 -top-5 text-[110px] font-black leading-none text-slate-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-[#111426] group-hover:text-white">
                          <Icon size={20} />
                        </div>

                        <ArrowUpRight
                          size={18}
                          className="text-slate-300 transition group-hover:text-violet-600"
                        />
                      </div>

                      <h3 className="mt-9 text-xl font-black tracking-tight">
                        {industry.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {industry.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================== */}
      <section className="bg-[#0B0D20] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionHeading
              center
              dark
              eyebrow="Our Process"
              title="From Strategy To Scale."
              description="A structured process designed to reduce wasted spend and create a clear path from launch to growth."
            />

            <div className="relative mt-14">
              <div className="absolute bottom-0 left-5 top-0 w-px bg-white/10 lg:bottom-auto lg:left-[8%] lg:right-[8%] lg:top-8 lg:h-px lg:w-auto" />

              <div className="grid min-w-0 gap-8 lg:grid-cols-6 lg:gap-4">
                {process.map((item) => (
                  <motion.div
                    variants={fadeUp}
                    key={item.number}
                    className="relative min-w-0 pl-14 lg:pl-0 lg:pt-16 lg:text-center"
                  >
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0B0D20] text-[10px] font-black text-violet-300 lg:left-1/2 lg:-translate-x-1/2">
                      {item.number}
                    </div>

                    <h3 className="text-lg font-black">{item.title}</h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 lg:px-2">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          WHY ADNEX
      ========================================================== */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid min-w-0 gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Why AdNex
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
                Performance Marketing
                <span className="block text-slate-400">
                  Built Around Outcomes.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                We bring strategy, media buying, creative, tracking and
                optimization together so your advertising works as one
                connected system.
              </p>

              <a
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#111426] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600"
              >
                Talk To Our Team
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            <motion.div
              variants={stagger}
              className="grid min-w-0 gap-3 sm:grid-cols-2"
            >
              {[
                {
                  icon: Database,
                  title: "Data First",
                  text: "Decisions are guided by campaign data, not assumptions.",
                },
                {
                  icon: Megaphone,
                  title: "Creative + Performance",
                  text: "Creative testing and media buying work together.",
                },
                {
                  icon: Layers3,
                  title: "Full Funnel",
                  text: "We connect awareness, consideration, conversion and retention.",
                },
                {
                  icon: BarChart3,
                  title: "Transparent Reporting",
                  text: "Clear metrics that show where your budget is going.",
                },
                {
                  icon: Crosshair,
                  title: "Continuous Testing",
                  text: "Audiences, messaging and creatives are continuously tested.",
                },
                {
                  icon: ChartNoAxesCombined,
                  title: "Built to Scale",
                  text: "Winning campaigns can be systematically expanded.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    variants={fadeUp}
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-[#F7F7FB] p-5 sm:p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-6 text-base font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="bg-[#F7F7FB] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <SectionHeading
              center
              eyebrow="FAQ"
              title="Questions, Answered."
              description="A few common questions about paid advertising and campaign management."
            />

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    variants={fadeUp}
                    key={faq.question}
                    className={`overflow-hidden rounded-2xl border bg-white transition ${
                      isOpen
                        ? "border-violet-200 shadow-[0_15px_40px_rgba(124,58,237,0.06)]"
                        : "border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="text-sm font-bold sm:text-base">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                          isOpen
                            ? "bg-[#111426] text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-500 sm:px-6">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#070817] px-4 py-20 text-white sm:px-6 sm:py-24 md:px-8 lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[-40%] h-[550px] w-[550px] rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute bottom-[-50%] right-[5%] h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200"
            >
              <Sparkles size={14} />
              Let's grow together
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-7 text-4xl font-black leading-[1] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
            >
              Ready to Turn Ad Spend
              <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-200 bg-clip-text text-transparent">
                Into Growth?
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Let's build a paid advertising system designed around your
              business goals, audience and growth targets.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="/contact"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#111426] transition hover:bg-violet-100"
              >
                Start Your Campaign
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
       </main>
    </>
  );
}

export default PaidAds;