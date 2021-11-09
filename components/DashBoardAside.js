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
              <li
                className={`${classes.aside} ${
                  aside.link === router.pathname ? classes.active : ""
                }`}
                key={aside.text}
              >
                {aside.link ? (
                  <Link
                    href={"/dashboard" + aside.link}
                    className={`${classes.asideLink}`}
                  >
                    <a
                      className={`${classes.link_flex}  ${
                        router.pathname === `/dashboard` ? classes.active : ""
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
                        <i
                          className={classes.icon}
                          style={{ display: "block" }}
                        >
                          {aside.icon}
                        </i>
                        <span>{aside.text}</span>
                      </span>
                    </a>
                  </Link>
                ) : (
                  <span
                    className={classes.link_flex}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "13px",
                      alignItems: "center",
                    }}
                  >
                    {aside.icon && <i className={classes.icon}>{aside.icon}</i>}
                    <span className={aside.icon ? "" : classes.padText}>
                      {aside.text}
                    </span>
                  </span>
                )}

                <div className={classes.showdrop}>
                  {aside.dropdown && (
                    <div className={classes.dropdown}>
                      {user.role === "admin"
                        ? aside.dropdown
                            .filter(
                              (i) =>
                                i.access === "admin" || i.access === undefined
                            )
                            .map((i) => {
                              return (
                                <Link href={"/dashboard" + i.link}>
                                  <a
                                    style={{
                                      display: "flex",
                                      gap: "15px",
                                      alignItems: "center",
                                      cursor: "pointer",
                                    }}
                                    className={
                                      router.pathname === "/dashboard" + i.link
                                        ? classes.active
                                        : ""
                                    }
                                  >
                                    <span className={classes.icon}>
                                      {i.icon}
                                    </span>
                                    <span style={{ fontSize: "13px" }}>
                                      {i.text}
                                    </span>
                                  </a>
                                </Link>
                              );
                            })
                        : aside.dropdown
                            .filter(
                              (i) =>
                                i.access === "regular" || i.access === undefined
                            )
                            .map((i) => {
                              return (
                                <Link href={"/dashboard" + i.link}>
                                  <a
                                    style={{
                                      display: "flex",
                                      gap: "15px",
                                      alignItems: "center",
                                      cursor: "pointer",
                                    }}
                                    className={
                                      router.pathname === "/dashboard" + i.link
                                        ? classes.active
                                        : ""
                                    }
                                  >
                                    <span className={classes.icon}>
                                      {i.icon}
                                    </span>
                                    <span>{i.text}</span>
                                  </a>
                                </Link>
                              );
                            })}
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
