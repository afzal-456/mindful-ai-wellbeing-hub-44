
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { formatTime } from "@/lib/format-time";

// Define audioTracks data
const audioTracks = [
  {
    id: 1,
    title: "Deep Ocean Waves",
    description: "Calming ocean waves for deep relaxation and sleep",
    duration: "3:05",
    url: "/audio/ocean-waves.mp3"
  },
  {
    id: 2,
    title: "Forest Rain Meditation",
    description: "Gentle rain sounds in a forest setting for meditation",
    duration: "2:56",
    url: "/audio/forest-rain.mp3"
  },
  {
    id: 3,
    title: "432Hz Healing Frequency",
    description: "Pure 432Hz frequency for chakra balancing and healing",
    duration: "3:20",
    url: "/audio/432hz-healing.mp3"
  },
  {
    id: 4,
    title: "528Hz Transformation",
    description: "The miracle tone for positive transformation and DNA repair",
    duration: "3:15",
    url: "/audio/528hz-transformation.mp3"
  }
];

const RelaxationAudio = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumes, setVolumes] = useState<{ [key: number]: number[] }>({});
  const [seekPositions, setSeekPositions] = useState<{ [key: number]: number[] }>({});
  const [currentTimes, setCurrentTimes] = useState<{ [key: number]: string }>({});
  const [durations, setDurations] = useState<{ [key: number]: string }>({});
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  useEffect(() => {
    // Initialize volumes
    const initialVolumes: { [key: number]: number[] } = {};
    audioTracks.forEach((_, index) => {
      initialVolumes[index] = [50]; // Default volume 50%
    });
    setVolumes(initialVolumes);
  }, []);

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

  const updateTimeInfo = (index: number) => {
    if (audioRefs.current[index]) {
      const audio = audioRefs.current[index];
      const position = (audio.currentTime / audio.duration) * 100;
      
      setSeekPositions(prev => ({ ...prev, [index]: [position] }));
      setCurrentTimes(prev => ({ 
        ...prev, 
        [index]: formatTime(audio.currentTime) 
      }));
      
      if (!durations[index] && !isNaN(audio.duration)) {
        setDurations(prev => ({ 
          ...prev, 
          [index]: formatTime(audio.duration) 
        }));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-wellness-dark dark:text-white">Relaxation Audio Library</h1>
            <ThemeToggle />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audioTracks.map((track, index) => (
              <Card key={index} className="p-6 dark:bg-gray-800 dark:border-gray-700">
                <audio
                  ref={el => {
                    if (el) audioRefs.current[index] = el;
                  }}
                  src={track.url}
                  onEnded={() => setIsPlaying(false)}
                  onTimeUpdate={() => updateTimeInfo(index)}
                  onLoadedMetadata={() => updateTimeInfo(index)}
                />
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{track.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{track.description}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Duration: {durations[index] || track.duration}
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between space-x-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => togglePlay(index)}
                      className="text-wellness-primary hover:text-wellness-dark dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {currentTrack === index && isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                    <div className="flex items-center space-x-2 flex-grow">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-16">
                        {currentTimes[index] || "0:00"}
                      </span>
                      <Slider
                        value={seekPositions[index] || [0]}
                        onValueChange={(value) => handleSeekChange(index, value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-16">
                        {durations[index] || track.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
