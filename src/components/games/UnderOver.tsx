import { useCallback, useState } from "react";
import { Button } from "~/components/ui/Button";

type Bet = 'under' | 'seven' | 'over' | null;

export default function UnderOver() {
  const [dice1, setDice1] = useState<number | null>(null);
  const [dice2, setDice2] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet>(null);
  const [result, setResult] = useState<string | null>(null);

  const rollDice = useCallback(() => {
    if (!selectedBet) return;
    
    setIsRolling(true);
    setResult(null);
    
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const sum = d1 + d2;
      
      setDice1(d1);
      setDice2(d2);
      
      let outcome: string;
      if (sum < 7 && selectedBet === 'under') outcome = 'You Win! 🎉';
      else if (sum === 7 && selectedBet === 'seven') outcome = 'You Win! 🎯';
      else if (sum > 7 && selectedBet === 'over') outcome = 'You Win! 🎊';
      else outcome = 'Try Again! 🎲';
      
      setResult(outcome);
      setIsRolling(false);
      setSelectedBet(null);
    }, 1000);
  }, [selectedBet]);

  const renderDots = (value: number) => {
    return (
      <div className={`dots-${value}`}>
        {Array(value).fill(null).map((_, i) => (
          <div key={i} className="dot" />
        ))}
      </div>
    );
  };

  return (
    <div className="dice-game">
      <div className="dice-container">
        <div className={`dice ${isRolling ? 'rolling' : ''}`}>
          {dice1 ? renderDots(dice1) : '?'}
        </div>
        <div className={`dice ${isRolling ? 'rolling' : ''}`}>
          {dice2 ? renderDots(dice2) : '?'}
        </div>
      </div>
      
      <div className="bet-buttons">
        <Button 
          onClick={() => setSelectedBet('under')} 
          disabled={isRolling}
          className={selectedBet === 'under' ? 'selected' : ''}
        >
          Under 7
        </Button>
        <Button 
          onClick={() => setSelectedBet('seven')} 
          disabled={isRolling}
          className={selectedBet === 'seven' ? 'selected' : ''}
        >
          Seven
        </Button>
        <Button 
          onClick={() => setSelectedBet('over')} 
          disabled={isRolling}
          className={selectedBet === 'over' ? 'selected' : ''}
        >
          Over 7
        </Button>
      </div>
      
      {selectedBet && (
        <Button 
          onClick={rollDice} 
          disabled={isRolling}
          className="roll-button"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
      )}
      
      {result && (
        <div className="result-text">
          {result}
          {dice1 && dice2 && (
            <div className="sum-text">
              Sum: {dice1 + dice2}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 