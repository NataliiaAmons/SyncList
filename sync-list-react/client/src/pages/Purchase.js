import Purchase from "../components/purchase-page/Purchase";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function LogIn() {
  return (
    <div className="body bg-neutral">
      <Header></Header>
      <div className="content">
        <Purchase />
      </div>
      <Footer></Footer>
    </div>
  );
}
