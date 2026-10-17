import { Link } from "react-router-dom";

export default function BarListing({ bar, isHH }) {
  return (
    <Link to={`/bar/${bar.id}`} className="bar-listing">
      <h3 className="bar-name">{bar.name}</h3>
      <div className="bar-sub">
        <span className="bar-address">{bar.address}</span>
        {bar.verified && <span className="verified-badge">Verified HH</span>}
        {isHH && <span className="hh-now-badge">● HH NOW</span>}
      </div>
      <p className="bar-meta">
        {bar.type} · ★ {bar.rating} · {bar.neighborhood}
      </p>
      <div className="bar-hh">
        <span className="hh-label">HH</span>
        <span className="hh-schedule">{bar.happyHours[0].days} · {bar.happyHours[0].start}–{bar.happyHours[0].end}</span>
      </div>
      <p className="bar-deals">{bar.deals}</p>
      {bar.food && <p className="bar-food">{bar.food}</p>}
    </Link>
  );
}   