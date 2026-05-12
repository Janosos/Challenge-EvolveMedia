import React from 'react';
import { Button } from 'react-bootstrap';

const StartScreen = ({ onStart }) => {
  return (
    <div className="screen-container">
      <div className="slide-in-top mb-5 d-flex flex-column align-items-center">
        <img src="/assets/logo.svg" alt="Memory Match Logo" width="100" height="100" className="mb-3" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 className="display-3 fw-bold">Memory Match</h1>
        <p className="lead text-white-50">Test your memory in 30 seconds!</p>
      </div>
      
      <div className="slide-in-bottom mt-5">
        <Button 
          variant="light" 
          size="lg" 
          className="hover-bounce px-5 py-3 fw-bold rounded-pill text-primary"
          onClick={onStart}
        >
          START GAME
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
