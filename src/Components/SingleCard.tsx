import React, { useEffect, useState } from "react";
import cardbt from "../../src/Images/card1.png";
import "../Css/SingleCard.css";

interface card {
  card: { id: number; url: string; matched: boolean };
  handleItem: any;
  flipped: boolean;
  blockCard: boolean;
  handleTimer: () => void;
  counter: number;
}

function SingleCard({
  card,
  handleItem,
  flipped,
  blockCard,
  handleTimer,
  counter,
}: card): JSX.Element {
  const [gameStarted, setGameStarted] = useState(false);

  const handleClickImg = () => {
    if (!blockCard) {
      handleItem(card);
      setGameStarted(true);
    }
  };
  useEffect(() => {
    if (gameStarted === true) {
      handleTimer();
    }
  });
  useEffect(() => {
    if (counter === 16) {
      setGameStarted(false);
    }
  }, [counter]);

  return (
    <div>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.url} alt="card front" width="50px" />
          <img
            className="back"
            src={cardbt}
            alt="card back"
            onClick={handleClickImg}
          />
        </div>
      </div>
    </div>
  );
}
export default SingleCard;
