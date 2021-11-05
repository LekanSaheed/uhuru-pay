import MainWrapper from "./MainWrapper";
import classes from "./AddStakeholder.module.css";
import { useState } from "react";
import { baseUrl, token } from "../context/baseUrl";
import Select from "react-select";
import { state as stateOptions } from "./state";
const AddStakeholder = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const newOptions = stateOptions.map((state) => {
    return {
      label: state.toUpperCase(),
      value: state.toLowerCase(),
    };
  });
  const handleRole = (role) => {
    setRole(role);
    console.log(role);
  };
  const handleState = (state) => {
    setState(state);
    console.log(state);
  };
  const add = async (e) => {
    setLoading(true);
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
        name: name.trim(),
        username: username.trim().toLowerCase(),
        phone: phone,
        email: email,
        state: state.value,
        role: role.value,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoading(false);
        } else {
          console.log(data.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "State Government", value: "state" },
    { label: "Local Government", value: "local" },

    { label: "Union", value: "union" },

    { label: "Agent", value: "agent" },
    { label: "Collector", value: "collector" },
  ];
  return (
    <>
      <form className={classes.form}>
        <div className={classes.header}>
          <span>Add Stakeholder</span>
        </div>
        <div className={classes.group}>
          <div className={classes.colrow}>
            <div className={classes.columns}>
              <div className={classes.column}>
                <div className={classes.input_container}>
                  <label>Name.</label>
                  <input
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={classes.input_container}>
                  <label>Username.</label>
                  <input
                    value={username}
                    placeholder="User Name"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes.column}>
                <div className={classes.input_container}>
                  <label>Phone No.</label>
                  <input
                    value={phone}
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={classes.input_container}>
                  <label>State.</label>
                  <Select
                    value={state}
                    placeholder="Choose a State"
                    onChange={handleState}
                    options={newOptions}
                  />
                </div>
              </div>
            </div>

            <section classname={classes.emailandrole}>
              <div className={classes.input_container}>
                <label>Email.</label>
                <input
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={classes.input_container}>
                <label>Role.</label>
                <Select
                  value={role}
                  placeholder="Choose a Role"
                  onChange={handleRole}
                  options={roleOptions}
                />
                {/* <input
                value={role}
                placeholder="Role"
                onChange={(e) => setRole(e.target.value)}
              /> */}
              </div>
            </section>
          </div>
          <div></div>
        </div>

        <button onClick={add}>
          {loading ? "Registering..." : " Register Stakeholder"}
        </button>
      </form>
    </>
  );
};

export default AddStakeholder;
