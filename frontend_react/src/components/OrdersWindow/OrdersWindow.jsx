import { useState } from "react";
import PopupButton from "./PopupButton/PopupButton";
import OrdersList from "./OrdersList/OrdersList";
import CreateOrder from "./CreateOrder/CreateOrder";
import './OrdersWindow.css'

const OrdersWindow = () => {
  const [isCreateOrderMode, setIsCreateOrderMode] = useState(false)

  return <div className="orders-window">
    <PopupButton clicked={isCreateOrderMode} onClick={()=>setIsCreateOrderMode(prev=>!prev)}/>
    {isCreateOrderMode ? (
      <CreateOrder/>
    ) : (
      <OrdersList/>
    )}

  </div>;
};

export default OrdersWindow;
