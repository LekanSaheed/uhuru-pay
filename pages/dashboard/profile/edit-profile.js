import { motion } from "framer-motion";
import ProfileWrapper from "../../../components/ProfileWrapper";
import React, { useState } from "react";
import classes from "../profile.module.css";
import { baseUrl } from "../../../context/baseUrl";
import toast from "react-hot-toast";
import { LinearProgress } from "@material-ui/core";
const EditProfile = () => {
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

  return (
    <ProfileWrapper>
      <div className={classes.profile_container}>
        <div className="theme-color-bold">Edit Profile</div>
        <form className={classes.form}>
          {" "}
          <motion.div className={classes.input_container}>
            <label>Name</label>
            <input defaultValue={name} />
          </motion.div>
          <motion.div className={classes.input_container}>
            <label>Email</label>
            <input defaultValue={email} />
          </motion.div>
          <motion.div className={classes.input_container}>
            <label>Phone</label>
            <input defaultValue={phone} />
          </motion.div>
        </form>
      </div>
    </ProfileWrapper>
  );
};
export default EditProfile;
