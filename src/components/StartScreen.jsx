import React from 'react';
import { Button } from 'react-bootstrap';
import { BrainCircuit } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="screen-container">
      <div className="slide-in-top mb-5 d-flex flex-column align-items-center">
        <BrainCircuit size={100} className="mb-3 text-white" />
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
