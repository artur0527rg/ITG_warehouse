import { NavLink } from "react-router-dom";
import itgLogo from "../../assets/images/itg-logo.jpeg";
import warehouseIcon from "../../assets/icons/warehouse.svg";
import truckIcon from "../../assets/icons/truck.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-section">
        <img className="logo" src={itgLogo} alt="" />
      </div>
      <div className="middle-section">
        <NavLink to="/board" className="nav-button-container">
          <img
            className="nav-button-image"
            src={warehouseIcon}
            alt="Warehouse"
          />
          <span className="nav-button-text">Warehouse</span>
        </NavLink>
        <NavLink to="/orders" className="nav-button-container">
          <img className="nav-button-image" src={truckIcon} alt="Truck" />
          <span className="nav-button-text">Orders</span>
        </NavLink>
      </div>
      <div className="bottom-section">
        <NavLink to="/logout" className="nav-button-container">
          <img className="nav-button-image" src={logoutIcon} alt="LogOut" />
          <span className="nav-button-text">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
