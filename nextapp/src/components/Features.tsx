"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "📱", title: "Real-Time Queue Updates", desc: "Patients can view wait times and queue position from their phones. Reduce anxiety and improve patient satisfaction." },
  { icon: "⚙️", title: "Ontario Health Integration", desc: "Seamlessly integrates with Ontario's healthcare systems. PHIPA compliant and designed for Canadian standards." },
  { icon: "📊", title: "Analytics Dashboard", desc: "Gain insights into patient flow, peak hours, and staff performance with comprehensive analytics." },
  { icon: "🔔", title: "Smart Notifications", desc: "Automated SMS and email notifications when it's almost the patient's turn. No more waiting room frustration." },
  { icon: "👥", title: "Multi-Language Support", desc: "Support for English and French, with easy addition of other languages for diverse Ontario communities." },
  { icon: "🕐", title: "Appointment Scheduling", desc: "Flexible booking system with walk-in and appointment options. Manage your clinic's schedule effortlessly." },
];

function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white p-8 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-500 cursor-default group overflow-hidden relative ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-50/0 group-hover:from-teal-50/50 group-hover:to-emerald-50/30 transition-all duration-500" />
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Built for Ontario Healthcare</h2>
          <p className="text-slate-500 text-lg">Our platform is designed specifically for the unique needs of Ontario&apos;s healthcare system, ensuring compliance and seamless integration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
