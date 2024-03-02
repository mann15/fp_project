import React, { useState } from "react";
import "../../styles/filter.css"

const FilterT = ({ onPriceRangeChange, handleSizeChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApplyFilter = () => {
    let min = 0;
    let max = Infinity;
    min = parseFloat(minPrice);
    max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      onPriceRangeChange(min, max);
    }
  };

  const [selectedSize, setSelectedSize] = useState("");

  const handleSelectSize = (e) => {
    setSelectedSize(e.target.value);
    handleSizeChange(e.target.value);
  };

  // Generate size options from 3 to 15
  const sizeOptions = [];
  for (let i = 3; i <= 15; i++) {
    sizeOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <>
    <div className="filter-container">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleApplyFilter}>Apply Filter</button>
      </div>
      <div className="filter-container">
      <label htmlFor="Size" id ='size'>Size:</label>
      <select value={selectedSize} onChange={handleSelectSize}>
        <option value="">All Sizes</option>
        {sizeOptions}
      </select>
    </div>
    </>
  );
};

export default FilterT;
