import classes from "./ProfileWrapper.module.css";
import { motion } from "framer-motion";
import {
  RiBuilding2Line,
  RiCoinsLine,
  RiLockPasswordLine,
  RiUserLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { useRouter } from "next/router";
import DashBoardWrapper from "./DashBoardWrapper";
import { useGlobalContext } from "../context/context";
const ProfileWrapper = ({ children }) => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const navData = [
    {
      text: "Your Profile",
      icon: <RiUserLine />,
      detail: "View details about your profile here",
      link: "/profile",
    },
    {
      text: "Edit Profile",
      icon: <RiUserSettingsLine />,
      detail: "Edit your profile",
      link: "/profile/edit-profile",
    },
    {
      text: "View Revenues",
      icon: <RiCoinsLine />,
      detail: "View your slated revenues",
      link: "/all-revenues",
      access: "regular",
    },
    {
      text: "Change Password",
      icon: <RiLockPasswordLine />,
      detail: "Manage and change your password here",
      link: "/profile/change-password",
    },
    {
      text: "Bank Details",
      icon: <RiBuilding2Line />,
      detail: "Manage and add bank details here",
      link: "/profile/bank-details",
      access: "regular",
    },
  ];
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
        mass: 0.2,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <DashBoardWrapper>
      <div className={classes.profileWrapper}>
        <motion.nav className={classes.profile_nav}>
          {user.role === "admin"
            ? navData
                .filter(
                  (aNav) =>
                    aNav.access !== "regular" || aNav.access === undefined
                )
                .map((nav, id) => {
                  return (
                    <motion.div
                      onClick={() =>
                        router.push(`/dashboard${nav.link ? nav.link : ""}`)
                      }
                      variants={contVariant}
                      key={id}
                      className={`${classes.nav_flex} ${
                        router.pathname === "/dashboard" + nav.link
                          ? classes.active
                          : ""
                      }`}
                    >
                      <div className={classes.icon}>{nav.icon}</div>
                      <div className={classes.flex_column}>
                        <div className={classes.link_text}>{nav.text}</div>
                        <div className={classes.link_detail}>{nav.detail}</div>
                      </div>
                    </motion.div>
                  );
                })
            : navData
                .filter(
                  (nav) => nav.access === "regular" || nav.access === undefined
                )
                .map((nav, id) => {
                  return (
                    <motion.div
                      onClick={() =>
                        router.push(`/dashboard${nav.link ? nav.link : ""}`)
                      }
                      variants={contVariant}
                      key={id}
                      className={`${classes.nav_flex} ${
                        router.pathname === "/dashboard" + nav.link
                          ? classes.active
                          : ""
                      }`}
                    >
                      <div className={classes.icon}>{nav.icon}</div>
                      <div className={classes.flex_column}>
                        <div className={classes.link_text}>{nav.text}</div>
                        <div className={classes.link_detail}>{nav.detail}</div>
                      </div>
                    </motion.div>
                  );
                })}
        </motion.nav>

        <motion.div className={classes.profileMain}>{children}</motion.div>
      </div>
    </DashBoardWrapper>
  );
};
export default ProfileWrapper;
