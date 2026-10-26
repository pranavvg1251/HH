
import { useEffect, useMemo, useState } from "react";
import "../styles/Dashboard.css";

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export default function Dashboard() {
  const username = sessionStorage.getItem("hh-admin-username");

  const [bars, setBars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingIds, setUpdatingIds] = useState([]);

  // Load all bars, including hidden bars, for the dashboard.
  useEffect(() => {
    async function loadBars() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/admin/bars`);

        if (!response.ok) {
          throw new Error("Could not load bars. Please check the backend.");
        }

        const data = await response.json();

        setBars(
          data.map((bar) => ({
            ...bar,
            visible: bar.visible !== false,
          }))
        );
      } catch (err) {
        setError(err.message || "Something went wrong while loading bars.");
      } finally {
        setLoading(false);
      }
    }

    loadBars();
  }, []);

  // Search by bar name or neighbourhood.
  const filteredBars = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bars.filter(
      (bar) =>
        bar.name.toLowerCase().includes(query) ||
        bar.neighborhood.toLowerCase().includes(query)
    );
  }, [bars, search]);

  const visibleCount = bars.filter((bar) => bar.visible).length;
  const hiddenCount = bars.length - visibleCount;

  // Save visibility changes through the backend API.
  async function toggleVisibility(bar) {
    const nextVisible = !bar.visible;

    setUpdatingIds((ids) => [...ids, bar.id]);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/api/admin/bars/${bar.id}/visibility`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visible: nextVisible }),
        }
      );

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));

        throw new Error(
          result.message || `Could not update ${bar.name}.`
        );
      }

      const updatedBar = await response.json();

      setBars((currentBars) =>
        currentBars.map((item) =>
          item.id === bar.id
            ? { ...item, visible: updatedBar.visible }
            : item
        )
      );
    } catch (err) {
      setError(err.message || "Could not save the visibility setting.");
    } finally {
      setUpdatingIds((ids) => ids.filter((id) => id !== bar.id));
    }
  }

  return (
    <main className="admin-dashboard">
      {/* Welcome message at the top */}
      <section className="dashboard-welcome">
        <p className="admin-dashboard-eyebrow">5PM MUMBAI</p>

        <h1>Welcome, {username || "Admin"}!</h1>

        <p>Manage which bars appear on your website.</p>
      </section>

      {/* Dashboard heading and statistics */}
      <header className="admin-dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>Manage your bars and their visibility.</p>
        </div>

        <div className="admin-dashboard-stats">
          <div className="admin-dashboard-count">
            <span>{visibleCount}</span>
            <small>Visible bars</small>
          </div>

          <div className="admin-dashboard-count">
            <span>{hiddenCount}</span>
            <small>Hidden bars</small>
          </div>
        </div>
      </header>

      {/* Bar management */}
      <section className="bar-management">
        <div className="bar-management-heading">
          <div>
            <h2>Bar management</h2>
            <p>
              Turn visibility on or off to control which bars appear
              on the public website.
            </p>
          </div>

          <input
            className="bar-search"
            type="search"
            placeholder="Search bars or neighbourhoods..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search bars or neighbourhoods"
          />
        </div>

        {error && (
          <p className="dashboard-error" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p className="dashboard-message">Loading bars...</p>
        ) : filteredBars.length === 0 ? (
          <p className="dashboard-message">
            {bars.length === 0
              ? "No bars are available."
              : "No bars match your search."}
          </p>
        ) : (
          <div className="bar-table-wrap">
            <table className="bar-table">
              <thead>
                <tr>
                  <th>Bar name</th>
                  <th>Neighbourhood</th>
                  <th>Visibility</th>
                </tr>
              </thead>

              <tbody>
                {filteredBars.map((bar) => {
                  const updating = updatingIds.includes(bar.id);

                  return (
                    <tr key={bar.id}>
                      <td className="bar-name">{bar.name}</td>

                      <td>{bar.neighborhood}</td>

                      <td>
                        <div className="bar-visibility">
                          <button
                            type="button"
                            className={`visibility-toggle ${
                              bar.visible ? "is-on" : "is-off"
                            }`}
                            role="switch"
                            aria-checked={bar.visible}
                            aria-label={`Make ${bar.name} ${
                              bar.visible ? "hidden" : "visible"
                            }`}
                            disabled={updating}
                            onClick={() => toggleVisibility(bar)}
                          >
                            <span className="visibility-toggle-knob" />
                          </button>

                          <span
                            className={
                              bar.visible ? "status-on" : "status-off"
                            }
                          >
                            {updating
                              ? "Saving..."
                              : bar.visible
                              ? "Visible"
                              : "Hidden"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
