
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

const audioTracks = [
  {
    title: "432 Hz Healing Frequency",
    description: "Deep relaxation and healing frequency",
    duration: "10:00",
    url: "https://assets.mixkit.co/music/preview/mixkit-relaxing-waves-of-peace-19.mp3"
  },
  {
    title: "528 Hz Love Frequency",
    description: "Frequency of love and positive transformation",
    duration: "8:30",
    url: "https://assets.mixkit.co/music/preview/mixkit-meditative-morning-light-123.mp3"
  },
  {
    title: "Nature Sounds",
    description: "Calming forest and water sounds",
    duration: "15:00",
    url: "https://assets.mixkit.co/music/preview/mixkit-forest-stream-ambience-2.mp3"
  },
  {
    title: "Mindful Meditation",
    description: "Guided meditation with peaceful background",
    duration: "12:00",
    url: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3"
  }
];

const RelaxationAudio = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);

  const togglePlay = (index: number) => {
    if (currentTrack === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Relaxation Audio Library</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audioTracks.map((track, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{track.title}</h3>
                <p className="text-gray-600 mb-2">{track.description}</p>
                <p className="text

-gray-500 mb-4">Duration: {track.duration}</p>
                <div className="flex items-center justify-between space-x-4">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => togglePlay(index)}
                    className="text-wellness-primary hover:text-wellness-dark"
                  >
                    {currentTrack === index && isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                  <div className="flex items-center space-x-2 flex-grow">
                    <Volume2 className="h-4 w-4" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RelaxationAudio;
