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
      return "Untuk gaming dan audio imersif, pilih Headset dengan Adaptive Sound, Active Noise Cancelling, dan Hi-Res Audio. Harganya mulai dari $399.000.";
    if (text.includes("controller") || text.includes("game"))
      return "Controller cocok untuk kontrol presisi. Controller mulai dari $299.000, sedangkan Controller Pro menawarkan pengalaman premium seharga $499.000.";
    if (
      text.includes("bike") ||
      text.includes("bicycle") ||
      text.includes("sepeda")
    )
      return "Bicycle VYRE dirancang untuk perjalanan dan momentum harian. Harganya mulai dari $2.999.000.";
    if (
      text.includes("shoe") ||
      text.includes("sepatu") ||
      text.includes("lari")
    )
      return "Untuk bergerak lebih nyaman, Running Shoes tersedia seharga $799.000 dan Sport Shoes seharga $699.000.";
    if (
      text.includes("harga") ||
      text.includes("price") ||
      text.includes("murah")
    )
      return "VYRE punya pilihan mulai dari $299.000 untuk Controller dan $399.000 untuk Headset. Buka Catalog untuk melihat semua produk.";
    return "Saya bisa membantu tentang Headset, Controller, Bicycle, Running Shoes, harga, atau rekomendasi produk VYRE.";
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
