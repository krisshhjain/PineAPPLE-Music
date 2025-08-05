import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Play, Clock, MoreHorizontal, Heart } from 'lucide-react';
import { searchMusic, getAllSongs, getAllAlbums, artists } from '@/data/musicData';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    artists: [],
    albums: [],
    songs: []
  });
  const [recentSearches] = useState(['Brake', 'God\'s Plan', 'Wild East', 'Derrick Damar']);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchMusic(query);
      setResults(searchResults);
    } else {
      setResults({ artists: [], albums: [], songs: [] });
    }
  }, [query]);

  const hasResults = results.artists.length > 0 || results.albums.length > 0 || results.songs.length > 0;

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg"
        />
      </div>

      {!query.trim() ? (
        <div className="space-y-8">
          {/* Recent Searches */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Recent searches</h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  onClick={() => setQuery(search)}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer group"
                >
                  <SearchIcon className="w-5 h-5 text-gray-400 mr-4" />
                  <span className="text-white group-hover:text-purple-400">{search}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Browse All */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {['Hip Hop', 'Pop', 'Rock', 'R&B', 'Alternative', 'Electronic', 'Country', 'Jazz', 'Classical', 'Indie'].map((genre, index) => (
                <Card 
                  key={genre} 
                  className={`bg-gradient-to-br ${[
                    'from-purple-500 to-pink-500',
                    'from-blue-500 to-cyan-500', 
                    'from-green-500 to-emerald-500',
                    'from-orange-500 to-red-500',
                    'from-indigo-500 to-purple-500'
                  ][index % 5]} border-0 cursor-pointer hover:scale-105 transition-transform`}
                >
                  <CardContent className="p-6 h-24 flex items-end">
                    <h3 className="text-white font-bold text-lg">{genre}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          {hasResults ? (
            <>
              {/* Top Result */}
              {(results.artists.length > 0 || results.albums.length > 0) && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Top result</h2>
                  {results.artists.length > 0 ? (
                    <Link to={`/artist/${results.artists[0].id}`}>
                      <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer max-w-md">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={results.artists[0].image}
                              alt={results.artists[0].name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2">{results.artists[0].name}</h3>
                              <Badge variant="secondary" className="bg-purple-600">Artist</Badge>
                            </div>
                          </div>
                          <Button className="bg-purple-500 hover:bg-purple-600 rounded-full">
                            <Play className="w-5 h-5 mr-2 fill-current" />
                            Play
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : results.albums.length > 0 && (
                    <Link to={`/album/${results.albums[0].id}`}>
                      <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer max-w-md">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={results.albums[0].cover}
                              alt={results.albums[0].title}
                              className="w-20 h-20 rounded object-cover"
                            />
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-1">{results.albums[0].title}</h3>
                              <p className="text-gray-400 mb-2">by {results.albums[0].artist}</p>
                              <Badge variant="secondary" className="bg-purple-600">Album</Badge>
                            </div>
                          </div>
                          <Button className="bg-purple-500 hover:bg-purple-600 rounded-full">
                            <Play className="w-5 h-5 mr-2 fill-current" />
                            Play
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </section>
              )}

              {/* Songs */}
              {results.songs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
                  <div className="space-y-1">
                    {results.songs.slice(0, 6).map((song, index) => (
                      <div
                        key={song.id}
                        className="group flex items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
                      >
                        <div className="w-12 h-12 flex items-center justify-center mr-4">
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white group-hover:text-purple-400">{song.title}</h3>
                          <Link 
                            to={`/artist/${song.artistId}`}
                            className="text-sm text-gray-400 hover:text-white hover:underline"
                          >
                            {song.artist}
                          </Link>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full p-0"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-400 w-12 text-right">
                            {song.duration}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full p-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Artists */}
              {results.artists.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Artists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {results.artists.map((artist) => (
                      <Link key={artist.id} to={`/artist/${artist.id}`}>
                        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                          <CardContent className="p-4 text-center">
                            <img
                              src={artist.image}
                              alt={artist.name}
                              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="font-semibold text-white group-hover:text-purple-400 mb-2">
                              {artist.name}
                            </h3>
                            <Badge variant="secondary" className="bg-purple-600 text-xs">
                              Artist
                            </Badge>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Albums */}
              {results.albums.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {results.albums.map((album) => (
                      <Link key={album.id} to={`/album/${album.id}`}>
                        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="relative mb-4">
                              <img
                                src={album.cover}
                                alt={album.title}
                                className="w-full aspect-square object-cover rounded"
                              />
                              <Button
                                size="sm"
                                className="absolute bottom-2 right-2 rounded-full w-10 h-10 bg-purple-500 hover:bg-purple-600 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Play className="w-4 h-4 fill-current" />
                              </Button>
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-purple-400 mb-1 truncate">
                              {album.title}
                            </h3>
                            <p className="text-sm text-gray-400 truncate">{album.year} • {album.artist}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found for "{query}"</h3>
              <p className="text-gray-400">Please make sure your words are spelled correctly or use less or different keywords.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};