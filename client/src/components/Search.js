import React, { useState } from "react";
import axios from "axios";
import { useSearch } from "../context/SearchContext.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Search() {
  const [values, setValues] = useState("");
  const [searchProduct,setSearchProduct] = useSearch([]);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(`/api/v1/product/search/${values}`);
      if (data?.success) {
        setSearchProduct(data?.products);
        navigate("/search");
      }
    } catch (error) {
      toast.error("Request Timeout")
    }
  };

  return (
    <div className="ml-auto">
      <form
        className="d-flex ms-4 mt-1 mb-1"
        role="search"
        onSubmit={handleSearch}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setValues(e.target.value)}
          value={values}
        />
        <button className="btn btn-outline-warning" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
