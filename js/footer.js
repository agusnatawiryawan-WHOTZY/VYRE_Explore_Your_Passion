document.addEventListener("DOMContentLoaded", () => {
  let footer = document.querySelector("#siteFooter");
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "siteFooter";
    footer.id = "siteFooter";
    footer.innerHTML = `<div class="footerGlow footerParallax" data-speed="0.12"></div><div class="footerContainer"><div class="footerBrand footerReveal"><h2>VYRE</h2></div><div class="footerGrid"><div class="footerNewsletter footerReveal"><h3>STAY IN THE LOOP</h3><p>Discover new arrivals, stories, and things worth knowing from VYRE.</p><form class="footerForm"><label class="srOnly" for="footerEmail">Email address</label><input id="footerEmail" type="email" placeholder="Enter your email address" required><button type="submit">Subscribe <span>●</span></button></form></div><div class="footerColumn footerReveal"><h3>COMPANY</h3><a href="index.html">Home</a><a href="marketplace.html">Marketplace</a><a href="profile.html">Profile</a><a href="index.html#faq">Contact</a></div><div class="footerColumn footerReveal"><h3>SUPPORT</h3><a href="index.html#faq">FAQ</a><a href="cart.html">Cart</a><a href="payment.html">Payment</a><a href="index.html#faq">Contact</a></div></div><div class="footerSocial footerReveal"><h3>SOCIAL MEDIA</h3><a href="#">Instagram</a><span>·</span><a href="#">TikTok</a><span>·</span><a href="#">YouTube</a></div><div class="footerBottom footerReveal"><span>© 2026 VYRE. All rights reserved.</span><button class="footerBackTop" type="button" aria-label="Back to top"><span class="material-symbols-rounded">north</span><small>Back</small></button></div></div>`;
    document.body.append(footer);
  }
  const revealItems = document.querySelectorAll(".footerReveal");
  const parallaxItems = document.querySelectorAll(".footerParallax");
  const backTop = document.querySelector(".footerBackTop");
  const form = document.querySelector(".footerForm");

  if (!footer) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 70}ms`;
    observer.observe(item);
  });

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!reducedMotion) {
    const updateParallax = () => {
      const rect = footer.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed) || 0.1;
        item.style.transform = `translateY(${(progress - 0.5) * speed * 300}px)`;
      });
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    updateParallax();
  }

  backTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = form.querySelector("button");
    button.textContent = "Subscribed";

    setTimeout(() => {
      form.reset();
      button.innerHTML = "Subscribe <span>●</span>";
    }, 1800);
  });
});