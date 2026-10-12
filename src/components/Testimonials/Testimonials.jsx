import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    text: "Adnex Media completely transformed our digital presence. Their creative strategies and consistent execution helped us reach the right audience and generate quality leads.",
    name: "Rahul Sharma",
    role: "Founder, Real Estate Brand",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    text: "The team understood our brand from day one. Their social media campaigns were creative, engaging, and delivered much better results than we expected.",
    name: "Priya Mehta",
    role: "Marketing Head",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    text: "From performance marketing to content creation, Adnex Media handled everything professionally. We saw a noticeable improvement in both reach and lead quality.",
    name: "Amit Verma",
    role: "Director, Business Group",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
  {
    text: "Our vision was understood perfectly by the Adnex Media team. Their creatives are premium, their communication is smooth, and the campaigns are always delivered on time.",
    name: "Neha Kapoor",
    role: "Brand Manager",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    text: "Adnex Media brought structure to our digital marketing. Their data-driven approach helped us understand what was working and where we could improve.",
    name: "Karan Malhotra",
    role: "Co-Founder, Startup",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/100?img=68",
  },
  {
    text: "The creativity and attention to detail really stand out. From campaign concepts to final creatives, the Adnex Media team consistently delivers quality work.",
    name: "Riya Singh",
    role: "Business Owner",
    rating: "5.0",
    avatar: "https://i.pravatar.cc/100?img=49",
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">

      {/* Review Content */}
      <div className="testimonial-content">

        <span className="quote-mark quote-top">“</span>

        <p>{testimonial.text}</p>

        <span className="quote-mark quote-bottom">”</span>

      </div>

      {/* Client Information */}
      <div className="testimonial-footer">

        <div className="client-info">

          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="client-avatar"
          />

          <div className="client-details">
            <h4>{testimonial.name}</h4>
            <span>{testimonial.role}</span>
          </div>

        </div>

        {/* Rating */}
        <div className="rating">
          <span className="rating-number">
            {testimonial.rating}
          </span>

          <span className="star">★</span>

          <span className="rating-text">
            Rating
          </span>
        </div>

      </div>

    </div>
  );
};


const Testimonials = () => {
  return (
    <section className="testimonials-section">

      <div className="testimonials-container">

        {/* =========================
            SECTION HEADING
        ========================= */}

        <div className="testimonial-heading">

          <div className="heading-left">

            <div className="section-label">
              <span className="label-dot"></span>
              Testimonials
            </div>

            <h2>
              What Our <span>Clients</span> Say
            </h2>

          </div>

          <p className="heading-description">
            We help brands build stronger digital identities,
            reach the right audience, and turn ideas into
            measurable growth.
          </p>

        </div>


        {/* =========================
            TESTIMONIAL SLIDER
        ========================= */}

        <div className="testimonial-slider">

          <div className="testimonial-track">

            {/* FIRST SET */}

            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`first-${index}`}
                testimonial={testimonial}
              />
            ))}


            {/* DUPLICATE SET
                Creates seamless infinite loop
            */}

            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`second-${index}`}
                testimonial={testimonial}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;