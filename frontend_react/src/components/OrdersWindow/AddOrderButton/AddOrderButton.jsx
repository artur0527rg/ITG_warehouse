import { useState } from "react";
import addIcon from '../../../assets/icons/add.svg'
import './addorderbutton.css'

const AddOrderButton = ({onClick}) => {

  return (
    <div className="add-button" onClick={onClick}>
      <img className="add-image" src={addIcon} alt="Plus icon"/>
    </div>
  )
}

export default AddOrderButton