import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button, IconButton, Paper, Toolbar } from "@material-ui/core";
import ProfileWrapper from "../../../../components/ProfileWrapper";
import Link from "next/link";
import { baseUrl } from "../../../../context/baseUrl";
import { useGlobalContext } from "../../../../context/context";
import { useRouter } from "next/router";
import { DataGrid } from "@mui/x-data-grid";

import { Delete } from "@material-ui/icons";

const Bank = () => {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [banks, setBanks] = useState([]);
  const [loading, setloading] = useState(true);
  const [index, setIndex] = useState([]);
  useEffect(() => {
    user.role === "admin" && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchBanks();
  }, []);

  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const fetchBanks = async () => {
    await fetch(`${baseUrl}/accounts/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setBanks(data.data);
          setloading(false);
        } else {
          console.log(data.error);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const deleteBank = async (bankId) => {
    const url = `${baseUrl}/accounts/${bankId}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchBanks();
      })
      .catch((err) => console.log(err));
  };

  const customTooltip = () => {
    return (
      <Toolbar title="delete">
        <IconButton
          onClick={() => {
            if (index.length > 0) {
              index.forEach((_id) => {
                deleteBank(_id);
              });
            }
          }}
        >
          <Delete style={{ color: "4bc2bc" }} />
        </IconButton>
      </Toolbar>
    );
  };
  const columns = [
    { field: "sn", headerName: "S/N", width: 90 },
    { field: "gt", headerName: "Id", width: 90 },
    { field: "bank_name", headerName: "Bank Name", width: 200 },
    { field: "full_name", headerName: "Account Name", width: 200 },
    { field: "account_number", headerName: "Account Number", width: 150 },
  ];

  console.log(index);
  return (
    <ProfileWrapper>
      <div>
        <Box
          padding="10px"
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          Bank{" "}
          <Link href="/dashboard/profile/bank-details/add-new">
            <Button
              variant="contained"
              color="primary"
              hover
              style={{ background: "#4bc2bc", borderRadius: "14px" }}
            >
              Add New
            </Button>
          </Link>
        </Box>

        <Paper>
          <div style={{ height: "50vh" }}>
            <DataGrid
              columns={columns}
              rows={banks.map((bank, id) => {
                return {
                  ...bank,
                  sn: id + 1,
                  id: bank._id,
                  gt: bank.id,
                };
              })}
              checkboxSelection
              disableColumnMenu
              loading={loading}
              components={{ Toolbar: customTooltip }}
              onSelectionModelChange={(_id) => {
                setIndex(_id);
              }}
            />
          </div>
        </Paper>
      </div>
    </ProfileWrapper>
  );
};

export default Bank;
