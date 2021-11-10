import classes from "./GridCard.module.css";
import {
  FcAreaChart,
  FcBusinessman,
  FcPieChart,
  FcSettings,
} from "react-icons/fc";
import React from "react";
import { useRouter } from "next/router";
import { Button, Dialog, DialogContent, Modal } from "@material-ui/core";
import { Box } from "@mui/system";

const GridCard = () => {
  const [modal, setModal] = React.useState(false);
  const cardContent = [
    {
      icon: <FcBusinessman />,
      title: "Account Info",
      details:
        "See your profile data and manage your Account to choose what is saved in our system.",
      linkText: "Edit",
      linkIcon: "",
      link: "/dashboard/profile",
    },
    {
      icon: <FcSettings />,
      title: "Security Settings",
      details:
        "You have full control to manage your own account and keep account fully secure.",
      linkText: "Account Security Settings",
      linkIcon: "",
      link: "/dashboard/profile/change-password",
    },

    {
      icon: <FcAreaChart />,
      title: "Tax Details",
      details:
        "Check out all your payment history. You can also download or print your invoice.",
      linkText: "Details",
      linkIcon: "",
      link: "",
    },

    {
      icon: <FcPieChart />,
      title: "Report",
      details:
        "Check your reports of uses and manage your packages or subscriptions that you have.",
      linkText: "Details",
      linkIcon: "",
      link: "",
    },
  ];
  const router = useRouter();
  return (
    <div className={classes.card_container}>
      {modal && (
        <Modal open={modal}>
          <Dialog open={modal}>
            <DialogContent>
              This feature is coming soon
              <Box alignItems="center" justifyContent="center" display="flex">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setModal(false)}
                >
                  Got it
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Modal>
      )}
      {React.Children.toArray(
        cardContent.map((card) => {
          return (
            <div
              onClick={() => {
                card.link ? router.push(card.link) : setModal(true);
              }}
              key={card.title}
              className={classes.card}
            >
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
