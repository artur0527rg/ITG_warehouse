import Column from './Column/Column'
import './storage.css'

const Storage = ({zone}) => {
  const lines = zone.lines.sort((a, b) => a.position - b.position);
  return (
    <div id="storage-container" className="storage-container">
      {lines.map((line)=>(
        <Column line={line} key={line.id}/>
      ))}
    </div>
  )
}

export default Storage