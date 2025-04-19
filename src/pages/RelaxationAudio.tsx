
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const RelaxationAudio = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Relaxation Audio Library</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">432 Hz Healing Frequency</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button variant="ghost" size="icon">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button size="icon" className="bg-wellness-primary hover:bg-wellness-dark">
                  <Play className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">528 Hz Love Frequency</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button variant="ghost" size="icon">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button size="icon" className="bg-wellness-primary hover:bg-wellness-dark">
                  <Play className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Nature Sounds</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button variant="ghost" size="icon">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button size="icon" className="bg-wellness-primary hover:bg-wellness-dark">
                  <Play className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RelaxationAudio;
