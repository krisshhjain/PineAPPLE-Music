import { useState, useEffect } from "react";
import { Play, Pause, Heart, Clock, ChevronRight, Zap, Music2, Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { artists } from "@/data/musicData";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";

// Import artist images
import drakeImg from "@/assets/Artists/Drake.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import kanyeImg from "@/assets/Artists/Kanye West.jpg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import rihannaImg from "@/assets/Artists/Rihanna.png";
import asapImg from "@/assets/Artists/Asap Rocky.jpeg";
import szaImg from "@/assets/Artists/SZA.jpeg";
import lilBabyImg from "@/assets/Artists/Lil Baby.jpeg";
import gunnaImg from "@/assets/Artists/Gunna.jpg";

// Using placeholder images for missing albums
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

const madeForYou = [
  { id: "discover-weekly", title: "Discover Weekly", subtitle: "Your weekly mixtape of fresh music", image: album1, type: "playlist" },
  { id: "daily-mix-1", title: "Daily Mix 1", subtitle: "Synthwave, Retrowave, and more", image: album2, type: "playlist" },
  { id: "daily-mix-2", title: "Daily Mix 2", subtitle: "Future Bass, Electronic, and more", image: album3, type: "playlist" },
  { id: "release-radar", title: "Release Radar", subtitle: "Catch all the latest music", image: album4, type: "playlist" },
  { id: "liked-songs", title: "On Repeat", subtitle: "Songs you can't stop playing", image: album5, type: "playlist" },
  { id: "time-capsule", title: "Time Capsule", subtitle: "Songs from your musical past", image: album6, type: "playlist" },
];

const popularArtists = [
  { id: "brake", name: "Brake", image: artists.find(a => a.id === "brake")?.image || drakeImg, followers: "1.2M", isFollowing: true },
  { id: "k-soul", name: "K. Soul", image: artists.find(a => a.id === "k-soul")?.image || jColeImg, followers: "856K", isFollowing: false },
  { id: "derrick-damar", name: "Derrick Damar", image: artists.find(a => a.id === "derrick-damar")?.image || kendrickImg, followers: "634K", isFollowing: true },
  { id: "zane-east", name: "Zane East", image: artists.find(a => a.id === "zane-east")?.image || kanyeImg, followers: "423K", isFollowing: false },
  { id: "kayler-swift", name: "Kayler Swift", image: artists.find(a => a.id === "kayler-swift")?.image || taylorImg, followers: "789K", isFollowing: true },
  { id: "rhonda", name: "Rhonda", image: artists.find(a => a.id === "rhonda")?.image || rihannaImg, followers: "345K", isFollowing: false },
];

const newReleases = [
  { id: "1", title: "Certified Lover", artist: "Brake", year: "2024", image: drakeImg, type: "album" },
  { id: "2", title: "Forest Hills", artist: "C Jole", year: "2024", image: jColeImg, type: "album" },
  { id: "3", title: "Good Kid Mad City", artist: "K-Dot", year: "2024", image: kendrickImg, type: "album" },
  { id: "4", title: "Graduation", artist: "Yeezy", year: "2024", image: kanyeImg, type: "album" },
  { id: "5", title: "Red (Taylor's Version)", artist: "T-Swift", year: "2024", image: taylorImg, type: "album" },
  { id: "6", title: "Anti", artist: "RiRi", year: "2024", image: rihannaImg, type: "album" },
];

const chartHits = [
  { id: "1", title: "God's Plan", artist: "Brake", artistId: "brake", album: "Certified Lover", image: drakeImg, duration: "3:45", rank: 1, isLiked: true },
  { id: "2", title: "Middle Child", artist: "K. Soul", artistId: "k-soul", album: "Forest Hills", image: jColeImg, duration: "4:12", rank: 2, isLiked: false },
  { id: "3", title: "HUMBLE.", artist: "Derrick Damar", artistId: "derrick-damar", album: "Good Kid Mad City", image: kendrickImg, duration: "3:28", rank: 3, isLiked: true },
  { id: "4", title: "Stronger", artist: "Zane East", artistId: "zane-east", album: "Graduation", image: kanyeImg, duration: "4:56", rank: 4, isLiked: false },
  { id: "5", title: "Anti-Hero", artist: "Kayler Swift", artistId: "kayler-swift", album: "Red (Taylor's Version)", image: taylorImg, duration: "3:33", rank: 5, isLiked: true },
];

const Home = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playingCard, setPlayingCard] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setTimeOfDay("morning");
    } else if (hour < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("evening");
    }
  }, [currentTime]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return "Good morning";
    }
    if (hour < 18) {
      return "Good afternoon";
    }
    return "Good evening";
  };

  const handlePlaylistClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };

  const handleArtistClick = (id: string) => {
    navigate(`/artist/${id}`);
  };

  const handleAlbumClick = (id: string) => {
    navigate(`/album/${id}`);
  };

  const togglePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingCard(playingCard === id ? null : id);
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 p-6 space-y-8">
        {/* Greeting Header */}
        <div className="mb-8 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/PineAppke-noBG.png" 
                  alt="PineApple Muzic" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              
              <div>
                <h1 className="text-5xl font-bold mb-2 text-foreground">
                  {getGreeting()}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-lg text-muted-foreground font-medium">
                    Welcome to{" "}
                    <span className="font-bold text-accent">
                      PineApple Muzic
                    </span>
                    {" "}– Your sonic universe awaits
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Time display */}
          <div className="absolute top-0 right-0 bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
              <Music2 className="w-4 h-4" />
            </div>
          </div>
        </div>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recently played</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyPlayed.map((item, index) => (
            <Card
              key={item.id}
              className="flex items-center p-4 bg-gradient-card hover:bg-card/40 transition-all duration-300 cursor-pointer group border border-border/30 hover:border-primary/30 shadow-card hover:shadow-glow animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handlePlaylistClick(item.id)}
            >
              <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                {item.id === "liked-songs" ? (
                  <div className="w-full h-full bg-gradient-accent rounded-md flex items-center justify-center relative overflow-hidden">
                    <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-across"></div>
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                <Button
                  size="sm"
                  className="absolute inset-0 w-full h-full rounded-md opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/60 transition-all duration-300 backdrop-blur-sm"
                  onClick={(e) => togglePlay(item.id, e)}
                >
                  {playingCard === item.id ? (
                    <Pause className="w-6 h-6 text-white animate-pulse" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </Button>
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="font-medium truncate group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
              </div>
              
              <div className="ml-2">
                <Disc3 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:animate-spin" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Made for you</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {madeForYou.map((item) => (
            <Card
              key={item.id}
              className="p-4 bg-muted/10 hover:bg-muted/20 transition-all duration-300 cursor-pointer group border-border/20"
              onClick={() => handlePlaylistClick(item.id)}
            >
              <div className="relative mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
                  onClick={(e) => togglePlay(item.id, e)}
                >
                  {playingCard === item.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-1 truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Popular artists</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {popularArtists.map((artist) => (
            <Card
              key={artist.id}
              className="p-4 bg-muted/10 hover:bg-muted/20 transition-all duration-300 cursor-pointer group border-border/20 text-center"
              onClick={() => handleArtistClick(artist.id)}
            >
              <div className="relative mb-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-square object-cover rounded-full mx-auto"
                />
                
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
                  onClick={(e) => togglePlay(artist.id, e)}
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-1 truncate">{artist.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">Artist</p>
                <p className="text-xs text-muted-foreground">{artist.followers} followers</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New releases for you</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {newReleases.map((album) => (
            <Card
              key={album.id}
              className="p-4 bg-muted/10 hover:bg-muted/20 transition-all duration-300 cursor-pointer group border-border/20"
              onClick={() => handleAlbumClick(album.id)}
            >
              <div className="relative mb-4">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
                  onClick={(e) => togglePlay(album.id, e)}
                >
                  {playingCard === album.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-1 truncate">{album.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{album.year} • {album.artist}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Chart Hits */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's top hits</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-1">
          {chartHits.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-muted/10 rounded-lg group transition-colors cursor-pointer"
            >
              {/* Rank */}
              <div className="w-6 text-center">
                <span className="text-muted-foreground font-medium">{track.rank}</span>
              </div>

              {/* Track Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative">
                  <img
                    src={track.image}
                    alt={track.album}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute inset-0 w-full h-full rounded-md opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/60"
                    onClick={(e) => togglePlay(track.id, e)}
                  >
                    {playingCard === track.id ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </Button>
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate hover:text-primary cursor-pointer">
                    {track.title}
                  </p>
                  <Link 
                    to={`/artist/${track.artistId}`}
                    className="text-sm text-muted-foreground truncate hover:text-foreground hover:underline cursor-pointer"
                  >
                    {track.artist}
                  </Link>
                </div>
              </div>

              {/* Album */}
              <div className="hidden md:block min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate hover:text-foreground cursor-pointer">
                  {track.album}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-muted ${track.isLiked ? 'opacity-100 text-primary' : ''}`}
                >
                  <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
                </Button>
                
                <div className="w-12 text-right">
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;