const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const notificationButton = document.getElementById("admin-notification-button");
const notification = document.getElementById("admin-notification");
const dismissNotification = document.getElementById("dismiss-admin-notification");
const actionMessage = document.getElementById("admin-action-message");

// TODO: Replace dashboard statistics and leave requests with data from the backend HR API.

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

notificationButton.addEventListener("click", () => {
    const isHidden = notification.hidden;
    notification.hidden = !isHidden;
    notificationButton.setAttribute("aria-expanded", String(isHidden));
});

dismissNotification.addEventListener("click", () => {
    notification.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
    notificationButton.focus();
});

document.querySelectorAll(".review-button").forEach((button) => {
    button.addEventListener("click", () => {
        actionMessage.textContent = `Review for ${button.dataset.employee} is ready for backend workflow integration.`;
    });
});
