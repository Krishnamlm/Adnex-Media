import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Cloud,
  Code2,
  CreditCard,
  Gauge,
  Globe2,
  Layers3,
  MapPin,
  MessageCircle,
  RefreshCw,
  Rocket,
  Server,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import Footer from "../components/Footer/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

const services = [
  {
    title: "Custom Mobile Apps",
    description:
      "Purpose-built mobile products designed around your users, business model and long-term product roadmap.",
    meta: "iOS · Android · Cross Platform",
    icon: Smartphone,
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "MVP Development",
    description:
      "Turn an idea into a focused, launch-ready product without overbuilding the first version.",
    meta: "Strategy · MVP · Rapid Launch",
    icon: Rocket,
    className: "md:col-span-1",
  },
  {
    title: "E-Commerce Apps",
    description:
      "Catalogs, payments, orders, accounts and retention experiences engineered into one seamless flow.",
    meta: "Commerce · Payments · Orders",
    icon: ShoppingBag,
    className: "md:col-span-1",
  },
  {
    title: "On-Demand Apps",
    description:
      "Booking, location, live status and notifications for service-driven mobile businesses.",
    meta: "Booking · Tracking · Notifications",
    icon: MapPin,
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Business Applications",
    description:
      "Internal tools and customer-facing systems that connect workflows, teams and business data.",
    meta: "Automation · Dashboards · Workflows",
    icon: BarChart3,
    className: "md:col-span-1",
  },
  {
    title: "App Modernization",
    description:
      "Refresh outdated products with modern interfaces, stronger architecture and better performance.",
    meta: "Migration · Optimization · Modern UI",
    icon: RefreshCw,
    className: "md:col-span-1",
  },
];

const capabilities = [
  {
    title: "Authentication",
    description: "Secure onboarding, login and account experiences.",
    icon: ShieldCheck,
    tag: "Identity",
  },
  {
    title: "Payments",
    description: "Payment flows designed around conversion and trust.",
    icon: CreditCard,
    tag: "Commerce",
  },
  {
    title: "Push Notifications",
    description: "Contextual communication that keeps users engaged.",
    icon: Bell,
    tag: "Engagement",
  },
  {
    title: "Maps & Location",
    description: "Location-aware experiences, tracking and discovery.",
    icon: MapPin,
    tag: "Location",
  },
  {
    title: "Communication",
    description: "Messaging, alerts and real-time interaction layers.",
    icon: MessageCircle,
    tag: "Realtime",
  },
  {
    title: "Analytics",
    description: "Product visibility through meaningful events and dashboards.",
    icon: TrendingUp,
    tag: "Insights",
  },
  {
    title: "Cloud Integration",
    description: "Connect your mobile experience to scalable infrastructure.",
    icon: Cloud,
    tag: "Infrastructure",
  },
  {
    title: "Performance",
    description: "Fast interactions, efficient APIs and responsive interfaces.",
    icon: Gauge,
    tag: "Optimization",
  },
];

const anatomyLayers = [
  {
    id: "experience",
    number: "01",
    title: "Experience Layer",
    short: "UX / UI",
    description:
      "The visible layer of your product. We design intuitive navigation, meaningful interactions and interfaces that feel native to the platform.",
    points: [
      "User journeys",
      "Design systems",
      "Responsive interfaces",
      "Micro interactions",
    ],
    icon: Smartphone,
  },
  {
    id: "features",
    number: "02",
    title: "Feature Layer",
    short: "CORE",
    description:
      "The product functionality users actually come to your app for — structured around clear flows and measurable product goals.",
    points: [
      "Business logic",
      "User workflows",
      "Notifications",
      "Payments & accounts",
    ],
    icon: Layers3,
  },
  {
    id: "data",
    number: "03",
    title: "Data Layer",
    short: "DATA",
    description:
      "A reliable data foundation that keeps your app, APIs, databases and user information working together.",
    points: [
      "Database architecture",
      "API integration",
      "Data validation",
      "Caching & optimization",
    ],
    icon: Server,
  },
  {
    id: "integrations",
    number: "04",
    title: "Integration Layer",
    short: "API",
    description:
      "Your app rarely lives alone. We connect payment gateways, maps, CRMs, analytics and third-party platforms.",
    points: [
      "REST APIs",
      "GraphQL",
      "Third-party services",
      "Cloud platforms",
    ],
    icon: Boxes,
  },
  {
    id: "growth",
    number: "05",
    title: "Growth Layer",
    short: "SCALE",
    description:
      "Once the product is live, the architecture should be ready for analytics, experimentation, optimization and scale.",
    points: [
      "Product analytics",
      "Performance monitoring",
      "Release workflows",
      "Continuous improvement",
    ],
    icon: TrendingUp,
  },
];

const technologies = [
  { name: "React Native", type: "Mobile", icon: Code2 },
  { name: "Flutter", type: "Mobile", icon: Smartphone },
  { name: "Swift", type: "iOS", icon: Code2 },
  { name: "Kotlin", type: "Android", icon: Code2 },
  { name: "Node.js", type: "Backend", icon: Server },
  { name: "React", type: "Frontend", icon: Layers3 },
  { name: "Firebase", type: "Cloud", icon: Cloud },
  { name: "AWS", type: "Infrastructure", icon: Cloud },
  { name: "PostgreSQL", type: "Database", icon: Server },
  { name: "MongoDB", type: "Database", icon: Server },
  { name: "REST APIs", type: "Integration", icon: Globe2 },
  { name: "GraphQL", type: "Integration", icon: Boxes },
  { name: "Redux", type: "State", icon: Settings2 },
  { name: "Razorpay", type: "Payments", icon: CreditCard },
  { name: "Stripe", type: "Payments", icon: CreditCard },
  { name: "FCM", type: "Notifications", icon: Bell },
];

const industries = [
  {
    title: "E-Commerce",
    description: "Mobile storefronts and retention-focused commerce experiences.",
    icon: ShoppingBag,
  },
  {
    title: "FinTech",
    description: "Structured financial workflows with trust and security at the core.",
    icon: CreditCard,
  },
  {
    title: "Social",
    description: "Profiles, content, communication and community experiences.",
    icon: Users,
  },
  {
    title: "Travel",
    description: "Discovery, booking, location and itinerary experiences.",
    icon: MapPin,
  },
  {
    title: "Real Estate",
    description: "Property discovery, lead capture and customer journeys.",
    icon: Globe2,
  },
  {
    title: "Healthcare",
    description: "Accessible digital experiences for patients and teams.",
    icon: ShieldCheck,
  },
  {
    title: "Startups",
    description: "Focused MVPs designed to validate products quickly.",
    icon: Rocket,
  },
  {
    title: "Enterprise",
    description: "Connected mobile systems built around complex workflows.",
    icon: Boxes,
  },
];

const process = [
  {
    number: "01",
    title: "Discover & Define",
    description:
      "Understand the product, users, business model, constraints and success criteria.",
    icon: Target,
  },
  {
    number: "02",
    title: "UX & Product Design",
    description:
      "Transform product requirements into journeys, wireframes and polished interface systems.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Architecture & Planning",
    description:
      "Choose the right stack, architecture, integrations and technical foundation.",
    icon: Boxes,
  },
  {
    number: "04",
    title: "Development",
    description:
      "Build the mobile experience, APIs, integrations and backend systems.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Testing & Quality",
    description:
      "Validate functionality, responsiveness, performance and critical user journeys.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Launch & Scale",
    description:
      "Prepare releases, monitor the product and create a roadmap for continuous improvement.",
    icon: Rocket,
  },
];

const faqs = [
  {
    question: "How long does it take to build a mobile app?",
    answer:
      "The timeline depends on product scope, number of platforms, integrations and technical complexity. A focused MVP can move much faster than a feature-heavy production application.",
  },
  {
    question: "Can you build for both iOS and Android?",
    answer:
      "Yes. We can recommend native or cross-platform development depending on your product requirements, performance expectations and long-term roadmap.",
  },
  {
    question: "Can you build an MVP from just an idea?",
    answer:
      "Yes. We can help structure the idea into product requirements, user flows, a focused feature set, interface design and a development roadmap.",
  },
  {
    question: "Can you integrate existing APIs or third-party services?",
    answer:
      "Yes. Mobile products can be connected with REST APIs, GraphQL, payment gateways, maps, analytics, CRMs, authentication providers and other third-party platforms.",
  },
  {
    question: "Can you improve an existing mobile application?",
    answer:
      "Yes. We can work with an existing product to modernize its UI, improve architecture, migrate technology, optimize performance or add new functionality.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. Post-launch work can include maintenance, performance improvements, new features, analytics, releases and ongoing product iterations.",
  },
];

function SectionLabel({ children, dark = false }) {
  return (
    <div
      className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        dark
          ? "border-white/10 bg-white/[0.04] text-blue-200"
          : "border-blue-100 bg-blue-50 text-blue-600"
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

function BentoServiceCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] ${item.className}`}
    >
      <div className="absolute right-[-45px] top-[-45px] h-32 w-32 rounded-full bg-blue-100/70 blur-2xl transition duration-500 group-hover:bg-blue-200" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-10 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-blue-600">
            <Icon size={22} strokeWidth={1.8} />
          </div>

          <span className="text-xs font-medium text-slate-400">
            0{index + 1}
          </span>
        </div>

        <div className="mt-auto">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            {item.meta}
          </p>

          <h3 className="text-xl font-bold tracking-tight text-[#090E1B]">
            {item.title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function AppPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px]" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-[245px] rounded-[38px] border-[7px] border-slate-800 bg-[#0A0F1D] p-2 shadow-[0_35px_100px_rgba(0,0,0,0.45)] sm:w-[275px]"
      >
        <div className="overflow-hidden rounded-[29px] bg-[#F7F9FC]">
          <div className="flex items-center justify-between px-5 pb-3 pt-5">
            <span className="text-[9px] font-bold text-slate-900">9:41</span>

            <div className="h-4 w-20 rounded-full bg-slate-900" />

            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-900" />
              <span className="h-2 w-3 rounded-full bg-slate-900" />
            </div>
          </div>

          <div className="px-4 pb-5">
            <div className="rounded-[20px] bg-[#070B16] p-4 text-white">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-slate-400">GOOD MORNING</p>
                  <p className="mt-1 text-sm font-semibold">Your dashboard</p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                  <Bell size={13} />
                </div>
              </div>

              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="text-[8px] text-slate-400">ACTIVE USERS</p>
                  <p className="mt-1 text-2xl font-bold">24.8K</p>
                </div>

                <div className="rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] font-semibold text-emerald-300">
                  +18.4%
                </div>
              </div>

              <div className="flex h-20 items-end gap-1">
                {[25, 38, 32, 54, 43, 70, 58, 82, 67, 91].map(
                  (height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        delay: 0.15 + index * 0.05,
                        duration: 0.5,
                      }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-300"
                    />
                  )
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <ShoppingBag size={13} />
                </div>
                <p className="text-[8px] text-slate-400">ORDERS</p>
                <p className="mt-1 text-sm font-bold text-slate-900">1,284</p>
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Users size={13} />
                </div>
                <p className="text-[8px] text-slate-400">USERS</p>
                <p className="mt-1 text-sm font-bold text-slate-900">8.9K</p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-slate-400">RECENT ACTIVITY</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-900">
                    Product engagement
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-2 top-[18%] z-20 hidden rounded-2xl border border-white/10 bg-[#0A0F1D]/95 p-3 text-white shadow-2xl backdrop-blur sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <CircleCheck size={17} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400">BUILD STATUS</p>
            <p className="mt-0.5 text-xs font-semibold">Production Ready</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 bottom-[18%] z-20 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Zap size={17} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400">STACK</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-900">
              API Connected
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TechnologyOrbit() {
  const [activeTech, setActiveTech] = useState(0);

  const orbitItems = useMemo(
    () => technologies.slice(0, 12),
    []
  );

  return (
    <div className="relative mx-auto flex min-h-[620px] w-full max-w-[720px] items-center justify-center overflow-hidden">
      <div className="absolute h-[430px] w-[430px] rounded-full border border-white/10" />
      <div className="absolute h-[310px] w-[310px] rounded-full border border-white/10" />
      <div className="absolute h-[190px] w-[190px] rounded-full border border-white/10" />

      <div className="absolute h-[460px] w-[460px] rounded-full bg-blue-600/10 blur-[80px]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[430px] w-[430px]"
      >
        {orbitItems.map((tech, index) => {
          const angle = (index / orbitItems.length) * Math.PI * 2;
          const x = Math.cos(angle) * 215;
          const y = Math.sin(angle) * 215;

          return (
            <button
              key={tech.name}
              onClick={() => setActiveTech(index)}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              aria-label={`Select ${tech.name}`}
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                className={`flex h-12 min-w-12 items-center justify-center rounded-2xl border px-3 backdrop-blur-md transition ${
                  activeTech === index
                    ? "border-blue-400 bg-blue-500/20 text-blue-200 shadow-[0_0_30px_rgba(37,99,235,0.35)]"
                    : "border-white/10 bg-white/[0.05] text-slate-300 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                <tech.icon size={17} />
              </motion.div>
            </button>
          );
        })}
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[310px] w-[310px]"
      >
        {orbitItems.slice(0, 8).map((tech, index) => {
          const angle = (index / 8) * Math.PI * 2 + 0.35;
          const x = Math.cos(angle) * 155;
          const y = Math.sin(angle) * 155;

          return (
            <div
              key={`inner-${tech.name}`}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#10182A] text-slate-400">
                <tech.icon size={12} />
              </div>
            </div>
          );
        })}
      </motion.div>

      <div className="relative z-20 flex h-[170px] w-[170px] flex-col items-center justify-center rounded-[42px] border border-white/10 bg-[#0E1628]/95 text-center shadow-[0_0_80px_rgba(37,99,235,0.18)] backdrop-blur-xl">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <Smartphone size={21} />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
          Mobile Product
        </p>

        <p className="mt-1 text-sm font-bold text-white">Connected Core</p>

        <p className="mt-1 max-w-[120px] text-[9px] leading-4 text-slate-400">
          Select a technology around the system.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTech}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-center backdrop-blur-md"
        >
          <p className="text-xs font-bold text-white">
            {technologies[activeTech].name}
          </p>
          <p className="mt-0.5 text-[10px] text-slate-400">
            {technologies[activeTech].type}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ item, open, onClick }) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-semibold text-[#090E1B] sm:text-lg">
          {item.question}
        </span>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-blue-600">
          {open ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-slate-500 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileApps() {
  const [activeAnatomy, setActiveAnatomy] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  const currentAnatomy = anatomyLayers[activeAnatomy];
  const CurrentIcon = currentAnatomy.icon;

  return (
    <>
      <Helmet>
        <title>
          Mobile App Development Company in Noida | AdNex Media
        </title>

        <meta
          name="description"
          content="AdNex Media is a mobile app development company in Noida offering custom Android and iOS app development, UI/UX design, cross-platform apps and mobile solutions for businesses."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.adnexmedia.in/mobile-apps"
        />
      </Helmet>

      <main>
      {/* =========================================================
          HERO — APP PRODUCT COMMAND CENTER
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#070B16] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 md:px-10 lg:px-16 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="relative z-10"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel dark>
                  Mobile Product Studio · AdNex Media
                </SectionLabel>
              </motion.div>

              <motion.h1
  variants={fadeUp}
  className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[68px]"
>
  Mobile App Development
  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
    {" "}Company in Noida.
  </span>
</motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg"
              >
                We design the interface, engineer the core, connect the data
                and build the infrastructure behind mobile products people
                return to.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#090E1B] transition hover:bg-blue-50"
                >
                  Build My App
                  <ArrowUpRight
                    size={17}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="#anatomy"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  Explore App Anatomy
                  <ArrowRight size={17} />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {[
                  "iOS + Android",
                  "MVP → Scale",
                  "API Ready",
                  "Cloud Connected",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 text-center text-[10px] font-medium text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <AppPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BENTO INTRO
      ========================================================== */}
      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mb-12 max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>One product. Every layer.</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold tracking-[-0.035em] text-[#090E1B] sm:text-4xl md:text-5xl"
            >
              We build the system{" "}
              <span className="text-blue-600">behind the experience.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-base leading-7 text-slate-500"
            >
              From the first product decision to the architecture underneath
              it, every part of the mobile experience is considered as one
              connected system.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((item, index) => (
              <BentoServiceCard key={item.title} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          APP ANATOMY
      ========================================================== */}
      <section
        id="anatomy"
        className="relative overflow-hidden bg-[#F7F9FC] py-14 sm:py-20 md:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute right-[-15%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-100 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Interactive App Anatomy</SectionLabel>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-[-0.04em] text-[#090E1B] sm:text-4xl md:text-5xl"
              >
                See what makes a{" "}
                <span className="text-blue-600">mobile product work.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-7 text-slate-500"
              >
                A beautiful interface is only one part of the product. Explore
                the layers we bring together to turn an app concept into a
                scalable digital product.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 space-y-2">
                {anatomyLayers.map((layer, index) => {
                  const Icon = layer.icon;
                  const active = activeAnatomy === index;

                  return (
                    <button
                      key={layer.id}
                      onClick={() => setActiveAnatomy(index)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-blue-200 bg-white shadow-[0_12px_40px_rgba(37,99,235,0.08)]"
                          : "border-transparent hover:border-slate-200 hover:bg-white/70"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                          active
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-400"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p
                            className={`text-sm font-bold ${
                              active
                                ? "text-[#090E1B]"
                                : "text-slate-600"
                            }`}
                          >
                            {layer.title}
                          </p>
                          <span className="text-[10px] font-bold tracking-wider text-slate-400">
                            {layer.number}
                          </span>
                        </div>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {layer.short}
                        </p>
                      </div>

                      <ChevronRight
                        size={16}
                        className={`transition ${
                          active
                            ? "translate-x-0.5 text-blue-600"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[40px] bg-blue-200/30 blur-3xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.09)] sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                      Product architecture
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#090E1B]">
                      Interactive system view
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                  </div>
                </div>

                <div className="relative min-h-[500px] overflow-hidden rounded-[28px] bg-[#070B16] p-5 sm:p-8">
                  <div className="absolute inset-0 opacity-[0.07]">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                        backgroundSize: "45px 45px",
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex h-full min-h-[450px] flex-col items-center justify-center">
                    <div className="relative flex w-full max-w-[440px] flex-col items-center">
                      <motion.div
                        layout
                        className="relative z-20 w-[190px] rounded-[28px] border-[6px] border-slate-700 bg-[#0A0F1D] p-1.5 shadow-2xl sm:w-[220px]"
                      >
                        <div className="overflow-hidden rounded-[20px] bg-[#F7F9FC]">
                          <div className="px-4 pb-4 pt-4">
                            <div className="mb-4 flex items-center justify-between">
                              <div>
                                <div className="h-2 w-12 rounded bg-slate-300" />
                                <div className="mt-1.5 h-2 w-20 rounded bg-slate-200" />
                              </div>
                              <div className="h-7 w-7 rounded-lg bg-blue-100" />
                            </div>

                            <div className="rounded-2xl bg-[#070B16] p-3">
                              <div className="h-2 w-14 rounded bg-blue-300/50" />
                              <div className="mt-2 h-6 w-20 rounded bg-white/90" />

                              <div className="mt-4 flex h-12 items-end gap-1">
                                {[40, 62, 48, 76, 55, 85, 70].map(
                                  (height, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        height: `${height}%`,
                                      }}
                                      className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-300"
                                    />
                                  )
                                )}
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <div className="h-16 rounded-xl bg-white shadow-sm" />
                              <div className="h-16 rounded-xl bg-white shadow-sm" />
                            </div>

                            <div className="mt-2 h-12 rounded-xl bg-white shadow-sm" />
                          </div>
                        </div>
                      </motion.div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentAnatomy.id}
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12, scale: 0.98 }}
                          className="relative z-30 mt-[-10px] w-full max-w-[360px] rounded-[24px] border border-white/10 bg-[#10182A]/95 p-5 shadow-2xl backdrop-blur-xl"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                              <CurrentIcon size={19} />
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
                                Layer {currentAnatomy.number}
                              </p>

                              <h3 className="mt-1 text-base font-bold text-white">
                                {currentAnatomy.title}
                              </h3>

                              <p className="mt-2 text-xs leading-5 text-slate-400">
                                {currentAnatomy.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {currentAnatomy.points.map((point) => (
                              <div
                                key={point}
                                className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-[10px] text-slate-300"
                              >
                                <Check
                                  size={12}
                                  className="shrink-0 text-cyan-300"
                                />
                                {point}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 justify-between lg:flex">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400/50" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-[#F7F9FC] p-3">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Interface
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-900">
                      Designed
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F7F9FC] p-3">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Core
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-900">
                      Engineered
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F7F9FC] p-3">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Scale
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-900">
                      Connected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAPABILITIES BENTO
      ========================================================== */}
      <section id="services" className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Product Capabilities</SectionLabel>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-[-0.04em] text-[#090E1B] sm:text-4xl"
              >
                Everything your app needs to{" "}
                <span className="text-blue-600">feel complete.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-md text-sm leading-7 text-slate-500 sm:text-base"
              >
                We combine product design, engineering and integrations so the
                important details do not become disconnected pieces.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 rounded-[28px] bg-[#070B16] p-6 text-white"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                  <Zap size={21} />
                </div>

                <p className="text-lg font-bold">Built as one system.</p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Interface, product logic, data, infrastructure and analytics
                  designed to work together.
                </p>

                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300"
                >
                  Discuss your product
                  <ArrowRight size={15} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
              className="grid gap-3 sm:grid-cols-2"
            >
              {capabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className={`group rounded-[26px] border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-[0_18px_50px_rgba(37,99,235,0.07)] ${
                      index === 0 || index === 5
                        ? "bg-[#EEF4FF]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Icon size={19} />
                      </div>

                      <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-8 text-base font-bold text-[#090E1B]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                    <div className="mt-5 h-px w-full bg-slate-200/70" />

                    <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-blue-600">
                      <CircleCheck size={13} />
                      Product-ready capability
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TECHNOLOGY ORBIT
      ========================================================== */}
      <section
        id="technology"
        className="relative overflow-hidden bg-[#070B16] py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel dark>Technology Orbit</SectionLabel>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl md:text-5xl"
              >
                The right technology{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  around your product.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg text-base leading-7 text-slate-400"
              >
                We select technologies around your product requirements,
                performance needs, team capabilities and long-term roadmap.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-2"
              >
                {[
                  "Mobile Architecture",
                  "Backend Systems",
                  "Cloud Infrastructure",
                  "API Ecosystems",
                  "Payments",
                  "Analytics",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-xs text-slate-300"
                  >
                    <span className="mr-2 text-blue-300">+</span>
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <TechnologyOrbit />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-medium text-slate-400"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          INDUSTRIES BENTO
      ========================================================== */}
      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Built for different products</SectionLabel>

              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#090E1B] sm:text-4xl md:text-5xl">
                Different industries.{" "}
                <span className="text-blue-600">Different flows.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              The architecture changes with the product. We design the mobile
              experience around how your users actually interact with your
              business.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {industries.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-[25px] border border-slate-200 p-6 ${
                    index === 0 || index === 7
                      ? "bg-[#070B16] text-white"
                      : "bg-[#F7F9FC]"
                  }`}
                >
                  <div
                    className={`absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full blur-2xl ${
                      index === 0 || index === 7
                        ? "bg-blue-600/20"
                        : "bg-blue-100"
                    }`}
                  />

                  <div className="relative">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        index === 0 || index === 7
                          ? "bg-white/10 text-blue-300"
                          : "bg-white text-blue-600 shadow-sm"
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <h3 className="mt-10 text-lg font-bold">{item.title}</h3>

                    <p
                      className={`mt-2 text-sm leading-6 ${
                        index === 0 || index === 7
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-500">
                      Explore use case
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================== */}
      <section
        id="process"
        className="relative overflow-hidden bg-[#F7F9FC] py-14 sm:py-20 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Build Process</SectionLabel>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#090E1B] sm:text-4xl md:text-5xl">
              From product idea to{" "}
              <span className="text-blue-600">launch-ready app.</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              A structured process keeps design, technology and business
              decisions connected throughout the build.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-[8%] right-[8%] top-9 hidden h-px bg-slate-200 lg:block" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
            >
              {process.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
                    variants={fadeUp}
                    className="relative z-10 rounded-[25px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-blue-600">
                        <Icon size={20} />
                      </div>

                      <span className="text-[10px] font-bold tracking-widest text-slate-300">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-sm font-bold text-[#090E1B]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY ADNEX
      ========================================================== */}
      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid overflow-hidden rounded-[36px] bg-[#070B16] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative overflow-hidden p-7 text-white sm:p-10 lg:p-12">
              <div className="absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="relative">
                <SectionLabel dark>Why AdNex</SectionLabel>

                <h2 className="mt-2 max-w-md text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Not just an app development team.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                  We bring product thinking, design systems and engineering
                  together so every decision has a reason behind it.
                </p>

                <a
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#090E1B]"
                >
                  Start a conversation
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2">
              {[
                {
                  title: "Product Thinking",
                  text: "We start with the problem, users and product goals before deciding what to build.",
                  icon: Target,
                },
                {
                  title: "Design + Engineering",
                  text: "Interface decisions and technical decisions are treated as connected parts of one product.",
                  icon: Layers3,
                },
                {
                  title: "Scalable Foundation",
                  text: "Architecture is planned around the product you have today and the product you may need tomorrow.",
                  icon: Server,
                },
                {
                  title: "Clear Communication",
                  text: "Structured phases and visible deliverables keep the product journey easy to understand.",
                  icon: MessageCircle,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="border-t border-white/10 p-7 sm:p-8 lg:first:border-l-0 lg:odd:border-l lg:even:border-l lg:[&:nth-child(-n+2)]:border-t-0"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-blue-300">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-7 text-base font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MODERNIZATION
      ========================================================== */}
      <section className="bg-[#EEF4FF] py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>App Modernization</SectionLabel>

              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#090E1B] sm:text-4xl md:text-5xl">
                Your existing app can become a{" "}
                <span className="text-blue-600">better product.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
                Modernization is more than changing the interface. We can
                improve the product architecture, migrate technology, simplify
                flows and create a more maintainable foundation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Modern UI systems",
                  "Technology migration",
                  "Performance optimization",
                  "Architecture improvements",
                  "New feature development",
                  "API modernization",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-sm font-medium text-slate-700"
                  >
                    <Check size={16} className="text-blue-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-10 rounded-full bg-blue-300/40 blur-3xl" />

              <div className="relative rounded-[35px] border border-blue-100 bg-white p-5 shadow-[0_30px_80px_rgba(37,99,235,0.12)] sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                      Modernization Map
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      From legacy → connected product
                    </p>
                  </div>

                  <RefreshCw size={19} className="text-blue-600" />
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Existing
                    </p>

                    <div className="mt-5 space-y-2">
                      {[
                        "Legacy UI",
                        "Slow flows",
                        "Disconnected data",
                        "Limited analytics",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <ArrowRight size={18} />
                  </div>

                  <div className="rounded-[26px] bg-[#070B16] p-5 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      Modern
                    </p>

                    <div className="mt-5 space-y-2">
                      {[
                        "Modern UI",
                        "Optimized flows",
                        "Connected APIs",
                        "Product insights",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
                        >
                          <Check
                            size={12}
                            className="mr-2 inline text-cyan-300"
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>FAQ</SectionLabel>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#090E1B] sm:text-4xl">
              Questions before{" "}
              <span className="text-blue-600">building?</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              A few common questions about mobile product development.
            </p>
          </div>

          <div className="mt-12">
            {faqs.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                open={activeFaq === index}
                onClick={() =>
                  setActiveFaq(activeFaq === index ? -1 : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section id="contact" className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#070B16] px-6 py-16 text-center text-white sm:px-10 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
              <Smartphone size={25} />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
              Ready to build?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl md:text-5xl">
              Turn your app idea into a{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                real product.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Tell us what you are building, what you already have and where
              you want to take it. We&apos;ll help map the product from
              interface to infrastructure.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#090E1B] transition hover:bg-blue-50"
              >
                Start Your Project
                <ArrowUpRight
                  size={17}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#technology"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Explore Technology
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Footer />
    </main>
    </>
  );
}