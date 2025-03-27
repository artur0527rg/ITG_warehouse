import  AuthProvider  from "./contexts/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./routes/Login";
import Warehouse from "./routes/Warehouse";
import Orders from "./routes/Orders";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Navigate to={'/board'}/>}/>
          <Route path="/board" element={<Warehouse/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
