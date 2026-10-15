import { NextResponse } from "next/server";
import { getVoteRound, isFirebaseConfigured } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isFirebaseConfigured()) {
    return NextResponse.json({ ok: true, round: 1 });
  }

  try {
    const round = await getVoteRound();
    return NextResponse.json({ ok: true, round });
  } catch {
    return NextResponse.json({ ok: true, round: 1 });
  }
}
