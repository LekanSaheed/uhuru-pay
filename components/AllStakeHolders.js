import { useGlobalContext } from "../context/context";
import React, { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import toast from "react-hot-toast";
import classes from "./AllStaker.module.css";
import Select, { components } from "react-select";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button,
  Modal,
  Dialog,
  DialogContent,
  TextField,
  FormControl,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import { BiCheckCircle, BiEditAlt } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TableComponent from "./TableComponent";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import { TabContext } from "@material-ui/lab";
import { TabList } from "@material-ui/lab";
import { TabPanel } from "@material-ui/lab";
import { Close } from "@material-ui/icons";
import moment from "moment";
const AllStakeHolders = () => {
  const useStyles = makeStyles({
    root: {
      overflowX: "scroll",
      width: "100%",
    },
    active: {
      color: "green",
      fontSize: "34px",
      padding: "7px",
      background: "rgba(0,128,0,.1)",
      borderRadius: "5px",
      cursor: "pointer",
    },
    deactivate: {
      color: "red",
      fontSize: "34px",
      padding: "7px",
      background: "rgba(255,0,0,.1)",
      borderRadius: "5px",
      cursor: "pointer",
    },
    input: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#bc2bc",
        },
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bc2bc",
      },
    },
    tableRow: {},
    hover: {
      "&:hover": {
        backgroundColor: "#4bc2bc",
      },
    },
  });
  const myClass = useStyles();
  const [edit, setEdit] = React.useState(false);
  const [aStakeholder, setStakeholder] = useState({});
  const { user, logout } = useGlobalContext();
  const [revenues, setRevenues] = useState([]);
  const [newRevenues, setNewRevenues] = useState([]);
  const [newpass, setNewpass] = useState("");
  const [value, setValue] = React.useState("1");
  const [dataSet, setDataset] = useState({});
  const [companyDataSet, setCompanyDataset] = useState({});
  const [companies, setCompanies] = useState([]);
  const [aCompany, setCompany] = useState({});
  const [concatArray, setconcatArray] = useState([]);
  const [testRev, setTestRev] = useState([
    { label: "ans me", value: "3din", isFixed: true },
  ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [stakerCreatedRevenues, setStakerCreatedRevenues] = useState([]);

  console.log(stakerCreatedRevenues, "gg");
  const handleRevenueChanges = (change) => {
    setNewRevenues(change);
    handleChanges({
      revenueStreams: change
        .map((rev) => rev.value)
        .concat(stakerCreatedRevenues),
    });
  };

  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [stakeholders, setStakeholders] = useState([]);

  const fetchRevenues = async () => {
    const url = `${baseUrl}/revenue/all`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRevenues(data.data);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const fetchCompanies = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(`${baseUrl}/stakeholder/company/list`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setCompanies(data.data);
          console.log(data);
        } else {
          user.role === "admin" && toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  async function fetchMembers() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${baseUrl}/stakeholder/list`;
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.success) {
          fetchRevenues();
          setStakeholders(data.data);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    fetchMembers();
    if (user.role === "admin") {
      fetchCompanies();
    }
  }, []);

  const handleChanges = (data) => {
    setStakeholder((state) => ({
      ...state,
      ...data,
    }));
    setDataset((state) => ({
      ...state,
      ...data,
    }));
  };

  const handleCompanyChanges = (data) => {
    setCompany((state) => ({
      ...state,
      ...data,
    }));
    setCompanyDataset((state) => ({
      ...state,
      ...data,
    }));
  };
  const selectStakeholder = async (stakeholder) => {
    await setStakeholder(stakeholder);
    setEdit(true);
    setCompany({});

    setNewRevenues(
      revenues
        .filter((rev) => {
          if (user.revenueStreams !== undefined) {
            return user.revenueStreams.includes(rev.revenue_id);
          }
        })
        .filter((rev) => {
          return (
            stakeholder.revenueStreams !== undefined &&
            stakeholder.revenueStreams.includes(rev.revenue_id)
          );
        })
        .map((rev) => {
          return {
            label: rev.title.toUpperCase(),
            value: rev.revenue_id,
          };
        })
    );

    setStakerCreatedRevenues(
      stakeholder.revenueStreams.filter((rev) => {
        return !user.revenueStreams.includes(rev);
      })
    );
  };

  const selectCompany = async (company) => {
    await setCompany(company);
    setEdit(true);
    setStakeholder({});
  };

  const activate = async (id) => {
    await fetch(`${baseUrl}/stakeholder/${id}/activate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Activated");
          fetchMembers();
        } else {
          toast.error(data.error);
        }
      });
  };

  const deactivate = (id) => {
    const fetchProfile = async () => {
      await fetch(`${baseUrl}/stakeholder/${id}/deactivate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("De-activated");
            fetchMembers();
          } else {
            toast.error(data.error);
          }
        });
    };
    fetchProfile();
  };

  const activateCompany = async (id) => {
    await fetch(`${baseUrl}/stakeholder/company/${id}/activate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Activated");
          fetchCompanies();
        } else {
          toast.error(data.error);
        }
      });
  };
  const deactivateCompany = async (id) => {
    await fetch(`${baseUrl}/stakeholder/company/${id}/deactivate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Deactivated");
          fetchCompanies();
        } else {
          toast.error(data.error);
        }
      });
  };

  const MultiValueRemove = (props) => {
    if (props.data.isFixed) {
      return null;
    }
    return <components.MultiValueRemove {...props} />;
  };

  const onChange = (actionMeta) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = newRevenues.filter((v) => !v.isFixed);
        break;
    }
  };

  const editUser = async () => {
    // const url = `${baseUrl}/stakeholder/${aStakeholder._id}/update`;
    await fetch(`${baseUrl}/stakeholder/${aStakeholder._id}/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataSet),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Stakeholder edited successfully");
          setStakeholder({});
          setDataset({});
          setEdit(false);
          fetchMembers();
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const editCompany = async () => {
    await fetch(`${baseUrl}/stakeholder/company/${aCompany._id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(companyDataSet),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Company edited successfully");
          setCompany({});
          setCompanyDataset({});
          setEdit(false);
          fetchCompanies();
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const resetPass = async () => {
    const url = `${baseUrl}/stakeholder/${aStakeholder._id}/password`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setNewpass(data.message);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const [tab, setTab] = useState("1");

  return (
    <div className={classes.container}>
      <TabContext value={tab}>
        {user.role === "admin" && (
          <TabList onChange={(e, val) => setTab(val)} variant="fullWidth">
            <Tab value="1" label="Stakeholders" />
            <Tab value="2" label="Companies" />
          </TabList>
        )}
        <TabPanel value="1" className={myClass.root}>
          <TableContainer component={TableComponent}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead style={{ whiteSpace: "nowrap" }}>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stakeholders.map((stakeholder, id) => {
                  return (
                    <TableRow
                      hover
                      classes={{ hover: myClass.hover }}
                      key={stakeholder._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        whiteSpace: "nowrap",
                      }}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <TableCell>{id + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {stakeholder.name}
                      </TableCell>

                      <TableCell>{stakeholder.username}</TableCell>
                      <TableCell>{stakeholder.email}</TableCell>
                      <TableCell>{stakeholder.phone}</TableCell>
                      <TableCell>{stakeholder.role}</TableCell>
                      <TableCell>
                        {moment(stakeholder.createdAt).format(
                          "ddd, MMM DD YYYY "
                        )}
                      </TableCell>
                      <TableCell>
                        {stakeholder.isActive ? (
                          <span onClick={() => deactivate(stakeholder._id)}>
                            <AiOutlineCloseCircle
                              className={myClass.deactivate}
                            />
                          </span>
                        ) : (
                          <span onClick={() => activate(stakeholder._id)}>
                            <BiCheckCircle className={myClass.active} />
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            selectStakeholder(stakeholder);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {
                  <Modal
                    BackdropProps={{
                      style: { background: "rgba(255,255,255, .6)" },
                    }}
                    open={edit}
                  >
                    <Dialog fullWidth={true} open={edit}>
                      <DialogContent>
                        <TabContext value={value}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                              onChange={handleChange}
                              aria-label="Edit Profile"
                            >
                              <Tab label="Edit Profile" value="1" />

                              <Tab
                                label={`Stakeholder's Created Revenues`}
                                value="2"
                              />
                            </TabList>
                          </Box>
                          <TabPanel value="1">
                            <Box display="flex" flexDirection="column">
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                marginBottom="14px"
                              >
                                Edit Stakeholder{" "}
                                <Button
                                  onClick={() => setEdit(false)}
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                >
                                  Close
                                </Button>
                              </Box>
                              <Box
                                display="flex"
                                gap="24px"
                                flexDirection="column"
                              >
                                <TextField
                                  className={myClass.input}
                                  label="Name"
                                  variant="outlined"
                                  value={
                                    aStakeholder.name !== undefined &&
                                    aStakeholder.name
                                  }
                                  fullWidth={true}
                                  size="small"
                                  onChange={(e) =>
                                    handleChanges({ name: e.target.value })
                                  }
                                />
                                <TextField
                                  className={myClass.input}
                                  label="Email"
                                  variant="outlined"
                                  value={
                                    aStakeholder.email !== undefined &&
                                    aStakeholder.email
                                  }
                                  fullWidth={true}
                                  size="small"
                                  onChange={(e) =>
                                    handleChanges({ email: e.target.value })
                                  }
                                />
                                <TextField
                                  className={myClass.input}
                                  label="Phone"
                                  variant="outlined"
                                  value={
                                    aStakeholder.phone !== undefined &&
                                    aStakeholder.phone
                                  }
                                  fullWidth={true}
                                  size="small"
                                  onChange={(e) =>
                                    handleChanges({ phone: e.target.value })
                                  }
                                />
                                {user.role !== "admin" && (
                                  <FormControl>
                                    <label>Revenue</label>
                                    <Select
                                      onChange={handleRevenueChanges}
                                      value={newRevenues}
                                      isMulti={true}
                                      options={revenues
                                        .filter((rev) => {
                                          if (user.revenueStreams) {
                                            return user.revenueStreams.includes(
                                              rev.revenue_id
                                            );
                                          }
                                        })
                                        .map((rev) => {
                                          return {
                                            label: rev.title.toUpperCase(),
                                            value: rev.revenue_id,
                                          };
                                        })}
                                    />
                                  </FormControl>
                                )}

                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={editUser}
                                  disabled={Object.entries(dataSet).length < 1}
                                >
                                  Update
                                </Button>
                              </Box>
                            </Box>
                          </TabPanel>
                          {/* <TabPanel value="2">
                            <Box display="flex" flexDirection="column">
                              {!newpass ? (
                                <>
                                  {" "}
                                  <DialogTitle>
                                    Do you want to reset password for{" "}
                                    {aStakeholder.name}?
                                  </DialogTitle>
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                  >
                                    <Button
                                      onClick={() => setEdit(false)}
                                      color="secondary"
                                      variant="contained"
                                      size="small"
                                    >
                                      No
                                    </Button>{" "}
                                    <Button
                                      onClick={() => {
                                        resetPass();
                                      }}
                                      color="primary"
                                      variant="contained"
                                      size="small"
                                    >
                                      Yes
                                    </Button>
                                  </Box>{" "}
                                </>
                              ) : (
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                >
                                  <Alert severity="success"> {newpass}</Alert>
                                  <IconButton
                                    onClick={() => {
                                      setNewpass("");
                                      setEdit(false);
                                    }}
                                  >
                                    <Close />
                                  </IconButton>
                                </Box>
                              )}
                            </Box>
                          </TabPanel> */}
                          <TabPanel value="2">
                            <Box
                              display="flex"
                              flexDirection="column"
                              gap="10px"
                            >
                              {revenues
                                .filter((rev) =>
                                  stakerCreatedRevenues.includes(rev.revenue_id)
                                )
                                .map((rev, id) => {
                                  return <div key={id}>{rev.title}</div>;
                                })}
                            </Box>
                          </TabPanel>
                        </TabContext>
                      </DialogContent>
                    </Dialog>
                  </Modal>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Company Table */}

        <TabPanel value="2" className={myClass.root}>
          <TableContainer component={TableComponent} className={myClass.root}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead style={{ whiteSpace: "nowrap" }}>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Reg No</TableCell>
                  <TableCell>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company, id) => {
                  return (
                    <TableRow
                      hover
                      classes={{ hover: myClass.hover }}
                      key={company._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{id + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {company.name}
                      </TableCell>

                      <TableCell>{company.username}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.phone}</TableCell>
                      <TableCell>{company.reg_no}</TableCell>
                      <TableCell>
                        {moment(company.createdAt).format("ddd, MMM DD YYYY ")}
                      </TableCell>
                      <TableCell>
                        {company.isActive ? (
                          <span onClick={() => deactivateCompany(company._id)}>
                            <AiOutlineCloseCircle
                              className={myClass.deactivate}
                            />
                          </span>
                        ) : (
                          <span onClick={() => activateCompany(company._id)}>
                            <BiCheckCircle className={myClass.active} />
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            selectCompany(company);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {
                  <Modal open={edit}>
                    <Dialog fullWidth={true} open={edit}>
                      <DialogContent>
                        <Box display="flex" flexDirection="column">
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            marginBottom="14px"
                          >
                            Edit Company{" "}
                            <Button
                              onClick={() => setEdit(false)}
                              variant="contained"
                              color="secondary"
                              size="small"
                            >
                              Close
                            </Button>
                          </Box>
                          <Box display="flex" gap="24px" flexDirection="column">
                            <TextField
                              className={myClass.input}
                              label="Name"
                              variant="outlined"
                              value={
                                aCompany.name !== undefined && aCompany.name
                              }
                              fullWidth={true}
                              size="small"
                              onChange={(e) =>
                                handleCompanyChanges({
                                  name: e.target.value,
                                })
                              }
                            />
                            <TextField
                              className={myClass.input}
                              label="Email"
                              variant="outlined"
                              value={
                                aCompany.email !== undefined && aCompany.email
                              }
                              fullWidth={true}
                              size="small"
                              onChange={(e) =>
                                handleCompanyChanges({ email: e.target.value })
                              }
                            />
                            <TextField
                              className={myClass.input}
                              label="Phone"
                              variant="outlined"
                              value={
                                aCompany.phone !== undefined && aCompany.phone
                              }
                              fullWidth={true}
                              size="small"
                              onChange={(e) =>
                                handleCompanyChanges({
                                  phone: e.target.value,
                                })
                              }
                            />

                            <Button
                              color="primary"
                              variant="contained"
                              onClick={editCompany}
                              disabled={
                                Object.entries(companyDataSet).length < 1
                              }
                            >
                              Update
                            </Button>
                          </Box>
                        </Box>
                      </DialogContent>
                    </Dialog>
                  </Modal>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AllStakeHolders;
