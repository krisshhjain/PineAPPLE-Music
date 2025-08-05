import { useState } from "react";
import { ArrowLeft, Music, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    // In a real app, this would create the playlist
    navigate("/library");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="hover:bg-muted/20"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">Create Playlist</h1>
      </div>

      {/* Create Playlist Form */}
      <div className="max-w-2xl space-y-6">
        <div className="flex gap-6">
          {/* Playlist Cover */}
          <div className="w-48 h-48 bg-muted/20 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer">
            <ImageIcon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
            <p className="text-sm text-muted-foreground mt-2">Add cover image</p>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground/80 block mb-2">
                Name
              </label>
              <Input
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="My Playlist #1"
                className="bg-muted/20 border-border/30 focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 block mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add an optional description"
                className="bg-muted/20 border-border/30 focus:border-primary resize-none"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={handleCreate}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!playlistName.trim()}
          >
            Create Playlist
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-border/30 hover:bg-muted/20"
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-2xl">
        <div className="bg-muted/10 border border-border/20 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-foreground/90">Tips for creating playlists:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Give your playlist a descriptive name</li>
            <li>• Add a cover image to make it stand out</li>
            <li>• Write a description to help others discover it</li>
            <li>• You can always edit these details later</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;