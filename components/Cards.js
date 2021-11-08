import classes from "./Cards.module.css";
import React from "react";

const Cards = () => {
  const cardContent = [
    { id: 1, title: "Total Collection", figure: 4, detail: "10 this month" },
    { id: 2, title: "Total Payment", figure: 4, detail: "10 this month" },
    { id: 3, title: "Subscribers rate", figure: 4, detail: "10 this month" },
    { id: 4, title: "Total Traction rate", figure: 5, detail: "10 this month" },
  ];

  return (
    <div className={classes.cardContainer}>
      {React.Children.toArray(
        cardContent.map((card) => {
          return (
            <div key={card.id} className={classes.cards}>
              <span className={classes.title}>{card.title}</span>
              <br />
              <span className={classes.figure}>{card.figure}</span>
              <br />
              <span className={classes.detail}>{card.detail}</span>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Cards;
