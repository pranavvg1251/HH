
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHH } from "../hooks/useHH";
import BarListing from "../components/BarListing";

export default function Neighborhood() {
  const { name } = useParams();
  const { isHHNow } = useHH();

  const decoded = decodeURIComponent(name || "");

  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = "https://hhbackend-e2oz.onrender.com";

  useEffect(() => {
    const controller = new AbortController();

    async function loadBars() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/bars`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Failed to load bars (${response.status})`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The bars API returned an unexpected format.");
        }

        setBars(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load bars.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBars();

    return () => controller.abort();
  }, []);

  const localBars = bars.filter(
    (bar) => bar.neighborhood === decoded
  );

  return (
    <div className="neighborhood-page">
      <p className="breadcrumb">
        <Link to="/">← Back to all bars</Link>
      </p>

      <h1 className="page-title">
        Happy Hour in {decoded}
        {!loading && !error && ` — ${localBars.length} Bars`}
      </h1>

      {loading && <p>Loading bars...</p>}

      {!loading && error && (
        <div className="error-message">
          <p>Couldn't load bars: {error}</p>
          <button onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="bar-list">
            {localBars.map((bar) => (
              <BarListing
                key={bar.id}
                bar={bar}
                isHH={isHHNow(bar)}
              />
            ))}
          </div>

          {localBars.length === 0 && (
            <p className="no-results">
              No bars found in {decoded}.
            </p>
          )}
        </>
      )}
    </div>
  );
}
