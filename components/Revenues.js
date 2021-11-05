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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Revenue Id</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenues.map((revenue) => {
              return (
                <>
                  <TableRow>
                    <TableCell>{revenue.title}</TableCell>

                    <TableCell>{revenue.revenue_id}</TableCell>

                    <TableCell>{revenue.amount}</TableCell>
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
