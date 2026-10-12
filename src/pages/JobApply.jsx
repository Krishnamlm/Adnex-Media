
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MapPin,
  Phone,
  Upload,
  User,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Footer from "../components/Footer/Footer";
/*
=========================================================
GOOGLE APPS SCRIPT URL
=========================================================

After creating your Google Apps Script, paste the
DEPLOYMENT URL between the quotes below.

Example:

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw3UXAMQa0j3OUDakMlgbTgdQ1no_ACaJMEld4i6a178bezIVWfAkIvvtqWEVBu4r1SFg/exec";
*/

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw3UXAMQa0j3OUDakMlgbTgdQ1no_ACaJMEld4i6a178bezIVWfAkIvvtqWEVBu4r1SFg/exec";


const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  location: "",
  portfolio: "",
  linkedin: "",
  message: "",
  resume: null,
  consent: false,
};


const JobApply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(initialFormData);


  /*
  ========================================================
  HANDLE INPUT CHANGE
  ========================================================
  */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] || null
          : value,
    }));

    setError("");
  };


  /*
  ========================================================
  SUBMIT APPLICATION
  ========================================================
  */

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (
    !GOOGLE_SCRIPT_URL ||
    GOOGLE_SCRIPT_URL === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
  ) {
    setError(
      "Application system is not configured yet. Please contact the administrator."
    );
    return;
  }

  if (!formData.resume) {
    setError("Please upload your resume.");
    return;
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (formData.resume.size > MAX_FILE_SIZE) {
    setError("Resume size must be less than 5 MB.");
    return;
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(formData.resume.type)) {
    setError("Please upload a PDF, DOC, or DOCX resume.");
    return;
  }

  try {
    setSubmitting(true);

    const resumeBase64 = await fileToBase64(formData.resume);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      position: formData.position,
      experience: formData.experience,
      location: formData.location.trim(),
      portfolio: formData.portfolio.trim(),
      linkedin: formData.linkedin.trim(),
      message: formData.message.trim(),
      consent: formData.consent,

      resumeName: formData.resume.name,
      resumeType: formData.resume.type,
      resumeData: resumeBase64,
    };

    console.log("Sending application to Google Apps Script...");

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log("Application request sent.");

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (err) {
    console.error("Application submission error:", err);

    setError(
      err?.message ||
        "Something went wrong while submitting your application. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};


  /*
  ========================================================
  SUCCESS SCREEN
  ========================================================
  */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f8fc] px-4 py-24 text-[#11162a] sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            className="w-full rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12"
          >

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">

              <CheckCircle2 className="h-10 w-10 text-emerald-500" />

            </div>


            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Application Received
            </p>


            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Thank you for applying!
            </h1>


            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Your application has been submitted successfully.
              Our team will review your profile and contact you
              if your experience matches an available opportunity.
            </p>


            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <a
                href="/careers"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#11162a] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Back to Careers

                <ArrowRight className="h-4 w-4" />

              </a>


              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(initialFormData);
                  setError("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50"
              >
                Submit Another Application
              </button>

            </div>

          </motion.div>

        </div>

      </main>
    );
  }


  /*
  ========================================================
  MAIN PAGE
  ========================================================
  */

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-[#11162a]">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-[-12%] top-[-15%] h-[500px] w-[500px] rounded-full bg-violet-300/25 blur-[140px]" />

          <div className="absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-blue-300/25 blur-[150px]" />

          <div className="absolute bottom-[-15%] left-[35%] h-[400px] w-[400px] rounded-full bg-cyan-200/30 blur-[140px]" />

          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(40,50,90,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(40,50,90,0.045)_1px,transparent_1px)] [background-size:44px_44px]" />

        </div>


        <div className="relative mx-auto max-w-5xl text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 shadow-sm backdrop-blur-xl"
          >

            <BriefcaseBusiness className="h-3.5 w-3.5" />

            Join AdNex Media

          </motion.div>


          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
          >

            Your next opportunity

            <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              could start here.
            </span>

          </motion.h1>


          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
          >
            Don't see a role that matches your profile?
            Send us your application anyway. Tell us about
            your skills, experience and the kind of opportunity
            you're looking for.
          </motion.p>

        </div>

      </section>


      {/* =====================================================
          APPLICATION FORM
      ===================================================== */}

      <section className="relative px-4 pb-24 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.5fr]">


            {/* =================================================
                LEFT INFO
            ================================================= */}

            <div className="lg:sticky lg:top-28 lg:self-start">

              <div className="rounded-[28px] bg-[#080b19] p-7 text-white shadow-xl sm:p-8">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">

                  <Sparkles className="h-5 w-5 text-violet-300" />

                </div>


                <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.03em]">
                  Send your application
                </h2>


                <p className="mt-4 text-sm leading-6 text-slate-400">
                  We're always interested in connecting with talented
                  people. Submit your profile and we'll keep your
                  application in mind for relevant opportunities.
                </p>


                <div className="mt-8 space-y-5">


                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">

                      <CheckCircle2 className="h-4 w-4 text-violet-300" />

                    </div>


                    <div>

                      <p className="text-sm font-semibold">
                        Share your skills
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Tell us what you can bring to the team.
                      </p>

                    </div>

                  </div>


                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">

                      <FileText className="h-4 w-4 text-violet-300" />

                    </div>


                    <div>

                      <p className="text-sm font-semibold">
                        Upload your resume
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Give our team a quick overview of your experience.
                      </p>

                    </div>

                  </div>


                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">

                      <Send className="h-4 w-4 text-violet-300" />

                    </div>


                    <div>

                      <p className="text-sm font-semibold">
                        Stay connected
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        We'll reach out when a relevant opportunity is available.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
            >

              <div className="mb-8">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                  Application Form
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                  Tell us about yourself
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Fields marked with * are required.
                </p>

              </div>


              {/* ERROR MESSAGE */}

              {error && (

                <div className="mb-7 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                  <p>{error}</p>

                </div>

              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >


                {/* =================================================
                    PERSONAL INFORMATION
                ================================================= */}

                <div>

                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#11162a]">

                    <User className="h-4 w-4 text-violet-600" />

                    Personal Information

                  </h3>


                  <div className="grid gap-5 sm:grid-cols-2">


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      />

                    </div>


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Email Address *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      />

                    </div>


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Phone Number *
                      </label>


                      <div className="relative">

                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />

                      </div>

                    </div>


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Current Location *
                      </label>


                      <div className="relative">

                        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Noida, Delhi"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    PROFESSIONAL INFORMATION
                ================================================= */}

                <div className="border-t border-slate-100 pt-7">

                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#11162a]">

                    <BriefcaseBusiness className="h-4 w-4 text-violet-600" />

                    Professional Information

                  </h3>


                  <div className="grid gap-5 sm:grid-cols-2">


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Position Applying For *
                      </label>


                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      >

                        <option value="">
                          Select a position
                        </option>

                        <option value="Frontend Developer">
                          Frontend Developer
                        </option>

                        <option value="Backend Developer">
                          Backend Developer
                        </option>

                        <option value="Full-Stack Developer">
                          Full-Stack Developer
                        </option>

                        <option value="Mobile App Developer">
                          Mobile App Developer
                        </option>

                        <option value="Data Analyst">
                          Data Analyst
                        </option>

                        <option value="Python Developer">
                          Python Developer
                        </option>

                        <option value="Java Developer">
                          Java Developer
                        </option>

                        <option value="C++ Developer">
                          C++ Developer
                        </option>

                        <option value="UI/UX Designer">
                          UI/UX Designer
                        </option>

                        <option value="Graphic Designer">
                          Graphic Designer
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Experience *
                      </label>


                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      >

                        <option value="">
                          Select experience
                        </option>

                        <option value="Fresher">
                          Fresher
                        </option>

                        <option value="0–1 Years">
                          0–1 Years
                        </option>

                        <option value="1–2 Years">
                          1–2 Years
                        </option>

                        <option value="2–3 Years">
                          2–3 Years
                        </option>

                        <option value="3–5 Years">
                          3–5 Years
                        </option>

                        <option value="5+ Years">
                          5+ Years
                        </option>

                      </select>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    PROFESSIONAL LINKS
                ================================================= */}

                <div className="border-t border-slate-100 pt-7">

                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#11162a]">

                    <ArrowUpRight className="h-4 w-4 text-violet-600" />

                    Professional Links

                  </h3>


                  <div className="grid gap-5 sm:grid-cols-2">


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Portfolio / Website
                      </label>

                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      />

                    </div>


                    <div>

                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        LinkedIn Profile
                      </label>

                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourname"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      />

                    </div>

                  </div>

                </div>


                {/* =================================================
                    RESUME
                ================================================= */}

                <div className="border-t border-slate-100 pt-7">

                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#11162a]">

                    <FileText className="h-4 w-4 text-violet-600" />

                    Resume

                  </h3>


                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition-all hover:border-violet-300 hover:bg-violet-50/50">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">

                      <Upload className="h-5 w-5 text-violet-600" />

                    </div>


                    <p className="mt-4 max-w-full truncate text-sm font-semibold text-slate-700">

                      {formData.resume
                        ? formData.resume.name
                        : "Upload your resume"}

                    </p>


                    <p className="mt-1 text-xs text-slate-400">
                      PDF, DOC or DOCX • Maximum 5 MB
                    </p>


                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleChange}
                      required
                      className="hidden"
                    />

                  </label>

                </div>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div className="border-t border-slate-100 pt-7">

                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Tell us about yourself *
                  </label>


                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your skills, experience, projects and the type of opportunity you are looking for..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />

                </div>


                {/* =================================================
                    CONSENT
                ================================================= */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />


                    <span className="text-xs leading-5 text-slate-500">

                      I confirm that the information provided by me is
                      accurate and I agree to be contacted by AdNex Media
                      regarding relevant job opportunities.

                    </span>

                  </label>

                </div>


                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#11162a] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >

                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application

                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                </button>


                <p className="text-center text-[11px] leading-5 text-slate-400">

                  By submitting this form, you agree to provide your
                  information for recruitment purposes.

                </p>

              </form>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-[#080b19] p-8 text-white sm:p-10">

          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">


            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                Explore Opportunities
              </p>


              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Looking for current openings?
              </h2>


              <p className="mt-2 text-sm text-slate-400">
                Check our careers page for available positions.
              </p>

            </div>


            <a
              href="/careers"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#080b19] transition-all hover:-translate-y-1 hover:bg-violet-50"
            >

              View Careers

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </a>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
};


/*
===========================================================
FILE → BASE64
===========================================================
*/

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => {

      const result = reader.result;

      /*
      Remove:

      data:application/pdf;base64,

      and keep only the actual Base64 string.
      */

      const base64 = result.split(",")[1];

      resolve(base64);
    };

    reader.onerror = () => {
      reject(
        new Error("Unable to read the resume file.")
      );
    };

    reader.readAsDataURL(file);

  });
};


export default JobApply;

