import { NextResponse } from "next/server";
import { getVoteRound, isFirebaseConfigured, normalizeName, saveVote } from "@/lib/firebase-admin";
import type { Prediction } from "@/lib/types";

export const dynamic = "force-dynamic";

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    if (!isFirebaseConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Firebase is not configured yet." },
        { status: 503 },
      );
    }

    const body = await request.json();
    const guestName = clean(body.guestName, 60);
    const babyName = normalizeName(clean(body.babyName, 40));
    const blessing = clean(body.blessing, 400);
    const prediction: Prediction | "" =
      body.prediction === "boy" || body.prediction === "girl"
        ? body.prediction
        : "";

    if (!prediction) {
      return NextResponse.json({ ok: false, error: "prediction" }, { status: 400 });
    }
    if (babyName.length < 1) {
      return NextResponse.json({ ok: false, error: "babyName" }, { status: 400 });
    }
    if (guestName.length < 2) {
      return NextResponse.json({ ok: false, error: "guestName" }, { status: 400 });
    }

    await saveVote({ guestName, prediction, babyName, blessing });
    const round = await getVoteRound();

    return NextResponse.json({ ok: true, round });
  } catch (error) {
    const hint = error instanceof Error ? error.message : "server";
    console.error("POST /api/votes failed:", hint);
    return NextResponse.json({ ok: false, error: "server", hint }, { status: 500 });
  }
}
