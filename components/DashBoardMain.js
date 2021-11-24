import classes from "./DashBoardMain.module.css";
import Cards from "./Cards";
import Wallet from "./Wallet";
import GridCard from "./GridCard";
import Graph from "./Graph";
import MainWrapper from "./MainWrapper";
import React from "react";
import { useGlobalContext } from "../context/context";
import { motion } from "framer-motion";
import TimeFilter from "./TimeFilter";
const DashBoardMain = () => {
  const { user } = useGlobalContext();
  const contVariant = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.3,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <MainWrapper>
      <motion.div variants={contVariant}>
        <TimeFilter />
        <span className={classes.name}>
          Welcome {user !== null ? user.name : "USER"}
        </span>
        <div className={classes.cont}>
          <Cards />
          <div>
            <Wallet />
          </div>
        </div>
        <GridCard />
        <Graph />
      </motion.div>
    </MainWrapper>
  );
};
export default DashBoardMain;
