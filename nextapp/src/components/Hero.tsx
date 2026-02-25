"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const QUEUE_NAMES = ["Emma Thompson", "Liam Patel", "Olivia Chen", "Noah Williams", "Aisha Malik", "Lucas Brown"];

const initialQueue = [
  { id: "001", name: "John Smith", wait: 5, status: "ready" as const },
  { id: "002", name: "Sarah Johnson", wait: 12, status: "waiting" as const },
  { id: "003", name: "Michael Chen", wait: 18, status: "waiting" as const },
  { id: "004", name: "Emily Davis", wait: 25, status: "waiting" as const },
];

type QueueEntry = { id: string; name: string; wait: number; status: "ready" | "waiting" };

export default function Hero() {
  const [queue, setQueue] = useState<QueueEntry[]>(initialQueue);
  const [nameIndex, setNameIndex] = useState(0);
  const [badgeText, setBadgeText] = useState("Ontario's Leading Healthcare Platform");
  const heroRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for badge
  useEffect(() => {
    const texts = [
      "Ontario's Leading Healthcare Platform",
      "Find Doctors Accepting New Patients",
      "Real-Time Wait Time Updates",
      "PHIPA Compliant & Secure",
    ];
    let idx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const current = texts[idx];
      if (deleting) {
        setBadgeText(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setBadgeText(current.substring(0, charIdx + 1));
        charIdx++;
      }
      let speed = deleting ? 40 : 80;
      if (!deleting && charIdx === current.length) { speed = 2000; deleting = true; }
      else if (deleting && charIdx === 0) { deleting = false; idx = (idx + 1) % texts.length; speed = 400; }
      setTimeout(tick, speed);
    };

    const t = setTimeout(tick, 1000);
    return () => clearTimeout(t);
  }, []);

  // Queue simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setQueue((prev) => {
        const next = [...prev];
        const newName = QUEUE_NAMES[nameIndex % QUEUE_NAMES.length];
        const lastId = parseInt(next[next.length - 1].id) + 1;
        next.shift();
        return [
          { ...next[0], status: "ready", wait: 0 },
          ...next.slice(1).map((p, i) => ({ ...p, wait: (i + 1) * 6 + Math.floor(Math.random() * 3) })),
          { id: String(lastId).padStart(3, "0"), name: newName, wait: 30, status: "waiting" },
        ];
      });
      setNameIndex((n) => n + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [nameIndex]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-emerald-50/60 to-slate-50 -z-10" />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />

      <div className="max-w-[1500px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1.2fr] gap-8 items-center">
        {/* Left: Content */}
        <div className="animate-fade-in-up space-y-6">
          <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 border-0 py-1.5 px-4 text-sm font-semibold">
            {badgeText}
          </Badge>
          <h1 className="font-serif text-5xl font-bold text-slate-900 leading-tight">
            Transforming Patient Care in{" "}
            <span className="bg-gradient-to-r from-teal-700 to-emerald-500 bg-clip-text text-transparent">
              Ontario
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg">
            Streamline your healthcare practice with our cutting-edge queue management system. Built for Ontario clinics, hospitals, and medical professionals.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-teal-700 hover:bg-teal-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              <Link href="#contact">Request Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-all">
              <Link href="/sign-in">Try the Dashboard</Link>
            </Button>
          </div>
          <div className="flex gap-10 pt-4">
            {[
              { num: "50K+", label: "Patients Served" },
              { num: "200+", label: "Ontario Clinics" },
              { num: "4.9/5", label: "⭐ Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-bold text-teal-700">{num}</span>
                <span className="text-sm text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Doctor Image */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-full max-w-[420px] h-[550px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
              alt="Welcoming Canadian Doctor"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-xl px-4 py-3 text-center text-teal-700 font-semibold text-sm shadow-md">
              🏥 Ontario&apos;s Trusted Healthcare Platform
            </div>
          </div>
        </div>

        {/* Right: Live Queue Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[380px] overflow-hidden animate-float">
            <div className="bg-slate-100 px-4 py-3 flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-700 mb-2">Live Queue — Toronto Family Clinic</h3>
              {queue.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                    entry.status === "ready" ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50"
                  }`}
                >
                  <span className="font-bold text-teal-700 text-sm w-8">{entry.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{entry.name}</p>
                    <p className="text-xs text-slate-400">
                      {entry.wait === 0 ? "Being seen now" : `Wait: ~${entry.wait} min`}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      entry.status === "ready"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {entry.status === "ready" ? "Ready ✓" : "Waiting"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
