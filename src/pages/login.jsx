import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <>
      <h2 className="poppins-semibold">Login</h2>
      <form id="form-container">
        <div className="input-field-container">
          <label htmlFor="username">Email or Username:</label>
          <input
            type="text"
            className="input-field"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="input-field-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="input-field"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          id="submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}>
          Login
        </button>

        {error && <div className="error poppins-regular">{error}</div>}
      </form>
    </>
  );
};

export default Login;
