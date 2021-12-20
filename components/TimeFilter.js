import classes from "./TimeFilter.module.css";
import { useState } from "react";
import { useGlobalContext } from "../context/context";

const TimeFilter = (props) => {
  const { filters, dispatch } = useGlobalContext();
  const { onPress } = props;

  return (
    <div className={classes.container}>
      {filters.map((i) => {
        return (
          <div
            className={`${classes.item} ${i.class ? i.class : ""}`}
            key={i.id}
            onClick={() => {
              dispatch({ type: "TOGGLE_FILTERS", payload: { i, classes } });
              onPress(i);
            }}
          >
            {i.text}
          </div>
        );
      })}
    </div>
  );
};

export default TimeFilter;
