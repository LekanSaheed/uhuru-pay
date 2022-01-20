import { Close } from "@material-ui/icons";
import {
  Modal,
  Dialog,
  DialogContent,
  AppBar,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { baseUrl } from "../context/baseUrl";
import ThemedProgress from "./ThemedProgress";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import toast from "react-hot-toast";
import classes from "./EditRevenue.module.css";
import Select from "react-select";
const EditRevenue = ({ open, selected, setOpen, fetchRev, setSelected }) => {
  const [edited, setEdited] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bankLoading, setbankLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState([]);
  const [currentBank, setCurrentBank] = useState(null);
  console.log(currentBank, bank, "Current bank");
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const fetchAccounts = async () => {
    setLoading(true);
    await fetch(`${baseUrl}/accounts/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.success) {
          console.log(data);
          setbankLoading(false);
          await setCurrentBank(
            selected && selected.settlementAccount
              ? {
                  label:
                    selected &&
                    data.data
                      .filter(
                        (b) => b.subaccount_id === selected.settlementAccount
                      )
                      .map((b) => `${b.account_number} ${b.bank_name}`)[0],
                  value: selected && selected.settlementAccount,
                }
              : null
          );
          setBank(data.data);
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
          setbankLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAccounts();
  }, [selected]);

  const bankOptions = bank.map((b) => {
    return {
      value: b.subaccount_id,
      label: b.account_number + " " + b.bank_name,
    };
  });

  const editRevenue = async () => {
    setLoading(true);

    const url = `${baseUrl}/revenue/${selected && selected._id}/edit`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edited),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          toast.success("Saved Successfully");
          setOpen(false);
          setCurrentBank(null);
          setSelected(null);
          setEdited(null);
          fetchRev();
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDataChange = (data) => {
    console.log(edited);
    setEdited((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };
  return (
    <div>
      <Modal open={open}>
        <Dialog open={open} fullWidth>
          <DialogContent>
            {loading && <ThemedProgress />}
            <AppBar
              elevation={0}
              position="sticky"
              style={{
                background: "#fff",
                color: "black !important",
                boxShadow: "none",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <b style={{ color: "#000 !important" }}>Edit Revenue</b>{" "}
                <IconButton
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    setSelected(null);
                    setCurrentBank({});
                    setLoading(false);
                    setEdited(null);
                    console.log(selected);
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </AppBar>
            <Box>
              <div>
                {edited && edited.title
                  ? edited.title
                  : selected && selected.title !== undefined && selected.title}
              </div>
              <div
                style={{ marginTop: "10px" }}
                className={classes.input_container}
              >
                <label>Amount</label>
                <input
                  type="number"
                  min="0"
                  disabled={loading}
                  onChange={(e) => handleDataChange({ amount: e.target.value })}
                  value={
                    edited && edited.amount
                      ? edited.amount
                      : selected &&
                        selected.amount !== undefined &&
                        selected.amount
                  }
                />
              </div>

              <div className={classes.input_container}>
                {" "}
                <label>Account</label>
                <Select
                  placeholder="Select Settlement Account"
                  isLoading={loading}
                  isDisabled={loading}
                  style={{ fontFamily: "brFirma" }}
                  options={bankOptions}
                  value={
                    currentBank
                    // .subaccount_id !== undefined
                    //   ? currentBank
                    //   : edited && edited.settlementAccount
                  }
                  onChange={(e) => {
                    handleDataChange({ settlementAccount: e.value });
                    setCurrentBank(e);
                  }}
                />
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                color="primary"
                disabled={loading}
                style={{
                  background: loading ? "#bababa" : "#4bc2bc",
                  color: "#fff",
                  fontFamily: "brFirma",
                }}
                onClick={editRevenue}
              >
                Save
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Modal>
    </div>
  );
};

export default EditRevenue;
