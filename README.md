# QueueTube 🎬

> Queue your YouTube subscription feed and watch videos back-to-back — just like a playlist.

Tired of clicking each video one by one in your subscriptions? QueueTube adds a single button to your YouTube subscriptions page that instantly queues everything up and autoplays them in order, with full skip and navigation controls.

[![Available on the Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install%20Now-brightgreen?logo=googlechrome)](https://chromewebstore.google.com/detail/queuetube/fjcljgepicfodmpacgfimeepjibomlcd)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![No Permissions Required](https://img.shields.io/badge/Permissions-None-brightgreen)
![No Data Collected](https://img.shields.io/badge/Privacy-No%20data%20collected-brightgreen)

## Install

**[➡️ Get QueueTube on the Chrome Web Store](https://chromewebstore.google.com/detail/queuetube/fjcljgepicfodmpacgfimeepjibomlcd)**

Or install manually from GitHub if you prefer — instructions below.

---

## Features

- ▶️ **One-click queuing** — hit the button and your subscriptions start playing immediately
- ⏭️ **Autoplay** — when a video ends, the next one starts automatically
- ⏮️ **Skip controls** — jump forward or back in your queue at any time
- 📋 **Queue panel** — shows all queued videos with real titles so you know what's coming next
- 🔴 **Watch progress bars** — videos you've partially watched show a red progress bar in the queue panel, just like YouTube's own thumbnails, so you can decide whether to skip
- 🖱️ **Click to jump** — click any video in the panel to skip straight to it
- 📜 **Load more with scrolling** — scroll down your subscriptions before hitting Queue to load even more videos (you can queue 300+ this way!)
- 🔀 **Guilt-free sidebar browsing** — spot something interesting in the sidebar? Click it and watch it normally — your queue is still saved, so just hit ▶ in the panel to jump straight back to where you were. Or open it in a new tab to keep your queue playing uninterrupted in the original tab
- 🔒 **Private & zero permissions** — no data collected, no permissions required, queue lives only in your current tab

---

## Manual installation from GitHub

Prefer to install directly from the source? Follow these steps. Otherwise, the easiest way is the [Chrome Web Store](https://chromewebstore.google.com/detail/queuetube/fjcljgepicfodmpacgfimeepjibomlcd).

### Step 1 — Download the files

Click the green **Code** button on this page → **Download ZIP**, then unzip it somewhere easy to find (like your Desktop).

### Step 2 — Open Chrome Extensions

In Chrome, go to:
```
chrome://extensions
```

### Step 3 — Enable Developer Mode

Toggle on **Developer mode** in the top-right corner of the Extensions page.

### Step 4 — Load the extension

Click **Load unpacked**, then select the `queuetube-main` folder you unzipped.

### Step 5 — Done!

QueueTube will appear in your extension list. You're ready to go.

---

## How to use

1. Go to **[youtube.com/feed/subscriptions](https://www.youtube.com/feed/subscriptions)**
2. The page will briefly refresh — this is normal, it ensures your videos load correctly
3. A red **"Queue Subscriptions"** button will appear near the top of the page
4. *(Optional)* **Scroll down** to load more videos before clicking — the further you scroll, the more videos get queued. You can load 300+ this way!
5. Click the **Queue Subscriptions** button
6. The first video starts playing automatically
7. A queue panel appears in the **bottom-right corner** showing all your upcoming videos

### Queue panel controls

| Button | Action |
|--------|--------|
| ◀ | Go to previous video |
| ▶ | Skip to next video |
| ✕ | Stop the queue |
| Click a title | Jump straight to that video |

### Reading the progress bars

Videos you've already partially watched will show a small red bar beneath their title in the queue panel — identical to the progress bars YouTube shows on thumbnails. Use these to decide whether to skip a video you've already seen a bit of.

### Browsing the sidebar without losing your queue

See something interesting in YouTube's suggested sidebar while watching a queued video? You have two options:

- **Click it directly** — QueueTube saves your queue in the background. Watch the video, then hit ▶ in the panel to jump straight back to your next queued video
- **Right-click → open in a new tab** — that tab is completely independent with no queue panel, leaving your original tab playing uninterrupted

---

## Tips

- **More videos = better experience.** Scroll all the way to the bottom of your subscriptions before clicking Queue to get the maximum number of videos loaded. YouTube loads them in batches as you scroll.
- **Past videos scroll up.** The queue panel always shows the currently playing video at the top — scroll up in the panel to see what you've already watched.
- Click ✕ on the panel at any time to stop the queue and go back to browsing normally.

---

## Privacy

QueueTube requires **zero browser permissions** and stores your queue in your current tab's session memory only — it's gone the moment you close the tab. No browsing data, no personal information, and nothing is ever sent anywhere. See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for full details.

---

## Feedback

Found a bug or have a suggestion? Please [open an issue](../../issues) — all feedback welcome!

---

## Coming soon

- Headphone and media button functionality
- Previous queues saved in memory to continue later
- Tagging functionality to only queue videos from channels you choose
