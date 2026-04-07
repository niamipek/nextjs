export type CustomerDetail = {
  code: string;
  name: string;
  tier: string;
  segment: string;
  status: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  birthday: string;
  loyaltyPoints: string;
  totalSpent: string;
  orders: string;
  lastPurchase: string;
  owner: string;
  note: string;
};

export const customers: CustomerDetail[] = [
  {
    code: "KH001",
    name: "Pham Thu Huong",
    tier: "VIP",
    segment: "Retail",
    status: "VIP",
    phone: "0904 221 778",
    email: "huong.pham@gmail.com",
    city: "Ha Noi",
    address: "Cau Giay, Ha Noi",
    birthday: "18/08/1995",
    loyaltyPoints: "1,280",
    totalSpent: "45,200,000 VND",
    orders: "18",
    lastPurchase: "03/04/2026",
    owner: "Nguyen Minh Chau",
    note: "Frequently buys office fashion and requests invoice support.",
  },
  {
    code: "KH002",
    name: "Nguyen Tuan Anh",
    tier: "Member",
    segment: "Retail",
    status: "Active",
    phone: "0911 340 991",
    email: "tuananh.nguyen@gmail.com",
    city: "Ha Noi",
    address: "Dong Da, Ha Noi",
    birthday: "11/02/1998",
    loyaltyPoints: "420",
    totalSpent: "12,600,000 VND",
    orders: "7",
    lastPurchase: "01/04/2026",
    owner: "Tran Bao Ngan",
    note: "Prefers in-store pickup and card payments.",
  },
  {
    code: "KH003",
    name: "Le Thanh Truc",
    tier: "New",
    segment: "Online",
    status: "Active",
    phone: "0983 776 552",
    email: "truc.le@gmail.com",
    city: "Da Nang",
    address: "Hai Chau, Da Nang",
    birthday: "25/10/2001",
    loyaltyPoints: "90",
    totalSpent: "2,150,000 VND",
    orders: "2",
    lastPurchase: "29/03/2026",
    owner: "Doan Gia Han",
    note: "Usually purchases through social commerce channel.",
  },
  {
    code: "KH004",
    name: "Bui Khanh An",
    tier: "VIP",
    segment: "Wholesale",
    status: "VIP",
    phone: "0938 500 213",
    email: "an.bui@brand.vn",
    city: "Hai Phong",
    address: "Le Chan, Hai Phong",
    birthday: "06/12/1992",
    loyaltyPoints: "2,050",
    totalSpent: "60,800,000 VND",
    orders: "24",
    lastPurchase: "04/04/2026",
    owner: "Le Thao Vy",
    note: "Bulk buyer for seasonal campaigns and uniform orders.",
  },
  {
    code: "KH005",
    name: "Tran Minh Quan",
    tier: "Member",
    segment: "Retail",
    status: "Inactive",
    phone: "0967 443 120",
    email: "quan.tran@gmail.com",
    city: "Ho Chi Minh City",
    address: "Binh Thanh, Ho Chi Minh City",
    birthday: "14/07/1996",
    loyaltyPoints: "300",
    totalSpent: "8,900,000 VND",
    orders: "5",
    lastPurchase: "11/02/2026",
    owner: "Vo Duc Long",
    note: "Has not returned after Lunar New Year promotion.",
  },
  {
    code: "KH006",
    name: "Do My Linh",
    tier: "New",
    segment: "Online",
    status: "Active",
    phone: "0975 882 661",
    email: "linh.do@gmail.com",
    city: "Can Tho",
    address: "Ninh Kieu, Can Tho",
    birthday: "03/03/2000",
    loyaltyPoints: "160",
    totalSpent: "3,780,000 VND",
    orders: "3",
    lastPurchase: "30/03/2026",
    owner: "Bui Khanh Linh",
    note: "Responds well to voucher campaigns and SMS reminders.",
  },
];

export const tierOptions = ["All tiers", "VIP", "Member", "New"];
export const segmentOptions = ["All segments", "Retail", "Online", "Wholesale"];
export const statusOptions = ["All status", "Active", "VIP", "Inactive"];
export const cityOptions = ["All cities", "Ha Noi", "Da Nang", "Hai Phong", "Ho Chi Minh City", "Can Tho"];
