import { useEffect, useState } from "react";
import useAuthApi from "../../utils/useAuthApi";
import Header from "./Header/Header";
import Storage from "./Storage/Storage";

const Board = () => {
  const [selectedZone, selectZone] = useState();
  const [currentZone, setCurrentZone] = useState();
  const apiClient = useAuthApi();

  useEffect(() => {
    const fetchZone = async () => {
      const zone = await apiClient(`zones/${selectedZone}`);
      setCurrentZone(zone.data);
    };
    if (selectedZone) {
      fetchZone();
    }
  }, [selectedZone]);

  return (
    <div className="board">
      <Header selectedZone={selectedZone} selectZone={selectZone} />
      {currentZone && <Storage zone={currentZone}/>}
    </div>
  );
};

export default Board;
