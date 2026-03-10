const revenueBars = [
  { day: "01", value: 17 },
  { day: "02", value: 20 },
  { day: "03", value: 12 },
];

const topProducts = [
  { name: "Quần kaki nam màu kem", value: 63.7 },
  { name: "Giày da Sanvado màu đen", value: 18.9 },
];

const topCustomers = [
  { name: "Tuấn - Hà Nội", value: 45.2 },
  { name: "Phạm Thu Hương", value: 20.3 },
  { name: "An Giang - Kim Mã", value: 17.0 },
];

const activities = [
  {
    name: "Lê Thị Bảo Trân",
    action: "vừa bán đơn hàng",
    detail: "với giá trị 17,302,800",
    time: "43 phút tới",
  },
  {
    name: "Lê Thị Bảo Trân",
    action: "vừa nhập hàng",
    detail: "với giá trị 0",
    time: "43 phút tới",
  },
  {
    name: "Trần Bình Quyền",
    action: "vừa bán đơn hàng",
    detail: "với giá trị 4,436,100",
    time: "một ngày trước",
  },
  {
    name: "Trần Bình Quyền",
    action: "vừa nhập hàng",
    detail: "với giá trị 0",
    time: "một ngày trước",
  },
  {
    name: "Nguyễn Thị Thái Hòa",
    action: "vừa bán đơn hàng",
    detail: "với giá trị 28,357,200",
    time: "2 ngày trước",
  },
  {
    name: "Nguyễn Thị Thái Hòa",
    action: "vừa nhập hàng",
    detail: "với giá trị 0",
    time: "2 ngày trước",
  },
  {
    name: "Lê Thị Bảo Trân",
    action: "vừa bán đơn hàng",
    detail: "với giá trị 12,425,100",
    time: "3 ngày trước",
  },
  {
    name: "Lê Thị Bảo Trân",
    action: "vừa nhập hàng",
    detail: "với giá trị 0",
    time: "3 ngày trước",
  },
  {
    name: "Nguyễn Thị Thái Hòa",
    action: "vừa bán đơn hàng",
    detail: "với giá trị 20,342,400",
    time: "4 ngày trước",
  },
  {
    name: "Nguyễn Thị Thái Hòa",
    action: "vừa nhập hàng",
    detail: "với giá trị 0",
    time: "4 ngày trước",
  },
  {
    name: "Trần Bình Quyền",
    action: "vừa bán đơn hàng",
    detail: "với giá trị 16,958,700",
    time: "5 ngày trước",
  },
  {
    name: "Trần Bình Quyền",
    action: "vừa nhập hàng",
    detail: "với giá trị 0",
    time: "5 ngày trước",
  },
];

const yTicks = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
const productTicks = [0, 20, 40, 60, 80];
const customerTicks = [0, 10, 20, 30, 40, 50, 60];

function HorizontalChart({
  items,
  max,
  ticks,
}: {
  items: { name: string; value: number }[];
  max: number;
  ticks: number[];
}) {
  return (
    <div className="h-chart-wrap">
      {ticks.map((tick) => {
        const left = (tick / max) * 82;
        return (
          <div key={tick}>
            <div className="v-grid" style={{ left: `${left}%` }} />
            <div className="x-tick" style={{ left: `${left}%` }}>
              {tick === 0 ? "0" : `${tick} tr`}
            </div>
          </div>
        );
      })}

      {items.map((item, idx) => {
        const top = 24 + idx * 95;
        const width = (item.value / max) * 100;
        return (
          <div className="h-row" key={item.name} style={{ top }}>
            <div className="h-name">{item.name}</div>
            <div className="h-bar-track">
              <div className="h-bar" style={{ width: `${width}%` }} />
            </div>
            <div className="h-value">{item.value.toFixed(1)} tr</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  return (
    <main className="dashboard-page">
      <header className="top-header">
        <div className="brand">
          <span className="brand-shape" />
          <span className="brand-shape second" />
          <span>KiotViet</span>
        </div>
        <div className="header-actions">
          <span className="icon-dot">◐</span>
          <span className="icon-dot">?</span>
          <span className="icon-dot">◌</span>
          <span className="flag" />
          <span>Tiếng Việt</span>
          <span>▾</span>
          <span>⚙</span>
          <span className="avatar" />
        </div>
      </header>

      <nav className="main-nav">
        <span className="nav-item active">Tổng quan</span>
        <span className="nav-item">Hàng hóa</span>
        <span className="nav-item">Đơn hàng</span>
        <span className="nav-item">Khách hàng</span>
        <span className="nav-item">Nhân viên</span>
        <span className="nav-item">Sổ quỹ</span>
        <span className="nav-item">Báo cáo</span>
        <span className="nav-item">Bán online</span>
        <span className="nav-item">
          Thuế &amp; Kế toán
          <span className="badge-new">Mới</span>
        </span>
        <span className="nav-spacer" />
        <button className="sale-btn">Bán hàng</button>
      </nav>

      <section className="dashboard-grid">
        <div>
          <article className="card">
            <h2 className="card-title">Kết quả bán hàng hôm nay</h2>
            <div className="metric-grid">
              <div className="metric-col">
                <div className="metric-item">
                  <span className="metric-icon blue">$</span>
                  <div>
                    <div className="metric-label">Doanh thu</div>
                    <div className="metric-value">17,302,800</div>
                    <div className="metric-sub">1 hóa đơn</div>
                  </div>
                </div>
                <div className="metric-item">
                  <span className="metric-icon green">↑</span>
                  <div>
                    <div className="metric-label">Doanh thu thuần</div>
                    <div className="metric-value">290.05%</div>
                    <div className="metric-sub">So với hôm qua</div>
                  </div>
                </div>
              </div>
              <div className="metric-divider" />
              <div className="metric-col">
                <div className="metric-item">
                  <span className="metric-icon orange">↩</span>
                  <div>
                    <div className="metric-label">Trả hàng</div>
                    <div className="metric-value">0</div>
                  </div>
                </div>
                <div className="metric-item">
                  <span className="metric-icon red">↓</span>
                  <div>
                    <div className="metric-label">Doanh thu thuần</div>
                    <div className="metric-value">-21.79%</div>
                    <div className="metric-sub">So với cùng kỳ tháng trước</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="row-between">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>
                  Doanh thu thuần
                </h2>
                <span className="badge-value">82,519,500</span>
              </div>
              <select className="select" defaultValue="Tháng này">
                <option>Tháng này</option>
              </select>
            </div>
            <div className="tabs">
              <div className="tab active">Theo ngày</div>
              <div className="tab">Theo giờ</div>
              <div className="tab">Theo thứ</div>
            </div>

            <div className="chart-v">
              <div className="y-axis">
                {yTicks.map((tick) => (
                  <div
                    key={tick}
                    className="y-label"
                    style={{ bottom: `${(tick / 30) * 100}%` }}
                  >
                    {tick === 0 ? "0" : `${tick} tr`}
                  </div>
                ))}
              </div>
              <div className="chart-area">
                {yTicks.map((tick) => (
                  <div
                    key={tick}
                    className="h-grid"
                    style={{ bottom: `${(tick / 30) * 100}%` }}
                  />
                ))}
                <div className="v-bars">
                  {revenueBars.map((bar) => (
                    <div className="v-bar-wrap" key={bar.day}>
                      <div className="v-bar" style={{ height: `${(bar.value / 30) * 100}%` }} />
                      <div className="x-label">{bar.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="row-between">
              <h2 className="card-title">Top 10 hàng bán chạy</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <select className="select" defaultValue="Theo doanh thu thuần">
                  <option>Theo doanh thu thuần</option>
                </select>
                <select className="select" defaultValue="Tháng này">
                  <option>Tháng này</option>
                </select>
              </div>
            </div>
            <HorizontalChart items={topProducts} max={80} ticks={productTicks} />
          </article>

          <article className="card">
            <div className="row-between">
              <h2 className="card-title">Top 10 khách mua nhiều nhất</h2>
              <select className="select" defaultValue="Tháng này">
                <option>Tháng này</option>
              </select>
            </div>
            <HorizontalChart items={topCustomers} max={60} ticks={customerTicks} />
          </article>
        </div>

        <aside>
          <article className="card">
            <div className="utility-item">
              <div className="utility-left">
                <span className="utility-icon">$</span>
                <div>
                  <div className="utility-title">Thanh toán</div>
                  <div className="utility-sub">Cài đặt QR tĩnh miễn phí</div>
                </div>
              </div>
              <span>›</span>
            </div>
            <div className="divider" />
            <div className="utility-item">
              <div className="utility-left">
                <span className="utility-icon">₫</span>
                <div>
                  <div className="utility-title">Vay vốn</div>
                  <div className="utility-sub">Đủ vốn hôm nay, vững vàng ngày mai</div>
                </div>
              </div>
              <span>›</span>
            </div>
          </article>

          <article className="card" style={{ paddingBottom: 8 }}>
            <div className="alert-row">
              <div className="alert-left">
                <span className="alert-icon">▢</span>
                <div className="alert-text">
                  Có 1 hoạt động đăng nhập
                  <br />
                  khác thường cần kiểm tra.
                </div>
              </div>
              <span>▾</span>
            </div>

            <div className="divider" />
            <div className="activity-title">Hoạt động gần đây</div>

            <div className="activity-wrap">
              {activities.map((item, idx) => (
                <div className="activity-item" key={`${item.name}-${idx}`}>
                  <span className="timeline-icon">◍</span>
                  {idx < activities.length - 1 ? <span className="timeline-line" /> : null}
                  <div>
                    <div className="activity-text">
                      <span className="link-blue">{item.name}</span> <span className="link-blue">{item.action}</span>{" "}
                      {item.detail}
                    </div>
                    <div className="time-text">{item.time}</div>
                  </div>
                </div>
              ))}

              <div className="support-pill">💬 1900 6522</div>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
