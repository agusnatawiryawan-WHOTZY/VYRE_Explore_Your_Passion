document.addEventListener("DOMContentLoaded", () => {
  const navMobile = document.getElementById("containerNavMobile");
  const overlayNav = document.querySelector(".overlayNavMobile");
  const dropDownMenu = document.querySelector(".dropDownMenuMobile");
  const desktopPassionMenu = document.querySelector(".container__dropDownPassionDeks");
  const mobilePassionWrapper = document.querySelector(".container__dropDownMenu");
  const navbarMain = document.getElementById("navBarMain");
  const desktopPassionToggle = document.getElementById("btnPassionDropDeks");

  const closeDesktopPassionMenu = () => {
    desktopPassionMenu?.classList.remove("dropDeksAktif");
    desktopPassionToggle?.setAttribute("aria-expanded", "false");
  };

  const closeMobileMenu = () => {
    navMobile?.classList.remove("menuNavMobileAktif");
    overlayNav?.classList.remove("aktifOverlayNav");
    document.body.classList.remove("mobile-nav-open");
  };

  document.querySelectorAll(
    "[data-scroll-target], #navDekstop a[href^='#'], #navMobile a[href^='#']"
  ).forEach((control) => {
    control.addEventListener("click", (event) => {
      const targetSelector = control.dataset.scrollTarget || control.getAttribute("href");
      const target = document.querySelector(targetSelector);
      if (!target) {
        return;
      }

      event.preventDefault();
      if (window.vyreLenis) {
        window.vyreLenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeMobileMenu();
      closeDesktopPassionMenu();
      dropDownMenu?.classList.remove("dropAktif");
    });
  });

  document.querySelectorAll("[data-page-target]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      const targetUrl = control.dataset.pageTarget;
      if (window.vyreNavigate) {
        window.vyreNavigate(targetUrl);
      } else {
        window.location.href = targetUrl;
      }
      closeMobileMenu();
    });
  });

  desktopPassionToggle?.setAttribute("aria-expanded", "false");
  desktopPassionToggle?.addEventListener("click", () => {
    const isOpen = desktopPassionMenu?.classList.toggle("dropDeksAktif") ?? false;
    desktopPassionToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#navDekstop")) {
      closeDesktopPassionMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDesktopPassionMenu();
    }
  });

  document.getElementById("btnToDropDownMobilePassion")?.addEventListener("click", () => {
    dropDownMenu?.classList.toggle("dropAktif");
    if (mobilePassionWrapper) {
      mobilePassionWrapper.style.backgroundColor = dropDownMenu?.classList.contains("dropAktif")
        ? "rgba(0, 0, 0, 0.053)"
        : "white";
    }
  });

  document.getElementById("hamburgerNavMobile")?.addEventListener("click", () => {
    navMobile?.classList.add("menuNavMobileAktif");
    overlayNav?.classList.add("aktifOverlayNav");
    document.body.classList.add("mobile-nav-open");
  });

  document.getElementById("closeNavMobile")?.addEventListener("click", closeMobileMenu);
  overlayNav?.addEventListener("click", closeMobileMenu);

  window.addEventListener("scroll", () => {
    navbarMain?.classList.toggle("navPaddingAktif", window.scrollY > 500);
  }, { passive: true });
});