# QueueTube 🎬

> Queue your YouTube subscription feed and watch videos back-to-back — just like a playlist.

Tired of clicking each video one by one in your subscriptions? QueueTube adds a single button to your YouTube subscriptions page that instantly queues everything up and autoplays them in order, with full skip and navigation controls.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![No Data Collected](https://img.shields.io/badge/Privacy-No%20data%20collected-brightgreen)

---

## Features

- ▶️ **One-click queuing** — hit the button and your subscriptions start playing immediately
- ⏭️ **Autoplay** — when a video ends, the next one starts automatically
- ⏮️ **Skip controls** — jump forward or back in your queue at any time
- 📋 **Queue panel** — shows all queued videos with real titles so you know what's coming next
- 🖱️ **Click to jump** — click any video in the panel to skip straight to it
- 📜 **Load more with scrolling** — scroll down your subscriptions before hitting Queue to load even more videos (you can queue 300+ this way!)
- 🔒 **Private** — no data is ever collected or sent anywhere

---

## Installation (for testers)

Since this isn't on the Chrome Web Store yet, you'll need to load it manually. It takes about two minutes.

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

Click **Load unpacked**, then select the folder you unzipped (the one containing `manifest.json`).

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

---

## Tips

- **More videos = better experience.** Scroll all the way to the bottom of your subscriptions before clicking Queue to get the maximum number of videos loaded. YouTube loads them in batches as you scroll.
- The queue persists if you accidentally close the panel — just navigate to a video and it'll pick back up.
- Click ✕ on the panel at any time to stop the queue and go back to browsing normally.

---

## Privacy

QueueTube stores your queue **locally on your device only** using Chrome's built-in storage. No browsing data, no personal information, and nothing at all is ever sent to any external server. See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for full details.

---

## Feedback

Found a bug or have a suggestion? Please [open an issue](../../issues) — all feedback welcome, especially while this is in early testing!

---

## Coming soon (maybe)

- Chrome Web Store release
