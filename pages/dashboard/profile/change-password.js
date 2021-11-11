import toast from "react-hot-toast";
import { baseUrl } from "../../../context/baseUrl";
import { useGlobalContext } from "../../../context/context";
import { useState } from "react";
import ProfileWrapper from "../../../components/ProfileWrapper";
import { Alert } from "@mui/material";
import classes from "./change-password.module.css";
import { Button } from "@material-ui/core";
const url = `${baseUrl}/stakeholder/password`;
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [confirmNewPassword, setConfirmNewpassword] = useState("");
  const { logout } = useGlobalContext();
  const { setToken } = useGlobalContext();
  const updatePass = async (e) => {
    e.preventDefault();
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (!token) {
      logout();
      toast.error("You need to login again");
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newPassword: newPassword,
          currentPassword: currentPassword,
        }),
      };
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.sucess) {
            toast.success("Password Successfully changed");
            setToken(data.token);
          } else {
            toast.error(data.error);
            console.log(data.error);
          }
        })
        .catch((err) => toast.error(err.message, "catch"));
    }
  };
  return (
    <ProfileWrapper>
      <Alert severity="info">
        Note: You can change your password, but only your admin can reset your
        password if you forget it
      </Alert>
      <form className={classes.form}>
        <div className={classes.input_container}>
          <label>Current Password</label>
          <input
            placeholder="Currrent Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className={classes.input_container}>
          <label>New Password</label>
          <input
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewpassword(e.target.value)}
          />
        </div>
        <div className={classes.input_container}>
          <label>Confirm New Password</label>
          <input
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewpassword(e.target.value)}
          />
        </div>
        <div className={classes.input_container}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            disabled={
              !newPassword ||
              !currentPassword ||
              !confirmNewPassword ||
              newPassword !== confirmNewPassword
            }
            onClick={updatePass}
          >
            Update Password
          </Button>
        </div>
      </form>
    </ProfileWrapper>
  );
};

export default ChangePassword;
