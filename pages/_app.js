import "../styles/globals.css";
import { AppContext } from "../context/context";
import { useReducer } from "react";
import { defaultState } from "../context/defaultState";
import { reducer } from "../context/reducer";
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps, router }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const toggleDropdown = (aside) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: aside });
  };
  const setUser = (profile) => {
    dispatch({ type: "SET_USER", payload: profile });
  };

  React.useEffect(() => {
    // const localUser = JSON.parse(localStorage.getItem("stakeholder"));
    // setUser(localUser);
    // localStorage.removeItem("stakeholder");
  }, []);
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
          <Toaster position="top-center" />
          <Component {...pageProps} />
        </motion.div>
      </AppContext.Provider>
    </React.StrictMode>
  );
}

export default MyApp;
export function getInitialProps() {}
