import React, { useState } from "react";
import "./filterList.css";

const FilterList = ({ filter, sendFilterToParent, showWithCover, handleCoverToggle }) => {
  return (
    <div className="filter-wrapper">
      <div className="primary-filters">
        <div
          className={`filter ${
            filter === "upcoming" ? "filter-active" : ""
          } poppins-regular cur-po`}
          onClick={() => {
            sendFilterToParent("upcoming");
          }}>
          Upcoming Releases
        </div>
        <div
          className={`filter ${
            filter === "last30days" ? "filter-active" : ""
          } poppins-regular cur-po`}
          onClick={() => {
            sendFilterToParent("last30days");
          }}>
          Last 30 days
        </div>
      </div>

      {/* <div className="secondary-filters">
        
      </div> */}

      <label className="poppins-light">
        <input
          type="checkbox"
          checked={showWithCover}
          onChange={handleCoverToggle}
        />
        Show Only Albums with Cover Image
      </label>
    </div>
  );
};

export default FilterList;
