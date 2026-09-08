document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("vyreCurrentUser") || "null");
  if (!currentUser) window.location.replace(`auth.html?redirect=${encodeURIComponent(window.location.pathname.split("/").pop() || "marketplace.html")}`);
});
