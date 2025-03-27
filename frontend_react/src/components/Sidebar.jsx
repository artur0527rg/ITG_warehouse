import { NavLink } from "react-router-dom";
import itg_logo from "../assets/images/itg-logo.jpeg";
import warehouse_icon from "../assets/icons/warehouse.svg";
import truck_icon from "../assets/icons/truck.svg";
import logout_icon from "../assets/icons/logout.svg";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div class="sidebar">
      <div class="top-section">
        <img class="logo" src={itg_logo} alt="" />
      </div>
      <div class="middle-section">
        <NavLink to="/board" className="nav-button-container">
          <img
            class="nav-button-image"
            src={warehouse_icon}
            alt="Warehouse"
          />
          <span class="nav-button-text">Warehouse</span>
        </NavLink>
        <NavLink to="/orders" className="nav-button-container">
          <img class="nav-button-image" src={truck_icon} alt="Truck" />
          <span class="nav-button-text">Orders</span>
        </NavLink>
      </div>
      <div class="bottom-section">
        <NavLink to="/logout" className="nav-button-container">
          <img class="nav-button-image" src={logout_icon} alt="LogOut" />
          <span class="nav-button-text">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
