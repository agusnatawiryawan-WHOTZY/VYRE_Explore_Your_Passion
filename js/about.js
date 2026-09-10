// ========================================================
// ABOUT SECTION
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // ACTIVITY SWIPER
  // ======================================================

  const aboutSwiper = new Swiper(".container__swiperAbout", {
    slidesPerView: 1,

    spaceBetween: 0,

    loop: true,

    speed: 800,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  // ======================================================
  // PRODUCT SWIPER
  // ======================================================

  const productSwiper = new Swiper(".aboutProductSwiper", {
    slidesPerView: 1,

    spaceBetween: 0,

    loop: true,

    speed: 800,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  // ======================================================
  // REVEAL ANIMATION
  // ======================================================

  const revealElements = document.querySelectorAll(
    "#about .container__eyeBrow_about, " +
      "#about .container__textCtaMain, " +
      "#about .container__swiperAbout, " +
      "#about .aboutRightTop, " +
      "#about .aboutProductSwiper",
  );

  revealElements.forEach((element) => {
    element.classList.add("aboutReveal");
  });

  const aboutObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((element) => {
    aboutObserver.observe(element);
  });

  // ======================================================
  // SIMPLE PARALLAX
  // ======================================================

  const aboutSection = document.querySelector("#about");

  const aboutImages = document.querySelectorAll("#about .swiperSlideAbout img");

  window.addEventListener("scroll", () => {
    if (!aboutSection) {
      return;
    }

    const sectionTop = aboutSection.offsetTop;
    const sectionHeight = aboutSection.offsetHeight;
    const scrollTop = window.scrollY;

    // Cek apakah About berada di area viewport
    const sectionIsVisible =
      scrollTop + window.innerHeight > sectionTop &&
      scrollTop < sectionTop + sectionHeight;

    if (!sectionIsVisible) {
      return;
    }

    const movement = (scrollTop - sectionTop) * 0.03;

    aboutImages.forEach((image) => {
      image.style.transform = `translateY(${movement}px) scale(1.03)`;
    });
  });
});
