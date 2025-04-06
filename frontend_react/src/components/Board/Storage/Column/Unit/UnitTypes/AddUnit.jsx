import { useBoard } from "../../../../../../contexts/BoardProvider";
import useAuthApi from "../../../../../../utils/useAuthApi";
import addIcon from "../../../../../../assets/icons/add.svg";

const AddUnit = ({ placeId }) => {
  const apiClient = useAuthApi();
  const { selectedOrder } = useBoard();

  const addUnitHandler = async () => {
    try {
      await apiClient.post("/pallets/", {
        place: placeId,
        order: selectedOrder.id,
      });
    } catch (error) {
      console.error("Failed to add pallet:", error);
    }
  };

  return (

    <div className="column-add-unit" onClick={addUnitHandler}>
      <img className="column-unit-image" src={addIcon} alt="" />
    </div>
  );
};

export default AddUnit;
