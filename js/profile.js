document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(
    localStorage.getItem("vyreCurrentUser") || "null",
  );
  if (!currentUser) {
    window.location.href = `auth.html?redirect=${encodeURIComponent("profile.html")}`;
    return;
  }
  document.querySelector("#profileName").textContent = currentUser.name;
  document.querySelector("#profileEmail").textContent = currentUser.email;
  document.querySelector("#profileAvatar").textContent = currentUser.name
    .charAt(0)
    .toUpperCase();
  const cart = JSON.parse(localStorage.getItem("vyreCart") || "[]");
  document.querySelector("#profileCartCount").textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  document.querySelector("#profileLogout").addEventListener("click", () => {
    localStorage.removeItem("vyreCurrentUser");
    window.location.href = "index.html";
  });
});
