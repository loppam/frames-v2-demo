import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/Button";

export default function CoinFlip() {
  const [coinResult, setCoinResult] = useState<"heads" | "tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinClass, setCoinClass] = useState("coin");
  const [userGuess, setUserGuess] = useState<"heads" | "tails" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const flipCoin = useCallback(() => {
    if (!userGuess) return;

    setIsFlipping(true);
    setCoinClass("coin flipping");
    setCoinResult(null);
    setIsCorrect(null);

    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      setCoinResult(result);
      setIsCorrect(result === userGuess);
      setIsFlipping(false);
      setUserGuess(null);
    }, 1000);
  }, [userGuess]);

  useEffect(() => {
    if (!isFlipping) {
      setTimeout(() => {
        setCoinClass("coin");
      }, 50);
    }
  }, [isFlipping]);

  return (
    <div className="flex flex-col items-center gap-4">
      {coinResult && !isFlipping && (
        <div className="result-text text-xl font-bold text-center">
          {coinResult.toUpperCase()}!{coinResult === "heads" ? " 👑" : " 🌙"}
          <div
            className={`mt-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}
          >
            {isCorrect ? "You guessed correctly! 🎉" : "Try again! 🎯"}
          </div>
        </div>
      )}
      <div className={coinClass}>
        <div className="coin-face coin-front">
          {coinResult === "heads" ? "👑" : "🌟"}
        </div>
        <div className="coin-face coin-back">
          {coinResult === "tails" ? "🌙" : "⭐"}
        </div>
      </div>
      <div className="bet-buttons">
        <Button
          onClick={() => setUserGuess("heads")}
          disabled={isFlipping}
          className={userGuess === "heads" ? "selected" : ""}
        >
          Heads 👑
        </Button>
        <Button
          onClick={() => setUserGuess("tails")}
          disabled={isFlipping}
          className={userGuess === "tails" ? "selected" : ""}
        >
          Tails 🌙
        </Button>
      </div>
      {userGuess && (
        <Button onClick={flipCoin} disabled={isFlipping} className="mt-4">
          {isFlipping ? "Flipping..." : "Flip Coin"}
        </Button>
      )}
    </div>
  );
}
