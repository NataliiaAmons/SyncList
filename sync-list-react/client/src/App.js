import "./styles/global.css";
import "./styles/color-scheme.css";
import "./styles/header.css";
import "./styles/footer.css";
//import "./styles/weather-widget.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Weather from "./components/Weather";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Purchase from "./pages/Purchase";
import ThemeManager from "./components/ThemeManager";
import Folders from "./pages/Folders";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setData(response.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <ThemeManager />
      <Router>
        <Routes>
          <Route
            className="text-dark"
            path="/"
            element={
              <div className="text-dark">
                <Home data={data} />
              </div>
            }
          />
          <Route
            path={`/purchase`}
            element={
              <div className="text-dark">
                <Purchase />
              </div>
            }
          />
        </Routes>
      </Router>
      <Router>
        <div>
          <Link to="/folders?user=1">View User 1's Folders</Link>
        </div>

        <Routes>
          <Route path="/folders" element={<Folders />} />
        </Routes>
      </Router>
    </>
  );
}

function Home({ data }) {
  return (
    <div>
      <h1>Message from server:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
