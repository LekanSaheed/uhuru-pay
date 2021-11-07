import { useGlobalContext } from "../context/context";
import React, { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import toast from "react-hot-toast";
import classes from "./AllStaker.module.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { BiCheckCircle, BiEditAlt } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const fetchMembers = async () => {
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setStakeholders(data.data);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchMembers();
    const aPromise = fetchMembers();
    toast.promise(aPromise, {
      loading: "Loading please wait...",
      success: "",
      error: "An error occured",
    });
  }, []);

  const activate = async (id) => {
    const fetchProfile = async () => {
      await fetch(`${baseUrl}/stakeholder/${id}/activate`, {
        method: "GET",
        header: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
            toast.success("Activated");
          } else {
            toast.error(data.error);
          }
        });
    };
    fetchProfile();
    const aPromise = fetchProfile();
    toast.promise(aPromise, {
      loading: "Activating...",
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
          console.log(data);
          if (data.success) {
            toast.success("De-activated");
          } else {
            toast.error(data.error);
          }
        });
    };
    fetchProfile();
    const aPromise = fetchProfile();
    toast.promise(aPromise, {
      loading: "De-activating...",
    });
  };

  return (
    <TableContainer component={Paper}>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllStakeHolders;
