import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, MoreHorizontal, Share, Shuffle, CheckCircle, Music, Users, Disc } from 'lucide-react';
import { getArtistById, artists } from '@/data/musicData';

export default function Artist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artist = id ? getArtistById(id) : null;

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const totalSongs = artist.albums.reduce((t, a) => t + a.songs.length, 0);
  const latestAlbum = artist.albums.sort((a, b) => b.year - a.year)[0];
  const yearsActive = new Date().getFullYear() - Math.min(...artist.albums.map(a => a.year));

  // Similar artists
  const similar = artists.filter(a => a.id !== artist.id).slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Cinematic Header */}
      <div className="relative h-80 overflow-hidden">
        <img src={artist.image} alt={artist.name} className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        
        <div className="relative h-full flex items-end px-8 pb-8">
          <div className="flex items-end gap-6">
            <img src={artist.image} alt={artist.name} className="w-44 h-44 rounded-2xl object-cover shadow-2xl border-2 border-white/10" />
            <div className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-primary fill-primary" />
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">Verified Artist</span>
              </div>
              <h1 className="text-5xl font-bold mb-3 tracking-tight">{artist.name}</h1>
              
              {/* Animated stats */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Disc className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold text-foreground">{artist.albums.length}</span> albums
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Music className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold text-foreground">{totalSongs}</span> songs
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold text-foreground">{yearsActive}</span> years active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 py-6 flex items-center gap-3">
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
          <Share className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-full w-11 h-11 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-8 pb-12 space-y-12">
        {/* Popular Songs */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Popular</h2>
          <div className="space-y-1">
            {latestAlbum.songs.slice(0, 5).map((song, index) => (
              <div key={song.id} className="group flex items-center p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all track-row">
                <div className="w-8 text-center mr-3">
                  <span className="text-sm text-muted-foreground group-hover:hidden">{index + 1}</span>
                  <Button size="sm" variant="ghost" className="hidden group-hover:flex w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-white/20">
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </div>
                <img src={latestAlbum.cover} alt={song.title} className="w-10 h-10 rounded-lg mr-3 object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{song.title}</h3>
                  <p className="text-xs text-muted-foreground">{artist.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="w-7 h-7 p-0 opacity-0 group-hover:opacity-100">
                    <Heart className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {Math.floor(Math.random() * 2) + 3}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discography */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Discography</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {artist.albums.map((album) => (
              <Link key={album.id} to={`/album/${album.id}`} className="flex-shrink-0 w-44 group">
                <div className="relative mb-3">
                  <img src={album.cover} alt={album.title} className="w-44 h-44 rounded-xl object-cover group-hover:shadow-neon transition-shadow" />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 rounded-full w-10 h-10 bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
                <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{album.title}</h3>
                <p className="text-xs text-muted-foreground">{album.year} • Album</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Similar Artists */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Fans Also Like</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {similar.map((a) => (
              <div key={a.id} className="flex-shrink-0 w-32 group cursor-pointer text-center" onClick={() => navigate(`/artist/${a.id}`)}>
                <img src={a.image} alt={a.name} className="w-32 h-32 rounded-full object-cover mb-2 group-hover:shadow-neon transition-shadow" />
                <p className="text-xs font-medium truncate">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">Artist</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <div className="glass neon-border rounded-2xl p-6">
            <div className="flex items-start gap-6">
              <img src={artist.image} alt={artist.name} className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-3">{artist.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {artist.name} is one of the most influential artists in contemporary music, known for their unique style
                  and innovative approach. With {artist.albums.length} studio albums and {totalSongs} tracks, they've shaped the sound of a generation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">{artist.albums.length} Albums</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">{totalSongs} Songs</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">Since {Math.min(...artist.albums.map(a => a.year))}</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
