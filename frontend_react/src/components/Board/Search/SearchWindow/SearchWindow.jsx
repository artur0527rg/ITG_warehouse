import { useState, useRef } from "react";
import crossIcon from "../../../../assets/icons/cross.svg";
import useAuthApi from "../../../../utils/useAuthApi";
import "./searchwindow.css";
import { useOrder } from "../../../../contexts/OrderProvider";

const SearchWindow = ({ setPopup }) => {
  const timeoutId = useRef();
  const [orders, setOrders] = useState([]);
  const {order, setOrder } = useOrder();
  const apiClient = useAuthApi();

  const searchBordero = async (query) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      const orders = await apiClient.get(`/orders/?search=${query}`);
      setOrders(orders.data);
    }, 1200);
  };

  const selectOrder = (order) => {
    clearTimeout(timeoutId.current);
    setPopup(false);
    setOrder(order);
  };

  return (
    <div className="search-window">
      <div className="search-column">
        <div className="close-popup-button" onClick={() => setPopup(false)}>
          <img className="close-pupup-image" src={crossIcon} />
        </div>
        <div className="search-input-groupp">
          <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="search-input"
            onChange={(e) => searchBordero(e.target.value)}
          />
        </div>

        <div className="items-container">
          {orders.map((order) => (
            <div
              className="order-item"
              key={order.id}
              style={{ backgroundColor: `#${order.color}` }}
              onClick={() => {selectOrder(order)}}
            >
              <span className="name">Name: {order.name}</span>
              <span className="bordero">Bordero: {order.bordero}</span>
              <span className="vsa">VSA: {order.vsa}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchWindow;
