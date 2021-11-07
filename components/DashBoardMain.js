import classes from "./DashBoardMain.module.css";
import Cards from "./Cards";
import Wallet from "./Wallet";
import GridCard from "./GridCard";
import Graph from "./Graph";
import MainWrapper from "./MainWrapper";
import React from "react";
import { useGlobalContext } from "../context/context";
const DashBoardMain = () => {
  const { user } = useGlobalContext();
  return (
    <MainWrapper>
      <span className={classes.name}>
        WELCOME {user !== null ? user.name : "USER"}
      </span>
      <div className={classes.cont}>
        <Cards />
        <div>
          <Wallet />
        </div>
      </div>
      <GridCard />
      <Graph />
    </MainWrapper>
  );
};
export default DashBoardMain;
