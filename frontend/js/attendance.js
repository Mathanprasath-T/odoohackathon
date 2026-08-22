const checkInButton = document.getElementById("check-in-button");
const checkOutButton = document.getElementById("check-out-button");
const checkInTime = document.getElementById("check-in-time");
const checkOutTime = document.getElementById("check-out-time");
const workingHours = document.getElementById("working-hours");
const currentStatus = document.getElementById("current-status");
const attendanceMessage = document.getElementById("attendance-message");
const dateSelector = document.getElementById("date-selector");
const historyBody = document.getElementById("attendance-history");
const emptyHistory = document.getElementById("empty-history");
const historySummary = document.getElementById("history-summary");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

let checkedInAt = null;

// TODO: Replace this sample data and local UI state with attendance data from the backend API.
const attendanceRecords = [
    { date: "2026-08-22", checkIn: "09:12 AM", checkOut: "06:08 PM", hours: "8h 56m", status: "Present" },
    { date: "2026-08-21", checkIn: "09:04 AM", checkOut: "06:02 PM", hours: "8h 58m", status: "Present" },
    { date: "2026-08-20", checkIn: "09:40 AM", checkOut: "01:30 PM", hours: "3h 50m", status: "Half-day" },
    { date: "2026-08-19", checkIn: "—", checkOut: "—", hours: "—", status: "Leave" },
    { date: "2026-08-18", checkIn: "—", checkOut: "—", hours: "—", status: "Absent" }
];

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date) {
    return date.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function statusClass(status) {
    return status.toLowerCase().replace("-", "");
}

function renderHistory(records) {
    historyBody.innerHTML = "";
    emptyHistory.hidden = records.length > 0;

    records.forEach((record) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td data-label="Date">${record.date}</td><td data-label="Check In">${record.checkIn}</td><td data-label="Check Out">${record.checkOut}</td><td data-label="Working Hours">${record.hours}</td><td data-label="Status"><span class="status-pill ${statusClass(record.status)}">${record.status}</span></td>`;
        historyBody.appendChild(row);
    });
}

function updateHistory() {
    const selectedDate = dateSelector.value;
    const selectedView = document.querySelector(".view-tab.active").dataset.view;
    let visibleRecords = attendanceRecords;

    if (selectedView === "daily" && selectedDate) {
        visibleRecords = attendanceRecords.filter((record) => record.date === selectedDate);
        historySummary.textContent = "Showing attendance for the selected date.";
    } else if (selectedView === "weekly") {
        historySummary.textContent = "Showing sample attendance records for this week.";
    } else {
        historySummary.textContent = "Showing sample daily attendance records.";
    }

    renderHistory(visibleRecords);
}

checkInButton.addEventListener("click", () => {
    if (checkedInAt) {
        attendanceMessage.textContent = "You have already checked in today.";
        attendanceMessage.className = "attendance-message error-message";
        return;
    }

    checkedInAt = new Date();
    checkInTime.textContent = formatTime(checkedInAt);
    currentStatus.textContent = "Present";
    currentStatus.className = "status-pill present";
    checkInButton.disabled = true;
    checkOutButton.disabled = false;
    attendanceMessage.textContent = "Check-in recorded successfully for this demo session.";
    attendanceMessage.className = "attendance-message success-message";
});

checkOutButton.addEventListener("click", () => {
    if (!checkedInAt) {
        attendanceMessage.textContent = "Please check in before checking out.";
        attendanceMessage.className = "attendance-message error-message";
        return;
    }

    const checkedOutAt = new Date();
    const minutesWorked = Math.max(1, Math.floor((checkedOutAt - checkedInAt) / 60000));
    checkOutTime.textContent = formatTime(checkedOutAt);
    workingHours.textContent = `${Math.floor(minutesWorked / 60)}h ${minutesWorked % 60}m`;
    checkOutButton.disabled = true;
    attendanceMessage.textContent = "Check-out recorded successfully for this demo session.";
    attendanceMessage.className = "attendance-message success-message";
});

document.querySelectorAll(".view-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".view-tab").forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        updateHistory();
    });
});

dateSelector.addEventListener("change", updateHistory);

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelector("[data-current-date]").textContent = formatDate(new Date());
dateSelector.value = new Date().toISOString().slice(0, 10);
updateHistory();
