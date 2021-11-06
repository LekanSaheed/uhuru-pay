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
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("stakeholder"));
    if (localUser !== null) {
      setUser(localUser);
      setAUser(true);
      setLoading(false);
    } else {
      setAUser(false);
      setLoading(false);
    }
  }, []);

  if (!loading) {
    return <div>{aUser ? <DashBoard /> : <Login />}</div>;
  } else {
    return <div>loading..</div>;
  }
};
export default Home;
