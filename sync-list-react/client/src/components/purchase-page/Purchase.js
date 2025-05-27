import React, { useEffect, useState } from "react";
import "../../styles/global.css";
import "../../styles/color-scheme.css";
import "../../styles/header.css";
import "../../styles/footer.css";
import "../../styles/purchase-list.css";
import Header from "../Header";
import Footer from "../Footer";
import PurchaseHeader from "./PurchaseHeader";
import PurchaseItem from "./PurchaseItem";
import AddItemForm from "./AddItemForm";
import { useParams } from "react-router-dom";

function Purchase() {
  const [info, setInfo] = useState({});
  const [members, setMembers] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user_id, purchase_id } = useParams();
  const user = user_id;
  const id = purchase_id;
  console.log(user, id);

  const [seenAddItemForm, setSeenAddItemForm] = useState(false);
  function toggleAddItemForm() {
    setSeenAddItemForm(!seenAddItemForm);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/${user}/purchase/${id}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setInfo(response.info);
        setMembers(response.members);
        setUserItems(response.userItems);
        setOtherItems(response.otherItems);
        setLoading(false);
        console.log(info, members, userItems, otherItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user, id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="body bg-neutral">
          <Header></Header>
          <div className="content">
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
                    />
                  ) : null}
                </div>
                {otherItems.map((item) => {
                  return (
                    <PurchaseItem
                      key={item.id_item}
                      item={item}
                      user_id={user}
                    ></PurchaseItem>
                  );
                })}
              </ul>
              <ul className="claimed-tasks">
                <div className="claimed-tasks-header bg-primary border-gray shadow-light-gray-corner">
                  <span className="list-name text-neutral">
                    Claimed products
                  </span>
                </div>
                {userItems.map((item) => {
                  return (
                    <PurchaseItem
                      key={item.id_item}
                      item={item}
                      user_id={user}
                      item_id={item.id_item}
                    ></PurchaseItem>
                  );
                })}
              </ul>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default Purchase;
