"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// ==================== STATS ====================
const stats = [
  { icon: "🏥", value: "200+", label: "Healthcare Facilities" },
  { icon: "👨‍⚕️", value: "1,500+", label: "Healthcare Providers" },
  { icon: "📅", value: "2M+", label: "Appointments Managed" },
  { icon: "⭐", value: "4.9/5", label: "Patient Satisfaction" },
];

export function Stats() {
  return (
    <section className="bg-teal-700 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 group">
              <span className="text-3xl">{icon}</span>
              <span className="text-4xl font-bold text-white group-hover:scale-110 transition-transform">{value}</span>
              <span className="text-teal-100 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== SERVICES ====================
const services = [
  { title: "Clinic Management", desc: "Complete practice management solution for walk-in clinics and family health teams across Ontario." },
  { title: "Hospital Queue System", desc: "Enterprise-grade queue management for emergency rooms, outpatient clinics, and diagnostic centers." },
  { title: "Virtual Queue", desc: "Patients can join queues remotely and receive notifications when it's time to arrive. Perfect for modern healthcare." },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4">
            Our Services
          </span>
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Comprehensive Healthcare Solutions</h2>
          <p className="text-slate-500 text-lg">From small clinics to large hospitals, we have solutions tailored to your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl shadow overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-br from-teal-600 to-emerald-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 mb-4">{s.desc}</p>
                <a href="#contact" className="text-teal-700 font-semibold text-sm hover:text-teal-900 transition-colors">Learn more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== TESTIMONIALS ====================
const testimonials = [
  { text: '"ONCareQueue has transformed how we manage patient flow. Our wait times have decreased by 40% and patient satisfaction has never been higher."', name: "Dr. James Wilson", title: "Medical Director, Toronto Family Health Team" },
  { text: '"The integration with our existing systems was seamless. The PHIPA compliance gave us peace of mind, and the support team is fantastic."', name: "Sarah Mitchell", title: "Operations Manager, Ottawa Medical Clinic" },
  { text: '"Our patients love the SMS notifications. They can run errands instead of sitting in the waiting room. It\'s a game-changer for everyone."', name: "Dr. Linda Chen", title: "Clinic Owner, Hamilton Wellness Center" },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl font-bold text-slate-900">Trusted by Ontario Healthcare</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-4 left-6 text-7xl font-serif text-teal-100 leading-none select-none">&ldquo;</div>
              <div className="text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-slate-600 italic leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== CTA ====================
export function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setEmail("");
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl font-bold text-white mb-4">Ready to Transform Your Practice?</h2>
        <p className="text-slate-300 text-lg mb-10">
          Join hundreds of Ontario healthcare providers who trust ONCareQueue to streamline their patient flow.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 max-w-xs px-5 py-3 rounded-xl border-0 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
          />
          <Button
            type="submit"
            size="lg"
            className={`${submitted ? "bg-emerald-500 hover:bg-emerald-500" : "bg-teal-500 hover:bg-teal-400"} text-white transition-all`}
          >
            {submitted ? "✓ You're on the list!" : "Request Demo"}
          </Button>
        </form>
        <p className="text-slate-500 text-sm">Free consultation. No commitment required.</p>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <span>🏥</span>
              <span>ONCareQueue</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Ontario&apos;s leading healthcare queue management solution. Built with care for Canadian healthcare.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Services", "Pricing", "Security"] },
            { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "PHIPA Compliance", "Accessibility"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-slate-400 text-sm hover:text-white hover:pl-2 transition-all">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">© 2026 ONCareQueue. All rights reserved. Made with ❤️ in Ontario, Canada.</p>
        </div>
      </div>
    </footer>
  );
}
