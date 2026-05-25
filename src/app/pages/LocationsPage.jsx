/**
 * src/pages/LocationsPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Example page that shows how to embed CompanyMap in a real website layout.
 * Demonstrates:
 *   • Passing custom branch data
 *   • Overriding defaults (dark theme, height)
 *   • Using the DEFAULT_BRANCHES export for quick start
 * ─────────────────────────────────────────────────────────────────────────────
 */

import CompanyMap, { DEFAULT_BRANCHES } from "../components/CompanyMap";

/* ─── Optional: define your own branches ─────────────────────────────────── */
const MY_BRANCHES = [
  {
    id: 1,
    name: "Head Office",
    address: "27 Anna Salai, Chennai, TN 600002",
    phone: "+91 44 2852 0000",
    email: "hq@mycompany.in",
    hours: "Mon–Fri 9 AM – 6 PM",
    type: "hq",
    lat: 13.0569,
    lng: 80.2425,
  },
  {
    id: 2,
    name: "Velachery Branch",
    address: "Phoenix Marketcity, Velachery, Chennai 600042",
    phone: "+91 44 2200 1234",
    email: "velachery@mycompany.in",
    hours: "Daily 10 AM – 9 PM",
    type: "store",
    lat: 12.9816,
    lng: 80.2209,
  },
  {
    id: 3,
    name: "Nungambakkam Office",
    address: "34 Khader Nawaz Khan Rd, Nungambakkam, Chennai 600006",
    phone: "+91 44 2833 5678",
    email: "nungam@mycompany.in",
    hours: "Mon–Sat 9 AM – 7 PM",
    type: "branch",
    lat: 13.0569,
    lng: 80.2426,
  },
];

export default function LocationsPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>

      {/* Page header */}
      <header style={{ padding: "48px 24px 32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Find Us Near You
        </h1>
        <p style={{ color: "#64748b", marginTop: "10px", fontSize: "1rem" }}>
          Visit any of our branches — we're always close.
        </p>
      </header>

      {/* ── Example 1: Default light theme, custom branch data ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 40px" }}>
        <CompanyMap
          branches={MY_BRANCHES}      /* ← swap to DEFAULT_BRANCHES for demo data */
          companyName="Geetham Veg"
          height="540px"
          showSearch={true}
          showThemeToggle={true}
          defaultTheme="light"
        />
      </section>

      {/* ── Example 2: Dark theme, US demo data ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 60px" }}>
        <h2 style={{ color: "#0f172a", marginBottom: "16px", fontWeight: 700 }}>
          US Locations (dark theme)
        </h2>
        <CompanyMap
          branches={DEFAULT_BRANCHES}
          companyName="Geetham Veg — US Demo"
          height="480px"
          defaultTheme="dark"
        />
      </section>
    </main>
  );
}