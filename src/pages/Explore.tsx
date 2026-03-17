import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Sparkles, TrendingUp, Globe, Zap, Music2, ChevronRight, Star, Flame, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { artists, getAllSongs } from "@/data/musicData";

import drakeImg from "@/assets/Artists/Drake.jpg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import szaImg from "@/assets/Artists/SZA.jpeg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import kanyeImg from "@/assets/Artists/Kanye West.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";

const moodOrbs = [
  { emoji: "🔥", label: "Energy", color: "from-orange-500 to-red-500", glow: "shadow-[0_0_40px_hsl(20,100%,50%,0.3)]", desc: "High-energy bangers" },
  { emoji: "😌", label: "Chill", color: "from-cyan-500 to-blue-500", glow: "shadow-[0_0_40px_hsl(200,100%,50%,0.3)]", desc: "Relax and unwind" },
  { emoji: "💜", label: "Vibes", color: "from-purple-500 to-pink-500", glow: "shadow-[0_0_40px_hsl(280,100%,50%,0.3)]", desc: "Feel-good melodies" },
  { emoji: "🎯", label: "Focus", color: "from-green-500 to-emerald-500", glow: "shadow-[0_0_40px_hsl(150,100%,40%,0.3)]", desc: "Deep concentration" },
  { emoji: "🌙", label: "Night", color: "from-indigo-600 to-violet-600", glow: "shadow-[0_0_40px_hsl(240,100%,50%,0.3)]", desc: "Late night mood" },
  { emoji: "💪", label: "Pump", color: "from-rose-500 to-orange-500", glow: "shadow-[0_0_40px_hsl(350,100%,50%,0.3)]", desc: "Workout intensity" },
];

const genres = [
  { name: "Hip Hop", color: "from-amber-600 to-orange-700", icon: "🎤" },
  { name: "R&B", color: "from-purple-600 to-indigo-700", icon: "💜" },
  { name: "Pop", color: "from-pink-500 to-rose-600", icon: "⭐" },
  { name: "Electronic", color: "from-cyan-500 to-blue-600", icon: "⚡" },
  { name: "Rock", color: "from-red-600 to-red-800", icon: "🎸" },
  { name: "Jazz", color: "from-yellow-600 to-amber-700", icon: "🎷" },
  { name: "Classical", color: "from-emerald-600 to-green-700", icon: "🎻" },
  { name: "Lo-Fi", color: "from-slate-500 to-slate-700", icon: "🌊" },
];

const trending = [
  { rank: 1, title: "Dog's Advice", artist: "Brake", image: drakeImg, change: "up", plays: "2.4M" },
  { rank: 2, title: "Alright Now", artist: "Derrick Damar", image: kendrickImg, change: "up", plays: "1.8M" },
  { rank: 3, title: "Snooze Mode", artist: "ZYA", image: szaImg, change: "same", plays: "1.5M" },
  { rank: 4, title: "Anti-Villain", artist: "Kayler Swift", image: taylorImg, change: "up", plays: "1.3M" },
  { rank: 5, title: "Ultra Light Ray", artist: "Zane East", image: kanyeImg, change: "down", plays: "1.1M" },
];

const editorialPicks = [
  {
    tag: "EDITORS' PICK",
    title: "The Sound of Tomorrow",
    desc: "How new artists are reshaping the boundaries of modern hip-hop and R&B with experimental production and raw storytelling.",
    image: kendrickImg,
    gradient: "from-purple-900/80 via-purple-900/40 to-transparent",
  },
  {
    tag: "DEEP DIVE",
    title: "Vibes After Dark",
    desc: "A curated journey through the most atmospheric night-time tracks — from ambient electronic to moody R&B.",
    image: szaImg,
    gradient: "from-blue-900/80 via-blue-900/40 to-transparent",
  },
];

const soundOfDay = {
  title: "Love Galore",
  artist: "ZYA",
  album: "Ctrl Alt",
  image: szaImg,
  desc: "A lush blend of R&B vocals over dreamy production that captures the push and pull of modern love.",
};

const Explore = () => {
  const navigate = useNavigate();
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen pb-8">
      {/* Background aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 p-6 space-y-10">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Explore</h1>
          </div>
          <p className="text-muted-foreground text-lg">Discover music beyond your playlist. Dive deep.</p>
        </div>

        {/* Mood Orbs */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Choose Your Vibe
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {moodOrbs.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setActiveMood(activeMood === mood.label ? null : mood.label)}
                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-400 ${
                  activeMood === mood.label
                    ? `bg-gradient-to-b ${mood.color} ${mood.glow} scale-105`
                    : 'glass hover:scale-105'
                }`}
              >
                <span className={`text-3xl transition-transform duration-300 ${activeMood === mood.label ? 'scale-125' : 'group-hover:scale-110'}`}>
                  {mood.emoji}
                </span>
                <div className="text-center">
                  <p className="text-sm font-semibold">{mood.label}</p>
                  <p className="text-[10px] text-white/60">{mood.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Sound of the Day */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            Sound of the Day
          </h2>
          <div className="relative overflow-hidden rounded-2xl glass neon-border group cursor-pointer hover-lift">
            <div className="flex items-center gap-8 p-6">
              <div className="relative flex-shrink-0">
                <img
                  src={soundOfDay.image}
                  alt={soundOfDay.title}
                  className="w-40 h-40 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <Button
                  className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-white hover:bg-white/90 text-black shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </Button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">🎵 Today's Pick</p>
                <h3 className="text-3xl font-bold mb-1">{soundOfDay.title}</h3>
                <p className="text-muted-foreground mb-3">
                  {soundOfDay.artist} • {soundOfDay.album}
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-lg">
                  {soundOfDay.desc}
                </p>
              </div>
            </div>
            {/* Ambient glow */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </section>

        {/* Editorial */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Music2 className="w-4 h-4 text-primary" />
            Stories & Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {editorialPicks.map((pick, i) => (
              <div
                key={i}
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group hover-lift"
              >
                <img
                  src={pick.image}
                  alt={pick.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${pick.gradient}`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">{pick.tag}</span>
                  <h3 className="text-2xl font-bold mb-1">{pick.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-2">{pick.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Trending Now
            </h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs">
              View Chart
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {trending.map((track) => (
              <div
                key={track.rank}
                className="flex items-center gap-4 px-4 py-3 rounded-xl glass hover:bg-white/5 transition-all group cursor-pointer"
              >
                <span className={`text-2xl font-black w-8 text-center ${track.rank <= 3 ? 'text-gradient-primary' : 'text-muted-foreground'}`}>
                  {track.rank}
                </span>
                <div className="flex items-center gap-1 w-6">
                  {track.change === "up" && <TrendingUp className="w-3.5 h-3.5 text-green-400" />}
                  {track.change === "down" && <TrendingUp className="w-3.5 h-3.5 text-red-400 rotate-180" />}
                  {track.change === "same" && <span className="text-muted-foreground text-xs">—</span>}
                </div>
                <div className="relative">
                  <img src={track.image} alt={track.title} className="w-11 h-11 rounded-lg object-cover" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute inset-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/60"
                  >
                    <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                  </Button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-muted-foreground">{track.plays}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Genre Galaxy */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Genre Galaxy
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {genres.map((genre) => (
              <div
                key={genre.name}
                onMouseEnter={() => setHoveredGenre(genre.name)}
                onMouseLeave={() => setHoveredGenre(null)}
                className={`genre-card-3d relative h-28 rounded-xl bg-gradient-to-br ${genre.color} cursor-pointer overflow-hidden group`}
              >
                <div className="absolute inset-0 flex items-center justify-between p-5">
                  <div>
                    <p className="text-lg font-bold text-white">{genre.name}</p>
                  </div>
                  <span className={`text-3xl transition-transform duration-300 ${hoveredGenre === genre.name ? 'scale-125 rotate-12' : ''}`}>
                    {genre.icon}
                  </span>
                </div>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* For You based on listening */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Headphones className="w-4 h-4 text-primary" />
            Because You Listen To
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 carousel-scroll">
            {artists.slice(0, 8).map((artist) => (
              <div
                key={artist.id}
                className="flex-shrink-0 w-40 snap-start group cursor-pointer"
                onClick={() => navigate(`/artist/${artist.id}`)}
              >
                <div className="relative mb-3">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-40 h-40 rounded-xl object-cover group-hover:shadow-neon transition-shadow duration-300"
                  />
                  <Button
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
                <p className="text-sm font-semibold truncate">{artist.name}</p>
                <p className="text-xs text-muted-foreground">{artist.albums.length} albums</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Need to import Compass from lucide
import { Compass } from "lucide-react";

export default Explore;
