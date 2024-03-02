import { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ListItem from "../Products/ListItems/ListItem";


const SearchBox = ({setSearch}) => {
  const history = useHistory();
  const { search: queryString } = useLocation();
  const [search, setSearch1] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {

    const queryParams = new URLSearchParams(history.location.search).get(
      "search"
    );
    setSearch1(queryParams || "");

  }, [queryString]);

  const handleInput = (e) => {
    setSearch1(e.target.value);
  };

 const handleFormSubmission = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch(
       "https://fpweb-2024-default-rtdb.firebaseio.com/home_shoes.json"
     );
     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     const data = await response.json();
     const filteredResults = Object.values(data).filter((item) =>
       item.title.toLowerCase().includes(search.toLowerCase())
     );

     setResults(filteredResults);
     setSearch1("");

     // Push to '/result' URL
     history.push("/result");
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };

setSearch(results);
  return (
    <Fragment>
      <form onSubmit={handleFormSubmission}>
        <input
          name="search"
          type="text"
          id="search"
          placeholder="Enter product name, category"
          value={search}
          onChange={handleInput}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
      </form>
      {/* <div className="product-list--wrapper">
          {results.map((result) => {
            return <ListItem key={result.id} data={result} />;
          })}
        </div> */}
      {/* <ul> */}
      {/* {results.map((item) => (
        <ListItem key={item.id} data={item} />
        // <li key={index}>{result.title}</li>
      ))} */}
      {/* </ul> */}
    </Fragment>
  );
};

export default SearchBox;
