import { useGlobalContext } from "../context/context";
import React, { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import toast from "react-hot-toast";
import classes from "./AllStaker.module.css";
import Select from "react-select";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button,
} from "@material-ui/core";
import { BiCheckCircle, BiEditAlt } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TableComponent from "./TableComponent";

const AllStakeHolders = () => {
  const useStyles = makeStyles({
    active: {
      color: "green",
      fontSize: "34px",
      padding: "7px",
      background: "rgba(0,128,0,.1)",
      borderRadius: "5px",
      cursor: "pointer",
    },
    deactivate: {
      color: "red",
      fontSize: "34px",
      padding: "7px",
      background: "rgba(255,0,0,.1)",
      borderRadius: "5px",
      cursor: "pointer",
    },
  });
  const [edit, setEdit] = React.useState(false);
  const myClass = useStyles();
  const url = `${baseUrl}/stakeholder/list`;

  const { user } = useGlobalContext();
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const isServer = typeof window === "undefined";
  const [stakeholders, setStakeholders] = useState([]);
  React.useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    async function fetchMembers() {
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setStakeholders(data.data);
            console.log(data);
          } else {
            toast.error(data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchMembers();
  }, []);

  const activate = async (id) => {
    await fetch(`${baseUrl}/stakeholder/${id}/activate`, {
      method: "GET",
      header: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Activated");
        } else {
          toast.error(data.error);
        }
      });
  };

  const deactivate = (id) => {
    const fetchProfile = async () => {
      await fetch(`${baseUrl}/stakeholder/${id}/deactivate`, {
        method: "GET",
        header: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("De-activated");
          } else {
            toast.error(data.error);
          }
        });
    };
    fetchProfile();
  };

  return (
    <TableContainer component={TableComponent}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell>Username</TableCell>

            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stakeholders.map((stakeholder) => {
            return (
              <TableRow
                key={stakeholder._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {stakeholder.name}
                </TableCell>

                <TableCell>{stakeholder.username}</TableCell>

                <TableCell>{stakeholder.phone}</TableCell>
                <TableCell>{stakeholder.role}</TableCell>
                <TableCell>
                  {stakeholder.isActive ? (
                    <span onClick={() => deactivate(stakeholder._id)}>
                      <AiOutlineCloseCircle className={myClass.deactivate} />
                    </span>
                  ) : (
                    <span onClick={() => activate(stakeholder._id)}>
                      <BiCheckCircle className={myClass.active} />
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => setEdit(!edit)}>Edit</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {edit && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Select />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default AllStakeHolders;
