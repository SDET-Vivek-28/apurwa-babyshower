"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { NameStat } from "@/lib/types";

function NameCard({
  title,
  names,
}: {
  title: string;
  names: NameStat[];
}) {
  const { t } = useLanguage();
  const max = names[0]?.count ?? 0;

  return (
    <article className="glass-card rounded-[28px] p-5">
      <h3 className="font-marathi text-2xl text-ink">{title}</h3>
      {names.length === 0 ? (
        <p className="mt-6 text-sm text-ink-soft">{t.noNames}</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {names.map((item) => {
            const crowned = item.count === max && max > 0;
            return (
              <li key={item.name}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-ink">
                    {crowned ? "👑 " : ""}
                    {item.name}
                  </p>
                  <p className="text-sm text-rosegold-deep">×{item.count}</p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream">
                  <div
                    className={`h-full rounded-full ${crowned ? "bg-rosegold" : "bg-blush"}`}
                    style={{ width: `${(item.count / max) * 100}%` }}
                  />
                </div>
                {crowned ? (
                  <p className="mt-1 text-xs tracking-wide text-rosegold-deep">
                    {t.mostSuggested}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export function NameAnalytics({
  boyNames,
  girlNames,
}: {
  boyNames: NameStat[];
  girlNames: NameStat[];
}) {
  const { t } = useLanguage();

  return (
    <section>
      <h2 className="font-marathi mb-5 text-3xl text-ink">{t.namesHeading}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <NameCard title={t.boyNames} names={boyNames} />
        <NameCard title={t.girlNames} names={girlNames} />
      </div>
    </section>
  );
}
