import BlankUnit from './UnitTypes/BlankUnit';
import AddUnit from './UnitTypes/AddUnit';
import FilledUnit from './UnitTypes/FilledUnit';
import { useBoard } from '../../../../../contexts/BoardProvider'
import './unit.css'

const Unit = ({ place }) => {
  const {selectedOrder, pallets, orders} = useBoard();
  const pallet = pallets.find(pallet=>pallet.place===place.id)
  const palletOrder = orders.find(order=>order.id===pallet?.order)

  let unitToShow;
  
  if (!pallet && !selectedOrder){
    unitToShow = <BlankUnit/>
  } else if (!pallet && selectedOrder){
    unitToShow = <AddUnit placeId={place.id} key={place.id}/>
  } else if (pallet && !selectedOrder) {
    unitToShow = <FilledUnit pallet={pallet} key={place.id}/>
  } else if (pallet && selectedOrder) {
    if (palletOrder.id === selectedOrder.id){
      unitToShow = <FilledUnit pallet={pallet} key={place.id}/>
    } else if (palletOrder.id !== selectedOrder.id) {
      unitToShow = <BlankUnit/>
    }
  }

  return (
    <>
      {unitToShow}
    </>
  );
};

export default Unit;