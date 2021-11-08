import DashBoardAside from "./DashBoardAside";
import DashBoardHeader from "./DashBoardHeader";

import classes from "./DashBoardWrapper.module.css";
import MainWrapper from "./MainWrapper";
const DashBoardWrapper = ({ children }) => {
  return (
    <div className={classes.container}>
      <aside className={classes.side_nav}>
        <DashBoardAside />
      </aside>
      <main className={classes.main}>
        <DashBoardHeader />
        <MainWrapper>{children}</MainWrapper>
      </main>
    </div>
  );
};

export default DashBoardWrapper;
