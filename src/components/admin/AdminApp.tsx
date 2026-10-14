"use client";

import { FormEvent, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BarGraph, DonutChart } from "@/components/admin/AdminCharts";
import { NameAnalytics } from "@/components/admin/NameAnalytics";
import { VoterTable } from "@/components/admin/VoterTable";
import { useLanguage } from "@/context/LanguageContext";
import type { AdminData } from "@/lib/types";

const emptyData: AdminData = {
  totalVotes: 0,
  boyVotes: 0,
  girlVotes: 0,
  boyPercent: 0,
  girlPercent: 0,
  totalNames: 0,
  votes: [],
  boyNames: [],
  girlNames: [],
};

export function AdminApp() {
  const { t } = useLanguage();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdminData>(emptyData);

  const loadData = async () => {
    const response = await fetch("/api/admin/data", { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    const json = await response.json();
    setData(json.data ?? emptyData);
    setAuthed(true);
  };

  useEffect(() => {
    loadData().catch(() => setAuthed(false));
  }, []);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(t.adminError);
        return;
      }
      setPassword("");
      await loadData();
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setData(emptyData);
  };

  if (authed === null) {
    return (
      <main className="luxury-page grid min-h-screen place-items-center">
        <p className="text-ink-soft">...</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="luxury-page grid min-h-screen place-items-center px-5">
        <form onSubmit={onLogin} className="glass-card w-full max-w-md rounded-[32px] p-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher variant="admin" />
          </div>
          <p className="text-sm tracking-[0.22em] text-rosegold-deep uppercase">
            {t.adminSubtitle}
          </p>
          <h1 className="font-display mt-2 text-4xl text-ink">{t.adminTitle}</h1>
          <label className="mt-8 block">
            <span className="mb-2 block text-sm">{t.adminPassword}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field"
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="mt-3 text-sm text-blush-deep">{error}</p> : null}
          <button type="submit" disabled={loading} className="premium-button mt-6 w-full">
            {loading ? t.adminUnlocking : t.adminUnlock}
          </button>
        </form>
      </main>
    );
  }

  const recent = data.votes.slice(0, 6);

  return (
    <main className="luxury-page min-h-screen px-4 py-6 sm:px-8">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.22em] text-rosegold-deep uppercase">
            {t.adminSubtitle}
          </p>
          <h1 className="font-display text-4xl text-ink">{t.adminTitle}</h1>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="admin" />
          <button type="button" onClick={onLogout} className="premium-button min-h-11 px-5">
            {t.adminLogout}
          </button>
        </div>
      </header>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Widget label={t.totalVotes} value={data.totalVotes} />
        <Widget label={t.boyVotes} value={data.boyVotes} />
        <Widget label={t.girlVotes} value={data.girlVotes} />
        <Widget label={t.totalNames} value={data.totalNames} />
      </div>

      <div className="mx-auto mt-4 grid max-w-6xl gap-4 lg:grid-cols-3">
        <article className="glass-card rounded-[28px] p-5">
          <h2 className="mb-4 text-sm tracking-wide text-ink-soft uppercase">
            {t.livePercent}
          </h2>
          <DonutChart data={data} />
        </article>
        <article className="glass-card rounded-[28px] p-5">
          <h2 className="mb-4 text-sm tracking-wide text-ink-soft uppercase">
            {t.barHeading}
          </h2>
          <BarGraph data={data} />
        </article>
        <article className="glass-card rounded-[28px] p-5">
          <h2 className="mb-4 text-sm tracking-wide text-ink-soft uppercase">
            {t.recentActivity}
          </h2>
          <ul className="space-y-3">
            {recent.length === 0 ? (
              <li className="text-sm text-ink-soft">{t.emptyVotes}</li>
            ) : (
              recent.map((vote) => (
                <li key={vote.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{vote.guestName}</span>
                  <span className="text-ink-soft">
                    {vote.prediction === "boy" ? "👦" : "👧"} {vote.babyName}
                  </span>
                </li>
              ))
            )}
          </ul>
        </article>
      </div>

      <div className="mx-auto mt-6 max-w-6xl">
        <NameAnalytics boyNames={data.boyNames} girlNames={data.girlNames} />
      </div>

      <div className="mx-auto mt-6 max-w-6xl pb-16">
        <VoterTable votes={data.votes} />
      </div>
    </main>
  );
}

function Widget({ label, value }: { label: string; value: number }) {
  return (
    <article className="glass-card rounded-[28px] p-5">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="font-display mt-2 text-4xl text-ink">{value}</p>
    </article>
  );
}
