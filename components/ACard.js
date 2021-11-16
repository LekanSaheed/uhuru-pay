import classes from "./Cards.module.css";
import CountUp from "react-countup";
import UhuruSkeleton from "./UhuruSkeleton";
const ACard = ({
  title,
  collection,
  detail,
  type,
  loading,
  pin,
  rate,
  payers,
  volume,
}) => {
  // Total Collection || Total active pins || Total Tax Payers \\ Collection rate

  return (
    <div className={classes.cards}>
      {loading ? (
        <UhuruSkeleton />
      ) : (
        <>
          {" "}
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
          {type === "volume" && (
            <span className={classes.figure}>₦{volume ? volume : 0}</span>
          )}
          {type === "payers" && (
            <span className={classes.figure}>{payers}</span>
          )}
          <br />
          <span className={classes.detail}>{detail}</span>
        </>
      )}
    </div>
  );
};
export default ACard;
