import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Heart, Clock, Download, Share, MoreHorizontal, Search, Shuffle, Music } from 'lucide-react';
import { getAllSongs, artists, getAlbumById } from '@/data/musicData';

import drakeImg from "@/assets/Artists/Drake.jpg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import szaImg from "@/assets/Artists/SZA.jpeg";
import kanyeImg from "@/assets/Artists/Kanye West.jpg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";

const album1 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop";

const playlistData: Record<string, any> = {
  "liked-songs": {
    title: "Liked Songs",
    description: "Your favorite tracks all in one place",
    gradient: "from-purple-600 to-indigo-600",
    isSystem: true,
    songs: [
      { id: "1", title: "Dog's Advice", artist: "Brake", image: drakeImg, duration: "3:45", isLiked: true, album: "Arachnid" },
      { id: "2", title: "Alright Now", artist: "Derrick Damar", image: kendrickImg, duration: "4:12", isLiked: true, album: "Good Kid" },
      { id: "3", title: "Love Galore", artist: "ZYA", image: szaImg, duration: "4:33", isLiked: true, album: "Ctrl Alt" },
      { id: "4", title: "Ultra Light Ray", artist: "Zane East", image: kanyeImg, duration: "4:56", isLiked: true, album: "Graduation Day" },
      { id: "5", title: "Anti-Villain", artist: "Kayler Swift", image: taylorImg, duration: "3:33", isLiked: true, album: "1990" },
      { id: "6", title: "No Modelz", artist: "K. Soul", image: jColeImg, duration: "3:58", isLiked: true, album: "Born Sinner II" },
      { id: "7", title: "Nonstop Hustle", artist: "Brake", image: drakeImg, duration: "3:22", isLiked: true, album: "Arachnid" },
      { id: "8", title: "HUMBLE.", artist: "Derrick Damar", image: kendrickImg, duration: "2:57", isLiked: true, album: "DAMN." },
    ],
  },
  "discover-weekly": {
    title: "Discover Weekly",
    description: "Your weekly mixtape of fresh music. Enjoy new discoveries and deep cuts.",
    gradient: "from-green-600 to-teal-600",
    cover: album1,
    isSystem: false,
    songs: [
      { id: "1", title: "New Visions", artist: "Brake", image: drakeImg, duration: "3:10", isLiked: false, album: "Views" },
      { id: "2", title: "Middle Child", artist: "K. Soul", image: jColeImg, duration: "3:34", isLiked: true, album: "Off Season" },
      { id: "3", title: "Snooze Mode", artist: "ZYA", image: szaImg, duration: "4:11", isLiked: false, album: "SOS" },
      { id: "4", title: "Gold Digger", artist: "Zane East", image: kanyeImg, duration: "3:28", isLiked: false, album: "Late" },
      { id: "5", title: "Shake It Off", artist: "Kayler Swift", image: taylorImg, duration: "3:39", isLiked: false, album: "1990" },
    ],
  }
};

// Default playlist for unknown IDs
const defaultPlaylist = {
  title: "My Playlist",
  description: "A custom collection of your favorite tunes.",
  gradient: "from-violet-600 to-purple-600",
  isSystem: false,
  songs: [
    { id: "1", title: "Dog's Advice", artist: "Brake", image: drakeImg, duration: "3:45", isLiked: false, album: "Arachnid" },
    { id: "2", title: "Alright Now", artist: "Derrick Damar", image: kendrickImg, duration: "4:12", isLiked: false, album: "Good Kid" },
    { id: "3", title: "Love Galore", artist: "ZYA", image: szaImg, duration: "4:33", isLiked: false, album: "Ctrl Alt" },
    { id: "4", title: "No Modelz", artist: "K. Soul", image: jColeImg, duration: "3:58", isLiked: false, album: "Born Sinner II" },
  ],
};

export default function Playlist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

  const playlist = (id && playlistData[id]) || { ...defaultPlaylist, title: id?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || "Playlist" };

  const filteredSongs = playlist.songs.filter((s: any) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDuration = playlist.songs.reduce((t: number) => t + 3.5, 0);

  const toggleLike = (songId: string) => {
    const next = new Set(likedSongs);
    if (next.has(songId)) next.delete(songId);
    else next.add(songId);
    setLikedSongs(next);
  };

  return (
    <div className="min-h-screen">
      {/* Header with gradient */}
      <div className="relative">
        <div className={`absolute inset-0 h-72 bg-gradient-to-b ${playlist.gradient} opacity-30`} />
        <div className="absolute inset-0 h-72 bg-gradient-to-b from-transparent to-background" />

        <div className="relative px-8 pt-12 pb-8">
          <div className="flex items-end gap-7">
            {/* Cover */}
            <div className="w-52 h-52 flex-shrink-0">
              {playlist.isSystem && id === "liked-songs" ? (
                <div className={`w-full h-full bg-gradient-to-br ${playlist.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <Heart className="w-16 h-16 text-white fill-white" />
                </div>
              ) : playlist.cover ? (
                <img src={playlist.cover} alt={playlist.title} className="w-full h-full rounded-2xl object-cover shadow-2xl border border-white/10" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${playlist.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <Music className="w-16 h-16 text-white/60" />
                </div>
              )}
            </div>

            <div className="flex-1 pb-2">
              <Badge className="bg-white/10 text-white border-0 text-xs mb-2">Playlist</Badge>
              <h1 className="text-5xl font-bold mb-3 tracking-tight">{playlist.title}</h1>
              <p className="text-sm text-muted-foreground mb-3 max-w-lg">{playlist.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Krish</span>
                <span>•</span>
                <span>{playlist.songs.length} songs</span>
                <span>•</span>
                <span>{Math.floor(totalDuration)} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 py-4 flex items-center gap-3">
        <Button className="rounded-full w-12 h-12 bg-white hover:bg-white/90 text-black shadow-lg hover:scale-105 transition-transform">
          <Play className="w-5 h-5 ml-0.5" />
        </Button>
        <Button variant="ghost" className="rounded-full w-11 h-11 text-muted-foreground hover:text-foreground">
          <Shuffle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-full w-11 h-11 text-muted-foreground hover:text-foreground">
          <Download className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-full w-11 h-11 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="ml-auto relative w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search in playlist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 text-xs bg-white/5 border-white/10 rounded-lg"
          />
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-12">
        {/* Header row */}
        <div className="flex items-center gap-4 px-4 py-2 text-[10px] text-muted-foreground uppercase tracking-widest border-b border-white/5 mb-2">
          <div className="w-8 text-center">#</div>
          <div className="flex-1">Title</div>
          <div className="w-32 hidden md:block">Album</div>
          <div className="w-12 text-right"><Clock className="w-3.5 h-3.5 inline" /></div>
          <div className="w-16"></div>
        </div>

        <div className="space-y-0.5 stagger-children">
          {filteredSongs.map((song: any, index: number) => (
            <div
              key={song.id}
              className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all track-row"
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
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img src={song.image} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="min-w-0">
                  <h3 className={`text-sm font-medium truncate transition-colors ${playingId === song.id ? 'text-primary' : 'group-hover:text-primary'}`}>
                    {song.title}
                  </h3>
                  <p className="text-xs text-muted-foreground hover:underline cursor-pointer">{song.artist}</p>
                </div>
              </div>
              <div className="w-32 hidden md:block text-xs text-muted-foreground truncate">{song.album}</div>
              <div className="w-12 text-right text-xs text-muted-foreground">{song.duration}</div>
              <div className="w-16 flex items-center justify-end gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className={`w-7 h-7 p-0 ${
                    song.isLiked || likedSongs.has(song.id)
                      ? 'text-primary opacity-100'
                      : 'opacity-0 group-hover:opacity-100 text-muted-foreground'
                  }`}
                  onClick={() => toggleLike(song.id)}
                >
                  <Heart className={`w-3.5 h-3.5 ${song.isLiked || likedSongs.has(song.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button size="sm" variant="ghost" className="w-7 h-7 p-0 opacity-0 group-hover:opacity-100 text-muted-foreground">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredSongs.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No songs match "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}