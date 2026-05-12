import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResolveScreen from './components/ResolveScreen';
import CursorTrail from './components/CursorTrail';
import './App.css'; // Vite default, but we mostly use index.css

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [isWin, setIsWin] = useState(false);
  const [finalMoves, setFinalMoves] = useState(0);
  const [level, setLevel] = useState(1);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default for browser policy

  const handleStart = () => {
    setCurrentScreen('game');
  };

  const handleGameOver = (winStatus, moves) => {
    setIsWin(winStatus);
    setFinalMoves(moves);
    if (winStatus) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1);
    }
    setCurrentScreen('resolve');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('game');
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <CursorTrail />
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'game' && (
        <GameScreen 
          level={level}
          onGameOver={handleGameOver} 
          isMuted={isMuted} 
          onToggleMute={toggleMute} 
        />
      )}
      
      {currentScreen === 'resolve' && (
        <ResolveScreen 
          isWin={isWin} 
          moves={finalMoves}
          level={level}
          onPlayAgain={handlePlayAgain} 
        />
      )}
    </div>
  );
}

export default App;
