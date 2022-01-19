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
import { useState } from "react";
import { Button } from "@material-ui/core";
import toast from "react-hot-toast";
const EditRevenue = ({ open, selected, setOpen, fetchRev, setSelected }) => {
  const [edited, setEdited] = useState(null);
  const [loading, setLoading] = useState(false);
  const editRevenue = async () => {
    setLoading(true);
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const url = `${baseUrl}/revenue/${selected && selected._id}/edit`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(edited),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          toast.success(data.message);
          setOpen(false);
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
            <AppBar position="sticky">
              <Box display="flex" justifyContent="space-between">
                <span>Edit Revenue</span>{" "}
                <IconButton
                  onClick={() => {
                    setOpen(false);
                    setSelected(null);
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
              <div>
                {" "}
                <label>Amount</label>
                <input
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
              <div>
                {" "}
                <label>Account</label>
                Account here Good
              </div>
              <Button onClick={editRevenue}>Save</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Modal>
    </div>
  );
};

export default EditRevenue;
