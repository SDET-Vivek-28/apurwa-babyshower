import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { SITE } from "@/lib/site";
import type { AdminData, NameStat, Prediction, VoteRecord } from "@/lib/types";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export function isFirebaseConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

export function getAdminDb() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured");
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: requiredEnv("FIREBASE_PROJECT_ID"),
        clientEmail: requiredEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: requiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
      }),
    });
  }

  return getFirestore();
}

export function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export async function saveVote(input: {
  guestName: string;
  prediction: Prediction;
  babyName: string;
  blessing: string;
}) {
  const db = getAdminDb();
  const now = FieldValue.serverTimestamp();
  const voteRef = db.collection(SITE.collections.votes).doc();

  await voteRef.set({
    guestName: input.guestName,
    prediction: input.prediction,
    babyName: input.babyName,
    blessing: input.blessing,
    createdAt: now,
  });

  await db.collection(SITE.collections.names).doc().set({
    voteId: voteRef.id,
    name: input.babyName,
    nameKey: input.babyName.toLocaleLowerCase("mr-IN"),
    gender: input.prediction,
    createdAt: now,
  });

  return voteRef.id;
}

async function deleteCollection(path: string) {
  const db = getAdminDb();
  const collection = db.collection(path);

  while (true) {
    const snapshot = await collection.limit(400).get();
    if (snapshot.empty) break;
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
}

export async function getVoteRound() {
  const db = getAdminDb();
  const snapshot = await db.collection(SITE.collections.meta).doc("settings").get();
  const round = Number(snapshot.data()?.voteRound ?? 1);
  return Number.isFinite(round) && round > 0 ? round : 1;
}

export async function clearAllVotes() {
  await deleteCollection(SITE.collections.votes);
  await deleteCollection(SITE.collections.names);

  const db = getAdminDb();
  const settingsRef = db.collection(SITE.collections.meta).doc("settings");
  const snapshot = await settingsRef.get();
  const nextRound = Number(snapshot.data()?.voteRound ?? 1) + 1;

  await settingsRef.set(
    {
      voteRound: nextRound,
      clearedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return nextRound;
}

function toIso(value: unknown) {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

function tallyNames(
  votes: VoteRecord[],
  gender: Prediction,
): NameStat[] {
  const counts = new Map<string, { name: string; count: number }>();

  for (const vote of votes) {
    if (vote.prediction !== gender) continue;
    const key = vote.babyName.toLocaleLowerCase("mr-IN");
    const current = counts.get(key);
    if (current) {
      current.count += 1;
    } else {
      counts.set(key, { name: vote.babyName, count: 1 });
    }
  }

  return [...counts.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, "mr");
  });
}

export async function getAdminData(): Promise<AdminData> {
  const db = getAdminDb();
  const snapshot = await db
    .collection(SITE.collections.votes)
    .orderBy("createdAt", "desc")
    .get();

  const votes: VoteRecord[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      guestName: String(data.guestName ?? ""),
      prediction: data.prediction === "girl" ? "girl" : "boy",
      babyName: String(data.babyName ?? ""),
      blessing: String(data.blessing ?? ""),
      createdAt: toIso(data.createdAt),
    };
  });

  const boyVotes = votes.filter((vote) => vote.prediction === "boy").length;
  const girlVotes = votes.filter((vote) => vote.prediction === "girl").length;
  const totalVotes = votes.length;
  const boyPercent = totalVotes ? Math.round((boyVotes / totalVotes) * 100) : 0;
  const girlPercent = totalVotes ? 100 - boyPercent : 0;

  return {
    totalVotes,
    boyVotes,
    girlVotes,
    boyPercent: totalVotes ? boyPercent : 0,
    girlPercent: totalVotes ? girlPercent : 0,
    totalNames: votes.filter((vote) => vote.babyName).length,
    votes,
    boyNames: tallyNames(votes, "boy"),
    girlNames: tallyNames(votes, "girl"),
  };
}
