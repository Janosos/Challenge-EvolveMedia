import React from 'react';
import classNames from 'classnames';

const Card = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <button
      className={classNames('memory-card', {
        'flipped': card.isFlipped || card.isMatched,
        'disabled': disabled || card.isFlipped || card.isMatched
      })}
      onClick={handleClick}
      disabled={disabled || card.isFlipped || card.isMatched}
      aria-label="Memory Card"
    >
      <div className="memory-card-inner">
        <div className="memory-card-back">
          <span>?</span>
        </div>

        <div className="memory-card-front text-primary">
          {card.icon}
        </div>
      </div>
    </button>
  );
};

export default Card;
