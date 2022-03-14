import { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import { useGlobalContext } from "../context/context";
import classes from "./Login.module.css";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineUnlock,
} from "react-icons/ai";
// import { ImSpinner } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import ThemedProgress from "./ThemedProgress";
import { Alert } from "@material-ui/lab";
const Form = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isUser, setToken, setUser } = useGlobalContext();
  const [error, setError] = useState("");
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token || isUser || user.name !== undefined) {
      router.push("/dashboard");
    }
  }, []);
  const login = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        password: password,
      }),
    };
    const url = `${baseUrl}/stakeholder/login`;
    const fetchDetails = async () => {
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            const token = data.token;
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
                if (data.success) {
                  if (
                    data.data.role === "agent" ||
                    data.data.role === "collector"
                  ) {
                    toast.error(
                      `${
                        data.data.role.charAt(0).toUpperCase() +
                        data.data.role.slice(1)
                      }  cannot access dashboard`
                    );
                    setError("");
                  } else {
                    setToken(token);
                    router.push("/dashboard");
                    setUser(data.data);
                    toast.success("Successfully logged in");
                    setError("");
                  }
                } else {
                  setError(data.error);
                  setIsLoading(false);
                  toast.error(data.error);
                }
              })
              .catch((err) => {
                setError(err.message);
                setIsLoading(false);
                toast.error(err.message);
              });
          }
          if (data.success === false) {
            setError(data.error);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast.error(err.message);
        });
    };
    fetchDetails();
    // const resolvePromise = fetchDetails();
    // toast.promise(resolvePromise, {
    //   loading: "Loading...",
    // });
  };

  return (
    <div className={classes.login_container}>
      {isLoading && <ThemedProgress />}

      {/* <motion.div
        animate="visible"
        initial="hidden"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          },
        }}
      >
        <span className={classes.formText}>Login to your dashboard</span>
      </motion.div> */}
      {error && <Alert severity="error">{error}</Alert>}
      <form className={classes.form}>
        <div
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          <Image width={230} height={50} src="/WORDMARK.png" alt="Upay logo" />
        </div>
        <div className={classes.input_container}>
          <label>Username</label>
          <div className={classes.input_flex}>
            {" "}
            <AiOutlineUser className={classes.icon} />
            <input
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.input_container}>
          <label>Password</label>

          <div className={classes.input_flex}>
            {isUser ? (
              <AiOutlineUnlock className={classes.icon} />
            ) : (
              <AiOutlineLock className={classes.icon} />
            )}
            <input
              value={password}
              placeholder="Password"
              type={type ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setType(!type)} className={classes.vis_toggle}>
              {type ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", marginRight: "10px" }}>
          <Link href="/reset">Reset Password</Link>
        </div>
        <button
          className={isLoading ? classes.disabled : ""}
          disabled={isLoading}
          onClick={login}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className={classes.spinner} />
          ) : (
            "Login to your Dashboard"
          )}
        </button>
      </form>
    </div>
  );
};
export default Form;
