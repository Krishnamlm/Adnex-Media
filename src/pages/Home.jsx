import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero/Hero";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Services from "../components/Services/Services";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Stats from "../components/Stats/Stats";
import FiveSteps from "../components/FiveSteps/FiveSteps";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Agency in Noida | AdNex Media</title>

        <meta
          name="description"
          content="AdNex Media is a digital marketing agency in Noida offering SEO, Google Ads, Meta Ads, social media marketing, web development and mobile app development."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.adnexmedia.in/"
        />
      </Helmet>

      <Hero />
      <Stats />
      <TrustedBy />
      <Services />
      <WhyChooseUs />
      <FiveSteps />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;