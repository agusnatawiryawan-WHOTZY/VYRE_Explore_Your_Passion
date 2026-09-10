// ========================================================
// FAQ
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

  const faqSection =
    document.querySelector("#faq");


  if (!faqSection) {
    return;
  }


  // ======================================================
  // ACCORDION
  // ======================================================

  const faqItems =
    faqSection.querySelectorAll(".faqItem");


  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faqQuestion");


    question.addEventListener("click", () => {

      const isOpen =
        item.classList.contains("is-open");


      // Close all other items.
      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("is-open");

        const otherQuestion =
          otherItem.querySelector(".faqQuestion");

        otherQuestion.setAttribute(
          "aria-expanded",
          "false"
        );

      });


      // Kalau item yang diklik
      // sebelumnya belum terbuka
      if (!isOpen) {

        item.classList.add("is-open");

        question.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  // ======================================================
  // INTERSECTION OBSERVER
  // ======================================================

  const revealElements =
    faqSection.querySelectorAll(
      ".faqHeader, " +
      ".faqItem, " +
      ".faqSponsors"
    );


  const faqObserver =
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


  revealElements.forEach(
    (element, index) => {

      element.classList.add(
        "faqReveal"
      );


      element.style.transitionDelay =
        `${index * 0.08}s`;


      faqObserver.observe(
        element
      );

    }
  );

});