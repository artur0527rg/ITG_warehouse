import { useEffect, useState, useNavigate } from "react";
import "./CreateOrder.css";
import { CirclePicker } from "react-color";
import useAuthApi from '../../../utils/useAuthApi'

const CreateOrder = () => {
  const apiClient = useAuthApi()
  const [form, setForm_] = useState({
    name:'',
    vsa:0,
    bordero:0,
    color:'',
  })

  const setForm = (key, value) => {
    setForm_(prev => {
      const newValue = value ?? '';
      if (key === 'name') return { ...prev, name: newValue.slice(0, 5) };
      if (key === 'bordero') return { ...prev, bordero: parseInt(newValue.slice(0, 6)) || 0 };
      if (key === 'vsa') return { ...prev, vsa: parseInt(newValue.slice(0, 5)) || 0 };
      if (key === 'color') return { ...prev, color: newValue.slice(1) };
      return prev;
    });
  };

  const createOrder = async () => {
    try{
      await apiClient.post('/orders/', form)
      setForm_({
        name:'',
        vsa:0,
        bordero:0,
        color:'',
      })
    } catch (error) {
      console.err("Failed to create order:", error);
    }
  }

  return (
    <div className="create-order-container">
      <div className="create-order-row">
        <label htmlFor="bordero-input" className="create-order-lable">
          Name:
        </label>
        <input
          id="name-input"
          placeholder="Order name (e.g., UPSXX, LET)"
          type="text"
          className="create-order-input"
          value={form.name}
          onChange={(e)=>setForm('name', e.target.value)}
        />
      </div>
      <div className="create-order-row">
      <label htmlFor="bordero-input" className="create-order-lable">
        Bordero:
      </label>
      <input
        id="bordero-input"
        placeholder="Border number (e.g., 617654)"
        type="number"
        className="create-order-input"
        value={form.bordero}
        onChange={(e)=>setForm('bordero', e.target.value)}
      />
      </div>
      <div className="create-order-row">
      <label htmlFor="vsa-input" className="create-order-lable">
        VSA:
      </label>
      <input
        id="vsa-input"
        placeholder="VSA number (e.g., 47322)"
        type="number"
        className="create-order-input"
        value={form.vsa}
        onChange={(e)=>setForm('vsa', e.target.value)}
      />
      </div>
      <div className="create-order-row">
      <label htmlFor="bordero-input" className="create-order-lable">
        Color:
      </label>
      <CirclePicker onChange={(color)=>setForm('color', color.hex)}/>
      </div>
      <div className="create-order-row">
        <button className="create-order-button" onClick={createOrder}>Create</button>
      </div>
    </div>
  );
};

export default CreateOrder;
