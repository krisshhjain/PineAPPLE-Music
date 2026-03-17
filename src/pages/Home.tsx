import { useState, useEffect } from "react";
import { Play, Pause, Heart, ChevronRight, Music2, Disc3, Sparkles, TrendingUp, Headphones, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { artists } from "@/data/musicData";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";

import drakeImg from "@/assets/Artists/Drake.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import kanyeImg from "@/assets/Artists/Kanye West.jpg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import rihannaImg from "@/assets/Artists/Rihanna.png";
import szaImg from "@/assets/Artists/SZA.jpeg";
import asapImg from "@/assets/Artists/Asap Rocky.jpeg";

const album1 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop";
const album2 = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop";
const album3 = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop";
const album4 = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop";

const recentlyPlayed = [
  { id: "liked-songs", title: "Liked Songs", subtitle: "127 songs", image: "", type: "playlist" },
  { id: "discover-weekly", title: "Discover Weekly", subtitle: "Your weekly mixtape", image: album1, type: "playlist" },
  { id: "daily-mix-1", title: "Daily Mix 1", subtitle: "Synthwave, Retrowave", image: album2, type: "playlist" },
  { id: "chill-vibes", title: "Chill Vibes", subtitle: "45 songs", image: album3, type: "playlist" },
  { id: "workout-beats", title: "Workout Beats", subtitle: "38 songs", image: album4, type: "playlist" },
  { id: "focus-flow", title: "Focus Flow", subtitle: "42 songs", image: album5, type: "playlist" },
];

const moodCards = [
  { emoji: "🔥", label: "Energy", gradient: "from-orange-500/20 to-red-500/20", border: "border-orange-500/20" },
  { emoji: "😌", label: "Chill", gradient: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20" },
  { emoji: "💜", label: "Vibes", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
  { emoji: "🎯", label: "Focus", gradient: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" },
  { emoji: "🌙", label: "Night", gradient: "from-indigo-500/20 to-violet-500/20", border: "border-indigo-500/20" },
];

const madeForYou = [
  { id: "discover-weekly", title: "Discover Weekly", subtitle: "Your weekly mixtape of fresh music", image: album1 },
  { id: "daily-mix-1", title: "Daily Mix 1", subtitle: "Synthwave, Retrowave, and more", image: album2 },
  { id: "daily-mix-2", title: "Daily Mix 2", subtitle: "Future Bass, Electronic", image: album3 },
  { id: "release-radar", title: "Release Radar", subtitle: "Catch all the latest", image: album4 },
  { id: "liked-songs", title: "On Repeat", subtitle: "Songs you can't stop", image: album5 },
  { id: "time-capsule", title: "Time Capsule", subtitle: "Your musical past", image: album6 },
];

const popularArtists = [
  { id: "brake", name: "Brake", image: drakeImg, followers: "1.2M" },
  { id: "k-soul", name: "K. Soul", image: jColeImg, followers: "856K" },
  { id: "derrick-damar", name: "Derrick Damar", image: kendrickImg, followers: "634K" },
  { id: "zane-east", name: "Zane East", image: kanyeImg, followers: "423K" },
  { id: "kayler-swift", name: "Kayler Swift", image: taylorImg, followers: "789K" },
  { id: "rhonda", name: "Rhonda", image: rihannaImg, followers: "345K" },
  { id: "zya", name: "ZYA", image: szaImg, followers: "567K" },
  { id: "hasty-stone", name: "HASTY Stone", image: asapImg, followers: "290K" },
];

const chartHits = [
  { id: "1", title: "Dog's Advice", artist: "Brake", artistId: "brake", image: drakeImg, duration: "3:45", rank: 1, isLiked: true },
  { id: "2", title: "No Modelz", artist: "K. Soul", artistId: "k-soul", image: jColeImg, duration: "4:12", rank: 2, isLiked: false },
  { id: "3", title: "Alright Now", artist: "Derrick Damar", artistId: "derrick-damar", image: kendrickImg, duration: "3:28", rank: 3, isLiked: true },
  { id: "4", title: "Ultra Light Ray", artist: "Zane East", artistId: "zane-east", image: kanyeImg, duration: "4:56", rank: 4, isLiked: false },
  { id: "5", title: "Anti-Villain", artist: "Kayler Swift", artistId: "kayler-swift", image: taylorImg, duration: "3:33", rank: 5, isLiked: true },
];

const featuredArtist = {
  name: "Derrick Damar",
  image: kendrickImg,
  tagline: "New album out now",
  album: "To Pimp a Moth",
};

const Home = () => {
  const navigate = useNavigate();
  const [playingCard, setPlayingCard] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const togglePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingCard(playingCard === id ? null : id);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 p-6 space-y-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl glass p-8 neon-border">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img src="/PineAppke-noBG.png" alt="PineApple Muzic" className="w-16 h-16 object-contain" />
              <div>
                <h1 className="text-4xl font-bold mb-1 tracking-tight">{getGreeting()}</h1>
                <p className="text-muted-foreground">
                  Welcome to <span className="text-gradient-primary font-semibold">PineApple Muzic</span> — your sonic universe awaits
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-[10px] uppercase tracking-wider">Songs Played</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">342h</p>
                <p className="text-[10px] uppercase tracking-wider">Listened</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center flex flex-col items-center">
                <p className="text-2xl font-bold text-foreground flex items-center gap-1">23 <Flame className="w-4 h-4 text-orange-400" /></p>
                <p className="text-[10px] uppercase tracking-wider">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mood Selector */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            How are you feeling?
          </h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {moodCards.map((mood) => (
              <button
                key={mood.label}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${mood.gradient} border ${mood.border} hover:scale-105 transition-all duration-300 mood-card`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recently played</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground" onClick={() => navigate('/recently-played')}>
              Show all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
            {recentlyPlayed.map((item) => (
              <Card
                key={item.id}
                className="flex items-center p-3 glass hover:bg-white/5 transition-all duration-300 cursor-pointer group border-white/5 hover:border-primary/20 hover-lift"
                onClick={() => navigate(`/playlist/${item.id}`)}
              >
                <div className="relative w-14 h-14 mr-3 flex-shrink-0">
                  {item.id === "liked-songs" ? (
                    <div className="w-full h-full bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Heart className="w-7 h-7 text-white fill-white" />
                    </div>
                  ) : (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                  )}
                  <Button
                    size="sm"
                    className="absolute inset-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/60 transition-all"
                    onClick={(e) => togglePlay(item.id, e)}
                  >
                    {playingCard === item.id ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                  </Button>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Artist Spotlight */}
        <section>
          <div className="relative h-52 rounded-2xl overflow-hidden cursor-pointer group hover-lift" onClick={() => navigate(`/artist/${artists.find(a => a.name === featuredArtist.name)?.id || 'derrick-damar'}`)}>
            <img src={featuredArtist.image} alt={featuredArtist.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">Featured Artist</span>
              <h2 className="text-3xl font-bold mb-1">{featuredArtist.name}</h2>
              <p className="text-muted-foreground text-sm mb-4">{featuredArtist.tagline} — "{featuredArtist.album}"</p>
              <Button className="w-fit bg-white hover:bg-white/90 text-black rounded-full px-6" size="sm">
                <Play className="w-3.5 h-3.5 mr-2 ml-0.5" /> Listen Now
              </Button>
            </div>
          </div>
        </section>

        {/* Made for You — Horizontal Carousel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Made for you</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              Show all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 carousel-scroll">
            {madeForYou.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-44 snap-start group cursor-pointer"
                onClick={() => navigate(`/playlist/${item.id}`)}
              >
                <div className="relative mb-3">
                  <img src={item.image} alt={item.title} className="w-44 h-44 object-cover rounded-xl group-hover:shadow-neon transition-shadow duration-300" />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    onClick={(e) => togglePlay(item.id, e)}
                  >
                    {playingCard === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </Button>
                </div>
                <h3 className="text-sm font-medium truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Artists — Horizontal Carousel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Popular artists</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              Show all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 carousel-scroll">
            {popularArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex-shrink-0 w-36 snap-start group cursor-pointer text-center"
                onClick={() => navigate(`/artist/${artist.id}`)}
              >
                <div className="relative mb-3">
                  <img src={artist.image} alt={artist.name} className="w-36 h-36 object-cover rounded-full group-hover:shadow-neon transition-shadow duration-300" />
                  <Button
                    size="sm"
                    className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </div>
                <h3 className="text-sm font-medium truncate">{artist.name}</h3>
                <p className="text-[10px] text-muted-foreground">{artist.followers} followers</p>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Top Hits */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Today's top hits
            </h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              Show all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-1">
            {chartHits.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 px-4 py-3 rounded-xl glass hover:bg-white/5 group transition-all cursor-pointer track-row"
              >
                <div className="w-6 text-center">
                  <span className={`text-sm font-bold ${track.rank <= 3 ? 'text-gradient-primary' : 'text-muted-foreground'}`}>{track.rank}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <img src={track.image} alt={track.artist} className="w-11 h-11 rounded-lg object-cover" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute inset-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 bg-black/50"
                    onClick={(e) => togglePlay(track.id, e)}
                  >
                    {playingCard === track.id ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white ml-0.5" />}
                  </Button>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{track.title}</p>
                  <Link to={`/artist/${track.artistId}`} className="text-xs text-muted-foreground hover:text-foreground hover:underline">
                    {track.artist}
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 ${track.isLiked ? 'text-primary opacity-100' : 'opacity-0 group-hover:opacity-100 text-muted-foreground'}`}
                >
                  <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
                </Button>
                <span className="text-xs text-muted-foreground w-10 text-right">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;