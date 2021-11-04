import classes from "./Graph.module.css";
import React from "react";
const Graph = () => {
  const graphData = [
    { text: "item 1" },
    { text: "Collection Overview" },
    { text: "Tax Payers" },
  ];
  return (
    <div className={classes.graph_container}>
      {React.Children.toArray(
        graphData.map((graph) => {
          return <div className={classes.graph_item}>{graph.text}</div>;
        })
      )}
    </div>
  );
};

export default Graph;
