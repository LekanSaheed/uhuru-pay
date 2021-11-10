import classes from "./Cards.module.css";

const ACard = ({ title, batch, detail, type }) => {
  // Total Collection || Total active pins || Total Tax Payers \\ Collection rate
  return (
    <div className={classes.cards}>
      <span className={classes.title}>{title}</span>
      <br />
      {type === "week" && (
        <span className={classes.figure}>
          {batch.length > 0 ? batch.reduce((a, b) => a + b.amount, 0) : "0"}
        </span>
      )}
      {type === "pins" && (
        <span className={classes.figure}>
          {batch.length > 0 ? batch.reduce((a, b) => a + b.amount, 0) : "0"}
        </span>
      )}
      {type === "rate" && (
        <span className={classes.figure}>
          {batch.length > 0 ? batch.reduce((a, b) => a + b.amount, 0) : "0"}
        </span>
      )}
      {type === "pins" && (
        <span className={classes.figure}>
          {batch.length > 0 && batch.reduce((a, b) => a + b.amount, 0)}
        </span>
      )}{" "}
      {type === "payers" && (
        <span className={classes.figure}>
          {batch.length > 0
            ? batch.reduce((a, b) => a + b.amount + "%", 0)
            : "0%"}
        </span>
      )}
      <br />
      <span className={classes.detail}>{detail}</span>
    </div>
  );
};
export default ACard;
