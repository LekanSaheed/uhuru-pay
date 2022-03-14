import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import { useGlobalContext } from "../context/context";
import classes from "./Home.module.css";
import DashBoard from "./dashboard";
import Login from "./login";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  const { isUser, setUser } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [aUser, setAUser] = useState(null);

  useEffect(() => {
    if (isUser) {
      setAUser(true);
      setLoading(false);
    } else {
      setAUser(false);
      setLoading(false);
    }
  }, [isUser]);

  if (!loading) {
    return <div>{aUser ? <DashBoard /> : <Login />}</div>;
  } else {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          left: "0",
          bottom: "0",
          width: "100%",
          color: "#4bc2bc",
        }}
      >
        <AiOutlineLoading3Quarters className={classes.loader} />
      </div>
    );
  }
};
export default Home;
