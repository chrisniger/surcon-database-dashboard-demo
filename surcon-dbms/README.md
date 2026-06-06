# SURCON DBMS Frontend Demo

A frontend-only demo of an on-premise database management and examination reporting system designed for the **Surveyors Council of Nigeria (SURCON)**. The system demonstrates dashboards, role-based access concepts, surveyor records, certification management, examination records, CSV import, document uploads, analytics, and report generation.

---

## Problem Solved

The previous workflow involved paper-based records, Excel files, manual examination grading, difficult report generation, and slow access to certification data. This platform replaces those with a centralized, role-based digital interface.

---

## Key Features

- Role-based access control (7 roles, 8 permission types)
- Surveyor registration and record management
- Certification tracking and renewal workflows
- Examination records with pass/fail analytics
- Result generation interface with batch processing
- CSV import with drag-and-drop, validation preview, and row-level error display
- Document upload and categorization
- Survey data storage with location panel
- Analytics dashboards with line, bar, and donut charts
- Report generation with export placeholders (PDF, Excel, CSV)
- Responsive design for desktop, tablet, and mobile
- On-premise deployment badge and server status display

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Recharts | Charts and analytics |
| Lucide React | Icons |
| React Hook Form | Form handling |

---

## How to Run Locally

```bash
git clone <repo-url>
cd surcon-dbms
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to the login page.

---

## Pages

| Route | Description |
|---|---|
| `/login` | Authentication page with demo credentials |
| `/dashboard` | KPI overview, charts, recent records |
| `/surveyors` | Surveyor register with search, filter, CRUD |
| `/certifications` | Certification management and status tracking |
| `/examinations` | Examination records with grades and results |
| `/results` | Result generation interface with batch processing |
| `/csv-import` | CSV upload with drag-and-drop and row validation |
| `/documents` | Document upload, categorization, and management |
| `/survey-data` | Survey record storage with location panel |
| `/reports` | Report generation with export controls |
| `/analytics` | Full analytics with multiple chart types |
| `/users-roles` | User management and permission matrix |
| `/settings` | Org profile, security, notifications, backup |

---

## Folder Structure

```
surcon-dbms/
├── app/                     # Next.js App Router pages
│   ├── login/
│   ├── dashboard/
│   ├── surveyors/
│   ├── certifications/
│   ├── examinations/
│   ├── results/
│   ├── csv-import/
│   ├── documents/
│   ├── survey-data/
│   ├── reports/
│   ├── analytics/
│   ├── users-roles/
│   └── settings/
├── components/
│   ├── layout/              # Sidebar, Header, DashboardShell
│   ├── ui/                  # Badge, Button, Modal, Toast, EmptyState
│   ├── charts/              # LineChartCard, BarChartCard, DonutChartCard
│   ├── cards/               # StatCard, FeatureCard
│   └── tables/              # DataTable
├── data/                    # All mock data (TypeScript)
└── lib/                     # Utility functions
```

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@surcon.demo | password123 |
| Registry Officer | registry@surcon.demo | password123 |
| Exam Officer | exam@surcon.demo | password123 |

Login is frontend-only — clicking a demo credential fills the form and redirects to the dashboard on submit.

---

## Disclaimer

> This is a sanitized frontend-only demo created for portfolio purposes. It does not include real client data, backend logic, authentication secrets, production database access, or private records.
