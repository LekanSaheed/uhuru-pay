import "../styles/globals.css";
import { AppContext } from "../context/context";
import { useReducer } from "react";
import { defaultState } from "../context/defaultState";
import { reducer } from "../context/reducer";

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const toggleDropdown = (aside) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: aside });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleDropdown,
      }}
    >
      
      {" "}
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
