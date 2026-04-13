import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

import useReveal    from "../hooks/useReveal";
import PageHero     from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Button       from "../components/common/Button";

const OFFICES = [
  {
    label  : "Head Office",
    company: "AGNIHOTRIS INTERNATIONAL",
    address: "Corp.off.:105, 1st floor, Sai Shradha CHS, Goregaon west, Mumbai-400062",
    phone  : "+91 9598753567, +91 8318544070",
    email  : "info@Caalburnnutrition.com",
  },
  {
    label  : "East India Office",
    company: "AGNIHOTRIS INTERNATIONAL",
    address: "114 A, Dhan Devi Khanna Road, Near Chanditala, Phoolbagan, Kolkata-700054",
    phone  : "+91 9598753567, +91 8318544070",
    email  : "info@Caalburnnutrition.com",
  },
  {
    label  : "North India Office",
    company: "AGNIHOTRIS INTERNATIONAL",
    address: "120/766 Lajpat Nagar Narayan Purwa, Kanpur-208005",
    phone  : "+91 9598753567, +91 8318544070",
    email  : null,
  },
  {
    label  : "Factory Address",
    company: "AGNIHOTRIS INTERNATIONAL",
    address: "Plot No. 7&8 Industrial Area, Bithoor Road, Mandna (U.P.)",
    phone  : "+91 9598753567, +91 8318544070",
    email  : null,
  },
];

const INITIAL = { name: "", email: "", subject: "", mobile: "", message: "" };

export default function Contact() {
  useReveal();
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm(INITIAL);
    }, 1200);
  };

  const inputBase =
    "w-full bg-transparent border-b border-gray-300 focus:border-brand-500 py-2.5 text-dark-800 text-sm placeholder-dark-300 outline-none transition-colors duration-200 font-body";

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Have a question about our products? We're here to help."
      />

      {/* ── Main ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* ── Left: offices ── */}
            <div className="reveal">
              <SectionTitle eyebrow="Offices" heading="Contact Information" />

              <div className="space-y-8">
                {OFFICES.map((o) => (
                  <div key={o.label} className="border-b border-gray-100 pb-8 last:border-0">
                    <p className="font-display text-xl text-dark-900 mb-0.5">{o.label}</p>
                    <p className="text-brand-500 text-xs font-bold uppercase tracking-wide mb-3">
                      {o.company}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={14} className="text-brand-500 mt-0.5 flex-shrink-0" />
                        <p className="text-dark-500 text-sm leading-snug">{o.address}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone size={14} className="text-brand-500 flex-shrink-0" />
                        <a href="tel:+919598753567" className="text-brand-600 hover:text-brand-700 text-sm transition-colors">
                          {o.phone}
                        </a>
                      </div>
                      {o.email && (
                        <div className="flex items-center gap-2.5">
                          <Mail size={14} className="text-brand-500 flex-shrink-0" />
                          <a href={`mailto:${o.email}`} className="text-brand-600 hover:text-brand-700 text-sm transition-colors">
                            {o.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Business hours */}
                <div>
                  <p className="font-display text-xl text-dark-900 mb-2">Business Hours</p>
                  <p className="text-dark-500 text-sm">Mon–Sat: 8:00am – 8:00pm</p>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="reveal delay-200">
              <SectionTitle eyebrow="Send A Message" heading="We'd Love To Hear From You" />

              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <CheckCircle size={56} className="text-green-500" />
                  <p className="font-display text-3xl text-dark-900">Message Sent!</p>
                  <p className="text-dark-400 text-sm">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSuccess(false)} variant="outline" size="md">
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Row: name + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputBase}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  {/* Mobile */}
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile (optional)"
                      value={form.mobile}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputBase} resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Message <Send size={14} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl overflow-hidden h-64 bg-dark-800 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin size={32} className="text-brand-500 mx-auto mb-2" />
              <p className="font-display text-2xl">Mumbai, Maharashtra</p>
              <p className="text-dark-300 text-sm mt-1">
                Corp.off.:105, 1st floor, Sai Shradha CHS, Goregaon West
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
