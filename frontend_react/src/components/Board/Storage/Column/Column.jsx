import Unit from "./Unit/Unit";
import "./column.css";

const Column = ({ line }) => {
  const places = line.places.sort((a, b)=>a.position - b.positon);
  const getCapacity = (line) => {
    let usedPlaces = 0;
    let totalPlaces = 0;
    line.places.forEach((place) => {
      if (place.pallet) {
        usedPlaces++;
      }
      totalPlaces++;
    });
    let lineStatus;
    if (totalPlaces !== usedPlaces) {
      lineStatus = "🟡 Partial";
    } else if (totalPlaces === usedPlaces) {
      lineStatus = "🔴 Full";
    } else {
      lineStatus = "🟢 Free";
    }

    lineStatus += ` (${usedPlaces} /  ${totalPlaces})`;
    return lineStatus;
  };

  return (
    <div className="column-container">
      <div className="column-info">
        <div className="column-name">{line.name}</div>
        <div className="column-capacity">{getCapacity(line)}</div>
      </div>
      <div className="column-units">
        {places.map((place)=>(
          <Unit place={place} key={place.id}/>
        ))}
      </div>
    </div>
  );
};

export default Column;
