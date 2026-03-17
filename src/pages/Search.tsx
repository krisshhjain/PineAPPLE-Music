import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Play, Mic, Heart, MoreHorizontal, TrendingUp, Flame, X } from 'lucide-react';
import { searchMusic, getAllSongs, getAllAlbums, artists } from '@/data/musicData';

const trendingSearches = [
  { term: "Brake", hot: true },
  { term: "Derrick Damar", hot: true },
  { term: "ZYA", hot: false },
  { term: "Zane East", hot: false },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ artists: [], albums: [], songs: [] });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchMusic(query);
      setResults(searchResults);
    } else {
      setResults({ artists: [], albums: [], songs: [] });
    }
  }, [query]);

  const hasResults = results.artists.length > 0 || results.albums.length > 0 || results.songs.length > 0;

  const genres = [
    { name: 'Hip Hop', icon: '🎤', color: 'from-amber-600 to-orange-700' },
    { name: 'Pop', icon: '⭐', color: 'from-pink-500 to-rose-600' },
    { name: 'Rock', icon: '🎸', color: 'from-red-600 to-red-800' },
    { name: 'R&B', icon: '💜', color: 'from-purple-600 to-indigo-700' },
    { name: 'Alternative', icon: '🌀', color: 'from-teal-500 to-cyan-700' },
    { name: 'Electronic', icon: '⚡', color: 'from-cyan-500 to-blue-600' },
    { name: 'Country', icon: '🤠', color: 'from-yellow-600 to-amber-700' },
    { name: 'Jazz', icon: '🎷', color: 'from-orange-600 to-amber-800' },
    { name: 'Classical', icon: '🎻', color: 'from-emerald-600 to-green-700' },
    { name: 'Indie', icon: '🎹', color: 'from-violet-500 to-purple-700' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Search Input */}
      <div className="relative max-w-2xl">
        <SearchIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        <Input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-12 pr-20 h-13 bg-white/5 border-white/10 text-foreground placeholder-muted-foreground text-lg rounded-xl transition-all ${isFocused ? 'border-primary/50 shadow-glow' : ''}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button variant="ghost" size="sm" onClick={() => setQuery('')} className="w-8 h-8 p-0 text-muted-foreground">
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-muted-foreground hover:text-primary">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!query.trim() ? (
        <div className="space-y-10">
          {/* Trending */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Trending Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((item) => (
                <button
                  key={item.term}
                  onClick={() => setQuery(item.term)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/5 transition-all text-sm group"
                >
                  {item.hot && <Flame className="w-3 h-3 text-orange-400" />}
                  <span className="group-hover:text-primary transition-colors">{item.term}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Browse All */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {genres.map((genre) => (
                <div
                  key={genre.name}
                  className={`genre-card-3d relative h-28 rounded-xl bg-gradient-to-br ${genre.color} cursor-pointer overflow-hidden group`}
                >
                  <div className="absolute inset-0 flex items-center justify-between p-5">
                    <p className="text-base font-bold text-white">{genre.name}</p>
                    <span className={`text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12`}>
                      {genre.icon}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          {hasResults ? (
            <>
              {/* Top Result + Songs side by side */}
              {(results.artists.length > 0 || results.albums.length > 0) && (
                <div className="grid md:grid-cols-[380px_1fr] gap-6">
                  {/* Top Result */}
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Top result</h2>
                    {results.artists.length > 0 ? (
                      <Link to={`/artist/${results.artists[0].id}`}>
                        <Card className="glass neon-border hover:bg-white/5 transition-all cursor-pointer group p-6 h-full">
                          <img
                            src={results.artists[0].image}
                            alt={results.artists[0].name}
                            className="w-24 h-24 rounded-full object-cover mb-4 group-hover:shadow-neon transition-shadow"
                          />
                          <h3 className="text-2xl font-bold mb-2">{results.artists[0].name}</h3>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-primary/20 text-primary border-0 text-xs">Artist</Badge>
                            <Button className="bg-white hover:bg-white/90 text-black rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-all">
                              <Play className="w-4 h-4 ml-0.5" />
                            </Button>
                          </div>
                        </Card>
                      </Link>
                    ) : results.albums.length > 0 && (
                      <Link to={`/album/${results.albums[0].id}`}>
                        <Card className="glass neon-border hover:bg-white/5 transition-all cursor-pointer group p-6 h-full">
                          <img
                            src={results.albums[0].cover}
                            alt={results.albums[0].title}
                            className="w-24 h-24 rounded-lg object-cover mb-4"
                          />
                          <h3 className="text-2xl font-bold mb-1">{results.albums[0].title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">by {results.albums[0].artist}</p>
                          <Badge className="bg-primary/20 text-primary border-0 text-xs">Album</Badge>
                        </Card>
                      </Link>
                    )}
                  </section>

                  {/* Songs */}
                  {results.songs.length > 0 && (
                    <section>
                      <h2 className="text-lg font-semibold mb-4">Songs</h2>
                      <div className="space-y-1">
                        {results.songs.slice(0, 5).map((song) => (
                          <div key={song.id} className="group flex items-center p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
                            <div className="w-10 h-10 mr-3 flex-shrink-0">
                              <img src={song.image} alt={song.title} className="w-full h-full rounded object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{song.title}</h3>
                              <Link to={`/artist/${song.artistId}`} className="text-xs text-muted-foreground hover:underline">{song.artist}</Link>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" variant="ghost" className="w-7 h-7 p-0"><Heart className="w-3.5 h-3.5" /></Button>
                            </div>
                            <span className="text-xs text-muted-foreground ml-3 w-10 text-right">{song.duration}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Artists */}
              {results.artists.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4">Artists</h2>
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                    {results.artists.map((artist) => (
                      <Link key={artist.id} to={`/artist/${artist.id}`} className="flex-shrink-0 w-36 group text-center">
                        <img src={artist.image} alt={artist.name} className="w-36 h-36 rounded-full mx-auto mb-3 object-cover group-hover:shadow-neon transition-shadow" />
                        <h3 className="text-sm font-semibold truncate">{artist.name}</h3>
                        <Badge className="bg-primary/20 text-primary border-0 text-[10px] mt-1">Artist</Badge>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Albums */}
              {results.albums.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4">Albums</h2>
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                    {results.albums.map((album) => (
                      <Link key={album.id} to={`/album/${album.id}`} className="flex-shrink-0 w-44 group">
                        <div className="relative mb-3">
                          <img src={album.cover} alt={album.title} className="w-44 h-44 rounded-xl object-cover group-hover:shadow-neon transition-shadow" />
                          <Button size="sm" className="absolute bottom-2 right-2 rounded-full w-9 h-9 bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                            <Play className="w-3.5 h-3.5 ml-0.5" />
                          </Button>
                        </div>
                        <h3 className="text-sm font-semibold truncate">{album.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">{album.year} • {album.artist}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <SearchIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results for "{query}"</h3>
              <p className="text-sm text-muted-foreground">Try different keywords or check the spelling.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}