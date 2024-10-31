import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "./artistCard";
import { useSearchContext } from "../../hooks/useSearchContext";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ArtistsList = () => {
  const [artistsData, setArtistsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { searchQuery } = useSearchContext();

  const location = useLocation();

  useEffect(() => {
    const getArtists = async () => {
      setArtistsData([]);
      setLoading(true);
      setError(null);

      // get all artists
      if (location.pathname === "/artists") {
        const response = await axios.get(`${API_URL}/api/v1/artists/`);
        setArtistsData(response.data.data.artists);
        setLoading(false);
      }
      // get only followed artists
      else if (location.pathname === "/followed-artists") {
        try {
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
          setLoading(false);
        } catch (error) {
          if (error.status === 404) {
            setError("Not following any artists");
          } else {
            console.log(error);
          }
          setLoading(false);
        }
      }
    };
    getArtists();
  }, [location.pathname]);

  // SEARCH
  const filteredArtistsData = artistsData.filter((artist) => {
    return artist.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-wrap justify-center mt-8 min-h-2/5">
      {artistsData &&
        artistsData.length !== 0 &&
        filteredArtistsData.length !== 0 &&
        filteredArtistsData.map((artist, key) => (
          <ArtistCard key={key} artist={artist} />
        ))}
      {!artistsData ||
        filteredArtistsData.length === 0 && !loading && (
          <div className="text-beige mt-10">No artists found</div>
        )}
      {loading && (
        <div className="text-beige mt-10">Loading...</div>
      )}
    </div>
  );
};

export default ArtistsList;
