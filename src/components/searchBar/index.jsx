import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../hooks/useSearchContext.js";

const SearchBar = () => {

  const { searchQuery, setSearchQuery } = useSearchContext();

  return (
    <div className="rounded-md bg-charcoal pl-4 flex items-center w-full md:w-64 text-beige-light">
      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
      <input
        type="text"
        placeholder="Search artists"
        value={searchQuery}
        className="w-full h-10 px-4 text-sm text-beige bg-charcoal focus:outline-none rounded-md"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
