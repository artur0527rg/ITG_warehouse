const FilledUnit = ({pallet}) => {
  const order = pallet.order;
  console.log(order.color);
  return (
    <div style={{"backgroundColor": order.color}} className="column-unit">
      <span className="column-unit-title">{order.description}</span>
      <span className="column-unit-bordero">{order.bordero}</span>
      <span className="column-unit-shipment">{order.vsa}</span>
    </div>
  );
};

export default FilledUnit;
