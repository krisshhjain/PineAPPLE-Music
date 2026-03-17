import { useState } from "react";
import { Sliders, Volume2, Save, RotateCcw, Music, Sparkles, Waves, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const presets = [
  { name: "Flat", icon: "📊", values: [0, 0, 0, 0, 0, 0, 0, 0], active: false },
  { name: "Bass Boost", icon: "🔊", values: [6, 5, 4, 1, 0, 0, 0, 0], active: true },
  { name: "Vocal", icon: "🎤", values: [-2, 0, 2, 4, 4, 2, 0, -1], active: false },
  { name: "Rock", icon: "🎸", values: [4, 3, 0, -1, 1, 3, 4, 3], active: false },
  { name: "Classical", icon: "🎻", values: [0, 0, 0, 0, 0, -1, -2, -3], active: false },
  { name: "Electronic", icon: "⚡", values: [4, 3, 1, 0, 1, 3, 4, 5], active: false },
  { name: "R&B", icon: "💜", values: [3, 5, 3, 0, -1, 2, 3, 2], active: false },
  { name: "Custom", icon: "🎛️", values: [0, 0, 0, 0, 0, 0, 0, 0], active: false },
];

const frequencies = ["32Hz", "64Hz", "125Hz", "250Hz", "500Hz", "1kHz", "2kHz", "4kHz"];

const spatialPositions = [
  { label: "Front L", x: 25, y: 20 },
  { label: "Front R", x: 75, y: 20 },
  { label: "Center", x: 50, y: 35 },
  { label: "Rear L", x: 25, y: 80 },
  { label: "Rear R", x: 75, y: 80 },
  { label: "Sub", x: 50, y: 65 },
];

const soundEffects = [
  { name: "Reverb", emoji: "🏛️", active: false },
  { name: "Echo", emoji: "🔄", active: false },
  { name: "Bass+", emoji: "💥", active: true },
  { name: "Clarity", emoji: "✨", active: false },
  { name: "Wide", emoji: "🌊", active: false },
  { name: "Warm", emoji: "🔥", active: false },
];

const Equalizer = () => {
  const [activePreset, setActivePreset] = useState("Bass Boost");
  const [bands, setBands] = useState([6, 5, 4, 1, 0, 0, 0, 0]);
  const [spatialEnabled, setSpatialEnabled] = useState(false);
  const [activeEffects, setActiveEffects] = useState<Set<string>>(new Set(["Bass+"]));
  const [isVisualizerActive, setIsVisualizerActive] = useState(true);

  const handleBandChange = (index: number, value: number) => {
    const newBands = [...bands];
    newBands[index] = value;
    setBands(newBands);
    setActivePreset("Custom");
  };

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setActivePreset(preset.name);
    setBands([...preset.values]);
  };

  const toggleEffect = (name: string) => {
    const next = new Set(activeEffects);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setActiveEffects(next);
  };

  const resetEQ = () => {
    setBands([0, 0, 0, 0, 0, 0, 0, 0]);
    setActivePreset("Flat");
    setActiveEffects(new Set());
  };

  // Visualizer bars based on EQ values
  const visBarCount = 32;
  const visBars = Array.from({ length: visBarCount }, (_, i) => {
    const bandIndex = Math.floor((i / visBarCount) * bands.length);
    const base = Math.max(20, 30 + bands[bandIndex] * 8);
    return { height: base + Math.random() * 30, delay: `${i * 0.04}s`, duration: `${0.5 + Math.random() * 0.6}s` };
  });

  return (
    <div className="relative min-h-screen pb-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sliders className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Equalizer</h1>
            </div>
            <p className="text-muted-foreground">Shape your sound. Your music, your way.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetEQ} className="gap-1 glass border-white/10">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
            <Button size="sm" className="gap-1 bg-primary hover:bg-primary/90">
              <Save className="w-3.5 h-3.5" />
              Save
            </Button>
          </div>
        </div>

        {/* Live Visualizer */}
        <Card className="p-6 glass neon-border overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Waves className="w-4 h-4 text-primary" />
              Live Preview
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisualizerActive(!isVisualizerActive)}
              className={`text-xs ${isVisualizerActive ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {isVisualizerActive ? "Active" : "Paused"}
            </Button>
          </div>
          <div className="flex items-end gap-[3px] h-24">
            {visBars.map((bar, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all ${
                  isVisualizerActive
                    ? 'bg-gradient-to-t from-primary/80 to-primary/30 visualizer-bar'
                    : 'bg-primary/20'
                }`}
                style={{
                  height: isVisualizerActive ? undefined : `${bar.height}%`,
                  animationDuration: bar.duration,
                  animationDelay: bar.delay,
                }}
              />
            ))}
          </div>
        </Card>

        {/* Presets */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Presets</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activePreset === preset.name
                    ? 'bg-primary text-white shadow-glow'
                    : 'glass text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <span>{preset.icon}</span>
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* EQ Bands */}
        <Card className="p-6 glass neon-border">
          <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
            <Music className="w-4 h-4 text-primary" />
            Frequency Bands
          </h3>
          <div className="flex items-center gap-4">
            {bands.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                {/* Value label */}
                <span className="text-xs font-mono text-primary">
                  {value > 0 ? `+${value}` : value}dB
                </span>

                {/* Vertical slider */}
                <div className="relative h-40 w-8 flex items-center justify-center">
                  <div className="absolute inset-x-0 mx-auto w-1 h-full bg-white/5 rounded-full">
                    {/* Center line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/20" />
                  </div>

                  {/* Fill */}
                  <div
                    className="absolute inset-x-0 mx-auto w-1 bg-gradient-primary rounded-full transition-all duration-200"
                    style={{
                      height: `${Math.abs(value) * 5 + 2}%`,
                      bottom: value >= 0 ? '50%' : undefined,
                      top: value < 0 ? '50%' : undefined,
                    }}
                  />

                  {/* Thumb */}
                  <input
                    type="range"
                    min={-8}
                    max={8}
                    value={value}
                    onChange={(e) => handleBandChange(i, parseInt(e.target.value))}
                    className="absolute w-40 h-8 opacity-0 cursor-pointer"
                    style={{ transform: 'rotate(-90deg)' }}
                  />

                  {/* Visual thumb */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary shadow-glow border-2 border-white/20 transition-all duration-200 pointer-events-none"
                    style={{ bottom: `${50 + value * 5}%` }}
                  />
                </div>

                {/* Frequency label */}
                <span className="text-[10px] text-muted-foreground">{frequencies[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sound Effects */}
          <Card className="p-6 glass neon-border">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Sound Effects
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {soundEffects.map((effect) => (
                <button
                  key={effect.name}
                  onClick={() => toggleEffect(effect.name)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${
                    activeEffects.has(effect.name)
                      ? 'bg-primary/20 neon-border scale-105'
                      : 'glass hover:bg-white/5'
                  }`}
                >
                  <span className="text-2xl">{effect.emoji}</span>
                  <span className="text-xs font-medium">{effect.name}</span>
                  {activeEffects.has(effect.name) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Spatial Audio */}
          <Card className="p-6 glass neon-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Radio className="w-4 h-4 text-primary" />
                Spatial Audio
              </h3>
              <button
                onClick={() => setSpatialEnabled(!spatialEnabled)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  spatialEnabled ? 'bg-primary' : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    spatialEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Spatial visualization */}
            <div className={`relative h-40 rounded-xl border border-white/5 overflow-hidden ${!spatialEnabled && 'opacity-30'}`}>
              <div className="absolute inset-0 bg-white/[0.02]" />
              {/* Grid lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
              </div>
              {/* Listener position */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/30 border border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              {/* Speaker positions */}
              {spatialPositions.map((pos) => (
                <div
                  key={pos.label}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-3 h-3 rounded-full ${spatialEnabled ? 'bg-primary/60 animate-pulse' : 'bg-white/20'}`} />
                  <span className="text-[8px] text-muted-foreground mt-1">{pos.label}</span>
                </div>
              ))}
              {/* Sound rings */}
              {spatialEnabled && (
                <>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/20 animate-pulse-ring" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Equalizer;
