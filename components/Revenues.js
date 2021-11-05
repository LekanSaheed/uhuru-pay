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
} from "@mui/material";

const url = `${baseUrl}/revenue/all`;
const Revenues = () => {
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, requestOptions)
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

  return (
    <section>
      <span>All Revenues</span>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow style={{ fontWeight: "bold" }}>
              <TableCell component="th" scope="row">
                Revenue Id
              </TableCell>
              <TableCell align="right">Title</TableCell>

              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenues.map((revenue) => {
              return (
                <>
                  <TableRow
                    key={revenue.revenue_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {revenue.revenue_id}
                    </TableCell>

                    <TableCell align="right">{revenue.title}</TableCell>

                    <TableCell align="right">{revenue.amount}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
export default Revenues;
