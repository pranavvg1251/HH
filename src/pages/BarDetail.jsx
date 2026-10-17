import { useParams, Link } from "react-router-dom";
import { bars } from "../data/bars";
import { useHH } from "../hooks/useHH";

export default function BarDetail() {
  const { id } = useParams();
  const bar = bars.find((b) => b.id === Number(id));
  const { isHHNow } = useHH();

  if (!bar) return <div className="bar-detail"><p>Bar not found. <Link to="/">← Back</Link></p></div>;

  return (
    <div className="bar-detail">
      <p className="breadcrumb"><Link to="/">← Back to all bars</Link></p>

      <p className="bar-address">{bar.address} · <a href="#" className="bar-website">Website →</a></p>

      <div className="bar-header">
        <h1 className="bar-name">{bar.name}</h1>
        {bar.verified && <span className="verified-badge">Verified HH</span>}
        {isHHNow(bar) && <span className="hh-now-badge">● HH NOW</span>}
      </div>

      <p className="bar-meta">{bar.type} · ★ {bar.rating} · {bar.neighborhood}</p>

      <div className="hh-block">
        <h2>Happy Hour</h2>
        {bar.happyHours.map((hh, i) => (
          <div key={i} className="hh-row">
            <span className="hh-days">{hh.days}</span>
            <span className="hh-time">{hh.start}–{hh.end}</span>
          </div>
        ))}
      </div>

      <div className="deals-block">
        <h2>Deals</h2>
        <p>{bar.deals}</p>
      </div>

      {bar.food && (
        <div className="food-block">
          <h2>Food</h2>
          <p>{bar.food}</p>
        </div>
      )}

      <button className="btn-report" onClick={() => alert("Thanks! We'll verify this info.")}>
        🚩 Report Incorrect Info
      </button>
    </div>
  );
}   