(() => {
  const toggle = document.querySelector(".global-nav-toggle");
  const nav = document.querySelector("#global-navigation");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.dataset.open = "false";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.dataset.open = String(!isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
})();
