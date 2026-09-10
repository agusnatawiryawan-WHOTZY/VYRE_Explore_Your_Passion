document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector("#paymentContent");
  const modal = document.querySelector("#successModal");
  const toast = document.querySelector("#shopToast");
  const cart = JSON.parse(localStorage.getItem("vyreCart") || "[]");
  const formatPrice = (value) => `$${value.toLocaleString("id-ID")}`;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const closeSuccess = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };
  if (!cart.length) {
    content.innerHTML =
      '<div class="emptyCart"><h2>No items to pay for</h2><p>Add a product to your cart first.</p><a class="shopButton" href="index.html">Explore products</a></div>';
    return;
  }
  content.innerHTML = `<div class="paymentLayout"><section class="checkoutPanel"><h2>Customer details</h2><form id="checkoutForm" class="checkoutForm"><label for="checkoutName">Full name</label><input id="checkoutName" required placeholder="Your name"><label for="checkoutEmail">Email</label><input id="checkoutEmail" type="email" required placeholder="you@example.com"><label for="checkoutAddress">Shipping address</label><input id="checkoutAddress" required placeholder="Street and city"><fieldset><legend>Payment method</legend><label class="paymentChoice"><input type="radio" name="method" value="card" checked> Card</label><label class="paymentChoice"><input type="radio" name="method" value="ewallet"> E-wallet</label><label class="paymentChoice"><input type="radio" name="method" value="bank"> Bank transfer</label></fieldset><div id="cardDetails"><label for="checkoutCard">Card number</label><input id="checkoutCard" inputmode="numeric" required minlength="12" placeholder="1234 5678 9012 3456"></div><button class="shopButton" type="submit">Pay ${formatPrice(total)} <span>→</span></button></form></section><aside class="orderSummary"><h2>Your order</h2><ul>${cart.map((item) => `<li><span>${item.quantity} × ${item.name}</span><strong>${formatPrice(item.price * item.quantity)}</strong></li>`).join("")}</ul><div class="summaryLine summaryTotal"><span>Total</span><strong>${formatPrice(total)}</strong></div></aside></div>`;
  const form = document.querySelector("#checkoutForm");
  const cardDetails = document.querySelector("#cardDetails");
  document.querySelectorAll("[name='method']").forEach((method) =>
    method.addEventListener("change", () => {
      const isCard =
        document.querySelector("[name='method']:checked").value === "card";
      cardDetails.hidden = !isCard;
      document.querySelector("#checkoutCard").required = isCard;
    }),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.removeItem("vyreCart");
    toast.textContent = "Payment successful. Order confirmed.";
    toast.classList.add("is-visible");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });
});
