import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResolveScreen from './components/ResolveScreen';
import './App.css'; // Vite default, but we mostly use index.css

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [isWin, setIsWin] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default for browser policy

  const handleStart = () => {
    setCurrentScreen('game');
  };

  const handleGameOver = (winStatus) => {
    setIsWin(winStatus);
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
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'game' && (
        <GameScreen 
          onGameOver={handleGameOver} 
          isMuted={isMuted} 
          onToggleMute={toggleMute} 
        />
      )}
      
      {currentScreen === 'resolve' && (
        <ResolveScreen 
          isWin={isWin} 
          onPlayAgain={handlePlayAgain} 
        />
      )}
    </div>
  );
}

export default App;
