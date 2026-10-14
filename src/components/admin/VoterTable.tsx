"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Prediction, VoteRecord } from "@/lib/types";

function formatWhen(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toCsv(rows: VoteRecord[], labels: Record<string, string>) {
  const header = [
    labels.guest,
    labels.prediction,
    labels.babyName,
    labels.blessing,
    labels.when,
  ];
  const body = rows.map((row) =>
    [
      row.guestName,
      row.prediction === "boy" ? labels.boy : labels.girl,
      row.babyName,
      row.blessing ?? "",
      formatWhen(row.createdAt),
    ]
      .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
      .join(","),
  );
  return [header.join(","), ...body].join("\n");
}

export function VoterTable({ votes }: { votes: VoteRecord[] }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Prediction>("all");

  const filtered = useMemo(() => {
    return votes.filter((vote) => {
      const matchesFilter = filter === "all" || vote.prediction === filter;
      const matchesQuery = vote.guestName
        .toLocaleLowerCase("mr-IN")
        .includes(query.trim().toLocaleLowerCase("mr-IN"));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query, votes]);

  const exportCsv = () => {
    const csv = toCsv(filtered, {
      guest: t.colGuest,
      prediction: t.colPrediction,
      babyName: t.colBabyName,
      blessing: t.colBlessing,
      when: t.colWhen,
      boy: t.boyShort,
      girl: t.girlShort,
    });
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "apurwa-dohale-votes.csv";
    link.click();
    URL.revokeObjectURL(href);
  };

  return (
    <section className="glass-card rounded-[28px] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-marathi text-3xl text-ink">{t.voterTable}</h2>
        </div>
        <button type="button" onClick={exportCsv} className="premium-button min-h-11 px-5">
          {t.exportCsv}
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.searchGuest}
          className="field"
        />
        <div className="flex rounded-full bg-ivory p-1 ring-1 ring-rosegold/20">
          {(["all", "boy", "girl"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm ${
                filter === value ? "bg-rosegold text-softwhite" : "text-ink-soft"
              }`}
            >
              {value === "all" ? t.filterAll : value === "boy" ? t.filterBoy : t.filterGirl}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead>
            <tr className="text-ink-soft">
              <th className="pb-3 font-medium">{t.colGuest}</th>
              <th className="pb-3 font-medium">{t.colPrediction}</th>
              <th className="pb-3 font-medium">{t.colBabyName}</th>
              <th className="pb-3 font-medium">{t.colBlessing}</th>
              <th className="pb-3 font-medium">{t.colWhen}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-ink-soft">
                  {t.emptyVotes}
                </td>
              </tr>
            ) : (
              filtered.map((vote) => (
                <tr key={vote.id} className="border-t border-rosegold/15 align-top">
                  <td className="py-3 font-medium">{vote.guestName}</td>
                  <td className="py-3">
                    {vote.prediction === "boy" ? t.boyShort : t.girlShort}
                  </td>
                  <td className="py-3">{vote.babyName}</td>
                  <td className="max-w-xs py-3 text-ink-soft">{vote.blessing || "—"}</td>
                  <td className="py-3 whitespace-nowrap text-ink-soft">
                    {formatWhen(vote.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
