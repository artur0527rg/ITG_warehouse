import Sidebar from "../components/Sidebar/Sidebar";
import "./warehouse.css";
import Board from "../components/Board/Board";
import OrderProvider from "../contexts/OrderProvider";

const Warehouse = () => {
  return (
    <div className="app">
      <OrderProvider>
        <Sidebar />
        <Board />
      </OrderProvider>
    </div>
  );
};

export default Warehouse;
