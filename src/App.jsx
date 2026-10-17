import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Neighborhood from "./pages/Neighborhood";
import BarDetail from "./pages/BarDetail";
import SubmitBar from "./pages/SubmitBar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/neighborhood/:name" element={<Neighborhood />} />
          <Route path="/bar/:id" element={<BarDetail />} />
          <Route path="/submit" element={<SubmitBar />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>5PM Mumbai · Data updated weekly · <a href="#about">About</a> · <a href="/submit">Add a Bar</a></p>
      </footer>
    </BrowserRouter>
  );
}   