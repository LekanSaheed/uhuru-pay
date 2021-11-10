import classes from "./DashBoardAside.module.css";
import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/context";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import ProfileBox from "./ProfileBox";

const DashBoardAside = () => {
  const router = useRouter();
  const { isToggled, asideContents, user } = useGlobalContext();

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
                          className={`${classes.icon} ${
                            router.pathname === `/dashboard`
                              ? classes.active
                              : ""
                          }`}
                          style={{ display: "block" }}
                        >
                          {aside.icon}
                        </i>
                        <span className={isToggled ? classes.hideText : ""}>
                          {aside.text}
                        </span>
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

                    <motion.div
                      animate="visible"
                      initial="hidden"
                      variants={{
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
                      }}
                      className={`${aside.icon ? "" : classes.padText} ${
                        isToggled ? classes.hidePad : classes.showPad
                      }`}
                    >
                      {aside.text}
                    </motion.div>
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
                            .map((i, id) => {
                              return (
                                <Link key={id} href={"/dashboard" + i.link}>
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
                                    <span
                                      className={`${classes.icon}  ${
                                        router.pathname ===
                                        "/dashboard" + i.link
                                          ? classes.active
                                          : ""
                                      }`}
                                    >
                                      {i.icon}
                                    </span>

                                    <span
                                      className={
                                        isToggled
                                          ? classes.hideText
                                          : classes.showText
                                      }
                                      style={{ fontSize: "13px" }}
                                    >
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
                            .map((i, id) => {
                              return (
                                <Link key={id} href={"/dashboard" + i.link}>
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
                                    <span
                                      className={`${classes.icon}  ${
                                        router.pathname ===
                                        "/dashboard" + i.link
                                          ? classes.active
                                          : ""
                                      }`}
                                    >
                                      {i.icon}
                                    </span>

                                    <span
                                      className={
                                        isToggled
                                          ? classes.hideText
                                          : classes.showText
                                      }
                                      style={{ fontSize: "13px" }}
                                    >
                                      {i.text}
                                    </span>
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
