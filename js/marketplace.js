document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#catalogGrid");
  const resultCount = document.querySelector("#catalogResultCount");
  const toast = document.querySelector("#catalogToast");
  const searchInput = document.querySelector("#marketSearchInput");
  const sortSelect = document.querySelector("#marketSort");
  const searchArea = document.querySelector(".marketSearchArea");
  const marketMain = document.querySelector(".marketMain");
  const marketHeader = document.querySelector(".marketHeader");
  const menuToggle = document.querySelector("#marketMenuToggle");
  const marketSearchForm = document.querySelector("#marketSearchForm");
  if (searchArea && marketHeader)
    marketHeader.insertBefore(searchArea, menuToggle);
  if (marketHeader && !marketHeader.querySelector(".marketUtility")) {
    const utilityBar = document.createElement("div");
    utilityBar.className = "marketUtility";
    utilityBar.innerHTML =
      "<span>VYRE MARKETPLACE</span><span>Gear untuk setiap versi dirimu</span>";
    marketHeader.prepend(utilityBar);
  }
  const currentUser = JSON.parse(
    localStorage.getItem("vyreCurrentUser") || "null",
  );
  if (currentUser)
    document.querySelector("#marketProfileLabel").textContent =
      currentUser.name;
  const categorySection = document.createElement("section");
  categorySection.className = "marketCategories";
  categorySection.setAttribute("aria-labelledby", "categoryTitle");
  categorySection.innerHTML = `<div class="marketCategoriesHeader"><p class="marketEyebrow">CURATED WORLDS</p><h2 id="categoryTitle">Pilih ruang<br><em>permainanmu.</em></h2></div><div class="marketCategoryGrid"><a class="marketCategory marketCategoryFashion" href="marketplace.html?category=FASHION"><span class="marketCategoryNumber">01</span><span class="material-symbols-rounded marketCategoryIcon">checkroom</span><span class="marketCategoryText"><strong>Fashion</strong><small>Daily uniform, elevated.</small></span><span class="material-symbols-rounded marketCategoryArrow">arrow_outward</span></a><a class="marketCategory marketCategoryGaming" href="marketplace.html?category=GAMING"><span class="marketCategoryNumber">02</span><span class="material-symbols-rounded marketCategoryIcon">stadia_controller</span><span class="marketCategoryText"><strong>Gaming</strong><small>Level up your setup.</small></span><span class="material-symbols-rounded marketCategoryArrow">arrow_outward</span></a><a class="marketCategory marketCategorySport" href="marketplace.html?category=SPORT"><span class="marketCategoryNumber">03</span><span class="material-symbols-rounded marketCategoryIcon">sprint</span><span class="marketCategoryText"><strong>Sport</strong><small>Move with intention.</small></span><span class="material-symbols-rounded marketCategoryArrow">arrow_outward</span></a></div>`;
  document.querySelector(".marketToolbar").before(categorySection);
  const products = [
    [
      "FASHION",
      "Track Jacket",
      "assets/jaket_keren.png",
      899000,
      "Jaket training hitam dengan detail garis kontras untuk gaya aktif sehari-hari.",
    ],
    [
      "FASHION",
      "Skena Track Pants",
      "assets/celana_skena.png",
      699000,
      "Celana santai berpotongan longgar dengan grafis tribal yang berani.",
    ],
    [
      "FASHION",
      "Essential Black Shirt",
      "assets/kemeja.png",
      499000,
      "Kemeja hitam serbaguna dengan bahan ringan dan potongan rapi.",
    ],
    [
      "GAMING",
      "Headset",
      "assets/headset.png",
      399000,
      "Suara imersif dan bantalan nyaman untuk bermain sepanjang malam.",
    ],
    [
      "GAMING",
      "Controller",
      "assets/controller.png",
      299000,
      "Grip ergonomis dan kontrol responsif untuk setiap gerakan presisi.",
    ],
    [
      "SPORT",
      "Running Shoes",
      "assets/running-shoe.png",
      799000,
      "Sepatu lari fleksibel dengan bantalan ringan untuk setiap langkah.",
    ],
    [
      "SPORT",
      "Performance Bike",
      "assets/bicycle.png",
      3499000,
      "Sepeda performa untuk perjalanan kota, tikungan cepat, dan jalan terbuka.",
    ],
  ];
  const suggestionList = document.createElement("div");
  suggestionList.className = "marketSearchSuggestions";
  suggestionList.setAttribute("role", "listbox");
  suggestionList.hidden = true;
  marketSearchForm.append(suggestionList);

  const matchesSearch = (product, query) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;
    return `${product[0]} ${product[1]} ${product[4]}`
      .toLowerCase()
      .includes(normalizedQuery);
  };

  const getSearchSuggestions = async (query) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return products
      .map((product, index) => ({ product, index }))
      .filter(
        ({ product }) =>
          (activeFilter === "ALL" || product[0] === activeFilter) &&
          matchesSearch(product, normalizedQuery),
      )
      .slice(0, 5);
  };
  const closeSuggestions = () => {
    suggestionList.hidden = true;
    suggestionList.innerHTML = "";
  };
  const updateSuggestions = async () => {
    const suggestions = await getSearchSuggestions(searchInput.value);
    if (!suggestions.length || document.activeElement !== searchInput) {
      closeSuggestions();
      return;
    }
    suggestionList.innerHTML = suggestions
      .map(
        ({ product, index }) =>
          `<button type="button" class="marketSearchSuggestion" role="option" data-suggestion-index="${index}"><span class="material-symbols-rounded">search</span><span><strong>${product[1]}</strong><small>${product[0]} · ${formatPrice(product[3])}</small></span><span class="material-symbols-rounded">arrow_outward</span></button>`,
      )
      .join("");
    suggestionList.hidden = false;
  };
  const requestedCategory = new URLSearchParams(window.location.search)
    .get("category")
    ?.toUpperCase();
  let activeFilter = ["ALL", "FASHION", "GAMING", "SPORT"].includes(
    requestedCategory,
  )
    ? requestedCategory
    : "ALL";
  document.querySelectorAll("#marketNav a[href*='marketplace.html']").forEach((link) => {
    const category = new URL(link.href, window.location.href).searchParams
      .get("category")
      ?.toUpperCase();
    link.classList.toggle(
      "is-active",
      category ? category === activeFilter : activeFilter === "ALL",
    );
  });
  const formatPrice = (value) => `Rp${value.toLocaleString("id-ID")}`;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };
  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("vyreCart") || "[]");
    document.querySelector("#marketCartCount").textContent = cart.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  };
  const addToCart = (product) => {
    if (!currentUser) {
      window.location.href = `auth.html?redirect=${encodeURIComponent("marketplace.html")}`;
      return;
    }
    const cart = JSON.parse(localStorage.getItem("vyreCart") || "[]");
    const existing = cart.find((item) => item.name === product[1]);
    if (existing) existing.quantity += 1;
    else
      cart.push({
        category: product[0],
        name: product[1],
        image: product[2],
        price: product[3],
        quantity: 1,
      });
    localStorage.setItem("vyreCart", JSON.stringify(cart));
    updateCount();
    // showToast(`${product[1]} masuk ke keranjang.`);
  };
  const render = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleProducts = products.filter(
      (product) =>
        (activeFilter === "ALL" || product[0] === activeFilter) &&
        matchesSearch(product, query),
    );
    if (sortSelect.value === "low") visibleProducts.sort((a, b) => a[3] - b[3]);
    if (sortSelect.value === "high")
      visibleProducts.sort((a, b) => b[3] - a[3]);
    if (sortSelect.value === "name")
      visibleProducts.sort((a, b) => a[1].localeCompare(b[1]));
    resultCount.textContent = `${visibleProducts.length} PRODUK`;
    grid.innerHTML = visibleProducts.length
      ? visibleProducts
          .map(
            (product) =>
              `<article class="catalogCard"><div class="catalogCardImage"><span class="marketBadge">${product[0]}</span><img src="${product[2]}" alt="${product[1]}" loading="lazy"></div><div class="catalogCardInfo"><p class="catalogCardCategory">${product[0]}</p><h2>${product[1]}</h2><p class="catalogCardDescription">${product[4]}</p><div class="marketRating"><span>★★★★★</span> 4.9 · 128 terjual</div><div class="catalogCardBottom"><strong class="catalogCardPrice">${formatPrice(product[3])}</strong><button class="catalogAdd" type="button" data-product-index="${products.indexOf(product)}" aria-label="Tambah ${product[1]}"><span class="material-symbols-rounded">add_shopping_cart</span></button></div></div></article>`,
          )
          .join("")
      : `<p class="catalogEmpty">Produk yang kamu cari belum ditemukan.</p>`;
  };
  document.querySelectorAll(".catalogFilter").forEach((button) =>
    button.classList.toggle("is-active", button.dataset.filter === activeFilter),
  );
  document.querySelectorAll(".catalogFilter").forEach((button) =>
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".catalogFilter")
        .forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      activeFilter = button.dataset.filter;
      render();
    }),
  );
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-index]");
    if (button) addToCart(products[Number(button.dataset.productIndex)]);
  });
  searchInput.addEventListener("input", () => {
    render();
    updateSuggestions();
  });
  searchInput.addEventListener("focus", updateSuggestions);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSuggestions();
  });
  marketSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    closeSuggestions();
    render();
  });
  suggestionList.addEventListener("click", (event) => {
    const suggestion = event.target.closest("[data-suggestion-index]");
    if (!suggestion) return;
    searchInput.value = products[Number(suggestion.dataset.suggestionIndex)][1];
    closeSuggestions();
    render();
    searchInput.focus();
  });
  document.addEventListener("click", (event) => {
    if (!marketSearchForm.contains(event.target)) closeSuggestions();
  });
  sortSelect.addEventListener("change", render);
  document.querySelectorAll("[data-search-term]").forEach((button) =>
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.searchTerm;
      render();
      searchInput.focus();
    }),
  );
  const marketNav = document.querySelector("#marketNav");
  menuToggle.addEventListener("click", () => {
    const open = marketNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.querySelector(".material-symbols-rounded").textContent = open
      ? "close"
      : "menu";
  });
  updateCount();
  render();
});
