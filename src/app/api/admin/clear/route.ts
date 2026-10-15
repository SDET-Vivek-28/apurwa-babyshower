import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { clearAllVotes, isFirebaseConfigured } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json({ ok: false, error: "firebase" }, { status: 503 });
  }

  try {
    const round = await clearAllVotes();
    return NextResponse.json({ ok: true, round });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
