import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause, Heart, MoreHorizontal, Clock, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";

// Using placeholder images for missing albums
const album1 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop";
const album2 = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop";
const album3 = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop";
const album4 = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop";

// Comprehensive playlist data with songs for each category
const playlistsData = {
  "liked-songs": {
    id: "liked-songs",
    name: "Liked Songs",
    description: "Songs you've liked",
    image: "", // Special heart icon for liked songs
    tracks: 127,
    duration: "7 hr 32 min",
    isLiked: true,
    songs: [
      { id: "1", title: "Midnight Runner", artist: "Neon Pulse", album: "Electric Dreams", image: album1, duration: "3:45", isLiked: true },
      { id: "2", title: "Cyber Nights", artist: "Digital Prophets", album: "Future Sounds", image: album2, duration: "4:12", isLiked: true },
      { id: "3", title: "Neon Dreams", artist: "Synthwave Collective", album: "Retro Vision", image: album3, duration: "3:28", isLiked: true },
    ]
  },
  "discover-weekly": {
    id: "discover-weekly",
    name: "Discover Weekly",
    description: "Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every Monday.",
    image: album1,
    tracks: 30,
    duration: "2 hr 15 min",
    isLiked: false,
    songs: [
      { id: "dw1", title: "Quantum Leap", artist: "Future Architects", album: "Digital Horizon", image: album4, duration: "4:23", isLiked: false },
      { id: "dw2", title: "Chrome City", artist: "Neon Rebels", album: "Urban Dreams", image: album5, duration: "3:45", isLiked: true },
      { id: "dw3", title: "Binary Sunset", artist: "Code Runners", album: "System Override", image: album6, duration: "5:12", isLiked: false },
    ]
  },
  "daily-mix-1": {
    id: "daily-mix-1",
    name: "Daily Mix 1",
    description: "Synthwave, Retrowave, and more",
    image: album2,
    tracks: 50,
    duration: "3 hr 45 min",
    isLiked: true,
    songs: [
      { id: "dm1", title: "Neon Highway", artist: "Retrowave Kings", album: "80s Revival", image: album1, duration: "4:15", isLiked: true },
      { id: "dm2", title: "Electric Pulse", artist: "Synth Masters", album: "Digital Age", image: album2, duration: "3:56", isLiked: false },
      { id: "dm3", title: "Midnight Drive", artist: "Night Riders", album: "After Dark", image: album3, duration: "4:33", isLiked: true },
    ]
  },
  "daily-mix-2": {
    id: "daily-mix-2",
    name: "Daily Mix 2",
    description: "Future Bass, Electronic, and more",
    image: album3,
    tracks: 50,
    duration: "3 hr 28 min",
    isLiked: false,
    songs: [
      { id: "dm21", title: "Bass Drop", artist: "Electronic Unity", album: "Future Sounds", image: album4, duration: "3:24", isLiked: true },
      { id: "dm22", title: "Digital Rain", artist: "Cyber Matrix", album: "Code Red", image: album5, duration: "4:45", isLiked: false },
      { id: "dm23", title: "Voltage Storm", artist: "Electric Youth", album: "Power Grid", image: album6, duration: "3:51", isLiked: true },
    ]
  },
  "chill-vibes": {
    id: "chill-vibes",
    name: "Chill Vibes",
    description: "Relaxing electronic beats for focus and chill",
    image: album4,
    tracks: 45,
    duration: "2 hr 52 min",
    isLiked: true,
    songs: [
      { id: "cv1", title: "Floating Dreams", artist: "Ambient Space", album: "Ethereal", image: album1, duration: "5:23", isLiked: true },
      { id: "cv2", title: "Ocean Waves", artist: "Chill Collective", album: "Serenity", image: album2, duration: "4:15", isLiked: false },
      { id: "cv3", title: "Peaceful Mind", artist: "Zen Electronics", album: "Meditation", image: album3, duration: "6:12", isLiked: true },
    ]
  },
  "workout-beats": {
    id: "workout-beats",
    name: "Workout Beats",
    description: "High-energy electronic music to pump up your workout",
    image: album5,
    tracks: 38,
    duration: "2 hr 25 min",
    isLiked: false,
    songs: [
      { id: "wb1", title: "Adrenaline Rush", artist: "Hardcore Beats", album: "Maximum Energy", image: album4, duration: "3:45", isLiked: true },
      { id: "wb2", title: "Power Surge", artist: "Bass Bombers", album: "Intensity", image: album5, duration: "4:12", isLiked: false },
      { id: "wb3", title: "Beast Mode", artist: "Aggressive Synth", album: "No Limits", image: album6, duration: "3:33", isLiked: true },
    ]
  },
  "focus-flow": {
    id: "focus-flow",
    name: "Focus Flow",
    description: "Ambient and minimal electronic music for deep concentration",
    image: album6,
    tracks: 42,
    duration: "3 hr 15 min",
    isLiked: true,
    songs: [
      { id: "ff1", title: "Deep Focus", artist: "Concentration Crew", album: "Mental Clarity", image: album1, duration: "7:45", isLiked: true },
      { id: "ff2", title: "Mind Palace", artist: "Cognitive Beats", album: "Brain Waves", image: album2, duration: "6:23", isLiked: false },
      { id: "ff3", title: "Flow State", artist: "Productive Sounds", album: "In The Zone", image: album3, duration: "5:56", isLiked: true },
    ]
  },
  "night-drive": {
    id: "night-drive",
    name: "Night Drive",
    description: "Dark synthwave and electronic for late night cruising",
    image: album1,
    tracks: 35,
    duration: "2 hr 43 min",
    isLiked: false,
    songs: [
      { id: "nd1", title: "City Lights", artist: "Urban Nighthawks", album: "Neon Streets", image: album4, duration: "4:56", isLiked: true },
      { id: "nd2", title: "Highway Dreams", artist: "Night Cruisers", album: "Endless Road", image: album5, duration: "3:44", isLiked: false },
      { id: "nd3", title: "Midnight Oil", artist: "Dark Synth", album: "After Hours", image: album6, duration: "5:21", isLiked: true },
    ]
  },
  "synthwave-classics": {
    id: "synthwave-classics",
    name: "Synthwave Classics",
    description: "The best retro synthwave tracks that defined the genre",
    image: album2,
    tracks: 55,
    duration: "4 hr 12 min",
    isLiked: true,
    songs: [
      { id: "sc1", title: "Retro Future", artist: "Synthwave Legends", album: "80s Forever", image: album1, duration: "4:33", isLiked: true },
      { id: "sc2", title: "Neon Genesis", artist: "Classic Synth", album: "Origins", image: album2, duration: "3:45", isLiked: false },
      { id: "sc3", title: "Digital Nostalgia", artist: "Retro Masters", album: "Time Machine", image: album3, duration: "4:15", isLiked: true },
    ]
  },
  "future-bass-mix": {
    id: "future-bass-mix",
    name: "Future Bass Mix",
    description: "Melodic future bass with emotional drops and beautiful synths",
    image: album3,
    tracks: 40,
    duration: "2 hr 58 min",
    isLiked: false,
    songs: [
      { id: "fb1", title: "Emotional Drop", artist: "Future Feels", album: "Melodic Journey", image: album4, duration: "4:25", isLiked: true },
      { id: "fb2", title: "Beautiful Chaos", artist: "Bass Evolution", album: "New Horizons", image: album5, duration: "3:52", isLiked: false },
      { id: "fb3", title: "Euphoric Waves", artist: "Melodic Bass", album: "Feel Good", image: album6, duration: "4:18", isLiked: true },
    ]
  },
  "ambient-dreams": {
    id: "ambient-dreams",
    name: "Ambient Dreams",
    description: "Ethereal ambient electronic music for relaxation and sleep",
    image: album4,
    tracks: 28,
    duration: "3 hr 45 min",
    isLiked: true,
    songs: [
      { id: "ad1", title: "Celestial Drift", artist: "Space Ambient", album: "Cosmic Journey", image: album1, duration: "8:23", isLiked: true },
      { id: "ad2", title: "Floating Consciousness", artist: "Dream State", album: "Lucid", image: album2, duration: "7:45", isLiked: false },
      { id: "ad3", title: "Infinite Space", artist: "Ambient Collective", album: "Beyond Reality", image: album3, duration: "9:12", isLiked: true },
    ]
  },
  "cyber-punk": {
    id: "cyber-punk",
    name: "Cyber Punk",
    description: "Dark, industrial electronic music for the cyberpunk aesthetic",
    image: album5,
    tracks: 33,
    duration: "2 hr 21 min",
    isLiked: false,
    songs: [
      { id: "cp1", title: "Neural Interface", artist: "Cyber Corps", album: "Matrix Protocol", image: album4, duration: "4:12", isLiked: true },
      { id: "cp2", title: "Ghost in the Shell", artist: "Digital Phantoms", album: "Cyber Reality", image: album5, duration: "3:55", isLiked: false },
      { id: "cp3", title: "System Breach", artist: "Hacker Collective", album: "Code War", image: album6, duration: "4:33", isLiked: true },
    ]
  },
  "retrowave-nights": {
    id: "retrowave-nights",
    name: "Retrowave Nights",
    description: "Nostalgic retrowave perfect for late night listening",
    image: album6,
    tracks: 47,
    duration: "3 hr 35 min",
    isLiked: true,
    songs: [
      { id: "rn1", title: "80s Nostalgia", artist: "Retro Revival", album: "Time Capsule", image: album1, duration: "4:45", isLiked: true },
      { id: "rn2", title: "VHS Dreams", artist: "Analog Memories", album: "Rewind", image: album2, duration: "3:33", isLiked: false },
      { id: "rn3", title: "Neon Sunset", artist: "Sunset Drive", album: "Golden Hour", image: album3, duration: "4:21", isLiked: true },
    ]
  },
  "deep-house-vibes": {
    id: "deep-house-vibes",
    name: "Deep House Vibes",
    description: "Smooth deep house beats with soulful electronic elements",
    image: album1,
    tracks: 52,
    duration: "4 hr 15 min",
    isLiked: false,
    songs: [
      { id: "dh1", title: "Soulful Groove", artist: "Deep Collective", album: "Underground", image: album4, duration: "5:23", isLiked: true },
      { id: "dh2", title: "Midnight House", artist: "Club Masters", album: "After Dark", image: album5, duration: "4:45", isLiked: false },
      { id: "dh3", title: "Electronic Soul", artist: "House Prophets", album: "Deep Cuts", image: album6, duration: "5:12", isLiked: true },
    ]
  },
  "lo-fi-beats": {
    id: "lo-fi-beats",
    name: "Lo-Fi Beats",
    description: "Chill lo-fi hip hop and electronic beats for studying and relaxing",
    image: album2,
    tracks: 60,
    duration: "3 hr 48 min",
    isLiked: true,
    songs: [
      { id: "lf1", title: "Study Session", artist: "Lo-Fi Collective", album: "Chill Vibes", image: album1, duration: "3:45", isLiked: true },
      { id: "lf2", title: "Coffee Shop", artist: "Mellow Beats", album: "Cozy Moments", image: album2, duration: "4:12", isLiked: false },
      { id: "lf3", title: "Rainy Day", artist: "Peaceful Sounds", album: "Quiet Hours", image: album3, duration: "3:33", isLiked: true },
    ]
  }
};

const Playlist = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const playlist = playlistsData[id as keyof typeof playlistsData];
  
  if (!playlist) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-muted-foreground">Playlist not found</p>
      </div>
    );
  }

  const filteredSongs = playlist.songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Playlist Header */}
      <div className="flex gap-6 mb-8">
        {/* Playlist Cover */}
        <div className="w-60 h-60 flex-shrink-0">
          {playlist.id === "liked-songs" ? (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Heart className="w-24 h-24 text-white fill-white" />
            </div>
          ) : (
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-full object-cover rounded-lg shadow-glow"
            />
          )}
        </div>

        {/* Playlist Info */}
        <div className="flex flex-col justify-end">
          <p className="text-sm font-medium text-muted-foreground mb-2">PLAYLIST</p>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {playlist.name}
          </h1>
          <p className="text-muted-foreground mb-4 max-w-lg">
            {playlist.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">SynthTunes</span>
            <span>•</span>
            <span>{playlist.tracks} songs</span>
            <span>•</span>
            <span>{playlist.duration}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className={`w-12 h-12 rounded-full hover:bg-muted/20 ${playlist.isLiked ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Heart className={`w-6 h-6 ${playlist.isLiked ? 'fill-current' : ''}`} />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-12 h-12 rounded-full hover:bg-muted/20 text-muted-foreground"
        >
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search in playlist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/20 border-border/30 focus:border-primary"
          />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Songs List */}
      <div className="space-y-1">
        {/* Header Row */}
        <div className="grid grid-cols-[40px_1fr_1fr_60px_60px] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border/20">
          <div>#</div>
          <div>Title</div>
          <div>Album</div>
          <div><Clock className="w-4 h-4" /></div>
          <div></div>
        </div>

        {/* Track Rows */}
        {filteredSongs.map((song, index) => (
          <div
            key={song.id}
            className="grid grid-cols-[40px_1fr_1fr_60px_60px] gap-4 px-4 py-3 hover:bg-muted/10 rounded-lg group transition-colors"
          >
            {/* Play Button / Index */}
            <div className="flex items-center">
              <span className="group-hover:hidden text-muted-foreground text-sm">
                {index + 1}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="hidden group-hover:flex w-8 h-8 p-0 hover:bg-primary hover:text-primary-foreground"
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>

            {/* Title & Artist */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={song.image}
                alt={song.album}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium truncate hover:text-primary cursor-pointer">
                  {song.title}
                </p>
                <p className="text-sm text-muted-foreground truncate hover:text-foreground cursor-pointer">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Album */}
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground truncate hover:text-foreground cursor-pointer">
                {song.album}
              </p>
            </div>

            {/* Like Button */}
            <div className="flex items-center justify-center">
              <Button
                size="sm"
                variant="ghost"
                className={`w-8 h-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-muted ${song.isLiked ? 'opacity-100 text-primary' : ''}`}
              >
                <Heart className={`w-4 h-4 ${song.isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Duration & More */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {song.duration}
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-muted"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredSongs.length === 3 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-border/30 hover:bg-muted/20">
            Show all {playlist.tracks} songs
          </Button>
        </div>
      )}
    </div>
  );
};

export default Playlist;