import Link from "next/link";
import { useRouter } from "next/router";
import Select from "react-select";
import React from "react";
import { useGlobalContext } from "../context/context";
import { baseUrl } from "../context/baseUrl";
import toast from "react-hot-toast";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import classes from "./PinManagement.module.css";

const PinManagement = () => {
  const [allRevenues, setAllRevenues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { logout } = useGlobalContext();

  const router = useRouter();
  const [selected, setSelected] = React.useState("");
  const [size, setSize] = React.useState(null);
  const [areaCode, setAreaCode] = React.useState("");
  const [discount, setDiscount] = React.useState(null);
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
        const url = `${baseUrl}/revenue/list`;
        await fetch(url, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              setAllRevenues(data.data);

              setLoading(false);
            } else {
              toast.error("Something went wrong");
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
  const generatePin = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (!token) {
      logout();
    }
    const num = 10;
    const url = `${baseUrl}/pin/${selected.value}/generate`;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        area_code: areaCode,
        size: parseInt(size),
        discount: parseInt(discount),
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Pin generated Successfully");
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div>
      Pin Management
      <form className={classes.form}>
        <div className={classes.group}>
          {loading && "loading please wait."}
          <div style={{ width: "60%" }}>
            <Select
              onChange={handleRevenues}
              value={selected}
              options={
                loading
                  ? []
                  : allRevenues.map((rev) => {
                      return {
                        label: rev.title,
                        value: rev._id,
                      };
                    })
              }
              placeholder="Select a revenue"
            />
          </div>
          <div className={classes.input_container}>
            <label>Amount</label>
            <input
              type="number"
              defaultValue={
                selected
                  ? allRevenues
                      .filter((rev) => rev._id === selected.value)
                      .map((i) => i.amount)
                  : 0
              }
              disabled={true}
              placeholder="Amount"
            />
          </div>
          <div className={classes.input_container}>
            <label>Quantity</label>
            <input
              value={size}
              type="number"
              onChange={(e) => setSize(parseInt(e.target.value))}
              placeholder="Quantity"
            />
          </div>
          <div className={classes.input_container}>
            <label>Area Code</label>
            <input
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              placeholder="Area Code"
            />
          </div>
          <div className={classes.input_container}>
            <label>Discount</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
            />
          </div>
          <Button
            disabled={!selected || !size || !areaCode || size === "0"}
            onClick={generatePin}
            variant="contained"
            color="primary"
          >
            Generate Pin
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
                .filter((rev) => rev._id === selected.value)
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
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};
export default PinManagement;
