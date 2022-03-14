import classes from "./Cards.module.css";
import React, { useState } from "react";
import { baseUrl } from "../context/baseUrl";
import ACard from "./ACard";
import toast from "react-hot-toast";
import moment from "moment";
import { useGlobalContext } from "../context/context";

const Cards = (props) => {
  const { filter } = props;
  const [weekInfo, setWeekInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const myPin = [];
  const [taxPayers, setTaxPayers] = useState([]);
  const [collectionRate, setCollectionRate] = useState([]);
  const { user, logout } = useGlobalContext();
  const [activePins, setActivePins] = useState([]);
  const [filterTrans, setFilterTrans] = useState([]);

  React.useEffect(() => {
    fetchWeek();
    fetchHistory();
    fetchActivePins();
    fetchTaxPayers();
    fetchCollectionRate();
  }, [filter]);

  const fetchHistory = async () => {
    setFilterTrans([]);
    let filterTnx = [];
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const url = `${baseUrl}/collections/all/history`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const trnx = data.data[0].paginatedResult;
          trnx.map((aTrnx) => {
            switch (filter.text) {
              case "Today":
                {
                  const splitFilterTime = filter.date[0].split("T")[0];
                  const splitTrnxTime = aTrnx.updated_at.split("T")[0];
                  if (splitTrnxTime === splitFilterTime) {
                    filterTnx.push(aTrnx);
                    setFilterTrans(filterTnx);
                    setLoading(false);
                  }
                }
                break;
              case "All Time":
                {
                  filterTnx.push(aTrnx);
                  setFilterTrans(filterTnx);
                  setLoading(false);
                }
                break;
              default:
                {
                  const splitFilterStart = filter.date[0].split("T")[0];
                  const splitFilterEnd = filter.date[1].split("T")[0];
                  const splitTrnxTime = aTrnx.updated_at.split("T")[0];
                  if (
                    splitTrnxTime >= splitFilterStart &&
                    splitTrnxTime <= splitFilterEnd
                  ) {
                    filterTnx.push(aTrnx);
                    setFilterTrans(filterTnx);
                    setLoading(false);
                  }
                }
                break;
            }
          });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchWeek = async () => {
    const url = `${baseUrl}/info/revenues`;
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
        // console.log(data);
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
            // console.log();
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
        })
        .catch((err) => {
          toast.error("Error Fetching Data: " + err);
        });
    });
  };

  const fetchTaxPayers = async () => {
    setTaxPayers([]);
    let payerList = [];
    const url = `${baseUrl}/payer/dash`;
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
        // console.log(data.data);
        if (data.success) {
          // setTaxPayers(data.data);
          // setLoading(false);
          const payers = data.data;
          payers.map((aTrnx) => {
            switch (filter.text) {
              case "Today":
                {
                  const splitFilterTime = filter.date[0].split("T")[0];
                  const splitTrnxTime = aTrnx.created_At.split("T")[0];
                  if (splitTrnxTime === splitFilterTime) {
                    payerList.push(aTrnx);
                    setTaxPayers(payerList);
                    setLoading(false);
                  }
                }
                break;
              case "All Time":
                {
                  payerList.push(aTrnx);
                  setTaxPayers(payerList);
                  setLoading(false);
                }
                break;
              default:
                {
                  const splitFilterStart = filter.date[0].split("T")[0];
                  const splitFilterEnd = filter.date[1].split("T")[0];
                  const splitTrnxTime = aTrnx.created_At.split("T")[0];
                  if (
                    splitTrnxTime >= splitFilterStart &&
                    splitTrnxTime <= splitFilterEnd
                  ) {
                    payerList.push(aTrnx);
                    setTaxPayers(payerList);
                    setLoading(false);
                  }
                }
                break;
            }
          });
        } else {
          setLoading(false);
          toast.error(data.error);
          // console.log(data.error);
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

  return (
    <div className={classes.cardContainer}>
      <ACard
        title="Total Collections"
        type="week"
        detail={`₦${filterTrans
          .reduce((a, b) => a + b.amount, 0)
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        collection={filterTrans.length}
        loading={loading}
      />
      <ACard
        title="Total Active pins"
        type="pins"
        detail=""
        pin={activePins.reduce((a, b) => a + b, 0)}
        loading={loading}
      />
      <ACard
        title="Tax Payers"
        type="payers"
        payers={taxPayers.length}
        loading={loading}
      />
      {user.role === "admin" ? (
        <ACard
          title="Collection Volume"
          type="volume"
          volume={filterTrans.reduce((a, b) => a + b.amount, 0)}
          loading={loading}
        />
      ) : (
        <ACard
          title="Collection Rate"
          type="rate"
          rate={filterTrans.length / activePins.reduce((a, b) => a + b, 0)}
          loading={loading}
        />
      )}
    </div>
  );
};
export default Cards;
