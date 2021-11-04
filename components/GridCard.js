import classes from "./GridCard.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import {
  FcAreaChart,
  FcBusinessman,
  FcPieChart,
  FcSettings,
} from "react-icons/fc";
import React from "react";
const GridCard = () => {
  const cardContent = [
    {
      icon: <FcBusinessman />,
      title: "Account Info",
      details:
        "See your profile data and manage your Account to choose what is saved in our system.",
      linkText: "Edit",
      linkIcon: "",
    },
    {
      icon: <FcSettings />,
      title: "Security Settings",
      details:
        "You have full control to manage your own account and keep account fully secure.",
      linkText: "Account Security Settings",
      linkIcon: "",
    },
    {
      icon: <FcAreaChart />,
      title: "Tax Details",
      details:
        "Check out all your payment history. You can also download or print your invoice.",
      linkText: "Details",
      linkIcon: "",
    },
    {
      icon: <FcPieChart />,
      title: "Report",
      details:
        "Check your reports of uses and manage your packages or subscriptions that you have.",
      linkText: "Details",
      linkIcon: "",
    },
  ];
  return (
    <div className={classes.card_container}>
      {React.Children.toArray(
        cardContent.map((card) => {
          return (
            <div className={classes.card}>
              <div className={classes.cardMain}>
                <div className={classes.icon}>{card.icon}</div>
                <div className={classes.title}>{card.title}</div>
                <div style={{ textAlign: "center" }}>{card.details}</div>
              </div>
              <div className={classes.cardBottom}>{card.linkText}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default GridCard;
