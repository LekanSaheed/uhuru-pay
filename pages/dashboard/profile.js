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

  const phone = useState("");
  React.useEffect(() => {
    const fetchProfile = async () => {
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
    fetchProfile;
  }, []);
  return (
    <DashBoardWrapper>
      {loading && <LinearProgress />}
      <motion.div>
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
