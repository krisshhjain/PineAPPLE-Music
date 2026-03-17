import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, Heart, Repeat, Shuffle, ChevronDown, ListMusic, Share2, MoreHorizontal, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import drakeImg from "@/assets/Artists/Drake.jpg";

const currentSong = {
  title: "Dog's Advice",
  artist: "Brake",
  album: "Arachnid",
  image: drakeImg,
  duration: 245,
};

const lyrics = [
  { time: 0, text: "♪ ♪ ♪" },
  { time: 8, text: "Yeah, they said I couldn't do it" },
  { time: 14, text: "But I knew I'd see it through it" },
  { time: 20, text: "Every night I spent in silence" },
  { time: 26, text: "Plotting moves in perfect balance" },
  { time: 34, text: "Dog's advice: keep your circle tight" },
  { time: 40, text: "Only real ones in your sight" },
  { time: 46, text: "When the world goes dark, find your light" },
  { time: 52, text: "Every wrong can turn out right" },
  { time: 60, text: "♪ ♪ ♪" },
  { time: 68, text: "I remember counting days" },
  { time: 74, text: "In a city full of haze" },
  { time: 80, text: "Now the path is crystal clear" },
  { time: 86, text: "Everything I want is here" },
  { time: 94, text: "♪ ♪ ♪" },
];

const queue = [
  { title: "Nonstop Hustle", artist: "Brake" },
  { title: "Elevated Mind", artist: "Brake" },
  { title: "On My Wave", artist: "Brake" },
  { title: "Love Galore", artist: "ZYA" },
  { title: "Alright Now", artist: "Derrick Damar" },
];

const NowPlaying = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(34);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);
  const [volume, setVolume] = useState([75]);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => prev >= currentSong.duration ? 0 : prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = (currentTime / currentSong.duration) * 100;

  const getCurrentLyricIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return 0;
  };

  const currentLyricIdx = getCurrentLyricIndex();

  // Visualizer bars
  const bars = Array.from({ length: 40 }, (_, i) => ({
    delay: `${i * 0.05}s`,
    duration: `${0.5 + Math.random() * 0.7}s`,
    height: `${20 + Math.random() * 80}%`,
  }));

  return (
    <div className="fixed inset-0 z-40 flex flex-col">
      {/* Background — blurred album art */}
      <div className="absolute inset-0">
        <img
          src={currentSong.image}
          alt=""
          className="w-full h-full object-cover scale-110 blur-[80px] opacity-30"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/50 font-medium">Now Playing</p>
            <p className="text-xs text-white/70 font-medium">{currentSong.album}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center gap-12 px-8 overflow-hidden">
          {/* Left side — Vinyl + Album Art */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {/* Vinyl disc behind */}
              <div
                className={`absolute -right-6 top-4 w-64 h-64 vinyl-disc ${isPlaying ? 'animate-vinyl-spin' : ''}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-background/80 border-2 border-white/10" />
                </div>
              </div>

              {/* Album art */}
              <img
                src={currentSong.image}
                alt={currentSong.title}
                className="relative z-10 w-72 h-72 rounded-2xl object-cover shadow-2xl"
              />

              {/* Glow behind album art */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
            </div>

            {/* Song info */}
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-1">{currentSong.title}</h1>
              <p className="text-muted-foreground">{currentSong.artist}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`w-10 h-10 rounded-full ${isLiked ? 'text-primary' : 'text-white/60 hover:text-white'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full text-white/60 hover:text-white">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full text-white/60 hover:text-white">
                <ListMusic className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right side — Lyrics & Visualizer */}
          {showLyrics && (
            <div className="w-80 h-[420px] flex flex-col">
              {/* Lyrics */}
              <div ref={lyricsRef} className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col justify-center space-y-4 px-2">
                  {lyrics.map((line, i) => (
                    <p
                      key={i}
                      className={`text-lg font-medium transition-all duration-500 ${
                        i === currentLyricIdx
                          ? 'text-white text-xl scale-105 origin-left'
                          : i < currentLyricIdx
                          ? 'text-white/20 text-base'
                          : 'text-white/30 text-base'
                      }`}
                      style={{
                        transform: `translateY(${(i - currentLyricIdx) * 0}px)`,
                      }}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
                {/* Fade edges */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/80 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10" />
              </div>

              {/* Visualizer */}
              <div className="h-16 flex items-end gap-[2px] px-2 mt-4">
                {bars.map((bar, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-full transition-all ${
                      isPlaying ? 'bg-primary/60 visualizer-bar' : 'bg-primary/20'
                    }`}
                    style={{
                      height: isPlaying ? undefined : '15%',
                      animationDuration: bar.duration,
                      animationDelay: bar.delay,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="px-8 pb-8 pt-4">
          {/* Progress */}
          <div className="max-w-xl mx-auto mb-4">
            <Slider
              value={[currentTime]}
              max={currentSong.duration}
              step={1}
              onValueChange={(v) => setCurrentTime(v[0])}
              className="cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs text-white/50 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffle(!isShuffle)}
              className={`w-10 h-10 rounded-full ${isShuffle ? 'text-primary' : 'text-white/50 hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-12 h-12 rounded-full text-white hover:text-white hover:bg-white/10">
              <SkipBack className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white hover:bg-white/90 text-black shadow-2xl hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </Button>
            <Button variant="ghost" className="w-12 h-12 rounded-full text-white hover:text-white hover:bg-white/10">
              <SkipForward className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRepeat(!isRepeat)}
              className={`w-10 h-10 rounded-full ${isRepeat ? 'text-primary' : 'text-white/50 hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Queue preview */}
          <div className="max-w-xl mx-auto mt-6 pt-4 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">Up Next</p>
            <div className="space-y-1.5">
              {queue.slice(0, 3).map((track, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                  <span className="w-4 text-[10px] text-center">{i + 1}</span>
                  <span className="flex-1 truncate">{track.title}</span>
                  <span className="text-xs">{track.artist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
