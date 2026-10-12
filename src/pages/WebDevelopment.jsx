import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Gauge,
  Globe,
  GraduationCap,
  HeartPulse,
  Layers3,
  LayoutTemplate,
  MonitorSmartphone,
  PenTool,
  PlugZap,
  RefreshCcw,
  Rocket,
  Search,
  Server,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Workflow,
  Zap,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "Professional, responsive websites designed to establish your brand and turn visitors into customers.",
    tags: ["Corporate", "Responsive", "SEO Ready"],
    size: "large",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    description:
      "High-converting landing pages built for campaigns, lead generation, product launches and paid advertising.",
    tags: ["Conversion", "Campaigns", "Leads"],
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description:
      "Scalable online stores with product catalogs, checkout experiences, payment integrations and order flows.",
    tags: ["Stores", "Payments", "Products"],
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Code2,
    title: "React Development",
    description:
      "Modern interactive websites and web applications built with reusable, scalable React components.",
    tags: ["React", "Modern UI", "Scalable"],
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    icon: Layers3,
    title: "Custom Web Applications",
    description:
      "Custom dashboards, portals and business applications tailored to your unique workflows.",
    tags: ["Web Apps", "Dashboards", "Custom"],
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: RefreshCcw,
    title: "Website Redesign",
    description:
      "Transform outdated websites into modern, responsive and performance-focused digital experiences.",
    tags: ["Redesign", "UX", "Performance"],
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: PlugZap,
    title: "API & Integrations",
    description:
      "Connect your website with CRMs, payment gateways, APIs, analytics platforms and third-party services.",
    tags: ["API", "CRM", "Automation"],
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  },
  {
    icon: Settings2,
    title: "Maintenance & Support",
    description:
      "Keep your website secure, updated and optimized with ongoing technical support.",
    tags: ["Support", "Updates", "Security"],
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
  },
];

const technologies = [
  {
    category: "Frontend",
    icon: Code2,
    color: "violet",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "blue",
    items: [
      "Node.js",
      "Express",
      "PHP",
      "Python",
      "Java",
      "Spring Boot",
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "cyan",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    category: "Tools & Platforms",
    icon: Settings2,
    color: "fuchsia",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "WordPress",
      "Shopify",
      "Figma",
    ],
  },
];

const websiteTypes = [
  {
    icon: BriefcaseBusiness,
    title: "Corporate Websites",
  },
  {
    icon: Rocket,
    title: "Startup Websites",
  },
  {
    icon: Store,
    title: "E-commerce Stores",
  },
  {
    icon: Building2,
    title: "Real Estate Websites",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
  },
  {
    icon: Code2,
    title: "SaaS Websites",
  },
  {
    icon: GraduationCap,
    title: "Education Websites",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Websites",
  },
];

const performanceFeatures = [
  {
    icon: Gauge,
    title: "Fast Loading",
    description:
      "Optimized assets and efficient implementation for a faster browsing experience.",
  },
  {
    icon: Search,
    title: "SEO Ready",
    description:
      "Clean structure and technical foundations designed to support organic visibility.",
  },
  {
    icon: MonitorSmartphone,
    title: "Fully Responsive",
    description:
      "Consistent experiences across desktop, tablet and mobile devices.",
  },
  {
    icon: BarChart3,
    title: "Conversion Focused",
    description:
      "Strategic layouts, CTAs and user journeys designed around business objectives.",
  },
  {
    icon: ShieldCheck,
    title: "Security Minded",
    description:
      "Best-practice implementation with attention to secure forms, integrations and deployment.",
  },
  {
    icon: Layers3,
    title: "Scalable",
    description:
      "Flexible architecture that can evolve as your business and requirements grow.",
  },
];

const integrations = [
  "Google Analytics",
  "Google Tag Manager",
  "Meta Pixel",
  "CRM",
  "WhatsApp",
  "Payment Gateways",
  "Email Marketing",
  "Google Maps",
  "Calendars",
  "REST APIs",
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, audience, competitors and website objectives.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the sitemap, functionality, content structure and technical requirements.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create a clean visual experience focused on usability, brand and conversion.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "Our team turns the approved design into a responsive and functional website.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "We test responsiveness, forms, performance, integrations and browser compatibility.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Your website goes live with deployment, analytics and essential tracking configured.",
  },
];

const anatomyLayers = [
  {
    id: "experience",
    number: "01",
    label: "Experience",
    icon: PenTool,
    title: "Interface & User Experience",
    description:
      "Every screen starts with a clear hierarchy, intuitive navigation and a visual system designed around your audience.",
    points: [
      "Responsive UI",
      "Conversion-focused layouts",
      "Design systems",
      "Mobile-first thinking",
    ],
  },
  {
    id: "frontend",
    number: "02",
    label: "Frontend",
    icon: Code2,
    title: "Interactive Frontend",
    description:
      "We transform approved designs into fast, reusable and maintainable interfaces using modern frontend technologies.",
    points: [
      "React components",
      "Reusable architecture",
      "Interactive experiences",
      "Performance optimization",
    ],
  },
  {
    id: "logic",
    number: "03",
    label: "Business Logic",
    icon: Workflow,
    title: "Application Logic",
    description:
      "Complex workflows are structured into reliable application logic that supports your actual business operations.",
    points: [
      "Custom workflows",
      "Authentication",
      "Dashboards",
      "Business automation",
    ],
  },
  {
    id: "data",
    number: "04",
    label: "Data",
    icon: Database,
    title: "Data & Backend",
    description:
      "Your website connects securely with databases, APIs and backend services to power dynamic experiences.",
    points: [
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "Server-side systems",
    ],
  },
  {
    id: "growth",
    number: "05",
    label: "Growth",
    icon: BarChart3,
    title: "Analytics & Growth",
    description:
      "Tracking, analytics and marketing integrations help your website become part of a larger digital growth system.",
    points: [
      "Analytics",
      "Tag management",
      "CRM integrations",
      "Lead tracking",
    ],
  },
];

const orbitTech = [
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Tailwind",
  "Firebase",
  "AWS",
  "Python",
  "Java",
  "Shopify",
  "WordPress",
];

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the number of pages, functionality, integrations and content requirements. A standard business website can generally be completed faster than a custom web application or e-commerce platform.",
  },
  {
    question: "Do you build responsive websites?",
    answer:
      "Yes. Our websites are designed and developed to work across desktop, tablet and mobile screen sizes.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can redesign outdated websites with a modern UI, improved structure, better responsiveness and stronger conversion journeys.",
  },
  {
    question: "Can you integrate CRM and WhatsApp?",
    answer:
      "Yes. Depending on your requirements, we can integrate CRM systems, WhatsApp, lead forms, analytics platforms and other third-party services.",
  },
  {
    question: "Do you provide SEO with web development?",
    answer:
      "We can build your website with SEO-friendly technical foundations and also provide dedicated SEO services for ongoing organic growth.",
  },
  {
    question: "Can you build custom web applications?",
    answer:
      "Yes. We can develop custom dashboards, portals, SaaS interfaces and business applications based on your workflows and technical requirements.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 25,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  dark = false,
}) {
  return (
    <div
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <div
        className={`mb-4 flex items-center gap-3 ${
          center ? "justify-center" : ""
        }`}
      >
        <span
          className={`h-px w-8 ${
            dark ? "bg-violet-400" : "bg-violet-600"
          }`}
        />

        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-violet-300" : "text-violet-600"
          }`}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        className={`text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-[#12172B]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            dark ? "text-slate-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   HERO WEBSITE PREVIEW
========================================================= */

function WebsitePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[650px] px-1 sm:px-4 lg:px-0">
      <div className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[22px] border border-white/15 bg-white/[0.05] backdrop-blur-2xl sm:h-36 sm:w-36 sm:rounded-[28px] md:h-44 md:w-44" />

      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateX: [0, 1.5, 0],
          rotateY: [0, -1.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full"
      >
        <div className="rounded-[20px] border border-white/15 bg-white/[0.055] p-1.5 shadow-[0_25px_70px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:rounded-[28px] sm:p-2">
          <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#0C1020] sm:rounded-[22px]">

            {/* Browser bar */}
            <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3 sm:h-11 sm:gap-2 sm:px-4">
              <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />

              <div className="ml-2 h-5 flex-1 rounded-md border border-white/10 bg-white/[0.035] sm:ml-3 sm:h-6 sm:rounded-lg" />

              <Globe
                size={12}
                className="shrink-0 text-slate-500 sm:h-3.5 sm:w-3.5"
              />
            </div>

            {/* Website UI */}
            <div className="grid min-h-[270px] grid-cols-[42px_1fr] sm:min-h-[350px] sm:grid-cols-[58px_1fr] md:min-h-[390px] md:grid-cols-[72px_1fr]">

              {/* Sidebar */}
              <div className="border-r border-white/10 bg-white/[0.018] p-2 sm:p-3">
                <div className="flex flex-col items-center gap-4 sm:gap-5">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 sm:h-9 sm:w-9 sm:rounded-xl">
                    <Sparkles
                      size={13}
                      className="text-violet-300 sm:h-4 sm:w-4"
                    />
                  </div>

                  {[1, 2, 3, 4, 5].map((item) => (
                    <span
                      key={item}
                      className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${
                        item === 1
                          ? "bg-violet-400"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dashboard */}
              <div className="min-w-0 p-3 sm:p-5 md:p-7">

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="h-2 w-14 rounded-full bg-white/10 sm:w-20" />
                    <div className="mt-2 h-4 w-24 rounded-lg bg-white/10 sm:h-5 sm:w-36" />
                  </div>

                  <div className="h-7 w-7 shrink-0 rounded-lg bg-white/5 sm:h-9 sm:w-9 sm:rounded-xl" />
                </div>

                <div className="mt-4 grid gap-3 sm:mt-7 sm:gap-4 md:grid-cols-[1.35fr_.65fr]">

                  <div className="min-w-0 rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-transparent p-3 sm:rounded-2xl sm:p-5">
                    <div className="h-1.5 w-12 rounded-full bg-violet-300/30 sm:h-2 sm:w-16" />

                    <div className="mt-3 h-5 w-28 rounded-lg bg-white/15 sm:mt-4 sm:h-7 sm:w-40" />

                    <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 sm:mt-3 sm:h-2 sm:w-32" />

                    <div className="mt-4 flex gap-2 sm:mt-7">
                      <div className="h-7 w-14 rounded-lg bg-white/10 sm:h-8 sm:w-20" />
                      <div className="h-7 w-12 rounded-lg bg-white/5 sm:h-8 sm:w-16" />
                    </div>
                  </div>

                  <div className="hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:block">
                    <div className="flex h-20 items-end gap-1 sm:h-24">
                      {[35, 55, 43, 72, 61, 82, 68].map(
                        (height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 8 }}
                            animate={{
                              height: `${height}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: index * 0.08,
                            }}
                            className="flex-1 rounded-t bg-violet-400/40"
                          />
                        )
                      )}
                    </div>

                    <div className="mt-3 h-2 w-16 rounded-full bg-white/10" />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
                  {["Analytics", "Leads", "Performance"].map(
                    (item) => (
                      <div
                        key={item}
                        className="min-w-0 rounded-lg border border-white/10 bg-white/[0.025] p-2 sm:rounded-xl sm:p-3"
                      >
                        <div className="h-1.5 w-8 rounded-full bg-white/10 sm:h-2 sm:w-10" />

                        <p className="mt-2 truncate text-[8px] text-slate-500 sm:mt-3 sm:text-[10px]">
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating cards */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-3 top-[18%] hidden rounded-2xl border border-white/10 bg-[#0D1120]/90 p-3 shadow-2xl backdrop-blur-xl md:block lg:-left-12 lg:p-4"
        >
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 lg:h-9 lg:w-9">
              <Gauge size={14} className="text-violet-300 lg:h-4 lg:w-4" />
            </div>

            <div>
              <p className="text-[8px] uppercase tracking-[0.15em] text-slate-500">
                Performance
              </p>

              <p className="mt-1 text-xs font-semibold lg:text-sm">
                Optimized
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          className="absolute -right-3 bottom-[16%] hidden rounded-2xl border border-white/10 bg-[#0D1120]/90 p-3 shadow-2xl backdrop-blur-xl md:block lg:-right-12 lg:p-4"
        >
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 lg:h-9 lg:w-9">
              <Search size={14} className="text-blue-300 lg:h-4 lg:w-4" />
            </div>

            <div>
              <p className="text-[8px] uppercase tracking-[0.15em] text-slate-500">
                Foundation
              </p>

              <p className="mt-1 text-xs font-semibold lg:text-sm">
                SEO Ready
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   BENTO SERVICE CARD
========================================================= */

function BentoServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <FadeIn
      delay={index * 0.04}
      className={
        service.size === "large"
          ? "lg:col-span-2 lg:row-span-2"
          : service.size === "wide"
          ? "lg:col-span-2"
          : ""
      }
    >
      <motion.div
        whileHover={{ y: -7 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative h-full min-h-[360px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-shadow duration-500 hover:border-violet-200 hover:shadow-[0_25px_70px_rgba(99,102,241,.14)] sm:min-h-[380px] lg:min-h-[400px]"
      >
        {/* IMAGE */}
        <div className="absolute inset-x-0 top-0 h-[50%] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-white" />

          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>

        {/* CONTENT */}
        <div className="relative flex h-full min-h-[360px] flex-col p-5 sm:min-h-[380px] sm:p-6 lg:min-h-[400px] lg:p-7">

          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-violet-600 shadow-lg backdrop-blur-xl sm:h-11 sm:w-11 sm:rounded-2xl">
              <Icon size={18} className="sm:h-5 sm:w-5" />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-400 shadow-sm backdrop-blur-xl transition group-hover:border-violet-200 group-hover:text-violet-600">
              <ArrowUpRight size={15} />
            </div>
          </div>

          <div className="relative mt-auto pt-28 sm:pt-32 lg:pt-36">
            <h3 className="text-lg font-semibold tracking-tight text-[#12172B] sm:text-xl">
              {service.title}
            </h3>

            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              {service.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white/90 px-2 py-1 text-[9px] font-medium text-slate-500 backdrop-blur sm:px-2.5 sm:text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function WebDevelopment() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeAnatomy, setActiveAnatomy] = useState(
    "experience"
  );
  const [activeTech, setActiveTech] = useState("React");

  const selectedLayer = useMemo(
    () =>
      anatomyLayers.find(
        (layer) => layer.id === activeAnatomy
      ) || anatomyLayers[0],
    [activeAnatomy]
  );

  const SelectedLayerIcon = selectedLayer.icon;

  return (
  <>
    <Helmet>
      <title>Web Development Company in Noida | AdNex Media</title>

      <meta
        name="description"
        content="AdNex Media is a web development company in Noida offering business websites, landing pages, e-commerce websites, React development, custom web applications and website maintenance."
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href="https://www.adnexmedia.in/web-development"
      />
    </Helmet>

    <main className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-[#12172B]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(124,58,237,.18),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(37,99,235,.10),transparent_28%)]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* floating blobs */}

        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-violet-600/10 blur-[90px]"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute right-[10%] bottom-[10%] h-48 w-48 rounded-full bg-blue-500/10 blur-[100px]"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-28">
  <div className="grid min-w-0 items-center gap-12 sm:gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">

            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-[11px] font-medium text-violet-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                Web Development · Digital Products
              </div>

              <h1 className="max-w-3xl text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] xs:text-[46px] sm:text-6xl md:text-7xl lg:text-[76px]">
  Web Development Company
  <span className="block bg-gradient-to-r from-violet-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
    in Noida.
  </span>
</h1>

              <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-7 sm:text-base sm:leading-7 lg:text-lg">
                From high-converting landing pages to complex web
                applications, we design and develop digital experiences
                around your users, brand and business goals.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#070B16] transition hover:bg-violet-300"
                >
                  Start Your Project
                  <ArrowUpRight
                    size={17}
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href="#anatomy"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-white/5"
                >
                  Explore Architecture
                  <ArrowRight size={17} />
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-7 gap-y-4 text-sm text-slate-400 sm:grid-cols-4">
                {[
                  "Responsive",
                  "SEO Ready",
                  "API Ready",
                  "Scalable",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <Check
                      size={14}
                      className="text-violet-400"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <WebsitePreview />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENTO INTRO
      ====================================================== */}

      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <FadeIn>
              <SectionHeading
                eyebrow="The Web Build System"
                title="More than pages. A complete digital product."
                description="A modern website needs the right combination of experience, engineering, infrastructure and growth foundations."
                dark={false}
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Layers3 size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                      Architecture
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Design → Code → Growth
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div
            id="services"
            className="mt-14 grid auto-rows-[minmax(230px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, index) => (
              <BentoServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          INTERACTIVE WEBSITE ANATOMY
      ====================================================== */}

      <section
        id="anatomy"
        className="relative overflow-hidden bg-[#F7F9FC] py-14 sm:py-20 md:py-24 lg:py-28"
      >
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-100/50 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-100/60 blur-[110px]" />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <FadeIn>
            <SectionHeading
              eyebrow="Interactive Anatomy"
              title="See what sits behind a high-quality website."
              description="Explore the different layers we bring together to create a complete, scalable web experience."
              dark={false}
            />
          </FadeIn>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-[.72fr_1.28fr]">

            {/* layer navigation */}

            <FadeIn>
              <div className="rounded-[32px] border border-slate-200 bg-white p-3 shadow-sm">
                {anatomyLayers.map((layer) => {
                  const Icon = layer.icon;
                  const active =
                    activeAnatomy === layer.id;

                  return (
                    <button
                      key={layer.id}
                      onClick={() =>
                        setActiveAnatomy(layer.id)
                      }
                      className={`group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${
                        active
                          ? "bg-[#070B16] text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-violet-500/15 text-violet-300"
                            : "bg-violet-50 text-violet-600"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-semibold tracking-widest ${
                              active
                                ? "text-violet-300"
                                : "text-violet-500"
                            }`}
                          >
                            {layer.number}
                          </span>

                          <span
                            className={`text-sm font-semibold ${
                              active
                                ? "text-white"
                                : "text-[#12172B]"
                            }`}
                          >
                            {layer.label}
                          </span>
                        </div>

                        <p
                          className={`mt-1 text-xs ${
                            active
                              ? "text-slate-400"
                              : "text-slate-500"
                          }`}
                        >
                          {layer.title}
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className={`transition ${
                          active
                            ? "translate-x-0 text-violet-300"
                            : "-translate-x-1 text-slate-300 group-hover:translate-x-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* anatomy visual */}

            <FadeIn delay={0.08}>
              <div className="relative min-h-[500px] overflow-hidden rounded-[26px] border border-slate-200 bg-[#070B16] p-4 text-white shadow-2xl sm:min-h-[540px] sm:rounded-[32px] sm:p-6 lg:min-h-[560px] lg:p-7">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,.18),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(37,99,235,.10),transparent_35%)]" />

                <div
                  className="absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300">
                        Active Layer
                      </p>

                      <AnimatePresence mode="wait">
                        <motion.h3
                          key={selectedLayer.id}
                          initial={{
                            opacity: 0,
                            y: 6,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -6,
                          }}
                          className="mt-2 text-xl font-semibold"
                        >
                          {selectedLayer.title}
                        </motion.h3>
                      </AnimatePresence>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <SelectedLayerIcon
                        size={18}
                        className="text-violet-300"
                      />
                    </div>
                  </div>

                  {/* fake browser */}

                  <div className="mx-auto mt-7 w-full max-w-xl sm:mt-10">
                    <div className="overflow-hidden rounded-[25px] border border-white/10 bg-[#0D1220] shadow-2xl">

                      <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />

                        <div className="ml-3 h-5 flex-1 rounded-md bg-white/[0.035]" />
                      </div>

                      <div className="p-5 sm:p-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="h-2 w-16 rounded bg-violet-300/20" />
                            <div className="mt-2 h-5 w-32 rounded bg-white/10" />
                          </div>

                          <div className="h-8 w-8 rounded-lg bg-white/5" />
                        </div>

                        <div className="mt-6 rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/15 to-blue-500/5 p-5">
                          <div className="h-2 w-14 rounded bg-violet-300/20" />
                          <div className="mt-4 h-6 w-36 rounded-lg bg-white/10" />
                          <div className="mt-3 h-2 w-28 rounded bg-white/5" />

                          <div className="mt-6 flex gap-2">
                            <div className="h-8 w-20 rounded-lg bg-violet-400/15" />
                            <div className="h-8 w-16 rounded-lg bg-white/5" />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="rounded-xl border border-white/10 bg-white/[0.025] p-3"
                            >
                              <div className="h-8 rounded-lg bg-white/5" />
                              <div className="mt-3 h-2 w-12 rounded bg-white/10" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* connection lines */}

                  <div className="absolute left-[15%] top-[44%] hidden h-px w-[20%] bg-gradient-to-r from-transparent via-violet-400/50 to-violet-400/10 lg:block" />

                  <div className="absolute right-[10%] top-[57%] hidden h-px w-[20%] bg-gradient-to-l from-transparent via-blue-400/50 to-blue-400/10 lg:block" />

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedLayer.id}
                        initial={{
                          opacity: 0,
                          x: 10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -10,
                        }}
                      >
                        <p className="text-sm leading-6 text-slate-400">
                          {selectedLayer.description}
                        </p>

                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          {selectedLayer.points.map(
                            (point) => (
                              <div
                                key={point}
                                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
                              >
                                <Check
                                  size={14}
                                  className="text-violet-300"
                                />
                                <span className="text-xs text-slate-300">
                                  {point}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY ORBIT
      ====================================================== */}

      <section
        id="technology"
        className="relative overflow-hidden bg-[#070B16] py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,.12),transparent_38%)]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <FadeIn>
            <SectionHeading
              eyebrow="Technology Orbit"
              title="The right stack for the right product."
              description="We select technologies based on your project's complexity, performance requirements and long-term scalability."
              dark
            />
          </FadeIn>

          <div className="mt-10 grid items-center gap-8 sm:mt-14 sm:gap-10 lg:mt-16 lg:grid-cols-[1.2fr_.8fr]">

            {/* orbit */}

            <FadeIn>
              <div className="relative mx-auto aspect-square w-full max-w-[620px] min-w-0">

                {/* atmosphere */}

                <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[80px]" />

                {/* orbit rings */}

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
                />

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 27,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-1/2 h-[57%] w-[57%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/[0.14]"
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/[0.12]"
                />

                {/* center */}

                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      "0 0 40px rgba(139,92,246,.10)",
                      "0 0 75px rgba(139,92,246,.24)",
                      "0 0 40px rgba(139,92,246,.10)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[32px] border border-white/15 bg-white/[0.05] backdrop-blur-2xl sm:h-44 sm:w-44"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-500/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Globe size={18} className="text-violet-300 sm:h-[22px] sm:w-[22px]"
                    />
                  </div>

                  <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-violet-300/70">
                    Web
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    Product Core
                  </p>
                </motion.div>

                {/* technology nodes */}

                {orbitTech.map((tech, index) => {
                  const angle =
                    (index / orbitTech.length) * 360;

                  const radius =
                    index % 2 === 0 ? 39 : 28;

                  const x =
                    50 +
                    radius *
                      Math.cos(
                        (angle * Math.PI) / 180
                      );

                  const y =
                    50 +
                    radius *
                      Math.sin(
                        (angle * Math.PI) / 180
                      );

                  const active =
                    activeTech === tech;

                  return (
                    <motion.button
                      key={tech}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      onClick={() =>
                        setActiveTech(tech)
                      }
                      whileHover={{
                        scale: 1.08,
                      }}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-2 py-1.5 text-[8px] font-medium backdrop-blur-xl transition sm:rounded-xl sm:px-3 sm:py-2 sm:text-[10px] md:px-4 md:py-2.5 md:text-xs ${
                        active
                          ? "border-violet-300/50 bg-violet-500/20 text-violet-100 shadow-[0_0_30px_rgba(139,92,246,.18)]"
                          : "border-white/10 bg-[#0D1120]/90 text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {tech}
                    </motion.button>
                  );
                })}

                {/* orbit dots */}

                {[0, 1, 2, 3].map((item) => (
                  <motion.span
                    key={item}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + item,
                      repeat: Infinity,
                      delay: item * 0.7,
                    }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-violet-300"
                    style={{
                      left: `${20 + item * 20}%`,
                      top:
                        item % 2 === 0
                          ? "16%"
                          : "80%",
                    }}
                  />
                ))}
              </div>
            </FadeIn>

            {/* tech details */}

            <FadeIn delay={0.1}>
              <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:rounded-[32px] sm:p-8">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                    <Code2 size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Selected Technology
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      {activeTech}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-400">
                  Technology selection is based on the product
                  requirements, team needs, performance expectations
                  and long-term maintainability of the project.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    ["Architecture", "Modular & scalable"],
                    ["Experience", "Responsive by default"],
                    ["Integration", "API friendly"],
                    ["Deployment", "Cloud ready"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"
                    >
                      <span className="text-xs text-slate-500">
                        {label}
                      </span>

                      <span className="text-xs font-medium text-slate-200">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {technologies.flatMap((group) =>
                    group.items.slice(0, 3)
                  ).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* technology categories */}

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((group, index) => {
              const Icon = group.icon;

              return (
                <FadeIn
                  key={group.category}
                  delay={index * 0.04}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-violet-400/25">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Icon size={17} />
                      </div>

                      <p className="text-sm font-semibold">
                        {group.category}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS TYPES BENTO
      ====================================================== */}

      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <FadeIn>
            <SectionHeading
              eyebrow="Solutions"
              title="Digital experiences for different business models."
              description="Whether you need a corporate presence, a product interface or a commerce platform, the architecture adapts to your requirements."
              dark={false}
            />
          </FadeIn>

          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-4">
            {websiteTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn
                  key={item.title}
                  delay={index * 0.04}
                >
                  <motion.div
                    whileHover={{
                      y: -4,
                    }}
                    className={`group relative min-h-[180px] overflow-hidden rounded-[22px] border border-slate-200 p-5 shadow-sm transition sm:min-h-[200px] sm:rounded-[25px] sm:p-6 ${
                      index === 0 || index === 5
                        ? "bg-[#070B16] text-white"
                        : "bg-[#F7F9FC]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                          index === 0 || index === 5
                            ? "bg-white/10 text-violet-300"
                            : "bg-violet-50 text-violet-600"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <ArrowUpRight
                        size={16}
                        className={
                          index === 0 || index === 5
                            ? "text-slate-600"
                            : "text-slate-300"
                        }
                      />
                    </div>

                    <h3
                      className={`mt-8 text-base font-semibold ${
                        index === 0 || index === 5
                          ? "text-white"
                          : "text-[#12172B]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-2 text-xs ${
                        index === 0 || index === 5
                          ? "text-slate-500"
                          : "text-slate-500"
                      }`}
                    >
                      Designed around the needs of your users and
                      business.
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PERFORMANCE BENTO
      ====================================================== */}

      <section className="bg-[#F7F9FC] py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <FadeIn>
            <SectionHeading
              center
              eyebrow="Performance System"
              title="Built for the experience after the design."
              description="Beautiful interfaces need strong technical foundations. We build around usability, speed, discoverability and scalability."
              dark={false}
            />
          </FadeIn>

          <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
            {performanceFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn
                  key={item.title}
                  delay={index * 0.04}
                >
                  <motion.div
                    whileHover={{
                      y: -4,
                    }}
                    className="group h-full rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                        <Icon size={20} />
                      </div>

                      <span className="text-[10px] font-semibold tracking-widest text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-7 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES + INTEGRATIONS
      ====================================================== */}

      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">

            <FadeIn>
              <div className="relative overflow-hidden rounded-[32px] bg-[#070B16] p-7 text-white sm:p-9">

                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-600/10 blur-[90px]" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                    <Workflow size={21} />
                  </div>

                  <h2 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Powerful website features.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                    Add the functionality your business needs without
                    compromising the user experience.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Contact Forms",
                      "Lead Capture",
                      "WhatsApp Integration",
                      "CRM Integration",
                      "Payment Gateway",
                      "Google Analytics",
                      "Google Tag Manager",
                      "Meta Pixel",
                      "Blog / CMS",
                      "Authentication",
                      "Admin Dashboard",
                      "API Integration",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"
                      >
                        <Check
                          size={14}
                          className="text-violet-300"
                        />

                        <span className="text-xs text-slate-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="rounded-[32px] border border-slate-200 bg-[#F7F9FC] p-7 sm:p-9">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <PlugZap size={21} />
                </div>

                <h2 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Connect your ecosystem.
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Integrate your website with the tools that power
                  marketing, sales, communication and operations.
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {integrations.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-600 transition hover:border-violet-300 hover:text-violet-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-5">
                  <div className="flex items-center gap-3">
                    <Zap
                      size={18}
                      className="text-violet-600"
                    />

                    <p className="text-sm font-semibold">
                      Marketing-ready architecture
                    </p>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Tracking, analytics and lead-generation systems
                    can be integrated directly into your website.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section
        id="process"
        className="relative overflow-hidden bg-[#070B16] py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(124,58,237,.10),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(37,99,235,.08),transparent_30%)]" />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <FadeIn>
            <SectionHeading
              eyebrow="How We Work"
              title="From first idea to production."
              description="A structured workflow keeps strategy, design, engineering and launch aligned."
              dark
            />
          </FadeIn>

          <div className="mt-10 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {process.map((item, index) => (
              <FadeIn
                key={item.number}
                delay={index * 0.04}
              >
                <motion.div
                  whileHover={{
                    y: -4,
                  }}
                  className="group relative min-h-[220px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:min-h-[240px] sm:rounded-[28px] sm:p-7"
                >
                  <div className="absolute right-5 top-0 text-[100px] font-bold leading-none text-white/[0.025]">
                    {item.number}
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-violet-300">
                        STEP {item.number}
                      </span>

                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 transition group-hover:text-violet-300"
                      />
                    </div>

                    <h3 className="mt-12 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 sm:justify-between">
                {[
                  "Strategy",
                  "UX",
                  "UI",
                  "Development",
                  "QA",
                  "Launch",
                ].map((item, index) => (
                  <React.Fragment key={item}>
                    <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5">
                      {item}
                    </span>

                    {index < 5 && (
                      <ArrowRight
                        size={13}
                        className="hidden text-violet-400/50 sm:block"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* =====================================================
          WHY ADNEX
      ====================================================== */}

      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr]">

            <FadeIn>
              <SectionHeading
                eyebrow="Why AdNex"
                title="One build. Multiple growth possibilities."
                description="We combine design, development and digital marketing thinking so your website can become part of a larger growth ecosystem."
                dark={false}
              />
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [
                    "Design + Development",
                    PenTool,
                  ],
                  [
                    "Performance Mindset",
                    Gauge,
                  ],
                  [
                    "Scalable Architecture",
                    Layers3,
                  ],
                  [
                    "Responsive by Default",
                    Smartphone,
                  ],
                  [
                    "Marketing Ready",
                    BarChart3,
                  ],
                  [
                    "Post-Launch Support",
                    Settings2,
                  ],
                ].map(([title, Icon]) => (
                  <div
                    key={title}
                    className="group rounded-2xl border border-slate-200 bg-[#F7F9FC] p-5 transition hover:border-violet-200 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Icon size={18} />
                      </div>

                      <p className="text-sm font-semibold">
                        {title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =====================================================
          FULL FUNNEL
      ====================================================== */}

      <section className="bg-[#F7F9FC] py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">

          <FadeIn>
            <SectionHeading
              center
              eyebrow="Digital Ecosystem"
              title="Your website can be the center of the funnel."
              description="Connect development with SEO, paid campaigns, analytics and lead-generation systems."
              dark={false}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative mt-14 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

              <div className="absolute left-1/2 top-1/2 hidden h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-200 to-transparent lg:block" />

              <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {[
                  ["01", "Website"],
                  ["02", "SEO"],
                  ["03", "Paid Ads"],
                  ["04", "Landing Page"],
                  ["05", "Lead"],
                  ["06", "Conversion"],
                ].map(([number, title]) => (
                  <div
                    key={title}
                    className="relative rounded-2xl border border-slate-200 bg-[#F7F9FC] p-5 text-center"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-violet-600">
                      {number}
                    </span>

                    <p className="mt-2 text-xs font-semibold text-[#12172B]">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="bg-[#070B16] py-20 text-white sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8">

          <FadeIn>
            <SectionHeading
              center
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              dark
            />
          </FadeIn>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <FadeIn
                  key={faq.question}
                  delay={index * 0.025}
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
                    <button
                      onClick={() =>
                        setOpenFaq(
                          isOpen ? -1 : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.025] sm:gap-5 sm:px-6 sm:py-5"
                    >
                      <span className="text-sm font-medium text-slate-200">
                        {faq.question}
                      </span>

                      {isOpen ? (
                        <ChevronUp
                          size={18}
                          className="shrink-0 text-violet-300"
                        />
                      ) : (
                        <ChevronDown
                          size={18}
                          className="shrink-0 text-slate-500"
                        />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                        >
                          <div className="border-t border-white/10 px-5 pb-5 pt-4 sm:px-6">
                            <p className="text-sm leading-6 text-slate-400">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section
        id="contact"
        className="bg-[#070B16] px-6 pb-24 text-white sm:px-8 lg:px-12"
      >
        <FadeIn>
          <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-white/[0.025] to-blue-500/10 px-5 py-12 text-center sm:rounded-[36px] sm:px-8 sm:py-16 lg:px-12 lg:py-20">

            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.3, 0.55, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl"
            />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-violet-300">
                <Sparkles size={20} />
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-300">
                Build Something Better
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Have an idea for your next website?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Let's turn your idea into a responsive, scalable and
                conversion-focused digital experience.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:adnextechnologies@gmail.com"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#070B16] transition hover:bg-violet-300"
                >
                  Start Your Project

                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-violet-400/30 hover:bg-white/5"
                >
                  Explore Services
                  <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  </>
  );
}