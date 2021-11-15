import { LinearProgress, makeStyles } from "@material-ui/core";

const ThemedProgress = () => {
  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#4bc2bc",
      },
    },
  }));
  const classes = useStyles();
  return <LinearProgress className={classes.root} />;
};

export default ThemedProgress;
