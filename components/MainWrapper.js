import classes from "./MainWrapper.module.css";

const MainWrapper = ({ children }) => {
  return <main className={classes.main}>{children}</main>;
};

export default MainWrapper;
