"use client";

import { useLanguage } from "@/context/LanguageContext";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="relative px-5 pb-16 pt-8 text-center">
      <div className="gold-line mb-6" />
      <p className="mx-auto max-w-xl leading-relaxed text-ink">{t.footerThanks}</p>
      <p className="mt-4 text-sm tracking-[0.18em] text-rosegold-deep uppercase">
        {t.designed}
      </p>
    </footer>
  );
}
