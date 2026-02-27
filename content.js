// QueueTube - content.js
// Queues your YouTube subscription feed for back-to-back playback.

const STORAGE_KEY  = "queuetube_queue";
const INDEX_KEY    = "queuetube_index";

// ── Storage helpers (chrome.storage.local) ───────────────────

function getQueue(cb) {
  chrome.storage.local.get([STORAGE_KEY], r => cb(r[STORAGE_KEY] || []));
}

function setQueue(queue, cb) {
  chrome.storage.local.set({ [STORAGE_KEY]: queue }, cb);
}

function getIndex(cb) {
  chrome.storage.local.get([INDEX_KEY], r => cb(parseInt(r[INDEX_KEY] || "0", 10)));
}

function setIndex(i, cb) {
  chrome.storage.local.set({ [INDEX_KEY]: String(i) }, cb);
}

function clearStorage(cb) {
  chrome.storage.local.remove([STORAGE_KEY, INDEX_KEY], cb);
}

// ── Feed page: scrape videos ─────────────────────────────────

function scrapeFeedVideos() {
  const selectors = [
    "a.yt-lockup-metadata-view-model__title",
    "a.yt-lockup-view-model__content-image",
    "a#video-title-link",
    "a#thumbnail",
    "ytd-rich-item-renderer a[href*='/watch']"
  ];

  const seen = new Set();
  const videos = [];

  for (const selector of selectors) {
    for (const a of document.querySelectorAll(selector)) {
      const match = (a.href || "").match(/\/watch\?v=([\w-]+)/);
      if (!match || seen.has(match[1])) continue;
      seen.add(match[1]);

      let title = `Video ${videos.length + 1}`;
      if (a.classList.contains("yt-lockup-metadata-view-model__title")) {
        title = a.textContent.trim() || a.getAttribute("aria-label") || title;
      } else {
        const container = a.closest("ytd-rich-item-renderer, ytd-video-renderer, yt-lockup-view-model");
        const titleEl = container && (
          container.querySelector("a.yt-lockup-metadata-view-model__title") ||
          container.querySelector("#video-title") ||
          container.querySelector("#title") ||
          container.querySelector("h3")
        );
        if (titleEl) title = titleEl.textContent.trim() || title;
      }

      // Extract watch progress percentage if present
      let progress = 0;
      const container2 = a.closest('ytd-rich-item-renderer, ytd-video-renderer, yt-lockup-view-model');
      if (container2) {
        const bar = container2.querySelector('.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment');
        if (bar) {
          const w = bar.style.width || '';
          progress = parseFloat(w) || 0;
        }
      }
      videos.push({ id: match[1], title, progress, url: `https://www.youtube.com/watch?v=${match[1]}` });
    }
    if (videos.length > 0) break;
  }

  return videos;
}

// ── Feed page: button ────────────────────────────────────────

function injectQueueButton() {
  if (document.getElementById("queuetube-btn")) return;

  const btn = document.createElement("button");
  btn.id = "queuetube-btn";
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
    </svg>
    <span>Queue Subscriptions</span>
  `;
  btn.setAttribute("aria-label", "Queue all subscription videos for back-to-back playback");

  btn.addEventListener("click", () => {
    const videos = scrapeFeedVideos();
    if (videos.length === 0) {
      alert("No videos found — try scrolling down first to load more.");
      return;
    }
    setQueue(videos, () => {
      setIndex(0, () => {
        showToast(`✅ Queued ${videos.length} videos! Starting now…`);
        setTimeout(() => { window.location.href = videos[0].url ; }, 800);
      });
    });
  });

  btn.style.cssText = "position:fixed;top:70px;left:50%;transform:translateX(-50%);z-index:99999";
  document.body.appendChild(btn);
}

// ── Video page: queue panel ──────────────────────────────────

function buildPlayerUI() {
  if (document.getElementById("queuetube-panel")) return;

  getQueue(queue => {
    getIndex(idx => {
      if (queue.length === 0) return;

      const panel = document.createElement("div");
      panel.id = "queuetube-panel";
      panel.innerHTML = `
        <div id="qt-header">
          <span id="qt-title">▶ QueueTube</span>
          <div id="qt-controls">
            <button id="qt-prev" title="Previous video" aria-label="Previous video">&#9664;</button>
            <span id="qt-counter">${idx + 1} / ${queue.length}</span>
            <button id="qt-next" title="Next video" aria-label="Next video">&#9654;</button>
            <button id="qt-close" title="Stop queue" aria-label="Stop queue">&#10005;</button>
          </div>
        </div>
        <div id="qt-list" role="list">
          ${[...queue].sort((a, b) => {
            // Watched videos go to the top (scrolled away), current and upcoming below
            const ai = queue.indexOf(a), bi = queue.indexOf(b);
            if (ai < idx && bi < idx) return ai - bi;  // watched: oldest first at top
            if (ai < idx) return -1;                    // watched before current
            if (bi < idx) return 1;
            return ai - bi;                             // current + upcoming in order
          }).map((v) => {
            const i = queue.indexOf(v);
            return `
            <div class="qt-item ${i === idx ? "active" : i < idx ? "watched" : ""}"
                 data-index="${i}"
                 role="listitem"
                 tabindex="0"
                 title="${escapeHtml(v.title)}">
              <span class="qt-num">${i + 1}</span>
              <span class="qt-name">${escapeHtml(v.title)}</span>
              ${i === idx ? '<span class="qt-now">NOW</span>' : ""}
              ${i < idx ? '<span class="qt-check" aria-label="Watched">✓</span>' : ""}
            </div>
            ${v.progress > 0 ? `<div class="qt-progress-bar"><div class="qt-progress-fill" style="width:${v.progress}%"></div></div>` : ''}
            `;
          }).join("")}
        </div>
      `;

      document.body.appendChild(panel);

      setTimeout(() => {
        const list = panel.querySelector("#qt-list");
        const active = panel.querySelector(".qt-item.active");
        if (list && active) {
          // Scroll so the active item is at the very top of the list
          list.scrollTop = active.offsetTop - list.offsetTop;
        }
      }, 300);

      document.getElementById("qt-next").addEventListener("click", () => goToIndex(idx + 1));
      document.getElementById("qt-prev").addEventListener("click", () => goToIndex(idx - 1));
      document.getElementById("qt-close").addEventListener("click", stopQueue);

      panel.querySelectorAll(".qt-item").forEach(el => {
        el.addEventListener("click", () => goToIndex(parseInt(el.dataset.index, 10)));
        el.addEventListener("keydown", e => {
          if (e.key === "Enter" || e.key === " ") goToIndex(parseInt(el.dataset.index, 10));
        });
      });
    });
  });
}

function goToIndex(i) {
  getQueue(queue => {
    if (i < 0 || i >= queue.length) return;
    setIndex(i, () => {
      window.location.href = queue[i].url ;
    });
  });
}

function stopQueue() {
  clearStorage(() => {
    const panel = document.getElementById("queuetube-panel");
    if (panel) panel.remove();
    showToast("Queue stopped.");
  });
}

function watchForVideoEnd() {
  const tryAttach = setInterval(() => {
    const video = document.querySelector("video");
    if (!video) return;
    clearInterval(tryAttach);
    video.addEventListener("ended", () => {
      getQueue(queue => {
        getIndex(idx => {
          if (idx + 1 < queue.length) {
            showToast(`⏭ Playing next: ${queue[idx + 1].title}`);
            setTimeout(() => goToIndex(idx + 1), 1500);
          } else {
            showToast("🎉 Queue complete!");
          }
        });
      });
    });
  }, 500);
}

// ── Toast ────────────────────────────────────────────────────

function showToast(msg) {
  let toast = document.getElementById("queuetube-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "queuetube-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("visible"), 3000);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Router ───────────────────────────────────────────────────

let lastUrl = location.href;

function onNavigate() {
  const url = location.href;
  if (url === lastUrl) return;
  const previousUrl = lastUrl;
  lastUrl = url;

  const panel = document.getElementById("queuetube-panel");
  if (panel) panel.remove();

  route(previousUrl);
}

function route(previousUrl) {
  const url = location.href;
  previousUrl = previousUrl || "";

  if (url.includes("/feed/subscriptions")) {
    if (!sessionStorage.getItem("queuetube_reloaded")) {
      sessionStorage.setItem("queuetube_reloaded", "1");
      location.reload();
      return;
    }
    waitForElement("ytd-rich-item-renderer, ytd-video-renderer", () => {
      injectQueueButton();
    });
  } else if (previousUrl.includes("/feed/subscriptions") && !url.includes("/watch")) {
    if (!sessionStorage.getItem("queuetube_left")) {
      sessionStorage.setItem("queuetube_left", "1");
      sessionStorage.removeItem("queuetube_reloaded");
      location.reload();
      return;
    }
    sessionStorage.removeItem("queuetube_left");
  } else {
    sessionStorage.removeItem("queuetube_reloaded");
    sessionStorage.removeItem("queuetube_left");
  }

  if (url.includes("/watch")) {
    getQueue(queue => {
      if (queue.length > 0) {
        waitForElement("ytd-watch-flexy, ytd-app", () => {
          buildPlayerUI();
          watchForVideoEnd();
        });
      }
    });
  }
}

function waitForElement(selector, callback, timeout = 8000) {
  if (document.querySelector(selector)) { callback(); return; }
  const start = Date.now();
  const obs = new MutationObserver(() => {
    if (document.querySelector(selector)) {
      obs.disconnect();
      callback();
    } else if (Date.now() - start > timeout) {
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

new MutationObserver(onNavigate).observe(document, { subtree: true, childList: true });
route();
