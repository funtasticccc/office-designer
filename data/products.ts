// ─── TYPES ──────────────────────────────────────────────────────────────

export type ProductCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "lamp"
  | "plant"
  | "webcam"
  | "coffee"
  | "tech"
  | "toy";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // $/week
  category: ProductCategory;
  modelPath: string;
  scale: number;
  rotation: [number, number, number];
  thumbnail: string;
  positionOffset?: [number, number, number]
}

export interface SlotPosition {
  position: [number, number, number];
  rotation?: [number, number, number];
}

// ─── DESK CONFIGS ───────────────────────────────────────────────────────
// Each desk defines its own surface height so accessories auto-adjust

export interface DeskConfig {
  id: string;
  surfaceY: number; // Y position of the desk surface
  modelPosition: [number, number, number];
}

export const DESK_CONFIGS: Record<string, DeskConfig> = {
  genius_desk_1: {
    id: "genius_desk_1",
    surfaceY: 0.89,
    modelPosition: [0, 0, 0],
  },
  genius_desk_2: {
    id: "genius_desk_2",
    surfaceY: 0.97,
    modelPosition: [0, 0.525, 0],
  },
  genius_desk_3: {
    id: "genius_desk_3",
    surfaceY: 0.99,
    modelPosition: [0, 0, 0],
  },
};

// ─── SLOT MAP ───────────────────────────────────────────────────────────
// Predefined positions for each item type, relative to desk surface Y
// Y values here are OFFSETS from surfaceY

export const SLOT_MAP: Record<string, SlotPosition[]> = {
  monitor: [
    { position: [0, 0, -0.25], rotation: [0, 0, 0] },
    { position: [-0.45, 0, -0.25], rotation: [0, 0.15, 0] },
    { position: [0.45, 0, -0.25], rotation: [0, -0.15, 0] },
  ],
  keyboard: [{ position: [-0.1, -0.02, 0.25], rotation: [0, 0, 0] }],
  mouse: [{ position: [0.45, -0.015, 0.25], rotation: [0, 0, 0] }],
  lamp: [{ position: [-0.7, 0, -0.1], rotation: [0, 0.3, 0] }],
  plant: [{ position: [0.75, 0, 0.1], rotation: [0, 0, 0] }],
  webcam: [{ position: [0, 0, -0.25], rotation: [0, 0, 0] }],
  coffee: [{ position: [0.85, 0, -0.2], rotation: [0, -0.5, 0] }],
  tech: [{ position: [-0.6, 0, 0.45], rotation: [0, 0.5, 0] }],
  toy: [{ position: [0.65, 0, 0.45], rotation: [0, -0.3, 0] }],
  chair: [{ position: [0, 0.0, 0.9], rotation: [0, Math.PI + 0.8, 0] }],
};

// Helper: get absolute position for an item
export const getAbsolutePosition = (
  category: ProductCategory,
  slotIndex: number,
  surfaceY: number,
  positionOffset?: [number, number, number]
): [number, number, number] => {
  const slots = SLOT_MAP[category];
  if (!slots || !slots[slotIndex]) return [0, 0, 0];

  const slot = slots[slotIndex];
  const yOffset = category === "chair" ? 0 : surfaceY;

  return [
    slot.position[0] + (positionOffset?.[0] || 0),
    slot.position[1] + yOffset + (positionOffset?.[1] || 0),
    slot.position[2] + (positionOffset?.[2] || 0),
  ];
};

export const getSlotRotation = (
  category: ProductCategory,
  slotIndex: number
): [number, number, number] => {
  const slots = SLOT_MAP[category];
  if (!slots || !slots[slotIndex]) return [0, 0, 0];
  return slots[slotIndex].rotation || [0, 0, 0];
};

// ─── SMART MONITOR PLACEMENT ────────────────────────────────────────────
// Recalculates monitor positions based on count

export const getMonitorLayout = (
  count: number
): { position: [number, number, number]; rotation: [number, number, number] }[] => {
  if (count === 1) {
    return [{ position: [0, 0, -0.25], rotation: [0, 0, 0] }];
  }
  if (count === 2) {
    return [
      { position: [-0.3, 0, -0.25], rotation: [0, 0.12, 0] },
      { position: [0.3, 0, -0.25], rotation: [0, -0.12, 0] },
    ];
  }
  return [
    { position: [-0.5, 0, -0.2], rotation: [0, 0.2, 0] },
    { position: [0, 0, -0.3], rotation: [0, 0, 0] },
    { position: [0.5, 0, -0.2], rotation: [0, -0.2, 0] },
  ];
};

// ─── PRODUCTS ───────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── DESKS ──
  {
    id: "genius_desk_1",
    name: "Genius Minimalist Desk",
    description: "Ultra-slim profile, sustainable materials, high-density finish",
    price: 85000,
    category: "desk",
    modelPath: "/gbl/desks/desk1.glb",
    scale: 0.6,
    rotation: [0, 0, 0],
    thumbnail: "/images/desk1Image.png",
  },
  {
    id: "genius_desk_2",
    name: "Genius Executive Desk",
    description: "Spacious L-shape design, integrated cable management, dark oak",
    price: 155000,
    category: "desk",
    modelPath: "/gbl/desks/desk2.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
    thumbnail: "/images/desk2Image.png",
  },
  {
    id: "genius_desk_3",
    name: "Genius Pro Gamer Desk",
    description: "Heavy-duty steel frame, carbon fiber texture, built-in RGB slots",
    price: 125000,
    category: "desk",
    modelPath: "/gbl/desks/desk3.glb",
    scale: 1.35,
    rotation: [0, 0, 0],
    thumbnail: "/images/desk3Image.png",
  },

  // ── CHAIRS ──
  // {
  //   id: "ergonomic_chair",
  //   name: "Ergonomic Office Chair",
  //   description: "Mesh back, 4D armrests, lumbar support, retractable leg rest",
  //   price: 90000,
  //   category: "chair",
  //   modelPath: "", //"/gbl/chair-ergonomic.glb",
  //   scale: 1.0,
  //   rotation: [0, Math.PI + 0.8, 0],
  //   thumbnail: "/images/chair-ergonomic.png",
  // },
  {
    id: "ergonomic_chair",
    name: "Ergonomic Office Chair",
    description: "Mesh back, 4D armrests, lumbar support, retractable leg rest",
    price: 90000,
    category: "chair",
    modelPath: "/gbl/chairs/chair-premium.glb",
    scale: 1.0,
    rotation: [0, Math.PI + 0.8, 0],
    thumbnail: "/images/chair-premium.png",
  },
    {
    id: "premium_chair",
    name: "Premium Executive Chair",
    description: "Full leather, memory foam, 180° recline, silent casters",
    price: 200000,
    category: "chair",
    modelPath: "/gbl/chairs/chair-ultimate.glb",
    scale: 1.4,
    rotation: [0, Math.PI + 0.8, 0],
    thumbnail: "/images/chair-ultimate.png",
    positionOffset: [0, 0.7, 0],
  },

  // ── MONITORS ──
  {
    id: "genius_monitor_1",
    name: '27" Genius Zero-Bezel',
    description: "4K UHD, HDR1000, factory calibrated, infinity edge",
    price: 245000,
    category: "monitor",
    modelPath: "/gbl/monitors/monitor1.glb",
    scale: 0.04,
    rotation: [0, -Math.PI - Math.PI / 4 - Math.PI / 6, 0],
    thumbnail: "/images/monitor1Image.png",
  },
  {
    id: "genius_monitor_2",
    name: '32" Genius Curved',
    description: "1440p QHD, 1500R curvature, 144Hz, eye-care technology",
    price: 295000,
    category: "monitor",
    modelPath: "/gbl/monitors/monitor2.glb",
    scale: 0.04,
    rotation: [0, -Math.PI / 2, 0],
    thumbnail: "/images/monitor2Image.png",
  },
  {
    id: "genius_monitor_3",
    name: '24" Genius Pro',
    description: "1080p FHD, 240Hz refresh rate, 1ms response time",
    price: 195000,
    category: "monitor",
    modelPath: "/gbl/monitors/monitor3.glb",
    scale: 0.04,
    rotation: [0, -Math.PI / 2, 0],
    thumbnail: "/images/monitor3Image.png",
  },
  {
    id: "genius_monitor_4",
    name: '34" Genius Ultrawide',
    description: "WQHD Ultra-Wide, 21:9 aspect ratio, 120Hz, color accurate",
    price: 355000,
    category: "monitor",
    modelPath: "/gbl/monitors/monitor4.glb",
    scale: 0.005,
    rotation: [0, -Math.PI / 2, 0],
    thumbnail: "/images/monitor4Image.png",
  },

  // ── ACCESSORIES ──
  {
    id: "genius_kb_1",
    name: "Genius Mech TKL",
    description: "Mechanical brown switches, PBT keycaps, braided cable",
    price: 135000,
    category: "keyboard",
    modelPath: "/gbl/keyboards/keyboard1.glb",
    scale: 0.04,
    rotation: [0, -Math.PI / 2, 0],
    thumbnail: "/images/keyboard1Image.png",
  },
  {
    id: "genius_kb_2",
    name: "Genius Low-Profile",
    description: "Silent scissor switches, ultra-thin aluminum body, multi-device",
    price: 115000,
    category: "keyboard",
    modelPath: "/gbl/keyboards/keyboard2.glb",
    scale: 0.0005,
    rotation: [0, -Math.PI, 0],
    thumbnail: "/images/keyboard2Image.png",
  },
  {
    id: "genius_mouse_1",
    name: "Genius Ergo Mouse",
    description: "Vertical design, reduces wrist strain, 4000 DPI sensor",
    price: 95000,
    category: "mouse",
    modelPath: "/gbl/mouses/mouse1.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
    thumbnail: "/images/mouse1Image.png",
  },
  {
    id: "genius_macbook",
    name: "MacBook Pro 16",
    description: "M2 Max chip, 32GB RAM, Liquid Retina XDR display",
    price: 350000,
    category: "tech",
    modelPath: "/gbl/tech/macbook_pro_16_2021.glb",
    scale: 0.14,
    rotation: [0, 0, 0],
    thumbnail: "/images/macbook_pro_16_2021Image.png",
  },
  {
    id: "genius_ipad",
    name: "iPad Air",
    description: "M1 chip, 10.9-inch Liquid Retina display, Center Stage",
    price: 125000,
    category: "tech",
    modelPath: "/gbl/tech/ipad_air.glb",
    scale: 1.0,
    rotation: [0, 0, 0],
    thumbnail: "/images/ipad_airImage.png",
  },
  {
    id: "genius_batman",
    name: "Lego Batman Figurine",
    description: "Collectible series, adds +10 to setups' coolness",
    price: 15000,
    category: "toy",
    modelPath: "/gbl/accessories/legobatman.glb",
    scale: 8.0,
    rotation: [0, 0, 0],
    thumbnail: "/images/legobatmanImage.png",
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const ACCESSORY_CATEGORIES: ProductCategory[] = [
  "keyboard",
  "mouse",
  "lamp",
  "plant",
  "webcam",
  "coffee",
  "tech",
  "toy",
];
