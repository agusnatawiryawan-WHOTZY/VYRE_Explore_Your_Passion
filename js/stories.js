// ========================================================
// STORIES SECTION
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

  const storiesSection =
    document.querySelector("#stories");


  if (!storiesSection) {
    return;
  }


  // ======================================================
  // INTERSECTION OBSERVER
  // ======================================================

  const revealElements =
    storiesSection.querySelectorAll(
      ".storiesHeroVisual, " +
      ".storiesBottomLeft, " +
      ".storiesBottomCenter, " +
      ".storiesBottomRight, " +
      ".storiesMiniCard"
    );


  revealElements.forEach((element, index) => {

    element.classList.add(
      "storiesReveal"
    );


    element.style.transitionDelay =
      `${index * 0.08}s`;

  });


  const storiesObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "is-visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    storiesObserver.observe(
      element
    );

  });


  // ======================================================
  // PARALLAX
  // ======================================================

  const visualItems =
    storiesSection.querySelectorAll(
      ".storiesVisualItem img"
    );


  const updateParallax = () => {

    const rect =
      storiesSection.getBoundingClientRect();


    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    ) {

      const movement =
        rect.top * -0.025;


      visualItems.forEach(
        (image, index) => {

          // Setiap image memiliki
          // sedikit perbedaan movement
          const offset =
            movement * (1 + index * 0.15);


          image.style.transform =
            `translateY(${offset}px) scale(1.04)`;

        }
      );

    }

  };


  window.addEventListener(
    "scroll",
    updateParallax,
    {
      passive: true
    }
  );


  updateParallax();

});