import React, { useState } from "react";
import Header from "./components/header";
import CardList from "./components/cardList";
import Footer from "./components/footer";
import FilterList from "./components/filterList";

const App = () => {
  const[filter, setFilter] = useState('upcoming');
  const[searchQuery, setSearchQuery] = useState('');
  const [showWithCover, setShowWithCover] = useState(false);

  const handleCoverToggle = () => {
    setShowWithCover(!showWithCover);
  }

  const handleFilterChange = (filterFromChild) => {
    setFilter(filterFromChild);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  return (
    <>
      <Header query={searchQuery} sendQueryToParent={handleSearch} />
      <FilterList filter={filter} sendFilterToParent={handleFilterChange} showWithCover={showWithCover} handleCoverToggle={handleCoverToggle} />
      <CardList query={searchQuery} filter={filter} showWithCover={showWithCover} />
      <Footer />
    </>
  );
};

export default App;
