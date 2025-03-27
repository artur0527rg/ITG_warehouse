import { useState, useEffect } from "react";
import useAuthApi from "../../../utils/useAuthApi";
import "./header.css";

const Header = ({ currentZone, setZone }) => {
  const apiClient = useAuthApi();
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await apiClient.get("/zones");
        const zones = response.data;
        zones.sort((a, b) => a.position - b.position);
        console.log(zones);
        setZones(zones);
        if (zones) {
          setZone(zones[0].id);
        }
      } catch (error) {
        console.error("Zones loading error:", error);
      }
    };
    fetchZones();
  }, []);

  return (
    <div className="header">
      <div className="storage-list">
        {zones.map((zone) => (
          <div
            className={`storage ${zone.id === currentZone ? "active" : ""}`}
            key={zone.id}
            onClick={() => setZone(zone.id)}
          >
            {zone.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
