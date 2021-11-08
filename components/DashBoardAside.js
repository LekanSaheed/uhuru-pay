import classes from "./DashBoardAside.module.css";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { useGlobalContext } from "../context/context";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import ProfileBox from "./ProfileBox";

const DashBoardAside = () => {
  const router = useRouter();
  const { toggleDropdown, isDropdown, asideContents, user } =
    useGlobalContext();

  return (
    <div className={classes.asideMain}>
      <header className={classes.asideHeader}>
        <ProfileBox />
      </header>

      <ul className={classes.asideContainer}>
        {React.Children.toArray(
          asideContents.map((aside) => {
            return (
              <li className={classes.aside} key={aside.text}>
                {aside.link ? (
                  <Link
                    href={"/dashboard" + aside.link}
                    className={`${classes.asideLink}`}
                  >
                    <a
                      className={`${classes.link_flex}  ${
                        router.pathname == `"/dashboard${aside.link}`
                          ? classes.active
                          : ""
                      }`}
                    >
                      <span
                        className={classes.link_hover}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px",
                          alignItems: "center",
                        }}
                      >
                        <i className={classes.icon}>{aside.icon}</i>
                        <span style={{ fontSize: "14px" }}>{aside.text}</span>
                      </span>{" "}
                    </a>
                  </Link>
                ) : (
                  <span
                    onClick={() => toggleDropdown(aside)}
                    className={classes.link_flex}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <i className={classes.icon}>{aside.icon}</i>
                      {aside.text}
                    </span>
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
                  </span>
                )}

                <div
                  className={aside.open ? classes.showdrop : classes.hide_drop}
                >
                  {aside.dropdown && (
                    <div className={classes.dropdown}>
                      {React.Children.toArray(
                        aside.dropdown.map((drop) => {
                          return (
                            <>
                              <Link
                                key={drop.text}
                                href={"/dashboard" + drop.link}
                              >
                                <a
                                  style={{
                                    display: "flex",
                                    gap: "15px",
                                    alignItems: "center",
                                  }}
                                >
                                  <span>
                                    <BiLogInCircle />
                                  </span>
                                  <span style={{ fontSize: "13px" }}>
                                    {drop.text}
                                  </span>
                                </a>
                              </Link>
                            </>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
      <footer className={classes.asideFooter}>
        <div style={{ padding: " 10px" }}>
          <Image width={200} height={50} src="/WORDMARK.png" />
        </div>
      </footer>
    </div>
  );
};
export default DashBoardAside;
