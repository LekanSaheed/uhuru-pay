import "../styles/globals.css";
import { AppContext } from "../context/context";
import { useReducer, useEffect } from "react";
import { defaultState } from "../context/defaultState";
import { reducer } from "../context/reducer";
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
// import { useRouter } from 'next/router'

// const router = useRouter();

function MyApp({ Component, pageProps, router }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const toggleDropdown = (aside) => {
    dispatch({ type: "TOGGLE_DROPDOWN", payload: aside });
  };
  const setUser = (profile) => {
    dispatch({ type: "SET_USER", payload: profile });
  };
  const toggleProfile = () => {
    dispatch({ type: "TOGGLE_PROFILE" });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const setToken = (token) => {
    dispatch({ type: "SET_TOKEN", payload: token });
  };

  useEffect(() => {
    // document.cookie = "name=saheed; path=/";
    // const cookie = document.cookie;

    // if (localUser !== null) {
    //   setUser(localUser);
    //   router.push("/dashboard");
    // } else {
    //   router.push("/login");
    // }
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser !== null && localUser.name !== null) {
      setUser(localUser);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <React.StrictMode>
      <AppContext.Provider
        value={{
          ...state,
          toggleDropdown,
          toggleProfile,
          setUser,
          logout,
          setToken,
          dispatch,
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
          <Head>
            <title>Uhuru pay - Automated Payment Collection.</title>
          </Head>
          <main>
            <Toaster position="top-center" />
            <Component {...pageProps} />
          </main>
        </motion.div>
      </AppContext.Provider>
    </React.StrictMode>
  );
}

export default MyApp;
export function getInitialProps() {}
