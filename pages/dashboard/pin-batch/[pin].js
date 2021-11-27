import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { baseUrl } from "../../../context/baseUrl";
import { useGlobalContext } from "../../../context/context";
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
  Modal,
  Button,
} from "@material-ui/core";
import QRCode from "react-qr-code";
import { Box } from "@mui/system";
import Image from "next/image";
const Pin = () => {
  const router = useRouter();
  console.log(router);
  const [pins, setPin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useGlobalContext();

  useEffect(() => {
    if (router.query.pin !== undefined) getPin();
  }, [router.query.pin]);

  const getPin = async () => {
    setLoading(true);
    const url = `${baseUrl}/pin/${router.query.pin}/pins`;
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
        if (data.success && data.data.length > 0) {
          setPin(data.data);
          window.print();
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

  return (
    <>
      <Modal open={loading}>
        <div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <CircularProgress />
        </div>
      </Modal>
      <Box paddingTop="10px" paddingBottom="10px">
        <Image src="/WORDMARK.png" height={70} width={300} />
      </Box>
      {pins.length > 0 && (
        <div>
          <div style={{ fontWeight: "700", fontSize: "25px" }}>
            Batch No: {router.query.pin}{" "}
          </div>
          <QRCode value={router.query.pin} size={170} level="H" />
        </div>
      )}
      {pins.length > 0 ? (
        <Table>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Pin</TableCell>
                <TableCell>QRcode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pins.map((pin, id) => {
                return (
                  <TableRow>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{pin}</TableCell>
                    <TableCell>
                      <QRCode value={pin} size={150} level="H" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </Table>
      ) : (
        "No pin"
      )}
    </>
  );
};

export default Pin;
