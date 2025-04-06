import Unit from "./Unit/Unit";
import "./column.css";
import { useBoard } from "../../../../contexts/BoardProvider";

const Column = ({ line }) => {
  let { places, pallets } = useBoard();
  places = places
    .filter((place) => place.line === line.id)
    .sort((a, b) => a.position - b.positon);

  const getCapacity = () => {
    let usedPlaces = 0;
    let totalPlaces = 0;
    places.forEach((place) => {
      if (pallets.find((pallet) => pallet.place === place.id)) {
        usedPlaces++;
      }
      totalPlaces++;
    });
    let lineStatus;
    if (totalPlaces !== 0 && usedPlaces === 0) {
      lineStatus = "🟢 Free";
    } else if (totalPlaces === usedPlaces) {
      lineStatus = "🔴 Full";
    } else {
      lineStatus = "🟡 Partial";
    }

    lineStatus += ` (${usedPlaces} /  ${totalPlaces})`;
    return lineStatus;
  };

  return (
    <div className="column-container">
      <div className="column-info">
        <div className="column-name">{line.name}</div>
        <div className="column-capacity">{getCapacity()}</div>
      </div>
      <div className="column-units">
        {places.map((place) => (
          <Unit place={place} key={place.id} />
        ))}
      </div>
    </div>
  );
};

export default Column;
