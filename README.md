# 🌴 monis.rent — Workspace Designer

An interactive 3D workspace configurator for [monis.rent](https://monis.rent), built for digital nomads and startups in Bali. Design your dream remote workspace, see it come to life in 3D, and rent everything with one click.

**Live Demo:** [your-url.vercel.app](https://your-url.vercel.app)

---

## 🧠 Approach & Product Thinking

### The User

A freelance developer just landed in Bali and needs a workspace by next week. They don't want to scroll through a product catalog — they want to **build their perfect office visually**, get excited about it, and hit a button to make it happen.

### The Insight

The best configurators don't just show products — they guide decisions. I studied [Cisco's Workspace Designer](https://designer.cisco.com) (a Webby-nominated 3D room configurator) and adapted its **stepped wizard** approach: one focused decision at a time, with a live 3D preview that updates instantly.

### Key UX Decisions

- **Wizard-driven flow** (Desk → Chair → Monitors → Accessories → Summary) instead of showing everything at once. Each step is focused and non-overwhelming.
- **3D scene as the hero** — always visible, always updating. The emotional hook is watching your workspace come alive as you make choices.
- **Smart auto-placement** — items position themselves intelligently on the desk (monitors center/spread, keyboard in front, plant on the side). No drag-and-drop complexity, no items floating in mid-air. The result always looks professional.
- **Bali personality** — warm tones, tropical window view with palm silhouettes, sandy/cream palette. The tool should feel like you're already there.
- **Real products, real prices** — all items and $/week pricing pulled directly from monis.rent's actual catalog.
- **Mobile-first** — the 3D preview stacks on top, wizard scrolls below. Touch-friendly, no desktop-only features.

### What I'd Improve With More Time

- **GLTF Draco compression** for faster model loading
- **Camera transitions** that subtly shift focus per wizard step (zoom to desk when picking desks, pan to show chair when picking chairs)
- **Animated model entrances** (scale-in with spring physics when items appear)
- **Shareable URLs** with config state encoded in query params
- **Skeleton loading** with progressive model loading + LOD
- **AR preview** via WebXR for "see it in your actual room"
- **WhatsApp integration** to send the setup summary directly to monis.rent

---

## 🛠 Tech Stack

| Tool | Why |
|---|---|
| **Next.js 14** (App Router) | Required. Server components for fast initial load, client components for 3D interactivity |
| **TypeScript** | Type safety for product data, store, and 3D component props |
| **Tailwind CSS** | Required. Utility-first styling with custom Bali-themed color tokens |
| **React Three Fiber** + **drei** | Declarative Three.js in React. drei provides `useGLTF`, `OrbitControls`, `Environment`, `ContactShadows` |
| **Zustand** | Lightweight state management — one store drives both the wizard UI and 3D scene |
| **Vercel** | Required. Zero-config deployment with edge caching for 3D assets |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/monis-workspace-designer.git
cd monis-workspace-designer

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Adding 3D Models

Download `.glb` models from Sketchfab (all CC Attribution licensed) and place them in `/public/models/`:

```
public/models/
├── electric-desk.glb
├── wooden-desk.glb
├── ergonomic-chair.glb
├── premium-chair.glb
├── monitor.glb
├── keyboard.glb
├── mouse.glb
├── lamp.glb
├── plant.glb
├── webcam.glb
└── coffee.glb
```

**Model Sources (CC BY):**

| Model | Source | Author |
|---|---|---|
| Standing Desk | [Sketchfab](https://sketchfab.com/3d-models/standing-desk-65a7f4b06a5f4954a0d43eb8812dd165) | Ryan_Nein |
| Wooden Desk | [Sketchfab](https://sketchfab.com/3d-models/desk-chair-minimal-28e1785be2b2492dabadea84d5594bfc) | sara_a.r |
| Ergonomic Chair | [Sketchfab](https://sketchfab.com/3d-models/ergonomic-mesh-office-chair-cd5ef0305d8545dd8cd934ebb99cf7d5) | guillaumecrz |
| Office Chair | [Sketchfab](https://sketchfab.com/3d-models/office-chair-7c8cf9135cff4e71a62dc7dfa2e60cbd) | Sanjaykuhad |
| Monitor 16:9 | [Sketchfab](https://sketchfab.com/3d-models/computer-monitor-169-low-poly-game-ready-336de680dd9a4d84943d05d9c7dde1b0) | LiveToWin34 |
| Logitech MX Keys | [Sketchfab](https://sketchfab.com/3d-models/logitech-mx-keys-67901d82781f48349f1f61ce78a6b6e0) | ArkinRS |
| MX Master 3S | [Sketchfab](https://sketchfab.com/3d-models/logitech-mx-master-3s-revopoint-mini-3d-scan-9a82df69ffee4c6faa28f75e65ba192c) | Sircher |
| Modern Desk Lamp | [Sketchfab](https://sketchfab.com/3d-models/modern-desk-lamp-7ec37399e6044ffeabcb168ffd6b1322) | Scraplet |
| Desk Plant | [Sketchfab](https://sketchfab.com/3d-models/indoor-plants-efe25daceaf940f5aa8519b9d77683d2) | Visthétique |
| Logitech Webcam | [Sketchfab](https://sketchfab.com/3d-models/logitech-webcam-0523fbf537cd4ea4a41e96b8293312ac) | Qoodrat |
| Coffee Machine | [Sketchfab](https://sketchfab.com/3d-models/coffee-machine-5aee9b1f39f3400f890040c710467fdf) | vervoortward |

> The app includes geometric **fallback models** that render when `.glb` files are missing, so it works out of the box.

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page — 3D scene + wizard
│   └── globals.css         # Tailwind + custom Bali theme
├── components/
│   ├── Scene3D.tsx         # R3F Canvas with lighting & controls
│   ├── Room.tsx            # 3D room environment (floor, walls, window)
│   ├── WorkspaceItems.tsx  # Reads store → renders all selected items
│   ├── WorkspaceModel.tsx  # Loads .glb via useGLTF
│   ├── FallbackModel.tsx   # Placeholder geometry when .glb missing
│   ├── Navbar.tsx          # Top navigation
│   ├── WizardPanel.tsx     # Step orchestrator
│   ├── PriceBar.tsx        # Sticky bottom price + CTA
│   ├── LoadingScene.tsx    # Loading spinner
│   └── steps/
│       ├── DeskStep.tsx    # Desk selection cards
│       ├── ChairStep.tsx   # Chair selection grid
│       ├── MonitorStep.tsx # Type selector + count stepper
│       ├── AccessoriesStep.tsx  # Toggle chips
│       └── SummaryStep.tsx # Checkout summary
├── store/
│   └── useWorkspaceStore.ts  # Zustand — single source of truth
├── data/
│   └── products.ts         # Products, prices, slot positions
└── public/
    └── models/             # Drop .glb files here
```

---

## 📜 License

This project is built for the Desent Solutions coding challenge. 3D models are licensed under Creative Commons Attribution — see credits table above.


## 📜 Preview
<img width="959" height="435" alt="image" src="https://github.com/user-attachments/assets/b99a1fe8-0924-4a88-9e8e-5c9a1ff06ce7" />
<img width="959" height="434" alt="image" src="https://github.com/user-attachments/assets/c5ba75c5-ae52-459e-aab3-be308e34f98e" />
<img width="959" height="437" alt="image" src="https://github.com/user-attachments/assets/62ee219f-03e6-4c53-90e7-99321c9cd84f" />
<img width="201" height="386" alt="image" src="https://github.com/user-attachments/assets/46b49249-a890-4634-9e87-f974c6361838" />
<img width="173" height="398" alt="image" src="https://github.com/user-attachments/assets/f36aa3a4-69e6-4bb4-aba7-e03d5147748e" />
<img width="180" height="401" alt="image" src="https://github.com/user-attachments/assets/b94738e5-53b4-4812-9e05-ee4e18d42ed3" />
