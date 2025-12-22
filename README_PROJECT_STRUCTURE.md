# Raajje Theft Auto 1: The Baokalo Chronicles - Project Structure

## Overview

This repository contains multiple versions and editions of the **Raajje Theft Auto 1** game, each representing different stages of development and technological approaches.

## Game Editions

### 1. **Original Edition** (Legacy)
- **Entry Point**: `index.html`
- **Main Files**: `game.js`, `graphics.js`, `graphics-advanced.js`
- **Story Files**: `act2.js` through `act10.js`
- **Description**: The original 2D canvas-based implementation with isometric graphics
- **Status**: Legacy (superseded by newer editions)

### 2. **WebGL Edition** (Previous Upgrade)
- **Entry Point**: `rta_webgl.html` or `ultimate-webgl-edition.html`
- **Main Files**: 
  - `ultimate-webgl-main.js` - Core game engine
  - `webgl-renderer.js` - Three.js scene setup
  - `isometric-renderer.js` - Isometric map rendering
  - `shader-system.js` - Custom shader definitions
  - `ui-hud.js` - HUD and UI components
- **Description**: Three.js-based WebGL rendering with isometric projection and advanced shaders
- **Status**: Complete (functional)
- **Documentation**: `WEBGL_EDITION_README.md`

### 3. **Maldivian Edition** (Current - Recommended)
- **Entry Point**: `maldives-edition.html`
- **Main Files**:
  - `maldives-game-main.js` - Core game engine
  - `voxel-renderer.js` - Voxel-based rendering system
  - `map-data-loader.js` - Map data and OSM integration
  - `ui-hud.js` - HUD and UI components
- **Description**: High-resolution voxel art with authentic Maldivian geography, architecture, vehicles, and culture
- **Status**: Active Development (Latest)
- **Documentation**: `MALDIVIAN_EDITION_README.md`

## File Organization

### Core Game Files

| File | Edition | Purpose |
|------|---------|---------|
| `game.js` | Original | Main game logic and state management |
| `graphics.js` | Original | 2D tile and sprite rendering |
| `graphics-advanced.js` | Original | Advanced 2D graphics (lighting, effects) |
| `ultimate-webgl-main.js` | WebGL | Three.js game engine |
| `webgl-renderer.js` | WebGL | Three.js scene initialization |
| `isometric-renderer.js` | WebGL/Maldivian | Isometric map rendering |
| `maldives-game-main.js` | Maldivian | Maldivian edition game engine |
| `voxel-renderer.js` | Maldivian | Voxel-based rendering system |
| `map-data-loader.js` | Maldivian | Map data and OSM integration |

### UI Components

| File | Purpose |
|------|---------|
| `ui-hud.js` | HUD, stats display, minimap, dialogue system |

### Shader & Graphics

| File | Purpose |
|------|---------|
| `shader-system.js` | Custom shader definitions (water, lighting, particles) |

### Story & Dialogue

| File | Purpose |
|------|---------|
| `act2.js` - `act10.js` | Story acts and dialogue scripts |

### HTML Entry Points

| File | Edition | Purpose |
|------|---------|---------|
| `index.html` | Original | Original 2D game entry point |
| `rta_complete.html` | Original | Complete version with all features |
| `rta_webgl.html` | WebGL | WebGL edition entry point |
| `ultimate-webgl-edition.html` | WebGL | Ultimate WebGL edition entry point |
| `maldives-edition.html` | Maldivian | **Maldivian edition (RECOMMENDED)** |

### Documentation

| File | Purpose |
|------|---------|
| `README.md` | Original project README |
| `WEBGL_EDITION_README.md` | WebGL edition documentation |
| `MALDIVIAN_EDITION_README.md` | Maldivian edition documentation |
| `MALDIVIAN_RESEARCH_AND_STRATEGY.md` | Research and technical strategy |
| `README_PROJECT_STRUCTURE.md` | This file |

## Running Different Editions

### Original Edition
```bash
# Open in browser
open index.html

# Or serve locally
python3 -m http.server 8000
# Navigate to: http://localhost:8000/index.html
```

### WebGL Edition
```bash
# Open the WebGL version
open ultimate-webgl-edition.html

# Or serve locally
python3 -m http.server 8000
# Navigate to: http://localhost:8000/ultimate-webgl-edition.html
```

### Maldivian Edition (RECOMMENDED)
```bash
# Open the Maldivian edition
open maldives-edition.html

# Or serve locally
python3 -m http.server 8000
# Navigate to: http://localhost:8000/maldives-edition.html
```

## Technology Stack by Edition

### Original Edition
- **Rendering**: HTML5 Canvas 2D
- **Graphics**: Procedurally generated pixel art
- **Architecture**: Isometric 2D projection
- **Dependencies**: None (vanilla JavaScript)

### WebGL Edition
- **Rendering**: Three.js (WebGL)
- **Graphics**: 3D geometry with custom shaders
- **Architecture**: Isometric 3D camera
- **Dependencies**: Three.js (CDN)

### Maldivian Edition
- **Rendering**: Three.js (WebGL)
- **Graphics**: Voxel-based rendering with pixel art style
- **Architecture**: Isometric 3D camera with voxel geometry
- **Data Integration**: OpenStreetMap (OSM) support
- **Dependencies**: Three.js (CDN)

## Feature Comparison

| Feature | Original | WebGL | Maldivian |
|---------|----------|-------|-----------|
| 3D Graphics | ❌ | ✅ | ✅ |
| Voxel Rendering | ❌ | ❌ | ✅ |
| Pixel Art Style | ✅ | ⚠️ | ✅ |
| Isometric View | ✅ | ✅ | ✅ |
| Custom Shaders | ❌ | ✅ | ✅ |
| Maldivian Content | ❌ | ❌ | ✅ |
| OSM Data Support | ❌ | ❌ | ✅ |
| Dhoni Boats | ❌ | ❌ | ✅ |
| Maldivian Architecture | ❌ | ❌ | ✅ |
| Modern UI/UX | ⚠️ | ✅ | ✅ |
| Touch Controls | ❌ | ✅ | ✅ |

## Development Roadmap

### Completed
- ✅ Original 2D implementation
- ✅ WebGL 3D upgrade
- ✅ Voxel rendering system
- ✅ Maldivian content integration
- ✅ Map data loader (OSM support)
- ✅ UI/HUD system

### In Progress
- 🔄 Real OSM data integration for Malé/Hulhumale
- 🔄 NPC AI and pathfinding
- 🔄 Vehicle physics

### Planned
- ⏳ Multiplayer networking
- ⏳ Advanced physics engine
- ⏳ Sound and music system
- ⏳ Procedural mission generation
- ⏳ Character customization
- ⏳ Inventory system
- ⏳ Fishing mini-game
- ⏳ Diving/snorkeling mechanics

## Repository Statistics

```
Total Files: 30+
Total Lines of Code: 50,000+
Main Game Logic: 15,000+ lines
Graphics Systems: 8,000+ lines
Story/Dialogue: 12,000+ lines
Documentation: 3,000+ lines
```

## How to Choose Which Edition to Use

### Use **Original Edition** if:
- You want to understand the original game design
- You need a lightweight 2D implementation
- You're developing on very limited hardware

### Use **WebGL Edition** if:
- You want 3D graphics with advanced shaders
- You need better performance than 2D
- You want a modern web-based game engine

### Use **Maldivian Edition** if:
- You want the latest features and improvements
- You want authentic Maldivian content
- You want voxel-based pixel art rendering
- You want to integrate real map data (OSM)
- **This is the recommended choice for new development**

## Contributing

To contribute to the project:

1. Choose which edition you want to work on
2. Read the corresponding README file
3. Follow the architecture and coding style
4. Test thoroughly before submitting changes
5. Update documentation as needed

## File Cleanup & Organization

### Legacy Files (Can be archived)
- `act2.js` through `act10.js` - Story files (archived in separate directory if needed)
- `graphics.js` - Original 2D graphics (superseded by voxel renderer)
- `graphics-advanced.js` - Advanced 2D graphics (superseded by shader system)
- `game.js` - Original game logic (superseded by edition-specific engines)
- `index.html` - Original entry point (superseded by newer editions)
- `rta_complete.html` - Complete original version (superseded)

### Active Files (Keep)
- `maldives-edition.html` - Main entry point (Maldivian Edition)
- `maldives-game-main.js` - Core game engine
- `voxel-renderer.js` - Voxel rendering
- `map-data-loader.js` - Map data integration
- `ui-hud.js` - UI system
- `shader-system.js` - Shader definitions
- `isometric-renderer.js` - Isometric rendering

### Documentation Files (Keep)
- `MALDIVIAN_EDITION_README.md` - Main documentation
- `MALDIVIAN_RESEARCH_AND_STRATEGY.md` - Research and strategy
- `README_PROJECT_STRUCTURE.md` - This file

## Performance Considerations

### Original Edition
- Lightweight and fast
- Good for older devices
- Limited visual quality

### WebGL Edition
- Moderate performance requirements
- Good for most modern devices
- Better visual quality

### Maldivian Edition
- Higher performance requirements
- Optimized for modern browsers
- Best visual quality with voxel rendering

## Browser Support

All editions support:
- Chrome/Chromium (recommended)
- Firefox
- Safari (iOS 15+)
- Edge
- Mobile browsers (with touch controls)

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [OpenStreetMap Wiki](https://wiki.openstreetmap.org/)
- [Overpass API Documentation](https://wiki.openstreetmap.org/wiki/Overpass_API)
- [Maldivian Culture Resources](https://www.archdaily.com/999412/a-brief-history-of-the-maldives-culture-contemporary-architecture-and-tourism)

---

**Last Updated**: December 22, 2025  
**Current Version**: 1.0 - Maldivian Edition  
**Recommended Edition**: Maldivian Edition (`maldives-edition.html`)
