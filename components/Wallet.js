import classes from "./Wallet.module.css";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { baseUrl } from "../context/baseUrl";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import toast from "react-hot-toast";
const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [funds, setFunds] = useState(0);
  const { user, logout } = useGlobalContext();
  const batches = [];
  const fetchFunds = async () => {
    const codes = user.revenueStreams;
    codes.forEach(async (code) => {
      const url = `${baseUrl}/pin/${code}/batchs`;
      const token =
        typeof window !== "undefined" && localStorage.getItem("accessToken");
      if (!token) {
        logout();
        toast.error("You need to log in again");
      }
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // console.log(data);
            const filtered = data.data
              .filter((batch) => batch.isDispatched)
              .map((batch) => {
                if (batch.discount) {
                  return (batch.amount - batch.discount) * batch.size;
                } else {
                  return batch.amount * batch.size;
                }
              });
            // .reduce((a, b) => a + b, 0);

            batches.push(filtered);
            const reducedFunds = batches
              .map((i) => i.reduce((a, b) => a + b, 0))
              .reduce((a, b) => a + b, 0);
            setFunds(reducedFunds);
            // console.log(reducedFunds);
            // console.log(filtered, "filtered");
            // console.log(data.data, "data");

            setLoading(false);
          } else {
            toast.error(data.error);
          }
        })
        .catch((err) => console.log(err));
    });
  };
  useEffect(() => {
    fetchFunds();
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      animate="visible"
      initial="hidden"
      className={classes.wallet_container}
    >
      <div className={classes.wallet_header}>
        <span style={{ fontWeight: "600" }}>Funds</span>{" "}
      </div>
      <div className={classes.wallet_main}>
        <div className={classes.wallet_title}>Total Balance</div>
        <div
          className={`${classes.wallet_balance} ${
            funds.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).length >= 16
              ? classes.reduce_figure_font
              : undefined
          }`}
        >
          <span style={{ fontSize: "11px" }}> ₦ </span>
          {funds.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <span className="icon-Mailbox" data-icon="&#xe001"></span>
      </div>
    </motion.div>
  );
};
export default Wallet;
