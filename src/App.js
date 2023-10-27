import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import { Navigate } from "react-router-dom";
import Authorization from "./Authorization";

export default function App() {
  localStorage.setItem("admin", true);
  return (
    // <Authorization></Authorization>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminPanel" element={<AdminPanelOrHome />} />
      </Routes>
    </BrowserRouter>
  );

  function AdminPanelOrHome() {
    if (localStorage.getItem("admin") === "true") return <AdminPanel />;
    else return <Navigate replace to="/" />;
  }
}
