import classes from "./DashBoardAside.module.css";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useGlobalContext } from "../context/context";
import Link from "next/link";
import { useRouter } from "next/router";
const DashBoardAside = () => {
  const router = useRouter();
  const { toggleDropdown, isDropdown, asideContents } = useGlobalContext();

  return (
    <div className={classes.asideMain}>
      <header className={classes.asideHeader}>Aside Header</header>

      <ul className={classes.asideContainer}>
        {React.Children.toArray(
          asideContents.map((aside) => {
            return (
              <li className={classes.aside}>
                <Link
                  href={aside.link && "/dashboard" + aside.link}
                  className={classes.asideLink}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "baseline",
                  }}
                >
                  <a
                    className={classes.link_flex}
                    onClick={() => toggleDropdown(aside)}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <span className={classes.icon}>{aside.icon}</span>
                      <span>{aside.text}</span>
                    </span>{" "}
                    <span>
                      {aside.expandable && (
                        <>
                          {aside.open ? (
                            <MdKeyboardArrowDown />
                          ) : (
                            <MdKeyboardArrowRight />
                          )}
                        </>
                      )}
                    </span>
                  </a>
                </Link>
                {aside.open && (
                  <>
                    {aside.dropdown && (
                      <div className={classes.dropdown}>
                        {React.Children.toArray(
                          aside.dropdown.map((drop) => {
                            return (
                              <Link href={"/dashboard" + drop.link}>
                                <a>
                                  <span>{drop.icon}</span>
                                  {drop.text}
                                </a>
                              </Link>
                            );
                          })
                        )}
                      </div>
                    )}
                  </>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
export default DashBoardAside;
