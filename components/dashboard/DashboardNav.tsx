const navItems = ["Tong quan", "Hang hoa", "Don hang", "Khach hang", "Nhan vien", "So quy", "Bao cao", "Ban online"];

export function DashboardNav() {
  return (
    <nav className="main-nav">
      {navItems.map((item) => (
        <span key={item} className="nav-item">
          {item}
        </span>
      ))}
      <span className="nav-spacer" />
      <button className="sale-btn">Ban hang</button>
    </nav>
  );
}
