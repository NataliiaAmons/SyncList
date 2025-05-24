import "./styles/global.css";
import "./styles/color-scheme.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/weather-widget.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="body bg-neutral">
      <Header></Header>
      <div className="content">
        <Weather></Weather>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
