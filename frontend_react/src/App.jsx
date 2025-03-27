import { AuthProvider } from "./contexts/authContext";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
