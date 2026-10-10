"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type HomeAnchorProps = Omit<ComponentProps<typeof Link>, "href" | "scroll"> & {
  section: string;
};

let historyFrame = 0;
let restoreFrame = 0;
let savedRestoration: History["scrollRestoration"] | null = null;

// Clicks, Back/Forward, and unmount share cancellation so an older restoration
// cannot overwrite the user's next anchor click.
function cancelScheduledFrames() {
  window.cancelAnimationFrame(historyFrame);
  window.cancelAnimationFrame(restoreFrame);
  historyFrame = 0;
  restoreFrame = 0;
}

export function cancelHomeAnchorRestoration() {
  cancelScheduledFrames();
  if (savedRestoration !== null) window.history.scrollRestoration = savedRestoration;
  savedRestoration = null;
}

export function restoreHomeAnchorFromHistory() {
  cancelHomeAnchorRestoration();
  if (window.location.pathname !== "/") return;
  const hash = window.location.hash;
  if (!document.getElementById(hash.slice(1))) return;
  // Resolve the current hash after native history restoration, with a stale-work guard.
  savedRestoration = window.history.scrollRestoration;
  window.history.scrollRestoration = "manual";
  historyFrame = window.requestAnimationFrame(() => {
    historyFrame = 0;
    if (window.location.pathname !== "/" || window.location.hash !== hash) {
      cancelHomeAnchorRestoration();
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" });
    restoreFrame = window.requestAnimationFrame(cancelHomeAnchorRestoration);
  });
}

function scrollToHomeAnchor(section: string) {
  const restoringHistory = savedRestoration !== null;
  cancelScheduledFrames();
  function scroll() {
    historyFrame = 0;
    document.getElementById(section)?.scrollIntoView({ behavior: "instant", block: "start" });
    if (restoringHistory) restoreFrame = window.requestAnimationFrame(cancelHomeAnchorRestoration);
  }
  // Coalesce clicks within a frame. During popstate, keep restoration disabled
  // until its task finishes so the browser cannot overwrite the latest target.
  historyFrame = window.requestAnimationFrame(scroll);
}

export function HomeAnchor({ section, onClick, ...props }: HomeAnchorProps) {
  return (
    <Link
      {...props}
      href={`#${section}`}
      scroll={false}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        // A repeated or interrupted click still scrolls, even if the URL is unchanged.
        scrollToHomeAnchor(section);
      }}
    />
  );
}
