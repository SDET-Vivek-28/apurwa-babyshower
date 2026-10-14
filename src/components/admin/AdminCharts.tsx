"use client";

import type { AdminData } from "@/lib/types";

export function DonutChart({ data }: { data: AdminData }) {
  const radius = 58;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  const boyLength = (data.boyPercent / 100) * circumference;
  const girlLength = (data.girlPercent / 100) * circumference;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 160 160" className="h-36 w-36 -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#f4eadc" strokeWidth={stroke} />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#7ea3c7"
          strokeWidth={stroke}
          strokeDasharray={`${boyLength} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#e4a0ab"
          strokeWidth={stroke}
          strokeDasharray={`${girlLength} ${circumference}`}
          strokeDashoffset={-boyLength}
          strokeLinecap="round"
        />
      </svg>
      <div className="space-y-2 text-sm">
        <p className="text-boy">👦 {data.boyPercent}%</p>
        <p className="text-girl">👧 {data.girlPercent}%</p>
      </div>
    </div>
  );
}

export function BarGraph({ data }: { data: AdminData }) {
  const max = Math.max(data.boyVotes, data.girlVotes, 1);

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>👦</span>
          <span>{data.boyVotes}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-boy transition-all duration-700"
            style={{ width: `${(data.boyVotes / max) * 100}%` }}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>👧</span>
          <span>{data.girlVotes}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-girl transition-all duration-700"
            style={{ width: `${(data.girlVotes / max) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
