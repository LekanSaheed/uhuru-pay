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

const url = `${baseUrl}/revenue/list`;
const Revenues = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  console.log(user.token);
  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
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
            <TableRow>
              <TableCell component="th" scope="row">
                Title
              </TableCell>
              <TableCell>Amount</TableCell>

              <TableCell>Category</TableCell>
              <TableCell>Date Created</TableCell>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
export default Revenues;
