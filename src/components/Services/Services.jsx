import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

import {
  ArrowUpRight,
  Check,
  Globe,
  Smartphone,
  Target,
  Megaphone,
  Users,
  TrendingUp,
  Share2,
  Palette,
  BriefcaseBusiness,
} from "lucide-react";

// Match the icon names saved in Supabase to Lucide components.
const iconMap = {
  Globe,
  Smartphone,
  Target,
  Megaphone,
  Users,
  TrendingUp,
  Share2,
  Palette,
  BriefcaseBusiness,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error fetching services:", error.message);
          setServices([]);
          return;
        }

        setServices(data || []);
      } catch (error) {
        console.error("Unexpected services error:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050816] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-8%] h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[130px]" />

        <div className="absolute right-[-10%] top-[28%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute bottom-[-15%] left-[28%] h-[360px] w-[360px] rounded-full bg-cyan-400/8 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
            What We Do
          </div>

          <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Digital services built
            <span className="block bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              for measurable growth.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Everything you need to build, market and scale your business —
            brought together under one premium digital partner.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-[300px] animate-pulse rounded-[20px] border border-white/[0.09] bg-white/[0.035] p-5"
              >
                <div className="h-11 w-11 rounded-xl bg-white/10" />
                <div className="mt-5 h-5 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-4 w-full rounded bg-white/[0.06]" />
                <div className="mt-2 h-4 w-4/5 rounded bg-white/[0.06]" />
                <div className="mt-8 h-4 w-1/3 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon_name] || BriefcaseBusiness;

              const features = Array.isArray(service.features)
                ? service.features
                : [];

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.035,
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.09] bg-white/[0.035] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.055] hover:shadow-[0_20px_50px_rgba(76,29,149,0.18)]"
                >
                  {/* Card Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

                  {/* Top */}
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-blue-500/10">
                      <Icon
                        className="h-5 w-5 text-violet-200"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300">
                      {service.tag}
                    </div>
                  </div>

                  {/* Title + Description */}
                  <div className="relative mt-4">
                    <div className="mb-1.5 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold tracking-[-0.02em] text-white">
                        {service.title}
                      </h3>

                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-300" />
                    </div>

                    <p className="min-h-[52px] text-[13px] leading-5 text-slate-400">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative mt-4 border-t border-white/[0.08] pt-4">
                    <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      What's included
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {features.map((feature, featureIndex) => (
                        <div
                          key={`${service.id}-${featureIndex}`}
                          className="flex items-center gap-2.5 text-[13px] text-slate-300"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>

                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Investment */}
                  <div className="relative mt-auto pt-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Investment
                    </p>

                    <p className="mt-0.5 text-base font-bold text-white">
                      {service.price}
                    </p>
                  </div>

                  {/* Bottom Hover Line */}
                  <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/0 to-transparent transition-all duration-500 group-hover:via-violet-400/50" />
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[20px] border border-white/10 bg-white/[0.035] px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">
              Our services are being updated.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Please check back soon or contact us to discuss your requirements.
            </p>
            <a
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#080B18] transition-transform hover:-translate-y-0.5"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-violet-500/[0.10] via-white/[0.035] to-blue-500/[0.08] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-bold text-white sm:text-xl">
                Need a custom digital growth plan?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Tell us what you are building and we'll shape the right
                service mix.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#080B18] transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;