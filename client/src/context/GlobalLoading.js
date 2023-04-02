import { createContext, useContext, useState } from "react";

const GlobalLoadingContext = createContext();

const GlobalLoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <GlobalLoadingContext.Provider value={[globalLoading, setGlobalLoading]}>
      {children}
    </GlobalLoadingContext.Provider>
  );
};

const useGlobalLoading = () => useContext(GlobalLoadingContext);

export { useGlobalLoading, GlobalLoadingProvider };
