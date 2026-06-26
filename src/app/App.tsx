import { useState, useEffect } from "react";
import { Menu, X, Check, ArrowRight, ChevronDown, MapPin, Mail, Globe } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  useLang,
  type Lang,
  PRIMARY_EMAIL,
  LAUNCH_ZONES,
} from "./i18n";
import { CATEGORY_ICONS } from "./category-icons";
import activaLogo from "../../assets/Activa_Logo.png";
import yogaCR from "../../assets/yogaCR.jpg";
import SabanaAbove from "../../assets/SabanaAbove.webp";
import PilatesCR from "../../assets/PilatesCR.jpg";

// ── HELPERS ─────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
      {children}
    </p>
  );
}

function BulletItem({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Check size={14} className={`mt-0.5 shrink-0 ${dark ? "text-secondary" : "text-secondary-foreground"}`} />
      <span className={`text-sm leading-relaxed ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
        {text}
      </span>
    </div>
  );
}

function WhatsAppIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

// ── LANGUAGE PICKER (forced on first visit) ─────────────────────
function LanguagePicker() {
  const { showPicker, choose } = useLang();
  if (!showPicker) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/90 backdrop-blur-sm px-6">
      <div className="w-full max-w-md bg-background border border-border p-10 text-center">
        <div className="flex items-center justify-center mb-8">
          <img src={activaLogo} alt="Activa" className="h-10 w-auto" />
        </div>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">
          Choose your language
        </p>
        <p className="text-sm text-muted-foreground mb-8">Elige tu idioma</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => choose("en")}
            className="inline-flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground text-sm tracking-wide font-medium hover:bg-foreground/80 transition-colors group"
          >
            English
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => choose("es")}
            className="inline-flex items-center justify-center gap-2 py-4 border border-border text-foreground text-sm tracking-wide hover:border-foreground transition-colors"
          >
            Español
          </button>
        </div>
      </div>
    </div>
  );
}

// ── LANGUAGE TOGGLE (top right, switch anytime) ─────────────────
function LanguageToggle({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useLang();
  const next: Lang = lang === "en" ? "es" : "en";
  const idle = !scrolled;
  return (
    <button
      onClick={() => setLang(next)}
      aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs tracking-wide transition-colors ${
        idle
          ? "border-white/30 text-white hover:border-white/60"
          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
      }`}
    >
      <Globe size={13} />
      <span className="font-medium">{lang === "en" ? "EN" : "ES"}</span>
      <span className="opacity-50">/</span>
      <span>{lang === "en" ? "ES" : "EN"}</span>
    </button>
  );
}

// ── MAIN ────────────────────────────────────────────────────────
export default function App() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [howTab, setHowTab] = useState<"users" | "companies" | "gyms">("users");
  const [contactOpen, setContactOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.memberships, href: "#benefits" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["home", "what", "how", "benefits", "safety", "pilot", "categories", "faq", "contact", "about"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setContactOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const howTabs = [
    { key: "users" as const, label: t.how.tabs.users },
    { key: "companies" as const, label: t.how.tabs.companies },
    { key: "gyms" as const, label: t.how.tabs.gyms },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-['Quicksand',sans-serif] overflow-x-hidden">

      <LanguagePicker />

      {/* ── CONTACT FORM MODAL ─────────────────────────────────── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/90 backdrop-blur-sm p-0 sm:p-6"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative flex flex-col w-full h-full sm:h-[90vh] sm:max-h-[900px] sm:w-full sm:max-w-xl bg-background sm:border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <span className="text-sm tracking-wide font-medium text-foreground">{t.contact.formTitle}</span>
              <button
                onClick={() => setContactOpen(false)}
                aria-label="Close"
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf4GeBCFGcsHa3XpXcrZQVP70hvqwa9TQ0XhCx8ZHf2R-Dznw/viewform?embedded=true"
                title={t.contact.formTitle}
                className="w-full block"
                style={{ height: "3985px", border: 0 }}
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* LOGO */}
          <button onClick={() => scrollTo("#home")} className="flex items-center group">
            <img
              src={activaLogo}
              alt="Activa"
              className={`h-12 lg:h-14 w-auto transition-all duration-500 group-hover:opacity-80 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm tracking-wide transition-colors duration-200 ${
                    activeSection === id ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("#contact")}
              className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-foreground/80 transition-colors"
            >
              {t.nav.cta}
            </button>
            <LanguageToggle scrolled={scrolled} />
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle scrolled={scrolled} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-foreground" aria-label={t.nav.menu}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-background border-b border-border ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left text-base text-foreground py-1 border-b border-border/40 last:border-0">
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-32">
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1000&fit=crop&auto=format"
            alt="Gym with natural light"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <p className="text-secondary text-sm tracking-[0.2em] uppercase mb-6 font-medium">
              {t.hero.eyebrow}
            </p>
            <h1 className="font-['Quicksand',sans-serif] text-white text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] mb-6">
              {t.hero.titleTop}<br />
              <em className="not-italic font-light">{t.hero.titleEm}</em>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl max-w-xl leading-relaxed mb-10">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {[t.hero.ctaCompany, t.hero.ctaGym, t.hero.ctaUser].map((label) => (
                <button
                  key={label}
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center px-7 py-3.5 border border-white/30 text-white text-sm tracking-wide hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-colors group"
                >
                  {label}
                  <ArrowRight
                    size={15}
                    className="w-0 ml-0 opacity-0 group-hover:w-[15px] group-hover:ml-2 group-hover:opacity-100 transition-all duration-200 shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 lg:right-12 z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-white/50" />
        </div>
      </section>

      {/* ── 2. WHAT IS ACTIVA ──────────────────────────────────── */}
      <section id="what" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{t.what.label}</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1]">
                {t.what.titleTop}<br />
                <em className="not-italic">{t.what.titleEm}</em>
              </h2>
            </div>
            <div className="lg:pt-2">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t.what.intro}
              </p>
              <div className="flex flex-col gap-4">
                {t.what.cards.map((card) => (
                  <div key={card.lead} className="flex gap-4 p-5 bg-card border border-border">
                    <span className="font-['Quicksand',sans-serif] text-secondary text-2xl font-light shrink-0">→</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="text-foreground font-medium">{card.lead}</span>{" "}
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Activa exists */}
          <div className="mt-20 lg:mt-28 grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 bg-muted overflow-hidden min-h-72">
              <img
                src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=700&h=900&fit=crop&auto=format"
                alt="Person practicing yoga in a studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <SectionLabel>{t.what.whyLabel}</SectionLabel>
              <h3 className="font-['Quicksand',sans-serif] text-3xl lg:text-4xl font-light leading-[1.15] mb-6">
                {t.what.whyTitleTop}<br />
                <em className="not-italic">{t.what.whyTitleEm}</em>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.what.whyP1}
              </p>
              <p className="leading-relaxed font-medium text-foreground">
                {t.what.whyP2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ────────────────────────────────────── */}
      <section id="how" className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{t.how.label}</SectionLabel>
          <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1] mb-12">
            {t.how.title}
          </h2>

          {/* Tabs */}
          <div className="flex gap-0 border border-border mb-12 w-fit overflow-hidden">
            {howTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setHowTab(tab.key)}
                className={`px-6 py-3 text-sm tracking-wide transition-colors ${
                  howTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {t.how.steps[howTab].map((item) => (
              <div key={item.step} className="flex flex-col">
                <span className="font-['Quicksand',sans-serif] text-5xl font-light text-secondary mb-4">{item.step}</span>
                <h4 className="font-['Quicksand',sans-serif] text-xl font-medium mb-3 text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4–6. BENEFITS ──────────────────────────────────────── */}
      <section id="benefits" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{t.benefits.label}</SectionLabel>
          <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1] mb-16">
            {t.benefits.titleTop}<br />
            <em className="not-italic">{t.benefits.titleEm}</em>
          </h2>

          {/* Companies */}
          <div className="grid lg:grid-cols-2 gap-0 border border-border overflow-hidden mb-8">
            <div className="bg-primary text-primary-foreground p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-secondary mb-4">{t.benefits.companies.eyebrow}</p>
                <h3 className="font-['Quicksand',sans-serif] text-3xl lg:text-4xl font-light leading-tight mb-4">
                  {t.benefits.companies.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed mb-8">
                  {t.benefits.companies.desc}
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {t.benefits.companies.bullets.map((b) => <BulletItem key={b} text={b} dark />)}
                </div>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary text-sm tracking-wide hover:bg-secondary hover:text-secondary-foreground transition-colors group w-fit"
              >
                {t.benefits.companies.btn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="bg-muted overflow-hidden min-h-80">
              <img
                src={SabanaAbove}
                alt="Companies in Costa Rica"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Gyms */}
          <div className="grid lg:grid-cols-2 gap-0 border border-border overflow-hidden mb-8">
            <div className="bg-muted overflow-hidden min-h-80 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=700&fit=crop&auto=format"
                alt="Interior of a modern gym"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card p-10 lg:p-14 flex flex-col justify-between order-1 lg:order-2">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{t.benefits.gyms.eyebrow}</p>
                <h3 className="font-['Quicksand',sans-serif] text-3xl lg:text-4xl font-light leading-tight mb-4">
                  {t.benefits.gyms.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.benefits.gyms.desc}
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  {t.benefits.gyms.bullets.map((b) => <BulletItem key={b} text={b} />)}
                </div>
                <p className="text-xs text-foreground/60 italic border-l-2 border-secondary pl-4 leading-relaxed">
                  {t.benefits.gyms.note}
                </p>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-foreground/80 transition-colors group w-fit"
              >
                {t.benefits.gyms.btn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Users */}
          <div className="grid lg:grid-cols-2 gap-0 border border-border overflow-hidden">
            <div className="bg-card p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{t.benefits.users.eyebrow}</p>
                <h3 className="font-['Quicksand',sans-serif] text-3xl lg:text-4xl font-light leading-tight mb-4">
                  {t.benefits.users.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.benefits.users.desc}
                </p>
                <div className="flex flex-col gap-3">
                  {t.benefits.users.bullets.map((b) => <BulletItem key={b} text={b} />)}
                </div>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-foreground/80 transition-colors group w-fit"
              >
                {t.benefits.users.btn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="bg-muted overflow-hidden min-h-80">
              <img
                src={PilatesCR}
                alt="Pilates in Costa Rica"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CURATED & CONTROLLED NETWORK ────────────────────── */}
      <section id="safety" className="py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-secondary mb-6">{t.safety.eyebrow}</p>
              <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
                {t.safety.titleTop}<br />
                <em className="not-italic">{t.safety.titleEm}</em>
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed text-lg">
                {t.safety.paragraph}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:pt-16">
              {t.safety.bullets.map((b) => <BulletItem key={b} text={b} dark />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. COSTA RICA PILOT ────────────────────────────────── */}
      <section id="pilot" className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <SectionLabel>{t.pilot.label}</SectionLabel>
              <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
                {t.pilot.titleTop}<br />
                <em className="not-italic">{t.pilot.titleEm}</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.pilot.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t.pilot.p2}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-foreground/80 transition-colors group"
                >
                  {t.pilot.btnCompany}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm tracking-wide hover:bg-muted transition-colors"
                >
                  {t.pilot.btnGym}
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm tracking-wide hover:bg-muted transition-colors"
                >
                  {t.pilot.btnUser}
                </button>
              </div>
            </div>

            <div>
              <div className="bg-background border border-border p-8">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">{t.pilot.zonesLabel}</p>
                <div className="grid grid-cols-2 gap-3">
                  {LAUNCH_ZONES.map((zona) => (
                    <div key={zona} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={12} className="text-secondary shrink-0" />
                      {zona}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    {t.pilot.zonesNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CATEGORIES ──────────────────────────────────────── */}
      <section id="categories" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{t.categories.label}</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1]">
              {t.categories.titleTop}<br />
              <em className="not-italic">{t.categories.titleEm}</em>
            </h2>
            <p className="text-muted-foreground max-w-xs lg:text-right text-sm leading-relaxed">
              {t.categories.intro}
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-px bg-border">
            {t.categories.items.map((label, i) => {
              const Icon = CATEGORY_ICONS[i];
              return (
                <div
                  key={label}
                  className="bg-background flex flex-col items-center justify-center py-10 px-4 gap-3 hover:bg-card transition-colors group"
                >
                  {Icon && (
                    <Icon className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  )}
                  <span className="text-xs tracking-wide text-muted-foreground text-center">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 10. FAQs ───────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1]">
                {t.faq.titleTop}<br />
                <em className="not-italic">{t.faq.titleEm}</em>
              </h2>
            </div>
            <Accordion.Root type="single" collapsible className="flex flex-col divide-y divide-border">
              {t.faq.items.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left text-sm font-medium text-foreground hover:text-foreground/80 transition-colors group [&[data-state=open]>svg]:rotate-180">
                    {faq.q}
                    <ChevronDown size={16} className="text-muted-foreground shrink-0 ml-4 transition-transform duration-200" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease] data-[state=closed]:animate-[accordion-up_200ms_ease]">
                    <p className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT — direct emails ────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{t.contact.label}</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
                {t.contact.titleTop}<br />
                <em className="not-italic">{t.contact.titleEm}</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm">
                {t.contact.intro}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center">
                  <MapPin size={15} className="text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{t.contact.location}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 w-full max-w-md">
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-foreground/80 transition-colors group w-full"
              >
                {t.contact.ctaForm}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="mailto:estebanbaltodano@4ctiva.com"
                className="flex items-center justify-between gap-4 border border-border p-5 hover:border-foreground transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors shrink-0">
                    <Mail size={15} className="text-muted-foreground group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Esteban Baltodano</span>
                    <span className="text-xs text-muted-foreground break-all">estebanbaltodano@4ctiva.com</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </a>

              <a
                href="https://wa.me/16073196214"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 border border-border p-5 hover:border-foreground transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors shrink-0">
                    <WhatsAppIcon size={16} className="text-muted-foreground group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">WhatsApp</span>
                    <span className="text-xs text-muted-foreground break-all">+1 (607) 319-6214</span>
                  </div>
                </div>
                <ArrowRight size={15} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. ABOUT US ───────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
            <div className="bg-muted overflow-hidden min-h-96 h-full">
              <img
                src={yogaCR}
                alt="Yoga in Costa Rica"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col justify-center">
              <SectionLabel>{t.about.label}</SectionLabel>
              <h2 className="font-['Quicksand',sans-serif] text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
                {t.about.titleTop}<br />
                <em className="not-italic">{t.about.titleEm}</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t.about.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t.about.p2}
              </p>
              <p className="text-foreground leading-relaxed font-medium">
                {t.about.p3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid lg:grid-cols-4 gap-10 mb-10">
            <div className="lg:col-span-2">
              {/* LOGO */}
              <div className="flex items-center mb-4">
                <img src={activaLogo} alt="Activa" className="h-14 w-auto brightness-0 invert" />
              </div>
              <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-secondary mb-4">{t.footer.navLabel}</p>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <button key={link.href} onClick={() => scrollTo(link.href)} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors text-left">
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-secondary mb-4">{t.footer.contactLabel}</p>
              <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
                <a href={`mailto:${PRIMARY_EMAIL}`} className="flex items-center gap-2.5 hover:text-primary-foreground transition-colors">
                  <Mail size={15} className="shrink-0" />
                  <span className="break-all">{PRIMARY_EMAIL}</span>
                </a>
                <a href="https://wa.me/16073196214" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-primary-foreground transition-colors">
                  <WhatsAppIcon size={15} className="shrink-0" />
                  <span>+1 (607) 319-6214</span>
                </a>
                <span>{t.footer.location}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between gap-4">
            <p className="text-xs text-primary-foreground/40">{t.footer.rights}</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
