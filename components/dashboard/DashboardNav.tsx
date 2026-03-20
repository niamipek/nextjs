const navItems = [
  "Overview",      // Tổng quan
  "Products",      // Hàng hóa (hoặc Items/Goods)
  "Orders",        // Đơn hàng
  "Customers",     // Khách hàng
  "Employees",     // Nhân viên (hoặc Staff)
  "Cashbook",      // Sổ quỹ (hoặc Cash Flow)
  "Reports",       // Báo cáo
  "Online Sales"   // Bán online
];
export function DashboardNav() {
  return (
    <nav className="main-nav">
      {navItems.map((item) => (
        <span key={item} className="nav-item">
          {item}
        </span>
      ))}
      <span className="nav-spacer" />
      <button className="sale-btn">Sell product</button>
    </nav>
  );
}
