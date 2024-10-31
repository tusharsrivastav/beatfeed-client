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
      <p className="font-sans font-regular text-2xl text-white m-3">Login</p>
      <form className="text-beige-light md:border md:border-charcoal md:rounded-xl flex flex-col md:w-[600px] box-border items-center px-0 py-3 md:px-20 md:py-7 md:mb-32">
        <div className="w-full mb-2 mt-4 lg:my-5">
          <label htmlFor="username" className="text-md lg:text-base">Email/Username</label>
          <input
            type="text"
            className="border border-charcoal rounded-md w-full bg-black text-white lg:h-12 p-3 box-border focus:outline-none"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="w-full mb-2 mt-4 lg:my-5">
          <label htmlFor="username" className="text-md lg:text-base">Password</label>
          <input
            type="password"
            className="border border-charcoal rounded-md w-full bg-black text-white h-12 p-3 box-border focus:outline-none"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="w-[120px] box-border bg-transparent border border-blue rounded-md text-blue px-5 py-3 text-base cursor-pointer my-12 lg:my-6 opacity-100 hover:opacity-80 disabled:border-charcoal disabled:text-charcoal disabled:hover:opacity-100"
          onClick={handleSubmit}
          disabled={isLoading}>
          Login
        </button>

        {error && <div className="font-sans w-full text-md font-light text-beige bg-red-light border border-red rounded-md my-4 mx-6 py-3 px-6 box-border">{error}</div>}
      </form>
    </>
  );
};

export default Login;
