import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import CreatePlaylist from "./pages/CreatePlaylist";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Explore from "./pages/Explore";
import NowPlaying from "./pages/NowPlaying";
import Profile from "./pages/Profile";
import Equalizer from "./pages/Equalizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isNowPlaying = location.pathname === '/now-playing';

  // Now Playing is a full-screen overlay — no sidebar or player
  if (isNowPlaying) {
    return <NowPlaying />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background dark">
        <AppSidebar />
        <main className="flex-1 pb-24 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/equalizer" element={<Equalizer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <MusicPlayer />
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
