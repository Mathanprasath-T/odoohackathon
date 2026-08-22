const leaveForm = document.getElementById("leave-form");
const leaveTypeInput = document.getElementById("leave-type");
const fromDateInput = document.getElementById("from-date");
const toDateInput = document.getElementById("to-date");
const reasonInput = document.getElementById("leave-reason");
const leaveFormMessage = document.getElementById("leave-form-message");
const requestsBody = document.getElementById("leave-requests");
const requestCount = document.getElementById("request-count");
const emptyRequests = document.getElementById("empty-requests");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// TODO: Replace sample leave records and submit this form to the backend leave API.
const leaveRequests = [
    { type: "Paid Leave", from: "2026-08-28", to: "2026-08-29", days: 2, reason: "Family event", status: "Pending", applied: "2026-08-20" },
    { type: "Sick Leave", from: "2026-08-12", to: "2026-08-12", days: 1, reason: "Medical rest", status: "Approved", applied: "2026-08-11" },
    { type: "Unpaid Leave", from: "2026-07-18", to: "2026-07-19", days: 2, reason: "Personal commitment", status: "Rejected", applied: "2026-07-10" }
];

function setFieldError(input, message) {
    document.getElementById(`${input.id}-error`).textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function numberOfDays(fromDate, toDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.floor((new Date(`${toDate}T00:00:00`) - new Date(`${fromDate}T00:00:00`)) / oneDay) + 1;
}

function renderRequests() {
    requestsBody.innerHTML = "";
    emptyRequests.hidden = leaveRequests.length > 0;
    requestCount.textContent = `${leaveRequests.length} request${leaveRequests.length === 1 ? "" : "s"}`;

    leaveRequests.forEach((request) => {
        const row = document.createElement("tr");
        const values = [request.type, request.from, request.to, `${request.days} day${request.days === 1 ? "" : "s"}`, request.reason];
        const labels = ["Leave Type", "From Date", "To Date", "Days", "Reason"];
        values.forEach((value, index) => {
            const cell = document.createElement("td");
            cell.dataset.label = labels[index];
            cell.textContent = value;
            row.appendChild(cell);
        });
        const statusCell = document.createElement("td");
        statusCell.dataset.label = "Status";
        const status = document.createElement("span");
        status.className = `status-pill ${request.status.toLowerCase()}`;
        status.textContent = request.status;
        statusCell.appendChild(status);
        row.appendChild(statusCell);
        const appliedCell = document.createElement("td");
        appliedCell.dataset.label = "Applied Date";
        appliedCell.textContent = request.applied;
        row.appendChild(appliedCell);
        requestsBody.appendChild(row);
    });
}

function validateForm() {
    const leaveType = leaveTypeInput.value;
    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;
    const reason = reasonInput.value.trim();

    setFieldError(leaveTypeInput, leaveType ? "" : "Please select a leave type.");
    setFieldError(fromDateInput, fromDate ? "" : "Please select a start date.");
    setFieldError(toDateInput, !toDate ? "Please select an end date." : (fromDate && toDate < fromDate ? "End date cannot be before start date." : ""));
    setFieldError(reasonInput, reason ? "" : "Please enter a reason for your leave.");
    return !document.querySelector(".leave-form [aria-invalid=\"true\"]");
}

leaveForm.addEventListener("submit", (event) => {
    event.preventDefault();
    leaveFormMessage.textContent = "";

    if (!validateForm()) {
        leaveFormMessage.textContent = "Please correct the highlighted fields.";
        leaveFormMessage.className = "leave-form-message error-message";
        leaveForm.querySelector('[aria-invalid="true"]').focus();
        return;
    }

    const from = fromDateInput.value;
    const to = toDateInput.value;
    leaveRequests.unshift({
        type: leaveTypeInput.value,
        from,
        to,
        days: numberOfDays(from, to),
        reason: reasonInput.value.trim(),
        status: "Pending",
        applied: new Date().toISOString().slice(0, 10)
    });
    renderRequests();
    leaveForm.reset();
    leaveFormMessage.textContent = "Your leave request was submitted successfully and is pending review.";
    leaveFormMessage.className = "leave-form-message success-message";
});

[leaveTypeInput, fromDateInput, toDateInput, reasonInput].forEach((input) => {
    input.addEventListener("input", () => setFieldError(input, ""));
    input.addEventListener("change", () => setFieldError(input, ""));
});

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

renderRequests();
