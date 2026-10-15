export const SITE = {
  brand: "APPVIK",
  coupleMr: "अपूर्वा आणि विवेक",
  coupleEn: "Apurwa & Vivek",
  dateMr: "गुरुवार, २९ ऑक्टोबर २०२६",
  dateEn: "Thursday, 29 October 2026",
  timeMr: "दुपारी १२:१५",
  timeEn: "12:15 PM",
  venueMr: "प्लाटिना सोसायटी, वाकड",
  venueEn: "Platina Society, Wakad",
  venueMapUrl: "https://maps.app.goo.gl/41guKH7KheqRXhjTA",
  collections: {
    votes: "apurwa_dohale_votes",
    names: "apurwa_baby_names",
    meta: "apurwa_dohale_meta",
  },
  voteStorageKey: "apurwa-babyshower-vote-round",
} as const;

export function getPublicSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || "";
}
