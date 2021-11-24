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
import DashBoardWrapper from "../../../components/DashBoardWrapper";
import { baseUrl } from "../../../context/baseUrl";
import { useGlobalContext } from "../../../context/context";
import classes from "../Batch.module.css";
import { motion } from "framer-motion";
import { styled } from "@material-ui/styles";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import SearchBar from "material-ui-search-bar";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemedProgress from "../../../components/ThemedProgress";
import Select from "react-select";

const Batch = () => {
  const router = useRouter();
  const [batch, setBatch] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [pin, setPin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useGlobalContext();
  const [searched, setSearched] = useState("");
  const [selected, setSelected] = useState(null);
  const oldBatch = batch;

  const options =
    revenues.length > 0
      ? revenues.map((rev) => {
          return {
            label: rev.title.toUpperCase() + " " + rev.revenue_id,
            value: rev.revenue_id,
          };
        })
      : [];
  const requestSearch = (e) => {
    batch.filter((aBatch) => {
      const isSearched = aBatch.batch_no
        .toLowerCase()
        .includes(e.toLowerCase());
      if (isSearched) {
        setBatch(isSearched);
      } else setBatch(oldBatch);
    });
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setBatch(oldBatch);
  };

  const useStyle = makeStyles((theme) => ({
    table: {
      overflowY: "scroll",
      maxHeight: "60vh",
      fontSize: "13px !important",
    },
    cellHead: {
      fontWeight: "800",
      color: "#fff",
      fontSize: "11px",
    },
    cell: {
      fontSize: "12px",
      fontWeight: "600",
    },
    greenBtn: {
      backgroundColor: "#4bc2bc",
      "&:hover": {
        background: "#4bc2bc90",
      },
    },
    active: {
      color: "goldenrod",
      fontWeight: "500",
    },
    inActive: {
      color: "green",
      fontWeight: "500",
    },
    serial: {
      fontWeight: "800",
    },
    tRow: {
      "&:hover": {
        background: "#4bc2bc11",
        transition: "0.3s",
      },
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
          setRevenues(data.data.filter((rev) => rev.status === "approved"));
          setLoading(false);
        } else {
          setLoading(false);
          console.log(data.error);
        }
      });
  }, []);

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
    const pinTable = document.querySelector(".pinTable");
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          pinTable.scrollIntoView({ behavior: "smooth", block: "end" });
          setPin(data.data);
          setLoading(false);
          console.log(data);
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
    const doc = new jsPDF();

    doc.autoTable({
      head: [["S/N", "Pin"]],
      body: pin.map((aPin, id) => [id + 1, aPin]),
      theme: "grid",
    });
    const batch = pin[0].slice(-6);
    doc.save("batch" + batch + ".pdf");
  };
  const getBatch = async (revenueCode) => {
    setLoading(true);
    setBatch([]);
    const url = `${baseUrl}/pin/${revenueCode}/batchs`;
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
        if (data.success && data.data.length > 0) {
          setBatch(data.data);
          setLoading(false);
          console.log(data);
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
  const handleSelected = (current) => {
    setSelected(current);

    getBatch(current.value);
  };

  const dispatchBatch = async (batchNo, code) => {
    const url = `${baseUrl}/pin/${batchNo}/dispatch`;
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
        if (data.success) {
          toast.success(data.message);
          setLoading(false);
          getBatch(code);
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
  return (
    <DashBoardWrapper>
      {loading && <ThemedProgress />}
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
        <motion.div variants={contVariant}>
          <div className={classes.revenue_header}>
            <span>Select Revenue</span>
          </div>

          <Select
            options={options}
            value={selected}
            onChange={handleSelected}
            menuPortalTarget={typeof window !== "undefined" && document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
          {/* {revenues.length > 0
            ? revenues.map((rev, idx) => {
                return (
                  <Link key={idx} href={`${router.pathname}/${rev.revenue_id}`}>
                    <a className={classes.revenue}>
                      <span className={classes.title}>{rev.title}</span>
                      <span className={classes.amount}>{rev.amount}</span>
                    </a>
                  </Link>
                  // <div
                  //   key={idx}
                  //   className={classes.revenue}
                  //   onClick={() => getBatch(rev.revenue_id)}
                  // >
                  //   <span className={classes.title}>{rev.title}</span>
                  //   <span className={classes.amount}>{rev.amount}</span>
                  // </div>
                );
              })
            : `You don't have any revenue to generate a pin`} */}
        </motion.div>
        <motion.div
          variants={contVariant}
          className={`${classes.group} batchTable`}
        >
          {batch.length > 0 ? (
            <TableContainer className={myClass.table}>
              <SearchBar />
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
                    <TableCell className={myClass.cellHead}>Quantity</TableCell>
                    <TableCell className={myClass.cellHead}>Amount</TableCell>
                    <TableCell className={myClass.cellHead}>
                      Active Pins
                    </TableCell>
                    <TableCell className={myClass.cellHead}>
                      Used pins
                    </TableCell>
                    <TableCell className={myClass.cellHead}>Discount</TableCell>
                    <TableCell className={myClass.cellHead}>
                      Area / Beat
                    </TableCell>
                    <TableCell className={myClass.cellHead}>
                      Date Created
                    </TableCell>
                    <TableCell className={myClass.cellHead}></TableCell>
                  </TableRow>
                </StyledHead>
                <TableBody>
                  {batch.length > 0
                    ? batch.map((aBatch) => {
                        return (
                          <TableRow
                            className={myClass.tRow}
                            key={aBatch.batch_no}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              className={`${myClass.cell} ${myClass.serial}`}
                            >
                              {batch.indexOf(aBatch) + 1}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              {aBatch.batch_no}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={
                                !aBatch.isActive
                                  ? myClass.active
                                  : myClass.inActive
                              }
                            >
                              {aBatch.isActive ? "Activated" : "Not Activated"}
                            </TableCell>

                            <TableCell className={myClass.cell}>
                              {aBatch.size}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              {aBatch.amount}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              {aBatch.isActive ? aBatch.activePins : "-"}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              {aBatch.activePins
                                ? aBatch.size - aBatch.activePins
                                : "-"}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              {aBatch.discount === null || aBatch.discount === 0
                                ? "No discount"
                                : aBatch.discount}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              {aBatch.area_code}
                            </TableCell>

                            <TableCell className={myClass.cell}>
                              {moment(aBatch.created_At).format(
                                "DD MMM YYYY hh:mm a"
                              )}
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              <Button
                                disabled={aBatch.isDispatched}
                                className={myClass.greenBtn}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() =>
                                  dispatchBatch(aBatch.batch_no, aBatch.revenue)
                                }
                              >
                                Dispatch
                              </Button>
                            </TableCell>
                            <TableCell className={myClass.cell}>
                              <Button
                                className={myClass.greenBtn}
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
                    : ""}
                </TableBody>
              </TableContainer>
            </TableContainer>
          ) : (
            ""
          )}
          <div className="pinTable">
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
          </div>
        </motion.div>
      </motion.div>
    </DashBoardWrapper>
  );
};

export default Batch;
