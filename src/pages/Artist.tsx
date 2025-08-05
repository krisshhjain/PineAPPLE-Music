import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, MoreHorizontal, Share, Shuffle } from 'lucide-react';
import { getArtistById } from '@/data/musicData';

export default function Artist() {
  const { id } = useParams<{ id: string }>();
  const artist = id ? getArtistById(id) : null;

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Artist Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const totalSongs = artist.albums.reduce((total, album) => total + album.songs.length, 0);
  const latestAlbum = artist.albums.sort((a, b) => b.year - a.year)[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-black text-white">
      {/* Artist Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/50 to-transparent" />
        <div className="relative px-6 pt-16 pb-8">
          <div className="flex items-end gap-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-48 h-48 rounded-full shadow-2xl object-cover"
            />
            <div className="flex-1 pb-4">
              <Badge variant="secondary" className="mb-2 bg-purple-600 hover:bg-purple-700">
                Verified Artist
              </Badge>
              <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
              <p className="text-gray-300 text-lg">
                {artist.albums.length} albums • {totalSongs} songs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 bg-gradient-to-b from-black/50 to-black">
        <div className="flex items-center gap-4">
          <Button size="lg" className="rounded-full w-14 h-14 bg-purple-500 hover:bg-purple-600">
            <Play className="w-6 h-6 fill-current" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full w-14 h-14 border-gray-600 hover:border-white">
            <Shuffle className="w-6 h-6" />
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full w-14 h-14 hover:bg-gray-800">
            <Heart className="w-6 h-6" />
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full w-14 h-14 hover:bg-gray-800">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full w-14 h-14 hover:bg-gray-800">
            <Share className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-8">
        {/* Popular Songs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular</h2>
          <div className="space-y-2">
            {latestAlbum.songs.slice(0, 5).map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center mr-4">
                  <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hidden group-hover:flex w-8 h-8 rounded-full p-0 bg-purple-500 hover:bg-purple-600"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Button>
                </div>
                <img
                  src={latestAlbum.cover}
                  alt={song.title}
                  className="w-12 h-12 rounded mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-white">{song.title}</h3>
                  <p className="text-sm text-gray-400">{artist.name}</p>
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
                    {Math.floor(Math.random() * 2) + 3}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
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

        {/* Discography */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Discography</h2>
            <Link to={`/artist/${artist.id}/discography`} className="text-gray-400 hover:text-white text-sm">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {artist.albums.map((album) => (
              <Link key={album.id} to={`/album/${album.id}`}>
                <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-all group cursor-pointer">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 rounded-full w-12 h-12 bg-purple-500 hover:bg-purple-600 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                      >
                        <Play className="w-5 h-5 fill-current" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-sm text-gray-400">{album.year} • Album</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Artist Bio */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About</h2>
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6">
            <div className="flex items-start gap-6">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-4">{artist.name}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {artist.name} is one of the most influential artists in contemporary music, known for their unique style 
                  and innovative approach to their craft. With {artist.albums.length} studio albums and numerous hit singles, 
                  they have established themselves as a force in the music industry.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Their discography spans multiple years and showcases their evolution as an artist, 
                  from their early works to their most recent releases. Each album tells a story and represents 
                  a different chapter in their musical journey.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {artist.albums.length} Albums
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {totalSongs} Songs
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    Verified Artist
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
