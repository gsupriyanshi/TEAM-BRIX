(function () {
    "use strict";

    // ---------- Config ----------
    var STORAGE_KEY = "wasteReports";
    var LAST_KEY = "wasteLastReportId";   // lets Screen 3 know which report to display
    var NEXT_SCREEN = "index2.html";      // page opened after a successful submit
    var MAX_IMAGE_SIDE = 800;   // photos are downscaled so localStorage does not fill up
    var MESSAGES = {
        category: "Please select an issue category.",
        location: "Please enter the location of the issue.",
        description: "Please describe the issue."
    };

    // ---------- Elements ----------
    var form = document.getElementById("report-form");
    var submitBtn = document.getElementById("submit-btn");
    var btnLabel = submitBtn.querySelector(".btn-label");
    var categoryInputs = form.querySelectorAll('input[name="category"]');
    var locationInput = document.getElementById("location");
    var descriptionInput = document.getElementById("description");

    var video = document.getElementById("camera");
    var preview = document.getElementById("photo-preview");
    var emptyState = document.getElementById("photo-empty");
    var cameraBtn = document.getElementById("camera-btn");
    var snapBtn = document.getElementById("snap-btn");
    var uploadBtn = document.getElementById("upload-btn");
    var removeBtn = document.getElementById("remove-btn");
    var fileInput = document.getElementById("photo-file");
    var captureInput = document.getElementById("photo-capture");
    var photoError = document.getElementById("photo-error");

    var photoData = "";   // compressed JPEG data URL
    var stream = null;

    // ---------- Storage ----------
    // Stored shape (ready for a future API):
    // { id, category, location, description, photo, status, submittedAt }
    function loadReports() {
        try {
            var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(data) ? data : [];
        } catch (e) { return []; }
    }

    function saveReport(report) {
        var reports = loadReports();
        reports.push(report);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
            return true;
        } catch (e) { return false; }
    }

    function createId(date) {
        var p = function (n) { return String(n).padStart(2, "0"); };
        var stamp = date.getFullYear() + p(date.getMonth() + 1) + p(date.getDate());
        var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
        return "WR-" + stamp + "-" + rand;
    }

    // ---------- Validation ----------
    function getCategory() {
        var checked = form.querySelector('input[name="category"]:checked');
        return checked ? checked.value : "";
    }

    function showError(field, message) {
        var el = document.getElementById(field + "-error");
        el.textContent = message;
        el.hidden = false;
        el.closest(".section").classList.add("has-error");
        if (field !== "category") document.getElementById(field).setAttribute("aria-invalid", "true");
    }

    function clearError(field) {
        var el = document.getElementById(field + "-error");
        el.hidden = true;
        el.textContent = "";
        el.closest(".section").classList.remove("has-error");
        if (field !== "category") document.getElementById(field).removeAttribute("aria-invalid");
    }

    function validateField(field) {
        var value = field === "category" ? getCategory() : document.getElementById(field).value.trim();
        if (!value) { showError(field, MESSAGES[field]); return false; }
        clearError(field);
        return true;
    }

    function validateAll() {
        var firstInvalid = null;
        ["category", "location", "description"].forEach(function (f) {
            if (!validateField(f) && !firstInvalid) firstInvalid = f;
        });
        return firstInvalid;
    }

    function focusField(field) {
        if (field === "category") categoryInputs[0].focus();
        else document.getElementById(field).focus();
    }

    Array.prototype.forEach.call(categoryInputs, function (i) {
        i.addEventListener("change", function () { clearError("category"); });
    });
    locationInput.addEventListener("input", function () { if (locationInput.value.trim()) clearError("location"); });
    descriptionInput.addEventListener("input", function () { if (descriptionInput.value.trim()) clearError("description"); });

    // ---------- Photo handling ----------
    function setPhotoError(msg) {
        photoError.textContent = msg;
        photoError.hidden = !msg;
    }

    function drawToJpeg(source, w, h) {
        var scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(w, h));
        var canvas = document.createElement("canvas");
        canvas.width = Math.round(w * scale);
        canvas.height = Math.round(h * scale);
        canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.75);
    }

    function showPhoto(dataUrl) {
        photoData = dataUrl;
        preview.src = dataUrl;
        preview.hidden = false;
        emptyState.hidden = true;
        removeBtn.hidden = false;
        setPhotoError("");
    }

    function clearPhoto() {
        stopCamera();
        photoData = "";
        preview.removeAttribute("src");
        preview.hidden = true;
        emptyState.hidden = false;
        removeBtn.hidden = true;
        fileInput.value = "";
        captureInput.value = "";
        setPhotoError("");
    }

    function handleFile(file) {
        if (!file) return;
        if (!/^image\//.test(file.type)) { setPhotoError("Please choose an image file."); return; }
        if (file.size > 15 * 1024 * 1024) { setPhotoError("That image is too large. Please choose one under 15 MB."); return; }
        var reader = new FileReader();
        reader.onload = function () {
            var img = new Image();
            img.onload = function () { stopCamera(); showPhoto(drawToJpeg(img, img.naturalWidth, img.naturalHeight)); };
            img.onerror = function () { setPhotoError("We could not read that image. Please try another one."); };
            img.src = reader.result;
        };
        reader.onerror = function () { setPhotoError("We could not read that image. Please try another one."); };
        reader.readAsDataURL(file);
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(function (t) { t.stop(); });
            stream = null;
        }
        video.srcObject = null;
        video.hidden = true;
        snapBtn.hidden = true;
        cameraBtn.hidden = false;
    }

    function startCamera() {
        setPhotoError("");
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            captureInput.click();   // phones open their camera app; others open a file picker
            return;
        }
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })
            .then(function (s) {
                stream = s;
                video.srcObject = s;
                video.hidden = false;
                preview.hidden = true;
                emptyState.hidden = true;
                snapBtn.hidden = false;
                cameraBtn.hidden = true;
                snapBtn.focus();
            })
            .catch(function () {
                setPhotoError("Camera access was not available, so please use your device camera or upload a photo instead.");
                captureInput.click();
            });
    }

    function takeSnapshot() {
        if (!video.videoWidth) return;
        showPhoto(drawToJpeg(video, video.videoWidth, video.videoHeight));
        stopCamera();
    }

    cameraBtn.addEventListener("click", startCamera);
    snapBtn.addEventListener("click", takeSnapshot);
    uploadBtn.addEventListener("click", function () { fileInput.click(); });
    removeBtn.addEventListener("click", clearPhoto);
    fileInput.addEventListener("change", function () { handleFile(fileInput.files[0]); });
    captureInput.addEventListener("change", function () { handleFile(captureInput.files[0]); });

    // ---------- Submit ----------
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var firstInvalid = validateAll();
        if (firstInvalid) { focusField(firstInvalid); return; }

        var now = new Date();
        var report = {
            id: createId(now),
            category: getCategory(),
            location: locationInput.value.trim(),
            description: descriptionInput.value.trim(),
            photo: photoData,
            status: "Reported",
            submittedAt: now.toISOString()
        };

        stopCamera();
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");
        btnLabel.textContent = "Submitting...";

        setTimeout(function () {
            if (!saveReport(report) && report.photo) {   // storage full: keep the report, drop the photo
                report.photo = "";
                saveReport(report);
            }
            try { localStorage.setItem(LAST_KEY, report.id); } catch (e) { /* ignore */ }
            btnLabel.textContent = "Report saved";
            window.location.href = NEXT_SCREEN;
        }, 900);
    });

    window.addEventListener("pagehide", stopCamera);
})();