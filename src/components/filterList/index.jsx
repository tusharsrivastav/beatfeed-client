import React from "react";
import "./filterList.css";

const FilterList = ({ filter, sendFilterToParent, showWithCover, handleCoverToggle }) => {

  return (
    <div className="filter-wrapper">
      <div className="primary-filters">
        <div
          className={`filter ${
            filter === "recent" ? "filter-active" : ""
          } poppins-light cur-po`}
          onClick={() => {
            sendFilterToParent("recent");
          }}>
          Recent
        </div>
        <div
          className={`filter ${
            filter === "upcoming" ? "filter-active" : ""
          } poppins-light cur-po`}
          onClick={() => {
            sendFilterToParent("upcoming");
          }}>
          Upcoming
        </div>
      </div>

      <label className="poppins-light">
        <input
          type="checkbox"
          checked={showWithCover}
          onChange={handleCoverToggle}
        />
        Only Show Albums with Cover Image
      </label>
    </div>
  );
};

export default FilterList;
