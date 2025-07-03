import broomIcon from "../../../assets/icons/broom.svg";
import useAuthApi from "../../../utils/useAuthApi";
import "./CleanButton.css";

const CleanButton = () => {
  const apiClient = useAuthApi();

  const cleanOrders = async () => {
    try {
      const orders = await apiClient.delete(`orders/cleanup/`);
    } catch (error) {
      console.error("Failed to fetch zone:", error);
    }
  };

  return (
    <div className={`clean-button`} onClick={cleanOrders}>
      <img className="clean-button-image" src={broomIcon} alt="Plus icon" />
    </div>
  );
};

export default CleanButton;
