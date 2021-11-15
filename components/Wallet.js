import classes from "./Wallet.module.css";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { baseUrl } from "../context/baseUrl";
import CountUp from "react-countup";
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
              .filter((batch) => batch.isActive)
              .map((batch) => (batch.amount - batch.discount) * batch.size);
            // .reduce((a, b) => a + b, 0);

            batches.push(filtered);
            const reducedFunds = batches
              .map((i) => i.reduce((a, b) => a + b, 0))
              .reduce((a, b) => a + b, 0);
            setFunds(reducedFunds);
            console.log(funds);
            setLoading(false);
          }
        });
    });
  };
  useEffect(() => {
    fetchFunds();
  }, []);
  return (
    <div className={classes.wallet_container}>
      <div className={classes.wallet_header}>
        <span style={{ fontWeight: "600" }}>Funds</span>{" "}
      </div>
      <div className={classes.wallet_main}>
        <div className={classes.wallet_title}>Total Balance</div>
        <div className={classes.wallet_balance}>
          ₦
          {funds.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <span className="icon-Mailbox" data-icon="&#xe001"></span>
      </div>
    </div>
  );
};
export default Wallet;
