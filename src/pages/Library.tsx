import { useState } from "react";
import { Search, Filter, Grid3X3, List, Play, MoreHorizontal, Heart, Clock, Music, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";

const album1 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop";
const album2 = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop";
const album3 = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop";
const album4 = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop";

const libraryData = {
  playlists: [
    { id: "liked-songs", title: "Liked Songs", subtitle: "127 songs", image: "", type: "playlist", owner: "You" },
    { id: "discover-weekly", title: "Discover Weekly", subtitle: "30 songs", image: album1, type: "playlist", owner: "PineApple Muzic" },
    { id: "daily-mix-1", title: "Daily Mix 1", subtitle: "50 songs", image: album2, type: "playlist", owner: "PineApple Muzic" },
    { id: "chill-vibes", title: "Chill Vibes", subtitle: "45 songs", image: album3, type: "playlist", owner: "You" },
    { id: "workout-beats", title: "Workout Beats", subtitle: "38 songs", image: album4, type: "playlist", owner: "You" },
    { id: "focus-flow", title: "Focus Flow", subtitle: "42 songs", image: album5, type: "playlist", owner: "You" },
    { id: "night-drive", title: "Night Drive", subtitle: "35 songs", image: album6, type: "playlist", owner: "You" },
  ],
  artists: [
    { id: "1", name: "Neon Pulse", image: album1, followers: "1.2M" },
    { id: "2", name: "Digital Prophets", image: album2, followers: "856K" },
    { id: "3", name: "Synthwave Collective", image: album3, followers: "634K" },
    { id: "4", name: "Electric Youth", image: album5, followers: "789K" },
  ],
  albums: [
    { id: "1", title: "Electric Dreams", artist: "Neon Pulse", year: "2024", image: album1 },
    { id: "2", title: "Future Sounds", artist: "Digital Prophets", year: "2024", image: album2 },
    { id: "3", title: "Retro Vision", artist: "Synthwave Collective", year: "2024", image: album3 },
    { id: "4", title: "Synthwave Origins", artist: "Electric Youth", year: "2024", image: album5 },
  ]
};

const stats = [
  { label: "Playlists", value: "14", icon: Music },
  { label: "Liked Songs", value: "127", icon: Heart },
  { label: "Hours Listened", value: "342", icon: Clock },
  { label: "Top Genre", value: "Hip Hop", icon: BarChart3 },
];

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const handleItemClick = (id: string, type: string) => {
    if (type === "playlist") navigate(`/playlist/${id}`);
    else if (type === "artist") navigate(`/artist/${id}`);
    else if (type === "album") navigate(`/album/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Stats */}
      <div>
        <h1 className="text-3xl font-bold mb-5 text-gradient-primary">Your Library</h1>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 stagger-children">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 glass neon-border hover-lift cursor-default">
              <stat.icon className="w-4 h-4 text-primary mb-2" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search in your library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex glass rounded-lg p-1">
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="w-8 h-8 p-0">
                <List className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="w-8 h-8 p-0">
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/5 border border-white/5 rounded-xl p-1">
          <TabsTrigger value="all" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
          <TabsTrigger value="playlists" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-white">Playlists</TabsTrigger>
          <TabsTrigger value="artists" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-white">Artists</TabsTrigger>
          <TabsTrigger value="albums" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-white">Albums</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 stagger-children">
              {libraryData.playlists.slice(0, 6).map((item) => (
                <Card
                  key={item.id}
                  className="p-3 glass hover:bg-white/5 transition-all cursor-pointer group hover-lift border-white/5"
                  onClick={() => handleItemClick(item.id, item.type)}
                >
                  <div className="relative mb-3">
                    {item.id === "liked-songs" ? (
                      <div className="w-full aspect-square bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white fill-white" />
                      </div>
                    ) : (
                      <img src={item.image} alt={item.title} className="w-full aspect-square object-cover rounded-xl" />
                    )}
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-[10px] text-muted-foreground truncate">{item.subtitle}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1 stagger-children">
              {libraryData.playlists.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/5 group cursor-pointer transition-all"
                  onClick={() => handleItemClick(item.id, item.type)}
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    {item.id === "liked-songs" ? (
                      <div className="w-full h-full bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </div>
                    ) : (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{item.type} • {item.owner}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><Play className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <div className="space-y-1 stagger-children">
            {libraryData.playlists.map((playlist) => (
              <div key={playlist.id} className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/5 group cursor-pointer transition-all" onClick={() => handleItemClick(playlist.id, playlist.type)}>
                <div className="w-12 h-12 flex-shrink-0">
                  {playlist.id === "liked-songs" ? (
                    <div className="w-full h-full bg-gradient-primary rounded-lg flex items-center justify-center"><Heart className="w-5 h-5 text-white fill-white" /></div>
                  ) : (
                    <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover rounded-lg" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{playlist.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{playlist.type} • {playlist.owner}</p>
                </div>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100"><Play className="w-3.5 h-3.5" /></Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <div className="flex gap-4 flex-wrap stagger-children">
            {libraryData.artists.map((artist) => (
              <div key={artist.id} className="w-36 group cursor-pointer text-center" onClick={() => handleItemClick(artist.id, "artist")}>
                <div className="relative mb-3">
                  <img src={artist.image} alt={artist.name} className="w-36 h-36 rounded-full object-cover group-hover:shadow-neon transition-shadow" />
                  <Button size="sm" className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </div>
                <h3 className="text-sm font-medium truncate">{artist.name}</h3>
                <p className="text-[10px] text-muted-foreground">Artist</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <div className="flex gap-4 flex-wrap stagger-children">
            {libraryData.albums.map((album) => (
              <div key={album.id} className="w-44 group cursor-pointer" onClick={() => handleItemClick(album.id, "album")}>
                <div className="relative mb-3">
                  <img src={album.image} alt={album.title} className="w-44 h-44 rounded-xl object-cover group-hover:shadow-neon transition-shadow" />
                  <Button size="sm" className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </div>
                <h3 className="text-sm font-medium truncate">{album.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{album.year} • {album.artist}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;