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
    <div className="artists-page-wrapper">
      <div className="artists-page-header">
        <h3>
          {pageTitle}{" "}
          {location.pathname === "/followed-artists"
            ? `(${user.followedArtists.length})`
            : ""}
        </h3>
        <SearchBar />
      </div>
      <ArtistsList />
    </div>
  );
};

export default Artists;
