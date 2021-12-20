import React from "react";

import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useGlobalContext } from "../context/context";
import classes from "./MobileMenu.module.css";
import { Box } from "@mui/system";
import { MdClose } from "react-icons/md";
const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};
const MobileMenu = ({ children }) => {
  const { asideContents, isToggledMobileNav, dispatch } = useGlobalContext();

  return (
    <main>
      <AnimatePresence>
        {isToggledMobileNav && (
          <div className={classes.container}>
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 350,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.2, duration: 0.2 },
              }}
            >
              <motion.div
                className={classes.mobileNav}
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                <Box
                  fontSize="30px"
                  padding="20px"
                  onClick={() => dispatch({ type: "TOGGLE_MOBILE_NAV" })}
                >
                  <MdClose />
                </Box>
                {children}
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MobileMenu;
