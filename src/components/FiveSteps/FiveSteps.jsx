import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We assess market trends, competition, and audience data to build data-driven solutions.",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "We craft tailor-made marketing plans aligned with your goals, growth, and ROI.",
  },
  {
    number: "03",
    title: "Execute",
    desc: "Campaigns go live across SEO, paid ads, performance and social media.",
  },
  {
    number: "04",
    title: "Optimise",
    desc: "We use analytics to continuously refine campaigns and boost conversions.",
  },
  {
    number: "05",
    title: "Scale",
    desc: "Transparent reporting keeps growth consistent and results scalable.",
  },
];

const Process = () => {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* ================= Header ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-[#5044E5] uppercase">
            <span className="w-1 h-1 rounded-full bg-[#5044E5]" />
            How We Work
          </span>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            Our{" "}
            <span className="bg-gradient-to-r from-[#5044E5] to-blue-500 bg-clip-text text-transparent">
              5-Step
            </span>{" "}
            Process
          </h2>

          <p className="mt-2 max-w-md mx-auto text-gray-500 text-sm leading-6">
            Regularity of delivery- whether it's a campaign or a full brand
            strategy.
          </p>
        </motion.div>

        {/* ================= Steps ================= */}
        <div className="relative">

          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-[#5044E5]/40 via-[#5044E5]/20 to-blue-500/40" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                className="relative text-center"
              >
                {/* Circle */}
                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    mb-3
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    border
                    border-[#5044E5]/20
                    shadow-sm
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-xs font-bold text-[#5044E5]">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-1.5 text-xs text-gray-500 leading-5 max-w-[180px] mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;