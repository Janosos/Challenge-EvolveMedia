import React from 'react';
import { Button } from 'react-bootstrap';
import { Trophy, Frown } from 'lucide-react';

const ResolveScreen = ({ isWin, onPlayAgain }) => {
  return (
    <div className="screen-container">
      <div className="mb-5 d-flex flex-column align-items-center">
        {isWin ? (
          <>
            <Trophy size={100} className="mb-3 text-warning" />
            <h1 className="display-4 fw-bold text-white">You did it!</h1>
          </>
        ) : (
          <>
            <Frown size={100} className="mb-3 text-white-50" />
            <h1 className="display-4 fw-bold text-white">Oops, you didn't find them all</h1>
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
