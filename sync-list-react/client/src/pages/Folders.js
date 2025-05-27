import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/color-scheme.css";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/weather-widget.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Weather from "../components/Weather";
import PurchaseCard from "../components/PurchaseCard";
import { useSearchParams } from "react-router-dom";

function Folders() {
  const [folders, setFolders] = useState({});
  const [withoutFolder, setWithoutFolder] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");

  const query = new URLSearchParams({ user }).toString();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/folders?${query}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setFolders(response.foldersInfo);
        setWithoutFolder(response.withoutFolder);
        setLoading(false);

        console.log("folders", response.foldersInfo);
        console.log("Without folder", response.withoutFolder);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="body bg-neutral">
          <Header></Header>
          <div className="content">
            <div className="container">
              {/* Folders*/}
              <div className="folders-container">
                {/* Without folders*/}
                <div className="purchase-folder">
                  <div className="purchases-container">
                    {withoutFolder.map((purchase) => (
                      <PurchaseCard purchase={purchase} user_id={user} />
                    ))}
                  </div>
                </div>
                {/* Folders*/}
                {folders.map((folder) => (
                  <div className="purchase-folder">
                    <p className="folder-name border-bottom-gray">
                      {folder.name}
                    </p>
                    <div className="purchases-container">
                      {folder.list.map((purchase) => (
                        <PurchaseCard purchase={purchase} user_id={user} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Weather widget */}
              <Weather></Weather>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default Folders;
