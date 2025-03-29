import BlankUnit from './UnitTypes/BlankUnit';
import AddUnit from './UnitTypes/AddUnit';
import FilledUnit from './UnitTypes/FilledUnit';
import { useOrder } from '../../../../../contexts/OrderProvider'
import './unit.css'

const Unit = ({ place }) => {
  const pallet = place.pallet;
  const {order} = useOrder();

  let unitToShow;

  if (!pallet && !order){
    unitToShow = <BlankUnit/>
  } else if (!pallet && order){
    unitToShow = <AddUnit placeId={place.id} key={place.id}/>
  } else if (pallet && !order) {
    unitToShow = <FilledUnit pallet={pallet} key={place.id}/>
  } else if (pallet && order) {
    if (pallet.order.id === order.id){
      unitToShow = <FilledUnit pallet={pallet} key={place.id}/>
    } else if (pallet.order.id !== order.id) {
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