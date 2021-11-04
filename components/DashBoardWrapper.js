import DashBoardAside from "./DashBoardAside";
import DashBoardHeader from "./DashBoardHeader";
import DashBoardMain from "./DashBoardMain";
import classes from "./DashBoardWrapper.module.css";
const DashBoardWrapper = ({ children }) => {
  return (
    <div className={classes.container}>
      <aside className={classes.side_nav}>
        <DashBoardAside />
      </aside>
      <main className={classes.main}>
        <DashBoardHeader />
        {children}
      </main>
    </div>
  );
};

export default DashBoardWrapper;
