import { useCallback, useState } from "react";
import { Button } from "~/components/ui/Button";

type Outcome = 'up' | 'down' | 'middle';

export default function SpinTheBottle() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedBet, setSelectedBet] = useState<'up' | 'down' | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const spinBottle = useCallback(() => {
    if (!selectedBet) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Get current rotation and normalize it
    const currentRotation = rotation % 360;
    // Calculate additional rotation needed to complete current spin
    const completionSpin = (360 - currentRotation);
    // Add minimum 10 full rotations plus random final position
    const minimumSpins = 3600; // 10 full rotations
    const extraSpin = Math.floor(Math.random() * 360);
    const totalRotation = rotation + completionSpin + minimumSpins + extraSpin;
    
    setRotation(totalRotation);
    
    setTimeout(() => {
      let outcome: Outcome;
      const normalizedAngle = totalRotation % 360;
      
      // Middle zones are when bottle points horizontally (±10° from 0° and 180°)
      if ((normalizedAngle >= 350 || normalizedAngle < 10) || 
          (normalizedAngle >= 170 && normalizedAngle < 190)) {
        outcome = 'middle';
      } else if (normalizedAngle >= 190 && normalizedAngle < 350) {
        outcome = 'up';
      } else {
        outcome = 'down';
      }
      
      let resultText: string;
      if (outcome === 'middle') {
        resultText = 'Hit the middle! You lose!';
      } else if (outcome === selectedBet) {
        resultText = 'You Win 2X! 🎉';
      } else {
        resultText = 'Try Again!';
      }
      
      setResult(resultText);
      setIsSpinning(false);
      setSelectedBet(null);
    }, 4000);
  }, [selectedBet, rotation]);

  return (
    <div className="glass mt-2 pt-2">
      <div className="row mt-2 row-above-board no-gutters justify-content-center">
        {result && (
          <div className="result-text">
            {result}
          </div>
        )}
      </div>
      
      <div className="row row-board no-gutters justify-content-center">
        <div className="col-auto">
          <div 
            className="bg-node-cms game-board"
            style={{
              backgroundImage: "url('/spin-board.webp')"
            }}
          >
            <div 
              className={`bottle ${isSpinning ? 'animate' : ''}`}
              style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      <div className="bet-buttons">
        <Button 
          onClick={() => setSelectedBet('up')} 
          disabled={isSpinning}
          className={selectedBet === 'up' ? 'selected' : ''}
        >
          Up ⬆️
        </Button>
        <Button 
          onClick={() => setSelectedBet('down')} 
          disabled={isSpinning}
          className={selectedBet === 'down' ? 'selected' : ''}
        >
          Down ⬇️
        </Button>
      </div>
      
      {selectedBet && (
        <Button 
          onClick={spinBottle} 
          disabled={isSpinning}
          className="spin-button"
        >
          {isSpinning ? 'Spinning...' : 'Spin Bottle'}
        </Button>
      )}
    </div>
  );
} 