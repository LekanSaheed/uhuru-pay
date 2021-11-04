import MainWrapper from "./MainWrapper";
import classes from "./AddStakeholder.module.css";
import { useState } from "react";
import { baseUrl, token } from "../context/baseUrl";

const AddStakeholder = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");

  const add = async (e) => {
    e.preventDefault();
    const url = `${baseUrl}/stakeholder/register`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username.toLowerCase(),
        phone: phone,
        email: email,
        state: state,
        role: role,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <span>Add Stakeholder</span>
      <form className={classes.form}>
        <div className={classes.columns}>
          <div className={classes.column}>
            <div className={classes.input_container}>
              <input
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <input
                value={username}
                placeholder="User Name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <input
                value={role}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <input
                value={role}
                placeholder="Role"
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.input_container}>
              <input
                value={phone}
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <input value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </div>
        </div>
        <button onClick={add}>Register Stakeholder</button>
      </form>
    </>
  );
};

export default AddStakeholder;
