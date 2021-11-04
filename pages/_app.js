import "../styles/globals.css";
import { AppContext } from "../context/context";
import { useReducer } from "react";
import { defaultState } from "../context/defaultState";
import { reducer } from "../context/reducer";
import React from "react";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
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
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0.5,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AppContext.Provider>
    </React.StrictMode>
  );
}

export default MyApp;
