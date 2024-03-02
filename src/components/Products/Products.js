import React, { useEffect, useState } from "react";
import ListItem from "./ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Filter from "../UI/Filter";
import Sort from "../UI/Sort";
import FilterT from "../UI/FilterT";

const Products = ({ search }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const history = useHistory();
  const { search1 } = useLocation();
  const queryParams = new URLSearchParams(search1).get("search1");
  const [searchQuery, setSearchQuery] = useState(queryParams || "");
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        let urls = [
          "https://fpweb-2024-default-rtdb.firebaseio.com/men_shoes.json",
          "https://fpweb-2024-default-rtdb.firebaseio.com/kids_shoes.json",
          "https://fpweb-2024-default-rtdb.firebaseio.com/women_shoes.json",
        ];

        if (params.category === "home") {
          const responses = await Promise.all(
            urls.map((url) => axios.get(url))
          );
          const data = responses.flatMap((response) => response.data);

          if (!data || data.length === 0) {
            // If no data found, display a message
            setItems([]);
            return;
          }

          const shuffledData = shuffleArray(data);
          const transformedData = shuffledData.map((item, index) => {
            return {
              ...item,
              id: index,
            };
          });
          setItems(transformedData);
        } else {
          let slug = `items.json`;
          if (params.category) {
            slug = `${params.category}_shoes.json`;
          }
          const url = `https://fpweb-2024-default-rtdb.firebaseio.com/${slug}`;
          const response = await axios.get(url, {
            params: { search1: searchQuery },
          });
          const data = response.data;

          if (!data) {
            // handleNotFound();
            return;
          }

          let sortedData = data;
          if (sortBy === "price_low_high") {
            sortedData = data.sort((a, b) => a.price - b.price);
          } else if (sortBy === "price_high_low") {
            sortedData = data.sort((a, b) => b.price - a.price);
          } else if (sortBy === "rating") {
            sortedData = data.sort((a, b) => b.rating - a.rating);
          }

          const transformedData = sortedData.map((item, index) => {
            return {
              ...item,
              id: index,
            };
          });
          setItems(transformedData);

          const filteredData = transformedData.filter(
            (item) =>
              item.discountedPrice >= priceRange.min &&
              item.discountedPrice <= priceRange.max
          );
          setItems(filteredData);
          let filteredSize = data;
          if (selectedSize) {
            filteredSize = data.filter((item) =>
              item.size.includes(selectedSize)
            );
          }
          setItems(filteredSize);
        }
        if (search.length > 0) {
          history.push("/results");
        }
      } catch (error) {
        console.log("Error: ", error);
        alert("Some error occurred");
      } finally {
        setLoader(false);
      }
    }

    fetchItems();
    return () => {
      setItems([]);
      setLoader(true);
    };
  }, [params.category, searchQuery, sortBy, priceRange, selectedSize]);




  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (selectedSortBy) => {
    setSortBy(selectedSortBy);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

 

  const handleFilter = (filters) => {
    const { size } = filters;
    console.log(size);
    // Filter items based on size and price filters
    let filteredItems = items.filter((item) => {
      let sizeMatch =
        size.length === 0 || size.some((s) => item.size.includes(parseInt(s)));
      return sizeMatch;
    });

    setFilteredItems(filteredItems);
    console.log("Filters: ", filters);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

return (
  <>
    {params.category !== "home" && <Sort handleSort={handleSort} />}
    {params.category !== "home" && (
      <FilterT
        onPriceRangeChange={handlePriceRangeChange}
        handleSizeChange={handleSizeChange}
      />
    )}
    <div className="product-list">
      <div className="product-list--wrapper">
        {items.length === 0 ? (
          <p>No data found</p>
        ) : (
          items.map((item) => (
            <ListItem key={item.id} data={item} />
          ))
        )}
      </div>
    </div>
    {loader && <Loader />}
  </>
);
};

export default Products;
