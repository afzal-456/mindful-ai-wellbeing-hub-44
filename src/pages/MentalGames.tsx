
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Brain, Target, Puzzle } from "lucide-react";
import MemoryGame from "@/components/games/MemoryGame";
import FocusTrainer from "@/components/games/FocusTrainer";
import ProblemSolver from "@/components/games/ProblemSolver";

const MentalGames = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Mental Games</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button 
              onClick={() => setSelectedGame('memory')}
              className={`bg-white p-6 rounded-lg shadow-md text-center transition-all hover:shadow-lg
                ${selectedGame === 'memory' ? 'ring-2 ring-wellness-primary' : ''}`}
            >
              <div className="mb-4 flex justify-center">
                <Brain className="h-12 w-12 text-wellness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Memory Challenge</h3>
              <p className="text-gray-600 mb-4">Exercise your memory with pattern recognition and recall tasks.</p>
            </button>

            <button 
              onClick={() => setSelectedGame('focus')}
              className={`bg-white p-6 rounded-lg shadow-md text-center transition-all hover:shadow-lg
                ${selectedGame === 'focus' ? 'ring-2 ring-wellness-primary' : ''}`}
            >
              <div className="mb-4 flex justify-center">
                <Target className="h-12 w-12 text-wellness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Focus Trainer</h3>
              <p className="text-gray-600 mb-4">Improve concentration through engaging attention exercises.</p>
            </button>

            <button 
              onClick={() => setSelectedGame('problem')}
              className={`bg-white p-6 rounded-lg shadow-md text-center transition-all hover:shadow-lg
                ${selectedGame === 'problem' ? 'ring-2 ring-wellness-primary' : ''}`}
            >
              <div className="mb-4 flex justify-center">
                <Puzzle className="h-12 w-12 text-wellness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
              <p className="text-gray-600 mb-4">Challenge yourself with logic puzzles and brain teasers.</p>
            </button>
          </div>

          {selectedGame === 'memory' && <MemoryGame />}
          {selectedGame === 'focus' && <FocusTrainer />}
          {selectedGame === 'problem' && <ProblemSolver />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentalGames;
