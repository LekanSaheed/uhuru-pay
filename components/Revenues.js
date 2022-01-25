import { useEffect, useState } from "react";
import { baseUrl } from "../context/baseUrl";
import { useGlobalContext } from "../context/context";
import * as React from "react";
import EditRevenue from "./EditRevenue";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  CircularProgress,
  Box,
  Button,
} from "@material-ui/core";
import Row from "./TableRow";
import TableComponent from "./TableComponent";
import { Tab } from "@mui/material";
import { TabContext } from "@material-ui/lab";
import { TabList } from "@material-ui/lab";
import { TabPanel } from "@material-ui/lab";
import ThemedProgress from "./ThemedProgress";
import { FiEdit } from "react-icons/fi";
const url = `${baseUrl}/revenue/list`;

const Revenues = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const useStyle = makeStyles((theme) => ({
    tabs: {},
    root: {
      padding: "0",
      "& .MuiTabs-flexContainer": {
        gap: "10px",
      },
      "& .css-cjctlb-MuiButtonBase-root-MuiTab-root": {
        fontFamily: "brFirma",
        fontWeight: "bolder",
      },
      fontFamily: "brFirma",
      marginTop: "20px",
      "& .MuiTableCell-root": {
        lineHeight: 1.2,
        fontFamily: "brFirma",
        fontSize: "0.65em",
        padding: "7px",
      },
      "& .MuiTableCell-head": {
        fontFamily: "brFirma !important",
        fontSize: "0.7em !important",
        fontWeight: "bolder !important",
        padding: "10px",
      },
    },
    pending: {
      color: "goldenrod !important",
    },
    approved: {
      color: "green !important",
    },
    rejected: {
      color: "red !important",
    },
    progress: {
      color: "#4bc2bc",
    },
  }));
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  const [value, setValue] = React.useState("1");
  const { logout, user } = useGlobalContext();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   setToken(accessToken);
  // }, []);
  const fetchRevenues = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (!token) {
      logout();
      toast.error("You need to log in again");
    }
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setRevenues(data.data);
          console.log(data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log(data.error);
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    fetchRevenues();
  }, []);

  return (
    <section>
      <span>All Revenues</span>
      {user.role !== "admin" && (
        <EditRevenue
          open={open}
          setOpen={setOpen}
          selected={selected}
          setSelected={setSelected}
          fetchRev={fetchRevenues}
        />
      )}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value} className={classes.root}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Revenues" value="1" />
              <Tab label="Rejected Revenues" value="2" />
            </TabList>
          </Box>
          {loading && <ThemedProgress />}
          <TabPanel sx={{ padding: "0 !important" }} value="1">
            <TableContainer className={classes.root} component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ position: "sticky", top: "0" }}>
                  <TableRow>
                    <TableCell />
                    <TableCell component="th" scope="row">
                      Title
                    </TableCell>

                    <TableCell>Category</TableCell>

                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenues
                    ? revenues
                        .filter(
                          (i) =>
                            i.status === "pending" || i.status === "approved"
                        )
                        .map((revenue) => {
                          return (
                            <Row
                              key={revenue._id}
                              revenue={revenue}
                              edit={
                                <TableCell>
                                  {user.role !== "admin" && (
                                    <Button
                                      onClick={async () => {
                                        await setSelected(revenue);
                                        setOpen(true);
                                      }}
                                    >
                                      <FiEdit />
                                    </Button>
                                  )}
                                </TableCell>
                              }
                            />
                          );
                        })
                    : "Revenues will appear here"}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value="2">
            {" "}
            <TableContainer className={classes.root} component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell component="th" scope="row">
                      Title
                    </TableCell>

                    <TableCell>Category</TableCell>
                    <TableCell>Type</TableCell>

                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenues &&
                    revenues
                      .filter((i) => i.status === "rejected")
                      .map((revenue) => {
                        return <Row key={revenue._id} revenue={revenue} />;
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>

      {!loading &&
        revenues &&
        revenues.filter((i) => i.status === "rejected").length < 1 &&
        "Rejected revenues will appear here"}
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "0",
            left: "280px",
            right: "0",
            bottom: "0",
          }}
        >
          <CircularProgress size={25} className={classes.progress} />
        </div>
      )}
    </section>
  );
};
export default Revenues;
