import classes from "./Graph.module.css";
import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/context";
import { baseUrl } from "../context/baseUrl";

const Graph = () => {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allRevenues, setAllRevenues] = useState([]);
  const { logout } = useGlobalContext();
  const [data, setData] = useState({});
  const [revId, setRevId] = useState([]);
  const fetchRevenues = async () => {
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
        console.log(data);
        if (data.success) {
          setRevenues(data.data);
          setLoading(false);
          setRevId(data.data.map((rev) => rev._id));
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
  const fetchAllRevenues = async () => {
    const url = `${baseUrl}/revenue/all`;
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
          setAllRevenues(data.data);
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
  useEffect(() => {
    const fetchData = async () => {
      await fetchAllRevenues();
      await fetchRevenues();
    };
    fetchData();
  }, []);
  const graphData = [
    { text: "Revenue Distribution", id: 3 },
    { text: "Collection Overview", id: 2 },
  ];

  // const _data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //   datasets: [
  //     {
  //       label: "Revenue Distribution",
  //       data: [],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  //  revenues.map((rev) => {
  //   return {
  //     labels: allRevenues
  //       .filter((i) => {
  //         return rev._id.includes(i.revenue_id);
  //       })
  //       .map((rev) => rev.title),
  //     datasets: [
  //       {
  //         label: "Revenue Distribution",
  //         data: [8, 8, 8],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  // });
  const l = [];
  const d = [];
  const [labels, setLabels] = useState([]);
  const transactions = [];
  const [dataset, setDataset] = useState([]);
  const fetchHistory = async (revenueId) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const url = `${baseUrl}/collections/${revenueId}/history?page=1&limit=13`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          data.data
            .filter((res) => res.paginatedResult.length > 0)
            .map((res) => res.paginatedResult)
            .map((t) => {
              transactions.push(t);
            });
          var merged = [].concat.apply([], transactions);

          merged.map((t, id) => {
            l.push(t.revenue);
            d.push(l.amount);
            setLabels(l);
            setDataset(d);
            console.log(labels, "data");
          });
        }
      });
  };
  const fetchRevenue = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${baseUrl}/revenue/list`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRevenues(data.data);

          setLoading(false);
          const revs = data.data;
          revs.forEach((rev) => {
            fetchHistory(rev.revenue_id);
          });
        } else {
          setLoading(false);
          console.log(data.error);
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    fetchRevenue();
  }, []);
  const _data = {
    labels: allRevenues
      ? allRevenues
          .filter((rev) => {
            const id = revenues.map((i) => i._id);
            return id.includes(rev.revenue_id);
          })
          .sort((a, b) => (a.revenue_id > b.revenue_id ? 1 : -1))
          .map((rev) => rev.title)
      : [],
    datasets: [
      {
        label: "Revenue Distribution",
        data: revenues
          ? revenues
              .sort((a, b) => (a.revenue_id > b.revenue_id ? 1 : -1))
              .map((rev) => rev.count)
          : [0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const line = {
    labels: labels,
    datasets: [
      {
        label: "Tnx",
        data: dataset,
        fill: true,
        backgroundColor: "rgba(75,194,188,0.2",
        borderColor: "rgb(75,194,188)",
      },
    ],
  };
  return (
    <div className={classes.graph_container}>
      <div className={classes.graph_item}>
        Revenue Distribution
        <Doughnut data={_data} width={100} height={100} />
      </div>

      <div className={`${classes.graph_item} ${classes.last}`}>
        Collection Overview
        <Line data={line} options={options} />
      </div>
    </div>
  );
};

export default Graph;
