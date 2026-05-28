'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

// ─── Fix the default Leaflet icon broken by Webpack/Vite asset hashing ────────
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});
// ─────────────────────────────────────────────────────────────────────────────

import "../styles/CompanyMap.css";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

const TILE_LAYERS = {
  light: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    label: "Light",
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    label: "Dark",
  },
};

export const DEFAULT_BRANCHES = [
  {
    id: 1,
    name: "T.Nagar",
    address: "102/82, Gopathy Narayana Rd, T. Nagar, Chennai, Tamil Nadu 600017",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "hq",
    lat: 13.0432068,
    lng: 80.2366314,
  },
  {
    id: 2,
    name: "Ashok Nagar",
    address: "27, 10th Ave, Sarvamangala Colony, Ashok Nagar, Chennai, Tamil Nadu 600083",
    phone: "08939188844",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 13.0346318,
    lng: 80.2145679,
  },
  {
    id: 3,
    name: "Vettuvankeni ECR",
    address: "First Avenue, Vettuvankeni, Kotivakkam, Chennai, Tamil Nadu 600115",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.9348848,
    lng: 80.2521229,
  },
  {
    id: 4,
    name: "Muttukadu",
    address: "1/74, State Highway 49, Muthukadu, Tamil Nadu 603112",
    phone: "07904058228",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.8240589,
    lng: 80.2403894,
  },
  {
    id: 5,
    name: "Velachery",
    address: "51, Ganapathy Nagar, 150 Feet, Velachery Bypass Rd, Chennai, Tamil Nadu 600042",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "store",
    lat: 12.9883767,
    lng: 80.2183278,
  },
  {
    id: 6,
    name: "Thoraipakkam",
    address: "2/95B, Sri Nilayam, Old Mahabalipuram Rd, Thoraipakkam, Chennai, Tamil Nadu 600097",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.9441927,
    lng: 80.23754,
  },
  {
    id: 7,
    name: "Mount Road",
    address: "182/183, Anna Salai, Chennai, Tamil Nadu 600002",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 13.0630476,
    lng: 80.2646649,
  },
  {
    id: 8,
    name: "Medavakkam",
    address: "8/7, Velachery Main Rd, Medavakkam, Chennai, Tamil Nadu 600100",
    phone: "09791050255",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.9178654,
    lng: 80.1782677,
  },
  {
    id: 9,
    name: "Pallavaram",
    address: "Grand Galada Mall, GST Rd, Pallavaram, Chennai, Tamil Nadu 600043",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.9786463,
    lng: 80.1616134,
  },
  {
    id: 10,
    name: "Navalur",
    address: "Rajiv Gandhi Salai, Navalur, Chennai, Tamil Nadu 600130",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.852103,
    lng: 80.2261163,
  },
  {
    id: 11,
    name: "Urapakkam",
    address: "Abnirami Nagar, Urapakkam, Chennai, Tamil Nadu 603210",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.859096,
    lng: 80.0711408,
  },
  {
    id: 12,
    name: "Porur",
    address: "Mount Poonamallee Rd, Iyyappanthangal, Chennai, Tamil Nadu 600056",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 13.0380162,
    lng: 80.1382247,
  },
  {
    id: 13,
    name: "Purasawalkam",
    address: "934, Poonamallee High Rd, Purasaiwakkam, Chennai, Tamil Nadu 600084",
    phone: "09791002846",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 13.0789665,
    lng: 80.2533042,
  },
  {
    id: 14,
    name: "Koyambedu",
    address: "C-22, Jai Nagar, Arumbakkam, Chennai, Tamil Nadu 600106",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 13.0702944,
    lng: 80.2051896,
  },
  {
    id: 15,
    name: "Radial Road",
    address: "300/2/1265, Kovilambakkam, Chennai, Tamil Nadu 600117",
    phone: "07397222111",
    email: "support@gvrfoods.com",
    hours: "Daily 9AM - 9PM",
    type: "branch",
    lat: 12.9489521,
    lng: 80.1944329,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Haversine formula — straight-line distance between two lat/lng points in km.
 */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Fetch a walking/driving route from OSRM (free, no API key needed).
 * Returns an array of [lat, lng] pairs that form the route polyline.
 */
async function fetchOsrmRoute(fromLat, fromLng, toLat, toLng) {
  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${fromLng},${fromLat};${toLng},${toLat}` +
    `?overview=full&geometries=geojson`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("OSRM fetch failed");
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) throw new Error("No route found");

  const coords = data.routes[0].geometry.coordinates; // [lng, lat] pairs
  const distanceM = data.routes[0].distance;
  const durationS = data.routes[0].duration;

  return {
    polyline: coords.map(([lng, lat]) => [lat, lng]),
    distanceKm: (distanceM / 1000).toFixed(1),
    durationMin: Math.ceil(durationS / 60),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

const makeSvgIcon = (svgHtml, size = [36, 44], anchor = [18, 44]) =>
  L.divIcon({
    html: svgHtml,
    className: "company-map__svg-icon",
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -44],
  });

const BRANCH_COLORS = {
  hq: "#D4610A",
  branch: "#F47B20",
  store: "#6DBE45",
};

const buildBranchIcon = (type = "branch") => {
  const color = BRANCH_COLORS[type] ?? BRANCH_COLORS.branch;
  const symbol =
    type === "hq"
      ? `<path d="M18 9l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="white" opacity="0.9"/>`
      : type === "store"
      ? `<rect x="12" y="12" width="12" height="10" rx="1" fill="white" opacity="0.9"/><rect x="15" y="18" width="6" height="4" fill="${color}"/>`
      : `<circle cx="18" cy="16" r="5" fill="white" opacity="0.9"/>`;

  return makeSvgIcon(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 44" width="36" height="44">
      <filter id="shadow-${type}">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
      </filter>
      <path d="M18 2C10.268 2 4 8.268 4 16c0 10 14 26 14 26s14-16 14-26C32 8.268 25.732 2 18 2z"
        fill="${color}" filter="url(#shadow-${type})"/>
      <path d="M18 4C11.373 4 6 9.373 6 16c0 9 12 23 12 23s12-14 12-23C30 9.373 24.627 4 18 4z"
        fill="${color}" opacity="0.7"/>
      ${symbol}
    </svg>`,
    [36, 44],
    [18, 44]
  );
};

const USER_ICON = makeSvgIcon(
  `<div class="company-map__user-dot">
    <div class="company-map__user-pulse"></div>
    <div class="company-map__user-core"></div>
  </div>`,
  [24, 24],
  [12, 12]
);

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: MapBoundsController
// ─────────────────────────────────────────────────────────────────────────────
function MapBoundsController({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: true });
      return;
    }
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [60, 60], animate: true, maxZoom: 15 });
  }, [map, points]);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: LocateMeButton
// Floating button inside the map that flies to the user's current location.
// ─────────────────────────────────────────────────────────────────────────────
function LocateMeButton({ userLocation }) {
  const map = useMap();

  if (!userLocation) return null;

  const handleClick = () => {
    map.flyTo([userLocation.lat, userLocation.lng], 16, {
      animate: true,
      duration: 1.2,
    });
  };

  return (
    <div
      className="company-map__locate-btn"
      onClick={handleClick}
      title="Return to my location"
      role="button"
      aria-label="Return to my location"
    >
      {/* Crosshair / locate icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="18"
        height="18"
      >
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2"  x2="12" y2="6"  />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2"  y1="12" x2="6"  y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: RouteLayer
// Draws the OSRM polyline on the map when routeData is available.
// ─────────────────────────────────────────────────────────────────────────────
function RouteLayer({ routeData }) {
  const map = useMap();

  useEffect(() => {
    if (!routeData?.polyline?.length) return;
    const bounds = L.latLngBounds(routeData.polyline);
    map.fitBounds(bounds, { padding: [60, 80], animate: true });
  }, [map, routeData]);

  if (!routeData?.polyline?.length) return null;

  return (
    <Polyline
      positions={routeData.polyline}
      pathOptions={{
        color: "#F47B20",
        weight: 5,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round",
        dashArray: null,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: BranchMarker
// ─────────────────────────────────────────────────────────────────────────────
function BranchMarker({ branch, isHighlighted, onRouteRequest, routeInfo, isRouting }) {
  const icon = useMemo(() => buildBranchIcon(branch.type), [branch.type]);
  const markerRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isHighlighted]);

  const typeLabel =
    branch.type === "hq"
      ? "Headquarters"
      : branch.type === "store"
      ? "Store"
      : "Branch";

  const isThisBranchRouted = routeInfo?.branchId === branch.id;

  return (
    <Marker
      ref={markerRef}
      position={[branch.lat, branch.lng]}
      icon={icon}
      title={branch.name}
    >
      <Popup className="company-map__popup" maxWidth={290}>
        <div className="company-map__popup-card">
          {/* Header */}
          <div
            className="company-map__popup-header"
            style={{ "--branch-color": BRANCH_COLORS[branch.type] ?? BRANCH_COLORS.branch }}
          >
            <span className="company-map__popup-type">{typeLabel}</span>
            <h3 className="company-map__popup-name">{branch.name}</h3>
          </div>

          {/* Body */}
          <div className="company-map__popup-body">
            <p className="company-map__popup-address">
              <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
              {branch.address}
            </p>

            {branch.phone && (
              <a href={`tel:${branch.phone}`} className="company-map__popup-link">
                <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.7a1.5 1.5 0 0 1-1.454-.355L5.353 7.163a1.5 1.5 0 0 1-.355-1.453l.468-1.804a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                </svg>
                {branch.phone}
              </a>
            )}

            {branch.email && (
              <a href={`mailto:${branch.email}`} className="company-map__popup-link">
                <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114V5.383zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.731z" />
                </svg>
                {branch.email}
              </a>
            )}

            {branch.hours && (
              <p className="company-map__popup-hours">
                <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                {branch.hours}
              </p>
            )}

            {/* ── Route info or Get Directions button ── */}
            {isThisBranchRouted && routeInfo ? (
              <div className="company-map__route-info">
                <div className="company-map__route-stat">
                  <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.5v4.793l3.146 3.147-.707.707-3.5-3.5A.5.5 0 0 1 7.5 9V4.5h1z"/>
                  </svg>
                  <span>{routeInfo.durationMin} min drive</span>
                </div>
                <div className="company-map__route-stat">
                  <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                    <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zm14.985 3.75L14.207 2l-5.5 5.5 5.5 5.5 1.778-1.75L11.707 7.5l4.278-3.75z"/>
                  </svg>
                  <span>{routeInfo.distanceKm} km away</span>
                </div>
                <button
                  className="company-map__route-clear-btn"
                  onClick={() => onRouteRequest(null)}
                >
                  Clear route
                </button>
              </div>
            ) : (
              <button
                className="company-map__directions-btn"
                onClick={() => onRouteRequest(branch)}
                disabled={isRouting}
              >
                {isRouting ? (
                  <>
                    <span className="company-map__spinner" />
                    Getting route…
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    Get Directions
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: CompanyMap
// ─────────────────────────────────────────────────────────────────────────────
export default function CompanyMap({
  branches = DEFAULT_BRANCHES,
  companyName = "Acme Corp",
  showSearch = true,
  showThemeToggle = true,
  height = "560px",
  defaultTheme = "light",
}) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(defaultTheme);
  const [userLocation, setUserLocation] = useState(null);
  const [geoStatus, setGeoStatus] = useState("idle");
  const [geoError, setGeoError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Route state
  const [routeData, setRouteData] = useState(null);   // { polyline, distanceKm, durationMin, branchId }
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // ── Filtered branches ──────────────────────────────────────────────────────
  const filteredBranches = useMemo(() => {
    if (!searchQuery.trim()) return branches;
    const q = searchQuery.toLowerCase();
    return branches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        (b.type && b.type.toLowerCase().includes(q))
    );
  }, [branches, searchQuery]);

  // Auto-highlight & zoom to single search result
  useEffect(() => {
    if (filteredBranches.length === 1) {
      setHighlightedId(filteredBranches[0].id);
    } else if (filteredBranches.length > 1) {
      // Reset highlight when query is broad so map re-fits all results
      setHighlightedId(null);
    }
  }, [filteredBranches]);

  // Map points for bounds fitting
  const mapPoints = useMemo(() => {
    const pts = filteredBranches.map((b) => [b.lat, b.lng]);
    if (userLocation) pts.push([userLocation.lat, userLocation.lng]);
    return pts;
  }, [filteredBranches, userLocation]);

  // ── Geolocation ────────────────────────────────────────────────────────────
  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoStatus("loading");
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("success");
      },
      (err) => {
        const messages = {
          1: "Location access was denied. Enable it in browser settings.",
          2: "Location unavailable. Please try again.",
          3: "Location request timed out. Please try again.",
        };
        setGeoStatus("error");
        setGeoError(messages[err.code] ?? "An unknown error occurred.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => { requestGeolocation(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Route handler ──────────────────────────────────────────────────────────
  /**
   * Called when the user clicks "Get Directions" inside a popup.
   * Pass null to clear the current route.
   */
  const handleRouteRequest = useCallback(
    async (branch) => {
      // Clear route
      if (!branch) {
        setRouteData(null);
        setRouteError(null);
        return;
      }

      if (!userLocation) {
        setRouteError("Enable location access to get directions.");
        return;
      }

      setIsRouting(true);
      setRouteError(null);
      setRouteData(null);

      try {
        const result = await fetchOsrmRoute(
          userLocation.lat,
          userLocation.lng,
          branch.lat,
          branch.lng
        );
        setRouteData({ ...result, branchId: branch.id });
      } catch {
        // Fallback: show straight-line distance if OSRM fails
        const km = haversineKm(userLocation.lat, userLocation.lng, branch.lat, branch.lng).toFixed(1);
        setRouteData({
          polyline: [
            [userLocation.lat, userLocation.lng],
            [branch.lat, branch.lng],
          ],
          distanceKm: km,
          durationMin: Math.ceil((km / 30) * 60), // estimate at 30 km/h
          branchId: branch.id,
        });
        setRouteError("Exact route unavailable — showing straight-line distance.");
      } finally {
        setIsRouting(false);
      }
    },
    [userLocation]
  );

  // ── Tile layer & legend ────────────────────────────────────────────────────
  const currentTile = TILE_LAYERS[theme] ?? TILE_LAYERS.light;

  const legendTypes = useMemo(() => {
    const seen = new Set();
    return branches
      .filter((b) => { if (seen.has(b.type)) return false; seen.add(b.type); return true; })
      .map((b) => ({ type: b.type, color: BRANCH_COLORS[b.type] ?? "#333" }));
  }, [branches]);

  // ── Straight-line distance label for sidebar items ─────────────────────────
  const distanceLabel = (branch) => {
    if (!userLocation) return null;
    const km = haversineKm(userLocation.lat, userLocation.lng, branch.lat, branch.lng);
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="Map_outer">
      <section
        className={`company-map company-map--${theme}`}
        aria-label={`${companyName} locations map`}
      >
        {/* Header */}
        <div className="company-map__header">
          <div className="company-map__header-left">
            <div className="company-map__logo-badge" aria-hidden="true">
              <img
                src="/assets/Gethamlogo.png"
                alt="Getham Logo"
                width="40"
                height="30"
                className="MapLogo"
              />
            </div>
            <div>
              <h2 className="company-map__title">{companyName}</h2>
              <p className="company-map__subtitle">
                {filteredBranches.length}{" "}
                {filteredBranches.length === 1 ? "location" : "locations"}
                {searchQuery && " found"}
              </p>
            </div>
          </div>

          <div className="company-map__header-right">
            {showThemeToggle && (
              <button
                className="company-map__theme-btn"
                onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                title={`Switch to ${theme === "light" ? "dark" : "light"} map`}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} map`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            )}
            <button
              className="company-map__sidebar-toggle"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label={sidebarOpen ? "Hide branch list" : "Show branch list"}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="company-map__body">

          {/* Sidebar */}
          <aside
            className={`company-map__sidebar ${sidebarOpen ? "company-map__sidebar--open" : ""}`}
            aria-label="Branch list"
          >
            {/* Search */}
            {showSearch && (
              <div className="company-map__search-wrap">
                <svg className="company-map__search-icon" viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.868-3.834zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                </svg>
                <input
                  type="search"
                  className="company-map__search"
                  placeholder="Search locations…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search branches"
                />
              </div>
            )}

            {/* Route error banner */}
            {routeError && (
              <div className="company-map__route-error-banner">
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                {routeError}
              </div>
            )}

            {/* Route summary strip */}
            {routeData && (
              <div className="company-map__route-strip">
                <div className="company-map__route-strip-inner">
                  <span className="company-map__route-strip-label">Route active</span>
                  <span className="company-map__route-strip-stats">
                    {routeData.distanceKm} km · ~{routeData.durationMin} min
                  </span>
                </div>
                <button
                  className="company-map__route-strip-clear"
                  onClick={() => handleRouteRequest(null)}
                  aria-label="Clear route"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Branch list */}
            <ul className="company-map__branch-list" role="list">
              {filteredBranches.length === 0 && (
                <li className="company-map__no-results">No locations match.</li>
              )}
              {filteredBranches.map((b) => {
                const dist = distanceLabel(b);
                const isRouted = routeData?.branchId === b.id;
                return (
                  <li
                    key={b.id}
                    className={`company-map__branch-item ${
                      highlightedId === b.id ? "company-map__branch-item--active" : ""
                    } ${isRouted ? "company-map__branch-item--routed" : ""}`}
                    onClick={() => setHighlightedId(b.id === highlightedId ? null : b.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setHighlightedId(b.id)}
                    aria-pressed={highlightedId === b.id}
                  >
                    <span
                      className="company-map__branch-dot"
                      style={{ background: BRANCH_COLORS[b.type] ?? "#333" }}
                      aria-hidden="true"
                    />
                    <div className="company-map__branch-info">
                      <span className="company-map__branch-name">{b.name}</span>
                      <span className="company-map__branch-address">{b.address}</span>
                    </div>
                    <div className="company-map__branch-right">
                      {dist && (
                        <span className="company-map__branch-dist">{dist}</span>
                      )}
                      {isRouted ? (
                        <span className="company-map__branch-routed-badge">Routed</span>
                      ) : (
                        <svg className="company-map__branch-chevron" viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Geolocation panel */}
            <div className="company-map__geo-panel">
              {geoStatus === "loading" && (
                <p className="company-map__geo-msg company-map__geo-msg--loading">
                  <span className="company-map__spinner" aria-hidden="true" />
                  Detecting your location…
                </p>
              )}
              {geoStatus === "success" && (
                <p className="company-map__geo-msg company-map__geo-msg--success">
                  ✓ Your location is shown on the map.
                </p>
              )}
              {geoStatus === "error" && (
                <div className="company-map__geo-msg company-map__geo-msg--error">
                  <p>{geoError}</p>
                  <button className="company-map__retry-btn" onClick={requestGeolocation}>
                    Try again
                  </button>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="company-map__legend" aria-label="Map legend">
              {legendTypes.map(({ type, color }) => (
                <div key={type} className="company-map__legend-item">
                  <span className="company-map__legend-dot" style={{ background: color }} aria-hidden="true" />
                  <span>
                    {type === "hq" ? "Headquarters" : type === "store" ? "Store" : "Branch"}
                  </span>
                </div>
              ))}
              <div className="company-map__legend-item">
                <span className="company-map__legend-user" aria-hidden="true" />
                <span>Your location</span>
              </div>
              <div className="company-map__legend-item">
                <span className="company-map__legend-route" aria-hidden="true" />
                <span>Active route</span>
              </div>
            </div>
          </aside>

          {/* Map */}
          <div
            className="company-map__map-wrap"
            style={{ "--map-height": height }}
            role="application"
            aria-label="Interactive map"
          >
            <MapContainer
              center={[branches[0]?.lat ?? 13.05, branches[0]?.lng ?? 80.21]}
              zoom={10}
              scrollWheelZoom={true}
              className="company-map__leaflet"
              keyboard={true}
            >
              <TileLayer
                key={theme}
                url={currentTile.url}
                attribution={currentTile.attribution}
                maxZoom={19}
              />

              {/* Fit bounds to current filtered set */}
              <MapBoundsController points={mapPoints} />

              {/* Route polyline */}
              <RouteLayer routeData={routeData} />

              {/* "Return to my location" floating button */}
              <LocateMeButton userLocation={userLocation} />

              {/* Branch markers */}
              {filteredBranches.map((branch) => (
                <BranchMarker
                  key={branch.id}
                  branch={branch}
                  isHighlighted={highlightedId === branch.id}
                  onRouteRequest={handleRouteRequest}
                  routeInfo={routeData}
                  isRouting={isRouting}
                />
              ))}

              {/* User location marker */}
              {userLocation && (
                <>
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={USER_ICON}
                    title="Your current location"
                    zIndexOffset={1000}
                  >
                    <Popup className="company-map__popup">
                      <div className="company-map__popup-card">
                        <div
                          className="company-map__popup-header"
                          style={{ "--branch-color": "#6DBE45" }}
                        >
                          <span className="company-map__popup-type">You are here</span>
                          <h3 className="company-map__popup-name">Current Location</h3>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  <Circle
                    center={[userLocation.lat, userLocation.lng]}
                    radius={400}
                    pathOptions={{
                      color: "#6DBE45",
                      fillColor: "#6DBE45",
                      fillOpacity: 0.08,
                      weight: 1.5,
                      dashArray: "5 5",
                    }}
                  />
                </>
              )}
            </MapContainer>

            {/* Theme badge */}
            <div className="company-map__theme-badge" aria-hidden="true">
              {currentTile.label} map
            </div>

            {/* Route loading overlay */}
            {isRouting && (
              <div className="company-map__route-loading">
                <span className="company-map__spinner" />
                Calculating route…
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}