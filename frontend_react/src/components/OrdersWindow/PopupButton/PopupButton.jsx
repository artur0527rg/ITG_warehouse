import addIcon from "../../../assets/icons/add.svg";
import crossIcon from "../../../assets/icons/cross.svg";
import "./PopupButton.css";

const PopupButton = ({ clicked, onClick }) => {
  return (
    <div
      className={`popup-button ${clicked ? "active" : ""}`}
      onClick={onClick}
    >
      <img
        className="popup-button-image"
        src={clicked ? crossIcon : addIcon}
        alt="Plus icon"
      />
    </div>
  );
};

export default PopupButton;
