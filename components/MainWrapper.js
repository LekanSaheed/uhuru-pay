import classes from "./MainWrapper.module.css";
import { motion } from "framer-motion";
const MainWrapper = ({ children }) => {
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
    <motion.div variants={contVariant} className={classes.main}>
      {children}
    </motion.div>
  );
};

export default MainWrapper;
