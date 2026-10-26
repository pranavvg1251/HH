
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATIC_USERS = [
  {
    username: "Pranav",
    password: "pranav1230",
  },
  {
    username: "Divya",
    password: "pranav1230",
  },
  {
    username: "Isha",
    password: "pranav1230",
  },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

        const matchedUser = STATIC_USERS.find(
        (user) =>
            user.username === username.trim() &&
            user.password === password
        );

        if (matchedUser) {
        sessionStorage.setItem("hh-admin-logged-in", "true");
        sessionStorage.setItem("hh-admin-username", matchedUser.username);

        navigate("/9OIUqWFqnk/dashboard", {
            replace: true,
        });
        } else {
        setError("Incorrect username or password. Please try again.");
        }
    }

  return (
    <div className="login-shell">
      <section className="login-visual" aria-label="Brand introduction">
        <div className="login-visual-overlay" />

        <a className="login-brand" href="/" aria-label="5PM Mumbai home">
          <span className="login-brand-icon">5</span>
          <span>
            <strong>5PM</strong>
            <small>MUMBAI</small>
          </span>
        </a>

        <div className="login-visual-content">
          <span className="login-kicker">
            <span className="login-live-dot" />
            THE CITY AFTER HOURS
          </span>

          <h1>
            Good evenings.
            <br />
            <span>Great possibilities.</span>
          </h1>

          <p>
            Your space to manage the places, experiences, and
            moments that make Mumbai come alive.
          </p>

          <div className="login-visual-footer">
            <span>MADE FOR MUMBAI</span>
            <span>EST. 5PM</span>
          </div>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-panel-top">
          <span className="login-mobile-brand">
            <span className="login-brand-icon">5</span>
            5PM MUMBAI
          </span>
          <span className="login-secure-label">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            PRIVATE ACCESS
          </span>
        </div>

        <div className="login-form-wrap">
          <div className="login-heading">
            <span className="login-heading-accent">WELCOME BACK</span>
            <h2>Sign in<span>.</span></h2>
            <p>
              Enter your credentials to access your workspace.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <div className="login-input-wrap">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.5 1.2-1.5 2.6-2.9 3.8M6.2 6.2C3.9 7.7 2.7 10 2.5 12c.7 2.1 4.2 7 9.5 7 1.2 0 2.3-.3 3.3-.8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                <span aria-hidden="true">!</span>
                {error}
              </div>
            )}

            <button className="login-submit" type="submit">
              <span>Access dashboard</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          <div className="login-access-note">
            <span className="login-access-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span>
              <strong>Authorized personnel only</strong>
              <small>This area is reserved for site administrators.</small>
            </span>
          </div>
        </div>

        <footer className="login-panel-footer">
          <span>© {new Date().getFullYear()} 5PM Mumbai</span>
          <span>GOOD TIMES, WELL MANAGED.</span>
        </footer>
      </section>
    </div>
  );
}
