import React from "react";

import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useGlobalContext } from "../context/context";
import classes from "./MobileMenu.module.css";
import { Box } from "@mui/system";
import { MdClose } from "react-icons/md";
import Link from "next/link";
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
                <motion.div>
                  {asideContents.map((nav, id) => {
                    return (
                      <div key={id} className={classes.aCompartment}>
                        <div className={classes.category_name}>
                          {" "}
                          {nav?.text}
                        </div>

                        <div className={classes.link_cont}>
                          {nav?.dropdown?.map((drop, id) => {
                            return (
                              <Link key={id} href={`dashboard${drop.link}`}>
                                {drop.text}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
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
