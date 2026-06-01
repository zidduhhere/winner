import React, { useRef } from 'react';
import winner1Img from '../assets/winner-1.jpeg';
import winner2Img from '../assets/winner-2.jpeg';

declare global {
  interface Window {
    html2canvas: any;
  }
}

interface WinnerRevealProps {
  language: 'en' | 'ml';
  playerName: string;
}

export const WinnerReveal: React.FC<WinnerRevealProps> = ({ language, playerName }) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!captureRef.current || !window.html2canvas) return;
    
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS: true,
        scale: 2, // High quality
        backgroundColor: '#f7fff7'
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `WinnerFinder-${playerName.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error capturing screenshot:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div 
        ref={captureRef}
        className="puzzle-card animated-pop winner-container" 
        style={{ borderColor: '#4ecdc4', padding: '3rem', margin: '0 auto', maxWidth: '800px', backgroundColor: '#f7fff7' }}
      >
        <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#ff6b6b', textAlign: 'center' }}>
          {language === 'en' ? "Congratulations!" : "അഭിനന്ദനങ്ങൾ!"}
        </h2>
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1a535c', textAlign: 'center', textTransform: 'uppercase' }}>
          {playerName}
        </h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
          {language === 'en' 
            ? "You solved all the puzzles! Here are the winning photos:" 
            : "നിങ്ങൾ എല്ലാ ചോദ്യങ്ങളും പരിഹരിച്ചു! ഇതാ വിജയികളുടെ ചിത്രങ്ങൾ:"}
        </p>

        <div className="photo-grid" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div className="photo-card" style={{ padding: '10px', backgroundColor: 'white', borderRadius: '12px', border: '4px solid #333', boxShadow: '8px 8px 0px #333' }}>
            <div className="title-badge" style={{ backgroundColor: '#ffe66d', transform: 'rotate(-5deg)', marginBottom: '10px', padding: '5px 15px', fontWeight: 'bold', border: '2px solid #333' }}>
              Winner 1
            </div>
            {winner1Img ? (
              <img src={winner1Img} alt="Winner 1" style={{ maxWidth: '300px', borderRadius: '8px', border: '2px solid #333' }} />
            ) : (
              <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '2px dashed #ccc' }}>
                <p>Image 1 Pending</p>
              </div>
            )}
          </div>
          <div className="photo-card" style={{ padding: '10px', backgroundColor: 'white', borderRadius: '12px', border: '4px solid #333', boxShadow: '8px 8px 0px #333' }}>
            <div className="title-badge" style={{ backgroundColor: '#4ecdc4', transform: 'rotate(5deg)', marginBottom: '10px', padding: '5px 15px', fontWeight: 'bold', border: '2px solid #333' }}>
              Winner 2
            </div>
            {winner2Img ? (
              <img src={winner2Img} alt="Winner 2" style={{ maxWidth: '300px', borderRadius: '8px', border: '2px solid #333' }} />
            ) : (
              <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '2px dashed #ccc' }}>
                <p>Image 2 Pending</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleDownload}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: '4px solid #333',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '4px 4px 0px #333',
          fontWeight: 'bold'
        }}
      >
        📸 {language === 'en' ? "Download Screenshot" : "സ്ക്രീൻഷോട്ട് ഡൗൺലോഡ് ചെയ്യുക"}
      </button>
    </div>
  );
};
