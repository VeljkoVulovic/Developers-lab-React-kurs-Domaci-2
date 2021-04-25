import React, { useState, useEffect } from "react";
import Board from "./Components/Board/Board";
import InitializeDeck from "./Components/Deck/Deck";
import "./App.css";
import Modal from "react-modal";

const App = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const customStyles = {
    content: {
      width: "300px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setCards(InitializeDeck());
  }, []);

  useEffect(() => {
    preloadImages();
  }, [cards]);

  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
        setScore(score + 1);
        if (score === 5) {
          setMessage("You Won!");
          openModal();
        }
      } else {
        setTimeout(resetCards, 1500);
        setAttempts(attempts - 1);
        if (attempts === 1) {
          setMessage("You Lose!");
          openModal();
        }
      }
    }
  };

  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const preloadImages = () => {
    cards.map((card) => {
      const src = `/images/${card.type}.png`;
      new Image().src = src;
    });
  };

  const restartGame = () => {
    setCards(InitializeDeck());
    setAttempts(5);
    setScore(0);
    setSolved([]);
    closeModal();
  };

  return (
    <div>
      <h2 className="mt-5 mb-4">
        <i>Rick & Morty's Memory Game</i>
      </h2>
      <Board
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
      <div className="scoreboard row mt-3">
        <div className="col-3"></div>
        <div className="col-3">
          <h4>Score: {score}</h4>
        </div>
        <div className="col-3">
          <h4>Attempts: {attempts}</h4>
        </div>
        <div className="col-3"></div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 id="message" className="mb-3">{message}</h2>
        <button
          id="restartButton"
          className="btn btn-secondary"
          onClick={restartGame}
        >
          Restart
        </button>
      </Modal>
    </div>
  );
};

export default App;
