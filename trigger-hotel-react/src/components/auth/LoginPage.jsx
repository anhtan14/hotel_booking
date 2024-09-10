import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import APIService from "../../service/APIService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await APIService.loginUser(email, password);
      if (response.statusCode === 200) {
        localStorage.setItem("token", response.token);
        console.log(response.token);
        localStorage.setItem("role", response.role);
        console.log(response.role);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError("Invalid email or password");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="">Password: </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
