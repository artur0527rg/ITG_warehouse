import { NavLink } from "react-router-dom";
import itg_logo from "../../assets/images/itg-logo.jpeg";
import warehouse_icon from "../../assets/icons/warehouse.svg";
import truck_icon from "../../assets/icons/truck.svg";
import logout_icon from "../../assets/icons/logout.svg";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-section">
        <img className="logo" src={itg_logo} alt="" />
      </div>
      <div className="middle-section">
        <NavLink to="/board" className="nav-button-container">
          <img
            className="nav-button-image"
            src={warehouse_icon}
            alt="Warehouse"
          />
          <span className="nav-button-text">Warehouse</span>
        </NavLink>
        <NavLink to="/orders" className="nav-button-container">
          <img className="nav-button-image" src={truck_icon} alt="Truck" />
          <span className="nav-button-text">Orders</span>
        </NavLink>
      </div>
      <div className="bottom-section">
        <NavLink to="/logout" className="nav-button-container">
          <img className="nav-button-image" src={logout_icon} alt="LogOut" />
          <span className="nav-button-text">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
