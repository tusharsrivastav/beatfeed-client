import React from "react";
import { useState } from "react";

// Components
import CardList from "../components/cardList";
import FilterList from "../components/filterList";

function Home() {
  const [filter, setFilter] = useState("recent");
  const [showWithCover, setShowWithCover] = useState(false);

  const handleCoverToggle = () => {
    setShowWithCover(!showWithCover);
  };

  const handleFilterChange = (filterFromChild) => {
    setFilter(filterFromChild);
  };
  

  return (
    <>
      <FilterList
        filter={filter}
        sendFilterToParent={handleFilterChange}
        showWithCover={showWithCover}
        handleCoverToggle={handleCoverToggle}
      />
      <CardList
        filter={filter}
        showWithCover={showWithCover}
      />
    </>
  );
}

export default Home;
