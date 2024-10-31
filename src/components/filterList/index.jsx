import React from "react";

const FilterList = ({ filter, sendFilterToParent, showWithCover, handleCoverToggle }) => {

  return (
    <div className="w-full grid grid-cols-1 auto-cols-auto my-6">
      <div className="w-fit justify-self-center flex">
        <div
          className={`h-9 py-5 px-6 text-sm text-white box-border rounded-full flex items-center cursor-pointer ${
            filter === "recent" ? "bg-blue transition-colors" : ""
          }`}
          onClick={() => {
            sendFilterToParent("recent");
          }}>
          Recent
        </div>
        <div
          className={`h-9 py-5 px-6 text-sm text-white box-border rounded-full flex items-center cursor-pointer ${
            filter === "upcoming" ? "bg-blue transition-colors" : ""
          }`}
          onClick={() => {
            sendFilterToParent("upcoming");
          }}>
          Upcoming
        </div>
      </div>

      {/* <label className="poppins-light">
        <input
          type="checkbox"
          checked={showWithCover}
          onChange={handleCoverToggle}
        />
        Only Show Albums with Cover Image
      </label> */}
    </div>
  );
};

export default FilterList;
