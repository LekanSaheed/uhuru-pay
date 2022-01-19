import classes from "./GridCard.module.css";
import {
  FcAreaChart,
  FcBusinessman,
  FcPieChart,
  FcSettings,
} from "react-icons/fc";
import { AiOutlineSetting } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
import React from "react";
import { useRouter } from "next/router";
import { Button, Dialog, DialogContent, Modal } from "@material-ui/core";
import { Box } from "@mui/system";
import { MdOutlineHistory } from "react-icons/md";
import { RiEyeLine } from "react-icons/ri";
import { motion } from "framer-motion";
const GridCard = () => {
  const [modal, setModal] = React.useState(false);
  const cardContent = [
    {
      icon: <FcBusinessman />,
      title: "Account Info",
      details:
        "See your profile data and manage your Account to choose what is saved with us.",
      linkText: "View",
      linkIcon: <RiEyeLine />,
      link: "/dashboard/profile",
    },
    {
      icon: <FcSettings />,
      title: "Settings",
      details:
        "You have full control to manage your own account and keep account fully secure.",
      linkText: "Account Settings",
      linkIcon: <AiOutlineSetting />,
      link: "/dashboard/profile/change-password",
    },

    {
      icon: <FcAreaChart />,
      title: "Tax Details",
      details:
        "Check out all your slated revenues. You can also generate pins for your revenues.",
      linkText: "Details",
      linkIcon: <BiMessageSquareDetail />,
      link: "/dashboard/all-revenues",
    },

    {
      icon: <FcPieChart />,
      title: "History",
      details:
        "Check your history on transactions and manage your packages that you have.",
      linkText: "Details",
      linkIcon: <MdOutlineHistory />,
      link: "/dashboard/transaction-history",
    },
  ];
  const router = useRouter();
  const contV = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const listV = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <motion.div
      initial="hidden"
      variants={contV}
      whileInView="visible"
      className={classes.card_container}
    >
      {React.Children.toArray(
        cardContent.map((card) => {
          return (
            <motion.div
              variants={listV}
              whileInView="visible"
              onClick={() => {
                router.push(card.link);
              }}
              key={card.title}
              className={classes.card}
            >
              <div className={classes.cardMain}>
                <div className={classes.icon}>{card.icon}</div>
                <div className={classes.title}>{card.title}</div>
                <div style={{ textAlign: "center" }}>{card.details}</div>
              </div>
              <Box
                display="flex"
                borderTop="solid 1px #f2f4f4"
                className={classes.cardBottom}
                alignItems="center"
                gap="10px"
              >
                <Box
                  display="flex"
                  color="#329A92"
                  alignItems="center"
                  justifyContent="center"
                >
                  {card.linkIcon}
                </Box>
                <div style={{ color: "#BB4077" }}>{card.linkText}</div>
              </Box>
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
};

export default GridCard;
