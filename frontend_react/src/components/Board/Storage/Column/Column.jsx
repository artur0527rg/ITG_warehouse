import Unit from "./Unit/Unit";
import "./column.css";

const Column = ({ line }) => {
  const places = line.places.sort((a, b)=>a.position - b.positon);

  return (
    <div className="column-container">
      <div className="column-info">
        <div className="column-name">{line.name}</div>
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
