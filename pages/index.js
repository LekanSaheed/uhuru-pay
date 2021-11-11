import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import { useGlobalContext } from "../context/context";
import { defaultState } from "../context/defaultState";
import { reducer } from "../context/reducer";
import DashBoard from "./dashboard";
import Login from "./login";

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
    return <div>loading..</div>;
  }
};
export default Home;
