import { useEffect, useState } from "react";
import { baseUrl } from "../context/baseUrl";
import { useGlobalContext } from "../context/context";
import * as React from "react";
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
  LinearProgress,
} from "@material-ui/core";

const url = `${baseUrl}/revenue/list`;

const Revenues = () => {
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
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   setToken(accessToken);
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setRevenues(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log(data.error);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <section>
      <span>All Revenues</span>
      <TableContainer className={classes.root} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Title
              </TableCell>
              <TableCell>Amount</TableCell>

              <TableCell>Category</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenues.map((revenue) => {
              return (
                <TableRow
                  key={revenue.revenue_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {revenue.title}
                  </TableCell>

                  <TableCell>{revenue.amount}</TableCell>

                  <TableCell>{revenue.category}</TableCell>
                  <TableCell>{revenue.created_At}</TableCell>
                  <TableCell
                    className={
                      (revenue.status === "rejected" ? classes.rejected : "") ||
                      (revenue.status === "approved" ? classes.approved : "") ||
                      (revenue.status === "pending" ? classes.pending : "")
                    }
                  >
                    {revenue.status}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <LinearProgress />}
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
