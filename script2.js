(function () {
    "use strict";

    var STORAGE_KEY = "wasteReports";
    var LAST_KEY = "wasteLastReportId";   // written by Screen 2 on submit

    var reportView = document.getElementById("report-view");
    var emptyView = document.getElementById("empty-view");
    var title = document.getElementById("page-title");
    var subtitle = document.getElementById("page-subtitle");
    var check = document.getElementById("check");

    function loadReports() {
        try {
            var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(data) ? data : [];
        } catch (e) { return []; }
    }

    // The report just submitted, or the most recent one if its ID is missing
    function findReport() {
        var reports = loadReports();
        if (!reports.length) return null;
        var lastId = null;
        try { lastId = localStorage.getItem(LAST_KEY); } catch (e) { /* ignore */ }
        if (lastId) {
            for (var i = reports.length - 1; i >= 0; i--) {
                if (reports[i].id === lastId) return reports[i];
            }
        }
        return reports[reports.length - 1];
    }

    function formatDate(iso) {
        var d = new Date(iso);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleString("en-IN", {
            day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit"
        });
    }

    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }

    function render(report) {
        setText("r-category", report.category);
        setText("r-location", report.location);
        setText("r-description", report.description);
        setText("r-id", report.id);
        setText("r-date", formatDate(report.submittedAt));
        setText("r-status", report.status || "Reported");

        var img = document.getElementById("r-photo");
        var none = document.getElementById("r-nophoto");
        if (report.photo) {
            img.src = report.photo;
            img.hidden = false;
            none.hidden = true;
        }
        reportView.hidden = false;
    }

    function showEmpty() {
        check.hidden = true;
        title.textContent = "No report to show yet";
        subtitle.textContent = "Submit a report first and it will appear here.";
        emptyView.hidden = false;
    }

    var report = findReport();
    if (report) render(report); else showEmpty();
    title.focus();
})();