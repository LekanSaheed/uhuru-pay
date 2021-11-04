import "../styles/globals.css";
import { AppContext } from "../context/context";
import { useReducer } from "react";
import { defaultState } from "../context/defaultState";
import { reducer } from "../context/reducer";
import React from "react";
function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const toggleDropdown = (aside) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: aside });
  };
  const setUser = (profile) => {
    dispatch({ type: "SET_USER", payload: profile });
  };
  return (
    <React.StrictMode>
      <AppContext.Provider
        value={{
          ...state,
          toggleDropdown,
          setUser,
        }}
      >
        {" "}
        <Component {...pageProps} />
      </AppContext.Provider>
    </React.StrictMode>
  );
}

export default MyApp;
