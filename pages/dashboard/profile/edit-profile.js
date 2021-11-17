import { motion } from "framer-motion";
import ProfileWrapper from "../../../components/ProfileWrapper";
import React, { useState } from "react";
import classes from "../profile.module.css";
import { baseUrl } from "../../../context/baseUrl";
import toast from "react-hot-toast";
import { Button, LinearProgress } from "@material-ui/core";
import { state } from "../../../components/state";
import { Alert } from "@mui/material";
import Select from "react-select";
const EditProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [newState, setNewState] = useState({});

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
            setName(data.data.name);
            setEmail(data.data.email);
            setPhone(data.data.phone);
            setRole(data.data.role);
            if (data.data.state) {
              setNewState({
                label: data.data.state.toUpperCase(),
                value: data.data.state.toLowerCase(),
              });
            }
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
        {loading && <LinearProgress />}
        {role !== "admin" && (
          <Alert severity="error">Contact your admin for account edition</Alert>
        )}
        <form className={classes.form}>
          {" "}
          <motion.div className={classes.input_container}>
            <label>Name.</label>
            <input defaultValue={name} disabled={true} />
          </motion.div>
          <motion.div className={classes.input_container}>
            <label>Email.</label>
            <input defaultValue={email} disabled={true} />
          </motion.div>
          <motion.div className={classes.input_container}>
            <label>Phone.</label>
            <input defaultValue={phone} disabled={true} />
          </motion.div>
          {role !== "admin" && (
            <motion.div className={classes.input_container}>
              <label>State.</label>
              <Select
                options={state.map((s) => {
                  return { label: s.toUpperCase(), value: s.toLowerCase() };
                })}
                value={newState}
                onChange={(e) => setNewState(e)}
                theme={(theme) => ({
                  ...theme,
                  outline: "none",
                  colors: {
                    ...theme.colors,
                    primary25: "#4bc2bc",
                    primary: ["#4bc2bc2a", "#000"],
                    neutral5: "#000",
                  },
                })}
              />
            </motion.div>
          )}
          <Button disabled={true}>Update Profile</Button>
        </form>
      </div>
    </ProfileWrapper>
  );
};
export default EditProfile;
