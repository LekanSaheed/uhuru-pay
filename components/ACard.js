import classes from "./Cards.module.css";
import CountUp from "react-countup";
const ACard = ({
  title,
  collection,
  detail,
  type,
  loading,
  pin,
  rate,
  payer,
}) => {
  // Total Collection || Total active pins || Total Tax Payers \\ Collection rate

  if (loading) {
    return "loading";
  }
  return (
    <div className={classes.cards}>
      <span className={classes.title}>{title}</span>
      <br />
      {type === "week" && (
        <span className={classes.figure}>
          <CountUp
            end={
              collection.length > 0
                ? collection.reduce((a, b) => a + b.count, 0)
                : "0"
            }
            duration={1}
          />
        </span>
      )}
      {type === "pins" && (
        <span className={classes.figure}>
          <CountUp end={pin} duration={1} />
        </span>
      )}
      {type === "rate" && (
        <span className={classes.figure}>
          {/* {rate.length > 0
            ? // ? rate.reduce((a, b) => a + b.count, 0) / pin &&
              pin
            : 0} */}
          {rate
            ? (rate * 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0"}
          %
        </span>
      )}

      {type === "payers" && (
        <span className={classes.figure}>{/* {payer.payers.length} */}</span>
      )}
      <br />
      <span className={classes.detail}>{detail}</span>
    </div>
  );
};
export default ACard;
