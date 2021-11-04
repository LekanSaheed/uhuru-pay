import { createContext, useContext } from "react";

const AppContext = createContext();

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, useGlobalContext };
