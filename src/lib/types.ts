export type Language = "mr" | "en";

export type Prediction = "boy" | "girl";

export type VotePayload = {
  guestName: string;
  prediction: Prediction;
  babyName: string;
  blessing?: string;
};

export type VoteRecord = VotePayload & {
  id: string;
  createdAt: string;
};

export type NameStat = {
  name: string;
  count: number;
};

export type AdminData = {
  totalVotes: number;
  boyVotes: number;
  girlVotes: number;
  boyPercent: number;
  girlPercent: number;
  totalNames: number;
  votes: VoteRecord[];
  boyNames: NameStat[];
  girlNames: NameStat[];
};
