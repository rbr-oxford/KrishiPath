Visit the website:
https://aayushifty-1.vercel.app/

#KrishiTrust 🌱

**Turning gentle transport into financial trust — for Nepal's farmers.**

---

## The Problem

Nepal loses **20–50% of its fruit and vegetable produce** between farm and market. A significant share of that loss doesn't come from storage — it comes from **poor handling and transport**: harsh braking, jolts, overloaded crates.

Farmers and transporters absorb this loss directly. And because they rarely have formal financial records, they're also locked out of loans or better rates that could help them fix the equipment or practices causing the damage in the first place.

## The Solution

KrishiTrust puts a sensor kit on the delivery vehicle to log **how gently produce is actually transported**. Over time, that data becomes a **Handling Reliability Score** — a single number that does two jobs:

- **Diagnostic tool** — shows the farmer or cooperative exactly where and why damage is happening on their route
- **Financial record** — gives lenders (microfinance institutions, cooperatives) real trust evidence for a loan, replacing paperwork the farmer often doesn't have

No new hardware invention, no cold-chain claims — just proven sensing, reframed as a financial signal.

---

## How It Works

```
[Vehicle in transit]
      │
      ▼
MPU6050 (vibration/braking) ──┐
GPS (route consistency)       ├──▶ Trip Data ──▶ Backend Scoring Engine ──▶ Handling Reliability Score
Ultrasonic (overload check) ──┘                                              │
                                                                              ▼
                                                                     Dashboard: score trend +
                                                                     loan/financing-tier suggestion +
                                                                     "why your score changed"
```

## Hardware

Reused from our earlier RoadDNA / KrishiPath AI builds — nothing new to build under time pressure:

| Sensor | Role |
|---|---|
| **MPU6050** | Primary signal — detects harsh braking and vibration, feeds directly into the handling score |
| **GPS** | Tracks route and delivery consistency over time |
| **Ultrasonic** | Secondary signal — flags overloaded crate conditions |

## Software (main build effort — ~8 hrs)

- **Backend** — ingests raw trip data, computes the Handling Reliability Score
- **Dashboard** — shows score trend over time, suggests a loan/financing tier, and includes a "why your score changed" breakdown panel

---

## Theme Fit

| Theme | Role |
|---|---|
| **Green Business & Microfinance** | Primary — less spoilage (green impact) + data-backed loan access (microfinance impact) |
| **Fintech** | Supports — the scoring/credit-tier engine is the technical core of the project |
| **Education Advancement** | Supports — literacy panel teaches handling habits and how the score affects loan terms |

---

## Known Limitations (owned upfront)

We're being upfront about these rather than hiding them:

- **No real multi-week history by demo time.** We use a clearly-labeled synthetic dataset to demonstrate score evolution over time.
- **This is a handling/shock monitor, not cold-chain tech.** We only claim what our sensors can actually prove — no temperature or spoilage-chemistry claims.
- **This is an adapted version of our RoadDNA engine**, repurposed under hackathon time pressure. We're framing this as smart reuse of proven tech, not pretending it's built from scratch.

---

## Team

*Drishya Adhikari,
Aayush Bhatta,
Prasanna Bayal*

## Setup / Run

*setup instructions once the backend/dashboard structure is in place*
