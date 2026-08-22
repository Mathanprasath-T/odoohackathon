const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const notificationButton = document.getElementById("notification-button");
const notificationArea = document.getElementById("notification-area");
const dismissNotification = document.getElementById("dismiss-notification");

// TODO: Replace static employee information with data from the backend after login is connected.

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

notificationButton.addEventListener("click", () => {
    const isHidden = notificationArea.hidden;
    notificationArea.hidden = !isHidden;
    notificationButton.setAttribute("aria-expanded", String(isHidden));
});

dismissNotification.addEventListener("click", () => {
    notificationArea.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
    notificationButton.focus();
});
