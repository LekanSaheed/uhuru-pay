import classes from "./Graph.module.css";
import React from "react";
const Graph = () => {
  const graphData = [
    { text: "item 1", id: 1 },
    { text: "Collection Overview", id: 2 },
    { text: "Tax Payers", id: 3 },
  ];
  return (
    <div className={classes.graph_container}>
      {React.Children.toArray(
        graphData.map((graph) => {
          return (
            <div key={graph.id} className={classes.graph_item}>
              {graph.text}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Graph;
