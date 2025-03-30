import Sidebar from "../components/Sidebar/Sidebar"
import OrdersWindow from "../components/OrdersWindow/OrdersWindow"
import './orders.css'


const Orders = () => {
  return (<div className="app">
    <Sidebar />
    <OrdersWindow/>
</div>)
}

export default Orders