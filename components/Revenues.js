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
    root: {
      marginTop: "20px",
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
  }));
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  const [value, setValue] = React.useState("1");
  const { logout } = useGlobalContext();
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
      <EditRevenue
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
        fetchRev={fetchRevenues}
      />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Revenues" value="1" />
              <Tab label="Rejected Revenues" value="2" />
            </TabList>
          </Box>
          {loading && <ThemedProgress />}
          <TabPanel value="1">
            <TableContainer className={classes.root} component={TableComponent}>
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
                                  <Button
                                    onClick={async () => {
                                      await setSelected(revenue);
                                      setOpen(true);
                                    }}
                                  >
                                    <FiEdit />
                                  </Button>
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
            <TableContainer className={classes.root} component={TableComponent}>
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
                  {revenues
                    ? revenues
                        .filter((i) => i.status === "rejected")
                        .map((revenue) => {
                          return <Row key={revenue._id} revenue={revenue} />;
                        })
                    : "Rejected revenues will appear here"}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>

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
          <CircularProgress />
        </div>
      )}
    </section>
  );
};
export default Revenues;
