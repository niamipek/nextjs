import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

const revenueBars = [
  { day: "01", value: 17 },
  { day: "02", value: 20 },
  { day: "03", value: 12 },
];

const topProducts = [
  { name: "Quan kaki nam mau kem", value: 63.7 },
  { name: "Giay da Sanvado mau den", value: 18.9 },
  { name: "Giay da Sanvado mau den", value: 18.9 },
  { name: "Giay da Sanvado mau den", value: 18.9 },
];

const topCustomers = [
  { name: "Tuan - Ha Noi", value: 45.2 },
  { name: "Pham Thu Huong", value: 20.3 },
  { name: "An Giang - Kim Ma", value: 17.0 },
  { name: "An Giang - Kim Ma", value: 17.0 },
];

const activities = [
  { name: "Le Thi Bao Tran", action: "vua ban don hang", detail: "voi gia tri 17,302,800", time: "43 phut truoc" },
  { name: "Le Thi Bao Tran", action: "vua nhap hang", detail: "voi gia tri 0", time: "43 phut truoc" },
  { name: "Tran Binh Quyen", action: "vua ban don hang", detail: "voi gia tri 4,436,100", time: "mot ngay truoc" },
  { name: "Tran Binh Quyen", action: "vua nhap hang", detail: "voi gia tri 0", time: "mot ngay truoc" },
  { name: "Nguyen Thi Thai Hoa", action: "vua ban don hang", detail: "voi gia tri 28,357,200", time: "2 ngay truoc" },
  { name: "Nguyen Thi Thai Hoa", action: "vua nhap hang", detail: "voi gia tri 0", time: "2 ngay truoc" },
  { name: "Le Thi Bao Tran", action: "vua ban don hang", detail: "voi gia tri 12,425,100", time: "3 ngay truoc" },
  { name: "Le Thi Bao Tran", action: "vua nhap hang", detail: "voi gia tri 0", time: "3 ngay truoc" },
  { name: "Nguyen Thi Thai Hoa", action: "vua ban don hang", detail: "voi gia tri 20,342,400", time: "4 ngay truoc" },
  { name: "Nguyen Thi Thai Hoa", action: "vua nhap hang", detail: "voi gia tri 0", time: "4 ngay truoc" },
  { name: "Tran Binh Quyen", action: "vua ban don hang", detail: "voi gia tri 16,958,700", time: "5 ngay truoc" },
  { name: "Tran Binh Quyen", action: "vua nhap hang", detail: "voi gia tri 0", time: "5 ngay truoc" },
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
      <div className="h-plot">
        {ticks.map((tick) => {
          const left = (tick / max) * 100;
          return <div key={tick} className="v-grid" style={{ left: `${left}%` }} />;
        })}

        {items.map((item) => {
          const width = (item.value / max) * 100;
          return (
            <div className="h-row" key={item.name}>
              <div className="h-name" title={item.name}>
                {item.name}
              </div>
              <div className="h-row-main">
                <div className="h-bar-track">
                  <div className="h-bar" style={{ width: `${width}%` }} />
                </div>
                <div className="h-value">{item.value.toFixed(1)} tr</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-axis">
        {ticks.map((tick) => {
          const left = (tick / max) * 100;
          return (
            <div key={tick} className="x-tick" style={{ left: `${left}%` }}>
              {tick === 0 ? "0" : `${tick} tr`}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="dashboard-page">
      <DashboardHeader />
      <DashboardNav />

      <section className="dashboard-grid">
        <div>
          <article className="card">
            <h2 className="card-title">Ket qua ban hang hom nay</h2>
            <div className="metric-grid">
              <div className="metric-col">
                <div className="metric-item">
                  <span className="metric-icon blue">$</span>
                  <div>
                    <div className="metric-label">Doanh thu</div>
                    <div className="metric-value">17,302,800</div>
                    <div className="metric-sub">1 hoa don</div>
                  </div>
                </div>
                <div className="metric-item">
                  <span className="metric-icon green">+</span>
                  <div>
                    <div className="metric-label">Doanh thu thuan</div>
                    <div className="metric-value">290.05%</div>
                    <div className="metric-sub">So voi hom qua</div>
                  </div>
                </div>
              </div>
              <div className="metric-divider" />
              <div className="metric-col">
                <div className="metric-item">
                  <span className="metric-icon orange">R</span>
                  <div>
                    <div className="metric-label">Tra hang</div>
                    <div className="metric-value">0</div>
                  </div>
                </div>
                <div className="metric-item">
                  <span className="metric-icon red">-</span>
                  <div>
                    <div className="metric-label">Doanh thu thuan</div>
                    <div className="metric-value">-21.79%</div>
                    <div className="metric-sub">So voi cung ky thang truoc</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="row-between">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>
                  Doanh thu thuan
                </h2>
                <span className="badge-value">82,519,500</span>
              </div>
              <select className="select" defaultValue="Thang nay">
                <option>Thang nay</option>
              </select>
            </div>
            <div className="tabs">
              <div className="tab active">Theo ngay</div>
              <div className="tab">Theo gio</div>
              <div className="tab">Theo thu</div>
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

          <div className="top-ten-grid">
            <article className="card top-ten-card">
              <div className="row-between">
                <h2 className="card-title top-ten-title">Top 10 hang ban chay</h2>
                <div className="top-ten-filters">
                  
                  <select className="select" defaultValue="Thang nay">
                    <option>Thang nay</option>
                  </select>
                </div>
              </div>
              <HorizontalChart items={topProducts} max={80} ticks={productTicks} />
            </article>

            <article className="card top-ten-card">
              <div className="row-between">
                <h2 className="card-title top-ten-title">Top 10 khach mua nhieu nhat</h2>
                <select className="select" defaultValue="Thang nay">
                  <option>Thang nay</option>
                </select>
              </div>
              <HorizontalChart items={topCustomers} max={60} ticks={customerTicks} />
            </article>
          </div>
        </div>

        <aside className="dashboard-aside">
          <article className="card">
            <div className="utility-item">
              <div className="utility-left">
                <span className="utility-icon">$</span>
                <div>
                  <div className="utility-title">Thanh toan</div>
                  <div className="utility-sub">Cai dat QR tinh mien phi</div>
                </div>
              </div>
              <span>{">"}</span>
            </div>
            <div className="divider" />
            <div className="utility-item">
              <div className="utility-left">
                <span className="utility-icon">V</span>
                <div>
                  <div className="utility-title">Vay von</div>
                  <div className="utility-sub">Du von hom nay, vung vang ngay mai</div>
                </div>
              </div>
              <span>{">"}</span>
            </div>
          </article>

          <article className="card activity-panel" style={{ paddingBottom: 8 }}>
            <div className="alert-row">
              <div className="alert-left">
                <span className="alert-icon">!</span>
                <div className="alert-text">
                  Co 1 hoat dong dang nhap
                  <br />
                  khac thuong can kiem tra.
                </div>
              </div>
              <span>v</span>
            </div>

            <div className="divider" />
            <div className="activity-title">Hoat dong gan day</div>

            <div className="activity-wrap">
              {activities.map((item, idx) => (
                <div className="activity-item" key={`${item.name}-${idx}`}>
                  <span className="timeline-icon">o</span>
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

              <div className="support-pill">Chat 1900 6522</div>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
