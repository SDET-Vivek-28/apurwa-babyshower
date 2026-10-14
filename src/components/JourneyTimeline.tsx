"use client";

import { useLanguage } from "@/context/LanguageContext";

export function JourneyTimeline() {
  const { t } = useLanguage();
  const steps = [
    { title: t.journey1Title, body: t.journey1Body },
    { title: t.journey2Title, body: t.journey2Body },
    { title: t.journey3Title, body: t.journey3Body },
    { title: t.journey4Title, body: t.journey4Body },
  ];

  return (
    <section id="journey" className="relative px-4 py-14 sm:px-6">
      <h2 className="font-marathi text-center text-3xl text-ink sm:text-4xl">
        {t.journeyHeading}
      </h2>

      <div className="relative mx-auto mt-10 max-w-xl">
        <div className="absolute top-0 bottom-0 left-5 w-px bg-gradient-to-b from-rosegold/10 via-rosegold/50 to-rosegold/10 sm:left-1/2" />
        <div className="space-y-6">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className={`glass-card relative rounded-[28px] p-5 sm:w-[48%] ${
                index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
              }`}
            >
              <span className="absolute top-6 left-[-1.35rem] h-3.5 w-3.5 rounded-full bg-rosegold shadow sm:hidden" />
              <h3 className="font-marathi text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
