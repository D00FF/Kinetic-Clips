/* components/kineticclips.tsx */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function MailtoButton({ subject, className = "" }: { subject: string; className?: string }) {
  const mail = `mailto:hello@kineticclips.com?subject=${encodeURIComponent(subject)}`;
  return (
    <a
      href={mail}
      className={`btn ${className} relative overflow-hidden`}
      aria-label="Email Kinetic Clips"
      style={{
        background:
          "linear-gradient(90deg, rgb(var(--kc-cta)), rgb(var(--kc-accent)))",
        color: "rgb(var(--kc-bg))",
      }}
    >
      <span className="relative z-10">Get the $99 Trial</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-200"
        style={{
          background:
            "radial-gradient(120% 120% at 10% 10%, rgba(255,255,255,0.35), transparent 40%)",
        }}
      />
    </a>
  );
}

export default function KineticClips() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);

  // scroll states
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const h = document.documentElement;
      const p = (y / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${id}`)),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // close mobile on resize/scroll
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  const year = new Date().getFullYear();

  return (
    <div className="relative">
      <BackgroundCanvas />

      {/* Sticky header with progress bar */}
      <header
        className={`sticky top-0 z-50 backdrop-blur transition-colors ${
          scrolled ? "bg-[rgb(12_13_24/0.8)] border-b border-[rgb(238_241_245/0.10)]" : "bg-[rgb(12_13_24/0.45)]"
        }`}
      >
        {/* progress bar */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06))",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[3px] transition-[width]"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, rgb(var(--kc-accent)), rgb(var(--kc-cta)))",
            boxShadow: "0 0 10px rgba(56,189,248,0.5), 0 0 18px rgba(16,185,129,0.35)",
          }}
        />

        <nav className="section flex items-center justify-between py-3">
          <a href="#" className="group flex items-center gap-2" aria-label="Kinetic Clips home">
            <LogoSpark className="h-5 w-5" />
            <span className="font-heading text-lg tracking-tight">Kinetic Clips</span>
          </a>

          <button
            className="sm:hidden btn btn-secondary px-3 py-2"
            aria-label="Toggle navigation"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon />
          </button>

          <div className="hidden sm:flex items-center gap-6">
            <ul className="hidden sm:flex items-center gap-1 text-sm">
              {NAV_LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`group relative rounded-lg px-3 py-2 text-[rgb(var(--kc-fg)/0.85)] hover:text-[rgb(var(--kc-fg))] transition`}
                    >
                      <span className="relative z-10">{l.label}</span>
                      {/* hover/active glow */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 -z-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100`}
                        style={{
                          background:
                            "radial-gradient(120% 120% at 50% 0%, rgba(56,189,248,0.15), rgba(16,185,129,0.12) 40%, transparent 60%)",
                        }}
                      />
                      {/* active underline */}
                      <span
                        className={`absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full transition-all ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                        }`}
                        style={{
                          background:
                            "linear-gradient(90deg, rgb(var(--kc-accent)), rgb(var(--kc-cta)))",
                          boxShadow:
                            "0 0 10px rgba(56,189,248,0.5), 0 0 18px rgba(16,185,129,0.35)",
                        }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <MailtoButton subject="Kinetic Clips [TRIAL]" />
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div id="mobile-menu" className="sm:hidden border-t border-[rgb(238_241_245/0.10)]">
            <div className="section py-3">
              <ul className="grid gap-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="block rounded-lg px-3 py-2 transition hover:bg-[rgb(22_25_42)]"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <MailtoButton subject="Kinetic Clips [TRIAL]" className="w-full" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="section relative pt-16 sm:pt-24 pb-16">
        <HeroArt />
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(238_241_245/0.14)] bg-[rgb(22_25_42)] px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ background: "rgb(var(--kc-cta))" }} />
            48h delivery • $99 refundable trial
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl leading-tight tracking-tight mt-5">
            <span className="kc-gradient-text">High-energy short-form ads</span> that convert.
          </h1>
          <p className="mt-5 text-[rgb(var(--kc-fg)/0.86)]">
            We script, shoot, and ship UGC & affiliate videos engineered for hooks, watch-time, and ROAS.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <MailtoButton subject="Kinetic Clips [TRIAL]" />
            <a href="#pricing" className="btn btn-secondary" aria-label="View pricing">
              See pricing
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            {["Hook-first scripting", "Creator casting", "Captions + SFX"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(238_241_245/0.14)] bg-[rgb(22_25_42)] px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* Services */}
      <section id="services" className="section py-16 sm:py-24">
        <HeaderEyebrow title="Services" subtitle="Conversion-first creative. We test hooks and iterate fast." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={<IconCamera />}
            title="UGC Ad Production"
            copy="Scripted UGC with creator casting, shot lists, and on-brand assets for TikTok, Reels, Shorts."
            bullets={["Hook-led scripts & beats", "Creator casting & direction", "On-screen captions & CTAs"]}
          />
          <ServiceCard
            icon={<IconFunnel />}
            title="Affiliate Video Funnels"
            copy="Organic-looking affiliate content that warms audiences and routes buyers to high-intent landers."
            bullets={["POV demos & social proof", "Multi-variant hooks", "Descriptions & link copy"]}
          />
          <ServiceCard
            icon={<IconScissors />}
            title="Editing & Hook Labs"
            copy="We reshape raw assets into scroll-stopping cuts with captioning, sound design, and motion."
            bullets={["A/B hook boards", "Motion, SFX, meme beats", "Brand kit & templates"]}
          />
        </div>
        <SectionDivider />
      </section>

      {/* Work */}
      <section id="work" className="section py-16 sm:py-24">
        <HeaderEyebrow title="Work" subtitle="Interactive placeholders—pure CSS/SVG. Hover to preview motion." />
        <PortfolioGrid />
        <SectionDivider />
      </section>

      {/* Process */}
      <section className="section py-16 sm:py-24">
        <HeaderEyebrow title="Process" subtitle="From brief to delivery in 48 hours." />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { t: "Brief", d: "Share product, audience, and KPIs. We align on goals & voice." },
            { t: "Hooks", d: "We pitch high-probability hooks and scripts for approval." },
            { t: "Shoot", d: "Creators film with shot lists; we edit, caption, and sound design." },
            { t: "Delivery in 48h", d: "Final cuts delivered with export presets and thumbnails." },
          ].map((s, idx) => (
            <li
              key={s.t}
              className="group relative overflow-hidden rounded-2xl border border-[rgb(238_241_245/0.12)] bg-[rgb(18_20_35)] p-6 transition hover:bg-[rgb(22_25_42)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl text-[rgb(var(--kc-accent))]"
                style={{ background: "rgba(56,189,248,0.15)" }}>
                {idx + 1}
              </span>
              <h3 className="mt-3 font-heading text-lg group-hover:kc-gradient-text">{s.t}</h3>
              <p className="text-sm text-[rgb(var(--kc-fg)/0.82)] mt-1">{s.d}</p>

              {/* corner glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(56,189,248,0.22), rgba(99,102,241,0.18), transparent)",
                }}
              />
            </li>
          ))}
        </ol>
        <SectionDivider />
      </section>

      {/* Pricing */}
      <section id="pricing" className="section py-16 sm:py-24">
        <HeaderEyebrow title="Pricing" subtitle="Transparent packages. Choose a tier and upgrade anytime." />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <PricingCard
            label="Starter"
            price="$299"
            meta="5 assets"
            bullets={["Hook-first scripting", "Captions + SFX", "Basic usage rights", "Export presets (9:16)"]}
            href="mailto:hello@kineticclips.com?subject=Kinetic%20Clips%20[STARTER]"
          />
          <PricingCard
            featured
            label="Trial"
            price="$99"
            meta="3 assets • 48h"
            note="Refunded if unused"
            bullets={["3 ad concepts (hook variants)", "48-hour delivery", "Refund-guaranteed if unused", "Basic usage rights"]}
            href="mailto:hello@kineticclips.com?subject=Kinetic%20Clips%20[TRIAL]"
          />
          <PricingCard
            label="Scale"
            price="$999"
            meta="20 assets"
            bullets={["Advanced iteration & hook labs", "Creator casting", "Usage rights + whitelisting options", "Priority 48-hour delivery"]}
            href="mailto:hello@kineticclips.com?subject=Kinetic%20Clips%20[SCALE]"
          />
        </div>
        <SectionDivider />
      </section>

      {/* FAQ */}
      <section id="faq" className="section py-16 sm:py-24">
        <HeaderEyebrow title="FAQ" subtitle="Everything you need to know." />
        <div className="mt-6 grid gap-4">
          {FAQ_ITEMS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-[rgb(238_241_245/0.12)] bg-[rgb(18_20_35)] p-6 open:shadow-lg transition"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">
                <span>{f.q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-[rgb(var(--kc-fg)/0.86)]">{f.a}</p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] opacity-0 transition-opacity group-open:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(var(--kc-accent)), rgb(var(--kc-cta)))",
                  boxShadow:
                    "0 0 10px rgba(56,189,248,0.45), 0 0 16px rgba(16,185,129,0.35)",
                }}
              />
            </details>
          ))}
        </div>
        <SectionDivider />
      </section>

      {/* Contact */}
      <section id="contact" className="section py-16 sm:py-24">
        <div className="rounded-2xl border border-[rgb(238_241_245/0.12)] bg-[rgb(22_25_42)] p-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl">Ready to ship ads that convert?</h2>
          <p className="mt-3 text-[rgb(var(--kc-fg)/0.86)]">
            Tell us about your product and goals—we’ll reply with hooks within a day.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:hello@kineticclips.com" className="btn btn-cta" aria-label="Email Kinetic Clips">
              hello@kineticclips.com
            </a>
            <a href="#" className="btn btn-secondary" aria-label="Back to top">
              Back to top
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section py-10 border-t border-[rgb(238_241_245/0.10)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>© {year} Kinetic Clips</p>
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative rounded px-3 py-2 text-[rgb(var(--kc-fg)/0.85)] hover:text-[rgb(var(--kc-fg))] transition ${
                    active === l.href ? "text-[rgb(var(--kc-fg))]" : ""
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full transition-all ${
                      active === l.href ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(var(--kc-accent)), rgb(var(--kc-cta)))",
                      boxShadow:
                        "0 0 10px rgba(56,189,248,0.45), 0 0 16px rgba(16,185,129,0.35)",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <ScrollTopFab />
    </div>
  );
}

/* ---------- Background Art (pure CSS) ---------- */
function BackgroundCanvas() {
  return (
    <>
      {/* large washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-30"
        style={{
          background:
            "radial-gradient(1000px 700px at 85% -10%, rgba(56,189,248,0.16), transparent 60%), radial-gradient(900px 650px at 12% 10%, rgba(99,102,241,0.12), transparent 60%), radial-gradient(900px 600px at 50% 110%, rgba(16,185,129,0.10), transparent 60%)",
        }}
      />
      {/* spinning conic */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 opacity-30"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,0.12), rgba(99,102,241,0.10), rgba(16,185,129,0.10), rgba(56,189,248,0.12))",
          maskImage:
            "radial-gradient(1000px 1000px at 50% 50%, black 35%, transparent 70%)",
          animation: "spin 24s linear infinite",
        }}
      />
      {/* subtle grid via data-URI */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8," +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M0 0.5H28" stroke="rgba(238,241,245,0.14)" stroke-width="1"/>
                <path d="M0 14.5H28" stroke="rgba(238,241,245,0.14)" stroke-width="1"/>
                <path d="M0 27.5H28" stroke="rgba(238,241,245,0.14)" stroke-width="1"/>
                <path d="M0.5 0V28" stroke="rgba(238,241,245,0.14)" stroke-width="1"/>
                <path d="M14.5 0V28" stroke="rgba(238,241,245,0.14)" stroke-width="1"/>
                <path d="M27.5 0V28" stroke="rgba(238,241,245,0.14)" stroke-width="1"/>
              </svg>`
            ) +
            "')",
        }}
      />
      <style jsx global>{`
        @keyframes spin { to { transform: rotate(1turn); } }
      `}</style>
    </>
  );
}

/* ---------- Hero Art (pure CSS + SVG) ---------- */
function HeroArt() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Orb top={110} left={-60} size={280} color="rgba(56,189,248,0.55)" delay="0s" />
      <Orb bottom={80} right={-80} size={360} color="rgba(99,102,241,0.5)" delay="4s" />
      <Orb bottom={260} left="40%" size={220} color="rgba(16,185,129,0.45)" delay="9s" />
      <RibbonWave />
    </div>
  );
}

function Orb(props: {
  size: number;
  color: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  delay?: string;
}) {
  const { size, color, top, left, right, bottom, delay = "0s" } = props;
  return (
    <div
      className="kc-orb -z-10"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        animationDelay: delay,
        background: `radial-gradient(circle at 50% 50%, ${color}, rgba(0,0,0,0) 60%)`,
      }}
      aria-hidden="true"
    />
  );
}

function RibbonWave() {
  return (
    <svg
      aria-hidden="true"
      className="mx-auto mt-[-6rem] hidden w-[1100px] max-w-none opacity-20 sm:block"
      viewBox="0 0 1100 300"
      fill="none"
    >
      <defs>
        <linearGradient id="r1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgb(var(--kc-accent))" stopOpacity="0.7" />
          <stop offset="1" stopColor="rgb(var(--kc-cta))" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="r2" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="rgb(var(--kc-accent-2))" stopOpacity="0.5" />
          <stop offset="1" stopColor="rgb(var(--kc-accent))" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M-50 120 C 150 60, 350 180, 550 120 S 950 60, 1150 120"
        stroke="url(#r1)"
        strokeWidth="40"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M-50 180 C 150 120, 350 240, 550 180 S 950 120, 1150 180"
        stroke="url(#r2)"
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ---------- Section divider (thin neon rule) ---------- */
function SectionDivider() {
  return (
    <div
      className="mx-auto mt-14 w-full max-w-6xl"
      style={{
        height: 1,
        background:
          "linear-gradient(90deg, transparent, rgba(56,189,248,0.35), rgba(16,185,129,0.35), transparent)",
        boxShadow:
          "0 0 10px rgba(56,189,248,0.35), 0 0 12px rgba(16,185,129,0.25)",
      }}
    />
  );
}

/* ---------- Reusable bits ---------- */
function HeaderEyebrow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="font-heading text-3xl sm:text-4xl">{title}</h2>
      <p className="mt-2 text-[rgb(var(--kc-fg)/0.85)] max-w-3xl">{subtitle}</p>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  copy,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  bullets: string[];
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[rgb(238_241_245/0.12)] bg-[rgb(18_20_35)] p-6 transition hover:bg-[rgb(22_25_42)]">
      {/* animated corner glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.22), rgba(99,102,241,0.18), transparent)",
        }}
      />
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-heading text-xl">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-[rgb(var(--kc-fg)/0.86)]">{copy}</p>
      <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-[rgb(var(--kc-fg)/0.92)]">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function PricingCard({
  featured,
  label,
  price,
  meta,
  note,
  bullets,
  href,
}: {
  featured?: boolean;
  label: string;
  price: string;
  meta: string;
  note?: string;
  bullets: string[];
  href: string;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-[rgb(238_241_245/0.12)] bg-[rgb(18_20_35)] p-6 transition ${
        featured ? "ring-2 ring-[rgb(var(--kc-accent))]" : "hover:bg-[rgb(22_25_42)]"
      }`}
    >
      {featured && (
        <span className="absolute right-4 top-4 rounded-full border border-[rgb(238_241_245/0.2)] bg-[rgb(12_13_24/0.4)] px-2 py-0.5 text-xs">
          Best for first-timers
        </span>
      )}
      <h3 className="font-heading text-xl">{label}</h3>
      <p className="mt-1 text-sm text-[rgb(var(--kc-fg)/0.78)]">{note ?? " "}</p>
      <p className="mt-4 text-3xl font-heading">{price}</p>
      <p className="text-xs text-[rgb(var(--kc-fg)/0.7)]">{meta}</p>
      <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-[rgb(var(--kc-fg)/0.92)]">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          className={`btn ${featured ? "w-full" : "btn-secondary w-full"}`}
          href={href}
          style={
            featured
              ? {
                  background:
                    "linear-gradient(90deg, rgb(var(--kc-cta)), rgb(var(--kc-accent)))",
                  color: "rgb(var(--kc-bg))",
                }
              : undefined
          }
        >
          {featured ? "Start Trial" : `Choose ${label}`}
        </a>
      </div>

      {/* decorative sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.25), rgba(99,102,241,0.15), rgba(0,0,0,0))",
        }}
      />
    </article>
  );
}

function PortfolioGrid() {
  const posters = useMemo(
    () => [
      { cap: "Hook-First Demo" },
      { cap: "POV Social Proof" },
      { cap: "Before / After" },
      { cap: "Unboxing + CTA" },
      { cap: "Problem → Solution" },
      { cap: "Testimonial Mashup" },
    ],
    []
  );

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posters.map((p) => (
        <TiltCard key={p.cap}>
          <figure className="group relative overflow-hidden rounded-2xl border border-[rgb(238_241_245/0.12)] bg-[rgb(18_20_35)]">
            <PosterSVG />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[rgb(0_0_0/0.45)] px-4 py-3 text-sm backdrop-blur">
              {p.cap}
            </figcaption>
            {/* Hover overlay */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="rounded-full bg-[rgb(var(--kc-fg)/0.10)] p-3 ring-1 ring-[rgb(var(--kc-fg)/0.2)]">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </figure>
        </TiltCard>
      ))}
    </div>
  );
}

/* Programmatic poster (pure SVG) */
function PosterSVG() {
  return (
    <svg viewBox="0 0 800 600" className="h-64 w-full object-cover">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <mask id="vignette">
          <rect width="800" height="600" fill="white" />
          <rect x="-50" y="-50" width="900" height="700" rx="40" ry="40" fill="black" opacity="0.12" />
        </mask>
        <pattern id="diag" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 24 L24 0" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
        </pattern>
      </defs>

      <rect width="800" height="600" fill="url(#g1)" />
      <rect width="800" height="600" fill="url(#g2)" />
      <rect width="800" height="600" fill="url(#diag)" />
      <rect width="800" height="600" mask="url(#vignette)" fill="black" opacity="0.16" />
      <g transform="translate(30,30)">
        <rect width="130" height="36" rx="18" fill="rgba(0,0,0,0.35)" />
        <circle cx="18" cy="18" r="6" fill="rgb(56,189,248)" />
        <text x="34" y="23" fontSize="14" fill="white" fontFamily="system-ui, -apple-system, Segoe UI, Roboto">
          HOOK TEST
        </text>
      </g>
    </svg>
  );
}

/* Tilt effect with safe guards */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height - 0.5) * -6).toFixed(2);
      const ry = ((x / rect.width - 0.5) * 6).toFixed(2);
      node.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function reset() {
      const node = ref.current;
      if (!node) return;
      node.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    }

    const node = ref.current;
    if (!node) return;

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", reset);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className="transition-transform duration-150">
      {children}
    </div>
  );
}

/* Scroll-to-top floating action button */
function ScrollTopFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 rounded-full p-3 text-[rgb(var(--kc-bg))] shadow-lg transition hover:translate-y-[-2px]"
      style={{
        background:
          "linear-gradient(90deg, rgb(var(--kc-accent)), rgb(var(--kc-cta)))",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.35), 0 0 22px rgba(56,189,248,0.45)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5l7 7m-7-7L5 12" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </button>
  );
}

/* -------- Icons (inline SVG) -------- */
function LogoSpark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--kc-accent))" />
          <stop offset="1" stopColor="rgb(var(--kc-cta))" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#lg)" opacity="0.25" />
      <path
        d="M12 4l1.6 3.8L18 9.2l-3.6 2 1 4.1L12 13.7 8.6 15.3l1-4.1L6 9.2l4.4-1.4L12 4z"
        fill="url(#lg)"
      />
    </svg>
  );
}
function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconCamera() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-[rgb(var(--kc-accent))]">
      <path
        d="M4 7h3l1.2-2.4A1 1 0 0 1 9.1 4h5.8a1 1 0 0 1 .9.6L17 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" fill="none" strokeWidth="1.6" />
    </svg>
  );
}
function IconFunnel() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-[rgb(var(--kc-accent-2))]">
      <path
        d="M3 5h18l-7 8v5l-4 2v-7L3 5Z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconScissors() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-[rgb(var(--kc-cta))]">
      <path d="M14 7l7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" fill="none" strokeWidth="1.6" />
      <circle cx="6.5" cy="17.5" r="2.5" stroke="currentColor" fill="none" strokeWidth="1.6" />
      <path d="M12 12L9 9m3 3l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* -------- FAQ Data -------- */
const FAQ_ITEMS = [
  { q: "Do I own usage rights for the ads?", a: "Packages include standard organic usage rights for 6 months. Paid ad whitelisting and extended terms are available on request." },
  { q: "What is ad whitelisting?", a: "We can authorize your brand to run creator-handled ads from our accounts, improving social proof and CTR. Managed via platform permissions." },
  { q: "How many revisions are included?", a: "Two rounds of edits per asset (timing, captions, trims). Script pivots or reshoots may add scope." },
  { q: "How fast is delivery?", a: "Trial delivers in 48 hours. Starter and Scale typically deliver within 3–7 days depending on creator casting and rounds." },
  { q: "Which verticals do you serve?", a: "E-commerce, DTC, SaaS, apps, and info products. We match creators to audience and brand voice." },
  { q: "How do payments & refunds work?", a: "Invoices via Stripe. Trial is refunded if unused within 7 days. Deposits apply to larger scopes." },
];
