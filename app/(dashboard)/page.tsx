const revenueBars = [
  { day: "01", value: 17 },
  { day: "02", value: 20 },
  { day: "03", value: 12 },
];

const topProducts = [
  { name: "Men's beige khaki pants", value: 63.7 },
  { name: "Black Sanvado leather shoes", value: 18.9 },
  { name: "Black Sanvado leather shoes", value: 18.9 },
  { name: "Black Sanvado leather shoes", value: 18.9 },
];

const topCustomers = [
  { name: "Tuan - Hanoi", value: 45.2 },
  { name: "Pham Thu Huong", value: 20.3 },
  { name: "An Giang - Kim Ma", value: 17.0 },
  { name: "An Giang - Kim Ma", value: 17.0 },
];

const activities = [
  { name: "Le Thi Bao Tran", action: "just completed a sales order", detail: "worth 17,302,800", time: "43 minutes ago" },
  { name: "Le Thi Bao Tran", action: "just recorded incoming stock", detail: "worth 0", time: "43 minutes ago" },
  { name: "Tran Binh Quyen", action: "just completed a sales order", detail: "worth 4,436,100", time: "1 day ago" },
  { name: "Tran Binh Quyen", action: "just recorded incoming stock", detail: "worth 0", time: "1 day ago" },
  { name: "Nguyen Thi Thai Hoa", action: "just completed a sales order", detail: "worth 28,357,200", time: "2 days ago" },
  { name: "Nguyen Thi Thai Hoa", action: "just recorded incoming stock", detail: "worth 0", time: "2 days ago" },
  { name: "Le Thi Bao Tran", action: "just completed a sales order", detail: "worth 12,425,100", time: "3 days ago" },
  { name: "Le Thi Bao Tran", action: "just recorded incoming stock", detail: "worth 0", time: "3 days ago" },
  { name: "Nguyen Thi Thai Hoa", action: "just completed a sales order", detail: "worth 20,342,400", time: "4 days ago" },
  { name: "Nguyen Thi Thai Hoa", action: "just recorded incoming stock", detail: "worth 0", time: "4 days ago" },
  { name: "Tran Binh Quyen", action: "just completed a sales order", detail: "worth 16,958,700", time: "5 days ago" },
  { name: "Tran Binh Quyen", action: "just recorded incoming stock", detail: "worth 0", time: "5 days ago" },
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
      <section className="dashboard-content-shell dashboard-grid">
        <div>
          <article className="card">
            <h2 className="card-title">Sales performance</h2>
            <div className="metric-grid">
              <div className="metric-col">
                <div className="metric-item">
                  <span className="metric-icon blue">$</span>
                  <div>
                    <div className="metric-label">Revenue</div>
                    <div className="metric-value">17,302,800</div>
                    <div className="metric-sub">1 invoice</div>
                  </div>
                </div>
                <div className="metric-item">
                  <span className="metric-icon green">+</span>
                  <div>
                    <div className="metric-label">Net revenue</div>
                    <div className="metric-value">290.05%</div>
                    <div className="metric-sub">Compared with yesterday</div>
                  </div>
                </div>
              </div>
              <div className="metric-divider" />
              <div className="metric-col">
                <div className="metric-item">
                  <span className="metric-icon orange">R</span>
                  <div>
                    <div className="metric-label">Returns</div>
                    <div className="metric-value">0</div>
                  </div>
                </div>
                <div className="metric-item">
                  <span className="metric-icon red">-</span>
                  <div>
                    <div className="metric-label">Net revenue</div>
                    <div className="metric-value">-21.79%</div>
                    <div className="metric-sub">Compared with the same period last month</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="row-between">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>
                  Net revenue
                </h2>
                <span className="badge-value">82,519,500</span>
              </div>
              <select className="select" defaultValue="This month">
                <option>This month</option>
              </select>
            </div>
            <div className="tabs">
              <div className="tab active">By day</div>
              <div className="tab">By hour</div>
              <div className="tab">By weekday</div>
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
                <h2 className="card-title top-ten-title">Top 10 best-selling products</h2>
                <div className="top-ten-filters">
                  
                  <select className="select" defaultValue="This month">
                    <option>This month</option>
                  </select>
                </div>
              </div>
              <HorizontalChart items={topProducts} max={80} ticks={productTicks} />
            </article>

            <article className="card top-ten-card">
              <div className="row-between">
                <h2 className="card-title top-ten-title">Top 10 customers by spending</h2>
                <select className="select" defaultValue="This month">
                  <option>This month</option>
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
                  <div className="utility-title">Payments</div>
                  <div className="utility-sub">Set up free QR payments</div>
                </div>
              </div>
              <span>{">"}</span>
            </div>
            <div className="divider" />
            <div className="utility-item">
              <div className="utility-left">
                <span className="utility-icon">V</span>
                <div>
                  <div className="utility-title">Business loans</div>
                  <div className="utility-sub">Secure funding today, grow stronger tomorrow</div>
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
                  There is 1 unusual
                  <br />
                  login activity to review.
                </div>
              </div>
              <span>v</span>
            </div>

            <div className="divider" />
            <div className="activity-title">Recent activity</div>

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

              
            </div>
          </article>
        </aside>
      </section>
  );
}
