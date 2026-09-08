document.addEventListener("DOMContentLoaded", () => {
	const modal = document.querySelector("#purchaseModal");
	const form = document.querySelector("#purchaseForm");
	const productImage = document.querySelector("#purchaseProductImage");
	const productCategory = document.querySelector("#purchaseProductCategory");
	const productName = document.querySelector("#purchaseProductName");
	const productPrice = document.querySelector("#purchaseProductPrice");
	const quantity = document.querySelector("#purchaseQuantity");
	const status = document.querySelector("#purchaseStatus");
	const addToCartButton = document.querySelector("#addToCartButton");
		const paymentModal = document.querySelector("#paymentModal");
		const paymentForm = document.querySelector("#paymentForm");
		const paymentProductName = document.querySelector("#paymentProductName");
		const paymentTotal = document.querySelector("#paymentTotal");
		const paymentStatus = document.querySelector("#paymentStatus");
		const successModal = document.querySelector("#homepageSuccessModal");
		const shopToast = document.querySelector("#shopToast");
		const cardFields = document.querySelector("#cardFields");
		const paymentMethods = document.querySelectorAll("[name='paymentMethod']");
	const productImages = document.querySelectorAll(
		".container__swiperHero img, .aboutRightImage img, .passionProductImage img, " +
			".passionPromoProduct img, .passionCardImage img"
	);

	if (!modal || !form || !productImages.length) {
		return;
	}

	const prices = {
		Headset: "$399.000",
		"Wireless Headset": "$449.000",
		Controller: "$299.000",
		"Controller Pro": "$499.000",
		Bicycle: "$2.999.000",
		"Performance Bike": "$3.499.000",
		"Running Shoes": "$799.000",
		"Sport Shoes": "$699.000",
	};

		const getPriceValue = (price) => Number(price.replace(/[^0-9]/g, ""));

		const formatPrice = (value) => `$${value.toLocaleString("id-ID")}`;
		const getCart = () => JSON.parse(localStorage.getItem("vyreCart") || "[]");
		const saveCart = (cart) => localStorage.setItem("vyreCart", JSON.stringify(cart));
		const updateCartCount = () => {
			const count = getCart().reduce((total, item) => total + item.quantity, 0);
			document.querySelectorAll("#cartCount, #cartCountMobile").forEach((element) => {
				element.textContent = count;
			});
		};

	const openPurchase = (image) => {
		const name = image.alt.replace(/gaming|sport|wireless|performance/gi, "").trim();
		const productCard = image.closest(".aboutProductSlide, .passionProductCard");
		const category = productCard?.querySelector(".aboutRightBottom span, .passionCardBottom span")?.textContent.trim() || "VYRE SELECT";

		productImage.src = image.src;
		productImage.alt = image.alt;
		productCategory.textContent = category;
		productName.textContent = name;
		productPrice.textContent = prices[name] || "$399.000";
		quantity.value = "1";
		status.textContent = "";
		modal.classList.add("is-open");
		modal.setAttribute("aria-hidden", "false");
		document.body.classList.add("purchaseModalOpen");
		quantity.focus();
	};
	const showToast = (message) => {
		if (!shopToast) return;
		shopToast.textContent = message;
		shopToast.classList.add("is-visible");
		setTimeout(() => shopToast.classList.remove("is-visible"), 2500);
	};

	const addCurrentProductToCart = () => {
		const cart = getCart();
		const product = {
			name: productName.textContent,
			price: getPriceValue(productPrice.textContent),
			image: productImage.src,
			category: productCategory.textContent,
		};
		const existingProduct = cart.find((item) => item.name === product.name);
		if (existingProduct) {
			existingProduct.quantity += Number(quantity.value);
		} else {
			cart.push({ ...product, quantity: Number(quantity.value) });
		}
		saveCart(cart);
		updateCartCount();
		status.textContent = "Product added to your cart.";
	};

	productImages.forEach((image) => {
		image.setAttribute("tabindex", "0");
		image.setAttribute("role", "button");
		image.setAttribute("aria-label", `Buy ${image.alt}`);
		image.addEventListener("click", (event) => {
			event.preventDefault();
			openPurchase(image);
		});
		image.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openPurchase(image);
			}
		});
	});

	addToCartButton?.addEventListener("click", addCurrentProductToCart);
	updateCartCount();

	const closePurchase = () => {
		modal.classList.remove("is-open");
		modal.setAttribute("aria-hidden", "true");
		document.body.classList.remove("purchaseModalOpen");
	};

	const closePayment = () => {
		paymentModal?.classList.remove("is-open");
		paymentModal?.setAttribute("aria-hidden", "true");
		document.body.classList.remove("purchaseModalOpen");
	};

	const closeSuccess = () => {
		successModal?.classList.remove("is-open");
		successModal?.setAttribute("aria-hidden", "true");
		document.body.classList.remove("purchaseModalOpen");
	};

	const updatePaymentMethod = () => {
		const isCard = document.querySelector("[name='paymentMethod']:checked")?.value === "card";
		cardFields?.classList.toggle("is-hidden", !isCard);
		cardFields?.querySelectorAll("input").forEach((input) => {
			input.required = isCard;
		});
	};

	modal.addEventListener("click", (event) => {
		if (event.target.closest("[data-close-purchase]")) {
			closePurchase();
		}
	});

	paymentModal?.addEventListener("click", (event) => {
		if (event.target.closest("[data-close-payment]")) {
			closePayment();
		}
	});

	successModal?.addEventListener("click", (event) => {
		if (event.target.closest("[data-close-success]")) {
			closeSuccess();
		}
	});

	paymentMethods.forEach((method) => method.addEventListener("change", updatePaymentMethod));
	updatePaymentMethod();

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && modal.classList.contains("is-open")) {
			closePurchase();
		}
		if (event.key === "Escape" && paymentModal?.classList.contains("is-open")) {
			closePayment();
		}
		if (event.key === "Escape" && successModal?.classList.contains("is-open")) {
			closeSuccess();
		}
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const unitPrice = getPriceValue(productPrice.textContent);
		paymentProductName.textContent = `${quantity.value} x ${productName.textContent}`;
		paymentTotal.textContent = formatPrice(unitPrice * Number(quantity.value));
		status.textContent = "";
		closePurchase();
		paymentModal?.classList.add("is-open");
		paymentModal?.setAttribute("aria-hidden", "false");
		document.body.classList.add("purchaseModalOpen");
		paymentModal?.querySelector("#paymentName")?.focus();
	});

	paymentForm?.addEventListener("submit", (event) => {
		event.preventDefault();
		paymentStatus.textContent = "Payment simulated successfully. Your order is being prepared.";
		localStorage.removeItem("vyreCart");
		updateCartCount();
		showToast("Payment successful. Order confirmed.");
		closePayment();
		successModal?.classList.add("is-open");
		successModal?.setAttribute("aria-hidden", "false");
		document.body.classList.add("purchaseModalOpen");
	});
});
