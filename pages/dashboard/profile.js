import DashBoardWrapper from "../../components/DashBoardWrapper";
import React, { useState } from "react";
import { LinearProgress } from "@material-ui/core";
import { motion } from "framer-motion";

import { baseUrl } from "../../context/baseUrl";
const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const name = Object.entries(profile).length > 0 ? profile.name : "";
  const { state, setState } = useState(
    Object.entries(profile).length > 0 ? profile.state : ""
  );
  const email = Object.entries(profile).length > 0 ? profile.email : "";

  const phone = Object.entries(profile).length > 0 ? profile.phone : "";
  React.useEffect(() => {
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

            // console.log(data.data, ":user");
          } else {
            setLoading(false);
            toast.error(data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
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
  return (
    <DashBoardWrapper>
      {loading && <LinearProgress />}
      <motion.div variants={contVariant} initial="hidden" animate="visible">
        <motion.div>
          <label>Name</label>
          <input value={name} />
        </motion.div>
        <motion.div>
          <label>Email</label>
          <input value={email} />
        </motion.div>
        <motion.div>
          <label>Phone</label>
          <input value={phone} />
        </motion.div>
        <motion.div>
          <label>Name</label>
          <input />
        </motion.div>
      </motion.div>
    </DashBoardWrapper>
  );
};

export default ProfilePage;
