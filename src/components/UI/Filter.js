import React, { useState } from "react";

const Filter = ({ handleFilter }) => {
  const [sizeFilters, setSizeFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    if (sizeFilters.includes(selectedSize)) {
      setSizeFilters(sizeFilters.filter((size) => size !== selectedSize));
    } else {
      setSizeFilters([...sizeFilters, selectedSize]);
    }
    handleFilter({ size: sizeFilters });
  };

  const handlePriceRangeChange = (e) => {
    const selectedPriceRange = e.target.value;
    if (priceFilters.includes(selectedPriceRange)) {
      setPriceFilters(
        priceFilters.filter((price) => price !== selectedPriceRange)
      );
    } else {
      setPriceFilters([...priceFilters, selectedPriceRange]);
    }
    handleFilter({ price: priceFilters });
  };

  return (
    <div className="filter-container">
      <div>
        <p>Filters:</p>
        <label>Size:</label>
        {[3, 4, 5, 6, 7, 8, 9, 10, 11, , 12, 13, 14, 15, 16].map((size) => (
          <div key={`size_${size}`}>
            <input
              type="checkbox"
              id={`size_${size}`}
              value={size}
              onChange={handleSizeChange}
              checked={sizeFilters.includes(size.toString())}
            />
            <label htmlFor={`size_${size}`}>{size}</label>
          </div>
        ))}
      </div>

      <div>
        <label>Price:</label>
        {[
          "Under ₹500",
          "₹500 - ₹1,000",
          "₹1,000 - ₹2,500",
          "₹2,500 - ₹5,000",
          "Over ₹5,000",
        ].map((priceRange) => (
          <div key={`price_${priceRange}`}>
            <input
              type="checkbox"
              id={`price_${priceRange}`}
              value={priceRange}
              onChange={handlePriceRangeChange}
              checked={priceFilters.includes(priceRange.toString())}
            />
            <label htmlFor={`price_${priceRange}`}>{priceRange}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
