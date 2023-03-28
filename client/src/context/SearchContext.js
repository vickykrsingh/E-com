import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchProduct, setSearchProduct] = useState([]);

  return (
    <SearchContext.Provider value={[searchProduct, setSearchProduct]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
