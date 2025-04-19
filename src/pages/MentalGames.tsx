
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Brain, Target, Puzzle, Focus } from "lucide-react";

const MentalGames = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Mental Games</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Brain className="h-12 w-12 text-wellness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Memory Challenge</h3>
              <p className="text-gray-600 mb-4">Exercise your memory with pattern recognition and recall tasks.</p>
              <Button className="bg-wellness-primary hover:bg-wellness-dark">Play Now</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Target className="h-12 w-12 text-wellness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Focus Trainer</h3>
              <p className="text-gray-600 mb-4">Improve concentration through engaging attention exercises.</p>
              <Button className="bg-wellness-primary hover:bg-wellness-dark">Play Now</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Puzzle className="h-12 w-12 text-wellness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
              <p className="text-gray-600 mb-4">Challenge yourself with logic puzzles and brain teasers.</p>
              <Button className="bg-wellness-primary hover:bg-wellness-dark">Play Now</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentalGames;
