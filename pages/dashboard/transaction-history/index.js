import DashboardWrapper from "../../../components/DashBoardWrapper";
import ThemedProgress from "../../../components/ThemedProgress";
import * as React from "react";
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core";
import { baseUrl } from "../../../context/baseUrl";
import { useState, useEffect } from "react";
import moment from "moment";

const History = () => {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(1);
  const transactions = [];
  const [tranxRow, setTranxRow] = useState([]);
  const [allRev, setAllRev] = useState([]);
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const fetchHistory = async () => {
    const url = `${baseUrl}/collections/all/history`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data[0].paginatedResult);
        if (data.success) {
          setTranxRow(data.data[0].paginatedResult);
        }
      })
      .catch((err) => console.log(err));
  };
  const fetchRevenue = async () => {
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
        } else {
          setLoading(false);
          console.log(data.error);
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    fetchRevenue();
    fetchRev();
    fetchHistory();
  }, []);

  const fetchRev = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${baseUrl}/revenue/all`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          // console.log(data);
          setAllRev(data.data);
        } else {
          setLoading(false);
          console.log(data.error);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const getName = (id) => {
    let name = "";
    const revenue = allRev
      .filter((item) => {
        return item.revenue_id === id;
      })
      .map((rev) => {
        return rev.title;
      });

    name += revenue[0];
    return name;
  };

  const getCategory = (id) => {
    let catg = "";
    const revenue = allRev
      .filter((item) => {
        return item.revenue_id === id;
      })
      .map((rev) => {
        return rev.category;
      });

    catg += revenue[0];
    return catg;
  };
  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 90,
      headerClassName: "header",
      cellClassName: "cell bold",
    },
    {
      field: "revenue",
      headerName: "Code",
      width: 130,
      editable: true,
      headerClassName: "header",
      cellClassName: "cell revenueCell",
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
      headerClassName: "header",
      cellClassName: "cell",
    },

    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      editable: true,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "commission",
      headerName: "Commission",
      headerClassName: "header",
      cellClassName: "cell",
      width: 150,
      editable: true,
    },

    {
      field: "pin",
      headerName: "Pin",
      sortable: false,
      width: 200,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "creator_name",
      headerName: "Agent/Collector",
      description: "The agent or collector.",

      width: 160,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "role",
      headerName: "Role",
      description: "Role.",

      width: 100,
      headerClassName: "header",
      cellClassName: "cell",
    },

    {
      field: "updated_at",
      headerName: "Date",
      sortable: false,
      width: 160,
      headerClassName: "header",
      cellClassName: "cell",
    },
  ];
  transactions &&
    transactions.map((t) => {
      console.log(t);
      return t;
    });

  const customTool = () => {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport className={classes.toolbar} />
      </GridToolbarContainer>
    );
  };
  const useStyles = makeStyles({
    root: {
      backgroundColor: "#fff",
      boxShadow: "0 0 10px rgba(0 0 0 /0.1)",
      "& .header": {
        color: "teal",
        fontWeight: "700",
        fontFamily: "brFirma",
      },
      "& .MuiTypography-body2": {
        fontFamily: "brFirma",
        fontSize: "0.7em",
        color: "#000 !important",
      },
      "& .bold": {
        fontWeight: "bolder",
      },
      "& .cell": {
        borderBottom: "solid 1px whitesmoke",
        fontFamily: "brFirma",
        fontSize: "0.8em",
      },
      "& .revenueCell": {
        color: "dodgerblue",
      },
    },
    toolbar: {
      color: "teal",
      padding: "15px 10px",
    },
    background: {
      minHeight: "100vh",
    },
  });
  const classes = useStyles();
  return (
    <DashboardWrapper>
      <div className={classes.background}>
        {loading && <ThemedProgress />}
        <div style={{ height: "80vh", width: "100%" }}>
          <DataGrid
            components={{ Toolbar: customTool }}
            pageSize={30}
            className={classes.root}
            rows={tranxRow.map((trx, id) => {
              return {
                ...trx,
                id: id + 1,
                name:
                  getName(trx.revenue).toLowerCase().charAt(0).toUpperCase() +
                  getName(trx.revenue).toLowerCase().slice(1),
                category:
                  getCategory(trx.revenue)
                    .toLowerCase()
                    .charAt(0)
                    .toUpperCase() +
                  getCategory(trx.revenue).toLowerCase().slice(1),
                updated_at: moment(trx.updated_at).format(
                  "MMM DD, yyyy hh:mm a"
                ),
                commission: trx.commission ? trx.commission : "-",
                creator_name: trx.creator[0].name,
                role: trx.creator[0].role,
              };
            })}
            columns={columns}
            rowsPerPageOptions={[10, 30, 100]}
            // checkboxSelection
            // disableSelectionOnClick
            loading={loading}
            density="compact"
          />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default History;
