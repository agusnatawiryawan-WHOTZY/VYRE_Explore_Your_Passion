document.addEventListener("DOMContentLoaded", () => {
  if (typeof Lenis === "undefined") {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    return;
  }

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
  });

  window.vyreLenis = lenis;

  const animationFrame = (time) => {
    lenis.raf(time);
    window.requestAnimationFrame(animationFrame);
  };

  window.requestAnimationFrame(animationFrame);

});