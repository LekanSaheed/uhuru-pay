import classes from "./DashBoardMain.module.css";
import Cards from "./Cards";
import Wallet from "./Wallet";
import GridCard from "./GridCard";
import Graph from "./Graph";
import MainWrapper from "./MainWrapper";
import React from "react";
import { useGlobalContext } from "../context/context";
const DashBoardMain = () => {
  React.useEffect(() => {}, []);
  const { user } = useGlobalContext();
  console.log(user);
  return (
    <MainWrapper>
      <span className={classes.name}>
        WELCOME {user && user.stakeholder.name.toUpperCase()}
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
