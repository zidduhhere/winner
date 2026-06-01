import { useState } from 'react';
import { puzzles } from './puzzles';
import { PuzzleStage } from './components/PuzzleStage';
import { WinnerReveal } from './components/WinnerReveal';
import { Onboarding } from './components/Onboarding';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ml'>('en');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  
  if (!playerName) {
    return <Onboarding onComplete={setPlayerName} />;
  }

  const isCompleted = currentPuzzleIndex >= puzzles.length;
  const currentPuzzle = puzzles[currentPuzzleIndex];

  const handleSolve = () => {
    setCurrentPuzzleIndex(prev => prev + 1);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 style={{ color: 'var(--primary-color)' }}>
          {currentLanguage === 'en' ? "Kulathinkara Winner Finder" : "കുളത്തിങ്കര വിന്നർ ഫൈൻഡർ"}
        </h1>
        <button onClick={toggleLanguage} className="accent" style={{ padding: '5px 10px', fontSize: '1rem' }}>
          {currentLanguage === 'en' ? 'മലയാളം' : 'English'}
        </button>
      </header>

      <main>
        {!isCompleted ? (
          <PuzzleStage 
            puzzle={currentPuzzle} 
            language={currentLanguage} 
            onSolve={handleSolve} 
          />
        ) : (
          <WinnerReveal language={currentLanguage} playerName={playerName} />
        )}
      </main>

      <div className="progress-container">
        {puzzles.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${
              index < currentPuzzleIndex ? 'completed' : index === currentPuzzleIndex ? 'active' : ''
            }`}
            title={`Stage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
