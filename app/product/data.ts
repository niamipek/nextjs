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
  { code: "NU011", name: "Giay nu mau xanh bong", salePrice: "1,995,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:35", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Giay dep"], description: "Mau giay nu phom thanh lich, be mat bong nhe va de cao su chong tron. Phu hop di lam, di choi va cac set do toi gian.", imageUrl: buildProductImage("GIAY", "#38bdf8", "#0f172a") },
  { code: "NU010", name: "Giay nu mau trang", salePrice: "1,750,000", costPrice: "950,000", stock: 12, reserved: 2, createdAt: "10/03/2026 18:34", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Giay dep"], description: "Giay nu tong mau trang, dang de mang hang ngay, chat lieu mem va nhe. Thich hop phoi cung quan jean, vay ngan hoac trang phuc cong so.", imageUrl: buildProductImage("TRANG", "#f8fafc", "#94a3b8") },
  { code: "NU009", name: "Giay nu mau den ho mui", salePrice: "1,980,000", costPrice: "1,200,000", stock: 4, reserved: 1, createdAt: "10/03/2026 18:33", status: "Sap het hang", groups: ["Thoi trang nu", "Giay dep"], description: "Thiet ke giay den ho mui ton dang chan, chat da mem va chi tiet cat khau tinh te. Phu hop cac buoi gap go can su chi chu.", imageUrl: buildProductImage("DEN", "#334155", "#020617") },
  { code: "NU008", name: "Tui xach nu mau xanh duong", salePrice: "1,899,000", costPrice: "950,000", stock: 18, reserved: 0, createdAt: "10/03/2026 18:32", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Phu kien"], description: "Tui xach form hop gon, mau xanh duong noi bat, ngan trong rong va co day deo thao roi. Danh cho nguoi can mot mau tui de ket hop do cong so.", imageUrl: buildProductImage("TUI", "#2563eb", "#1e3a8a") },
  { code: "NU007", name: "Vi mau xanh la cay", salePrice: "1,849,000", costPrice: "940,000", stock: 6, reserved: 0, createdAt: "10/03/2026 18:31", status: "Dang kinh doanh", groups: ["Phu kien"], description: "Vi mini mau xanh la, kich thuoc gon, nhieu ngan dung the va tien gap. Phu kien tao diem nhan mau sac cho outfit hang ngay.", imageUrl: buildProductImage("VI", "#22c55e", "#166534") },
  { code: "NU006", name: "Vi mau xanh nhat", salePrice: "1,899,000", costPrice: "950,000", stock: 2, reserved: 0, createdAt: "10/03/2026 18:30", status: "Sap het hang", groups: ["Phu kien"], description: "Mau vi xanh nhat da van min, kieu dang thanh lich, de phoi voi tui xach cung tong. Ben trong toi uu ngan dung the va tien mat.", imageUrl: buildProductImage("MINT", "#67e8f9", "#0f766e") },
  { code: "NU005", name: "Vi VIENNE mau tim", salePrice: "190,000", costPrice: "55,000", stock: 22, reserved: 5, createdAt: "10/03/2026 18:29", status: "Dang kinh doanh", groups: ["Phu kien"], description: "Vi cam tay thuong hieu VIENNE, tong tim tre trung, chat lieu nhe va de bao quan. Muc gia de tiep can cho nhom khach mua qua tang.", imageUrl: buildProductImage("VIOLET", "#a855f7", "#581c87") },
  { code: "NU004", name: "Ao vest nu mau xanh duong", salePrice: "2,169,000", costPrice: "820,000", stock: 8, reserved: 1, createdAt: "10/03/2026 18:28", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Thoi trang nam"], description: "Ao vest nu mau xanh duong, phom om vua van, vai dung dang va duong cat gon. Phu hop môi truong cong so, su kien va tiep khach.", imageUrl: buildProductImage("VEST", "#60a5fa", "#1d4ed8") },
  { code: "NU003", name: "Ao vest nu mau hong", salePrice: "1,249,000", costPrice: "580,000", stock: 3, reserved: 0, createdAt: "10/03/2026 18:27", status: "Sap het hang", groups: ["Thoi trang nu"], description: "Ao vest mau hong nhat, thiet ke me mai va ton da. Thich hop cho khach hang tim kiem trang phuc cong so nhung van giu duoc su mem mai.", imageUrl: buildProductImage("PINK", "#f9a8d4", "#be185d") },
];

export const products: Product[] = Array.from({ length: 3 }, (_, index) =>
  baseProducts.map((product) => ({
    ...product,
    code: `${product.code}-${index + 1}`,
    createdAt: `1${index}/03/2026 1${8 - (index % 3)}:${35 - index}`,
  })),
).flat();

export const itemGroupOptions = ["Thoi trang nam", "Thoi trang nu", "Giay dep", "Phu kien"];
export const stockOptions = ["Tat ca", "Con hang", "Het hang", "Sap het hang"];
export const supplierOptions = ["Chon nha cung cap", "KLTN Fashion", "Blue Lotus", "Vienne"];
export const locationOptions = ["Chon vi tri", "Kho tong", "Cua hang trung tam", "Kho online"];
export const categoryOptions = ["Chon loai hang", "Giay dep", "Tui vi", "Thoi trang nu"];
export const statusOptions = ["Hang dang kinh doanh", "Sap het hang", "Ngung kinh doanh"];
