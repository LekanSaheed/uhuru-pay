import classes from "./DashBoardMain.module.css";
import Cards from "./Cards";
import Wallet from "./Wallet";
import GridCard from "./GridCard";
import Graph from "./Graph";
import MainWrapper from "./MainWrapper";
import { baseUrl } from "../context/baseUrl";
import React from "react";
const DashBoardMain = () => {
  React.useEffect(() => {}, []);
  return (
    <MainWrapper>
      <span>WELCOME USER</span>
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
