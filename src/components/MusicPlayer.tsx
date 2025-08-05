import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import drakeImg from "@/assets/Artists/Drake.jpg";

// Using one of the updated songs
const currentSong = {
  id: "1",
  title: "God's Plan",
  artist: "Brake",
  album: "Certified Lover",
  image: drakeImg,
  duration: 225, // 3:45 in seconds
  isLiked: true
};

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(currentSong.isLiked);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-background/95 to-background/98 backdrop-blur-xl border-t border-border/50 shadow-2xl z-50">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-primary opacity-80"></div>
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted/20">
        <div 
          className="h-full bg-gradient-primary transition-all duration-300 ease-out relative"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 h-20">
        {/* Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="relative group">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-14 h-14 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-foreground truncate hover:text-primary transition-colors cursor-pointer">
              {currentSong.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate hover:text-foreground transition-colors cursor-pointer">
              {currentSong.artist}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className={`ml-2 hover:scale-110 transition-all duration-200 ${
              isLiked ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 px-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffle(!isShuffle)}
              className={`hover:scale-110 transition-all duration-200 ${
                isShuffle ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-primary hover:bg-gradient-primary/90 text-background hover:scale-105 transition-all duration-200"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRepeat(!isRepeat)}
              className={`hover:scale-110 transition-all duration-200 ${
                isRepeat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <div className="w-80 mx-2">
              <Slider
                value={[currentTime]}
                max={currentSong.duration}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>
            <span className="font-mono">{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <div className="w-24">
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
