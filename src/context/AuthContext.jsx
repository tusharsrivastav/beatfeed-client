import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_FOLLOWED_ARTISTS: "UPDATE_FOLLOWED_ARTISTS",
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        user: {
          avatar: action.payload?.avatar,
          username: action.payload.username,
          fullname: action.payload.fullname,
          email: action.payload.email,
          followedArtists: action.payload.followedArtists,
        },
      };

    case actions.LOGOUT:
      return { user: null };

    case actions.UPDATE_FOLLOWED_ARTISTS:
      return {
        ...state,
        user: {
          ...state.user,
          followedArtists: action.payload,
        },
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: undefined,
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Load user on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
        const response = await axios.get(`${API_URL}/api/v1/users/profile`, {
          withCredentials: true,
        });

        // if user exists, then save in context
        dispatch({ type: actions.LOGIN, payload: response.data.data.user });

        if (location.pathname === "/login") {
          navigate("/"); // redirect to home page after login
        }
      } catch (error) {
        // if access token expires, then get a new access token
        console.log("Not Authenticated: ", error);
        try {
          // get new access token
          const response = await axios.post(
            `${API_URL}/api/v1/users/refresh-token`,
            {
              withCredentials: true,
            }
          );

          dispatch({ type: actions.LOGIN, payload: response.data.data.user });
          if (location.pathname === "/login") {
            navigate("/"); // redirect to home page after login
          }
        } catch (error) {
          // logout if refresh token is expired or invalid
          if (error.response.status === 401 || error.response.status === 404) {
            dispatch({ type: actions.LOGOUT });
            if (
              location.pathname !== "/login" &&
              location.pathname !== "/signup" &&
              location.pathname !== "/"
            ) {
              navigate("/login"); // Navigate to login only if not already there
            }
          } else {
            console.log("An unexpected error occured. ", error);
          }
        }
      }
    };

    loadUser();
  }, []);

  // console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
