import { useState } from "react";
import Header from './Header/Header'

const Board = () => {
  const [ currentZone, setZone ] = useState();
  console.log(currentZone)

  return (
    <div className="board">
      <Header currentZone={currentZone} setZone={setZone}/>
    </div>
  );
};

export default Board;
