import React, { useState } from "react";
import { AppBar, Avatar, Badge, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import classes from "../profile.module.css";
import { baseUrl } from "../../../context/baseUrl";
import toast from "react-hot-toast";
import ProfileWrapper from "../../../components/ProfileWrapper";
import { FaUserCircle } from "react-icons/fa";
import { Chip, List, ListItem, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { Skeleton } from "@material-ui/lab";
import ThemedProgress from "../../../components/ThemedProgress";
import { useGlobalContext } from "../../../context/context";
import Revenues from "../../../components/Revenues";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const name = Object.entries(profile).length > 0 ? profile.name : "";
  const { state, setState } = useState(
    Object.entries(profile).length > 0 ? profile.state : ""
  );
  const email = Object.entries(profile).length > 0 ? profile.email : "";
  const role = Object.entries(profile).length > 0 ? profile.role : "";
  const phone = Object.entries(profile).length > 0 ? profile.phone : "";
  const { user } = useGlobalContext();
  const [revenues, setRevenues] = useState([]);

  React.useEffect(() => {
    const fetchRevenue = async (streams) => {
      const token =
        typeof window !== "undefined" && localStorage.getItem("accessToken");
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(`${baseUrl}/revenue/all`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLoading(false);
            const allocated = data.data.filter((rev) => {
              return streams.includes(rev.revenue_id);
            });
            console.log(allocated);
            setRevenues(allocated);
          } else {
            setLoading(false);
            toast.error(data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    };
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(`${baseUrl}/stakeholder/me`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setLoading(false);
            setProfile(data.data);
            fetchRevenue(data.data.revenueStreams);
          } else {
            setLoading(false);
            toast.error(data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    };

    fetchProfile();
  }, []);
  const contVariant = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.2,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const useStyles = makeStyles((theme) => ({
    name: {
      fontWeight: "700",
      fontSize: "14px",
      [theme.breakpoints.up(767)]: {
        fontSize: "13px",
      },
      [theme.breakpoints.up(901)]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up(1024)]: {
        fontSize: "21px",
      },
    },
    revenue: {
      fontSize: "11px",
      [theme.breakpoints.up(901)]: {
        fontSize: "12px",
      },
      [theme.breakpoints.up(1024)]: {
        fontSize: "13px",
      },
    },
  }));
  const myClass = useStyles();
  const Skel = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        {" "}
        <Skeleton width={100} />
      </Box>
    );
  };
  return (
    <ProfileWrapper>
      {loading && <ThemedProgress />}

      <motion.div
        variants={contVariant}
        className={classes.profile_container}
        initial="hidden"
        animate="visible"
      >
        <div className="theme-color-bold">Your Profile</div>

        <motion.div className={classes.card_container}>
          <Chip
            label={role.charAt(0).toUpperCase() + role.slice(1)}
            avatar={<Avatar>{role.slice(0, 1).toUpperCase()}</Avatar>}
            variant="contained"
          />
          <div className={classes.header}>
            <i className={classes.img}>
              <FaUserCircle />
            </i>
          </div>
          <form className={classes.profile_card}>
            <Box display="flex" justifyContent="space-between" padding="15px">
              <div className={myClass.name}>{name ? name : <Skel />}</div>
              {user.role !== "admin" && (
                <Badge
                  color="secondary"
                  badgeContent={
                    profile.revenueStreams ? profile.revenueStreams.length : 0
                  }
                >
                  <Chip
                    style={{ fontSize: "12px" }}
                    className={myClass.revenue}
                    label="Total Revenues"
                  />
                </Badge>
              )}
            </Box>
            <div>{name ? email : <Skel />}</div>
            <div>{name ? phone : <Skel />}</div>
          </form>
        </motion.div>
        {user.role !== "admin" && revenues.length > 0 && (
          <Box>
            <AppBar
              position="static"
              style={{ padding: "10px", background: "#4bc2bc" }}
            >
              Revenue List
            </AppBar>
            <List sx={{ height: "300px", oveflowY: "scroll" }}>
              {revenues.map((rev, id) => {
                return (
                  <React.Fragment key={id}>
                    <ListItem alignItems="flex-start">{`${rev.title} ${rev.revenue_id}`}</ListItem>
                    <Divider variant="fullWidth" />
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        )}
      </motion.div>
    </ProfileWrapper>
  );
};
export default ProfilePage;
