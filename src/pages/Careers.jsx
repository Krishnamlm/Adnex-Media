
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Palette,
  Search,
  Megaphone,
  Users,
  Globe,
  Clock3,
  MapPin,
  GraduationCap,
  FileText,
  Sparkles,
  ChevronDown,
  TrendingUp,
  Smartphone,
  Layers3,
  Target,
  Zap,
} from "lucide-react";

import Footer from "../components/Footer/Footer";
import { supabase } from "../lib/supabase";

/* =========================================================
   APPLICATION FORM
========================================================= */

const GOOGLE_FORM_URL = "https://forms.gle/EBnq7SXpwiaeDJYU9";

/* =========================================================
   ICON MAP
========================================================= */

const careerIconMap = {
  Code2,
  Palette,
  Search,
  Megaphone,
  Users,
  Globe,
  GraduationCap,
  FileText,
  Sparkles,
  TrendingUp,
  Smartphone,
  Layers3,
  BriefcaseBusiness,
  Target,
  Zap,
};

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question: "Who can apply for an internship?",
    answer:
      "Students, freshers and beginners interested in building practical skills can apply for our internship programs.",
  },
  {
    question: "Is prior experience required?",
    answer:
      "Prior professional experience is not mandatory for internships. Basic knowledge of the selected domain can be helpful.",
  },
  {
    question: "How does the internship selection process work?",
    answer:
      "Submit the registration form first. Applications are reviewed based on the selected domain, skills and program requirements.",
  },
  {
    question: "Will I receive an internship certificate?",
    answer:
      "An internship certificate can be provided upon successful completion of the applicable internship program.",
  },
  {
    question: "Is the internship remote?",
    answer:
      "Internship mode can vary by program. The available options are mentioned on each internship card.",
  },
];

/* =========================================================
   WHY JOIN
========================================================= */

const whyJoin = [
  {
    icon: BriefcaseBusiness,
    title: "Real Project Exposure",
    text: "Work on practical digital projects and build experience beyond theoretical learning.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    text: "Develop your skills through structured tasks, feedback and industry-oriented work.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    text: "Work alongside people across development, design, marketing and growth.",
  },
  {
    icon: TrendingUp,
    title: "Professional Growth",
    text: "Build practical knowledge, confidence and a portfolio that supports your career journey.",
  },
];

/* =========================================================
   REUSABLE STATES
========================================================= */

const LoadingCards = ({ count = 2 }) => (
  <div
    className={`grid gap-5 ${
      count === 2 ? "lg:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
    }`}
  >
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="h-12 w-12 rounded-xl bg-slate-200" />
        <div className="mt-5 h-5 w-2/3 rounded bg-slate-200" />
        <div className="mt-4 h-3 w-full rounded bg-slate-100" />
        <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
        <div className="mt-6 h-10 rounded-xl bg-slate-100" />
      </div>
    ))}
  </div>
);

const EmptyState = ({ title, message }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white/[0.04] px-6 py-12 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
      <BriefcaseBusiness className="h-6 w-6 text-violet-400" />
    </div>

    <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>

    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">
      {message}
    </p>
  </div>
);

/* =========================================================
   CAREER PAGE
========================================================= */

const Career = () => {
  const [openings, setOpenings] = useState([]);
  const [internships, setInternships] = useState([]);

  const [careerLoading, setCareerLoading] = useState(true);
  const [careerError, setCareerError] = useState("");

  /* =======================================================
     FETCH PUBLISHED CAREERS AND INTERNSHIPS
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchCareerData = async () => {
      setCareerLoading(true);
      setCareerError("");

      try {
        const [jobsResult, internshipsResult] = await Promise.all([
          supabase
            .from("career_openings")
            .select("*")
            .eq("status", "published")
            .order("display_order", { ascending: true }),

          supabase
            .from("career_internships")
            .select("*")
            .eq("status", "published")
            .order("display_order", { ascending: true }),
        ]);

        if (jobsResult.error) throw jobsResult.error;
        if (internshipsResult.error) throw internshipsResult.error;

        if (isMounted) {
          setOpenings(jobsResult.data || []);
          setInternships(internshipsResult.data || []);
        }
      } catch (error) {
        console.error("Unable to fetch career data:", error);

        if (isMounted) {
          setCareerError(
            "We couldn't load opportunities right now. Please refresh the page and try again."
          );
        }
      } finally {
        if (isMounted) {
          setCareerLoading(false);
        }
      }
    };

    fetchCareerData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9fc] text-[#101426]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f8f9fc] px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-15%] h-[500px] w-[500px] rounded-full bg-violet-300/25 blur-[140px]" />
          <div className="absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-blue-300/25 blur-[150px]" />
          <div className="absolute bottom-[-15%] left-[35%] h-[400px] w-[400px] rounded-full bg-cyan-200/30 blur-[140px]" />
          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(40,50,90,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(40,50,90,0.045)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 shadow-sm backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Careers at AdNex Media
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-[#101426] sm:text-6xl lg:text-7xl"
            >
              Build your future.
              <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Create what matters.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
            >
              Join AdNex Media and work on real digital projects across
              development, design, marketing and growth. Build skills,
              contribute to meaningful work and grow with a digital-first team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <a
                href="#openings"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#11162a] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1b2140]"
              >
                Explore Openings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#internships"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50"
              >
                Explore Internships
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              ["10+", "Internship Domains"],
              ["Real", "Project Work"],
              ["1–3", "Month Internships"],
              ["100%", "Learning Focus"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-center shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-2xl font-extrabold text-[#11162a]">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          WHY JOIN
      ===================================================== */}

      <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Why AdNex
              </p>

              <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-[#11162a] sm:text-4xl lg:text-5xl">
                More than a job.
                <span className="block text-slate-400">A place to grow.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
                We believe strong careers are built through practical
                experience, continuous learning and meaningful work.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-xs font-semibold text-violet-700">
                <Zap className="h-4 w-4" />
                Learn • Build • Collaborate • Grow
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whyJoin.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-100 bg-violet-50">
                      <Icon className="h-5 w-5 text-violet-600" />
                    </div>

                    <h3 className="font-bold text-[#11162a]">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CURRENT OPENINGS
      ===================================================== */}

      <section
        id="openings"
        className="relative scroll-mt-24 overflow-hidden bg-[#070a18] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Current Openings
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Find your next{" "}
              <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                opportunity.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Explore our current roles and find an opportunity that matches
              your skills and career goals.
            </p>
          </div>

          {careerError ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200"
            >
              {careerError}
            </div>
          ) : careerLoading ? (
            <LoadingCards count={2} />
          ) : openings.length === 0 ? (
            <EmptyState
              title="No current openings"
              message="There are no published job openings at the moment. Please check back soon for new opportunities."
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {openings.map((job, index) => {
                const Icon =
                  careerIconMap[job.icon_name] || BriefcaseBusiness;

                return (
                  <motion.article
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07] sm:p-7"
                  >
                    <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-blue-500/10">
                            <Icon className="h-5 w-5 text-violet-200" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-300">
                              {job.department}
                            </p>

                            <h3 className="mt-1 break-words text-lg font-bold text-white sm:text-xl">
                              {job.title}
                            </h3>
                          </div>
                        </div>

                        <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-300" />
                      </div>

                      <p className="mt-5 text-sm leading-6 text-slate-400">
                        {job.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-300">
                          <Clock3 className="h-3 w-3" />
                          {job.employment_type}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-300">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-300">
                          <Users className="h-3 w-3" />
                          {job.experience}
                        </span>
                      </div>

                      {Array.isArray(job.skills) && job.skills.length > 0 && (
                        <div className="mt-6 border-t border-white/[0.08] pt-5">
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                            Key Skills
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-lg bg-white/[0.045] px-2.5 py-1.5 text-[11px] text-slate-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <a
                        href={job.application_url || GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#080B18] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50"
                      >
                        Apply for this role
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          INTERNSHIPS
      ===================================================== */}

      <section
        id="internships"
        className="relative scroll-mt-24 overflow-hidden bg-[#f7f8fc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="pointer-events-none absolute left-[-10%] top-[15%] h-[450px] w-[450px] rounded-full bg-violet-200/30 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[5%] right-[-10%] h-[450px] w-[450px] rounded-full bg-blue-200/25 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
              <GraduationCap className="h-4 w-4" />
              Internship Programs
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-[#11162a] sm:text-4xl lg:text-5xl">
              Learn by{" "}
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                doing.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Build practical experience through domain-focused internship
              programs designed around tasks, projects and real digital work.
            </p>
          </div>

          {careerError ? (
            <div
              role="alert"
              className="mt-14 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            >
              {careerError}
            </div>
          ) : careerLoading ? (
            <div className="mt-14">
              <LoadingCards count={3} />
            </div>
          ) : internships.length === 0 ? (
            <div className="mt-14 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                <GraduationCap className="h-6 w-6 text-violet-600" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#11162a]">
                Internship registrations will open soon
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                There are no published internship programs at the moment.
                Please check back soon.
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {internships.map((internship, index) => {
                const Icon =
                  careerIconMap[internship.icon_name] || GraduationCap;

                return (
                  <motion.article
                    key={internship.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.04 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/40 sm:p-7"
                  >
                    <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-100/70 blur-3xl transition-all duration-500 group-hover:bg-violet-100" />

                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-100 bg-violet-50">
                          <Icon className="h-5 w-5 text-violet-600" />
                        </div>

                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                          Open
                        </span>
                      </div>

                      <h3 className="mt-5 break-words text-lg font-bold text-[#11162a]">
                        {internship.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {internship.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600">
                          <Clock3 className="h-3 w-3" />
                          {internship.duration}
                        </span>

                        <span className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600">
                          <Globe className="h-3 w-3" />
                          {internship.mode}
                        </span>
                      </div>

                      {Array.isArray(internship.skills) &&
                        internship.skills.length > 0 && (
                          <div className="mt-6 border-t border-slate-100 pt-5">
                            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                              You'll work with
                            </p>

                            <div className="space-y-2">
                              {internship.skills.map((skill) => (
                                <div
                                  key={skill}
                                  className="flex items-center gap-2 text-xs text-slate-600"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="relative mt-auto pt-7">
                      <a
                        href={
                          internship.application_url || GOOGLE_FORM_URL
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button flex w-full items-center justify-center gap-2 rounded-xl bg-[#11162a] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700"
                      >
                        Register for Internship
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                      </a>

                      <p className="mt-3 text-center text-[10px] text-slate-400">
                        Registration form opens in a new tab
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-violet-100 bg-white p-5 text-center shadow-sm">
            <p className="text-xs leading-6 text-slate-500">
              Submit your registration through the application form.
              Applications are reviewed based on the selected domain, skills
              and program requirements.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPLICATION PROCESS
      ===================================================== */}

      <section
        id="apply"
        className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-violet-100/60 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              How It Works
            </p>

            <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-[#11162a] sm:text-4xl">
              Simple application process
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              A simple process designed to help us understand your skills,
              interests and suitability for the opportunity.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {[
              {
                number: "01",
                icon: FileText,
                title: "Apply",
                text: "Submit your application or internship registration.",
              },
              {
                number: "02",
                icon: Users,
                title: "Review",
                text: "Your profile and submitted information are reviewed.",
              },
              {
                number: "03",
                icon: Smartphone,
                title: "Discussion",
                text: "Shortlisted candidates may be contacted for the next step.",
              },
              {
                number: "04",
                icon: CheckCircle2,
                title: "Start",
                text: "Selected candidates receive the relevant joining details.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-3xl border border-slate-200 bg-[#f8f9fc] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                      <Icon className="h-4 w-4 text-violet-600" />
                    </div>

                    <span className="text-xs font-extrabold text-slate-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold text-[#11162a]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="relative bg-[#f7f8fc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              FAQ
            </p>

            <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-[#11162a] sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 open:border-violet-200 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#11162a]">
                  {faq.question}

                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <p className="max-w-3xl pt-4 text-sm leading-6 text-slate-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-[#f7f8fc] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#080b19] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-600/15 blur-[100px]" />
          <div className="pointer-events-none absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-cyan-500/10 blur-[90px]" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                Start Your Journey
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
                Ready to build something meaningful?
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Explore our opportunities and take the next step in your
                professional journey with AdNex Media.
              </p>
            </div>

            <a
              href="#openings"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#080B18] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50"
            >
              View Opportunities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Career;