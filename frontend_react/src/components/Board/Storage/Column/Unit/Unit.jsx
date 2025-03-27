import BlankUnit from './UnitTypes/BlankUnit';
import FilledUnit from './UnitTypes/FilledUnit';
import './unit.css'

const Unit = ({ place }) => {
  const pallet = place.pallet;

  return (
    <>
    {pallet ? <FilledUnit pallet={pallet}/> : <BlankUnit/>}
    </>
  );
};

export default Unit;
