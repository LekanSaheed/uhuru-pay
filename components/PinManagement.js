import Link from "next/link";
import { useRouter } from "next/router";
import Select from "react-select";
import React from "react";
import { useGlobalContext } from "../context/context";
import { baseUrl } from "../context/baseUrl";
import toast from "react-hot-toast";
import { Button, ListItem, Divider } from "@material-ui/core";
import { motion } from "framer-motion";
import classes from "./PinManagement.module.css";
import ThemedProgress from "./ThemedProgress";

const PinManagement = () => {
  const [allRevenues, setAllRevenues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { logout } = useGlobalContext();

  const router = useRouter();
  const [selected, setSelected] = React.useState("");
  const [size, setSize] = React.useState("");
  const [areaCode, setAreaCode] = React.useState("");
  const [discount, setDiscount] = React.useState("");
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
          setAreaCode("");
          setDiscount("");
          setSize("");
          setSelected("");
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
          {loading && <ThemedProgress />}
          <div style={{ width: "100%" }}>
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
            <label>
              Quantity<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              value={size}
              type="number"
              onChange={(e) => setSize(parseInt(e.target.value))}
              placeholder="Quantity"
            />
          </div>
          <div className={classes.input_container}>
            <label>Area / Beat</label>
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
            disabled={!selected || !size || size === "0"}
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
                      <ListItem>
                        <b>Revenue</b>: {rev.title}
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <b>Amount</b>: {rev.amount}
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <b>Type</b>: {rev.isPin ? "Pin" : "Pinless"}
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <b>Category</b>: {rev.category}
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <b>Status</b>:{" "}
                        <span
                          style={{
                            marginLeft: "3px",
                            textTransform: "capitalize",
                            color:
                              rev.status === "approved"
                                ? "green"
                                : rev.status === "pending"
                                ? "goldenrod"
                                : "red",
                          }}
                        >
                          {" "}
                          {rev.status}
                        </span>
                      </ListItem>
                      <Divider />
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
