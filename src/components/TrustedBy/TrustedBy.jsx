import "./trustedby.css";

import Google from "../../assets/logos/google.png";
import Meta from "../../assets/logos/meta.png";
import Microsoft from "../../assets/logos/microsoft.png";
import Adobe from "../../assets/logos/adobe.png";
import Amazon from "../../assets/logos/amazon.png";
import Shopify from "../../assets/logos/shopify.png";
import Netflix from "../../assets/logos/netflix.png";

const companies = [
  { name: "Google", logo: Google },
  { name: "Meta", logo: Meta },
  { name: "Microsoft", logo: Microsoft },
  { name: "Adobe", logo: Adobe },
  { name: "Amazon", logo: Amazon },
  { name: "Shopify", logo: Shopify },
  { name: "Netflix", logo: Netflix },
];

const TrustedBy = () => {
  return (
    <section className="trusted-section">

      <div className="trusted-container">

        {/* Heading */}
        <p className="trusted-label">
          Trusted Technologies
        </p>

        <h2 className="trusted-heading">
          We Build With Industry Leaders
        </h2>

        <p className="trusted-description">
          Powered by the world's leading platforms and technologies.
        </p>

        {/* Logo Slider */}
        <div className="trusted-marquee-wrapper">

          {/* Left Fade */}
          <div className="trusted-fade trusted-fade-left"></div>

          {/* Right Fade */}
          <div className="trusted-fade trusted-fade-right"></div>

          <div className="trusted-marquee">

            <div className="trusted-marquee-track">

              {/* First Set */}
              {companies.map((company, index) => (
                <div
                  className="company-card"
                  key={`first-${index}`}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                  />
                </div>
              ))}

              {/* Duplicate Set for Infinite Loop */}
              {companies.map((company, index) => (
                <div
                  className="company-card"
                  key={`second-${index}`}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                  />
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

export default TrustedBy;