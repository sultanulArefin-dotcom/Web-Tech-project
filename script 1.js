// Change between portal pages
function showPage(pageId, button) {
    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "block";

    let buttons = document.querySelectorAll(".menu button");
    buttons.forEach(function(item) {
        item.classList.remove("active");
    });

    button.classList.add("active");
}

// Show error message
function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

// Show green border for valid input
function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

// Clear error messages and borders
function clearErrors(formId) {
    let form = document.getElementById(formId);
    let errors = form.querySelectorAll(".error");

    errors.forEach(function(item) {
        item.innerHTML = "";
    });

    let fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(function(field) {
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}

// Doctor profile validation
const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors("profileForm");

    let name = document.getElementById("doctorName");
    let email = document.getElementById("doctorEmail");
    let mobile = document.getElementById("doctorMobile");
    let specialization = document.getElementById("specialization");

    let valid = true;

    if (name.value.trim() === "") {
        showError(name, "doctorNameError", "Doctor name is required.");
        valid = false;
    } else if (!/^[A-Za-z. ]+$/.test(name.value.trim())) {
        showError(name, "doctorNameError", "Only letters, dots and spaces are allowed.");
        valid = false;
    } else if (name.value.trim().length < 3) {
        showError(name, "doctorNameError", "Name must be at least 3 characters.");
        valid = false;
    } else {
        showSuccess(name);
    }

    if (email.value.trim() === "") {
        showError(email, "doctorEmailError", "Email is required.");
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "doctorEmailError", "Enter a valid email address.");
        valid = false;
    } else {
        showSuccess(email);
    }

    if (!/^01[3-9][0-9]{8}$/.test(mobile.value.trim())) {
        showError(mobile, "doctorMobileError", "Enter an 11 digit mobile number starting with 013-019.");
        valid = false;
    } else {
        showSuccess(mobile);
    }

    if (specialization.value === "") {
        showError(specialization, "specializationError", "Please select a specialization.");
        valid = false;
    } else {
        showSuccess(specialization);
    }

    if (valid) {
        document.getElementById("profileResult").innerHTML =
            "Profile updated successfully for " + name.value.trim() + ".";
    }
});

// Manage availability validation
const availabilityForm = document.getElementById("availabilityForm");

availabilityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors("availabilityForm");

    let days = document.querySelectorAll('input[name="day"]:checked');
    let startTime = document.getElementById("startTime");
    let endTime = document.getElementById("endTime");

    let valid = true;

    if (days.length === 0) {
        document.getElementById("dayError").innerHTML = "Please select at least one available day.";
        valid = false;
    }

    if (startTime.value === "") {
        showError(startTime, "startTimeError", "Start time is required.");
        valid = false;
    } else {
        showSuccess(startTime);
    }

    if (endTime.value === "") {
        showError(endTime, "endTimeError", "End time is required.");
        valid = false;
    } else if (startTime.value !== "" && endTime.value <= startTime.value) {
        showError(endTime, "endTimeError", "End time must be later than start time.");
        valid = false;
    } else {
        showSuccess(endTime);
    }

    if (valid) {
        let dayNames = [];
        days.forEach(function(day) {
            dayNames.push(day.value);
        });

        document.getElementById("savedAvailability").innerHTML =
            "Current availability: " + dayNames.join(", ") +
            " | " + startTime.value + " - " + endTime.value;

        document.getElementById("availabilityResult").innerHTML =
            "Availability saved successfully.";
    }
});

// Search patient by name
document.getElementById("patientSearch").addEventListener("input", function() {
    let searchValue = this.value.toLowerCase();
    let rows = document.querySelectorAll("#patientList tr");

    rows.forEach(function(row) {
        let patientName = row.cells[0].innerHTML.toLowerCase();

        if (patientName.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// View patient history
function viewHistory(name) {
    let history = "";

    if (name === "Rahim Ahmed") {
        history = "Rahim Ahmed - Previous visit: General checkup. Sample history for demonstration.";
    } else if (name === "Karim Hasan") {
        history = "Karim Hasan - Previous visit: Consultation for chest discomfort. Sample history for demonstration.";
    } else if (name === "Nusrat Jahan") {
        history = "Nusrat Jahan - Previous visit: Follow-up consultation. Sample history for demonstration.";
    }

    document.getElementById("historyResult").innerHTML = history;
}

// Prescription form validation
const prescriptionForm = document.getElementById("prescriptionForm");

prescriptionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors("prescriptionForm");

    let patient = document.getElementById("presPatient");
    let diagnosis = document.getElementById("diagnosis");
    let medicine = document.getElementById("medicine");
    let dosage = document.getElementById("dosage");
    let duration = document.getElementById("duration");

    let valid = true;

    if (patient.value === "") {
        showError(patient, "presPatientError", "Please select a patient.");
        valid = false;
    } else {
        showSuccess(patient);
    }

    if (diagnosis.value.trim() === "") {
        showError(diagnosis, "diagnosisError", "Diagnosis or notes are required.");
        valid = false;
    } else {
        showSuccess(diagnosis);
    }

    if (medicine.value.trim() === "") {
        showError(medicine, "medicineError", "Medicine name is required.");
        valid = false;
    } else {
        showSuccess(medicine);
    }

    if (dosage.value.trim() === "") {
        showError(dosage, "dosageError", "Dosage is required.");
        valid = false;
    } else {
        showSuccess(dosage);
    }

    if (duration.value.trim() === "") {
        showError(duration, "durationError", "Duration is required.");
        valid = false;
    } else {
        showSuccess(duration);
    }

    if (valid) {
        document.getElementById("prescriptionResult").innerHTML =
            "Prescription generated for " + patient.value +
            "<br>Diagnosis: " + diagnosis.value +
            "<br>Medicine: " + medicine.value +
            "<br>Dosage: " + dosage.value +
            "<br>Duration: " + duration.value;
    }
});
