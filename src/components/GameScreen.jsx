import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Card from './Card';
import { playSound, playBackground } from '../utils/audio';

const basePath = import.meta.env.BASE_URL;

const ICONS = [
  { value: 'star', icon: <img src={`${basePath}assets/star.svg`} alt="star" width="40" height="40" /> },
  { value: 'moon', icon: <img src={`${basePath}assets/moon.svg`} alt="moon" width="40" height="40" /> },
  { value: 'sun', icon: <img src={`${basePath}assets/sun.svg`} alt="sun" width="40" height="40" /> },
  { value: 'comet', icon: <img src={`${basePath}assets/comet.svg`} alt="comet" width="40" height="40" /> }
];

const INITIAL_TIME = 30;

const generateDeck = () => {
  const deck = [...ICONS, ...ICONS].map((item, index) => ({
    ...item,
    id: index,
    isFlipped: false,
    isMatched: false
  }));
  return deck.sort(() => Math.random() - 0.5);
};

const GameScreen = ({ onGameOver, isMuted, onToggleMute }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchesFound, setMatchesFound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const [modalState, setModalState] = useState({ show: false, message: '', type: '' });
  
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    setCards(generateDeck());
  }, []);

  useEffect(() => {
    playBackground(isMuted);
  }, [isMuted]);

  // Handle timer countdown
  useEffect(() => {
    if (matchesFound === 4 || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [matchesFound, timeLeft <= 0]); // only reset interval when game over state changes

  // Handle tick sounds
  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0 && matchesFound < 4) {
      playSound('tick', isMutedRef.current);
    }
  }, [timeLeft, matchesFound]);

  // Handle game over logic
  useEffect(() => {
    if (timeLeft <= 0 && matchesFound < 4) {
      onGameOver(false, moves); // lose
    }
    if (matchesFound === 4) {
      onGameOver(true, moves); // win
    }
  }, [timeLeft, matchesFound, onGameOver, moves]);

  const handleCardClick = (clickedCard) => {
    if (isChecking) return;

    // Prevent clicking the same card twice rapidly or clicking a 3rd card
    if (flippedCards.length >= 2 || flippedCards.some(c => c.id === clickedCard.id)) return;

    setFlippedCards(prev => {
      const newFlipped = [...prev, clickedCard];
      if (newFlipped.length === 2) {
        setIsChecking(true);
      }
      return newFlipped;
    });

    setCards(prev => prev.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    ));
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = flippedCards;

      if (first.value === second.value) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.value === first.value ? { ...card, isMatched: true } : card
          ));
          setMatchesFound(prev => prev + 1);
          setFlippedCards([]);
          setIsChecking(false);

          playSound('match', isMutedRef.current);
          showModal('Nice! It\'s a match', 'success');
        }, 500);
      } else {
        // Mismatch
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            (card.id === first.id || card.id === second.id) ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
          setIsChecking(false);

          playSound('mismatch', isMutedRef.current);
          showModal('Sorry, but this is not a match', 'danger');
        }, 1000);
      }
    }
  }, [flippedCards]); // Removed isMuted to prevent rogue re-triggering

  const showModal = (message, type) => {
    setModalState({ show: true, message, type });
    setTimeout(() => {
      setModalState({ show: false, message: '', type: '' });
    }, 1200); // Auto dismiss
  };

  return (
    <div className="screen-container">
      <div className="game-header">
        <div className={`timer ${timeLeft <= 10 ? 'urgent' : ''}`}>
          {timeLeft}s
        </div>
        <div className="timer bg-dark text-white opacity-75">
          Moves: {moves}
        </div>
        <button className="btn glass-btn rounded-circle p-2" onClick={onToggleMute}>
          {isMuted ? <img src={`${basePath}assets/sound--off.svg`} alt="Muted" width="24" height="24" /> : <img src={`${basePath}assets/sound--on.svg`} alt="Unmuted" width="24" height="24" />}
        </button>
      </div>

      <div className="memory-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={isChecking}
          />
        ))}
      </div>

      <Modal show={modalState.show} centered backdrop="static" keyboard={false}>
        <Modal.Body className={`text-center py-4 bg-${modalState.type} text-white rounded`}>
          <h4 className="m-0 fw-bold">{modalState.message}</h4>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GameScreen;
