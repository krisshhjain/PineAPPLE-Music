import { useState } from "react";
import { Home, Search, Library, Plus, Heart, Clock, Music, Mic2, Volume2, Download } from "lucide-react";
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
  { title: "Your Library", url: "/library", icon: Library },
];

const libraryItems = [
  { title: "Create Playlist", url: "/create-playlist", icon: Plus },
  { title: "Liked Songs", url: "/playlist/liked-songs", icon: Heart },
  { title: "Recently Played", url: "/recently-played", icon: Clock },
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
  { id: "future-bass-mix", name: "Future Bass Mix", tracks: 40 },
  { id: "ambient-dreams", name: "Ambient Dreams", tracks: 28 },
  { id: "cyber-punk", name: "Cyber Punk", tracks: 33 },
  { id: "retrowave-nights", name: "Retrowave Nights", tracks: 47 },
  { id: "deep-house-vibes", name: "Deep House Vibes", tracks: 52 },
  { id: "lo-fi-beats", name: "Lo-Fi Beats", tracks: 60 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted/20 text-primary font-medium border-l-2 border-primary glow-border" : "hover:bg-muted/10 hover:text-primary";

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} bg-sidebar backdrop-blur-xl border-r border-sidebar-border/50 shadow-xl h-screen`}>
      <SidebarContent className="p-4 relative h-full flex flex-col">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-sidebar/80 via-sidebar to-sidebar/90 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-80"></div>
        
        {/* Logo */}
        <div className="mb-6 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/PineAppke-noBG.png" 
                alt="PineApple Muzic" 
                className="w-17 h-17 object-contain"
              />
            </div>
            {!collapsed && (
              <div className="relative">
                <h1 className="text-xl font-bold text-foreground">
                  PineApple Muzic
                </h1>
                <div className="text-xs text-sidebar-foreground/60 font-medium mt-0.5">
                  Sonic Universe
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 space-y-6">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon className="w-5 h-5" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Library Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {libraryItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-5 h-5" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Playlists */}
          {!collapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-muted-foreground text-sm font-medium mb-3">
                Made for You
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {playlists.map((playlist) => (
                    <SidebarMenuItem key={playlist.id}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={`/playlist/${playlist.id}`} 
                          className="group hover:bg-muted/10 hover:text-primary transition-all duration-200"
                        >
                          <div className="w-10 h-10 bg-gradient-subtle rounded-md flex items-center justify-center mr-3">
                            <Music className="w-4 h-4 text-foreground/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{playlist.name}</p>
                            <p className="text-xs text-muted-foreground">{playlist.tracks} songs</p>
                          </div>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </div>

        {/* Install App - Fixed at bottom */}
        {!collapsed && (
          <div className="flex-shrink-0 pt-4 border-t border-border/30 relative z-10">
            <Button variant="secondary" className="w-full justify-start bg-muted/20 backdrop-blur-sm border border-border/30 hover:bg-muted/30">
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}