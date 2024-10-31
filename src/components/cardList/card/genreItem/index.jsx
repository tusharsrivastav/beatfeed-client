import React from "react";

const GenreItem = ({ genre }) => {
  return <div className="border border-blue flex items-center text-sm md:text-xs rounded-full mt-2 mr-2 py-1 px-3 text-blue">{genre}</div>;
};

export default GenreItem;
