import classes from "./ProfileBox.module.css";
import { GoPerson } from "react-icons/go";
import { useGlobalContext } from "../context/context";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const ProfileBox = () => {
  const { user, toggleProfile, isToggledProfile } = useGlobalContext();
  return (
    <div className={classes.full_cont}>
      <div onClick={() => toggleProfile()} className={classes.container}>
        <div className={classes.icon}>
          <GoPerson />
        </div>
        <div className={classes.headFlex}>
          <div className={classes.name}>
            {user !== {} && user.stakeholder.name}
          </div>
          <div className={classes.role}>
            {user !== {} && user.stakeholder.role}
          </div>
        </div>
        <div>
          <MdKeyboardArrowDown />
        </div>
      </div>
      <div
        className={
          isToggledProfile
            ? `${classes.showProfile} ${classes.dropdown}`
            : ` ${classes.dropdown} ${classes.hideProfile}`
        }
      >
        <div>settings</div>
        <div>Logout</div>
      </div>
    </div>
  );
};

export default ProfileBox;
