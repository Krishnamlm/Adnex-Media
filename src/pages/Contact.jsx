import React, { useEffect, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import "./Contact.css";

const initialFormData = {
  inquiryType: "General Inquiry",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  service: "",
  budget: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Turnstile token
  const [turnstileToken, setTurnstileToken] = useState("");

  /* =========================================
     ESCAPE KEY
  ========================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowSuccessPopup(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status) {
      setStatus("");
    }
  };

  /* =========================================
     HANDLE INQUIRY TYPE
  ========================================= */

  const handleInquiryChange = (item) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: item,
    }));

    setStatus("");
  };

  /* =========================================
     TURNSTILE SUCCESS
  ========================================= */

  const handleTurnstileSuccess = (token) => {
    setTurnstileToken(token);
    setStatus("");
  };

  /* =========================================
     TURNSTILE ERROR
  ========================================= */

  const handleTurnstileError = () => {
    setTurnstileToken("");
    setStatus("turnstile-error");
  };

  /* =========================================
     SUBMIT FORM
  ========================================= */

const handleSubmit = async (e) => {
  e.preventDefault();

  setStatus("");

  // =========================================
  // BASIC VALIDATION
  // =========================================

  if (!formData.firstName.trim()) {
    setStatus("Please enter your first name.");
    return;
  }

  if (!formData.email.trim()) {
    setStatus("Please enter your work email.");
    return;
  }

  if (!formData.phone.trim()) {
    setStatus("Please enter your phone number.");
    return;
  }

  if (!formData.company.trim()) {
    setStatus("Please enter your company / brand.");
    return;
  }

  if (!formData.message.trim()) {
    setStatus("Please enter your message.");
    return;
  }

  // =========================================
  // TURNSTILE VALIDATION
  // =========================================

  if (!turnstileToken) {
    setStatus("turnstile-required");
    return;
  }

  setLoading(true);

  try {
    console.log("========== FRONTEND CONTACT SUBMIT ==========");

    // =========================================
    // SEND TO CLOUDFLARE WORKER
    // =========================================

    const response = await fetch("/api/contact", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...formData,
        turnstileToken,
      }),
    });

    // =========================================
    // READ RESPONSE
    // =========================================

    const result = await response.json();

    console.log("CONTACT API RESPONSE:", result);

    // =========================================
    // CHECK RESPONSE
    // =========================================

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Something went wrong. Please try again."
      );
    }

    // =========================================
    // SUCCESS
    // =========================================

    console.log(
      "========== CONTACT SUBMIT SUCCESS =========="
    );

    setFormData(initialFormData);

    setTurnstileToken("");

    setStatus("");

    setShowSuccessPopup(true);

  } catch (error) {
    console.error(
      "========== CONTACT FORM ERROR =========="
    );

    console.error(error);

    setStatus(
      error.message ||
        "Something went wrong. Please try again in a moment."
    );

  } finally {
    setLoading(false);
  }
};
  /* =========================================
     CLOSE SUCCESS POPUP
  ========================================= */

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <main className="adnex-contact-page">

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="adnex-bg-glow adnex-glow-one"></div>

      <div className="adnex-bg-glow adnex-glow-two"></div>

      <div className="adnex-orbit"></div>

      {/* =====================================
          MAIN CONTAINER
      ===================================== */}

      <div className="adnex-contact-container">

        {/* ===================================
            LEFT CONTENT
        =================================== */}

        <section className="adnex-contact-intro">

          <div className="adnex-contact-badge">
            <span>💬</span>
            Get in Touch
          </div>

          <h1>
            Let’s talk about
            <br />
            <span>your goals.</span>
          </h1>

          <p className="adnex-intro-text">
            Tell us what you need – performance marketing,
            creative services, or both. We’ll come back with
            the right approach, not a generic proposal.
          </p>

          <div className="adnex-side-info">

            <div className="adnex-info-line">
              <span className="adnex-info-dot"></span>

              <div>
                <strong>
                  Performance Marketing
                </strong>

                <p>
                  Growth strategies built around measurable
                  results.
                </p>
              </div>
            </div>

            <div className="adnex-info-line">
              <span className="adnex-info-dot"></span>

              <div>
                <strong>
                  Creative & Brand
                </strong>

                <p>
                  Creative that makes your brand impossible
                  to ignore.
                </p>
              </div>
            </div>

            <div className="adnex-info-line">
              <span className="adnex-info-dot"></span>

              <div>
                <strong>
                  Growth & Strategy
                </strong>

                <p>
                  Data-backed decisions designed for
                  long-term growth.
                </p>
              </div>
            </div>

          </div>

          <div className="adnex-bottom-note">
            <span className="adnex-pulse"></span>
            Let’s build something that performs.
          </div>

        </section>

        {/* ===================================
            FORM SECTION
        =================================== */}

        <section className="adnex-form-wrapper">

          <div className="adnex-form-header">

            <span>
              START A CONVERSATION
            </span>

            <h2>
              Send us a message
            </h2>

            <p>
              Fill in the details below and we'll be
              in touch shortly.
            </p>

          </div>

          {/* =================================
              FORM
          ================================= */}

          <form
            className="adnex-contact-form"
            onSubmit={handleSubmit}
          >

            {/* =================================
                INQUIRY TYPE
            ================================= */}

            <div className="adnex-inquiry-tabs">

              {[
                "General Inquiry",
                "New Project",
                "Partnership",
              ].map((item) => (

                <button
                  type="button"
                  key={item}
                  className={
                    formData.inquiryType === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleInquiryChange(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

            {/* =================================
                FIRST + LAST NAME
            ================================= */}

            <div className="adnex-form-grid">

              <div className="adnex-field">

                <label>
                  First Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="adnex-field">

                <label>
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* =================================
                EMAIL + PHONE
            ================================= */}

            <div className="adnex-form-grid">

              <div className="adnex-field">

                <label>
                  Work Email <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="adnex-field">

                <label>
                  Phone Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* =================================
                COMPANY
            ================================= */}

            <div className="adnex-field">

              <label>
                Company / Brand <span>*</span>
              </label>

              <input
                type="text"
                name="company"
                placeholder="Your company or brand name"
                value={formData.company}
                onChange={handleChange}
                required
              />

            </div>

            {/* =================================
                COUNTRY + SERVICE
            ================================= */}

            <div className="adnex-form-grid">

              <div className="adnex-field">

                <label>
                  Country
                </label>

                <div className="adnex-select-wrapper">

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select country
                    </option>

                    <option>India</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>Kuwait</option>
                    <option>Qatar</option>
                    <option>Bahrain</option>
                    <option>Oman</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Singapore</option>
                    <option>Other</option>

                  </select>

                  <span>⌄</span>

                </div>

              </div>

              <div className="adnex-field">

                <label>
                  Service Interested In
                </label>

                <div className="adnex-select-wrapper">

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select service
                    </option>

                    <option>Affiliate Marketing</option>
                    <option>Lead Generation</option>
                    <option>App Installs / CPI</option>
                    <option>Media Planning</option>
                    <option>SEO & Organic Growth</option>
                    <option>Paid Advertising</option>
                    <option>Social Media Management</option>
                    <option>Website Development</option>
                    <option>Mobile App Development</option>
                    <option>Branding & PR</option>
                    <option>Multiple Services</option>
                    <option>Not Sure Yet</option>

                  </select>

                  <span>⌄</span>

                </div>

              </div>

            </div>

            {/* =================================
                BUDGET
            ================================= */}

            <div className="adnex-field">

              <label>
                Monthly Budget
              </label>

              <div className="adnex-select-wrapper">

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >

                  <option value="">
                    Prefer not to say
                  </option>

                  <option>Under ₹1L / month</option>
                  <option>₹1L – ₹5L / month</option>
                  <option>₹5L – ₹20L / month</option>
                  <option>₹20L+ / month</option>
                  <option>Let’s discuss</option>

                </select>

                <span>⌄</span>

              </div>

            </div>

            {/* =================================
                MESSAGE
            ================================= */}

            <div className="adnex-field">

              <label>
                Message <span>*</span>
              </label>

              <textarea
                name="message"
                rows="4"
                placeholder="Tell us a little about your goals, challenges or project..."
                value={formData.message}
                onChange={handleChange}
                required
              />

            </div>

            {/* =================================
                CLOUDFLARE TURNSTILE
            ================================= */}

            <div className="adnex-turnstile-wrapper">

              <Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  onSuccess={(token) => {
    console.log("Turnstile success");
    setTurnstileToken(token);
  }}
  onError={() => {
    console.log("Turnstile error");
    setTurnstileToken("");
    setStatus(
      "Security verification failed. Please try again."
    );
  }}
  onExpire={() => {
    console.log("Turnstile expired");
    setTurnstileToken("");
  }}
/>

            </div>

            {/* =================================
                SECURITY NOTE
            ================================= */}

            <div className="adnex-security">

              <div className="adnex-security-check">
                ✓
              </div>

              <div>

                <strong>
                  Protected submission
                </strong>

                <span>
                  Your information is securely handled.
                </span>

              </div>

            </div>

            {/* =================================
                TURNSTILE REQUIRED
            ================================= */}

            {status === "turnstile-required" && (

              <div className="adnex-form-error">

                <strong>
                  Verification required.
                </strong>

                <span>
                  Please complete the security verification
                  before submitting.
                </span>

              </div>

            )}

            {/* =================================
                TURNSTILE ERROR
            ================================= */}

            {status === "turnstile-error" && (

              <div className="adnex-form-error">

                <strong>
                  Security verification failed.
                </strong>

                <span>
                  Please refresh the page and try again.
                </span>

              </div>

            )}

            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {status === "error" && (

              <div className="adnex-form-error">

                <strong>
                  Something went wrong.
                </strong>

                <span>
                  Please try again in a moment.
                </span>

              </div>

            )}

            {/* =================================
                SUBMIT BUTTON
            ================================= */}

            <button
              type="submit"
              className="adnex-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </span>

              <span className="adnex-submit-arrow">
                {loading ? "..." : "→"}
              </span>

            </button>

            <p className="adnex-privacy">
              Your details are kept private and never
              shared with third parties.
            </p>

          </form>

        </section>

      </div>

      {/* =====================================
          SUCCESS POPUP
      ===================================== */}

      {showSuccessPopup && (

        <div
          className="adnex-success-overlay"
          onClick={closeSuccessPopup}
        >

          <div
            className="adnex-success-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="adnex-success-close"
              onClick={closeSuccessPopup}
              aria-label="Close success message"
            >
              ×
            </button>

            <div className="adnex-success-icon">

              <svg
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <circle
                  cx="26"
                  cy="26"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M15 27L22 34L38 18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </div>

            <div className="adnex-success-content">

              <span className="adnex-success-label">
                MESSAGE RECEIVED
              </span>

              <h3>
                Message sent
                <br />
                <span>
                  successfully!
                </span>
              </h3>

              <p>
                Thanks for reaching out to Adnex Media.
                <br className="adnex-desktop-break" />
                We'll get back to you shortly.
              </p>

            </div>

            <button
              type="button"
              className="adnex-success-button"
              onClick={closeSuccessPopup}
            >

              <span>
                Continue
              </span>

              <span>
                →
              </span>

            </button>

            <div className="adnex-success-note">

              <span></span>

              Your enquiry has been securely received.

            </div>

          </div>

        </div>

      )}

    </main>
  );
};

export default Contact;