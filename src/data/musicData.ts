// Fictionalized music data for PineApple Muzic
// Images must be imported from assets/Artists

import asapRockyImg from "@/assets/Artists/Asap Rocky.jpeg";
import djKhalidImg from "@/assets/Artists/DJ Khalid.jpeg";
import drakeImg from "@/assets/Artists/Drake.jpg";
import gunnaImg from "@/assets/Artists/Gunna.jpg";
import jColeImg from "@/assets/Artists/J. Cole.jpeg";
import justinImg from "@/assets/Artists/Justin Beiber.jpg";
import kanyeImg from "@/assets/Artists/Kanye West.jpg";
import kendrickImg from "@/assets/Artists/Kendrick Lamar.jpeg";
import lilBabyImg from "@/assets/Artists/Lil Baby.jpeg";
import rihannaImg from "@/assets/Artists/Rihanna.png";
import szaImg from "@/assets/Artists/SZA.jpeg";
import taylorImg from "@/assets/Artists/Taylor Swift.jpg";
import xxxImg from "@/assets/Artists/XXX Tentacion.jpeg";
import youngThugImg from "@/assets/Artists/Young Thug.jpg";

// Central Cee doesn't have extension, using placeholder
const centralCeeImg = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop";

export const artists = [
  {
    id: "brake",
    name: "Brake",
    image: drakeImg,
    albums: [
      {
        id: "appreciations",
        title: "Appreciations",
        year: 2010,
        cover: drakeImg,
        songs: [
          { id: "above-it", title: "Above It" },
          { id: "claim-me-now", title: "Claim Me Now" },
          { id: "fireworks-display", title: "Fireworks Display" },
          { id: "miss-you-more", title: "Miss You More" },
        ],
      },
      {
        id: "seize-care",
        title: "Seize Care",
        year: 2011,
        cover: drakeImg,
        songs: [
          { id: "seize-care-of-you", title: "Seize Care of You" },
          { id: "marble-floors", title: "Marble Floors" },
          { id: "titles", title: "Titles" },
          { id: "under-pressure", title: "Under Pressure" },
        ],
      },
      {
        id: "nothing-stays-the-same",
        title: "Nothing Stays the Same",
        year: 2013,
        cover: drakeImg,
        songs: [
          { id: "tuscan-hide", title: "Tuscan Hide" },
          { id: "start-from-the-top", title: "Start from the Top" },
          { id: "hold-tight-moving", title: "Hold Tight, We’re Moving" },
          { id: "worst-actions", title: "Worst Actions" },
        ],
      },
      {
        id: "vistas",
        title: "Vistas",
        year: 2016,
        cover: drakeImg,
        songs: [
          { id: "hold-the-line", title: "Hold the Line" },
          { id: "one-step", title: "One Step" },
          { id: "control-it", title: "Control It" },
          { id: "faithful-heart", title: "Faithful Heart" },
        ],
      },
      {
        id: "arachnid",
        title: "Arachnid",
        year: 2018,
        cover: drakeImg,
        songs: [
          { id: "dogs-advice", title: "Dog’s Advice" },
          { id: "nonstop-hustle", title: "Nonstop Hustle" },
          { id: "elevated-mind", title: "Elevated Mind" },
          { id: "on-my-wave", title: "On My Wave" },
        ],
      },
    ],
  },
  {
    id: "hasty-stone",
    name: "HASTY Stone",
    image: asapRockyImg,
    albums: [
      {
        id: "long-live-hasty",
        title: "Long.Live.HASTY",
        year: 2013,
        cover: asapRockyImg,
        songs: [
          { id: "gold-rush", title: "Gold Rush" },
          { id: "fierce-mode", title: "Fierce Mode" },
          { id: "1train-ride", title: "1Train Ride" },
          { id: "wild-nights", title: "Wild Nights" },
        ],
      },
      {
        id: "at-long-last-hasty",
        title: "At.Long.Last.HASTY",
        year: 2015,
        cover: asapRockyImg,
        songs: [
          { id: "holy-spirit", title: "Holy Spirit" },
          { id: "canal-street", title: "Canal Street" },
          { id: "lsd-dream", title: "L$D Dream" },
          { id: "everyday-hustle", title: "Everyday Hustle" },
        ],
      },
      {
        id: "testing-ground",
        title: "Testing Ground",
        year: 2018,
        cover: asapRockyImg,
        songs: [
          { id: "praise-the-vibe", title: "Praise the Vibe" },
          { id: "distorted-visions", title: "Distorted Visions" },
          { id: "pure-bliss", title: "Pure Bliss" },
          { id: "asap-forever-now", title: "ASAP Forever Now" },
        ],
      },
    ],
  },
  {
    id: "core-dee",
    name: "Core Dee",
    image: centralCeeImg,
    albums: [
      {
        id: "wild-east",
        title: "Wild East",
        year: 2022,
        cover: centralCeeImg,
        songs: [
          { id: "vibe-check", title: "Vibe Check" },
          { id: "day-in-the-grind", title: "Day in the Grind" },
          { id: "6-for-6-wins", title: "6 for 6 Wins" },
          { id: "loading-up", title: "Loading Up" },
        ],
      },
      {
        id: "23-shades",
        title: "23 Shades",
        year: 2023,
        cover: centralCeeImg,
        songs: [
          { id: "straight-facts", title: "Straight Facts" },
          { id: "cold-streets", title: "Cold Streets" },
          { id: "retail-therapy", title: "Retail Therapy" },
          { id: "end-of-the-road", title: "End of the Road" },
        ],
      },
    ],
  },
  {
    id: "mc-jaleel",
    name: "MC Jaleel",
    image: djKhalidImg,
    albums: [
      {
        id: "victory-road",
        title: "Victory Road",
        year: 2016,
        cover: djKhalidImg,
        songs: [
          { id: "i-got-the-codes", title: "I Got the Codes" },
          { id: "holy-ground", title: "Holy Ground" },
          { id: "work-hard", title: "Work Hard" },
          { id: "do-you-believe", title: "Do You Believe" },
        ],
      },
      {
        id: "thankful-heart",
        title: "Thankful Heart",
        year: 2017,
        cover: djKhalidImg,
        songs: [
          { id: "im-the-chosen", title: "I'm the Chosen" },
          { id: "to-the-limit", title: "To the Limit" },
          { id: "shining-bright", title: "Shining Bright" },
          { id: "wild-dreams", title: "Wild Dreams" },
        ],
      },
    ],
  },
  {
    id: "cannon",
    name: "Cannon",
    image: gunnaImg,
    albums: [
      {
        id: "wave-season-3",
        title: "Wave Season 3",
        year: 2018,
        cover: gunnaImg,
        songs: [
          { id: "drip-or-dive", title: "Drip or Dive" },
          { id: "top-tier", title: "Top Tier" },
          { id: "money-talks", title: "Money Talks" },
          { id: "no-limits", title: "No Limits" },
        ],
      },
      {
        id: "one-in-a-billion",
        title: "One in a Billion",
        year: 2023,
        cover: gunnaImg,
        songs: [
          { id: "fukumean-vibe", title: "Fukumean Vibe" },
          { id: "rodeo-drive", title: "Rodeo Drive" },
          { id: "payback-season", title: "Payback Season" },
          { id: "bottom-line", title: "Bottom Line" },
        ],
      },
    ],
  },
  {
    id: "k-soul",
    name: "K. Soul",
    image: jColeImg,
    albums: [
      {
        id: "2014-dream-drive",
        title: "2014 Dream Drive",
        year: 2014,
        cover: jColeImg,
        songs: [
          { id: "no-modelz", title: "No Modelz" },
          { id: "wet-dreams", title: "Wet Dreams" },
          { id: "03-youth", title: "03' Youth" },
          { id: "a-tale-of-two-cities", title: "A Tale of Two Cities" },
        ],
      },
      {
        id: "your-eyes-only",
        title: "Your Eyes Only",
        year: 2016,
        cover: jColeImg,
        songs: [
          { id: "immortal-soul", title: "Immortal Soul" },
          { id: "deja-vu-dream", title: "Deja Vu Dream" },
          { id: "neighbors-watch", title: "Neighbors Watch" },
          { id: "foldin-threads", title: "Foldin' Threads" },
        ],
      },
    ],
  },
  {
    id: "dustin-weaver",
    name: "Dustin Weaver",
    image: justinImg,
    albums: [
      {
        id: "purposeful",
        title: "Purposeful",
        year: 2015,
        cover: justinImg,
        songs: [
          { id: "sorry-not-sorry", title: "Sorry Not Sorry" },
          { id: "what-do-you-want", title: "What Do You Want" },
          { id: "love-your-soul", title: "Love Your Soul" },
          { id: "mark-my-heart", title: "Mark My Heart" },
        ],
      },
      {
        id: "fairness",
        title: "Fairness",
        year: 2021,
        cover: justinImg,
        songs: [
          { id: "hold-steady", title: "Hold Steady" },
          { id: "somebody-new", title: "Somebody New" },
          { id: "off-my-mind", title: "Off My Mind" },
          { id: "ghost-of-you", title: "Ghost of You" },
        ],
      },
    ],
  },
  {
    id: "zane-east",
    name: "Zane East",
    image: kanyeImg,
    albums: [
      {
        id: "late-enrollment",
        title: "Late Enrollment",
        year: 2005,
        cover: kanyeImg,
        songs: [
          { id: "heard-em-whisper", title: "Heard 'Em Whisper" },
          { id: "touch-the-stars", title: "Touch the Stars" },
          { id: "gold-seeker", title: "Gold Seeker" },
          { id: "drive-steady", title: "Drive Steady" },
        ],
      },
      {
        id: "the-life-of-pablo",
        title: "The Life of Pablo",
        year: 2016,
        cover: kanyeImg,
        songs: [
          { id: "ultra-light-ray", title: "Ultra Light Ray" },
          { id: "father-stretch-my-soul", title: "Father Stretch My Soul" },
          { id: "famous-faces", title: "Famous Faces" },
          { id: "waves-crash", title: "Waves Crash" },
        ],
      },
    ],
  },
  {
    id: "derrick-damar",
    name: "Derrick Damar",
    image: kendrickImg,
    albums: [
      {
        id: "good-lad-mad-town",
        title: "Good Lad, Mad Town",
        year: 2012,
        cover: kendrickImg,
        songs: [
          { id: "swim-good", title: "Swim Good" },
          { id: "bitch-dont-ruin-my-vibe", title: "Bitch, Don't Ruin My Vibe" },
          { id: "money-trees-grow", title: "Money Trees Grow" },
          { id: "poetic-justice", title: "Poetic Justice" },
        ],
      },
      {
        id: "to-pimp-a-moth",
        title: "To Pimp a Moth",
        year: 2015,
        cover: kendrickImg,
        songs: [
          { id: "king-kuntah", title: "King Kuntah" },
          { id: "alright-now", title: "Alright Now" },
          { id: "these-walls-speak", title: "These Walls Speak" },
          { id: "mortal-man", title: "Mortal Man" },
        ],
      },
    ],
  },
  {
    id: "lil-kiddo",
    name: "Lil Kiddo",
    image: lilBabyImg,
    albums: [
      {
        id: "tougher-than-steel",
        title: "Tougher Than Steel",
        year: 2018,
        cover: lilBabyImg,
        songs: [
          { id: "yes-forever", title: "Yes Forever" },
          { id: "southside-hustle", title: "Southside Hustle" },
          { id: "life-moves-on", title: "Life Moves On" },
          { id: "never-back-down", title: "Never Back Down" },
        ],
      },
      {
        id: "my-turnaround",
        title: "My Turnaround",
        year: 2020,
        cover: lilBabyImg,
        songs: [
          { id: "woah-now", title: "Woah Now" },
          { id: "sum-to-prove", title: "Sum to Prove" },
          { id: "emotionally-scarred", title: "Emotionally Scarred" },
          { id: "graceful", title: "Graceful" },
        ],
      },
    ],
  },
  {
    id: "rhonda",
    name: "Rhonda",
    image: rihannaImg,
    albums: [
      {
        id: "silent-hill",
        title: "Silent Hill",
        year: 2010,
        cover: rihannaImg,
        songs: [
          { id: "only-girl-in-the-world", title: "Only Girl in the World" },
          { id: "whats-my-name-now", title: "What's My Name Now" },
          { id: "s-and-m-vibes", title: "S&M Vibes" },
          { id: "man-up", title: "Man Up" },
        ],
      },
      {
        id: "anti-tide",
        title: "Anti-Tide",
        year: 2016,
        cover: rihannaImg,
        songs: [
          { id: "needed-you", title: "Needed You" },
          { id: "work-hard", title: "Work Hard" },
          { id: "desperate-times", title: "Desperate Times" },
          { id: "love-on-the-mind", title: "Love on the Mind" },
        ],
      },
    ],
  },
  {
    id: "zya",
    name: "ZYA",
    image: szaImg,
    albums: [
      {
        id: "ctrl-alt",
        title: "Ctrl Alt",
        year: 2017,
        cover: szaImg,
        songs: [
          { id: "love-galore", title: "Love Galore" },
          { id: "the-weekend-vibe", title: "The Weekend Vibe" },
          { id: "broken-clocks", title: "Broken Clocks" },
          { id: "garden-dreams", title: "Garden Dreams" },
        ],
      },
      {
        id: "sos-signal",
        title: "SOS Signal",
        year: 2022,
        cover: szaImg,
        songs: [
          { id: "snooze-mode", title: "Snooze Mode" },
          { id: "kill-vibe", title: "Kill Vibe" },
          { id: "low-key", title: "Low Key" },
          { id: "nobody-gets-it", title: "Nobody Gets It" },
        ],
      },
    ],
  },
  {
    id: "kayler-swift",
    name: "Kayler Swift",
    image: taylorImg,
    albums: [
      {
        id: "fearless-heart",
        title: "Fearless Heart",
        year: 2008,
        cover: taylorImg,
        songs: [
          { id: "love-tale", title: "Love Tale" },
          { id: "you-belong-to-me", title: "You Belong to Me" },
          { id: "white-stallion", title: "White Stallion" },
          { id: "forever-always", title: "Forever Always" },
        ],
      },
      {
        id: "midnights-glow",
        title: "Midnights Glow",
        year: 2022,
        cover: taylorImg,
        songs: [
          { id: "anti-villain", title: "Anti-Villain" },
          { id: "lavender-mist", title: "Lavender Mist" },
          { id: "midnight-raindrops", title: "Midnight Raindrops" },
          { id: "karmas-call", title: "Karma's Call" },
        ],
      },
    ],
  },
  {
    id: "yyy-ascension",
    name: "YYY Ascension",
    image: xxxImg,
    albums: [
      {
        id: "17-souls",
        title: "17 Souls",
        year: 2017,
        cover: xxxImg,
        songs: [
          { id: "jocelyns-bloom", title: "Jocelyn's Bloom" },
          { id: "depression-and-shadows", title: "Depression & Shadows" },
          { id: "everybody-falls", title: "Everybody Falls" },
          { id: "revenge-road", title: "Revenge Road" },
        ],
      },
      {
        id: "question-mark",
        title: "? Mark",
        year: 2018,
        cover: xxxImg,
        songs: [
          { id: "sad-days", title: "Sad Days" },
          { id: "moonlight-glow", title: "Moonlight Glow" },
          { id: "numb-heart", title: "Numb Heart" },
          { id: "hope-rising", title: "Hope Rising" },
        ],
      },
    ],
  },
  {
    id: "young-slug",
    name: "Young Slug",
    image: youngThugImg,
    albums: [
      {
        id: "punk-soul",
        title: "Punk Soul",
        year: 2021,
        cover: youngThugImg,
        songs: [
          { id: "bubbly-vibes", title: "Bubbly Vibes" },
          { id: "stressed-out", title: "Stressed Out" },
          { id: "die-slow", title: "Die Slow" },
          { id: "droppin-gems", title: "Droppin' Gems" },
        ],
      },
      {
        id: "so-much-fun-times",
        title: "So Much Fun Times",
        year: 2019,
        cover: youngThugImg,
        songs: [
          { id: "hot-wheels", title: "Hot Wheels" },
          { id: "surf-waves", title: "Surf Waves" },
          { id: "bad-bad-bad", title: "Bad Bad Bad" },
          { id: "just-how-it-goes", title: "Just How It Goes" },
        ],
      },
    ],
  },
];

// Helper functions to get data
export const getAllSongs = () => {
  const allSongs = [];
  artists.forEach(artist => {
    artist.albums.forEach(album => {
      album.songs.forEach(song => {
        allSongs.push({
          ...song,
          artist: artist.name,
          artistId: artist.id,
          album: album.title,
          albumId: album.id,
          year: album.year,
          image: album.cover,
          duration: `${Math.floor(Math.random() * 2) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
        });
      });
    });
  });
  return allSongs;
};

export const getAllAlbums = () => {
  const allAlbums = [];
  artists.forEach(artist => {
    artist.albums.forEach(album => {
      allAlbums.push({
        ...album,
        artist: artist.name,
        artistId: artist.id,
        artistImage: artist.image
      });
    });
  });
  return allAlbums;
};

export const getArtistById = (id: string) => {
  return artists.find(artist => artist.id === id);
};

export const getAlbumById = (albumId: string) => {
  for (const artist of artists) {
    const album = artist.albums.find(album => album.id === albumId);
    if (album) {
      return {
        ...album,
        artist: artist.name,
        artistId: artist.id,
        artistImage: artist.image
      };
    }
  }
  return null;
};

export const getSongById = (songId: string) => {
  for (const artist of artists) {
    for (const album of artist.albums) {
      const song = album.songs.find(song => song.id === songId);
      if (song) {
        return {
          ...song,
          artist: artist.name,
          artistId: artist.id,
          album: album.title,
          albumId: album.id,
          year: album.year,
          image: album.cover,
          duration: `${Math.floor(Math.random() * 2) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
        };
      }
    }
  }
  return null;
};

// Search functionality
export const searchMusic = (query: string) => {
  const normalizedQuery = query.toLowerCase();
  const results = {
    artists: [],
    albums: [],
    songs: []
  };

  // Search artists
  results.artists = artists.filter(artist => 
    artist.name.toLowerCase().includes(normalizedQuery)
  );

  // Search albums
  results.albums = getAllAlbums().filter(album => 
    album.title.toLowerCase().includes(normalizedQuery)
  );

  // Search songs
  results.songs = getAllSongs().filter(song => 
    song.title.toLowerCase().includes(normalizedQuery)
  );

  return results;
};
