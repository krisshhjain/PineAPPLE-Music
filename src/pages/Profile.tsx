import { useState } from "react";
import { User, Music, Clock, Heart, Award, TrendingUp, BarChart3, Disc, Headphones, Star, Zap, Moon, Flame, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { artists } from "@/data/musicData";

import drakeImg from "@/assets/Artists/Drake.jpg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import szaImg from "@/assets/Artists/SZA.jpeg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";

const stats = {
  totalSongs: 1247,
  hoursListened: 342,
  topGenre: "Hip Hop",
  playlistsCreated: 14,
  likedSongs: 127,
  streak: 23,
};

const topArtists = [
  { name: "Brake", image: drakeImg, plays: 342, pct: 95 },
  { name: "Derrick Damar", image: kendrickImg, plays: 256, pct: 75 },
  { name: "ZYA", image: szaImg, plays: 189, pct: 55 },
  { name: "Kayler Swift", image: taylorImg, plays: 145, pct: 42 },
  { name: "K. Soul", image: jColeImg, plays: 112, pct: 33 },
];

const topSongs = [
  { title: "Dog's Advice", artist: "Brake", plays: 87 },
  { title: "Alright Now", artist: "Derrick Damar", plays: 64 },
  { title: "Love Galore", artist: "ZYA", plays: 52 },
  { title: "Anti-Villain", artist: "Kayler Swift", plays: 48 },
  { title: "No Modelz", artist: "K. Soul", plays: 41 },
];

const genreAffinities = [
  { genre: "Hip Hop", pct: 85 },
  { genre: "R&B", pct: 65 },
  { genre: "Pop", pct: 45 },
  { genre: "Electronic", pct: 35 },
  { genre: "Rock", pct: 20 },
];

const achievements = [
  { icon: "🎵", title: "First Playlist", desc: "Created your first playlist", earned: true },
  { icon: "💯", title: "Century Mark", desc: "Liked 100+ songs", earned: true },
  { icon: "🌙", title: "Night Owl", desc: "Listened past midnight 10 times", earned: true },
  { icon: "🔥", title: "On Fire", desc: "23-day listening streak", earned: true },
  { icon: "🎧", title: "Audiophile", desc: "100+ hours of listening", earned: true },
  { icon: "🌍", title: "Genre Explorer", desc: "Listened to 8+ genres", earned: false },
  { icon: "⭐", title: "Super Fan", desc: "Top 1% listener of an artist", earned: false },
  { icon: "🎸", title: "Vinyl Collector", desc: "Save 50 albums", earned: false },
];

const listeningHistory = [
  { month: "Jan", hours: 28 },
  { month: "Feb", hours: 35 },
  { month: "Mar", hours: 42 },
  { month: "Apr", hours: 38 },
  { month: "May", hours: 51 },
  { month: "Jun", hours: 47 },
  { month: "Jul", hours: 55 },
  { month: "Aug", hours: 46 },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "artists" | "songs" | "achievements">("overview");
  const maxHours = Math.max(...listeningHistory.map(h => h.hours));

  return (
    <div className="relative min-h-screen pb-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl font-bold shadow-neon">
              K
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Krish</h1>
            <p className="text-muted-foreground">Music enthusiast since 2024</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs glass px-3 py-1 rounded-full">{stats.playlistsCreated} Playlists</span>
              <span className="text-xs glass px-3 py-1 rounded-full">{stats.likedSongs} Liked</span>
              <span className="text-xs glass px-3 py-1 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                {stats.streak} day streak
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
          <Card className="p-5 glass neon-border hover-lift cursor-default">
            <Music className="w-5 h-5 text-primary mb-3" />
            <p className="text-3xl font-bold">{stats.totalSongs.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Songs Played</p>
          </Card>
          <Card className="p-5 glass neon-border hover-lift cursor-default">
            <Clock className="w-5 h-5 text-primary mb-3" />
            <p className="text-3xl font-bold">{stats.hoursListened}</p>
            <p className="text-xs text-muted-foreground mt-1">Hours Listened</p>
          </Card>
          <Card className="p-5 glass neon-border hover-lift cursor-default">
            <Headphones className="w-5 h-5 text-primary mb-3" />
            <p className="text-3xl font-bold">{stats.topGenre}</p>
            <p className="text-xs text-muted-foreground mt-1">Top Genre</p>
          </Card>
          <Card className="p-5 glass neon-border hover-lift cursor-default">
            <Flame className="w-5 h-5 text-orange-400 mb-3" />
            <p className="text-3xl font-bold">{stats.streak}</p>
            <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["overview", "artists", "songs", "achievements"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-glow'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Listening History Chart */}
            <Card className="p-6 glass neon-border">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Listening Activity
              </h3>
              <div className="flex items-end gap-2 h-32">
                {listeningHistory.map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-md transition-all duration-700 hover:from-primary hover:to-primary/60"
                      style={{ height: `${(item.hours / maxHours) * 100}%` }}
                    />
                    <span className="text-[9px] text-muted-foreground">{item.month}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Taste DNA */}
            <Card className="p-6 glass neon-border">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Your Taste DNA
              </h3>
              <div className="space-y-3">
                {genreAffinities.map((g) => (
                  <div key={g.genre}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{g.genre}</span>
                      <span className="text-muted-foreground">{g.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Artists Preview */}
            <Card className="p-6 glass neon-border md:col-span-2">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Top Artists This Month
              </h3>
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
                {topArtists.map((artist, i) => (
                  <div key={artist.name} className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="relative">
                      <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-full object-cover" />
                      {/* Circular progress ring */}
                      <svg className="absolute -inset-1 w-[72px] h-[72px] -rotate-90" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="34" fill="none" stroke="hsl(220 10% 20%)" strokeWidth="2" />
                        <circle
                          cx="36" cy="36" r="34" fill="none"
                          stroke="hsl(260 70% 55%)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={`${artist.pct * 2.14} 214`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-white">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-center">{artist.name}</p>
                    <p className="text-[10px] text-muted-foreground">{artist.plays} plays</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Artists Tab */}
        {activeTab === "artists" && (
          <div className="space-y-3 stagger-children">
            {topArtists.map((artist, i) => (
              <div key={artist.name} className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <span className="text-lg font-bold text-muted-foreground w-6 text-center">{i + 1}</span>
                <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{artist.name}</p>
                  <p className="text-xs text-muted-foreground">{artist.plays} plays this month</p>
                </div>
                <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${artist.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Songs Tab */}
        {activeTab === "songs" && (
          <div className="space-y-3 stagger-children">
            {topSongs.map((song, i) => (
              <div key={song.title} className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <span className="text-lg font-bold text-muted-foreground w-6 text-center">{i + 1}</span>
                <Disc className="w-10 h-10 text-primary/30" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-xs text-muted-foreground">{song.artist}</p>
                </div>
                <span className="text-xs text-muted-foreground">{song.plays} plays</span>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
            {achievements.map((badge) => (
              <Card
                key={badge.title}
                className={`p-5 text-center transition-all duration-300 cursor-default ${
                  badge.earned
                    ? 'glass neon-border hover-lift'
                    : 'glass opacity-40 grayscale'
                }`}
              >
                <span className="text-3xl mb-2 block">{badge.icon}</span>
                <p className="text-sm font-semibold mb-1">{badge.title}</p>
                <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                {badge.earned && (
                  <span className="inline-block mt-2 text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                    Earned
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
