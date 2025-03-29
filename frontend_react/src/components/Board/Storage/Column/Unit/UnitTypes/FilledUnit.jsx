import useAuthApi from "../../../../../../utils/useAuthApi";

const FilledUnit = ({ pallet }) => {
  const apiClient = useAuthApi();

  const onClickHandler = async () => {
    await apiClient.delete(`/pallets/${pallet.id}/`);
  };

  const order = pallet.order;
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
