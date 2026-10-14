export const SITE = {
  brand: "APPVIK",
  coupleMr: "अपूर्वा आणि विवेक",
  coupleEn: "Apoorva & Vivek",
  dateMr: "गुरुवार, २९ ऑक्टोबर २०२६",
  dateEn: "Thursday, 29 October 2026",
  timeMr: "वेळ लवकरच कळवली जाईल",
  timeEn: "Time will be shared soon",
  venueMr: "स्थळ लवकरच कळवले जाईल",
  venueEn: "Venue will be shared soon",
  collections: {
    votes: "apurwa_dohale_votes",
    names: "apurwa_baby_names",
  },
} as const;

export function getPublicSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || "";
}
