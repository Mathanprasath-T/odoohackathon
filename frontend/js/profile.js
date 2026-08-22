const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// TODO: Replace this static profile with employee data after authentication is connected.
menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
