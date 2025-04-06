import { useContext, createContext, useState } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [selectedOrder, selectOrder] = useState();
  const [lines, setLines] = useState([]);
  const [places, setPlaces] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pallets, setPallets] = useState([]);

  return (
    <BoardContext.Provider
      value={{
        selectedOrder,
        selectOrder,
        lines,
        setLines,
        places,
        setPlaces,
        orders,
        setOrders,
        pallets,
        setPallets,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;

export const useBoard = () => {
  return useContext(BoardContext);
};
