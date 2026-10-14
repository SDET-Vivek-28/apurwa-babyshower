"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher({ variant = "guest" }: { variant?: "guest" | "admin" }) {
  const { lang, setLang, t } = useLanguage();
  const admin = variant === "admin";

  return (
    <div
      className={`inline-flex items-center rounded-full p-1 text-xs tracking-wide ${
        admin
          ? "bg-white/70 text-ink shadow-sm ring-1 ring-rosegold/20"
          : "bg-softwhite/70 text-ink shadow-sm ring-1 ring-rosegold/25 backdrop-blur"
      }`}
    >
      <button
        type="button"
        onClick={() => setLang("mr")}
        className={`rounded-full px-3 py-1.5 transition ${
          lang === "mr" ? "bg-rosegold text-softwhite" : "text-ink-soft"
        }`}
      >
        {t.langMr}
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1.5 transition ${
          lang === "en" ? "bg-rosegold text-softwhite" : "text-ink-soft"
        }`}
      >
        {t.langEn}
      </button>
    </div>
  );
}
