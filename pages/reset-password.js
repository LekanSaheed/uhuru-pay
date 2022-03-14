import React from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../context/baseUrl";
import { useRouter } from "next/router";
import classes from "./new-pass.module.css";
import Image from "next/image";
import { LinearProgress, Link } from "@material-ui/core";
const NewPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const token = router.query.token ? router.query.token : "404";

  const newPass = async (e) => {
    setLoading(true);
    e.preventDefault();
    await fetch(`${baseUrl}/stakeholder/reset/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetToken: token,
        password: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Password Reset was Successful");
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  console.log(router.query);
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div>
          {loading && <LinearProgress />}{" "}
          <Image src="/WORDMARK.png" height={30} width={130} />
        </div>
        <label>New Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label>Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          className={
            !password ||
            !confirmPassword ||
            confirmPassword !== password ||
            loading
              ? classes.disablebtn
              : ""
          }
          disabled={
            !password ||
            !confirmPassword ||
            confirmPassword !== password ||
            loading
          }
          onClick={newPass}
        >
          Continue
        </button>
      </form>
      <Link
        color="inherit"
        style={{ marginTop: "10px" }}
        onClick={() => router.push("/login")}
      >
        Back to login
      </Link>
    </div>
  );
};
export default NewPassword;
