import classes from "./Cards.module.css";
import React, { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import ACard from "./ACard";
import toast from "react-hot-toast";
const Cards = () => {
  const [weekInfo, setWeekInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPins, setTotalPins] = useState([]);
  const [taxPayers, setTaxPayers] = useState([]);
  const [collectionRate, setCollectionRate] = useState([]);

  const fetchWeek = () => {
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
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
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
  const fetchActivePins = () => {
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
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setTotalPins(data.data);
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
  const fetchTaxPayers = () => {
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
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
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
  const fetchCollectionRate = () => {
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
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
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
        batch={weekInfo}
        loaading={loading}
      />
      <ACard
        title="Total Active pins"
        type="pins"
        detail=""
        batch={totalPins}
        loaading={loading}
      />
      <ACard
        title="Tax Payers"
        detail=""
        type="payers"
        batch={taxPayers}
        loaading={loading}
      />
      <ACard
        title="Collection Rate"
        type="rate"
        detail="Last 7 days"
        batch={collectionRate}
        loaading={loading}
      />
    </div>
  );
};
export default Cards;
