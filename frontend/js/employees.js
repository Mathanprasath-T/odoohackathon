const employeeList = document.getElementById("employee-list");
const employeeSearch = document.getElementById("employee-search");
const departmentFilter = document.getElementById("department-filter");
const statusFilter = document.getElementById("status-filter");
const employeeCount = document.getElementById("employee-count");
const emptyEmployees = document.getElementById("empty-employees");
const resultMessage = document.getElementById("employee-result-message");
const employeeModal = document.getElementById("employee-modal");
const modalContent = document.getElementById("modal-content");
const modalTitle = document.getElementById("modal-title");
const closeModalButton = document.getElementById("close-modal");
const modalCloseButton = document.getElementById("modal-close-button");
const modalEditButton = document.getElementById("modal-edit-button");
const editMessage = document.getElementById("edit-message");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// TODO: Load employee records from the backend and connect the edit action to an admin API.
const employees = [
    { id: "DF-1001", initials: "RK", name: "Rohan Kapoor", email: "rohan.kapoor@dayflow.com", department: "Engineering", designation: "Software Engineer", status: "Active", phone: "+91 98765 43210", location: "Bengaluru, India", joinDate: "15 Jan 2024", manager: "Meera Iyer", salary: "₹8,40,000 / year" },
    { id: "DF-1002", initials: "SM", name: "Simran Mehta", email: "simran.mehta@dayflow.com", department: "Sales", designation: "Account Executive", status: "Active", phone: "+91 98765 43211", location: "Mumbai, India", joinDate: "03 Mar 2024", manager: "Arun Shah", salary: "₹7,20,000 / year" },
    { id: "DF-1003", initials: "AD", name: "Arjun Das", email: "arjun.das@dayflow.com", department: "Operations", designation: "Operations Analyst", status: "Active", phone: "+91 98765 43212", location: "Pune, India", joinDate: "20 Jun 2023", manager: "Kavya Nair", salary: "₹6,60,000 / year" },
    { id: "DF-1004", initials: "PN", name: "Priya Nair", email: "priya.nair@dayflow.com", department: "People & Finance", designation: "HR Specialist", status: "Active", phone: "+91 98765 43213", location: "Hyderabad, India", joinDate: "12 Aug 2022", manager: "Priya Sharma", salary: "₹7,80,000 / year" },
    { id: "DF-1005", initials: "VS", name: "Vikram Singh", email: "vikram.singh@dayflow.com", department: "Engineering", designation: "QA Engineer", status: "Inactive", phone: "+91 98765 43214", location: "Delhi, India", joinDate: "08 Nov 2023", manager: "Meera Iyer", salary: "₹6,90,000 / year" },
    { id: "DF-1006", initials: "AK", name: "Ananya Khanna", email: "ananya.khanna@dayflow.com", department: "Sales", designation: "Marketing Associate", status: "Active", phone: "+91 98765 43215", location: "Bengaluru, India", joinDate: "01 Feb 2025", manager: "Arun Shah", salary: "₹5,80,000 / year" }
];

let selectedEmployee = null;
let previousFocusedElement = null;

function createCell(label, text) {
    const cell = document.createElement("td");
    cell.dataset.label = label;
    cell.textContent = text;
    return cell;
}

function renderEmployees() {
    const searchTerm = employeeSearch.value.trim().toLowerCase();
    const selectedDepartment = departmentFilter.value;
    const selectedStatus = statusFilter.value;
    const visibleEmployees = employees.filter((employee) => {
        const matchesSearch = [employee.id, employee.name, employee.email].some((value) => value.toLowerCase().includes(searchTerm));
        const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
        const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    employeeList.innerHTML = "";
    visibleEmployees.forEach((employee) => {
        const row = document.createElement("tr");
        row.appendChild(createCell("Employee ID", employee.id));
        const avatarCell = document.createElement("td");
        avatarCell.dataset.label = "Profile";
        const avatar = document.createElement("span");
        avatar.className = "directory-avatar";
        avatar.textContent = employee.initials;
        avatarCell.appendChild(avatar);
        row.appendChild(avatarCell);
        row.appendChild(createCell("Name", employee.name));
        row.appendChild(createCell("Email", employee.email));
        row.appendChild(createCell("Department", employee.department));
        row.appendChild(createCell("Designation", employee.designation));
        const statusCell = document.createElement("td");
        statusCell.dataset.label = "Status";
        const status = document.createElement("span");
        status.className = `status-pill ${employee.status.toLowerCase()}`;
        status.textContent = employee.status;
        statusCell.appendChild(status);
        row.appendChild(statusCell);
        const actionsCell = document.createElement("td");
        actionsCell.dataset.label = "Action";
        actionsCell.className = "employee-actions";
        ["View", "Edit"].forEach((action) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = action === "View" ? "review-button" : "edit-button";
            button.textContent = action;
            button.addEventListener("click", () => openModal(employee, action));
            actionsCell.appendChild(button);
        });
        row.appendChild(actionsCell);
        employeeList.appendChild(row);
    });

    employeeCount.textContent = `${visibleEmployees.length} employee${visibleEmployees.length === 1 ? "" : "s"}`;
    emptyEmployees.hidden = visibleEmployees.length > 0;
    resultMessage.textContent = visibleEmployees.length === employees.length ? "" : "Filters are active.";
}

function detailItem(label, value) {
    return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
}

function openModal(employee, action) {
    selectedEmployee = employee;
    previousFocusedElement = document.activeElement;
    modalTitle.textContent = action === "Edit" ? `Edit ${employee.name}` : employee.name;
    modalContent.innerHTML = `<div class="employee-modal-profile"><span class="modal-avatar">${employee.initials}</span><div><h3>${employee.name}</h3><p>${employee.designation} · ${employee.department}</p></div><span class="status-pill ${employee.status.toLowerCase()}">${employee.status}</span></div><div class="detail-groups"><section><h3>Personal Details</h3><dl>${detailItem("Employee ID", employee.id)}${detailItem("Joining Date", employee.joinDate)}${detailItem("Location", employee.location)}</dl></section><section><h3>Job Details</h3><dl>${detailItem("Department", employee.department)}${detailItem("Designation", employee.designation)}${detailItem("Reporting Manager", employee.manager)}</dl></section><section><h3>Contact Details</h3><dl>${detailItem("Work Email", employee.email)}${detailItem("Phone", employee.phone)}</dl></section><section><h3>Salary Information</h3><dl>${detailItem("Annual CTC", employee.salary)}${detailItem("Payroll Status", "Active")}</dl></section></div>`;
    editMessage.textContent = action === "Edit" ? "Editing is a frontend preview; saving will be connected later." : "";
    employeeModal.hidden = false;
    closeModalButton.focus();
}

function closeModal() {
    employeeModal.hidden = true;
    editMessage.textContent = "";
    if (previousFocusedElement) previousFocusedElement.focus();
}

employeeSearch.addEventListener("input", renderEmployees);
departmentFilter.addEventListener("change", renderEmployees);
statusFilter.addEventListener("change", renderEmployees);
closeModalButton.addEventListener("click", closeModal);
modalCloseButton.addEventListener("click", closeModal);
modalEditButton.addEventListener("click", () => {
    if (selectedEmployee) editMessage.textContent = `Editing ${selectedEmployee.name} will be connected to the backend later.`;
});
employeeModal.addEventListener("click", (event) => { if (event.target.dataset.closeModal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !employeeModal.hidden) closeModal(); });
menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

renderEmployees();
