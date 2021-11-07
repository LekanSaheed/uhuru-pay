import classes from "./ProfileBox.module.css";
import { GoPerson } from "react-icons/go";
import { useGlobalContext } from "../context/context";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";
const ProfileBox = () => {
  const { user, toggleProfile, isToggledProfile, logout } = useGlobalContext();

  const router = useRouter();

  return (
    <div className={classes.full_cont}>
      <div onClick={() => toggleProfile()} className={classes.container}>
        <div className={classes.icon}>
          <GoPerson />
        </div>
        <div className={classes.headFlex}>
          <div className={classes.name}>
            {user !== null && user.name !== undefined ? user.name : null}
          </div>
          <div className={classes.role}>
            {user !== null && user.role !== undefined && user.role}
          </div>
        </div>
        <div>
          {isToggledProfile ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      <div
        className={
          isToggledProfile
            ? `${classes.showProfile} ${classes.dropdown}`
            : ` ${classes.dropdown} ${classes.hideProfile}`
        }
      >
        <div style={{ marginBlock: 10 }}>
          <span>
            <FiSettings />
          </span>
          <span>Settings</span>
        </div>
        <div
          onClick={async () => {
            logout();
            await router.push("/login").then(() => {
              logout();
            });
          }}
          style={{ marginBlock: 10 }}
        >
          <span>
            <FiLogOut />
          </span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
