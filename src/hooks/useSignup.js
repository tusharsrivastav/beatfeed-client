import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import axios from "axios";
import { actions } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (formData) => {
    // reset loading and error to initial state whenever signup hook is called
    setIsLoading(true);
    setError(null);

    console.log("registering...");

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // include cookies with request
        }
      );

      // console.log(response);
      const user = response.data.data.user;
      // storing user data from server in authContext
      dispatch({ type: actions.LOGIN, payload: user });
      // redirect to login page after successful signup
      navigate("/");
    } catch (err) {
      //   console.log(err);
      setError(err.response.data.message);
    } finally {
      console.log("User registered!");
      setIsLoading(false); // set loading to false after login process is complete
    }
  };

  return { signup, isLoading, error };
};
