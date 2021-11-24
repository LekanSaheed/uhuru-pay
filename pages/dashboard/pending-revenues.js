import React, { useState } from "react";
import { baseUrl } from "../../context/baseUrl";
import {
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  makeStyles,
  Table,
  CircularProgress,
  Button,
  Modal,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  TextField,
} from "@material-ui/core";
import toast from "react-hot-toast";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import ThemedProgress from "../../components/ThemedProgress";
import moment from "moment";

const PendingRevenues = () => {
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
    accept: {
      backgroundColor: "#4bc2bc",
    },
    reject: {
      backgroundColor: "red",
    },
  }));
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  const [modal, setModal] = useState(false);
  const [revenue, setRevenue] = useState({});
  const [comment, setComment] = useState("");
  const url = `${baseUrl}/revenue/list`;
  const fetchPendingRevenues = () => {
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
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setRevenues(data.data.filter((aRev) => aRev.status === "pending"));
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.error);
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Data: " + err.message);
      });
  };
  React.useEffect(() => {
    fetchPendingRevenues();
  }, [loading]);
  const rejectRevenue = () => {
    const url = `${baseUrl}/revenue/${revenue._id}/edit`;
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "rejected",
        comments: "Not acpproved",
      }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success("Revenue Rejected Successfully");
          fetchPendingRevenues();
          setModal(false);
          setLoading(true);
        } else {
          setLoading(false);
          toast.error(data.error);
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("An error occured: " + err.message);
      });
  };
  const acceptRevenue = (id) => {
    const url = `${baseUrl}/revenue/${id}/edit`;
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status: "approved",
      }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Revenue Accepted Successfully");
          setLoading(true);
          //   fetchPendingRevenues();
        } else {
          setLoading(false);
          toast.error(data.error);
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("An error occured: " + err.message);
      });
  };
  return (
    <DashBoardWrapper>
      <section>
        <span>All Revenues</span>
        <Modal open={modal}>
          <Dialog open={modal} fullWidth={true}>
            <DialogContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                Reasons for rejecting Revenue{" "}
                <IconButton size="small" onClick={() => setModal(false)}>
                  Close
                </IconButton>
              </Box>
              <Box display="flex" flexDirection="column" gap="29px">
                <TextField
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  label="Reasons"
                  multiline={true}
                  minRows={3}
                  row
                />
                <Button
                  onClick={() => rejectRevenue()}
                  color="primary"
                  variant="contained"
                >
                  Reject
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Modal>
        <TableContainer className={classes.root} component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Title
                </TableCell>
                <TableCell>Amount</TableCell>

                <TableCell>Category</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Accept</TableCell>
                <TableCell>Reject</TableCell>
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
                    <TableCell>{revenue.created_by.name}</TableCell>
                    <TableCell>
                      {moment(revenue.created_At).format(
                        "MMM DD YYYY, hh:mm a"
                      )}
                    </TableCell>
                    <TableCell
                      className={
                        (revenue.status === "rejected"
                          ? classes.rejected
                          : "") ||
                        (revenue.status === "approved"
                          ? classes.approved
                          : "") ||
                        (revenue.status === "pending" ? classes.pending : "")
                      }
                    >
                      {revenue.status}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.accept}
                        onClick={() => acceptRevenue(revenue._id)}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        className={classes.reject}
                        onClick={async () => {
                          await setRevenue(revenue);
                          setModal(true);
                        }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && <ThemedProgress />}
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
    </DashBoardWrapper>
  );
};
export default PendingRevenues;
