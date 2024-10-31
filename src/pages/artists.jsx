import React from "react";
import ArtistsList from "../components/artistsList";
import SearchBar from "../components/searchBar";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Artists = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const pageTitle =
    location.pathname === "/artists"
      ? "All Artists"
      : location.pathname === "/followed-artists"
      ? "Followed Artists"
      : "";

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full md:px-6">
        <h3 className="text-white font-sans text-lg font-semibold">
          {pageTitle}{" "}
          {location.pathname === "/followed-artists"
            ? `(${user?.followedArtists.length})`
            : ""}
        </h3>
        <SearchBar />
      </div>
      <ArtistsList />
    </div>
  );
};

export default Artists;
