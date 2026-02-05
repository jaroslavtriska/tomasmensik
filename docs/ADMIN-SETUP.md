# Connect /admin to your Sanity backend (step-by-step)

If **https://tomasmensik.vercel.app/admin** loads but shows a **blank page**, the Studio can’t talk to the Sanity API. Follow these steps in order.

---

## Step 1: Open your Sanity project

1. Go to **[sanity.io/manage](https://sanity.io/manage)** and sign in.
2. Open the project your site uses.  
   In this repo it’s set to **project ID `bo49wn0o`** (see `sanity-studio/sanity.config.ts`).  
   If you use a different project, open that one.

---

## Step 2: Add CORS origin (required)

The Studio runs on your Vercel domain. Sanity must allow that domain to call its API.

1. In the project, go to **API** in the left sidebar.
2. Scroll to **CORS origins**.
3. Click **Add origin**.
4. Enter exactly:
   ```text
   https://tomasmensik.vercel.app
   ```
   (no trailing slash, no `/admin`)
5. Leave **Allow credentials** enabled (default).
6. Save.

If you use a custom domain (e.g. `mensik-reality.cz`), add that too, e.g. `https://mensik-reality.cz`.

---

## Step 3: Check API access

1. Still under **API**, ensure **Dataset** is set to the one your Studio uses (here: **production**).
2. You don’t need to create an API token for the Studio in the browser; you only need CORS and login.

---

## Step 4: Open the Studio and log in

1. Go to **https://tomasmensik.vercel.app/admin**.
2. You should be asked to **log in** (Google, GitHub, or email).
3. After login, you should see the Sanity sidebar (e.g. **Nastavení webu**, **Nemovitost**, **Služba**, …).

If it’s still blank:

- Hard refresh: **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac).
- Open **Developer tools** (F12) → **Console**. Look for red errors mentioning “CORS” or “blocked” and fix the origin in Step 2 if needed.

---

## Step 5: Create content if the project is empty

If the project has no documents yet:

1. In the Studio, click **Nastavení webu** and create the document (edit site name, hero text, etc.), then **Publish**.
2. Optionally seed sample data from your machine:
   - In [sanity.io/manage](https://sanity.io/manage) → **API** → **Tokens** → create a token with **Editor** rights.
   - In the repo run:
     ```bash
     cd sanity-studio
     SANITY_TOKEN=your_token npm run seed
     ```
   - Then reload **https://tomasmensik.vercel.app/admin** and you should see seeded content.

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Open project at [sanity.io/manage](https://sanity.io/manage) (e.g. `bo49wn0o`) |
| 2 | **API** → **CORS origins** → add `https://tomasmensik.vercel.app` |
| 3 | Confirm dataset is **production** (or the one in `sanity.config.ts`) |
| 4 | Open `/admin`, log in, check for errors in browser Console |
| 5 | Create **Nastavení webu** or run `npm run seed` if the dataset is empty |

The Studio in this repo is already configured to use **project ID `bo49wn0o`** and **dataset `production`**. Once CORS is set and you’re logged in, it’s connected to that real Sanity backend.
