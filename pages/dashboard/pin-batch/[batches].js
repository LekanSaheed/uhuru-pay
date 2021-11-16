import DashBoardWrapper from "../../../components/DashBoardWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../../context/baseUrl";
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
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/styles";
import moment from "moment";
import { motion } from "framer-motion";
import classes from "../Batch.module.css";
import jsPDF from "jspdf";
import ThemedProgress from "../../../components/ThemedProgress";

const Batches = () => {
  const [pin, setPin] = useState([]);
  const [batch, setBatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const revenueCode = router.query.batches;
    const fetchBatches = async () => {
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
    fetchBatches();
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
  const StyledHead = styled(TableHead)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#4bc2bc",
      color: "white",
    },
  }));
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
  return (
    <DashBoardWrapper>
      {loading && <ThemedProgress />}
      <div>Batches for revenue {router.query.batches}</div>

      {batch.length > 0 ? (
        <TableContainer>
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
                <TableCell className={myClass.cellHead}>Size</TableCell>
                <TableCell className={myClass.cellHead}>Amount</TableCell>
                <TableCell className={myClass.cellHead}>Active Pins</TableCell>
                <TableCell className={myClass.cellHead}>Used pins</TableCell>
                <TableCell className={myClass.cellHead}>Discount</TableCell>
                <TableCell className={myClass.cellHead}>Area Code</TableCell>
                <TableCell className={myClass.cellHead}>Date Created</TableCell>
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
                            !aBatch.isActive ? myClass.active : myClass.inActive
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
                          {aBatch.isActive
                            ? aBatch.size - aBatch.activePins
                            : "-"}
                        </TableCell>
                        <TableCell className={myClass.cell}>
                          {aBatch.size - aBatch.activePins}
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
                : "No data available for this revenue"}
            </TableBody>
          </TableContainer>
        </TableContainer>
      ) : (
        <div className="theme-color-bold">
          No data available for selected revenue
        </div>
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
    </DashBoardWrapper>
  );
};

export default Batches;
