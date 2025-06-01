import React, { useEffect, useState } from "react";
import "../../styles/global.css";
import "../../styles/color-scheme.css";
import "../../styles/header.css";
import "../../styles/footer.css";
import "../../styles/weather-widget.css";
import PurchaseCard from "./PurchaseCard";
import { useParams, Link } from "react-router-dom";

function Folders() {
  const [folders, setFolders] = useState({});
  const [withoutFolder, setWithoutFolder] = useState([]);

  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  const { user_id } = useParams();
  const user = user_id;
  console.log(user);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch(`http://localhost:5000/folders`, {
        method: "GET",
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            console.log(errorData);
            console.error("Access error:", errorData.message);
            setForbidden(true);
            return;
          }
          return res.json();
        })
        .then((response) => {
          if (!response) {
            setLoading(false);
            return;
          }
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
    };
    fetchData();
  }, [user]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : forbidden ? (
        <div>403 Forbidden</div>
      ) : (
        <div className="folders-container">
          {/* Without folders*/}
          <div className="purchase-folder">
            <div className="purchases-container top-container">
              {withoutFolder.map((purchase) => (
                <Link to={`/purchase/${purchase.id_purchase}`}>
                  <PurchaseCard purchase={purchase} />
                </Link>
              ))}
            </div>
          </div>
          {/* Folders*/}
          {folders.map((folder) => (
            <div className="purchase-folder">
              <p className="folder-name border-bottom-gray">{folder.name}</p>
              <div className="purchases-container">
                {folder.list.map((purchase) => (
                  <Link to={`/purchase/${purchase.id_purchase}`}>
                    <PurchaseCard purchase={purchase} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Folders;
