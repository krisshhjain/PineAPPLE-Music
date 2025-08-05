import { useState } from "react";
import { Search, Filter, Grid3X3, List, Play, MoreHorizontal, Heart, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";

// Using placeholder images for missing albums
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
    { id: "1", name: "Neon Pulse", image: album1, followers: "1.2M", isFollowing: true },
    { id: "2", name: "Digital Prophets", image: album2, followers: "856K", isFollowing: true },
    { id: "3", name: "Synthwave Collective", image: album3, followers: "634K", isFollowing: true },
    { id: "4", name: "Electric Youth", image: album5, followers: "789K", isFollowing: true },
  ],
  albums: [
    { id: "1", title: "Electric Dreams", artist: "Neon Pulse", year: "2024", image: album1 },
    { id: "2", title: "Future Sounds", artist: "Digital Prophets", year: "2024", image: album2 },
    { id: "3", title: "Retro Vision", artist: "Synthwave Collective", year: "2024", image: album3 },
    { id: "4", title: "Synthwave Origins", artist: "Electric Youth", year: "2024", image: album5 },
  ]
};

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterBy, setFilterBy] = useState("all");

  const handleItemClick = (id: string, type: string) => {
    if (type === "playlist") {
      navigate(`/playlist/${id}`);
    } else if (type === "artist") {
      navigate(`/artist/${id}`);
    } else if (type === "album") {
      navigate(`/album/${id}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
          Your Library
        </h1>
        
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search in your library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 border-border/30 focus:border-primary/50"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            
            <div className="flex bg-card/30 rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="w-8 h-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="w-8 h-8 p-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-card/30">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {/* Recently Played */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {libraryData.playlists.slice(0, 6).map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 bg-card/20 hover:bg-card/40 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                    onClick={() => handleItemClick(item.id, item.type)}
                  >
                    <div className="relative mb-4">
                      {item.id === "liked-songs" ? (
                        <div className="w-full aspect-square bg-gradient-accent rounded-lg flex items-center justify-center">
                          <Heart className="w-8 h-8 text-white fill-white" />
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      )}
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Play className="w-4 h-4 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-medium mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {libraryData.playlists.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 hover:bg-card/20 rounded-lg group cursor-pointer transition-all duration-200"
                    onClick={() => handleItemClick(item.id, item.type)}
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      {item.id === "liked-songs" ? (
                        <div className="w-full h-full bg-gradient-accent rounded-md flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white fill-white" />
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.type} • {item.owner}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <div className="space-y-1">
            {libraryData.playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center gap-3 p-3 hover:bg-card/20 rounded-lg group cursor-pointer transition-all duration-200"
                onClick={() => handleItemClick(playlist.id, playlist.type)}
              >
                <div className="w-12 h-12 flex-shrink-0">
                  {playlist.id === "liked-songs" ? (
                    <div className="w-full h-full bg-gradient-accent rounded-md flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                  ) : (
                    <img
                      src={playlist.image}
                      alt={playlist.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {playlist.type} • {playlist.owner}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100"
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {libraryData.artists.map((artist) => (
              <Card
                key={artist.id}
                className="p-4 bg-card/20 hover:bg-card/40 transition-all duration-300 cursor-pointer group text-center"
                onClick={() => handleItemClick(artist.id, "artist")}
              >
                <div className="relative mb-4">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-full"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
                <h3 className="font-medium mb-1 truncate">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">Artist</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {libraryData.albums.map((album) => (
              <Card
                key={album.id}
                className="p-4 bg-card/20 hover:bg-card/40 transition-all duration-300 cursor-pointer group"
                onClick={() => handleItemClick(album.id, "album")}
              >
                <div className="relative mb-4">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
                <h3 className="font-medium mb-1 truncate">{album.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{album.year} • {album.artist}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;