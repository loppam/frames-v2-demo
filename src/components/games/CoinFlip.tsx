import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/Button";

export default function CoinFlip() {
  const [coinResult, setCoinResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinClass, setCoinClass] = useState('coin');

  const flipCoin = useCallback(() => {
    setIsFlipping(true);
    setCoinClass('coin flipping');
    setCoinResult(null);
    
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      setCoinResult(result);
      setIsFlipping(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isFlipping) {
      setTimeout(() => {
        setCoinClass('coin');
      }, 50);
    }
  }, [isFlipping]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={coinClass}>
        <div className="coin-face coin-front">
          {coinResult === 'heads' ? '👑' : '🌟'}
        </div>
        <div className="coin-face coin-back">
          {coinResult === 'tails' ? '🌙' : '⭐'}
        </div>
      </div>
      
      {coinResult && !isFlipping && (
        <div className="result-text text-xl font-bold text-center">
          {coinResult.toUpperCase()}! 
          {coinResult === 'heads' ? ' 👑' : ' 🌙'}
        </div>
      )}
      
      <Button 
        onClick={flipCoin} 
        disabled={isFlipping}
        className="mt-4"
      >
        {isFlipping ? 'Flipping...' : 'Flip Coin'}
      </Button>
    </div>
  );
} 