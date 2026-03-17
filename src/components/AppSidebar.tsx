import { useState } from "react";
import { Home, Search, Library, Plus, Heart, Clock, Music, Compass, User, Sliders, Radio, Sparkles, TrendingUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Search", url: "/search", icon: Search },
  { title: "Explore", url: "/explore", icon: Compass },
];

const libraryItems = [
  { title: "Your Library", url: "/library", icon: Library },
  { title: "Liked Songs", url: "/playlist/liked-songs", icon: Heart },
  { title: "Recently Played", url: "/recently-played", icon: Clock },
  { title: "Create Playlist", url: "/create-playlist", icon: Plus },
];

const experienceItems = [
  { title: "Now Playing", url: "/now-playing", icon: Radio },
  { title: "Equalizer", url: "/equalizer", icon: Sliders },
  { title: "Profile", url: "/profile", icon: User },
];

const playlists = [
  { id: "discover-weekly", name: "Discover Weekly", tracks: 30 },
  { id: "daily-mix-1", name: "Daily Mix 1", tracks: 50 },
  { id: "daily-mix-2", name: "Daily Mix 2", tracks: 50 },
  { id: "chill-vibes", name: "Chill Vibes", tracks: 45 },
  { id: "workout-beats", name: "Workout Beats", tracks: 38 },
  { id: "focus-flow", name: "Focus Flow", tracks: 42 },
  { id: "night-drive", name: "Night Drive", tracks: 35 },
  { id: "synthwave-classics", name: "Synthwave Classics", tracks: 55 },
  { id: "lo-fi-beats", name: "Lo-Fi Beats", tracks: 60 },
];

const moodFilters = [
  { emoji: "🔥", label: "Energy", color: "from-orange-500/20 to-red-500/20" },
  { emoji: "😌", label: "Chill", color: "from-blue-500/20 to-cyan-500/20" },
  { emoji: "💜", label: "Vibes", color: "from-purple-500/20 to-pink-500/20" },
  { emoji: "🎯", label: "Focus", color: "from-green-500/20 to-emerald-500/20" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/10 text-primary font-medium relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-primary before:rounded-full"
      : "text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-200";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-[260px]"} h-screen border-r-0`}>
      <SidebarContent className="relative h-full flex flex-col bg-transparent">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 glass-strong rounded-none border-r border-white/5 pointer-events-none" />
        
        {/* Gradient accent line */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-primary/30 via-transparent to-primary/10 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 px-4 pt-5 pb-3 flex-shrink-0">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img
                src="/PineAppke-noBG.png"
                alt="PineApple Muzic"
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-base font-bold text-foreground tracking-tight">
                  PineApple <span className="text-gradient-primary">Muzic</span>
                </h1>
                <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                  Sonic Universe
                </p>
              </div>
            )}
          </NavLink>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 px-2 space-y-1">
          
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon className="w-[18px] h-[18px]" />
                        {!collapsed && <span className="ml-3 text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-2" />

          {/* Library */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-widest px-3 mb-1">
                Library
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {libraryItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-[18px] h-[18px]" />
                        {!collapsed && <span className="ml-3 text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-2" />

          {/* Experience */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-widest px-3 mb-1">
                Experience
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {experienceItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-[18px] h-[18px]" />
                        {!collapsed && <span className="ml-3 text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Mood Quick Filters */}
          {!collapsed && (
            <>
              <div className="h-px bg-white/5 mx-2" />
              <div className="px-3 py-2">
                <p className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-widest mb-2">Mood</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {moodFilters.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setSelectedMood(selectedMood === mood.label ? null : mood.label)}
                      className={`flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all duration-200 ${
                        selectedMood === mood.label
                         ? `bg-gradient-to-b ${mood.color} ring-1 ring-primary/30 scale-105`
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{mood.emoji}</span>
                      <span className="text-[9px] text-muted-foreground">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Playlists */}
          {!collapsed && (
            <>
              <div className="h-px bg-white/5 mx-2" />
              <SidebarGroup>
                <SidebarGroupLabel className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-widest px-3 mb-1">
                  Playlists
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-0.5">
                    {playlists.map((playlist) => (
                      <SidebarMenuItem key={playlist.id}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={`/playlist/${playlist.id}`}
                            className="group flex items-center gap-3 px-3 py-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-200 rounded-lg"
                          >
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                              <Music className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium truncate">{playlist.name}</p>
                              <p className="text-[10px] text-muted-foreground/60">{playlist.tracks} songs</p>
                            </div>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
          )}
        </div>

        {/* Profile Section at bottom */}
        {!collapsed && (
          <div className="relative z-10 flex-shrink-0 p-3 border-t border-white/5">
            <NavLink
              to="/profile"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-glow">
                K
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate">Krish</p>
                <p className="text-[10px] text-muted-foreground">Free Plan</p>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
            </NavLink>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}