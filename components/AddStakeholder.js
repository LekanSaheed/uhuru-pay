import classes from "./AddStakeholder.module.css";
import { useState, useEffect } from "react";
import { baseUrl } from "../context/baseUrl";
import Select from "react-select";
import { state as stateOptions } from "./state";
import { useGlobalContext } from "../context/context";
import toast from "react-hot-toast";
import { Alert } from "@mui/material/";
import { CgClose } from "react-icons/cg";
import { Box } from "@mui/system";

const AddStakeholder = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState({});
  const [streams, setStream] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revenues, setRevenues] = useState([]);
  const [token, setToken] = useState("");
  const roleOptions = [];
  const [modal, setModal] = useState(false);
  const { user, setUser } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [revCodes, setRevCodes] = useState([]);
  const [newStream, setNewStream] = useState([]);
  useEffect(() => {
    const accessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    setToken(accessToken);
  }, []);

  const fetchUser = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const url = `${baseUrl}/stakeholder/me`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data);
        } else {
          toast.error(data.error);
        }
      });
  };

  useEffect(() => {
    const url = `${baseUrl}/revenue/all`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
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

            setRevenues(newRev);
          } else {
            toast.error(data.error);
          }
        });
    };
    fetchData();
  }, []);

  const myOptions = stateOptions.map((state) => {
    return {
      label: state.toUpperCase(),
      value: state.toLowerCase(),
    };
  });

  const newOptions =
    user.role !== "admin"
      ? myOptions.filter((i) => i.value === user.state)
      : myOptions;

  const handleStream = (stream) => {
    setStream(stream);
    setNewStream(stream.map((i) => i.value));
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
        revenueStreams: newStream,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Stakeholder Registered Successfully");
          setPassword(data.message);
          fetchUser();
          setModal(true);
          setRole({});
          setName("");
          setPhone("");
          setUsername("");
          setState({});
          setEmail("");
          setStream([]);
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

  if (user.role === "admin") {
    roleOptions.push(
      { label: "Admin", value: "admin" },
      { label: "State Government", value: "state" }
    );
  } else if (user.role === "state") {
    roleOptions.push(
      { label: "Local Government", value: "local" },
      { label: "Union", value: "union" },
      { label: "Agent", value: "agent" },
      { label: "Collector", value: "collector" }
    );
  } else if (user.role === "local") {
    roleOptions.push(
      { label: "Union", value: "union" },
      { label: "Agent", value: "agent" },
      { label: "Collector", value: "collector" }
    );
  } else if (user.role === "union") {
    roleOptions.push(
      { label: "Agent", value: "agent" },
      { label: "Collector", value: "collector" }
    );
  } else if (user.role === "agent") {
    roleOptions.push({ label: "Collector", value: "collector" });
  } else {
    return roleOptions;
  }

  return (
    <>
      <form className={classes.form}>
        {modal && (
          <Alert severity="success">
            <Box display="flex" justifyContent="space-between">
              {password}{" "}
              <CgClose onClick={() => setModal(false)} size="small" />
            </Box>
          </Alert>
        )}
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
                    type="number"
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
                  type="email"
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
                {user.role !== "admin" && (
                  <div className={classes.input_container}>
                    <label>Revenue Streams.</label>
                    <Select
                      value={streams.value}
                      isMulti={true}
                      onChange={handleStream}
                      isSearchable={true}
                      options={revenues.filter((rev) => {
                        console.log(user.revenueStreams);
                        return user.revenueStreams.includes(rev.value);
                      })}
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
