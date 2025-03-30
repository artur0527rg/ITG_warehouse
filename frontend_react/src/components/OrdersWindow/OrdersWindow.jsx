import { useState, useRef, useEffect } from "react";
import useAuthApi from "../../utils/useAuthApi";
import "./OrdersWindow.css";
import AddOrderButton from "./AddOrderButton/AddOrderButton";

const OrdersWindow = () => {
  const timeoutId = useRef();
  const apiClient = useAuthApi();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getOrders = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      const response = await apiClient.get(`/orders/`, {
        params: {
          search: searchQuery,
          ordering: "-bordero",
        },
      });
      setOrders(response.data);
    }, 1200);
  };

  useEffect(() => {
    getOrders();
  }, [searchQuery]);

  const deleteOrder = async (orderId) => {
    try {
      await apiClient.delete(`/orders/${orderId}/`);
      setSearchQuery("");
    } catch (error) {
      console.err("Failed to delete order:", error);
    }
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-window">
      <div className="search-column">
        <div className="search-input-group">
          <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="items-container">
          {orders.map((order) => (
            <div
              className="order-item"
              key={order.id}
              style={{ backgroundColor: `#${order.color}` }}
              onClick={() => {
                deleteOrder(order.id);
              }}
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

export default OrdersWindow;
