import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="navbar">
      <Link to="/" className="logo">5PM MUMBAI</Link>
      <nav className="nav-links">
        <Link to="/" className={pathname === "/" ? "active" : ""}>Browse</Link>
        <Link to="/submit" className={pathname === "/submit" ? "active" : ""}>Add a Bar</Link>
        <a href="#about" className="nav-about">About</a>
      </nav>
    </header>
  );
}   