import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Repeat, Shuffle, Maximize2, Minimize2, Music, ListMusic, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import drakeImg from "@/assets/Artists/Drake.jpg";

const currentSong = {
  id: "1",
  title: "God's Plan",
  artist: "Brake",
  album: "Certified Lover",
  image: drakeImg,
  duration: 225,
  isLiked: true
};

const upNext = [
  { title: "Middle Child", artist: "K. Soul", image: drakeImg },
  { title: "HUMBLE.", artist: "Derrick Damar", image: drakeImg },
];

export function MusicPlayer() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(42);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(currentSong.isLiked);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setIsLiked(!isLiked);
  const handleSeek = (value: number[]) => setCurrentTime(value[0]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;

  // Visualizer bars
  const visualizerBars = Array.from({ length: 24 }, (_, i) => ({
    delay: `${i * 0.08}s`,
    duration: `${0.6 + Math.random() * 0.8}s`,
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism player */}
      <div className="glass-strong border-t border-white/5 shadow-2xl">
        {/* Glowing progress bar at top */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5">
          <div
            className="h-full bg-gradient-primary relative transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-glow" />
            {/* Glow trail */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-l from-primary/40 to-transparent" />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 h-[76px]">
          {/* Song Info — Left */}
          <div className="flex items-center gap-3 min-w-0 flex-1 max-w-[300px]">
            <div className="relative group cursor-pointer" onClick={() => navigate('/now-playing')}>
              {/* Album Art with vinyl peek */}
              <div className="relative w-14 h-14">
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="w-14 h-14 rounded-lg object-cover shadow-lg group-hover:shadow-neon transition-all duration-300"
                />
                {/* Mini visualizer overlay when playing */}
                {isPlaying && (
                  <div className="absolute bottom-1 left-1 right-1 flex items-end gap-[2px] h-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/80 rounded-t-full visualizer-bar"
                        style={{
                          animationDuration: `${0.4 + Math.random() * 0.5}s`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* Expand hint */}
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4
                className="font-semibold text-sm text-foreground truncate hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate('/now-playing')}
              >
                {currentSong.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate hover:text-foreground transition-colors cursor-pointer">
                {currentSong.artist}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLike}
              className={`ml-1 w-8 h-8 p-0 hover:scale-110 transition-all duration-200 ${
                isLiked ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Player Controls — Center */}
          <div className="flex flex-col items-center gap-1 px-6">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsShuffle(!isShuffle)}
                className={`w-8 h-8 p-0 hover:scale-110 transition-all duration-200 ${
                  isShuffle ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200"
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-white hover:bg-white/90 text-background hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-black" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5 text-black" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200"
              >
                <SkipForward className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRepeat(!isRepeat)}
                className={`w-8 h-8 p-0 hover:scale-110 transition-all duration-200 ${
                  isRepeat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-mono w-8 text-right">{formatTime(currentTime)}</span>
              <div className="w-[320px]">
                <Slider
                  value={[currentTime]}
                  max={currentSong.duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
              </div>
              <span className="font-mono w-8">{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 min-w-0 flex-1 max-w-[300px] justify-end">
            {/* Lyrics */}
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
              onClick={() => navigate('/now-playing')}
            >
              <Mic2 className="w-3.5 h-3.5" />
            </Button>

            {/* Queue */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQueue(!showQueue)}
              className={`w-8 h-8 p-0 hover:scale-110 transition-all ${showQueue ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <ListMusic className="w-3.5 h-3.5" />
            </Button>

            {/* Volume */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
            >
              {isMuted || volume[0] === 0 ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </Button>
            <div className="w-20">
              <Slider
                value={isMuted ? [0] : volume}
                max={100}
                step={1}
                onValueChange={(v) => { setVolume(v); setIsMuted(false); }}
                className="cursor-pointer"
              />
            </div>

            {/* Now Playing expand */}
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
              onClick={() => navigate('/now-playing')}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Queue Popup */}
        {showQueue && (
          <div className="absolute bottom-full right-4 mb-2 w-72 glass rounded-xl p-4 shadow-2xl border border-white/10 animate-slide-up">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Up Next</h3>
            <div className="space-y-2">
              {upNext.map((track, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                    <Music className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{track.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
