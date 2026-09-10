document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector("#cartContent");
  const toast = document.querySelector("#shopToast");
  const readCart = () => JSON.parse(localStorage.getItem("vyreCart") || "[]");
  const saveCart = (cart) =>
    localStorage.setItem("vyreCart", JSON.stringify(cart));
  const formatPrice = (value) => `$${value.toLocaleString("id-ID")}`;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };
  const render = () => {
    const cart = readCart();
    if (!cart.length) {
      content.innerHTML =
        '<div class="emptyCart"><h2>Your cart is empty</h2><p>Choose something that feels like you.</p><a class="shopButton" href="index.html">Explore products</a></div>';
      return;
    }
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    content.innerHTML = `<div class="cartLayout"><div class="cartItems">${cart.map((item, index) => `<article class="cartItem"><img src="${item.image}" alt="${item.name}"><div><p class="cartItemCategory">${item.category}</p><h2>${item.name}</h2><strong class="cartItemPrice">${formatPrice(item.price)}</strong><div class="cartControls"><button data-action="decrease" data-index="${index}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-action="increase" data-index="${index}" aria-label="Increase quantity">+</button></div></div><button class="cartRemove" data-action="remove" data-index="${index}">Remove</button></article>`).join("")}</div><aside class="cartSummary"><h2>Summary</h2><div class="summaryLine"><span>Items</span><span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div><div class="summaryLine summaryTotal"><span>Total</span><span>${formatPrice(total)}</span></div><a class="shopButton" href="payment.html">Continue to payment <span>→</span></a></aside></div>`;
  };
  content.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const cart = readCart();
    const index = Number(control.dataset.index);
    if (control.dataset.action === "increase") cart[index].quantity += 1;
    if (control.dataset.action === "decrease")
      cart[index].quantity = Math.max(1, cart[index].quantity - 1);
    if (control.dataset.action === "remove") {
      cart.splice(index, 1);
      showToast("Product removed from cart.");
    }
    saveCart(cart);
    render();
  });
  render();
});
