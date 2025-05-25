import "./styles/global.css";
import "./styles/color-scheme.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/weather-widget.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Weather from "./components/Weather";
import { useEffect, useState } from "react";

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
    <div>
      <h1>Message from server:</h1>
      <p>{data}</p>
    </div>
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

export default App;
