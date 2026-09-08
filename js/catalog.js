document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#catalogGrid");
  const resultCount = document.querySelector("#catalogResultCount");
  const toast = document.querySelector("#catalogToast");
  const products = [
    ["GAMING", "Headset", "assets/headset.png", 399000],
    ["GAMING", "Wireless Headset", "assets/headset.png", 449000],
    ["GAMING", "Controller", "assets/controller.png", 299000],
    ["GAMING", "Controller Pro", "assets/controller.png", 499000],
    ["SPORT", "Running Shoes", "assets/running-shoe.png", 799000],
    ["SPORT", "Sport Shoes", "assets/running-shoe.png", 699000],
    ["SPORT", "Bicycle", "assets/bicycle.png", 2999000],
    ["SPORT", "Performance Bike", "assets/bicycle.png", 3499000],
  ];
  const formatPrice = (value) => `$${value.toLocaleString("id-ID")}`;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };
  const requestedCategory = new URLSearchParams(window.location.search).get("category")?.toUpperCase();
  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("vyreCart") || "[]");
    document.querySelector("#catalogCartCount").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  };
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("vyreCart") || "[]");
    const existing = cart.find((item) => item.name === product[1]);
    if (existing) existing.quantity += 1;
    else cart.push({ category: product[0], name: product[1], image: product[2], price: product[3], quantity: 1 });
    localStorage.setItem("vyreCart", JSON.stringify(cart));
    updateCount();
    showToast(`${product[1]} added to cart.`);
  };
  const render = (filter = "ALL") => {
    const visibleProducts = products.filter((product) => filter === "ALL" || product[0] === filter);
    resultCount.textContent = `${visibleProducts.length} PRODUCTS`;
    grid.innerHTML = visibleProducts.length ? visibleProducts.map((product, index) => `<article class="catalogCard"><div class="catalogCardImage"><img src="${product[2]}" alt="${product[1]}"></div><div class="catalogCardInfo"><p class="catalogCardCategory">${product[0]}</p><h2>${product[1]}</h2><div class="catalogCardBottom"><strong class="catalogCardPrice">${formatPrice(product[3])}</strong><button class="catalogAdd" type="button" data-product-index="${products.indexOf(product)}">Add <span>+</span></button></div></div></article>`).join("") : `<p class="catalogEmpty">No ${filter.toLowerCase()} gear found in this loadout yet.</p>`;
  };
  document.querySelectorAll(".catalogFilter").forEach((filterButton) => filterButton.addEventListener("click", () => {
    document.querySelectorAll(".catalogFilter").forEach((button) => button.classList.remove("is-active"));
    filterButton.classList.add("is-active");
    render(filterButton.dataset.filter);
  }));
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-index]");
    if (button) addToCart(products[Number(button.dataset.productIndex)]);
  });
  const initialFilter = ["ALL", "FASHION", "GAMING", "SPORT"].includes(requestedCategory) ? requestedCategory : "ALL";
  document.querySelectorAll(".catalogFilter").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === initialFilter));
  updateCount();
  render(initialFilter);
});
