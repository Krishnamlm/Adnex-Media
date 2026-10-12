import { Target, TrendingUp, Users, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Targeted Reach",
    desc: "Get in front of the right audience with data-driven ad targeting.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Growth",
    desc: "Track every rupee spent with clear ROI and performance reports.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    desc: "A hands-on team of strategists, designers and marketers for you.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Reporting",
    desc: "No hidden numbers—full visibility into campaigns and spend.",
  },
];

const DigitalMarketing = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* ================= Left Content ================= */}
          <div>
            <span
              className="
                inline-flex
                px-4
                py-1.5
                rounded-full
                bg-[#5044E5]/10
                text-xs
                font-semibold
                tracking-wide
                text-[#5044E5]
                uppercase
              "
            >
              Digital Growth Partner
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Results-Driven
              <br />
              <span className="bg-gradient-to-r from-[#5044E5] to-blue-500 bg-clip-text text-transparent">
                Digital Marketing
              </span>
            </h2>

            <p className="mt-5 text-gray-500 text-base leading-7 max-w-sm">
              We help brands grow online—strategy, creative and performance
              marketing under one roof.
            </p>
          </div>

          {/* ================= Right Feature Grid ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    rounded-2xl
                    bg-[#5044E5]/5
                    p-5
                    lg:p-6
                  "
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <Icon size={26} className="text-[#5044E5]" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DigitalMarketing;