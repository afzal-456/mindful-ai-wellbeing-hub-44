
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Puzzle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProblemSolver = () => {
  const { toast } = useToast();
  const [answer, setAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    {
      question: "If a train travels at 60 mph, how long will it take to travel 180 miles?",
      answer: "3",
      hint: "Distance = Speed × Time",
    },
    {
      question: "What number comes next in the sequence: 2, 4, 8, 16, __?",
      answer: "32",
      hint: "Each number is doubled",
    },
    {
      question: "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
      answer: "3",
      hint: "Focus on the ratio of cats to mice and time",
    },
  ];

  const checkAnswer = () => {
    if (answer.trim() === problems[currentProblem].answer) {
      toast({
        title: "Correct!",
        description: "Well done! Try the next problem.",
      });
      if (currentProblem < problems.length - 1) {
        setCurrentProblem(c => c + 1);
        setAnswer('');
      } else {
        toast({
          title: "Congratulations!",
          description: "You've solved all the problems!",
        });
      }
    } else {
      toast({
        title: "Try again",
        description: "That's not quite right. Here's a hint: " + problems[currentProblem].hint,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-wellness-dark">Problem Solving</h2>
        <span className="text-lg">Problem {currentProblem + 1} of {problems.length}</span>
      </div>
      <Card className="p-6">
        <p className="text-lg mb-4">{problems[currentProblem].question}</p>
        <div className="flex gap-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="max-w-xs"
          />
          <Button onClick={checkAnswer} className="bg-wellness-primary hover:bg-wellness-dark">
            Check Answer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProblemSolver;
