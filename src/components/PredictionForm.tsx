"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import type { Prediction } from "@/lib/types";

function burstConfetti() {
  const colors = ["#C4A484", "#E8B4BC", "#FFF8EF", "#D08996", "#9C7348"];
  confetti({
    particleCount: 140,
    spread: 76,
    origin: { y: 0.65 },
    colors,
  });
  window.setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 180);
}

export function PredictionForm() {
  const { t } = useLanguage();
  const [prediction, setPrediction] = useState<Prediction | "">("");
  const [babyName, setBabyName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [blessing, setBlessing] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!prediction) {
      setError(t.errorPrediction);
      return;
    }
    if (!babyName.trim()) {
      setError(t.errorName);
      return;
    }
    if (guestName.trim().length < 2) {
      setError(t.errorGuest);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prediction,
          babyName: babyName.trim(),
          guestName: guestName.trim(),
          blessing: blessing.trim(),
        }),
      });

      if (!response.ok) {
        setError(response.status === 503 ? t.errorFirebase : t.errorGeneric);
        return;
      }

      setSuccess(true);
      burstConfetti();
    } catch {
      setError(t.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="prediction" className="relative px-4 py-16 sm:px-6">
      <h2 className="font-marathi text-center text-3xl text-ink sm:text-4xl">
        {t.predictHeading}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-ink-soft">
        {t.predictInstruction}
      </p>

      <form onSubmit={onSubmit} className="glass-card mx-auto mt-8 max-w-xl rounded-[32px] p-5 sm:p-8">
        <div className="grid gap-3">
          <button
            type="button"
            data-active={prediction === "boy"}
            onClick={() => setPrediction("boy")}
            className="choice-card px-4 py-5 text-left text-lg"
          >
            {t.boyOption}
          </button>
          <button
            type="button"
            data-active={prediction === "girl"}
            onClick={() => setPrediction("girl")}
            className="choice-card px-4 py-5 text-left text-lg"
          >
            {t.girlOption}
          </button>
        </div>

        {prediction ? (
          <label className="mt-6 block">
            <span className="mb-2 block text-sm text-ink">
              {prediction === "boy" ? t.boyNameLabel : t.girlNameLabel}
            </span>
            <input
              required
              value={babyName}
              onChange={(event) => setBabyName(event.target.value)}
              placeholder={
                prediction === "boy" ? t.boyNamePlaceholder : t.girlNamePlaceholder
              }
              className="field"
            />
          </label>
        ) : null}

        <label className="mt-5 block">
          <span className="mb-2 block text-sm text-ink">{t.guestLabel}</span>
          <input
            required
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder={t.guestPlaceholder}
            className="field"
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm text-ink">
            {t.blessingLabel}{" "}
            <em className="not-italic text-ink-soft">({t.blessingOptional})</em>
          </span>
          <textarea
            rows={4}
            value={blessing}
            onChange={(event) => setBlessing(event.target.value)}
            placeholder={t.blessingPlaceholder}
            className="field resize-none"
          />
        </label>

        {error ? <p className="mt-4 text-sm text-blush-deep">{error}</p> : null}

        <button type="submit" disabled={submitting} className="premium-button mt-6 w-full">
          {submitting ? t.submitting : t.submit}
        </button>
      </form>

      {success ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fff8ef]/92 px-5 backdrop-blur-md">
          <div className="glass-card max-w-md rounded-[32px] px-6 py-10 text-center">
            <p className="font-display text-4xl text-ink">{t.thanksTitle}</p>
            <p className="mt-5 leading-relaxed text-ink-soft">{t.thanksBody1}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">{t.thanksBody2}</p>
            <button type="button" onClick={() => setSuccess(false)} className="premium-button mt-8">
              {t.thanksClose}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
