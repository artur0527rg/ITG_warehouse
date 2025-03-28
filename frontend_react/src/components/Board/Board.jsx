import { useEffect, useState } from "react";
import useAuthApi from "../../utils/useAuthApi";
import Header from "./Header/Header";
import Search from "./Search/Search";
import Storage from "./Storage/Storage";
import "./board.css";
import OrderProvider from "../../contexts/OrderProvider";

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
    <OrderProvider>
      <div className="board">
        <Header selectedZone={selectedZone} selectZone={selectZone} />
        <Search />
        {currentZone && <Storage zone={currentZone} />}
      </div>
    </OrderProvider>
  );
};

export default Board;
