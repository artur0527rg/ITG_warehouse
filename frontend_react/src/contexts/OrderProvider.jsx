import { useContext, createContext, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState();
  

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );

};

export default OrderProvider;

export const useOrder = () => {
  return useContext(OrderContext);
};