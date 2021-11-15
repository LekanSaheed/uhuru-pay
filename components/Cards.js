import classes from "./Cards.module.css";
import React, { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import ACard from "./ACard";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/context";
const Cards = () => {
  const [weekInfo, setWeekInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const myPin = [];
  const [taxPayers, setTaxPayers] = useState([]);
  const [collectionRate, setCollectionRate] = useState([]);
  const { user } = useGlobalContext();
  const [activePins, setActivePins] = useState([]);

  const fetchWeek = async () => {
    const url = `${baseUrl}/info/week`;
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
        console.log(data);
        if (data.success) {
          setWeekInfo(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.error);
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Data: " + err.message);
      });
  };
  const fetchActivePins = async () => {
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
            const activePin = data.data.map((data) => data.activePins);
            myPin.push(activePin);

            const reducePins = myPin.map((pin) =>
              pin.reduce((a, b) => a + b, 0)
            );
            setActivePins(reducePins);
            console.log();
            setLoading(false);
            // data.data.forEach((item) => {
            //   fetch(
            //     `https://upay-api.herokuapp.com/pin/${item.batch_no}/info`,
            //     { method: "GET", headers: { Authorization: `Bearer ${token}` } }
            //   )
            //     .then((res) => res.json())
            //     .then((data) => {
            //       myPin.push(data.active);
            //       console.log(data, item.batch_no);
            //       setTotalPins(myPin.reduce((a, b) => a + b, 0));
            //       console.log(totalPins.reduce((a, b) => a + b, 0));
            //       setLoading(false);
            //     });
            // });
          }
          // else {
          //   setLoading(false);
          //   toast.error(data.error);
          //   console.log(data.error);
          // }
        });
      // .catch((err) => {
      //   toast.error("Error Fetching Data: " + err.message);
      // });
    });
  };

  const fetchTaxPayers = async () => {
    const url = `${baseUrl}/payer/list`;
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
          setTaxPayers(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.error);
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Data: " + err.message);
      });
  };
  const fetchCollectionRate = async () => {
    const url = `${baseUrl}/info/week`;
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
          setCollectionRate(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.error);
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Data: " + err.message);
      });
  };
  React.useEffect(() => {
    fetchWeek();
    fetchActivePins();
    fetchTaxPayers();
    fetchCollectionRate();
  }, []);

  return (
    <div className={classes.cardContainer}>
      <ACard
        title="Total Collections"
        type="week"
        detail="Last 7 days"
        collection={weekInfo}
        loaading={loading}
      />
      <ACard
        title="Total Active pins"
        type="pins"
        detail=""
        pin={activePins.reduce((a, b) => a + b, 0)}
        loaading={loading}
      />
      <ACard
        title="Tax Payers"
        detail=""
        type="payers"
        payer={taxPayers}
        loaading={loading}
      />
      <ACard
        title="Collection Rate"
        type="rate"
        detail="Last 7 days"
        rate={collectionRate}
        loaading={loading}
      />
    </div>
  );
};
export default Cards;
