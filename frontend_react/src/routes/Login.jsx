import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider";
import "./login.css";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (form.username !== "" && form.password !== "") {
      auth.logIn(form);
      navigate('/');
      return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome</h1>
          <p>Enter your login details</p>
        </div>

        <form id="loginForm" onSubmit={handleSubmitEvent}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="footer-links"></div>
      </div>
    </div>
  );
};

export default Login;
