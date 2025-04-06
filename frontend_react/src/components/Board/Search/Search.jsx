import { useState } from "react";
import { useBoard } from "../../../contexts/BoardProvider";
import searchIcon from "../../../assets/icons/search.svg";
import crossIcon from "../../../assets/icons/cross.svg";
import SearchWindow from "./SearchWindow/SearchWindow";
import "./search.css";

const Search = () => {
  const [popup, setPopup] = useState(false);
  const { selectedOrder, selectOrder } = useBoard();
  return (
    <>
      {popup && <SearchWindow setPopup={setPopup} />}
      <div
        className={`search-button ${selectedOrder && "active-order"}`}
        onClick={() => {
          if (selectedOrder) {
            selectOrder();
          } else {
            setPopup(true);
          }                  
        }}
      >
        <img
          className="search-image"
          src={selectedOrder ? crossIcon : searchIcon}
          alt=""
        />
      </div>
    </>
  );
};

export default Search;
