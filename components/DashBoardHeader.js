import classes from "./DashBoardHeader.module.css";
import { RiAlignLeft } from "react-icons/ri";
import { GiExpand, GiPerson } from "react-icons/gi";
import { GrSearch, GrNotification } from "react-icons/gr";
import { BsChatDotsFill } from "react-icons/bs";
import React from "react";
const DashBoardHeader = () => {
  const data = [
    { id: 1, icon: <RiAlignLeft /> },
    { id: 2, icon: <BsChatDotsFill /> },
  ];
  const rightIcons = [
    { id: 1, icon: <GrNotification /> },
    { id: 2, icon: <GiPerson /> },
  ];
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
        <span className={classes.icon}>
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
