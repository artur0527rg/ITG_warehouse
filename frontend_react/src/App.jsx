import  AuthProvider  from "./contexts/AuthProvider";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./routes/Login";
import Board from "./routes/Board";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Board/>}/>
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
