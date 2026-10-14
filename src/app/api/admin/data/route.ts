import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminData, isFirebaseConfigured } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json(
      {
        ok: true,
        empty: true,
        data: {
          totalVotes: 0,
          boyVotes: 0,
          girlVotes: 0,
          boyPercent: 0,
          girlPercent: 0,
          totalNames: 0,
          votes: [],
          boyNames: [],
          girlNames: [],
        },
      },
    );
  }

  const data = await getAdminData();
  return NextResponse.json({ ok: true, data });
}
