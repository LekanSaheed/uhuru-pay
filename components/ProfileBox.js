import classes from "./ProfileBox.module.css";
import { GoPerson } from "react-icons/go";
import { useGlobalContext } from "../context/context";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useRouter } from "next/router";

const ProfileBox = () => {
  const { user, toggleProfile, isToggledProfile, logout } = useGlobalContext();
  const router = useRouter();
  const isServer = typeof window === "undefined";
  console.log(isServer);
  if (isServer) {
    return <h1>Server</h1>;
  }
  return (
    <div className={classes.full_cont}>
      <div onClick={() => toggleProfile()} className={classes.container}>
        <div className={classes.icon}>
          <GoPerson />
        </div>
        <div className={classes.headFlex}>
          <div className={classes.name}>
            {user !== null && user.stakeholder.name !== undefined
              ? user.stakeholder.name
              : null}
          </div>
          <div className={classes.role}>
            {user !== null &&
              user.stakeholder.role !== undefined &&
              user.stakeholder.role}
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
        <div style={{ marginBlock: 10 }}>settings</div>
        <div
          onClick={async () => {
            // logout();
            await router.push("/login").then(() => {
              logout();
            });
          }}
          style={{ marginBlock: 10 }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
