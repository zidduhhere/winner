import React, { useState, useRef, useEffect } from 'react';
import type { Puzzle } from '../puzzles';
import './otp.css';

interface PuzzleStageProps {
  puzzle: Puzzle;
  language: 'en' | 'ml';
  onSolve: () => void;
}

export const PuzzleStage: React.FC<PuzzleStageProps> = ({ puzzle, language, onSolve }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const expectedLength = puzzle.answer.length;
  const isOtp = puzzle.inputType === 'otp';
  
  const [otpValues, setOtpValues] = useState<string[]>(Array(expectedLength).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isFillable = (index: number) => {
    if (puzzle.answer[index] === ' ') return false;
    if (puzzle.displayMask && puzzle.displayMask[index] !== '_') return false;
    return true;
  };

  useEffect(() => {
    setAnswer('');
    setError(false);
    setShowHint(false);
    
    // Initialize OTP values with pre-filled characters if displayMask exists
    const initialOtp = Array(expectedLength).fill('').map((_, i) => {
      if (puzzle.displayMask && puzzle.displayMask[i] !== '_' && puzzle.displayMask[i] !== ' ') {
        return puzzle.displayMask[i];
      }
      return '';
    });
    setOtpValues(initialOtp);
  }, [puzzle, expectedLength]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1]; // Take only last char
    
    const newOtp = [...otpValues];
    newOtp[index] = value.toUpperCase();
    setOtpValues(newOtp);

    // Auto focus next
    if (value !== '' && index < expectedLength - 1) {
      let nextIndex = index + 1;
      while (nextIndex < expectedLength && !isFillable(nextIndex)) {
        nextIndex++;
      }
      if (nextIndex < expectedLength && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      let prevIndex = index - 1;
      while (prevIndex >= 0 && !isFillable(prevIndex)) {
        prevIndex--;
      }
      if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
        inputRefs.current[prevIndex]?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let currentAnswer = answer;
    if (isOtp) {
      currentAnswer = otpValues.map((v, i) => puzzle.answer[i] === ' ' ? ' ' : v).join('');
    }

    if (currentAnswer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setError(false);
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Reset for animation
    }
  };

  const firstFillableIndex = Array.from({length: expectedLength}).findIndex((_, i) => isFillable(i));

  return (
    <div className="puzzle-card animated-pop">
      <div className="title-badge">
        Stage {puzzle.id}
      </div>
      <div className="question-text">
        {puzzle.question[language]}
      </div>
      
      {puzzle.audioSrc && (
        <audio controls src={puzzle.audioSrc} />
      )}

      {puzzle.imageSrcs && puzzle.imageSrcs.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {puzzle.imageSrcs.map((src, idx) => (
            <img 
              key={idx} 
              src={src} 
              alt={`Hint ${idx + 1}`} 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '3px solid var(--border-color)', boxShadow: '4px 4px 0px var(--border-color)' }}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isOtp ? (
          <div className="otp-container">
            {Array.from({ length: expectedLength }).map((_, index) => {
              const isSpace = puzzle.answer[index] === ' ';
              if (isSpace) {
                return <div key={index} className="otp-space" />;
              }
              const isPreFilled = !isFillable(index);
              return (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  className={`otp-input ${error ? 'error-shake' : ''} ${isPreFilled ? 'pre-filled' : ''}`}
                  value={otpValues[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  autoFocus={index === firstFillableIndex}
                  disabled={isPreFilled}
                />
              );
            })}
          </div>
        ) : (
          <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={language === 'en' ? "Your answer..." : "നിങ്ങളുടെ ഉത്തരം..."}
            className={error ? 'error-shake' : ''}
            autoFocus
          />
        )}
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
          <button type="submit" className="primary">
            {language === 'en' ? "Submit" : "സമർപ്പിക്കുക"}
          </button>
          {puzzle.hint && (
            <button 
              type="button" 
              className="accent" 
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? (language === 'en' ? "Hide Hint" : "സൂചന മറയ്ക്കുക") : (language === 'en' ? "Hint" : "സൂചന")}
            </button>
          )}
        </div>
      </form>

      {showHint && puzzle.hint && (
        <div className="feedback" style={{ marginTop: '1rem', backgroundColor: '#ffe66d' }}>
          💡 {puzzle.hint[language]}
        </div>
      )}
      
      {error && (
        <div className="feedback error error-shake">
          {language === 'en' ? "Incorrect! Try again." : "തെറ്റാണ്! വീണ്ടും ശ്രമിക്കുക."}
        </div>
      )}
    </div>
  );
};
