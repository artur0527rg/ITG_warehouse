import Sidebar from "../components/Sidebar/Sidebar";
import "./warehouse.css";
import Board from "../components/Board/Board";
import BoardProvider from "../contexts/BoardProvider";

const Warehouse = () => {
  return (
    <div className="app">
      <BoardProvider>
        <Sidebar />
        <Board />
      </BoardProvider>
    </div>
  );
};

export default Warehouse;
