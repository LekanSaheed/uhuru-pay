import DashBoardAside from "./DashBoardAside";
import DashBoardHeader from "./DashBoardHeader";
import { useGlobalContext } from "../context/context";
import classes from "./DashBoardWrapper.module.css";
import MainWrapper from "./MainWrapper";

const DashBoardWrapper = ({ children }) => {
  const { isToggled } = useGlobalContext();
  return (
    <div className={classes.container}>
      <aside
        className={`${classes.side_nav} ${isToggled ? classes.shrink_nav : ""}`}
      >
        <DashBoardAside />
      </aside>
      <main
        className={`${classes.main} ${isToggled ? classes.shrink_main : ""}`}
      >
        <DashBoardHeader />
        <MainWrapper>{children}</MainWrapper>
      </main>
    </div>
  );
};

export default DashBoardWrapper;
