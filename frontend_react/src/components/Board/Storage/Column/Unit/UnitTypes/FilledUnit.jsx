import useAuthApi from "../../../../../../utils/useAuthApi";
import { useBoard } from "../../../../../../contexts/BoardProvider";

const FilledUnit = ({ pallet }) => {
  const apiClient = useAuthApi();
  const { orders } = useBoard();
  const order = orders.find(order => order.id === pallet.order)

  const onClickHandler = async () => {
    await apiClient.delete(`/pallets/${pallet.id}/`);
  };

  return (
    <div
      style={{ backgroundColor: "#" + order.color }}
      className="column-unit"
      onClick={onClickHandler}
    >
      <span className="column-unit-title">{order.name}</span>
      <span className="column-unit-bordero">{order.bordero}</span>
      <span className="column-unit-shipment">{order.vsa}</span>
    </div>
  );
};

export default FilledUnit;
