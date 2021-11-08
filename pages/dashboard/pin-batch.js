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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import { baseUrl } from "../../context/baseUrl";
import { useGlobalContext } from "../../context/context";
import classes from "./Batch.module.css";
import { motion } from "framer-motion";
const Batch = () => {
  const [batch, setBatch] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [pin, setPin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useGlobalContext();
  useEffect(() => {
    const url = `${baseUrl}/revenue/list`;
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
        console.log(data);
        if (data.success === true) {
          setRevenues(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log(data.error);
        }
      });
  }, []);
  const getBatch = async (revenueId) => {
    setLoading(true);
    const url = `${baseUrl}/pin/${revenueId}/batchs`;
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
        console.log(data);
        if (data.success === true && data.data.length > 0) {
          setBatch(data.data);
          setLoading(false);
          console.log(data);
          toast.success("success");
        } else if (data.success && data.data.length < 1) {
          toast.error("No batch created");
          setBatch([]);
          setLoading(false);
        } else {
          setLoading(false);
          console.log(data.error);
          toast.error(data.error);
          setBatch([]);
        }
      })
      .catch((err) => {
        setBatch([]);
        toast.error(err.message);
        setLoading(false);
      });
  };
  return (
    <DashBoardWrapper>
      {loading && <LinearProgress />}
      <span>All Revenues</span>

      <div className={classes.container}>
        <motion.div
          animate="visible"
          initial="hidden"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.3,
              },
            },
          }}
          className={classes.revenue_container}
        >
          <div className={classes.revenue_header}>
            <span>Revenue</span> <span>Amount</span>
          </div>
          {revenues.length > 0 &&
            revenues.map((rev, idx) => {
              return (
                <div
                  key={idx}
                  className={classes.revenue}
                  onClick={() => getBatch(rev.revenue_id)}
                >
                  <span className={classes.title}>{rev.title}</span>
                  <span className={classes.amount}>{rev.amount}</span>
                </div>
              );
            })}
        </motion.div>
        <div className={classes.group}>
          <motion.div
            animate="visible"
            initial="hidden"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
            className={classes.root}
          >
            {" "}
            {batch.length > 0 && (
              <TableContainer component={Paper}>
                <TableContainer sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Batch Number
                      </TableCell>
                      <TableCell>Status</TableCell>

                      <TableCell>Size</TableCell>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Discount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {batch.length > 0
                      ? batch.map((aBatch) => {
                          return (
                            <TableRow
                              key={aBatch.batch_no}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>{aBatch.batch_no}</TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                className={
                                  !aBatch.isActive
                                    ? classes.notActive
                                    : classes.active
                                }
                              >
                                {aBatch.isActive
                                  ? "Activated"
                                  : "Not Activated"}
                              </TableCell>

                              <TableCell>{aBatch.size}</TableCell>

                              <TableCell>{aBatch.createdAt}</TableCell>
                              <TableCell>{aBatch.discount}</TableCell>
                            </TableRow>
                          );
                        })
                      : "No data available for this revenue"}
                  </TableBody>
                </TableContainer>
              </TableContainer>
            )}
          </motion.div>
          <div className={classes.pin_table}>pin</div>
        </div>
      </div>
    </DashBoardWrapper>
  );
};

export default Batch;
