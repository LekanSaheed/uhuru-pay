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
  Collapse,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Box } from "@mui/system";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import moment from "moment";
const Row = ({ revenue }) => {
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

  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        key={revenue.revenue_id}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell>{revenue.title}</TableCell>

        <TableCell>{revenue.category}</TableCell>

        <TableCell
          className={
            (revenue.status === "approved" ? classes.approved : "") ||
            (revenue.status === "pending" ? classes.pending : "") ||
            (revenue.status === "rejected" ? classes.rejected : "")
          }
        >
          {revenue.status}
        </TableCell>
      </TableRow>

      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Details
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Revenue ID</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={revenue._id}>
                  <TableCell component="th" scope="row">
                    {moment(revenue.created_At).format("yy, mm dd  hh:mm a")}
                  </TableCell>
                  <TableCell>{revenue.revenue_id}</TableCell>
                  <TableCell>{revenue.amount}</TableCell>
                </TableRow>

                {/* ))} */}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </>
  );
};

export default Row;
