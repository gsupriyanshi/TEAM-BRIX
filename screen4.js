
/* Screen 4: Community Reports / Live Map
   Vanilla JS + Leaflet. Demo data for the prototype. */

(function () {
  "use strict";

  /* ---------- CONFIG ---------- */
  var SCREEN5_URL = "screen5.html";

  function reportUrl(id) {
    return SCREEN5_URL + "?id=" + encodeURIComponent(id);
  }

  /* ---------- CATEGORIES ---------- */
  var CATEGORIES = [
    { key: "garbage", label: "Garbage Dumping", color: "#d9622b" },
    { key: "waterlogging", label: "Waterlogging", color: "#2478c7" },
    { key: "cleanliness", label: "Area Cleanliness", color: "#1f8a4c" },
    { key: "other", label: "Other", color: "#7a5fc2" }
  ];

  function categoryOf(report) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].label === report.category) {
        return CATEGORIES[i];
      }
    }
    return CATEGORIES[3];
  }

  /* ---------- REPORT DATA ---------- */
  var reports = [
    // Noida
    {
      id: "report1",
      category: "Garbage Dumping",
      location: "Sector 62, Noida",
      coordinates: [28.6208, 77.3649],
      description: "Repeated garbage dumping near the flyover.",
      reportedTime: "2 hours ago",
      status: "Under Action"
    },
    {
      id: "report2",
      category: "Waterlogging",
      location: "Sector 18, Noida",
      coordinates: [28.5706, 77.3218],
      description: "Water stuck on the service road after rain.",
      reportedTime: "5 hours ago",
      status: "Reported"
    },
    {
      id: "report3",
      category: "Area Cleanliness",
      location: "Sector 137, Noida",
      coordinates: [28.5100, 77.4055],
      description: "Litter piling up near the park entrance.",
      reportedTime: "1 day ago",
      status: "Resolved"
    },
    {
      id: "report4",
      category: "Other",
      location: "Noida Sector 50 Market",
      coordinates: [28.5700, 77.3600],
      description: "Burning of dry leaves in an open plot.",
      reportedTime: "3 hours ago",
      status: "Reported"
    },

    // Faridabad
    {
      id: "report5",
      category: "Garbage Dumping",
      location: "Sector 21, Faridabad",
      coordinates: [28.4089, 77.3178],
      description: "Overflowing bin and loose waste on the roadside.",
      reportedTime: "6 hours ago",
      status: "Under Action"
    },
    {
      id: "report6",
      category: "Waterlogging",
      location: "NIT, Faridabad",
      coordinates: [28.3670, 77.3100],
      description: "Blocked drain causing standing water.",
      reportedTime: "1 day ago",
      status: "Reported"
    },
    {
      id: "report7",
      category: "Area Cleanliness",
      location: "Ballabgarh, Faridabad",
      coordinates: [28.3400, 77.3250],
      description: "Market lane needs regular cleaning.",
      reportedTime: "2 days ago",
      status: "Resolved"
    },

    // Punjab
    {
      id: "report8",
      category: "Garbage Dumping",
      location: "Model Town, Ludhiana",
      coordinates: [30.8990, 75.8430],
      description: "Waste dumped beside the canal road.",
      reportedTime: "4 hours ago",
      status: "Reported"
    },
    {
      id: "report9",
      category: "Other",
      location: "Golden Temple Rd, Amritsar",
      coordinates: [31.6200, 74.8765],
      description: "Plastic waste near the walkway.",
      reportedTime: "8 hours ago",
      status: "Under Action"
    },
    {
      id: "report10",
      category: "Waterlogging",
      location: "Ranjit Avenue, Amritsar",
      coordinates: [31.6475, 74.8590],
      description: "Water collecting at the crossing after rain.",
      reportedTime: "2 days ago",
      status: "Resolved"
    },

    // Bihar
    {
      id: "report11",
      category: "Waterlogging",
      location: "Boring Road, Patna",
      coordinates: [25.6093, 85.1236],
      description: "Streets flooded; drains look blocked.",
      reportedTime: "1 hour ago",
      status: "Under Action"
    },
    {
      id: "report12",
      category: "Garbage Dumping",
      location: "Kankarbagh, Patna",
      coordinates: [25.5941, 85.1700],
      description: "Garbage heap near the main road.",
      reportedTime: "7 hours ago",
      status: "Reported"
    },
    {
      id: "report13",
      category: "Area Cleanliness",
      location: "Gandhi Maidan, Patna",
      coordinates: [25.6190, 85.1440],
      description: "Litter left after a public event.",
      reportedTime: "3 days ago",
      status: "Resolved"
    },

    // Sector 49, Noida - recurring garbage dumping
    {
      id: "sector49-garbage",
      category: "Garbage Dumping",
      location: "Sector 49, Noida",
      coordinates: [28.5675, 77.3670],
      description:
        "Recurring garbage dumping in the locality despite previous cleaning efforts.",
      reportedTime: "Recently reported",
      status: "Under Action"
    }
  ];

  /* ---------- STATE ---------- */
  var state = {
    filter: "all",
    query: ""
  };

  var markers = {};

  /* ---------- HELPERS ---------- */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c];
    });
  }

  function matches(r) {
    var cat = categoryOf(r);

    if (state.filter !== "all" && cat.key !== state.filter) {
      return false;
    }

    var q = state.query.trim().toLowerCase();

    if (!q) return true;

    return (
      r.location + " " +
      r.category + " " +
      r.description + " " +
      r.status
    ).toLowerCase().indexOf(q) !== -1;
  }

  function statusHtml(status) {
    return (
      '<span class="s4-status" data-status="' +
      esc(status) +
      '">' +
      esc(status) +
      "</span>"
    );
  }

  /* ---------- MAP ---------- */
  var map = L.map("s4-map", {
    scrollWheelZoom: true
  }).setView([28.2, 78.5], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">' +
      "OpenStreetMap</a> contributors"
  }).addTo(map);

  function pinIcon(color) {
    return L.divIcon({
      className: "",
      html:
        '<div class="s4-pin" style="background:' +
        color +
        '"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 26],
      popupAnchor: [0, -26]
    });
  }

  function popupHtml(r) {
    return (
      '<p class="s4-pop-type">' +
      esc(r.category) +
      "</p>" +

      '<p class="s4-pop-loc">&#128205; ' +
      esc(r.location) +
      "</p>" +

      '<p class="s4-pop-desc">&ldquo;' +
      esc(r.description) +
      "&rdquo;</p>" +

      '<div class="s4-pop-meta"><span>Reported ' +
      esc(r.reportedTime) +
      "</span>" +

      statusHtml(r.status) +
      "</div>" +

      '<a class="s4-pop-link" href="' +
      reportUrl(r.id) +
      '">View Full Report &rarr;</a>'
    );
  }

  reports.forEach(function (r) {
    var m = L.marker(r.coordinates, {
      icon: pinIcon(categoryOf(r).color),
      title: r.category
    });

    m.bindPopup(popupHtml(r), {
      maxWidth: 260
    });

    markers[r.id] = m;
  });

  /* ---------- LEGEND ---------- */
  document.getElementById("s4-legend-list").innerHTML =
    CATEGORIES.map(function (c) {
      return (
        '<li><span class="s4-dot" style="background:' +
        c.color +
        '"></span>' +
        esc(c.label) +
        "</li>"
      );
    }).join("");

  /* ---------- CARDS ---------- */
  var cardsEl = document.getElementById("s4-cards");
  var emptyEl = document.getElementById("s4-empty");
  var countEl = document.getElementById("s4-count");

  function cardHtml(r) {
    var cat = categoryOf(r);

    return (
      '<article class="s4-card" data-id="' +
      esc(r.id) +
      '">' +

      '<div class="s4-card-top">' +

      '<span class="s4-card-type">' +
      '<span class="s4-dot" style="background:' +
      cat.color +
      '"></span>' +
      esc(r.category) +
      "</span>" +

      statusHtml(r.status) +

      "</div>" +

      '<p class="s4-card-loc">&#128205; ' +
      esc(r.location) +
      "</p>" +

      '<p class="s4-card-desc">' +
      esc(r.description) +
      "</p>" +

      '<div class="s4-card-foot">' +

      '<span class="s4-card-time">' +
      esc(r.reportedTime) +
      "</span>" +

      '<a class="s4-view-btn" href="' +
      reportUrl(r.id) +
      '">View Report</a>' +

      "</div>" +
      "</article>"
    );
  }

  /* ---------- RENDER: FILTERS + SEARCH ---------- */
  function render(fitMap) {
    var visible = reports.filter(matches);

    reports.forEach(function (r) {
      var show = visible.indexOf(r) !== -1;

      if (show && !map.hasLayer(markers[r.id])) {
        markers[r.id].addTo(map);
      }

      if (!show && map.hasLayer(markers[r.id])) {
        map.removeLayer(markers[r.id]);
      }
    });

    cardsEl.innerHTML = visible.map(cardHtml).join("");

    emptyEl.hidden = visible.length > 0;

    countEl.textContent =
      visible.length +
      (visible.length === 1 ? " report" : " reports");

    if (fitMap && visible.length) {
      map.fitBounds(
        L.latLngBounds(
          visible.map(function (r) {
            return r.coordinates;
          })
        ),
        {
          padding: [50, 50],
          maxZoom: 12
        }
      );
    }
  }

  /* ---------- EVENTS ---------- */
  document.querySelectorAll(".s4-chip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".s4-chip").forEach(function (b) {
        b.classList.remove("is-active");
      });

      btn.classList.add("is-active");

      state.filter = btn.getAttribute("data-filter");

      render(true);
    });
  });

  document
    .getElementById("s4-search-input")
    .addEventListener("input", function (e) {
      state.query = e.target.value;
      render(true);
    });

  // Clicking a card focuses its marker.
  cardsEl.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;

    var card = e.target.closest(".s4-card");

    if (!card) return;

    var m = markers[card.getAttribute("data-id")];

    if (!m) return;

    map.flyTo(m.getLatLng(), 12, {
      duration: 0.8
    });

    m.openPopup();

    document
      .getElementById("s4-map")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
  });

  // Location button is visual only for now.
  document
    .getElementById("s4-locate-btn")
    .addEventListener("click", function (e) {
      e.preventDefault();
    });

  /* ---------- INIT ---------- */
  render(true);
})();
