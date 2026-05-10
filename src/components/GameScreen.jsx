import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { Volume2, VolumeX, Star, Moon, Sun, Flame } from 'lucide-react';
import Card from './Card';
import { playSound, playBackground } from '../utils/audio';

const ICONS = [
  { value: 'star', icon: <Star size={40} /> },
  { value: 'moon', icon: <Moon size={40} /> },
  { value: 'sun', icon: <Sun size={40} /> },
  { value: 'comet', icon: <Flame size={40} /> }
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
  const [isChecking, setIsChecking] = useState(false);

  const [modalState, setModalState] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    setCards(generateDeck());
  }, []);

  useEffect(() => {
    playBackground(isMuted);
  }, [isMuted]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver(false); // lose
      return;
    }

    if (matchesFound === 4) {
      onGameOver(true); // win
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 10 && next > 0) {
          playSound('tick', isMuted);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, matchesFound, onGameOver, isMuted]);

  const handleCardClick = (clickedCard) => {
    if (isChecking) return;



    setCards(prev => prev.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    ));

    setFlippedCards(prev => [...prev, clickedCard]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
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

          playSound('match', isMuted);
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

          playSound('mismatch', isMuted);
          showModal('Sorry, but this is not a match', 'danger');
        }, 1000);
      }
    }
  }, [flippedCards, isMuted]);

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
        <button className="btn glass-btn rounded-circle p-2" onClick={onToggleMute}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
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
