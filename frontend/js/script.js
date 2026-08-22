const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("password-toggle");
const signInButton = document.getElementById("sign-in-button");
const formMessage = document.getElementById("form-message");

function setFieldError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    setFieldError(emailInput, !email ? "Email is required." : (!emailPattern.test(email) ? "Enter a valid email address." : ""));
    setFieldError(passwordInput, !password ? "Password is required." : "");
    isValid = !document.getElementById("email-error").textContent && !document.getElementById("password-error").textContent;
    return isValid;
}

passwordToggle.addEventListener("click", () => {
    const isPasswordHidden = passwordInput.type === "password";
    passwordInput.type = isPasswordHidden ? "text" : "password";
    passwordToggle.textContent = isPasswordHidden ? "Hide" : "Show";
    passwordToggle.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");
    passwordToggle.setAttribute("aria-pressed", String(isPasswordHidden));
});

[emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => setFieldError(input, ""));
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";

    if (!validateForm()) {
        const firstInvalidField = loginForm.querySelector('[aria-invalid="true"]');
        firstInvalidField.focus();
        return;
    }

    signInButton.classList.add("is-loading");
    signInButton.disabled = true;
    signInButton.querySelector(".button-text").textContent = "Preparing sign in";

    // TODO: Replace this demo route with backend authentication and role-based access control.
    const selectedRole = loginForm.elements.role.value;
    const destination = selectedRole === "admin-hr" ? "admin-dashboard.html" : "employee-dashboard.html";
    window.setTimeout(() => {
        signInButton.classList.remove("is-loading");
        signInButton.disabled = false;
        signInButton.querySelector(".button-text").textContent = "Sign In";
        formMessage.textContent = "Login ready — backend authentication will be connected soon.";
        window.location.assign(destination);
    }, 800);
});
