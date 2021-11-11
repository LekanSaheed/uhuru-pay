import classes from "./DashBoardHeader.module.css";
import { RiAlignLeft, RiNotification3Line } from "react-icons/ri";
import { GiExpand } from "react-icons/gi";
import { GrSearch } from "react-icons/gr";
import { BsChatDotsFill, BsPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import React from "react";
import { useGlobalContext } from "../context/context";
import { useRouter } from "next/router";
const DashBoardHeader = () => {
  const data = [{ id: 1, icon: <RiAlignLeft /> }];
  const rightIcons = [
    { id: 1, icon: "" },
    { id: 2, icon: <BiLogOut /> },
  ];
  const router = useRouter();

  /* View in fullscreen */
  function openFullscreen() {
    var elem = typeof window !== "undefined" && document;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  // /* Close fullscreen */
  // function closeFullscreen() {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.webkitExitFullscreen) {
  //     /* Safari */
  //     document.webkitExitFullscreen();
  //   } else if (document.msExitFullscreen) {
  //     /* IE11 */
  //     document.msExitFullscreen();
  //   }
  // }
  const { dispatch, logout } = useGlobalContext();

  React.useEffect(() => {
    openFullscreen();
    document.addEventListener("fullscreenerror", () => {
      alert("Full Screen not available in this mode");
    });
    document.addEventListener("mozfullscreenerror", () => {
      alert("Full Screen not available in this mode");
    });
    document.addEventListener("webkitfullscreenerror", () => {
      alert("Full Screen not available in this mode");
    });
    document.addEventListener("msfullscreenerror", () => {
      alert("Full Screen not available in this mode");
    });
  }, []);

  return (
    <nav className={classes.dash_header}>
      <div className={classes.path_container}>
        <span
          onClick={() => dispatch({ type: "TOGGLE_NAV" })}
          className={`${classes.icon} ${classes.lg_menu}`}
        >
          <RiAlignLeft />
        </span>
        <span
          onClick={() => dispatch({ type: "TOGGLE_MOBILE_NAV" })}
          className={`${classes.icon} ${classes.mobile_menu}`}
        >
          <RiAlignLeft />
        </span>
      </div>

      <div className={classes.header_right}>
        <span
          onClick={openFullscreen}
          className={`${classes.icon} ${classes.lg}`}
        >
          <GiExpand />
        </span>
        <div className={classes.header_search}>
          <input placeholder="Search" type="search" />
          <span className={classes.icon}>
            <GrSearch />
          </span>
        </div>
        <div className={classes.path_container}>
          {React.Children.toArray(
            rightIcons.map((icon) => {
              return (
                <span
                  onClick={
                    icon.id === 2
                      ? () => {
                          logout();
                          router.push("/login");
                        }
                      : null
                  }
                  key={icon.id}
                  className={classes.icon}
                >
                  {icon.icon}
                </span>
              );
            })
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashBoardHeader;
