import { useState } from "react";
import { Clock, Play, Heart, MoreHorizontal, ArrowLeft, Calendar, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import drakeImg from "@/assets/Artists/Drake.jpg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import szaImg from "@/assets/Artists/SZA.jpeg";
import kanyeImg from "@/assets/Artists/Kanye West.jpg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";

const historyGroups = [
  {
    label: "Today",
    songs: [
      { id: "1", title: "Dog's Advice", artist: "Brake", album: "Arachnid", image: drakeImg, duration: "3:45", playedAt: "2 min ago" },
      { id: "2", title: "Love Galore", artist: "ZYA", album: "Ctrl Alt", image: szaImg, duration: "4:33", playedAt: "18 min ago" },
      { id: "3", title: "HUMBLE.", artist: "Derrick Damar", album: "DAMN.", image: kendrickImg, duration: "2:57", playedAt: "1 hr ago" },
      { id: "4", title: "No Modelz", artist: "K. Soul", album: "Born Sinner II", image: jColeImg, duration: "3:58", playedAt: "2 hr ago" },
    ]
  },
  {
    label: "Yesterday",
    songs: [
      { id: "5", title: "Ultra Light Ray", artist: "Zane East", album: "Graduation Day", image: kanyeImg, duration: "4:56", playedAt: "Yesterday" },
      { id: "6", title: "Anti-Villain", artist: "Kayler Swift", album: "1990", image: taylorImg, duration: "3:33", playedAt: "Yesterday" },
      { id: "7", title: "Nonstop Hustle", artist: "Brake", album: "Arachnid", image: drakeImg, duration: "3:22", playedAt: "Yesterday" },
    ]
  },
  {
    label: "This Week",
    songs: [
      { id: "8", title: "Alright Now", artist: "Derrick Damar", album: "Good Kid", image: kendrickImg, duration: "4:12", playedAt: "3 days ago" },
      { id: "9", title: "Snooze Mode", artist: "ZYA", album: "SOS", image: szaImg, duration: "4:11", playedAt: "4 days ago" },
      { id: "10", title: "Middle Child", artist: "K. Soul", album: "Off Season", image: jColeImg, duration: "3:34", playedAt: "5 days ago" },
    ]
  },
];

const RecentlyPlayed = () => {
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="w-9 h-9 p-0 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary">Recently Played</h1>
          <p className="text-sm text-muted-foreground mt-1">Your listening history</p>
        </div>
      </div>

      {/* Groups */}
      {historyGroups.map((group) => (
        <section key={group.label}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            {group.label}
          </h2>
          <div className="space-y-0.5 stagger-children">
            {group.songs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl glass hover:bg-white/5 cursor-pointer transition-all track-row"
              >
                <div className="w-8 text-center">
                  {playingId === song.id ? (
                    <div className="flex items-center justify-center gap-[2px] h-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-[3px] bg-primary rounded-full visualizer-bar" style={{ animationDuration: `${0.5 + i * 0.15}s` }} />
                      ))}
                    </div>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground group-hover:hidden">{index + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hidden group-hover:flex w-8 h-8 p-0 rounded-full"
                        onClick={() => setPlayingId(playingId === song.id ? null : song.id)}
                      >
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </Button>
                    </>
                  )}
                </div>
                <img src={song.image} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium truncate transition-colors ${playingId === song.id ? 'text-primary' : 'group-hover:text-primary'}`}>
                    {song.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">{song.artist} • {song.album}</p>
                </div>
                <span className="text-[10px] text-muted-foreground/60 hidden md:block w-20 text-right">{song.playedAt}</span>
                <span className="text-xs text-muted-foreground w-10 text-right">{song.duration}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0"><Heart className="w-3.5 h-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default RecentlyPlayed;