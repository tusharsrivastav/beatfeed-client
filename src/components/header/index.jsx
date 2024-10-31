import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Dropdown from "../dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSignOut } from "@fortawesome/free-solid-svg-icons";

const linkItemStyle = ({ isActive }) =>
  `text-base my-1 text-white hover:bg-charcoal px-5 py-2 block rounded-md text-end
  ${isActive ? "bg-charcoal" : ""}`;

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const dummyAvatar =
  "data:image/png;base64,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";

  const handleMenuToggle = () => {
    setIsMenuOpen((prevValue) => !prevValue);
  };

  // logout handler
  const handleLogout = async () => {
    console.log("logging out...");
    logout();
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex px-0 py-7 md:py-12 items-center justify-between">
      <div>
        <NavLink
          to="/"
          className="no-underline text-white text-2xl lg:text-3xl font-sans font-semibold">
          BeatFeed
        </NavLink>
      </div>

      {/* if user exists, show navlinks and profile dropdown */}
      {user && (
        <>
          {/* navlinks on larger screens */}
          <ul className="list-none hidden md:flex m-0 items-center space-x-6">
            <li>
              <NavLink to="/" className="text-white hover:opacity-80">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/artists" className="text-white hover:opacity-80">
                Artists
              </NavLink>
            </li>
            <li>
              <Dropdown />
            </li>
          </ul>

          {/* hamburger menu on smaller screens */}
          <FontAwesomeIcon
            icon={faBars}
            size="xl"
            className="block md:hidden text-white"
            onClick={handleMenuToggle}
          />
          {/* sidebar menu */}
          <div
            className={`flex flex-col justify-between h-dvh fixed bg-gray-dark right-0 top-0 px-6 w-4/5 md:hidden ${
              isMenuOpen ? "block" : "hidden"
            }`}>
            {/* navlinks */}
            <ul>
              <li className="flex justify-end text-white">
                <FontAwesomeIcon
                  icon={faTimes}
                  size="2xl"
                  className="mt-7 mb-5 mx-5"
                  onClick={handleMenuToggle}
                />
              </li>
              <li>
                <NavLink
                  to="/"
                  className={linkItemStyle}
                  onClick={handleMenuToggle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/artists"
                  className={linkItemStyle}
                  onClick={handleMenuToggle}>
                  Artists
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/followed-artists"
                  className={linkItemStyle}
                  onClick={handleMenuToggle}>
                  Followed Artists
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={linkItemStyle}
                  onClick={handleMenuToggle}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={linkItemStyle}
                  onClick={handleMenuToggle}>
                  Settings
                </NavLink>
              </li>
            </ul>
            {/* Profile and Logout */}
            <div>
              <button
                className="text-red text-lg w-full text-end p-2 my-4 rounded-md box-border cursor-pointer hover:opacity-80"
                onClick={handleLogout}>
                Logout
                <FontAwesomeIcon icon={faSignOut} size="lg" className="ml-4" />
              </button>
              <div className="text-white flex items-center justify-end border-t border-charcoal p-3 space-x-3">
                <p>{user.fullname}</p>
                <img
                  src={user.avatar === "" ? dummyAvatar : user.avatar}
                  className="size-14 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* if user doesn't exist, show login, signup buttons */}
      {!user && (
        <ul className="font-sans list-none m-0 items-center flex">
          <li>
            <NavLink
              to="/login"
              className="text-base text-white mr-3 lg:text-base lg:mr-6 hover:opacity-85">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="bg-blue text-white text-base px-3 py-2 rounded-md lg:text-base lg:px-4 lg:py-2.5 hover:opacity-85">
              Signup
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
