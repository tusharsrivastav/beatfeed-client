import React from "react";
import GenreItem from "./genreItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Card = ({ albumInfo }) => {
  const releaseDate = albumInfo.releaseDate;
  const artistName = albumInfo.artists;
  const albumTitle = albumInfo.title;
  const albumCoverUrl = albumInfo.coverUrl;
  const genre = albumInfo.genres;
  const label = albumInfo.labels;
  const links = albumInfo.links;

  // Extract month and date as integers
  const monthString = releaseDate.match(/[a-zA-Z]+/)[0];
  const dateInt = parseInt(releaseDate.match(/\d+/)[0], 10);
  const yearInt = parseInt(releaseDate.match(/\b\d{4}\b/)[0], 10);

  // Map month string to month number (assuming English month names)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthInt = months.findIndex(
    (month) => month.toLowerCase() === monthString.toLowerCase()
  );

  // Create a new Date object using the extracted month and date
  const releaseDateObj = new Date();
  releaseDateObj.setFullYear(yearInt); // Set year
  releaseDateObj.setMonth(monthInt); // Set month (0-indexed)
  releaseDateObj.setDate(dateInt); // Set date

  const year = releaseDateObj.getFullYear();
  const month = releaseDateObj.toLocaleString("default", { month: "long" });
  const date = releaseDateObj.getDate();

  const formatArtistName = (artistName) => {
    if (artistName.length === 0) return "";
    if (artistName.length === 1) return artistName[0];
    if (artistName.length === 2) return `${artistName[0]} and ${artistName[1]}`;

    return `${artistName.slice(0, -1).join(", ")}, and ${
      artistName[artistName.length - 1]
    }`;
  };

  const formattedArtistName = formatArtistName(artistName);

  return (
    <div className="bg-charcoal rounded-xl flex flex-col box-border py-5 px-4 md:py-6 md:px-5 m-4 md:m-6 w-[256px] md:w-[200px]">
      <img
        src={
          albumCoverUrl === ""
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRf0hb13fLusfo_P50OtW_fQX8pkSsMwOt9GWvzhTDVw&s"
            : albumCoverUrl
        }
        className="w-full rounded-xl shadow-cover mb-1"
      />

      <div className="mt-5 md:mt-3 mb-2">
        <div className="text-md md:text-xs text-beige font-sans font-medium">{`${month} ${date}, ${year}`}</div>
        <div className="text-lg text-white mt-4 mb-1 font-sans font-medium">{albumTitle}</div>
        <div className="text-base text-beige-light font-light">{formattedArtistName}</div>
      </div>

      <div className="flex flex-wrap">
        {genre &&
          genre.map((item, key) => {
            return <GenreItem genre={item} key={key} />;
          })}
      </div>

      <div>
        {links.length > 0 &&
          links.map((link, key) => {
            if (link.url !== "") {
              return (
                <a href={link.url} className="text-spotify-green text-xl md:text-base" target="_blank" key={key}>
                  <FontAwesomeIcon icon={faSpotify} size="xl" className="mt-6" />
                </a>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Card;
