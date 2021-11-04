import { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import { useGlobalContext } from "../context/context";
import classes from "./Login.module.css";
import { useRouter } from "next/router";
import React from "react";

const Form = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user, isUser } = useGlobalContext();
  React.useEffect(() => {
    console.log(router);
    if (isUser) {
      router.push("/dashboard");
    }
  });
  const login = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };
    const url = `${baseUrl}/stakeholder/login`;
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
          };
          fetch(`${baseUrl}/stakeholder/me`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
              if (data.success === true) {
                setUser(data.data);
                console.log(user, ":user");
              } else {
                console.log(data.success);
              }
            });
        }
        if (data.success === false) {
          console.log(data.error);
        }
      });
  };
  return (
    <form>
      <div>
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={login}>Login</button>
    </form>
  );
};
export default Form;
