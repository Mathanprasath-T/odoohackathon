const requestsBody = document.getElementById("approval-requests");
const approvalCount = document.getElementById("approval-count");
const approvalMessage = document.getElementById("approval-message");
const emptyRequests = document.getElementById("empty-approval-requests");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// TODO: Replace sample requests and send approval decisions to the backend HR leave API.
const leaveRequests = [
    { id: 1, employee: "Rohan Kapoor", employeeId: "DF-1001", type: "Paid Leave", from: "2026-08-28", to: "2026-08-29", reason: "Family event", applied: "2026-08-20", status: "Pending" },
    { id: 2, employee: "Simran Mehta", employeeId: "DF-1002", type: "Sick Leave", from: "2026-08-25", to: "2026-08-25", reason: "Medical rest", applied: "2026-08-21", status: "Pending" },
    { id: 3, employee: "Arjun Das", employeeId: "DF-1003", type: "Unpaid Leave", from: "2026-09-02", to: "2026-09-04", reason: "Personal commitment", applied: "2026-08-19", status: "Pending" },
    { id: 4, employee: "Priya Nair", employeeId: "DF-1004", type: "Paid Leave", from: "2026-08-12", to: "2026-08-13", reason: "Family travel", applied: "2026-08-02", status: "Approved" },
    { id: 5, employee: "Vikram Singh", employeeId: "DF-1005", type: "Sick Leave", from: "2026-08-18", to: "2026-08-18", reason: "Medical appointment", applied: "2026-08-15", status: "Rejected" }
];

let activeFilter = "all";

function addCell(row, label, text) {
    const cell = document.createElement("td");
    cell.dataset.label = label;
    cell.textContent = text;
    row.appendChild(cell);
}

function renderRequests() {
    const visibleRequests = leaveRequests.filter((request) => activeFilter === "all" || request.status.toLowerCase() === activeFilter);
    requestsBody.innerHTML = "";
    emptyRequests.hidden = visibleRequests.length > 0;
    approvalCount.textContent = `${visibleRequests.length} request${visibleRequests.length === 1 ? "" : "s"}`;

    visibleRequests.forEach((request) => {
        const row = document.createElement("tr");
        addCell(row, "Employee", request.employee);
        addCell(row, "Employee ID", request.employeeId);
        addCell(row, "Leave Type", request.type);
        addCell(row, "From Date", request.from);
        addCell(row, "To Date", request.to);
        addCell(row, "Reason", request.reason);
        addCell(row, "Applied Date", request.applied);

        const statusCell = document.createElement("td");
        statusCell.dataset.label = "Status";
        const statusBadge = document.createElement("span");
        statusBadge.className = `status-pill ${request.status.toLowerCase()}`;
        statusBadge.textContent = request.status;
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        const actionsCell = document.createElement("td");
        actionsCell.dataset.label = "Actions";
        actionsCell.className = "approval-actions";
        ["Approve", "Reject"].forEach((decision) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = decision === "Approve" ? "approve-button" : "reject-button";
            button.textContent = decision;
            button.disabled = request.status !== "Pending";
            button.addEventListener("click", () => decideRequest(request, decision));
            actionsCell.appendChild(button);
        });
        row.appendChild(actionsCell);
        requestsBody.appendChild(row);
    });
}

function decideRequest(request, decision) {
    if (request.status !== "Pending") {
        approvalMessage.textContent = "This leave request has already been reviewed.";
        return;
    }

    request.status = decision === "Approve" ? "Approved" : "Rejected";
    approvalMessage.textContent = `${request.employee}'s ${request.type.toLowerCase()} request was ${request.status.toLowerCase()}.`;
    renderRequests();
}

document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        activeFilter = tab.dataset.status;
        document.querySelectorAll(".filter-tab").forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        approvalMessage.textContent = "";
        renderRequests();
    });
});

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

renderRequests();
