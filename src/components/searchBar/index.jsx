import React, { useContext } from "react";
import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../hooks/useSearchContext.js";

const SearchBar = () => {

  const { setSearchQuery } = useSearchContext();

  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
      <input
        type="text"
        placeholder="Search artists"
        className="search-bar poppins-regular"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
