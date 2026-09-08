document.addEventListener("DOMContentLoaded", () => {
  const parallaxTargets = [
    ["#hero .textBgHero", -0.08],
    ["#hero .container__textCtaHero", 0.04],
    ["#hero .container__fotoHeroRigth", 0.08],
    ["#about .container__textCtaLeft", -0.04],
    ["#about .container__swiperAbout", 0.05],
    ["#passion .passionIntro", -0.04],
    ["#passion .passionFeaturedProduct", 0.06],
    ["#passion .passionLifestyleImage", -0.05],
    ["#passion .passionPromoCard", 0.04],
    ["#passion .passionProductHeading", -0.03],
    ["#stories .storiesHeroText", 0.05],
    ["#stories .storiesHeroLabel", -0.04],
    ["#stories .storiesBottomLeft", 0.03],
    ["#faq .faqHeader", -0.04],
    ["#faq .faqSponsors", 0.03],
    ["#cta .ctaTitle", -0.04],
    [".marketHero h1", -0.035],
    [".marketLead", 0.045],
    [".marketSearchArea", 0.025],
    [".authIntro h1", -0.04],
    [".authPanel", 0.035],
    [".profileCard", 0.035],
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const controllerScene = document.querySelector(".passionControllerScene");
  const controller = document.querySelector(".passionControllerBackground");
  const items = parallaxTargets.flatMap(([selector, speed]) => {
    return [...document.querySelectorAll(selector)].map((element) => ({ element, speed }));
  });

  if (reducedMotion || (!items.length && !controller)) {
    return;
  }

  let framePending = false;

  const updateParallax = () => {
    framePending = false;
    items.forEach(({ element, speed }) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return;
      }

      const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const movement = distanceFromCenter * speed;
      element.style.setProperty("--parallax-y", `${movement.toFixed(2)}px`);
      element.style.transform = `translate3d(0, var(--parallax-y), 0)`;
    });

    if (controller && controllerScene) {
      const rect = controllerScene.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const rotateX = 8 + progress * 16;
      const rotateY = -16 - progress * 28;
      const rotateZ = 12 + progress * 10;
      const translateX = progress * -5;
      const translateY = progress * 8;
      const scale = .9 + Math.abs(progress) * .08;
      controller.style.transform = `translate3d(${translateX.toFixed(2)}%, ${translateY.toFixed(2)}%, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    }
  };

  const requestParallaxUpdate = () => {
    if (framePending) {
      return;
    }
    framePending = true;
    window.requestAnimationFrame(updateParallax);
  };

  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate);
  requestParallaxUpdate();
});