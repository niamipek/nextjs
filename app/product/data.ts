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
};

const baseProducts: Product[] = [
  { code: "NU011", name: "Giay nu mau xanh bong", salePrice: "1,995,000", costPrice: "950,000", stock: 0, reserved: 0, createdAt: "10/03/2026 18:35", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Giay dep"] },
  { code: "NU010", name: "Giay nu mau trang", salePrice: "1,750,000", costPrice: "950,000", stock: 12, reserved: 2, createdAt: "10/03/2026 18:34", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Giay dep"] },
  { code: "NU009", name: "Giay nu mau den ho mui", salePrice: "1,980,000", costPrice: "1,200,000", stock: 4, reserved: 1, createdAt: "10/03/2026 18:33", status: "Sap het hang", groups: ["Thoi trang nu", "Giay dep"] },
  { code: "NU008", name: "Tui xach nu mau xanh duong", salePrice: "1,899,000", costPrice: "950,000", stock: 18, reserved: 0, createdAt: "10/03/2026 18:32", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Phu kien"] },
  { code: "NU007", name: "Vi mau xanh la cay", salePrice: "1,849,000", costPrice: "940,000", stock: 6, reserved: 0, createdAt: "10/03/2026 18:31", status: "Dang kinh doanh", groups: ["Phu kien"] },
  { code: "NU006", name: "Vi mau xanh nhat", salePrice: "1,899,000", costPrice: "950,000", stock: 2, reserved: 0, createdAt: "10/03/2026 18:30", status: "Sap het hang", groups: ["Phu kien"] },
  { code: "NU005", name: "Vi VIENNE mau tim", salePrice: "190,000", costPrice: "55,000", stock: 22, reserved: 5, createdAt: "10/03/2026 18:29", status: "Dang kinh doanh", groups: ["Phu kien"] },
  { code: "NU004", name: "Ao vest nu mau xanh duong", salePrice: "2,169,000", costPrice: "820,000", stock: 8, reserved: 1, createdAt: "10/03/2026 18:28", status: "Dang kinh doanh", groups: ["Thoi trang nu", "Thoi trang nam"] },
  { code: "NU003", name: "Ao vest nu mau hong", salePrice: "1,249,000", costPrice: "580,000", stock: 3, reserved: 0, createdAt: "10/03/2026 18:27", status: "Sap het hang", groups: ["Thoi trang nu"] },
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
