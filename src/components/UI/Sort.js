import React, { useState } from "react";
import "../../styles/filter.css"

const Sort = ({ handleSort }) => {
  const [sortBy, setSortBy] = useState("");
  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy((prevSortBy) =>
      prevSortBy === selectedSortBy ? "" : selectedSortBy
    );
    handleSort(selectedSortBy);
  };

  return (
    <div className="filter-container">
      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" value={sortBy} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default Sort;
