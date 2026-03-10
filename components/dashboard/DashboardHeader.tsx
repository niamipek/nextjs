export function DashboardHeader() {
  return (
    <header className="top-header">
      <div className="brand">
        <span className="brand-shape" />
        <span className="brand-shape second" />
        <span>KLTN</span>
      </div>
      <div className="header-actions">
        <span className="icon-dot">i</span>
        <span className="icon-dot">?</span>
        <span className="icon-dot">o</span>
        <span className="flag" />
        <span>Tieng Viet</span>
        <span>v</span>
        <span>CFG</span>
        <span className="avatar" />
      </div>
    </header>
  );
}
