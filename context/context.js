import React, { useContext } from "react";

const AppContext = React.createContext();

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, useGlobalContext };
