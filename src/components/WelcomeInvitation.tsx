"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/lib/site";
import { FloralCorners, SectionOrnament } from "@/components/AmbientDecor";

export function WelcomeInvitation() {
  const { lang, t } = useLanguage();

  return (
    <section id="welcome" className="relative px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
      <p className="font-marathi text-center text-lg text-rosegold-deep sm:text-xl">
        {t.sacred}
      </p>

      <h1 className="font-marathi mx-auto mt-5 max-w-3xl text-center text-[1.7rem] leading-snug text-ink sm:text-5xl">
        {t.title}
      </h1>

      <SectionOrnament />

      <div className="mx-auto max-w-2xl space-y-3 text-center text-base leading-relaxed text-ink-soft sm:text-lg">
        <p>{t.message1}</p>
        <p>{t.message2}</p>
      </div>

      <article className="rose-border glass-card relative mx-auto mt-10 max-w-md overflow-hidden rounded-[36px] px-5 pb-8 pt-6">
        <FloralCorners />
        <div className="relative mx-auto aspect-[3/4] w-[78%] overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(124,86,58,0.18)]">
          <Image
            src="/images/couple.png"
            alt={lang === "mr" ? SITE.coupleMr : SITE.coupleEn}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 70vw, 320px"
          />
        </div>
        <p className="font-display mt-5 text-center text-3xl text-rosegold-deep">
          {lang === "mr" ? SITE.coupleMr : SITE.coupleEn}
        </p>
        <div className="gold-line my-4" />
        <dl className="space-y-3 text-center text-[0.98rem] text-ink">
          <div>
            <dt className="text-ink-soft">{t.dateLabel}</dt>
            <dd className="mt-1 font-medium">{lang === "mr" ? SITE.dateMr : SITE.dateEn}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">{t.timeLabel}</dt>
            <dd className="mt-1 font-medium">{lang === "mr" ? SITE.timeMr : SITE.timeEn}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">{t.venueLabel}</dt>
            <dd className="mt-1 font-medium">{lang === "mr" ? SITE.venueMr : SITE.venueEn}</dd>
          </div>
        </dl>
      </article>

      <div className="mt-8 flex justify-center">
        <a href="#prediction" className="premium-button min-w-[240px] text-center">
          {t.accept}
        </a>
      </div>
    </section>
  );
}
