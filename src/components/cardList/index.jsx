import React, { useEffect, useState } from "react";
import Card from "./card/index.jsx";
import { sub } from "date-fns";
import "./cardList.css";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CardList = ({ query, filter, showWithCover }) => {
  const { user } = useAuthContext();
  let [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();

  useEffect(() => {
    const getAlbums = async () => {
      if (user === undefined) {
        return;
      }
      // user ? console.log("user found") : console.log("user not found");
      const albumsRoute = user ? "albums/followed-albums" : "albums/";
      try {
        const response = await axios.get(`${API_URL}/api/v1/${albumsRoute}`, {
          withCredentials: true,
        });

        setAlbumsData(response.data.data.albums);
        // console.log("albums", albumsData);
      } catch {
        (err) => {
          if (err.response.status === 404) {
            setAlbumsData([]);
          }
          console.error("Error fetching music data:", err);
        };
      } finally {
        setLoading(false);
      }
    };

    getAlbums();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(albumsData);

  // CHECK WHETHER albumsData IS EMPTY
  if ((!albumsData || albumsData.length === 0) && user.followedArtists.length > 0) {
    return <div className="no-data-error">No music data available</div>;
  }

  // APPLY FILTERS
  let filteredAlbumsData = [];

  filteredAlbumsData = showWithCover
    ? albumsData.filter((item) => item.coverUrl != "")
    : albumsData;

  if (filter === "upcoming") {
    filteredAlbumsData = filteredAlbumsData
      .filter((item) => {
        const releaseDate = new Date(item.releaseDate);
        return releaseDate > currentDate && item.title != "TBA";
      })
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  } else if (filter === "recent") {
    filteredAlbumsData = filteredAlbumsData
      .filter((item) => {
        const releaseDate = new Date(item.releaseDate);
        const newDate = sub(new Date(currentDate), { months: 1 });
        return releaseDate < currentDate;
      })
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
      .reverse();
  }

  // CHECK WHETHER filteredAlbumsData IS EMPTY
  if (filteredAlbumsData.length === 0) {
    const filterError =
      filter === "upcoming"
        ? "No upcoming music from your favourite artists"
        : "Your favourite artists haven't released any music recently";
    return (<div className="no-data-error">
      {filterError}
      <p>Follow more artists <Link to="/artists">here</Link></p> 
      </div>)
  }


  return (
    <div className="cards">
      {filteredAlbumsData.map((item, key) => {
        return <Card key={key} albumInfo={item} />;
      })}
    </div>
  );
};

export default CardList;
