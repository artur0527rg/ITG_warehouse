const FilledUnit = ({pallet}) => {
  const order = pallet.order;
  return (
    <div style={{"backgroundColor": "#"+  order.color}} className="column-unit">
      <span className="column-unit-title">{order.name}</span>
      <span className="column-unit-bordero">{order.bordero}</span>
      <span className="column-unit-shipment">{order.vsa}</span>
    </div>
  );
};

export default FilledUnit;
