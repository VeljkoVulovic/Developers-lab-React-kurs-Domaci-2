import React from "react";
import "./Board.css";
import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function Board({
  solved,
  disabled,
  cards,
  flipped,
  handleClick,
}) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          type={card.type}
          width={150}
          height={150}
          flipped={flipped.includes(card.id)}
          handleClick={() => handleClick(card.id)}
          disabled={disabled || solved.includes(card.id)}
          solved={solved.includes(card.id)}
        />
      ))}
    </div>
  );
}

Board.propTypes = {
  disabled: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
};
