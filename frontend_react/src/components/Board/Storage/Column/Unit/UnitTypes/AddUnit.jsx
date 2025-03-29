import { useOrder } from "../../../../../../contexts/OrderProvider";
import useAuthApi from "../../../../../../utils/useAuthApi";
import addIcon from "../../../../../../assets/icons/add.svg";

const AddUnit = ({ placeId }) => {
  const apiClient = useAuthApi();
  const { order } = useOrder();

  const addUnitHandler = async () => {
    try {
      await apiClient.post("/pallets/", {
        place: placeId,
        order: order.id,
      });
    } catch (error) {
      console.error("Failed to add pallet:", error);
    }
  };

  return (
    <div className="column-blank-unit" onClick={addUnitHandler}>
      <img className="column-blank-unit-image" src={addIcon} alt="" />
    </div>
  );
};

export default AddUnit;
