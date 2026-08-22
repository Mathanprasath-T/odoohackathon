const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const viewSlipButton = document.getElementById("view-slip-button");
const salarySlipModal = document.getElementById("salary-slip-modal");
const closeSlipButton = document.getElementById("close-slip");
const closeSlipPreviewButton = document.getElementById("close-slip-button");

// TODO: Replace static salary data with payroll data returned by the backend API.
let previousFocusedElement = null;

function openSalarySlip() {
    previousFocusedElement = document.activeElement;
    salarySlipModal.hidden = false;
    closeSlipButton.focus();
}

function closeSalarySlip() {
    salarySlipModal.hidden = true;
    if (previousFocusedElement) previousFocusedElement.focus();
}

viewSlipButton.addEventListener("click", openSalarySlip);
closeSlipButton.addEventListener("click", closeSalarySlip);
closeSlipPreviewButton.addEventListener("click", closeSalarySlip);
salarySlipModal.addEventListener("click", (event) => { if (event.target.dataset.closeSlip) closeSalarySlip(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !salarySlipModal.hidden) closeSalarySlip(); });
menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
