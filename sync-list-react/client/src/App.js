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
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path={`/purchase`} element={<Purchase />} />
      </Routes>
    </Router>

    /*
    <div className="body bg-neutral">
      <Header></Header>
      <div className="content">
        <div>{data}</div>
        <Weather></Weather>
      </div>
      <Footer></Footer>
    </div>
    */
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
