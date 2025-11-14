/* -----------------------------------------------------------
   DESIGN-ONLY JAVASCRIPT FOR CAMPUS GUIDE
   - Fake map zoom
   - Fake building highlight
   - Image loading animations
   - Smooth fade-ins
   ----------------------------------------------------------- */

/* ---------------------------
   1. IMAGE LOADING EFFECTS
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("[data-img]");

  lazyImages.forEach(img => {
    setTimeout(() => {
      img.classList.add("loaded");
      img.innerHTML = `<span>${img.dataset.img} LOADED</span>`;
    }, 900 + Math.random() * 800);
  });

  // Fade in sections
  const fadeSections = document.querySelectorAll(".fade-section");
  fadeSections.forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 250);
  });
});


/* ---------------------------
   2. FAKE MAP INTERACTIONS
---------------------------- */
const mapArea = document.querySelector(".map-placeholder-large");
let zoomLevel = 1;

function updateMapZoom() {
  mapArea.style.transform = `scale(${zoomLevel})`;
}

document.addEventListener("click", e => {
  if (!e.target.matches(".map-zoom-btn")) return;

  const action = e.target.dataset.zoom;

  if (action === "in" && zoomLevel < 2) zoomLevel += 0.1;
  if (action === "out" && zoomLevel > 1) zoomLevel -= 0.1;

  updateMapZoom();
});

/* ---------------------------
   3. BUILDING MARKER HIGHLIGHT
---------------------------- */
const markers = document.querySelectorAll(".map-marker");

markers?.forEach(marker => {
  marker.addEventListener("mouseenter", () => {
    marker.classList.add("active");
  });

  marker.addEventListener("mouseleave", () => {
    marker.classList.remove("active");
  });

  marker.addEventListener("click", () => {
    alert(`DESIGN ONLY:\nYou clicked on: ${marker.dataset.name}`);
  });
});


/* ============================================================
   IMAGE & SECTION ANIMATIONS (Optional nice effects)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  // Fade-in sections
  const fadeSections = document.querySelectorAll(".fade-section");
  fadeSections.forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 200);
  });

});


/* ============================================================
   REAL OPENSTREETMAP USING LEAFLET
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  // Check if map container exists
  const mapContainer = document.getElementById("campusMap");
  if (!mapContainer) return;

  // Initialize map at IUEA (Kansanga)
  const map = L.map("campusMap").setView([0.2985, 32.6160], 17);

  // Load OSM tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap Contributors"
  }).addTo(map);

  /* ============================================================
     CUSTOM COLORED MARKERS
     ============================================================ */
  const iconGreen = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  const iconOrange = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  const iconPurple = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  const iconYellow = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  /* ============================================================
     BUILDINGS (REAL IUEA PROTOTYPE)
     ============================================================ */

  const buildings = [
    {
      name: "IUEA Main Library",
      coords: [0.2988, 32.6156],
      link: "building-details.html?building=library",
      icon: iconGreen // Academic
    },
    {
      name: "Main Administration Building",
      coords: [0.2983, 32.6158],
      link: "building-details.html?building=main-building",
      icon: iconOrange // Admin
    },
    {
      name: "Engineering & Technology Block",
      coords: [0.2979, 32.6162],
      link: "building-details.html?building=engineering-block",
      icon: iconGreen // Academic
    },
    {
      name: "IT & Computer Science Block",
      coords: [0.2986, 32.6164],
      link: "building-details.html?building=it-block",
      icon: iconGreen // Academic
    },
    {
      name: "Student Cafeteria",
      coords: [0.2984, 32.6168],
      link: "building-details.html?building=cafeteria",
      icon: iconYellow // Services
    },
    {
      name: "Student Residences",
      coords: [0.2981, 32.6160],
      link: "#",
      icon: iconPurple // Residence
    }
  ];

  /* ============================================================
     ADD MARKERS TO THE MAP
     ============================================================ */
  buildings.forEach(b => {
    L.marker(b.coords, { icon: b.icon })
      .addTo(map)
      .bindPopup(`<b>${b.name}</b><br><a href="${b.link}">View Details</a>`);
  });

});


/* ============================================================
   HOMEPAGE MINI-MAP
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  const homeMap = document.querySelector(".homepage-map");
  if (!homeMap) return;

  // Delay ensures the grid layout is fully loaded
  setTimeout(() => {
    const map2 = L.map(homeMap, {
      zoomControl: false, // cleaner UI
      attributionControl: false
    }).setView([0.2985, 32.6160], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map2);

    // Add markers (green for academic)
    L.marker([0.2988, 32.6156], { icon: iconGreen }).addTo(map2);
    L.marker([0.2979, 32.6162], { icon: iconGreen }).addTo(map2);
    L.marker([0.2986, 32.6164], { icon: iconGreen }).addTo(map2);
    L.marker([0.2984, 32.6168], { icon: iconYellow }).addTo(map2);

    // Resize fix
    map2.invalidateSize(true);
  }, 300);

});