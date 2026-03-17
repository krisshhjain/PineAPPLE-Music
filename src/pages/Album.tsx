import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, MoreHorizontal, Share, Download, Clock, Shuffle, Disc } from 'lucide-react';
import { getAlbumById, artists } from '@/data/musicData';

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const album = id ? getAlbumById(id) : null;

  if (!album) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Album Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const totalDuration = album.songs.length * 3.5;
  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
  };

  // Get other albums by same artist
  const sameArtist = artists.find(a => a.id === album.artistId);
  const otherAlbums = sameArtist?.albums.filter(a => a.id !== album.id) || [];

  return (
    <div className="min-h-screen">
      {/* Album Header with gradient background */}
      <div className="relative">
        {/* Blurred background */}
        <div className="absolute inset-0 h-80 overflow-hidden">
          <img src={album.cover} alt="" className="w-full h-full object-cover scale-110 blur-[60px] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        </div>

        <div className="relative px-8 pt-12 pb-8">
          <div className="flex items-end gap-7">
            <img
              src={album.cover}
              alt={album.title}
              className="w-56 h-56 rounded-2xl object-cover shadow-2xl border border-white/10"
            />
            <div className="flex-1 pb-2">
              <Badge className="bg-primary/20 text-primary border-0 text-xs mb-2">Album</Badge>
              <h1 className="text-5xl font-bold mb-3 tracking-tight">{album.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link
                  to={`/artist/${album.artistId}`}
                  className="hover:text-foreground hover:underline font-semibold text-foreground"
                >
                  {album.artist}
                </Link>
                <span>•</span>
                <span>{album.year}</span>
                <span>•</span>
                <span>{album.songs.length} songs</span>
                <span>•</span>
                <span>{formatDuration(totalDuration)}</span>
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
          <Heart className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-full w-11 h-11 text-muted-foreground hover:text-foreground">
          <Download className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-full w-11 h-11 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-8 pb-12 space-y-12">
        {/* Track List */}
        <section>
          <div className="flex items-center gap-4 px-4 py-2 text-[10px] text-muted-foreground uppercase tracking-widest border-b border-white/5 mb-2">
            <div className="w-8 text-center">#</div>
            <div className="flex-1">Title</div>
            <div className="w-20 hidden md:block">Album</div>
            <div className="w-12 text-right"><Clock className="w-3.5 h-3.5 inline" /></div>
            <div className="w-16"></div>
          </div>

          <div className="space-y-0.5 stagger-children">
            {album.songs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all track-row"
              >
                <div className="w-8 text-center">
                  <span className="text-sm text-muted-foreground group-hover:hidden">{index + 1}</span>
                  <Button size="sm" variant="ghost" className="hidden group-hover:flex w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-white/20">
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={album.cover} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{song.title}</h3>
                    <Link to={`/artist/${album.artistId}`} className="text-xs text-muted-foreground hover:underline">{album.artist}</Link>
                  </div>
                </div>
                <div className="w-20 hidden md:block">
                  <span className="text-xs text-muted-foreground truncate">{album.title}</span>
                </div>
                <div className="w-12 text-right text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 2) + 3}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                </div>
                <div className="w-16 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0"><Heart className="w-3.5 h-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Album Info */}
        <section>
          <div className="glass neon-border rounded-2xl p-6">
            <div className="flex items-start gap-6">
              <img src={album.cover} alt={album.title} className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-1">{album.title}</h3>
                <p className="text-sm text-primary mb-3">
                  by <Link to={`/artist/${album.artistId}`} className="hover:underline">{album.artist}</Link>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Released in {album.year}, "{album.title}" features {album.songs.length} tracks
                  that showcase {album.artist}'s artistic growth and musical evolution.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">{album.year}</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">{album.songs.length} tracks</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">{formatDuration(totalDuration)}</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More by Artist */}
        {otherAlbums.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">More by {album.artist}</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {otherAlbums.map((a) => (
                <Link key={a.id} to={`/album/${a.id}`} className="flex-shrink-0 w-40 group">
                  <div className="relative mb-2">
                    <img src={a.cover} alt={a.title} className="w-40 h-40 rounded-xl object-cover group-hover:shadow-neon transition-shadow" />
                    <Button size="sm" className="absolute bottom-2 right-2 rounded-full w-9 h-9 bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="text-xs font-semibold truncate">{a.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{a.year}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
