import "./styles/global.css";
import "./styles/color-scheme.css";
import "./styles/header.css";
import "./styles/footer.css";
//import "./styles/weather-widget.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Purchase from "./pages/Purchase";
import AllPurchases from "./pages/AllPurchases";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/folders" element={<AllPurchases />} />
        <Route path="/purchase/:purchase_id" element={<Purchase />} />
        <Route path="*" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
