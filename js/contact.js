// Contact form validation
// Checks: no field is empty, email format is valid, phone contains only digits

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
  name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
  email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
  phone: { input: document.getElementById("phone"), error: document.getElementById("phoneError") },
  subject: { input: document.getElementById("subject"), error: document.getElementById("subjectError") },
  message: { input: document.getElementById("message"), error: document.getElementById("messageError") }
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]+$/;

function showError(field, message) {
  field.input.classList.add("invalid");
  field.error.textContent = message;
  field.error.classList.add("show");
}

function clearError(field) {
  field.input.classList.remove("invalid");
  field.error.classList.remove("show");
}

function validateName() {
  const value = fields.name.input.value.trim();
  if (value === "") {
    showError(fields.name, "Please enter your name");
    return false;
  }
  clearError(fields.name);
  return true;
}

function validateEmail() {
  const value = fields.email.input.value.trim();
  if (value === "") {
    showError(fields.email, "Please enter your email address");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(fields.email, "Please enter a valid email address, e.g. name@example.com");
    return false;
  }
  clearError(fields.email);
  return true;
}

function validatePhone() {
  const value = fields.phone.input.value.trim();
  if (value === "") {
    showError(fields.phone, "Please enter your phone number");
    return false;
  }
  if (!phonePattern.test(value)) {
    showError(fields.phone, "Phone number must contain digits only, e.g. 08012345678");
    return false;
  }
  clearError(fields.phone);
  return true;
}

function validateSubject() {
  const value = fields.subject.input.value.trim();
  if (value === "") {
    showError(fields.subject, "Please enter a subject");
    return false;
  }
  clearError(fields.subject);
  return true;
}

function validateMessage() {
  const value = fields.message.input.value.trim();
  if (value === "") {
    showError(fields.message, "Please enter a message");
    return false;
  }
  clearError(fields.message);
  return true;
}

// Validate a field as the user leaves it
fields.name.input.addEventListener("blur", validateName);
fields.email.input.addEventListener("blur", validateEmail);
fields.phone.input.addEventListener("blur", validatePhone);
fields.subject.input.addEventListener("blur", validateSubject);
fields.message.input.addEventListener("blur", validateMessage);

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  const allValid = isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid;

  if (!allValid) {
    formStatus.textContent = "Please fix the highlighted fields before sending.";
    formStatus.className = "form-status show";
    return;
  }

  formStatus.textContent = "Message sent. Thank you for reaching out, a response will follow within 1 to 2 days.";
  formStatus.className = "form-status show success";

  contactForm.reset();
  Object.values(fields).forEach(clearError);
});
