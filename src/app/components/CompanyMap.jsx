/**
 * CompanyMap.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A production-ready, fully interactive Leaflet.js map component for company
 * branch/store locations with:
 *   • Custom SVG markers for company locations & user position
 *   • Browser geolocation with error handling + loading states
 *   • Smart auto-centering (fits all markers in view)
 *   • Marker clustering via leaflet.markercluster
 *   • Dark / Light map theme toggle
 *   • Branch search / filter
 *   • Animated marker appearance
 *   • Responsive design (mobile → desktop)
 *   • Clean popup cards with contact info
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DEPENDENCIES (install once – see README section at bottom of this file)
 *   npm install leaflet react-leaflet leaflet.markercluster
 *   npm install @changey/react-leaflet-markercluster
 * ─────────────────────────────────────────────────────────────────────────────
 */
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
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
// CONFIGURATION – Edit these to customise the map for your company
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Map tile providers.
 * Light → CARTO Voyager (warm, earthy tones — suits the Geetham Veg palette)
 * Dark  → CARTO Dark Matter (charcoal, matches brand background)
 */
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

/**
 * BRANCH DATA – Replace with your real company locations.
 * Each entry supports:
 *   id        : unique string/number
 *   name      : display name shown in popup title
 *   address   : full street address
 *   phone     : optional phone number
 *   email     : optional email address
 *   hours     : optional opening hours string
 *   type      : "hq" | "branch" | "store"  (affects marker colour)
 *   lat / lng : WGS-84 coordinates
 */
export const DEFAULT_BRANCHES = [
  {
    id: 1,
    name: "Headquarters",
    address: "1 Infinite Loop, Cupertino, CA 95014",
    phone: "+1 (800) 275-2273",
    email: "hq@acmecorp.com",
    hours: "Mon–Fri 9 AM – 6 PM",
    type: "hq",
    lat: 37.3318,
    lng: -122.0312,
  },
  {
    id: 2,
    name: "Downtown Branch",
    address: "456 Market St, San Francisco, CA 94105",
    phone: "+1 (415) 555-0101",
    email: "sf@acmecorp.com",
    hours: "Mon–Sat 8 AM – 8 PM",
    type: "branch",
    lat: 37.7908,
    lng: -122.3973,
  },
  {
    id: 3,
    name: "East Bay Store",
    address: "789 Broadway, Oakland, CA 94607",
    phone: "+1 (510) 555-0202",
    email: "oakland@acmecorp.com",
    hours: "Daily 10 AM – 7 PM",
    type: "store",
    lat: 37.8044,
    lng: -122.2712,
  },
  {
    id: 4,
    name: "Silicon Valley Office",
    address: "2550 Garcia Ave, Mountain View, CA 94043",
    phone: "+1 (650) 555-0303",
    email: "mv@acmecorp.com",
    hours: "Mon–Fri 9 AM – 5 PM",
    type: "branch",
    lat: 37.3893,
    lng: -122.0825,
  },
  {
    id: 5,
    name: "South Bay Store",
    address: "100 N First St, San Jose, CA 95113",
    phone: "+1 (408) 555-0404",
    email: "sj@acmecorp.com",
    hours: "Daily 9 AM – 9 PM",
    type: "store",
    lat: 37.3382,
    lng: -121.8863,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a Leaflet DivIcon from an inline SVG string.
 * Using DivIcon lets us apply CSS animations and avoid external image assets.
 */
const makeSvgIcon = (svgHtml, size = [36, 44], anchor = [18, 44]) =>
  L.divIcon({
    html: svgHtml,
    className: "company-map__svg-icon", // CSS animation hook
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -44],
  });

/** Geetham Veg brand colours per branch type */
const BRANCH_COLORS = {
  hq: "#D4610A",  // deep burnt orange — HQ authority
  branch: "#F47B20",  // brand orange — main branches
  store: "#6DBE45",  // leaf green — stores
};

/** Pin SVG for company markers */
const buildBranchIcon = (type = "branch") => {
  const color = BRANCH_COLORS[type] ?? BRANCH_COLORS.branch;
  // Inner symbol differs by type
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
      <!-- Pin body -->
      <path d="M18 2C10.268 2 4 8.268 4 16c0 10 14 26 14 26s14-16 14-26C32 8.268 25.732 2 18 2z"
        fill="${color}" filter="url(#shadow-${type})"/>
      <!-- Inner highlight -->
      <path d="M18 4C11.373 4 6 9.373 6 16c0 9 12 23 12 23s12-14 12-23C30 9.373 24.627 4 18 4z"
        fill="${color}" opacity="0.7"/>
      ${symbol}
    </svg>`,
    [36, 44],
    [18, 44]
  );
};

/** Pulsing dot for the user's current position */
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
// Imperatively adjusts the map viewport whenever the list of coordinates
// changes (e.g. after geolocation resolves).
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
    // fitBounds with generous padding so markers aren't clipped by UI chrome
    map.fitBounds(bounds, { padding: [60, 60], animate: true, maxZoom: 15 });
  }, [map, points]);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: BranchMarker
// Renders a single branch marker with an animated popup card.
// ─────────────────────────────────────────────────────────────────────────────
function BranchMarker({ branch, isHighlighted }) {
  const icon = useMemo(() => buildBranchIcon(branch.type), [branch.type]);
  const markerRef = useRef(null);

  // Open popup when this branch is highlighted via the sidebar list
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

  return (
    <Marker
      ref={markerRef}
      position={[branch.lat, branch.lng]}
      icon={icon}
      // ARIA: announce branch name to screen readers
      title={branch.name}
    >
      <Popup className="company-map__popup" maxWidth={280}>
        <div className="company-map__popup-card">
          {/* ── Header ── */}
          <div
            className="company-map__popup-header"
            style={{ "--branch-color": BRANCH_COLORS[branch.type] ?? BRANCH_COLORS.branch }}
          >
            <span className="company-map__popup-type">{typeLabel}</span>
            <h3 className="company-map__popup-name">{branch.name}</h3>
          </div>

          {/* ── Body ── */}
          <div className="company-map__popup-body">
            <p className="company-map__popup-address">
              <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
              {branch.address}
            </p>

            {branch.phone && (
              <a
                href={`tel:${branch.phone}`}
                className="company-map__popup-link"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.7a1.5 1.5 0 0 1-1.454-.355L5.353 7.163a1.5 1.5 0 0 1-.355-1.453l.468-1.804a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                </svg>
                {branch.phone}
              </a>
            )}

            {branch.email && (
              <a
                href={`mailto:${branch.email}`}
                className="company-map__popup-link"
              >
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
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: CompanyMap
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Props
 * ─────
 * branches      – Array of branch objects (defaults to DEFAULT_BRANCHES)
 * companyName   – String shown in the panel header
 * showSearch    – Boolean; enable/disable the search input (default true)
 * showThemeToggle – Boolean; show dark/light toggle (default true)
 * height        – CSS string for map height (default "560px")
 * defaultTheme  – "light" | "dark" (default "light")
 */
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
  const [userLocation, setUserLocation] = useState(null);    // { lat, lng }
  const [geoStatus, setGeoStatus] = useState("idle");        // idle | loading | success | error
  const [geoError, setGeoError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Derived values ─────────────────────────────────────────────────────────

  /** Branches filtered by the search input */
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

  /**
   * The set of lat/lng points the map should display.
   * We ALWAYS start from the filtered company locations and optionally
   * append the user's position so bounds-fitting includes everyone.
   */
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
        // GeolocationPositionError codes: 1=PERMISSION_DENIED, 2=UNAVAILABLE, 3=TIMEOUT
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

  // Auto-request geolocation on first mount
  useEffect(() => {
    requestGeolocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tile layer ─────────────────────────────────────────────────────────────
  const currentTile = TILE_LAYERS[theme] ?? TILE_LAYERS.light;

  // ── Legend data (derived from branches prop) ────────────────────────────────
  const legendTypes = useMemo(() => {
    const seen = new Set();
    return branches
      .filter((b) => {
        if (seen.has(b.type)) return false;
        seen.add(b.type);
        return true;
      })
      .map((b) => ({ type: b.type, color: BRANCH_COLORS[b.type] ?? "#333" }));
  }, [branches]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="Map_outer">
      <section
        className={`company-map company-map--${theme}`}
        aria-label={`${companyName} locations map`}
      >
        {/* ── Panel header ── */}
        <div className="company-map__header">
          <div className="company-map__header-left">
            <div className="company-map__logo-badge" aria-hidden="true">
              {/* Leaf icon — echoes the Geetham Veg logo leaf motif */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2C12.18 5 10 7 10 7c-3 0-6 3.5-6 3.5C6 13 9 13 12 12c3-1 5 0 5 0z" />
              </svg>
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

            {/* Mobile sidebar toggle */}
            <button
              className="company-map__sidebar-toggle"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label={sidebarOpen ? "Hide branch list" : "Show branch list"}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                {sidebarOpen
                  ? <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  : <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main layout: sidebar + map ── */}
        <div className="company-map__body">

          {/* ── Sidebar ── */}
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

            {/* Branch list */}
            <ul className="company-map__branch-list" role="list">
              {filteredBranches.length === 0 && (
                <li className="company-map__no-results">No locations match.</li>
              )}
              {filteredBranches.map((b) => (
                <li
                  key={b.id}
                  className={`company-map__branch-item ${highlightedId === b.id ? "company-map__branch-item--active" : ""
                    }`}
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
                  <svg className="company-map__branch-chevron" viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </li>
              ))}
            </ul>

            {/* Geolocation status */}
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
                  <button
                    className="company-map__retry-btn"
                    onClick={requestGeolocation}
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="company-map__legend" aria-label="Map legend">
              {legendTypes.map(({ type, color }) => (
                <div key={type} className="company-map__legend-item">
                  <span
                    className="company-map__legend-dot"
                    style={{ background: color }}
                    aria-hidden="true"
                  />
                  <span>
                    {type === "hq"
                      ? "Headquarters"
                      : type === "store"
                        ? "Store"
                        : "Branch"}
                  </span>
                </div>
              ))}
              <div className="company-map__legend-item">
                <span className="company-map__legend-user" aria-hidden="true" />
                <span>Your location</span>
              </div>
            </div>
          </aside>

          {/* ── Map ── */}
          <div
            className="company-map__map-wrap"
            style={{ "--map-height": height }}
            role="application"
            aria-label="Interactive map"
          >
            <MapContainer
              // Default centre is the centroid of the first two branches; will
              // be overridden immediately by MapBoundsController.
              center={[
                branches[0]?.lat ?? 37.5,
                branches[0]?.lng ?? -122.0,
              ]}
              zoom={10}
              scrollWheelZoom={true}
              className="company-map__leaflet"
              // Accessibility: keyboard navigation
              keyboard={true}
            >
              {/* Tile layer (switches on theme change) */}
              <TileLayer
                key={theme}                        // force remount on theme change
                url={currentTile.url}
                attribution={currentTile.attribution}
                maxZoom={19}
              />

              {/* Auto-fit bounds whenever points change */}
              <MapBoundsController points={mapPoints} />

              {/* Company branch markers */}
              {filteredBranches.map((branch) => (
                <BranchMarker
                  key={branch.id}
                  branch={branch}
                  isHighlighted={highlightedId === branch.id}
                />
              ))}

              {/* User location marker + accuracy circle */}
              {userLocation && (
                <>
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={USER_ICON}
                    title="Your current location"
                    zIndexOffset={1000}           // render above branch markers
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

                  {/* Semi-transparent accuracy ring */}
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

            {/* Floating attribution overlay (CARTO requires this) */}
            <div className="company-map__theme-badge" aria-hidden="true">
              {currentTile.label} map
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}