import React, { useEffect, useState } from "react";
import Card from "./card/index.jsx";
import { sub } from "date-fns";
import "./cardList.css";
import axios from "axios";
// import { musicData } from "../../Data.jsx";

const CardList = ({ query, filter, showWithCover }) => {
  let [albumsData, setAlbumsData] = useState({ message: "", albums: [] });
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  let filteredAlbumsData = [];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/albums")
      .then((response) => {
        // console.log(response.data);
        setAlbumsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching music data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(albumsData.albums);

  // CHECK WHETHER albumsData IS EMPTY
  if (
    !albumsData ||
    !albumsData.albums ||
    albumsData.albums.length === 0
  ) {
    return <div>No music data available.</div>;
  }

  // APPLY FILTERS
  filteredAlbumsData = showWithCover
    ? albumsData.albums.filter((item) => item.coverUrl != "")
    : albumsData.albums;

  if (filter == "upcoming") {
    filteredAlbumsData = filteredAlbumsData.filter((item) => {
      const releaseDate = new Date(item.releaseDate);
      return releaseDate > currentDate && item.title != "TBA";
    })
    .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  } else if (filter == "last30days") {
    filteredAlbumsData = filteredAlbumsData
      .filter((item) => {
        const releaseDate = new Date(item.releaseDate);
        const newDate = sub(new Date(currentDate), { months: 1 });
        return releaseDate < currentDate && releaseDate > newDate;
      })
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
      .reverse();
  }

  // SEARCH
  const searchfilteredAlbumsData = filteredAlbumsData.filter((item) => {
    return (
      item.artists.some((name) => 
        name.toLowerCase().includes(query.toLowerCase())
      ) ||
      item.artists.includes(query.toLowerCase()) ||
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="cards">
      {searchfilteredAlbumsData.map((item, key) => {
        return <Card key={key} albumInfo={item} />;
      })}
    </div>
  );
};

export default CardList;
