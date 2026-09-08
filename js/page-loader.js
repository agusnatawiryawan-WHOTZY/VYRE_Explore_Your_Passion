document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector("#pageLoader");
  const progress = document.querySelector("#loaderProgress");
  const status = document.querySelector("#loaderStatus");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const statuses = ["BOOTING VYRE CORE", "SYNCING YOUR WORLD", "LOADING EXPERIENCE"];

  if (!loader) {
    return;
  }

  let value = 8;
  let statusIndex = 0;
  const interval = setInterval(() => {
    value = Math.min(value + Math.floor(Math.random() * 12) + 4, 92);
    progress.style.width = `${value}%`;
    status.textContent = statuses[statusIndex % statuses.length];
    statusIndex += 1;
  }, 180);

  const hideLoader = () => {
    clearInterval(interval);
    progress.style.width = "100%";
    status.textContent = "SYSTEM READY";
    loader.classList.add("is-loaded");
    document.body.classList.remove("page-is-loading");
    setTimeout(() => loader.remove(), reducedMotion ? 0 : 500);
  };

  window.vyreNavigate = (targetUrl) => {
    loader.classList.remove("is-loaded");
    document.body.classList.add("page-is-loading");
    progress.style.width = "100%";
    status.textContent = "ENTERING NEXT LEVEL";
    setTimeout(() => { window.location.href = targetUrl; }, reducedMotion ? 0 : 320);
  };

  const finishWindowLoad = () => {
    clearInterval(interval);
    progress.style.width = "96%";
    status.textContent = "FINALIZING SYSTEM";
    setTimeout(hideLoader, reducedMotion ? 0 : 1200);
  };

  if (document.readyState === "complete") {
    finishWindowLoad();
  } else {
    window.addEventListener("load", finishWindowLoad, { once: true });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) {
      return;
    }

    const url = new URL(link.href, window.location.href);
    const isSamePageAnchor = url.origin === window.location.origin &&
      url.pathname === window.location.pathname && url.hash;
    const isInternalPage = url.origin === window.location.origin &&
      url.pathname !== window.location.pathname;

    if (!isInternalPage || isSamePageAnchor) {
      return;
    }

    event.preventDefault();
    window.vyreNavigate(url.href);
  });
});
