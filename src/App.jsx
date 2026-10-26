
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Neighborhood from "./pages/Neighborhood";
import BarDetail from "./pages/BarDetail";
import SubmitBar from "./pages/SubmitBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const LOGIN_PATH = "/9OIUqWFqnk";
const DASHBOARD_PATH = `${LOGIN_PATH}/dashboard`;
const AUTH_KEY = "hh-admin-logged-in";

function ProtectedDashboard() {
  const isLoggedIn =
    sessionStorage.getItem(AUTH_KEY) === "true";

  if (!isLoggedIn) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  return <Dashboard />;
}

function AppLayout() {
  const { pathname } = useLocation();

  const isAdminPage =
    pathname === LOGIN_PATH ||
    pathname === DASHBOARD_PATH;

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main className={isAdminPage ? "admin-main" : "main"}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route
            path="/neighborhood/:name"
            element={<Neighborhood />}
          />
          <Route path="/bar/:id" element={<BarDetail />} />
          <Route path="/submit" element={<SubmitBar />} />

          {/* Private admin pages */}
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route
            path={DASHBOARD_PATH}
            element={<ProtectedDashboard />}
          />

          {/* No public /dashboard route */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      {!isAdminPage && (
        <footer className="footer">
          <p>
            5PM Mumbai · Data updated weekly ·{" "}
            <a href="#about">About</a> ·{" "}
            <a href="/submit">Add a Bar</a>
          </p>
        </footer>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
