# अपूर्वाच्या डोहाळे जेवण | apurwa-babyshower

Premium, Marathi-first digital invitation for Apoorva and Vivek.

This is a brand-new project. Guest pages never show votes, names, or percentages. Only `/admin` can read results.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase Admin + Firestore
- Vercel-ready

## Local run

```bash
cd apurwa-babyshower
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Default local password in `.env.local`: `apurwa-admin-2026`

Change it before sharing or deploying.

## Firebase

Create a Firebase project and a service account.

Add these server-only values to `.env.local` and Vercel:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Publish `firestore.rules` from this repo. Client access is denied. All writes and admin reads go through Next.js API routes.

Collections used only by this project:

- `apurwa_dohale_votes`
- `apurwa_baby_names`

## Event placeholders

Edit `src/lib/site.ts` for time and venue.

Replace `public/images/couple.png` with a real photo of Apoorva and Vivek. Gallery images live in `public/images/gallery-01.png` through `gallery-12.png`.

## Deploy

1. Push this folder to GitHub.
2. Import it in Vercel.
3. Add the same environment variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the Vercel domain.
5. The QR code also uses `window.location.origin` after deploy, so it stays correct on the live site.

## Language

Default is Marathi. The `मराठी | English` switcher is saved in `localStorage`.
