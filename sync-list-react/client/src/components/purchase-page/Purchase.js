import React, { useEffect, useState } from "react";
import "../../styles/global.css";
import "../../styles/color-scheme.css";
import "../../styles/header.css";
import "../../styles/footer.css";
import "../../styles/purchase-list.css";
import PurchaseHeader from "./PurchaseHeader";
import PurchaseItem from "./PurchaseItem";
import AddItemForm from "./AddItemForm";
import { useParams } from "react-router-dom";

function Purchase() {
  const [info, setInfo] = useState({});
  const [members, setMembers] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [userId, setUserId] = useState();

  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  const { purchase_id } = useParams();
  //const user = user_id;
  const id = purchase_id;
  //console.log(user, id);

  const [seenAddItemForm, setSeenAddItemForm] = useState(false);
  function toggleAddItemForm() {
    setSeenAddItemForm(!seenAddItemForm);
  }

  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:5000/purchase/${id}`, {
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
        setInfo(response.info);
        setMembers(response.members);
        setUserItems(response.userItems);
        setOtherItems(response.otherItems);

        setUserId(response.user_id);
        setLoading(false);
        console.log(info, members, userItems, otherItems, userId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [userId, id]);

  return (
    <div>
      {loading ? (
        <div className="bg-light"></div>
      ) : forbidden ? (
        <div>403 Forbidden</div>
      ) : (
        <div>
          <PurchaseHeader info={info} members={members}></PurchaseHeader>
          <div className="purchase-tasks">
            <ul className="all-tasks">
              <div className="all-tasks-header bg-secondary border-gray shadow-light-gray-corner">
                <span className="list-name text-dark">All products</span>
                <button
                  className="add-product-button bg-support"
                  onClick={toggleAddItemForm}
                >
                  Add product
                </button>
                {seenAddItemForm ? (
                  <AddItemForm
                    toggleForm={toggleAddItemForm}
                    purchase_id={id}
                    refresh={fetchData}
                  />
                ) : null}
              </div>
              {otherItems.map((item) => {
                return (
                  <PurchaseItem
                    key={item.id_item}
                    item={item}
                    user_id={userId}
                    refresh={fetchData}
                  ></PurchaseItem>
                );
              })}
            </ul>
            <ul className="claimed-tasks">
              <div className="claimed-tasks-header bg-primary border-gray shadow-light-gray-corner">
                <span className="list-name text-neutral">Claimed products</span>
              </div>
              {userItems.map((item) => {
                return (
                  <PurchaseItem
                    key={item.id_item}
                    item={item}
                    user_id={userId}
                    item_id={item.id_item}
                    refresh={fetchData}
                  ></PurchaseItem>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Purchase;
