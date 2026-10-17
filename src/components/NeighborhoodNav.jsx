import { Link } from "react-router-dom";
import { neighborhoods } from "../data/bars";

export default function NeighborhoodNav() {
  return (
    <div className="neighborhood-nav">
      <span className="nav-label">Browse</span>
      <div className="neighborhood-links">
        {neighborhoods.map((n) => (
          <Link key={n} to={`/neighborhood/${encodeURIComponent(n)}`}>{n}</Link>
        ))}
      </div>
    </div>
  );
}   