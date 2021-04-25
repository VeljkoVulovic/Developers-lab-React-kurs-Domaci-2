import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

export default function Card({
  id,
  type,
  handleClick,
  flipped,
  height,
  width,
  disabled,
  solved,
}) {
  return (
    <div
      className={`flip-container ${flipped ? "flipped" : ""}`}
      style={{ width, height }}
      onClick={() => (disabled ? null : handleClick(id))}
    >
      <div className="flipper">
        <img
          style={{ width, height }}
          className={flipped ? "front" : "back"}
          src={flipped || solved ? `/images/${type}.jpeg` : `/images/blank.png`}
          alt="imageAlt"
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
};
