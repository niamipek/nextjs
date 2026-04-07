export type Product = {
  code: string;
  name: string;
  salePrice: string;
  costPrice: string;
  stock: number;
  reserved: number;
  createdAt: string;
  status: string;
  groups: string[];
  description: string;
  imageUrl: string;
};

function buildProductImage(label: string, from: string, to: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="720" height="720" rx="44" fill="url(#bg)" />
      <circle cx="560" cy="148" r="92" fill="rgba(255,255,255,0.22)" />
      <circle cx="148" cy="572" r="132" fill="rgba(255,255,255,0.16)" />
      <rect x="140" y="146" width="440" height="428" rx="54" fill="rgba(255,255,255,0.9)" />
      <rect x="188" y="210" width="344" height="236" rx="34" fill="rgba(15,23,42,0.08)" />
      <rect x="220" y="474" width="280" height="20" rx="10" fill="rgba(15,23,42,0.12)" />
      <rect x="244" y="518" width="232" height="18" rx="9" fill="rgba(15,23,42,0.1)" />
      <text x="360" y="630" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff">
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const baseProducts: Product[] = [
  { code: "NU011", name: "Glossy Blue Women's Shoes", salePrice: "1,995,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:35", status: "Active", groups: ["Women's Fashion", "Shoes"], description: "Elegant women's shoes with a subtle glossy finish and anti-slip rubber sole. Suitable for work, casual outings, and minimalist outfits.", imageUrl: buildProductImage("SHOES", "#38bdf8", "#0f172a") },
  { code: "NU010", name: "White Women's Shoes", salePrice: "1,750,000", costPrice: "950,000", stock: 12, reserved: 2, createdAt: "10/03/2026 18:34", status: "Active", groups: ["Women's Fashion", "Shoes"], description: "Daily wear white shoes with a lightweight and comfortable build. Easy to pair with jeans, skirts, or office outfits.", imageUrl: buildProductImage("WHITE", "#f8fafc", "#94a3b8") },
  { code: "NU009", name: "Black Open-Toe Women's Shoes", salePrice: "1,980,000", costPrice: "1,200,000", stock: 4, reserved: 1, createdAt: "10/03/2026 18:33", status: "Low stock", groups: ["Women's Fashion", "Shoes"], description: "Black open-toe shoes designed to flatter the feet, made from soft material with refined cutout details. Great for polished occasions.", imageUrl: buildProductImage("BLACK", "#334155", "#020617") },
  { code: "NU008", name: "Blue Women's Handbag", salePrice: "1,899,000", costPrice: "950,000", stock: 18, reserved: 0, createdAt: "10/03/2026 18:32", status: "Active", groups: ["Women's Fashion", "Accessories"], description: "Structured blue handbag with a spacious interior and detachable strap. A strong choice for office styling.", imageUrl: buildProductImage("BAG", "#2563eb", "#1e3a8a") },
  { code: "NU007", name: "Green Wallet", salePrice: "1,849,000", costPrice: "940,000", stock: 6, reserved: 0, createdAt: "10/03/2026 18:31", status: "Active", groups: ["Accessories"], description: "Compact green wallet with multiple card slots and a slim silhouette. Adds a fresh color accent to everyday looks.", imageUrl: buildProductImage("WALLET", "#22c55e", "#166534") },
  { code: "NU006", name: "Light Green Wallet", salePrice: "1,899,000", costPrice: "950,000", stock: 2, reserved: 0, createdAt: "10/03/2026 18:30", status: "Low stock", groups: ["Accessories"], description: "Soft light green wallet with a refined finish. Designed for practical daily use with organized compartments.", imageUrl: buildProductImage("MINT", "#67e8f9", "#0f766e") },
  { code: "NU005", name: "VIENNE Purple Wallet", salePrice: "190,000", costPrice: "55,000", stock: 22, reserved: 5, createdAt: "10/03/2026 18:29", status: "Active", groups: ["Accessories"], description: "Purple VIENNE wallet with a youthful look, lightweight material, and easy maintenance. A good low-cost gift option.", imageUrl: buildProductImage("VIOLET", "#a855f7", "#581c87") },
  { code: "NU004", name: "Blue Women's Blazer", salePrice: "2,169,000", costPrice: "820,000", stock: 8, reserved: 1, createdAt: "10/03/2026 18:28", status: "Active", groups: ["Women's Fashion", "Men's Fashion"], description: "Blue women's blazer with a tailored fit, structured shoulders, and clean lines. Ideal for office wear and client-facing events.", imageUrl: buildProductImage("BLAZER", "#60a5fa", "#1d4ed8") },
  { code: "NU003", name: "Pink Women's Blazer", salePrice: "1,249,000", costPrice: "580,000", stock: 3, reserved: 0, createdAt: "10/03/2026 18:27", status: "Low stock", groups: ["Women's Fashion"], description: "Soft pink blazer with a gentle silhouette and flattering tone. A great choice for customers seeking feminine officewear.", imageUrl: buildProductImage("PINK", "#f9a8d4", "#be185d") },
];

export const products: Product[] = Array.from({ length: 3 }, (_, index) =>
  baseProducts.map((product) => ({
    ...product,
    code: `${product.code}-${index + 1}`,
    createdAt: `1${index}/03/2026 1${8 - (index % 3)}:${35 - index}`,
  })),
).flat();

export const itemGroupOptions = ["Men's Fashion", "Women's Fashion", "Shoes", "Accessories"];
export const stockOptions = ["All", "In stock", "Out of stock", "Low stock"];
export const supplierOptions = ["Select supplier", "KLTN Fashion", "Blue Lotus", "Vienne"];
export const locationOptions = ["Select location", "Main warehouse", "Central store", "Online warehouse"];
export const categoryOptions = ["Select category", "Shoes", "Bags & Wallets", "Women's Fashion"];
export const statusOptions = ["Active", "Low stock", "Discontinued"];
