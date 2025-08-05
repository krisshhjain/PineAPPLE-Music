# PineApple Muzic 🍍🎵

A modern, responsive music streaming application built with React, TypeScript, and Tailwind CSS. PineApple Muzic offers a Spotify-like experience with artist profiles, album browsing, search functionality, and an integrated music player.

## 🚀 Features

- **Artist Profiles**: Browse detailed artist pages with albums, songs, and related artists
- **Search Functionality**: Search for artists, albums, and songs with real-time results
- **Music Player**: Integrated bottom player with playback controls
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean, dark-themed interface with purple/pink accent colors
- **Album Browsing**: Explore artist discographies and album details
- **Music Discovery**: Browse by genres and discover new music

## 🛠️ Technologies Used

This project is built with modern web technologies:

- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

## 🏃‍♂️ Getting Started

Follow these steps to get PineApple Muzic running on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/krisshhjain/PineAPPLE-Music.git
cd PineAPPLE-Music
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the development server
```bash
npm run dev
# or
yarn dev
```

### 4. Open your browser
Navigate to `http://localhost:5173` to view the application.

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AppSidebar.tsx  # Navigation sidebar
│   └── MusicPlayer.tsx # Bottom music player
├── pages/              # Page components
│   ├── Home.tsx        # Homepage with featured content
│   ├── Search.tsx      # Search functionality
│   ├── Artist.tsx      # Artist profile page
│   ├── Album.tsx       # Album details page
│   └── Library.tsx     # User library
├── data/               # Data and mock content
│   └── musicData.ts    # Fictionalized artist and music data
├── assets/             # Static assets
│   └── Artists/        # Artist images
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main app component
```

## 🎨 Customization

### Theme Colors
The app uses a purple/pink color scheme. You can customize colors in:
- `tailwind.config.ts` - Main color configuration
- CSS custom properties in component files

### Adding New Artists/Music
Update the `src/data/musicData.ts` file to add new:
- Artists with their profiles and images
- Albums with track listings
- Songs with metadata

## 🌟 Key Features Explained

### Artist Pages
- Click on any artist to view their dedicated profile page
- Browse their complete discography
- See related artists and recommendations

### Search System
- Real-time search across artists, albums, and songs
- Tabbed interface for different content types
- Recent searches for quick access

### Music Player
- Bottom-mounted player (Spotify-style)
- Play/pause controls and progress tracking
- Currently playing song information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created by [krisshhjain](https://github.com/krisshhjain)

---

**Note**: This is a demo application with fictionalized artist data for showcase purposes. No real music files are streamed in this application.
