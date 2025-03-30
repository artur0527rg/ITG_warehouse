import { useState } from "react";
import { useOrder } from "../../../contexts/OrderProvider";
import searchIcon from "../../../assets/icons/search.svg";
import crossIcon from "../../../assets/icons/cross.svg";
import SearchWindow from "./SearchWindow/SearchWindow";
import "./search.css";

const Search = () => {
  const [popup, setPopup] = useState(false);
  const { order, setOrder } = useOrder();
  return (
    <>
      {popup && <SearchWindow setPopup={setPopup} />}
      <div
        className={`search-button ${order && "active-order"}`}
        onClick={() => {
          if (order) {
            setOrder();
          } else {
            setPopup(true);
          }
        }}
      >
        <img
          className="search-image"
          src={order ? crossIcon : searchIcon}
          alt=""
        />
      </div>
    </>
  );
};

export default Search;
