
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FocusTrainer = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    moveTarget();
  };

  const moveTarget = () => {
    const x = Math.floor(Math.random() * 80);
    const y = Math.floor(Math.random() * 80);
    setTarget({ x, y });
  };

  const handleTargetClick = () => {
    setScore(s => s + 1);
    moveTarget();
    if (score + 1 >= 10) {
      setGameStarted(false);
      toast({
        title: "Great job!",
        description: `You completed the focus training with ${score + 1} points!`,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-wellness-dark">Focus Trainer</h2>
        <div className="flex items-center gap-4">
          <span className="text-lg">Score: {score}</span>
          <Button onClick={startGame} className="bg-wellness-primary hover:bg-wellness-dark">
            {gameStarted ? 'Restart' : 'Start'} Game
          </Button>
        </div>
      </div>
      {gameStarted && (
        <Card className="h-[400px] relative bg-wellness-light">
          <div
            className="absolute w-8 h-8 bg-wellness-primary rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            onClick={handleTargetClick}
          />
        </Card>
      )}
    </div>
  );
};

export default FocusTrainer;
