import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.logOut();
  }, [auth]);

  return <Navigate to="/login" replace />;
};

export default Logout;