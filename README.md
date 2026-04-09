# 🌴 monis.rent — Workspace Designer

An interactive 3D workspace configurator for [monis.rent](https://monis.rent), built for digital nomads and startups in Bali. Design your dream remote workspace, see it come to life in 3D, and rent everything with one click.

**Live Demo:** [office-designer-rdp64yd76-andras-projects-6a803db5.vercel.app](https://office-designer-rdp64yd76-andras-projects-6a803db5.vercel.app/)

---

## 🧠 Approach & Product Thinking

### The User

A freelance developer just landed in Bali and needs a workspace by next week. They don't want to scroll through a product catalog — they want to **build their perfect office visually**, get excited about it, and hit a button to make it happen.

### The Insight

The best configurators don't just show products — they guide decisions. I studied [Cisco's Workspace Designer](https://designer.cisco.com) (a Webby-nominated 3D room configurator) and adapted its **stepped wizard** approach: one focused decision at a time, with a live 3D preview that updates instantly.

### Key UX Decisions

- **Wizard-driven flow** (Desk → Chair → Monitors → Keyboard → Mouse → Accessories → Tech → Summary) instead of showing everything at once. Each step is focused and non-overwhelming.
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
| **Next.js 14** (App Router) | Server components for fast initial load, client components for 3D interactivity |
| **TypeScript** | Type safety for product data, store, and 3D component props |
| **Tailwind CSS** | Utility-first styling with custom Bali-themed color tokens |
| **React Three Fiber** + **drei** | Declarative Three.js in React. drei provides `useGLTF`, `OrbitControls`, `Environment`, `ContactShadows` |
| **Zustand** | Lightweight state management — one store drives both the wizard UI and 3D scene |
| **Vercel** | Zero-config deployment with edge caching for 3D assets |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/funtasticccc/office-designer.git
cd office-designer/three

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page — 3D scene + wizard
│   ├── globals.css         # Tailwind + custom Bali theme
│   └── icon.svg            # App favicon
├── components/
│   ├── Scene3D.tsx         # R3F Canvas with lighting & controls
│   ├── Room.tsx            # 3D room environment (floor, walls, window)
│   ├── WorkspaceItems.tsx  # Reads store → renders all selected items
│   ├── WorkspaceModel.tsx  # Loads .glb via useGLTF
│   ├── FallbackModel.tsx   # Placeholder geometry when .glb missing
│   ├── Navbar.tsx          # Top navigation
│   ├── WizardPanel.tsx     # Step orchestrator
│   ├── PriceBar.tsx        # Sticky bottom price + CTA
│   ├── RoomSettingsPanel.tsx  # Room customization settings
│   ├── LoadingScene.tsx    # Loading spinner
│   └── steps/
│       ├── DeskStep.tsx         # Desk selection cards
│       ├── ChairStep.tsx        # Chair selection grid
│       ├── MonitorStep.tsx      # Monitor selection
│       ├── KeyboardStep.tsx     # Keyboard selection
│       ├── MouseStep.tsx        # Mouse selection
│       ├── AccessoriesStep.tsx  # Toggle chips
│       ├── TechStep.tsx         # Tech/device selection
│       └── SummaryStep.tsx      # Checkout summary
├── store/
│   └── useWorkspaceStore.ts  # Zustand — single source of truth
├── data/
│   └── products.ts         # Products, prices, slot positions
├── utils/
│   ├── format.ts           # Formatting helpers
│   └── pdf.ts              # PDF export utility
└── public/
    ├── images/             # Product preview images
    └── gbl/                # 3D models (.glb files)
        ├── desks/
        │   ├── desk1.glb
        │   ├── desk2.glb
        │   └── desk3.glb
        ├── chairs/
        │   ├── chair-premium.glb
        │   └── chair-ultimate.glb
        ├── monitors/
        │   ├── monitor1.glb
        │   ├── monitor2.glb
        │   ├── monitor3.glb
        │   └── monitor4.glb
        ├── keyboards/
        │   ├── keyboard1.glb
        │   ├── keyboard2.glb
        │   ├── keyboard3.glb
        │   ├── keyboard4.glb
        │   └── keyboard5.glb
        ├── mouses/
        │   ├── mouse1.glb
        │   ├── mouse2.glb
        │   └── mouse3.glb
        ├── accessories/
        │   ├── plaggy_cc0-lamp-547.glb
        │   ├── quaternius_cc0-desk-910.glb
        │   ├── quaternius_cc0-desk-light-1137.glb
        │   ├── quaternius_cc0-fridge-971.glb
        │   ├── quaternius_cc0-houseplant-1086.glb
        │   ├── quaternius_cc0-houseplant-1088.glb
        │   ├── quaternius_cc0-houseplant-1090.glb
        │   ├── tablelamp1.glb
        │   ├── tablemic1.glb
        │   ├── legobatman.glb
        │   ├── lesiakower-vending-1586.glb
        │   ├── mastertux-radar-2189.glb
        │   ├── niknet_art-gamer-2746.glb
        │   ├── 32809140-light-294.glb
        │   └── [others].glb
        └── tech/
            ├── macbook_pro_16_2021.glb
            ├── asus_rog_g15.glb
            ├── ipad_air.glb
            ├── pc1.glb
            └── pc2.glb
```

---

## 📜 License

This project is built for the Desent Solutions coding challenge. 3D models are licensed under their respective Creative Commons licenses.

---

## 📸 Preview
<img width="959" height="435" alt="image" src="https://github.com/user-attachments/assets/b99a1fe8-0924-4a88-9e8e-5c9a1ff06ce7" />
<img width="959" height="434" alt="image" src="https://github.com/user-attachments/assets/c5ba75c5-ae52-459e-aab3-be308e34f98e" />
<img width="959" height="437" alt="image" src="https://github.com/user-attachments/assets/62ee219f-03e6-4c53-90e7-99321c9cd84f" />
<img width="201" height="386" alt="image" src="https://github.com/user-attachments/assets/46b49249-a890-4634-9e87-f974c6361838" />
<img width="173" height="398" alt="image" src="https://github.com/user-attachments/assets/f36aa3a4-69e6-4bb4-aba7-e03d5147748e" />
<img width="180" height="401" alt="image" src="https://github.com/user-attachments/assets/b94738e5-53b4-4812-9e05-ee4e18d42ed3" />
