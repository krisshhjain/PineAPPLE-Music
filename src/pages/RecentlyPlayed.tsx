import { Clock, Play, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";

// Using placeholder images for missing albums
const album1 = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop";
const album2 = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop";
const album3 = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop";
const album4 = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop";

const recentlyPlayed = [
  {
    id: "1",
    title: "Midnight Runner",
    artist: "Neon Pulse",
    album: "Electric Dreams",
    image: album1,
    duration: "3:45",
    playedAt: "2 hours ago"
  },
  {
    id: "2",
    title: "Cyber Nights",
    artist: "Digital Prophets",
    album: "Future Sounds",
    image: album2,
    duration: "4:12",
    playedAt: "3 hours ago"
  },
  {
    id: "3",
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    album: "Retro Vision",
    image: album3,
    duration: "3:28",
    playedAt: "5 hours ago"
  },
  {
    id: "4",
    title: "Chrome Horizon",
    artist: "Future Bass Legion",
    album: "Digital Realm",
    image: album4,
    duration: "4:56",
    playedAt: "Yesterday"
  },
  {
    id: "5",
    title: "Voltage",
    artist: "Electric Youth",
    album: "Synthwave Origins",
    image: album5,
    duration: "3:33",
    playedAt: "Yesterday"
  },
  {
    id: "6",
    title: "Rain Code",
    artist: "Cyber Matrix",
    album: "Digital Rain",
    image: album6,
    duration: "5:21",
    playedAt: "2 days ago"
  }
];

const RecentlyPlayed = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Clock className="w-8 h-8 text-background" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Recently Played</h1>
          <p className="text-muted-foreground">Your listening history</p>
        </div>
      </div>

      {/* Recently Played List */}
      <div className="space-y-1">
        {/* Header Row */}
        <div className="grid grid-cols-[40px_1fr_1fr_1fr_60px_60px] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border/20">
          <div>#</div>
          <div>Title</div>
          <div>Album</div>
          <div>Played</div>
          <div>Duration</div>
          <div></div>
        </div>

        {/* Track Rows */}
        {recentlyPlayed.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-[40px_1fr_1fr_1fr_60px_60px] gap-4 px-4 py-3 hover:bg-muted/10 rounded-lg group transition-colors"
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
                src={track.image}
                alt={track.album}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium truncate hover:text-primary cursor-pointer">
                  {track.title}
                </p>
                <p className="text-sm text-muted-foreground truncate hover:text-foreground cursor-pointer">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* Album */}
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground truncate hover:text-foreground cursor-pointer">
                {track.album}
              </p>
            </div>

            {/* Played At */}
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground">
                {track.playedAt}
              </p>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                {track.duration}
              </p>
            </div>

            {/* More Options */}
            <div className="flex items-center justify-center">
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
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-border/30 hover:bg-muted/20">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default RecentlyPlayed;