import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "./artistCard";
import "./artistsList.css";
import { useSearchContext } from "../../hooks/useSearchContext";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ArtistsList = () => {
  const [artistsData, setArtistsData] = useState([]);

  const { searchQuery } = useSearchContext();

  const location = useLocation();

  useEffect(() => {
    const getArtists = async () => {
      // get all artists
      if (location.pathname === "/artists") {
        const response = await axios.get(`${API_URL}/api/v1/artists/`);
        setArtistsData(response.data.data.artists);
      }
      // get only followed artists
      else if (location.pathname === "/followed-artists") {
        const response = await axios.get(
          `${API_URL}/api/v1/artists/followed-artists/`,
          {
            withCredentials: true,
          }
        );
        setArtistsData(
          response.data.data.followedArtists.sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      }
    };
    getArtists();
  }, [location.pathname]);

  // SEARCH
  const filteredArtistsData = artistsData.filter((artist) => {
    return artist.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="artist-cards">
      {artistsData &&
        artistsData.length !== 0 &&
        filteredArtistsData.length !== 0 &&
        filteredArtistsData.map((artist, key) => (
          <ArtistCard key={key} artist={artist} />
        ))}
      {artistsData.length !== 0 && filteredArtistsData.length === 0 && (
        <div className="no-data-error">No artists found</div>
      )}
      {(!artistsData || artistsData.length === 0) && (
        <div className="no-data-error">Loading...</div>
      )}
    </div>
  );
};

export default ArtistsList;
