import classes from "./Wallet.module.css";
const Wallet = () => {
  return (
    <div className={classes.wallet_container}>
      <div className={classes.wallet_header}>
        <span style={{ fontWeight: "600" }}>Funds</span>{" "}
      </div>
      <div className={classes.wallet_main}>
        <div className={classes.wallet_title}>NGN Balance</div>
        <div className={classes.wallet_balance}>0.00</div>
        <span className="icon-Mailbox" data-icon="&#xe001"></span>
      </div>
    </div>
  );
};
export default Wallet;
