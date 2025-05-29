import Folders from "../components/all-purchases-page/Folders.js";
import Weather from "../components/all-purchases-page/Weather.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function AllPurchases() {
  return (
    <div className="body bg-neutral">
      <Header></Header>
      <div className="content">
        <div className="container">
          {/* Folders*/}
          <Folders />
          {/* Weather widget */}
          <Weather></Weather>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
