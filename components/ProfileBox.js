import classes from "./ProfileBox.module.css";
import { GoPerson } from "react-icons/go";
import { useGlobalContext } from "../context/context";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, Chip } from "@material-ui/core";
import { BsPatchCheckFill } from "react-icons/bs";
const ProfileBox = () => {
  const {
    user,
    toggleProfile,
    dispatch,
    isToggledMobileNav,
    isToggled,
    logout,
  } = useGlobalContext();

  const router = useRouter();
  const variant = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };

  return (
    <>
      <Link href="/dashboard/profile" className={classes.full_cont}>
        <div onClick={() => toggleProfile()} className={classes.container}>
          <div className={classes.icon}>
            {user.name !== undefined && user.name.charAt(0).toUpperCase()}
          </div>
          <>
            <motion.div
              animate="visible"
              initial="hidden"
              variants={variant}
              className={`${classes.headFlex} ${
                isToggled ? classes.hideText : ""
              } `}
            >
              <div className={classes.name}>
                {user !== null && user.name !== undefined ? user.name : null}
              </div>
              <div className={classes.role}>
                {user !== null && user.role !== undefined && (
                  <Chip
                    avatar={
                      <Avatar
                        style={{
                          background: "#fff",

                          fontSize: "1rem",
                        }}
                      >
                        <BsPatchCheckFill style={{ color: "#4bc2bc" }} />
                      </Avatar>
                    }
                    label={user.role}
                    size="small"
                  />
                )}
              </div>
            </motion.div>
            {/* <div>
            {isToggledProfile ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div> */}
          </>
        </div>
      </Link>
    </>
  );
};

export default ProfileBox;
