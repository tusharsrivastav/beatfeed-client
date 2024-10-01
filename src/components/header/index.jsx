import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Dropdown from "../dropdown";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <div className="header-wrapper">
      <div className="logo poppins-bold">
        <Link to="/">Tushar1</Link>
      </div>

      {user && (
        <>
          <ul className="navlinks-wrapper nav-left poppins-regular">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/artists">Artists</Link>
            </li>
          </ul>
          <Dropdown />
        </>
      )}

      {!user && (
        <ul className="navlinks-wrapper nav-right poppins-regular">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="signup-btn">
              Signup
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
