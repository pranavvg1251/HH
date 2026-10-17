import { useParams, Link } from "react-router-dom";
import { bars } from "../data/bars";
import { useHH } from "../hooks/useHH";
import BarListing from "../components/BarListing";

export default function Neighborhood() {
  const { name } = useParams();
  const { isHHNow } = useHH();
  const decoded = decodeURIComponent(name);
  const localBars = bars.filter((b) => b.neighborhood === decoded);

  return (
    <div className="neighborhood-page">
      <p className="breadcrumb"><Link to="/">← Back to all bars</Link></p>
      <h1 className="page-title">Happy Hour in {decoded} — {localBars.length} Bars</h1>
      <div className="bar-list">
        {localBars.map((bar) => (
          <BarListing key={bar.id} bar={bar} isHH={isHHNow(bar)} />
        ))}
      </div>
    </div>
  );
}   