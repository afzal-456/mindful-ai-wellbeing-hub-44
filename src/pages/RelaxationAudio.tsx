
import React, { useState, useRef } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

const RelaxationAudio = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumes, setVolumes] = useState<{ [key: number]: number[] }>({});
  const [seekPositions, setSeekPositions] = useState<{ [key: number]: number[] }>({});
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  const handleSeekChange = (index: number, value: number[]) => {
    if (audioRefs.current[index]) {
      const newPosition = value[0];
      audioRefs.current[index].currentTime = (newPosition / 100) * audioRefs.current[index].duration;
      setSeekPositions(prev => ({ ...prev, [index]: value }));
    }
  };

  const togglePlay = (index: number) => {
    if (currentTrack === index) {
      if (audioRefs.current[index]) {
        if (isPlaying) {
          audioRefs.current[index].pause();
        } else {
          audioRefs.current[index].play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      // Stop previous track if any
      if (currentTrack !== null && audioRefs.current[currentTrack]) {
        audioRefs.current[currentTrack].pause();
      }
      
      // Play new track
      if (audioRefs.current[index]) {
        audioRefs.current[index].play();
        setIsPlaying(true);
      }
      setCurrentTrack(index);
    }
  };

  const handleVolumeChange = (index: number, value: number[]) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].volume = value[0] / 100;
      setVolumes(prev => ({ ...prev, [index]: value }));
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
                <audio
                  ref={el => {
                    if (el) audioRefs.current[index] = el;
                  }}
                  src={track.url}
                  onEnded={() => setIsPlaying(false)}
                  onTimeUpdate={() => {
                    if (audioRefs.current[index]) {
                      const position = (audioRefs.current[index].currentTime / audioRefs.current[index].duration) * 100;
                      setSeekPositions(prev => ({ ...prev, [index]: [position] }));
                    }
                  }}
                />
                <h3 className="text-xl font-semibold mb-4">{track.title}</h3>
                <p className="text-gray-600 mb-2">{track.description}</p>
                <p className="text-gray-500 mb-4">Duration: {track.duration}</p>
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
                    <Slider
                      value={seekPositions[index] || [0]}
                      onValueChange={(value) => handleSeekChange(index, value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2 w-32">
                    <Volume2 className="h-4 w-4" />
                    <Slider
                      value={volumes[index] || [50]}
                      onValueChange={(value) => handleVolumeChange(index, value)}
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
