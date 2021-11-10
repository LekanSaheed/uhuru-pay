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
  TablePagination,
  LinearProgress,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import { baseUrl } from "../../context/baseUrl";
import { useGlobalContext } from "../../context/context";
import classes from "./Batch.module.css";
import { motion } from "framer-motion";
import { styled } from "@material-ui/styles";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Batch = () => {
  const [batch, setBatch] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [pin, setPin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useGlobalContext();
  const useStyle = makeStyles((theme) => ({
    table: {
      overflowY: "scroll",
      maxHeight: "60vh",
      fontSize: "13px !important",
    },
    cellHead: {
      fontWeight: "700",
      color: "#fff",
      fontSize: "11px",
    },
    cell: {
      fontSize: "12px",
      fontWeight: "500",
    },
    greenBtn: {
      backgroundColor: "#4bc2bc",
    },
  }));
  const myClass = useStyle();
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
        if (data.success === true && data.data.length > 0) {
          setBatch(data.data);
          setLoading(false);

          setPin([]);
          toast.success("success");
        } else if (data.success && data.data.length < 1) {
          toast.error("No batch created");
          setBatch([]);
          setLoading(false);
          setPin([]);
        } else {
          setLoading(false);
          console.log(data.error);
          toast.error(data.error);
          setBatch([]);
          setPin([]);
        }
      })
      .catch((err) => {
        setBatch([]);
        setPin([]);
        toast.error(err.message);
        setLoading(false);
      });
  };
  const getPin = async (batch) => {
    setLoading(true);
    const url = `${baseUrl}/pin/${batch}/pins`;
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
        if (data.success === true && data.data.length > 0) {
          setPin(data.data);
          setLoading(false);

          toast.success("success");
        } else {
          setLoading(false);
          console.log(data.error);
          toast.error(data.error);
          setPin([]);
        }
      })
      .catch((err) => {
        setPin([]);
        toast.error(err.message);
        setLoading(false);
      });
  };
  const contVariant = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.3,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const StyledHead = styled(TableHead)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#4bc2bc",
      color: "white",
    },
  }));

  const downloadPdf = () => {
    // const qr = new QRCode(document.createElement("div"), {
    //   text: "Hi",
    //   width: 128,
    //   height: 128,
    //   colorDack: "#0",
    //   colorLight: "#fff",
    //   correctLevel: QRCode.Corr,
    // });

    const doc = new jsPDF();

    doc.autoTable({
      head: [["S/N", "Pin"]],
      body: pin.map((aPin, id) => [id + 1, aPin]),
      theme: "grid",
    });
    const batch = pin[0].slice(-6);
    doc.save("batch" + batch + ".pdf");
  };

  return (
    <DashBoardWrapper>
      {loading && <LinearProgress />}
      <span className="theme-color-bold">Batches</span>
      {/* {Object.entries(pin).length > 0 && (
        <div onClick={downloadPdf}>Download</div>
      )} */}
      <motion.div
        variants={contVariant}
        initial="hidden"
        animate="visible"
        className={classes.container}
      >
        <motion.div
          variants={contVariant}
          className={classes.revenue_container}
        >
          <div className={classes.revenue_header}>
            <span>Revenue</span> <span>Amount</span>
          </div>
          {revenues.length > 0
            ? revenues.map((rev, idx) => {
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
              })
            : `You don't have any revenue to generate a pin`}
        </motion.div>
        <motion.div variants={contVariant} className={classes.group}>
          {batch.length > 0 && (
            <motion.div variant={contVariant} className={classes.root}>
              {" "}
              <TableContainer>
                <TableContainer>
                  <StyledHead>
                    <TableRow>
                      <TableCell
                        className={myClass.cellHead}
                        component="th"
                        scope="row"
                      >
                        S/N
                      </TableCell>
                      <TableCell
                        className={myClass.cellHead}
                        component="th"
                        scope="row"
                      >
                        Batch Number
                      </TableCell>
                      <TableCell className={myClass.cellHead}>Status</TableCell>

                      <TableCell className={myClass.cellHead}>Size</TableCell>
                    </TableRow>
                  </StyledHead>
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
                              <TableCell className={myClass.cell}>
                                {batch.indexOf(aBatch) + 1}
                              </TableCell>
                              <TableCell className={myClass.cell}>
                                {aBatch.batch_no}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                className={
                                  !aBatch.isActive ? myClass.cell : myClass.cell
                                }
                              >
                                {aBatch.isActive
                                  ? "Activated"
                                  : "Not Activated"}
                              </TableCell>

                              <TableCell className={myClass.cell}>
                                {aBatch.size}
                              </TableCell>
                              <TableCell className={myClass.cell}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={() => getPin(aBatch.batch_no)}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : "No data available for this revenue"}
                  </TableBody>
                </TableContainer>
              </TableContainer>
            </motion.div>
          )}
          {batch.length > 0 && pin.length > 0 && (
            <motion.div variant={contVariant} className={classes.pin_table}>
              <TableContainer className={myClass.table}>
                <TableContainer sx={{ minWidth: 650 }}>
                  <StyledHead>
                    <TableRow>
                      <TableCell
                        className={myClass.cellHead}
                        component="th"
                        scope="row"
                      >
                        S/N
                      </TableCell>
                      <TableCell
                        className={myClass.cellHead}
                        component="th"
                        scope="row"
                      >
                        Pin
                      </TableCell>
                    </TableRow>
                  </StyledHead>
                  <TableBody>
                    {pin.length > 0
                      ? pin.map((aPin, idx) => {
                          return (
                            <TableRow
                              key={idx}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                className={myClass.cell}
                                component="th"
                                scope="row"
                              >
                                {idx + 1}
                              </TableCell>
                              <TableCell
                                className={myClass.cell}
                                component="th"
                                scope="row"
                              >
                                {aPin}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : "No pin generated for this batch"}
                  </TableBody>
                </TableContainer>
              </TableContainer>
              <Button
                className={myClass.greenBtn}
                color="primary"
                size="large"
                variant="contained"
                onClick={downloadPdf}
              >
                Download Generated Pin
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </DashBoardWrapper>
  );
};

export default Batch;
