import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter";

const stats = [
  {
    value: 250,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    value: 120,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

const Stats = () => {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-24">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full  blur-3xl sm:h-80 sm:w-80" />

        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full  blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-7 max-w-2xl text-center sm:mb-12 lg:mb-16"
        >

          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-600 sm:mb-3 sm:text-xs lg:text-sm">
            Our Track Record
          </p>

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Our Achievements
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-[11px] leading-5 text-gray-500 sm:mt-3 sm:text-sm lg:text-base">
            Trusted by businesses across India to build, grow and scale
            their digital presence.
          </p>

        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-4 lg:gap-6">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
              whileHover={{
                y: -4,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                
                
                
                px-2
                py-4
                text-center
                
                transition-all
                duration-300
                

                sm:rounded-2xl
                sm:px-5
                sm:py-7

                lg:py-10
              "
            >

              {/* Small Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-16
                  w-16
                  rounded-full
                 
                  opacity-0
                  blur-2xl
                  transition-opacity
                  duration-300
                  group-hover:opacity-100

                  sm:h-24
                  sm:w-24
                "
              />

              {/* Number */}
              <h3
                className="
                  relative
                  whitespace-nowrap
                  text-2xl
                  font-extrabold
                  leading-none
                  tracking-tight
                  text-blue-600

                  sm:text-4xl

                  lg:text-5xl
                "
              >
                <AnimatedCounter
                  end={item.value}
                  suffix={item.suffix}
                />
              </h3>

              {/* Label */}
              <p
                className="
                  relative
                  mx-auto
                  mt-1
                  max-w-[120px]
                  text-[9px]
                  font-medium
                  leading-4
                  text-gray-500

                  sm:mt-3
                  sm:max-w-none
                  sm:text-sm
                  sm:leading-5

                  lg:text-base
                "
              >
                {item.label}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Stats;