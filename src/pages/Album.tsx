import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, MoreHorizontal, Share, Download, Clock, Shuffle } from 'lucide-react';
import { getAlbumById } from '@/data/musicData';

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const album = id ? getAlbumById(id) : null;

  if (!album) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Album Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration = album.songs.length * 3.5; // Estimate
  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-black text-white">
      {/* Album Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/50 to-transparent" />
        <div className="relative px-6 pt-16 pb-8">
          <div className="flex items-end gap-6">
            <img
              src={album.cover}
              alt={album.title}
              className="w-64 h-64 rounded-lg shadow-2xl object-cover"
            />
            <div className="flex-1 pb-4">
              <Badge variant="secondary" className="mb-2 bg-purple-600 hover:bg-purple-700">
                Album
              </Badge>
              <h1 className="text-6xl font-bold mb-4">{album.title}</h1>
              <div className="flex items-center gap-2 text-gray-300 text-lg">
                <Link 
                  to={`/artist/${album.artistId}`}
                  className="hover:text-white hover:underline font-semibold"
                >
                  {album.artist}
                </Link>
                <span>•</span>
                <span>{album.year}</span>
                <span>•</span>
                <span>{album.songs.length} songs,</span>
                <span className="text-gray-400">{formatDuration(totalDuration)}</span>
              </div>
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
            <Download className="w-6 h-6" />
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
        {/* Track List */}
        <section>
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-4">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="space-y-1">
            {album.songs.map((song, index) => (
              <div
                key={song.id}
                className="group grid grid-cols-12 gap-4 p-4 rounded-lg hover:bg-gray-800/50 cursor-pointer items-center"
              >
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:hidden text-sm">{index + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hidden group-hover:flex w-8 h-8 rounded-full p-0 bg-purple-500 hover:bg-purple-600"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Button>
                </div>
                
                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={album.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-medium group-hover:text-white">{song.title}</h3>
                    <Link 
                      to={`/artist/${album.artistId}`}
                      className="text-sm text-gray-400 hover:text-white hover:underline"
                    >
                      {album.artist}
                    </Link>
                  </div>
                </div>
                
                <div className="col-span-3">
                  <Link 
                    to={`/album/${album.id}`}
                    className="text-sm text-gray-400 hover:text-white hover:underline"
                  >
                    {album.title}
                  </Link>
                </div>
                
                <div className="col-span-1 text-sm text-gray-400">
                  {Math.floor(Math.random() * 2) + 3}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                </div>
                
                <div className="col-span-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 rounded-full p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 rounded-full p-0"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Album Info */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6">
            <div className="flex items-start gap-6">
              <img
                src={album.cover}
                alt={album.title}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{album.title}</h3>
                <p className="text-purple-400 mb-4">
                  by <Link to={`/artist/${album.artistId}`} className="hover:underline">{album.artist}</Link>
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Released in {album.year}, "{album.title}" showcases {album.artist}'s artistic growth and 
                  musical evolution. This album features {album.songs.length} carefully crafted tracks that 
                  blend various musical elements to create a cohesive and engaging listening experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {album.year}
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {album.songs.length} tracks
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {formatDuration(totalDuration)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More by Artist */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More by {album.artist}</h2>
          <div className="text-center py-8">
            <Link 
              to={`/artist/${album.artistId}`}
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
            >
              View {album.artist}'s profile
              <Play className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
