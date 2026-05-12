import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Trophy, Frown } from 'lucide-react';
import confetti from 'canvas-confetti';

const ResolveScreen = ({ isWin, onPlayAgain, moves, level }) => {
  useEffect(() => {
    if (isWin) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isWin]);

  return (
    <div className="screen-container">
      <div className="mb-5 d-flex flex-column align-items-center">
        {isWin ? (
          <>
            <Trophy size={100} className="mb-3 text-warning" />
            <h1 className="display-4 fw-bold text-white">Level {level - 1} Cleared!</h1>
            <p className="lead text-white-50 fs-4 mt-2">Completed in <span className="fw-bold text-warning">{moves}</span> moves</p>
          </>
        ) : (
          <>
            <Frown size={100} className="mb-3 text-white-50" />
            <h1 className="display-4 fw-bold text-white">Time's Up!</h1>
            <p className="lead text-white-50 fs-4 mt-2">You made <span className="fw-bold">{moves}</span> moves</p>
          </>
        )}
      </div>

      <div className="mt-4">
        <Button
          variant="light"
          size="lg"
          className="hover-bounce px-5 py-3 fw-bold rounded-pill text-primary"
          onClick={onPlayAgain}
        >
          PLAY AGAIN
        </Button>
      </div>
    </div>
  );
};

export default ResolveScreen;
