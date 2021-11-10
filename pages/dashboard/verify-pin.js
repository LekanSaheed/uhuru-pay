import Link from "next/link";
import { useRouter } from "next/router";
import Select from "react-select";
import React from "react";
import { useGlobalContext } from "../../context/context";
import { baseUrl } from "../../context/baseUrl";
import toast from "react-hot-toast";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import classes from "../../components/PinManagement.module.css";
import DashBoardWrapper from "../../components/DashBoardWrapper";
import { LinearProgress } from "@material-ui/core";

const VerifyPin = () => {
  const [allRevenues, setAllRevenues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { logout } = useGlobalContext();

  const router = useRouter();
  const [selected, setSelected] = React.useState("");
  const [pin, setPin] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const fetchData = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = `${baseUrl}/revenue/all`;
        await fetch(url, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setAllRevenues(data.data);

              setLoading(false);
            } else {
              toast.error("Something went wrong");
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
            setLoading(false);
          });
      };
      fetchData();
    }
    if (!token) {
      logout();
    }
  }, []);

  const handleRevenues = (current) => {
    setSelected(current);
  };
  const verifyPin = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (!token) {
      logout();
    }
    const num = 10;
    const url = `${baseUrl}/collections/${selected.value}/verify`;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pin_code: pin,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Pin found");
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <DashBoardWrapper>
      {loading && <LinearProgress />}
      Verify
      <form className={classes.form}>
        <div className={classes.group}>
          {loading && "loading please wait."}
          <div style={{ width: "100%" }}>
            <label>Revenue</label>
            <Select
              onChange={handleRevenues}
              value={selected}
              options={
                loading
                  ? []
                  : allRevenues.map((rev) => {
                      return {
                        label: rev.title,
                        value: rev.revenue_id,
                      };
                    })
              }
              placeholder="Select a revenue"
            />
          </div>

          <div className={classes.input_container}>
            <label>Pin</label>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Pin"
            />
          </div>

          <Button
            disabled={Object.entries(selected).length < 1 || !pin}
            onClick={verifyPin}
            variant="contained"
            color="primary"
          >
            Verify Pin
          </Button>
        </div>
        {selected && (
          <motion.div
            className={classes.motion}
            animate="visible"
            initial="hidden"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          >
            <div className={classes.card}>
              <div className={classes.details}>Details</div>{" "}
              {allRevenues
                .filter((rev) => rev.revenue_id === selected.value)
                .map((rev, idx) => {
                  return (
                    <div key={idx} className={classes.card_main}>
                      <div>
                        <span>Revenue title: </span>
                        {rev.title}
                      </div>
                      <div>
                        <span>Amount: </span>
                        {rev.amount}
                      </div>
                      <span>Category: </span>
                      {rev.category}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </form>
    </DashBoardWrapper>
  );
};
export default VerifyPin;
