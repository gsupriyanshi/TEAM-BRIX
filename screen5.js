/* =========================================================
   SCREEN 5
   Community Report Details

   Connected with Screen 4 through:

   screen5.html?id=report1
   ========================================================= */

(function () {

  "use strict";


  /* =========================================================
     DEMO REPORT DATA

     IMPORTANT:
     These IDs match the IDs already present in Screen 4.
     ========================================================= */

  var reports = {

    /* =====================================================
       REAL / SPECIAL REPORT
       Sector 62 - Noida
       ===================================================== */

    report1: {

      id: "RPT-001",

      category: "Garbage Dumping",

      location: "Sector 62, Noida",

      description:
        "Repeated garbage dumping has been observed near the flyover. " +
        "The location has been cleaned previously, but waste has started " +
        "accumulating again. Community reports indicate that the same spot " +
        "has become a recurring dumping point.",

      reportedBy: "M. XYZ",

      reportedTime: "2 hours ago",

      reportsFiled: 4,

      locationType: "Flyover / roadside",

      status: "Under Action",

      photoUrl:
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Repeated issue",

      lastCleaned: "2 days ago",

      issueReturned: "Yes",

      previousReports: "3 previous reports",

      conditionNote:
        "This location has been cleaned before, but the dumping has returned. " +
        "The repeated reports suggest that the issue is recurring rather than a one-time incident.",

      timeline: [

        {
          date: "Today · 2 hours ago",
          title: "New report submitted",
          text: "M. XYZ reported fresh garbage accumulation near the flyover."
        },

        {
          date: "2 days ago",
          title: "Area cleaned",
          text: "Cleaning activity was recorded at the reported location."
        },

        {
          date: "5 days ago",
          title: "Previous complaint marked resolved",
          text: "The area was cleaned following an earlier community report."
        },

        {
          date: "12 days ago",
          title: "Earlier garbage report",
          text: "Community members reported repeated dumping at the same location."
        }

      ]

    },


    /* =====================================================
       REPORT 2
       ===================================================== */

    report2: {

      id: "RPT-002",

      category: "Waterlogging",

      location: "Sector 18, Noida",

      description:
        "Water remains on the service road after rainfall, making movement " +
        "difficult for pedestrians and two-wheelers.",

      reportedBy: "A. Sharma",

      reportedTime: "5 hours ago",

      reportsFiled: 2,

      locationType: "Service road",

      status: "Reported",

      photoUrl:
        "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Occasional issue",

      lastCleaned: "Not applicable",

      issueReturned: "Yes",

      previousReports: "1 previous report",

      conditionNote:
        "Waterlogging appears mainly after heavy rainfall and may be linked to blocked drainage.",

      timeline: [

        {
          date: "Today · 5 hours ago",
          title: "Report submitted",
          text: "Standing water was reported on the service road."
        },

        {
          date: "3 weeks ago",
          title: "Similar issue reported",
          text: "A previous report mentioned water accumulation at this location."
        }

      ]

    },


    /* =====================================================
       REPORT 3
       ===================================================== */

    report3: {

      id: "RPT-003",

      category: "Area Cleanliness",

      location: "Sector 137, Noida",

      description:
        "Litter had accumulated near the park entrance. The area was cleaned " +
        "after the community report and is currently in better condition.",

      reportedBy: "R. Mehta",

      reportedTime: "1 day ago",

      reportsFiled: 1,

      locationType: "Park entrance",

      status: "Resolved",

      photoUrl:
        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Mostly maintained",

      lastCleaned: "Today",

      issueReturned: "No",

      previousReports: "No previous reports",

      conditionNote:
        "The issue appears to have been resolved. No repeated complaint has been recorded yet.",

      timeline: [

        {
          date: "Today",
          title: "Area cleaned",
          text: "Reported litter was removed from the park entrance."
        },

        {
          date: "Yesterday",
          title: "Report submitted",
          text: "Community member reported accumulated litter."
        }

      ]

    },


    /* =====================================================
       REPORT 4
       ===================================================== */

    report4: {

      id: "RPT-004",

      category: "Other",

      location: "Noida Sector 50 Market",

      description:
        "Dry leaves and other waste were reportedly being burned in an open plot.",

      reportedBy: "K. Singh",

      reportedTime: "3 hours ago",

      reportsFiled: 1,

      locationType: "Open plot",

      status: "Reported",

      photoUrl:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Needs monitoring",

      lastCleaned: "Unknown",

      issueReturned: "Unknown",

      previousReports: "No previous reports",

      conditionNote:
        "The area requires monitoring to determine whether the issue is recurring.",

      timeline: [

        {
          date: "Today",
          title: "Report submitted",
          text: "Community member reported burning activity in an open plot."
        }

      ]

    },


    /* =====================================================
       REPORT 5
       ===================================================== */

    report5: {

      id: "RPT-005",

      category: "Garbage Dumping",

      location: "Sector 21, Faridabad",

      description:
        "An overflowing waste bin and loose garbage were observed along the roadside.",

      reportedBy: "P. Kumar",

      reportedTime: "6 hours ago",

      reportsFiled: 2,

      locationType: "Roadside",

      status: "Under Action",

      photoUrl:
        "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Recurring",

      lastCleaned: "Yesterday",

      issueReturned: "Yes",

      previousReports: "1 previous report",

      conditionNote:
        "Waste appears to return after cleaning, suggesting an ongoing disposal issue.",

      timeline: [

        {
          date: "Today",
          title: "Report submitted",
          text: "Overflowing garbage was reported."
        },

        {
          date: "Yesterday",
          title: "Cleaning recorded",
          text: "Waste was removed from the roadside."
        }

      ]

    },


    /* =====================================================
       REPORT 6
       ===================================================== */

    report6: {

      id: "RPT-006",

      category: "Waterlogging",

      location: "NIT, Faridabad",

      description:
        "Standing water was observed near the road due to a potentially blocked drain.",

      reportedBy: "S. Verma",

      reportedTime: "1 day ago",

      reportsFiled: 1,

      locationType: "Road intersection",

      status: "Reported",

      photoUrl:
        "https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Needs inspection",

      lastCleaned: "Unknown",

      issueReturned: "Unknown",

      previousReports: "No previous reports",

      conditionNote:
        "Drainage inspection may be required before determining the cause.",

      timeline: [

        {
          date: "Yesterday",
          title: "Report submitted",
          text: "Standing water was reported near the intersection."
        }

      ]

    },


    /* =====================================================
       REPORT 7
       ===================================================== */

    report7: {

      id: "RPT-007",

      category: "Area Cleanliness",

      location: "Ballabgarh, Faridabad",

      description:
        "The market lane requires more regular cleaning, particularly around busy hours.",

      reportedBy: "N. Gupta",

      reportedTime: "2 days ago",

      reportsFiled: 1,

      locationType: "Market lane",

      status: "Resolved",

      photoUrl:
        "https://images.unsplash.com/photo-1509099836639-18ba02c2d7b9?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Generally maintained",

      lastCleaned: "1 day ago",

      issueReturned: "No",

      previousReports: "No previous reports",

      conditionNote:
        "The area was cleaned following the report.",

      timeline: [

        {
          date: "1 day ago",
          title: "Area cleaned",
          text: "Market lane received cleaning."
        },

        {
          date: "2 days ago",
          title: "Report submitted",
          text: "Community member reported cleanliness concerns."
        }

      ]

    },


    /* =====================================================
       REPORT 8
       ===================================================== */

    report8: {

      id: "RPT-008",

      category: "Garbage Dumping",

      location: "Model Town, Ludhiana",

      description:
        "Waste was observed beside the canal road, including loose plastic and household waste.",

      reportedBy: "H. Singh",

      reportedTime: "4 hours ago",

      reportsFiled: 3,

      locationType: "Canal roadside",

      status: "Reported",

      photoUrl:
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Recurring",

      lastCleaned: "4 days ago",

      issueReturned: "Yes",

      previousReports: "2 previous reports",

      conditionNote:
        "The same area has received multiple cleanliness reports.",

      timeline: [

        {
          date: "Today",
          title: "New report submitted",
          text: "Waste was reported beside the canal road."
        },

        {
          date: "4 days ago",
          title: "Previous cleaning",
          text: "Waste was removed from the area."
        }

      ]

    },


    /* =====================================================
       REPORT 9
       ===================================================== */

    report9: {

      id: "RPT-009",

      category: "Other",

      location: "Golden Temple Road, Amritsar",

      description:
        "Plastic waste was observed near the pedestrian walkway.",

      reportedBy: "G. Kaur",

      reportedTime: "8 hours ago",

      reportsFiled: 1,

      locationType: "Public walkway",

      status: "Under Action",

      photoUrl:
        "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Needs monitoring",

      lastCleaned: "2 days ago",

      issueReturned: "Unknown",

      previousReports: "No previous reports",

      conditionNote:
        "The area is currently under observation following the report.",

      timeline: [

        {
          date: "Today",
          title: "Report submitted",
          text: "Plastic waste was reported near the walkway."
        }

      ]

    },


    /* =====================================================
       REPORT 10
       ===================================================== */

    report10: {

      id: "RPT-010",

      category: "Waterlogging",

      location: "Ranjit Avenue, Amritsar",

      description:
        "Water was reported collecting near the crossing after rainfall.",

      reportedBy: "J. Singh",

      reportedTime: "2 days ago",

      reportsFiled: 2,

      locationType: "Road crossing",

      status: "Resolved",

      photoUrl:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Weather dependent",

      lastCleaned: "Yesterday",

      issueReturned: "No",

      previousReports: "1 previous report",

      conditionNote:
        "Water cleared after drainage and cleaning action.",

      timeline: [

        {
          date: "Yesterday",
          title: "Water cleared",
          text: "Standing water was cleared from the crossing."
        },

        {
          date: "2 days ago",
          title: "Report submitted",
          text: "Waterlogging was reported after rainfall."
        }

      ]

    },


    /* =====================================================
       REPORT 11
       ===================================================== */

    report11: {

      id: "RPT-011",

      category: "Waterlogging",

      location: "Boring Road, Patna",

      description:
        "Street flooding was observed and nearby drains appeared to be blocked.",

      reportedBy: "A. Roy",

      reportedTime: "1 hour ago",

      reportsFiled: 3,

      locationType: "Main road",

      status: "Under Action",

      photoUrl:
        "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Recurring after rain",

      lastCleaned: "Today",

      issueReturned: "Yes",

      previousReports: "2 previous reports",

      conditionNote:
        "Repeated waterlogging has been observed after rainfall.",

      timeline: [

        {
          date: "Today",
          title: "New report submitted",
          text: "Street flooding was reported."
        },

        {
          date: "Last week",
          title: "Previous report",
          text: "Similar waterlogging was reported."
        }

      ]

    },


    /* =====================================================
       REPORT 12
       ===================================================== */

    report12: {

      id: "RPT-012",

      category: "Garbage Dumping",

      location: "Kankarbagh, Patna",

      description:
        "A garbage heap was reported near the main road.",

      reportedBy: "R. Das",

      reportedTime: "7 hours ago",

      reportsFiled: 1,

      locationType: "Main road",

      status: "Reported",

      photoUrl:
        "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Unknown",

      lastCleaned: "Unknown",

      issueReturned: "Unknown",

      previousReports: "No previous reports",

      conditionNote:
        "This is currently the first recorded report for this location.",

      timeline: [

        {
          date: "Today",
          title: "Report submitted",
          text: "Garbage accumulation was reported."
        }

      ]

    },


    /* =====================================================
       REPORT 13
       ===================================================== */

    report13: {

      id: "RPT-013",

      category: "Area Cleanliness",

      location: "Gandhi Maidan, Patna",

      description:
        "Litter was reported following a public event in the area.",

      reportedBy: "T. Kumar",

      reportedTime: "3 days ago",

      reportsFiled: 1,

      locationType: "Public space",

      status: "Resolved",

      photoUrl:
        "https://images.unsplash.com/photo-1523742810241-0e7d1c9c9d8c?auto=format&fit=crop&w=1200&q=80",

      cleaningPattern: "Event-related",

      lastCleaned: "2 days ago",

      issueReturned: "No",

      previousReports: "No previous reports",

      conditionNote:
        "The litter was associated with a public event and was cleared afterwards.",

      timeline: [

        {
          date: "2 days ago",
          title: "Area cleaned",
          text: "Reported litter was cleared."
        },

        {
          date: "3 days ago",
          title: "Report submitted",
          text: "Post-event litter was reported."
        }

      ]

    },
    
    // Sector 49, Noida — recurring garbage dumping
    "sector49-garbage": {
      id: "RPT-014",
      category: "Garbage Dumping",
      location: "Sector 49, Noida",
      description:
        "Recurring garbage dumping in the locality. The submitted photographs show accumulated waste along the roadside.",
      reportedBy: "Community Resident",
      reportedTime: "Recently reported",
      reportsFiled: "Needs verification",
      locationType: "Roadside / locality",
      status: "Under Action",
       photoUrl: "images/sector49-dumping-1.jpeg",
  photos: [
    "images/sector49-dumping-1.jpeg",
    "images/sector49-dumping-2.jpeg"

      ],
      cleaningPattern: "Repeated dumping reported",
      lastCleaned: "Needs verification",
      issueReturned: "Reported as recurring",
      previousReports: "Needs verification",
      conditionNote:
        "Community concern: garbage dumping reportedly recurs even after cleaning. Previous cleaning dates and complaint records need verification.",
      timeline: [
        {
          date: "Current report",
          title: "Garbage dumping reported",
          text: "Photographs submitted showing accumulated waste in Sector 49, Noida."
        },
        {
          date: "Previous incidents",
          title: "Recurring locality concern",
          text: "Repeated dumping has been reported by the community; exact dates require verification."
        }
      ]
    }

  };


  /* =========================================================
     GET REPORT ID FROM URL
     ========================================================= */

  var params = new URLSearchParams(window.location.search);

  var reportKey = params.get("id");


  /* =========================================================
     FIND REPORT
     ========================================================= */

  var report = reports[reportKey];


  /* =========================================================
     IF INVALID ID
     ========================================================= */

  if (!report) {

    document.getElementById("report-title").textContent =
      "Report not found";

    document.getElementById("report-location").textContent =
      "The requested report does not exist.";

    document.getElementById("report-description").textContent =
      "Please return to the Community Reports map and select a valid report.";

    document.getElementById("report-status").textContent =
      "Unavailable";

  } else {

    /* =======================================================
       BASIC INFORMATION
       ======================================================= */

    document.getElementById("report-id").textContent =
      report.id;

    document.getElementById("report-title").textContent =
      report.category;

    document.getElementById("report-location").textContent =
      "📍 " + report.location;

    document.getElementById("report-status").textContent =
      report.status;


    /* =======================================================
       REPORT DETAILS
       ======================================================= */

    document.getElementById("report-description").textContent =
      report.description;


    /* =======================================================
       REPORT INFORMATION
       ======================================================= */

    document.getElementById("reported-by").textContent =
      report.reportedBy;

    document.getElementById("reported-time").textContent =
      report.reportedTime;

    document.getElementById("reports-filed").textContent =
      report.reportsFiled;

    document.getElementById("location-type").textContent =
      report.locationType;


    /* =======================================================
       CONDITION
       ======================================================= */

    document.getElementById("cleaning-pattern").textContent =
      report.cleaningPattern;

    document.getElementById("last-cleaned").textContent =
      report.lastCleaned;

    document.getElementById("issue-returned").textContent =
      report.issueReturned;

    document.getElementById("previous-reports").textContent =
      report.previousReports;

    document.getElementById("condition-note").textContent =
      report.conditionNote;


    /* =======================================================
       LOCATION
       ======================================================= */

    document.getElementById("mini-map-location").textContent =
      report.location;


    /* =======================================================
       PHOTO

       Later replace report.photoUrl with S3 URL.
       ======================================================= */

    var photo = document.getElementById("report-photo");

    var placeholder =
      document.getElementById("photo-placeholder");

    if (report.photoUrl) {

      photo.src = report.photoUrl;

      photo.onload = function () {

        photo.style.display = "block";

        placeholder.style.display = "none";

      };

      photo.onerror = function () {

        photo.style.display = "none";

        placeholder.style.display = "flex";

      };

    }


    /* =======================================================
       TIMELINE
       ======================================================= */

    var timeline =
      document.getElementById("report-timeline");

    timeline.innerHTML =
      report.timeline.map(function (item) {

        return (

          '<div class="s5-timeline-item">' +

            '<div class="s5-timeline-date">' +
              escapeHtml(item.date) +
            '</div>' +

            '<div class="s5-timeline-title">' +
              escapeHtml(item.title) +
            '</div>' +

            '<div class="s5-timeline-text">' +
              escapeHtml(item.text) +
            '</div>' +

          '</div>'

        );

      }).join("");

  }


  /* =========================================================
     REPORT AGAIN BUTTON
     ========================================================= */

  document
    .getElementById("report-again-btn")
    .addEventListener("click", function () {

      alert(
        "Report submission will be connected to the reporting system later."
      );

    });


  /* =========================================================
     SECURITY HELPER
     ========================================================= */

  function escapeHtml(str) {

    return String(str).replace(
      /[&<>"']/g,

      function (character) {

        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"

        }[character];

      }
    );

  }

})();
