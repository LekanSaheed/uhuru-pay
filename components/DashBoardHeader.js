import classes from "./DashBoardHeader.module.css";
import { RiAlignLeft, RiNotification3Line } from "react-icons/ri";
import { GiExpand, GiPerson } from "react-icons/gi";
import { GrSearch, GrNotification } from "react-icons/gr";
import { BsChatDotsFill, BsFillPersonFill, BsPerson } from "react-icons/bs";
import React from "react";

const DashBoardHeader = () => {
  const data = [
    { id: 1, icon: <RiAlignLeft /> },
    { id: 2, icon: <BsChatDotsFill /> },
  ];
  const rightIcons = [
    { id: 1, icon: <RiNotification3Line /> },
    { id: 2, icon: <BsPerson /> },
  ];

  // var elem = document.documentElement;

  // /* View in fullscreen */
  // function openFullscreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Safari */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE11 */
  //     elem.msRequestFullscreen();
  //   }
  // }

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
  // React.useEffect(() => {
  //   openFullscreen();
  // }, []);
  return (
    <nav className={classes.dash_header}>
      <div className={classes.path_container}>
        {React.Children.toArray(
          data.map((icon) => {
            return (
              <span key={icon.id} className={classes.icon}>
                {icon.icon}
              </span>
            );
          })
        )}
      </div>

      <div className={classes.header_right}>
        <span onClick={() => alert("Expanded")} className={classes.icon}>
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
                <span key={icon.id} className={classes.icon}>
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
