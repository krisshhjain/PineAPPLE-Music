import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background dark">
            <AppSidebar />
            <main className="flex-1 pb-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/create-playlist" element={<CreatePlaylist />} />
                <Route path="/recently-played" element={<RecentlyPlayed />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <MusicPlayer />
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
