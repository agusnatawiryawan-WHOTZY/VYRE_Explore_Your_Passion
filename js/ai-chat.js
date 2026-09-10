document.addEventListener("DOMContentLoaded", () => {
  const widget = document.querySelector("#vyreAiWidget");
  const hero = document.querySelector("#hero");
  const toggle = document.querySelector("#vyreAiToggle");
  const close = document.querySelector("#vyreAiClose");
  const form = document.querySelector("#vyreAiForm");
  const input = document.querySelector("#vyreAiInput");
  const messages = document.querySelector("#vyreAiMessages");
  const quickPrompts = document.querySelectorAll("[data-ai-prompt]");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!widget || !hero || !toggle || !form) return;

  const updateVisibility = () => {
    widget.classList.toggle(
      "is-visible",
      hero.getBoundingClientRect().bottom <= 0,
    );
  };
  const observer = new IntersectionObserver(updateVisibility, { threshold: 0 });
  observer.observe(hero);
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();

  toggle.addEventListener("click", () => {
    const isOpen = widget.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) input.focus();
  });
  close?.addEventListener("click", () => {
    widget.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  const answerQuestion = (question) => {
    const text = question.toLowerCase();
    if (
      text.includes("headset") ||
      text.includes("audio") ||
      text.includes("suara")
    )
      return "For gaming and immersive audio, choose the Headset with Adaptive Sound, Active Noise Cancelling, and Hi-Res Audio. It starts at $399.000.";
    if (text.includes("controller") || text.includes("game"))
      return "The Controller is built for precise control. It starts at $299.000, while the Controller Pro offers a premium experience for $499.000.";
    if (
      text.includes("bike") ||
      text.includes("bicycle") ||
      text.includes("sepeda")
    )
      return "The VYRE Bicycle is designed for daily rides and momentum. It starts at $2.999.000.";
    if (
      text.includes("shoe") ||
      text.includes("sepatu") ||
      text.includes("lari")
    )
      return "For more comfortable movement, Running Shoes are available for $799.000 and Sport Shoes for $699.000.";
    if (
      text.includes("harga") ||
      text.includes("price") ||
      text.includes("murah")
    )
      return "VYRE offers options starting at $299.000 for the Controller and $399.000 for the Headset. Open the Catalog to see every product.";
    return "I can help with Headsets, Controllers, Bicycles, Running Shoes, pricing, or VYRE product recommendations.";
  };

  const submitQuestion = (question) => {
    if (!question) return;
    messages.insertAdjacentHTML(
      "beforeend",
      `<div class="vyreAiMessage vyreAiMessageUser"></div>`,
    );
    messages.lastElementChild.textContent = question;
    input.value = "";
    setTimeout(
      () => {
        messages.insertAdjacentHTML(
          "beforeend",
          `<div class="vyreAiMessage vyreAiMessageBot"></div>`,
        );
        messages.lastElementChild.textContent = answerQuestion(question);
        messages.scrollTo({
          top: messages.scrollHeight,
          behavior: reducedMotion ? "auto" : "smooth",
        });
      },
      reducedMotion ? 0 : 350,
    );
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuestion(input.value.trim());
  });
  quickPrompts.forEach((prompt) =>
    prompt.addEventListener("click", () =>
      submitQuestion(prompt.dataset.aiPrompt),
    ),
  );
});
