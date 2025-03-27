import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const auth = useAuth();

  auth.logOut();


  return (
    Navigate('/login')
  );
};

export default Logout;
