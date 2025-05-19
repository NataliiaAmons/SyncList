import "./styles/global.css";
import "./styles/color-scheme.css";
import "./styles/header.css";
import "./styles/footer.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="body">
      <Header></Header>
      <div className="content"></div>
      <Footer></Footer>
    </div>
  );
}

export default App;
