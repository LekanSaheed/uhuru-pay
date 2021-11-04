import classes from "./DashBoardMain.module.css";
import Cards from "./Cards";
import Wallet from "./Wallet";
import GridCard from "./GridCard";
import Graph from "./Graph";
const DashBoardMain = () => {
  return (
    <div className={classes.main}>
      <span>WELCOME USER</span>
      <div className={classes.cont}>
        <Cards />
        <div>
          <Wallet />
        </div>
      </div>
      <GridCard />
      <Graph />
    </div>
  );
};
export default DashBoardMain;
