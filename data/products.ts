// ─── TYPES ──────────────────────────────────────────────────────────────

export type ProductCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "lamp"
  | "mic"
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
  desk_1: {
    id: "desk_1",
    surfaceY: 0.89,
    modelPosition: [0, 0, 0],
  },
  desk_2: {
    id: "desk_2",
    surfaceY: 0.97,
    modelPosition: [0, 0.525, 0],
  },
  desk_3: {
    id: "desk_3",
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
  mic: [{ position: [0.25, 0.05, -0.08], rotation: [0, -0.3, 0] }],
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
    id: "desk_1",
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
    id: "desk_2",
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
    id: "desk_3",
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
    id: "monitor_1",
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
    id: "monitor_2",
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
    id: "monitor_3",
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
    id: "monitor_4",
    name: '34" Genius Ultrawide',
    description: "WQHD Ultra-Wide, 21:9 aspect ratio, 120Hz, color accurate",
    price: 355000,
    category: "monitor",
    modelPath: "/gbl/monitors/monitor4.glb",
    scale: 0.005,
    rotation: [0, -Math.PI / 2, 0],
    thumbnail: "/images/monitor4Image.png",
  },

  // ── KEYBOARDS ──
  {
    id: "kb_1",
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
    id: "kb_2",
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
    id: "kb_3",
    name: "Genius RGB Pro",
    description: "Full-size RGB backlit, hot-swap switches, aluminum top plate",
    price: 145000,
    category: "keyboard",
    modelPath: "/gbl/keyboards/keyboard3.glb",
    scale: 0.0015,
    rotation: [0, -Math.PI, 0],
    thumbnail: "/images/keyboard3Image.png",
  },
  {
    id: "kb_4",
    name: "Genius Wireless Slim",
    description: "Bluetooth 5.0, connects up to 3 devices, 6-month battery",
    price: 125000,
    category: "keyboard",
    modelPath: "/gbl/keyboards/keyboard4.glb",
    scale: 1.4,
    rotation: [0, -Math.PI, 0],
    thumbnail: "/images/keyboard4Image.png",
  },
  {
    id: "kb_5",
    name: "Genius 60% Compact",
    description: "60% layout, custom keycaps, programmable layers, RGB underglow",
    price: 155000,
    category: "keyboard",
    modelPath: "/gbl/keyboards/keyboard5.glb",
    scale: 0.04,
    rotation: [0, -Math.PI, 0],
    thumbnail: "/images/keyboard5Image.png",
  },

  // ── MICE ──
  {
    id: "mouse_1",
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
    id: "mouse_2",
    name: "Genius Precision Pro",
    description: "Wireless 2.4GHz, 16000 DPI, rechargeable, silent clicks",
    price: 110000,
    category: "mouse",
    modelPath: "/gbl/mouses/mouse2.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
    thumbnail: "/images/mouse2Image.png",
  },
  {
    id: "mouse_3",
    name: "Genius Gaming Pro",
    description: "25600 DPI optical, 11 programmable buttons, RGB, braided cable",
    price: 125000,
    category: "mouse",
    modelPath: "/gbl/mouses/mouse3.glb",
    scale: 0.01,
    rotation: [0, 0, 0],
    thumbnail: "/images/mouse3Image.png",
  },

  // ── TECH / COMPUTERS ──
  {
    id: "macbook",
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
    id: "ipad",
    name: "iPad Air",
    description: "M1 chip, 10.9-inch Liquid Retina display, Center Stage",
    price: 125000,
    category: "tech",
    modelPath: "/gbl/tech/ipad_air.glb",
    scale: 1.0,
    rotation: [0, 0, 0],
    thumbnail: "/images/ipad_airImage.png",
  },
  // {
  //   id: "asus_rog",
  //   name: "Asus ROG G15",
  //   description: "Ryzen 9, RTX 3080, 15.6\" 300Hz display, per-key RGB",
  //   price: 380000,
  //   category: "tech",
  //   modelPath: "/gbl/tech/asus_rog_g15.glb",
  //   scale: 0.01,
  //   rotation: [0, 0, 0],
  //   thumbnail: "/images/asus_rog_g15Image.png",
  // },
  {
    id: "pc_1",
    name: "Genius Tower Pro",
    description: "Intel Core i9, 64GB DDR5, 2TB NVMe SSD, quiet cooling",
    price: 420000,
    category: "tech",
    modelPath: "/gbl/tech/pc1.glb",
    scale: 0.0005,
    rotation: [0, 0, 0],
    thumbnail: "/images/pc1Image.png",
  },


  // ── ACCESSORIES ──
  // {
  //   id: "table_lamp",
  //   name: "Genius Desk Lamp",
  //   description: "Adjustable arm, warm/cool modes, wireless charging base",
  //   price: 65000,
  //   category: "lamp",
  //   modelPath: "/gbl/accessories/tablelamp1.glb",
  //   scale: 14,
  //   rotation: [0, 0, 0],
  //   thumbnail: "/images/tablelamp1Image.png",
  // },
  {
    id: "table_mic",
    name: "Genius Desk Mic",
    description: "Cardioid condenser, USB-C, mute button, pop filter included",
    price: 75000,
    category: "mic",
    modelPath: "/gbl/accessories/tablemic1.glb",
    scale: 8,
    rotation: [0, 0, 0],
    thumbnail: "/images/tablemic1Image.png",
  },
  {
    id: "pc_2",
    name: "Genius Gaming Sound Speaker",
    description: "AMD Ryzen 7, RTX 4080, tempered glass, addressable RGB",
    price: 495000,
    category: "mic",
    modelPath: "/gbl/tech/pc2.glb",
    scale: 0.5,
    rotation: [0, 0, 0],
    thumbnail: "/images/pc2Image.png",
  },
  {
    id: "batman",
    name: "Lego Batman Figurine",
    description: "Collectible series, adds +10 to setups' coolness",
    price: 15000,
    category: "toy",
    modelPath: "/gbl/accessories/legobatman.glb",
    scale: 0.008,
    rotation: [0, 0, 0],
    thumbnail: "/images/legobatmanImage.png",
  },
  {
    id: "neon_light",
    name: "Genius Neon Ambient",
    description: "Multi-color neon strip for immersive workspace lighting",
    price: 45000,
    category: "lamp",
    modelPath: "/gbl/accessories/32809140-light-294.glb",
    scale: 1,
    rotation: [0, 0, 0],
    thumbnail: "/images/neon_lightImage.png",
  },
  {
    id: "classic_lamp",
    name: "Classic Architect Lamp",
    description: "Timeless articulated design with adjustable beam",
    price: 50000,
    category: "lamp",
    modelPath: "/gbl/accessories/plaggy_cc0-lamp-547.glb",
    scale: 0.1,
    rotation: [0, 0, 0],
    thumbnail: "/images/classic_lampImage.png",
  },
  {
    id: "led_light",
    name: "Modern LED Strip",
    description: "Ultra-slim LED strip for subtle desk highlighting",
    price: 30000,
    category: "lamp",
    modelPath: "/gbl/accessories/quaternius_cc0-desk-light-1137.glb",
    scale: 1,
    rotation: [0, 0, 0],
    thumbnail: "/images/led_lightImage.png",
  },
  {
    id: "bonsai",
    name: "Zen Bonsai Tree",
    description: "Carefully pruned miniature tree for a peaceful desk atmosphere",
    price: 25000,
    category: "plant",
    modelPath: "/gbl/accessories/quaternius_cc0-houseplant-1086.glb",
    scale: 0.4,
    rotation: [0, 0, 0],
    thumbnail: "/images/bonsaiImage.png",
  },
  {
    id: "fern",
    name: "Lush Desk Fern",
    description: "Vibrant green fern to bring life and fresh air to your office",
    price: 20000,
    category: "plant",
    modelPath: "/gbl/accessories/quaternius_cc0-houseplant-1088.glb",
    scale: 0.4,
    rotation: [0, 0, 0],
    thumbnail: "/images/fernImage.png",
  },
  {
    id: "succulent",
    name: "Succulent Trio",
    description: "Low-maintenance decorative succulents in a stone pot",
    price: 18000,
    category: "plant",
    modelPath: "/gbl/accessories/quaternius_cc0-houseplant-1090.glb",
    scale: 0.4,
    rotation: [0, 0, 0],
    thumbnail: "/images/succulentImage.png",
  },
  {
    id: "vending",
    name: "Mini Vending Machine",
    description: "Desktop-sized snack dispenser for quick break cravings",
    price: 25000,
    category: "toy",
    modelPath: "/gbl/accessories/lesiakower-vending-1586.glb",
    scale: 0.08,
    rotation: [0, 0, 0],
    thumbnail: "/images/vendingImage.png",
    positionOffset: [-3.4, -0.97, -0.2],
  },
  {
    id: "radar",
    name: "Desktop Radar Scanner",
    description: "Retro-futuristic radar display for your tech setup",
    price: 35000,
    category: "toy",
    modelPath: "/gbl/accessories/mastertux-radar-2189.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
    thumbnail: "/images/radarImage.png",
  },
  // {
  //   id: "gamer_art",
  //   name: "Gamer Spirit Statue",
  //   description: "Intricate figurine embodying the ultimate gamer's focus",
  //   price: 55000,
  //   category: "toy",
  //   modelPath: "/gbl/accessories/niknet_art-gamer-2746.glb",
  //   scale: 0.05,
  //   rotation: [0, 0, 0],
  //   thumbnail: "/images/gamer_artImage.png",
  // },
  // {
  //   id: "mini_desk",
  //   name: "Mini Desk Model",
  //   description: "A desk for your desk — inception style decoration",
  //   price: 12000,
  //   category: "toy",
  //   modelPath: "/gbl/accessories/quaternius_cc0-desk-910.glb",
  //   scale: 0.1,
  //   rotation: [0, 0, 0],
  //   thumbnail: "/images/mini_deskImage.png",
  // },
  {
    id: "mini_fridge",
    name: "Desktop Mini Fridge",
    description: "Keep your drinks chilled right at your fingertips",
    price: 85000,
    category: "toy",
    modelPath: "/gbl/accessories/quaternius_cc0-fridge-971.glb",
    scale: 0.1,
    rotation: [0, 0, 0],
    thumbnail: "/images/mini_fridgeImage.png",
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

// Categories shown in the Accessories step (lamp, mic, toys — not keyboard/mouse/tech which have their own steps)
export const ACCESSORY_CATEGORIES: ProductCategory[] = [
  "lamp",
  "mic",
  "plant",
  "webcam",
  "coffee",
  "toy",
];
