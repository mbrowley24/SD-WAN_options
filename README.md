# Meraki MX Sales Configuration Templates

A lightweight web app for generating **Meraki MX sales configuration templates** as Excel spreadsheets. The app collects only the inputs you provide in the form, generates a spreadsheet **on demand**, and immediately returns it to you. **No database is used** and **no customer data is stored**.

---

## ✨ Key Features

* **Template-driven**: Capture core MX features and basic network details (org/site, WAN, VLANs, SSIDs, content filtering, SD‑WAN options).
* **Excel output**: Produces a clean `.xlsx` workbook for sharing with customers or importing into internal tools.
* **Stateless**: No DB, no at-rest storage—inputs are processed in-memory and streamed back as a download.
* **Flexible**: Works with single‑site “quick start” and is extensible for multi‑site topologies.

---

## 🧭 How It Works

1. **User fills the form** in the frontend (Next.js + Tailwind).
2. Frontend **POSTs JSON** to the FastAPI endpoint.
3. FastAPI **generates the Excel file in memory** (e.g., with `openpyxl`/`xlsxwriter`).
4. Server returns the file with `Content-Disposition: attachment; filename="meraki-mx-template.xlsx"`.
5. **No data persisted**—request objects are discarded after the response.

---

## 🧱 Tech Stack

* **Frontend**: Next.js (App or Pages Router), Tailwind CSS
* **Backend**: FastAPI (ASGI), Uvicorn (dev) / Gunicorn + uvicorn worker (prod)
* **Excel**: `openpyxl`

---

## 🚀 Getting Started (Local Dev)

### Prerequisites

* Node.js 18+
* Python 3.10+

### 1) Clone & Install

```bash
# frontend
cd frontend
npm ci

# backend
cd ../backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### 2) Environment Variables

Frontend (`.env.local`):

```env
# If proxying API via Next.js rewrite, you can omit this
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Backend (`.env` if used):

```env
APP_ENV=dev
```

### 3) Run

**Backend** (one terminal):

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend** (second terminal):

```bash
cd frontend
npm run dev
```

> **Tip:** To avoid CORS entirely during dev, add a **rewrite** in `next.config.js` and call `/api/...` from the browser.

```js
// frontend/next.config.js
module.exports = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:8000/:path*" },
    ];
  },
};
```

---

## 🔌 API

### POST `/templates/mx`

**Purpose:** Generate a Meraki MX sales configuration spreadsheet.

**Request (JSON)**

```json
{
  "organization": "Inluminis Demo Org",
  "site": "HQ‑01",
  "wan": {
    "primary": { "provider": "ISP‑A", "ip": "203.0.113.10", "bandwidthMbps": 500 },
    "secondary": { "provider": "ISP‑B", "ip": "198.51.100.22", "bandwidthMbps": 300 }
  },
  "vlans": [
    { "id": 10, "name": "Users", "subnet": "10.10.10.0/24", "gateway": "10.10.10.1" }
  ],
  "ssids": [
    { "name": "Corp‑WiFi", "vlanId": 10, "auth": "WPA2‑PSK" }
  ],
  "contentFiltering": "medium",
  "features": {
    "autoVpn": true,
    "idsIps": "balanced",
    "urlFiltering": true
  }
}
```

**Response**

* `200 OK`
* `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
* `Content-Disposition: attachment; filename="meraki-mx-template.xlsx"`
* Body: binary `.xlsx`

---

## 📊 Spreadsheet Layout (Suggested)

**Workbook**: `meraki-mx-template.xlsx`

1. **Overview**

   * Organization, Site, Contact, Date, Prepared By
   * Summary: WAN (providers/bandwidth), VLAN count, SSID count, Security profile
2. **Network**

   * WAN Primary/Secondary (provider, IP, bandwidth)
   * LAN gateway, DNS, NTP (optional)
3. **VLANs**

   * VLAN ID, Name, Subnet/CIDR, Gateway, DHCP (yes/no), Notes
4. **Wireless (SSIDs)**

   * Name, VLAN, Security (WPA2/WPA3/Enterprise), RADIUS (if applicable)
5. **Security & SD‑WAN**

   * Content filtering level, IDS/IPS mode, URL categories, Auto‑VPN, Failover policy
6. **Assumptions**

   * Any constraints, out‑of‑scope items, or follow‑ups

> You can adjust sheet names/columns freely—the API maps inputs to this structure on generation.

---

## 🔐 Privacy & Security

* **No database**: inputs are processed in‑memory; nothing is stored at rest.
* **No analytics on payloads**: avoid logging request bodies.
* **Headers**: set `Content-Disposition` and a short cache lifetime.
* **Optional**: add rate limits and size guards to prevent abuse.

---

## 🏗️ Deployment (DigitalOcean App Platform)

**Frontend (Next.js server)**

* Build: `npm ci && npm run build`
* Run: `npm run start` (Next listens on `$PORT`)

**OR Static Export**

* `next.config.js`: `{ output: 'export', images: { unoptimized: true } }`
* Build: `npm ci && npm run build && npx next export`
* Publish directory: `out`
* Add rewrite: `/* -> /index.html (200)` for SPA deep links

**Backend (FastAPI)**

* Build: `pip install -r requirements.txt`
* Run: `gunicorn -k uvicorn_worker.UvicornWorker -w 2 -b 0.0.0.0:$PORT main:app`

**Routing (single domain, no CORS)**

* `/*` → Next.js service
* `/api/*` → FastAPI service (and call `/api/...` from the browser)

---

## 🧪 Troubleshooting

* **404 on deep links** (static hosting): add SPA rewrite `/* -> /index.html`.
* **CORS errors**: prefer same‑origin routing; otherwise configure FastAPI CORS with explicit origins if sending credentials.
* **“Corrupted” Excel**: ensure correct MIME type and do not write text to the response before the binary stream.
* **Preflight blocked**: POSTing JSON triggers `OPTIONS`; confirm the path doesn’t redirect and CORS middleware runs first.

---

## 🗺️ Roadmap (optional)

* Multi‑site hub‑and‑spoke templates
* BOM/part‑number helper
* Read‑only PDF export
* Pre‑validated input schemas (Zod/Pydantic)

---

## 📄 License

MIT.
