import React from "react";
import heroImg from "../../assets/images/hero_main.png";
import GroupProfile from "../../assets/images/group_profile.png";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative w-full overflow-hidden bg-white dark:bg-white-950"
    >

      {/* Animated Grid Background */}

<motion.div
  animate={{
    backgroundPosition: [
      "0px 0px",
      "40px 40px"
    ],
  }}

  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  }}

  className="
  absolute
  inset-0
  z-0
  pointer-events-none
  "

  style={{

    backgroundImage: `
    linear-gradient(
    rgba(80,68,229,0.12) 1px,
    transparent 1px
    ),

    linear-gradient(
    90deg,
    rgba(80,68,229,0.12) 1px,
    transparent 1px
    )
    `,

    backgroundSize:"40px 40px",

    maskImage:
    "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",

    WebkitMaskImage:
    "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",

  }}
/>


      {/* Glow */}
      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-[600px]
        h-[350px]
        rounded-full
        bg-[#5044E5]
        opacity-[0.07]
        blur-[90px]
        "
      />


      {/* Content */}

      <div
        className="
        relative
        z-10
        flex
        flex-col
        items-center
        px-5
        sm:px-10
        lg:px-20
        xl:px-32
        pt-16
        lg:pt-20
        text-center
        text-gray-900
        dark:text-black
        "
      >


        {/* Badge */}

        <motion.div
          initial={{
            opacity:0,
            y:15
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:.5
          }}

          viewport={{
            once:true
          }}

          className="
          inline-flex
          items-center
          gap-2
          bg-[#5044E5]/10
          border
          border-[#5044E5]/25
          text-[#5044E5]
          text-[11px]
          font-semibold
          tracking-wide
          uppercase
          px-4
          py-1.5
          rounded-full
          "
        >

          <span
          className="
          w-2
          h-2
          bg-[#5044E5]
          rounded-full
          animate-pulse
          "
          />

          Digital Solutions • Creative Excellence

        </motion.div>




        {/* Heading */}

        <motion.h1

          initial={{
            opacity:0,
            y:20
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:.6,
            delay:.1
          }}

          viewport={{
            once:true
          }}

          className="
          mt-6
          text-4xl
          sm:text-5xl
          xl:text-[64px]
          font-medium
          leading-[1.1]
          tracking-[-1.5px]
          max-w-5xl
          "
        >

          Transform Ideas Into

          <br/>

          <span
          className="
          bg-gradient-to-r
          from-[#5044E5]
          to-[#4d8cea]
          bg-clip-text
          text-transparent
          "
          >
            Digital Experiences
          </span>

        </motion.h1>




        {/* Description */}

        <motion.p

          initial={{
            opacity:0,
            y:15
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:.2
          }}

          className="
          mt-4
          max-w-lg
          text-sm
          sm:text-base
          text-gray-500
          dark:text-gray-500
          leading-relaxed
          "
        >

          Adnex Media creates modern websites,
          software solutions and digital experiences
          that help businesses grow faster.

        </motion.p>





        {/* Buttons */}

        <motion.div

        initial={{
          opacity:0,
          y:15
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        transition={{
          delay:.3
        }}

        className="
        flex
        justify-center
        flex-wrap
        gap-3
        mt-6
        "

        >

          <Link
  to="/contact"
  className="
    flex
    items-center
    gap-2
    bg-[#5044E5]
    text-white
    px-6
    py-3
    rounded-xl
    text-sm
    font-medium
    hover:bg-[#4338ca]
    transition
  "
>
  Start Project
  <ArrowRight size={17} />
</Link>



          {/*
<button
  className="
    flex
    items-center
    gap-2
    border
    border-gray-300
    px-6
    py-3
    rounded-xl
    text-sm
    font-medium
    hover:border-[#5044E5]
    hover:text-[#5044E5]
    transition
  "
>
  <Play size={16} />
  View Work
</button>
*/}


        </motion.div>





        {/* Social Proof */}

        <motion.div

        initial={{
          opacity:0
        }}

        whileInView={{
          opacity:1
        }}

        transition={{
          delay:.4
        }}

        className="
        flex
        items-center
        gap-3
        mt-7
        mb-8
        text-xs
        text-gray-400
        "

        >

          <div className="flex">
  <img
    src={GroupProfile}
    alt="Profile"
    className="w-20 h-7 rounded-full border-2 border-white"
  />
</div>


        

          Trusted by 2500+ brands


        </motion.div>






        {/* Hero Image */}

        <motion.div

        initial={{
          opacity:0,
          y:30
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:.6
        }}

        viewport={{
          once:true
        }}

        className="
        relative
        w-full
        max-w-6xl
        h-[200px]
        sm:h-[260px]
        rounded-3xl
        overflow-hidden
        border
        border-gray-200
        dark:border-white/10
        shadow-xl
        "
        >


          <img

          src={heroImg}

          alt="Adnex Technologies"

          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          "

          />


          <div
          className="
          absolute
          inset-0
          bg-black/50
          "
          />



          <div
          className="
          relative
          z-10
          h-full
          flex
          flex-col
          items-center
          justify-center
          px-5
          text-white
          "
          >


            <h2
            className="
            text-xl
            sm:text-3xl
            font-semibold
            "
            >

              Build Powerful Digital Experiences

            </h2>


            <p
            className="
            mt-2
            text-sm
            text-white/80
            max-w-md
            "
            >

              Website Development • Software • Branding • Marketing

            </p>


          </div>


        </motion.div>





        {/* Features */}

        <div
        className="
        flex
        flex-wrap
        justify-center
        gap-6
        py-6
        text-xs
        text-gray-400
        "
        >

        {
          [
            "Custom Software",
            "Creative Design",
            "Fast Delivery"
          ].map((item,i)=>(

            <div
            key={i}
            className="
            flex
            items-center
            gap-2
            "
            >

              <span
              className="
              w-4
              h-4
              rounded-full
              bg-green-100
              text-green-600
              flex
              items-center
              justify-center
              "
              >
                ✓
              </span>

              {item}

            </div>

          ))
        }


        </div>



      </div>


    </div>
  );
};


export default Hero;