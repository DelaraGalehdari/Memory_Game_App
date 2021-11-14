import React, { useEffect, useState } from "react";
import "../Css/ShowCards.css";

import SingleCard from "./SingleCard";

const Images: { url: string; matched: boolean }[] = [
  { url: "https://avatars.dicebear.com/api/female/:seed.svg", matched: false },
  { url: "https://avatars.dicebear.com/api/male/:seed.svg", matched: false },
  {
    url: "https://avatars.dicebear.com/api/initials/:seed.svg",
    matched: false,
  },
  { url: "https://avatars.dicebear.com/api/bottts/:seed.svg", matched: false },
  {
    url: "https://avatars.dicebear.com/api/avataaars/:seed.svg",
    matched: false,
  },
  { url: "https://avatars.dicebear.com/api/micah/:seed.svg", matched: false },
  {
    url: "https://avatars.dicebear.com/api/identicon/:seed.svg",
    matched: false,
  },
  {
    url: "https://avatars.dicebear.com/api/jdenticon/:seed.svg",
    matched: false,
  },
];

const ShowCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectFirst, setSelectFirst] = useState<any | null>(null);
  const [selectSecond, setSelectSecond] = useState<any | null>(null);
  const [blockCard, setBlockCard] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [counter, setCounter] = useState<number>(0);

  //shuffle card
  const shuffleCards = () => {
    const shuffledCards = [...Images, ...Images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setSelectFirst(null);
    setSelectSecond(null);
    setCards(shuffledCards);
    setTimer(60);
    setCounter(0);
  };
  //handle item
  const handleItem = (card: {
    id: number;
    url: string;
    matched: boolean;
  }): void => {
    selectFirst ? setSelectSecond(card) : setSelectFirst(card);
  };

  //reset timer
  const handleTimer = () => {
    if (timer > 0) {
      const counter = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearInterval(counter);
    } else {
      shuffleCards();
    }
  };

  //compare two selected cards
  useEffect(() => {
    if (selectFirst && selectSecond) {
      setBlockCard(true);

      if (selectFirst.url === selectSecond.url) {
        setCounter(counter + 2);
        setCards((oldCards) => {
          return oldCards.map((card) => {
            if (card.url === selectFirst.url) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCards();
      } else {
        setTimeout(() => resetCards(), 1000);
      }
    }
  }, [selectFirst, selectSecond, counter]);

  //reset selected card
  const resetCards = () => {
    setSelectFirst(null);
    setSelectSecond(null);
    setBlockCard(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (counter === 16) {
    }
  });
  //handling timer
  const closeAlert = () => {
    (document.getElementById("alertDiv") as HTMLFormElement).style.display =
      "none";
  };

  return (
    <div className="card-container">
      {counter === 16 ? (
        <div className="alert" id="alertDiv">
          <span className="closebutton" onClick={() => closeAlert()}>
            {/* &times; */}
          </span>
          <strong style={{ fontSize: "20px" }}>Congratulations...</strong>{" "}
          <b style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
            You are the winner
          </b>
          <h2>Your score is : {timer}</h2>
          <button className="btn-alert" onClick={shuffleCards}>
            Play again
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="header-container">
        <button className="btn-reset" onClick={shuffleCards}>
          <span className="text">Reset</span>
        </button>
        <div className="timer-container">
          Timer : <span id="time-remaining">{timer}</span>
        </div>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleItem={handleItem}
            flipped={
              card === selectFirst || card === selectSecond || card.matched
            }
            blockCard={blockCard}
            handleTimer={handleTimer}
            counter={counter}
          />
        ))}
      </div>
    </div>
  );
};
export default ShowCards;
