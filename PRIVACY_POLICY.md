# QueueTube Privacy Policy

**Last updated:** 2026-03-17

## Summary
QueueTube does not collect, transmit, or share any personal data. All data is stored locally in your browser only, and only on youtube.com.

## What data is stored

QueueTube uses two browser storage mechanisms, both scoped entirely to your local browser:

### sessionStorage — cleared when you close the tab
- Your active queue of video URLs and titles
- Your current position in the active queue
- Internal page-reload flags used to ensure videos load correctly

### localStorage — persists until you clear it or reset the extension
- **Saved queue** (`queuetube_saved_queue`, `queuetube_saved_index`) — your most recent queue and playback position, used by the "Continue Previous Queue" feature
- **Channel list** (`queuetube_channels`, `queuetube_channel_meta`) — the list of channel names and handles captured from your subscriptions page
- **Channel tags** (`queuetube_channel_tags`) — your tag assignments (e.g. which channels belong to which tag)

This data never leaves your browser. It is never written to any server, synced to your Google account, or shared in any way.

## What data is NOT collected
- No browsing history
- No personal information
- No YouTube account data
- No analytics or telemetry
- Nothing is sent to any external server

## Permissions

QueueTube requests two browser permissions:

- **`scripting`** — required for the popup to read and write your channel list and tags from localStorage on the YouTube tab. Without this, the tag manager cannot function.
- **`tabs`** — required to find your open YouTube tab so the popup can communicate with it.

QueueTube does **not** use these permissions to read your browsing history, access any page other than youtube.com, or collect any data.

## Third parties
QueueTube communicates with no external servers. It operates entirely within your browser on youtube.com.

## Clearing your data
You can remove all locally stored data at any time via **Settings → Reset** inside the QueueTube popup, or by clearing your browser's localStorage for youtube.com.

## Contact
If you have any questions, please open an issue on the GitHub repository.
