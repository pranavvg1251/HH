
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NeighborhoodNav() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = "https://hhbackend-e2oz.onrender.com";

  useEffect(() => {
    const controller = new AbortController();

    async function loadNeighborhoods() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/neighborhoods`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load neighborhoods.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected neighborhoods API response.");
        }

        setNeighborhoods(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load neighborhoods.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadNeighborhoods();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="neighborhood-nav">
        <span className="nav-label">Browse</span>
        <span>Loading neighborhoods...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="neighborhood-nav">
        <span className="nav-label">Browse</span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="neighborhood-nav">
      <span className="nav-label">Browse</span>

      <div className="neighborhood-links">
        {neighborhoods.map((n) => (
          <Link
            key={n}
            to={`/neighborhood/${encodeURIComponent(n)}`}
          >
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
}
