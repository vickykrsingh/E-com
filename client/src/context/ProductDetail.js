import { createContext, useContext, useState } from "react";

const DetailContext = createContext();

const DetailProvider = ({ children }) => {
  const [detail, setDetail] = useState([]);

  return (
    <DetailContext.Provider value={[detail, setDetail]}>
      {children}
    </DetailContext.Provider>
  );
};

const useDetail = () => useContext(DetailContext);

export { useDetail, DetailProvider };
