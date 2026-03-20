import Image from "next/image";
import logo from "public/logo.png";

export function DashboardHeader() {
  return (
    <header className="top-header">
      <div className="brand">
        <Image src={logo} alt="Logo" width="85" height="60" />
        
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
