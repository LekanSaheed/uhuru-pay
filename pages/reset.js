import React from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../context/baseUrl";
import classes from "./reset.module.css";
import Image from "next/image";
import link from "next/link";
import { LinearProgress } from "@material-ui/core";
const Reset = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const resetPass = async (e) => {
    setLoading(true);
    e.preventDefault();
    await fetch(`${baseUrl}/stakeholder/reset/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoading(false);
          setEmail("");
          toast.success(data.message);
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
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        {loading && <LinearProgress />}
        <div className={classes.header}>
          <Image src="/WORDMARK.png" height={50} width={200} />
        </div>
        <div className={classes.inst}>
          Enter the email associated with your account and we will send you a
          link to reset your password
        </div>{" "}
        <label>Email</label>
        <div className={classes.input_container}>
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={resetPass}>Continue</button>
      </form>
      <div style={{ fontSize: "11px" }}>
        &copy; {new Date().getFullYear().toString()} Uhurupay. All rights
        reserved
      </div>
    </div>
  );
};

export default Reset;
