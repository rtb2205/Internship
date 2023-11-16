import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminPanel from "./AdminPanel";

import MyToast from "./Components/MyToast";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          {/* <Route path="/Authorization" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
