import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '10vh', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
        Welcome to the Winner Finder!
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Enter your name to begin the puzzle challenge.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          style={{
            padding: '1rem',
            fontSize: '1.5rem',
            width: '100%',
            maxWidth: '300px',
            borderRadius: '8px',
            border: 'var(--border-width) solid var(--border-color)',
            boxShadow: '4px 4px 0px var(--border-color)',
            outline: 'none',
            fontFamily: 'inherit',
            textAlign: 'center'
          }}
          autoFocus
        />
        <button 
          type="submit" 
          disabled={!name.trim()}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            marginTop: '1rem',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            opacity: name.trim() ? 1 : 0.5
          }}
        >
          START GAME
        </button>
      </form>
    </div>
  );
}
