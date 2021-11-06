import MainWrapper from "./MainWrapper";
import classes from "./AddStakeholder.module.css";
import { useState, useEffect } from "react";
import { baseUrl } from "../context/baseUrl";
import Select from "react-select";
import { state as stateOptions } from "./state";
import { useGlobalContext } from "../context/context";
import toast from "react-hot-toast";

const AddStakeholder = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState({});
  const [streams, setStream] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revenues, setRevenues] = useState([]);
  const [stakeholder, setStakeholder] = useState({});
  const roleOptions = [];
  const { user } = useGlobalContext();
  const isServer = typeof window === "undefined";
  const newStream = streams.map((i) => {
    return i.value;
  });
  useEffect(async () => {
    setStakeholder(user);
    const url = `${baseUrl}/revenue/all`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stakeholder.token}`,
      },
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const newRev = data.data.map((rev) => {
            return {
              label: rev.title,
              value: rev.revenue_id,
            };
          });
          const filtered = newRev.filter((rev) => {
            return stakeholder.stakeholder.revenueStreams.includes(rev.value);
          });
          setRevenues(filtered);
        } else {
          toast.error(data.error);
        }
      });
  }, []);
  const myOptions = stateOptions.map((state) => {
    return {
      label: state.toUpperCase(),
      value: state.toLowerCase(),
    };
  });
  const newOptions =
    stakeholder.stakeholder.role !== "admin"
      ? myOptions.filter((i) => i.value === stakeholder.stakeholder.state)
      : myOptions;

  const handleStream = (stream) => {
    setStream(stream);
  };

  const handleRole = (role) => {
    setRole(role);
  };
  const handleState = (state) => {
    setState(state);
  };

  const add = async (e) => {
    setLoading(true);
    e.preventDefault();
    const url = `${baseUrl}/stakeholder/register`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stakeholder.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        username: username.trim().toLowerCase(),
        phone: phone,
        email: email,
        state: state.value,
        role: role.value,
        revenueStreams: newStream,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setLoading(false);
          toast.success("Stakeholder Registered Successfully");
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  if (stakeholder.stakeholder.role === "admin") {
    roleOptions.push(
      { label: "Admin", value: "admin" },
      { label: "State Government", value: "state" }
    );
  } else if (stakeholder.stakeholder.role === "state") {
    roleOptions.push(
      { label: "Local Government", value: "local" },
      { label: "Union", value: "union" },
      { label: "Agent", value: "agent" },
      { label: "Collector", value: "collector" }
    );
  } else if (stakeholder.stakeholder.role === "local") {
    roleOptions.push(
      { label: "Union", value: "union" },
      { label: "Agent", value: "agent" },
      { label: "Collector", value: "collector" }
    );
  } else if (stakeholder.stakeholder.role === "union") {
    roleOptions.push(
      { label: "Agent", value: "agent" },
      { label: "Collector", value: "collector" }
    );
  } else if (stakeholder.stakeholder.role === "agent") {
    roleOptions.push({ label: "Collector", value: "collector" });
  } else {
    return roleOptions;
  }
  if (isServer) {
    return <h1>Server</h1>;
  }
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
                  <label>Full Name e.g (John Doe Peters)</label>
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
                  <label>
                    Phone number must start with country code e.g (234)
                  </label>
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

            <section className={classes.emailandrole}>
              <div className={classes.input_container}>
                <label>Email.</label>
                <input
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={classes.columns}>
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
                {stakeholder.stakeholder.role !== "admin" && (
                  <div className={classes.input_container}>
                    <label>Revenue Streams.</label>
                    <Select
                      value={streams}
                      isMulti={true}
                      onChange={handleStream}
                      isSearchable={true}
                      options={revenues}
                    />
                  </div>
                )}
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
export function getInitialProps() {
  return {
    props: {},
  };
}
