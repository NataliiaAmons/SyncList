import React, { useEffect, useState } from "react";
import "../../styles/global.css";
import "../../styles/color-scheme.css";
import "../../styles/header.css";
import "../../styles/footer.css";
import "../../styles/weather-widget.css";
import Header from "../Header";
import Footer from "../Footer";
import Weather from "./Weather";
import PurchaseCard from "./PurchaseCard";
import { useParams, Link } from "react-router-dom";

function Folders() {
  const [folders, setFolders] = useState({});
  const [withoutFolder, setWithoutFolder] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user_id } = useParams();
  const user = user_id;
  console.log(user);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/${user}/folders`)
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
  }, [user]);

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
                  <div className="purchases-container top-container">
                    {withoutFolder.map((purchase) => (
                      <Link to={`/${user}/purchase/${purchase.id_purchase}`}>
                        <PurchaseCard purchase={purchase} />
                      </Link>
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
                        <Link to={`/${user}/purchase/${purchase.id_purchase}`}>
                          <PurchaseCard purchase={purchase} />
                        </Link>
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
