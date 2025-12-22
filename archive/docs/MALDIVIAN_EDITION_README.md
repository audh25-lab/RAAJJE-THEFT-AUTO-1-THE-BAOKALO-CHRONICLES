# Raajje Theft Auto 1: The Baokalo Chronicles - Maldivian Edition

## Overview

The **Maldivian Edition** is a complete visual and content overhaul of Raajje Theft Auto 1, featuring **high-resolution voxel art rendering** with authentic Maldivian geography, architecture, vehicles, and culture. The game is set in the Baokalo Islands (Maldives) and offers an immersive experience of island life with tropical aesthetics.

## Key Features

### 1. **Voxel-Based Rendering with Pixel Art Style**
- High-resolution voxel geometry for detailed buildings and environments
- Authentic pixel art aesthetic reminiscent of classic isometric games
- Maldivian tropical color palette (hot pink, ocean blue, lime green, terracotta)
- Dynamic lighting and shadow mapping
- Atmospheric effects (fog, sky gradients)

### 2. **Authentic Maldivian Geography**
- Procedurally generated cities based on real Maldivian urban layouts
- Malé (capital) and Hulhumale (artificial island) representations
- Accurate building types and architectural styles
- Real-world landmarks (Islamic Center, Fish Market, Presidential Palace)
- Water areas and coastal features

### 3. **Local Vehicles & Transportation**
- **Dhoni Boats**: Traditional Maldivian fishing vessels with detailed voxel modeling
- **Taxis**: Colorful urban transport vehicles
- **Motorcycles/Scooters**: Personal transport
- **Buses**: Public transportation
- **Speedboats**: Inter-island travel

### 4. **Maldivian Characters & NPCs**
- Voxel-based character models with cultural authenticity
- Multiple character archetypes (fishermen, vendors, tourists, officials)
- Cultural clothing variations (traditional sarongs, modern wear)
- Interactive dialogue system with local NPCs

### 5. **Modern UI/UX**
- Real-time stats display (Health, Stamina, Karma)
- Dynamic minimap showing player position and city layout
- Mission tracker with cultural context
- Touch controls for mobile devices
- Dialogue system for NPC interactions

## Project Structure

```
RAAJJE-THEFT-AUTO-1-THE-BAOKALO-CHRONICLES/
├── maldives-edition.html                    # Main entry point
├── maldives-game-main.js                    # Core game engine
├── voxel-renderer.js                        # Voxel rendering system
├── map-data-loader.js                       # Map data and OSM integration
├── ui-hud.js                                # HUD and UI components
├── MALDIVIAN_RESEARCH_AND_STRATEGY.md       # Research documentation
├── MALDIVIAN_EDITION_README.md              # This file
├── WEBGL_EDITION_README.md                  # Previous WebGL edition docs
├── isometric-renderer.js                    # Isometric rendering (legacy)
├── shader-system.js                         # Shader definitions (legacy)
├── ultimate-webgl-edition.html              # Previous WebGL version
└── [other legacy files]                     # Original game files
```

## Installation & Running

### Prerequisites
- Modern web browser with WebGL support (Chrome, Firefox, Safari, Edge)
- No external dependencies (Three.js loaded via CDN)
- Internet connection (for CDN assets and optional OSM data)

### Running the Game

1. **Open in browser directly:**
   ```bash
   # Simply open the HTML file in your browser
   open maldives-edition.html
   ```

2. **Or serve via local HTTP server:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   
   # Then navigate to: http://localhost:8000/maldives-edition.html
   ```

3. **Or use a development server:**
   ```bash
   # Using Live Server extension in VS Code or similar
   ```

## Controls

### Keyboard Controls
- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Move left
- **D / Arrow Right**: Move right

### Touch Controls (Mobile)
- **Left Joystick**: Movement control
- **Action Buttons**: 
  - **⚔️ Attack**: Interact with objects/NPCs
  - **🤝 Interact**: Talk to NPCs
  - **💨 Sprint**: Run faster (consumes stamina)
  - **☰ Menu**: Open game menu

## Game Architecture

### Core Components

#### 1. **MaldivesGame Class** (`maldives-game-main.js`)
Main game controller orchestrating all systems:
- Scene initialization and management
- Camera setup (isometric view)
- Input handling and player movement
- Game state management
- Animation loop

#### 2. **VoxelRenderer Class** (`voxel-renderer.js`)
Handles all voxel-based rendering:
- Voxel block creation and manipulation
- Building generation from voxel data
- Character and vehicle modeling
- Terrain tile rendering
- Maldivian color palette management
- Dhoni boat creation
- Palm tree and environmental elements

#### 3. **MapDataLoader Class** (`map-data-loader.js`)
Manages geographical data integration:
- OpenStreetMap (OSM) data fetching via Overpass API
- Building polygon to voxel conversion
- Procedural city generation
- Landmark definitions
- Building type classification and coloring
- Sample Maldivian city creation

#### 4. **UIHud Class** (`ui-hud.js`)
User interface and HUD management:
- Stats display and updates
- Minimap rendering
- Mission tracker
- Touch control setup
- Dialogue system
- Action button handling

### Game State Structure

```javascript
gameState = {
    player: {
        position: Vector3,      // Current position in game world
        health: number,         // 0-100
        stamina: number,        // 0-100
        karma: number,          // 0-100 (reputation)
        money: number,          // Total cash
        speed: number           // Movement speed
    },
    currentCity: object,        // Current city data
    isRunning: boolean,         // Game active state
    timeOfDay: number,          // 0-24 hours
    weather: string             // Current weather state
}
```

## Maldivian Content Integration

### Architecture & Buildings

The game features authentic Maldivian architecture:

**Residential Buildings:**
- Colorful facades (hot pink, ocean blue, lime green, orange, yellow)
- Multi-story apartment blocks (3-6 floors typical)
- Balconies and terraces
- Modern glass and concrete construction

**Commercial Areas:**
- Shops with neon signage
- Hotels and guesthouses
- Markets and bazaars
- Office buildings

**Landmarks:**
- Islamic Center (Grand Mosque) - white with distinctive dome
- Fish Market - traditional market structure
- Presidential Palace - government building
- Parks and recreational areas

### Vehicles & Transportation

**Dhoni Boats:**
- Wooden hull construction
- Colorful paint (blues, greens, reds, yellows)
- Fishing nets and equipment
- Cabin areas for crew
- Sizes: 3-30+ meters

**Land Vehicles:**
- Taxis (yellow/orange with checkered patterns)
- Motorcycles/Scooters (primary personal transport)
- Buses (colorful with decorative designs)
- Tuk-tuks (less common)

### Characters & Culture

**Local Occupations:**
- Fishermen (traditional sarongs, working with dhonis)
- Market vendors (selling fish, fruits, spices)
- Shop keepers (running businesses)
- Street vendors (snacks, drinks, souvenirs)
- Boat captains (operating ferries)

**Cultural Elements:**
- Language: Dhivehi (Maldivian)
- Religion: Islam (reflected in architecture and customs)
- Traditional clothing: Sarongs, headscarves, Islamic dress
- Activities: Fishing, trading, water sports, religious observances

## Customization & Extension

### Adding New Buildings

Edit `voxel-renderer.js` to add custom building types:

```javascript
createCustomBuilding(x, z, width, depth, height, colorHex) {
    const building = this.createBuilding(x, z, width, depth, height, colorHex);
    // Add custom details here
    return building;
}
```

### Modifying City Layout

Edit `map-data-loader.js` to customize city generation:

```javascript
generateProceduralCity(centerLat, centerLon, citySize) {
    // Modify building placement, types, and colors
    // Customize road layout
    // Add custom landmarks
}
```

### Creating New Characters

Extend character creation in `voxel-renderer.js`:

```javascript
createCustomCharacter(x, y, z, clothingColor, skinColor) {
    // Create voxel-based character with custom appearance
}
```

### Changing Color Palette

Modify the Maldivian color palette in `voxel-renderer.js`:

```javascript
initializeMaldivianColorPalette() {
    return {
        // Add or modify colors here
        customColor: 0xRRGGBB
    };
}
```

## Performance Optimization

1. **Frustum Culling**: Off-screen voxels are not rendered
2. **Mesh Merging**: Combine multiple voxels into single meshes
3. **LOD System**: Reduce geometry complexity for distant objects
4. **Texture Atlasing**: Combine textures to reduce draw calls
5. **Instancing**: Use THREE.InstancedMesh for repeated elements

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Full support |
| Safari | ✅ Full | iOS 15+ required |
| Edge | ✅ Full | Full support |
| Mobile Browsers | ✅ Full | Touch controls enabled |

## Data Sources & References

### Geographical Data
- **OpenStreetMap (OSM)**: Building footprints, roads, landmarks
- **Overpass API**: Query specific building data for Malé/Hulhumale
- **GEBCO**: Elevation data (though Maldives is very flat)

### Asset Resources
- **OpenGameArt.org**: Voxel models and pixel art assets
- **Lospec.com**: Pixel art color palettes
- **itch.io**: Game asset libraries

### Research Sources
1. ArchDaily - A Brief History of the Maldives
2. Wikipedia - Dhoni (Fishing Vessel)
3. OpenStreetMap Wiki - Simple 3D Buildings
4. Medium - Building 3D Cities with Three.js and OSM

## Future Enhancements

- [ ] Real OpenStreetMap data integration for Malé/Hulhumale
- [ ] NPC AI with pathfinding
- [ ] Vehicle physics and driving mechanics
- [ ] Dynamic weather system
- [ ] Sound effects and music (Maldivian cultural audio)
- [ ] Multiplayer networking
- [ ] Advanced physics engine
- [ ] Procedural mission generation
- [ ] Character customization system
- [ ] Inventory and trading system
- [ ] Fishing mini-game
- [ ] Diving/snorkeling mechanics
- [ ] Tourism and cultural quests
- [ ] Day/night cycle with dynamic lighting
- [ ] Seasonal changes

## Troubleshooting

### Black Screen
- Check browser console for WebGL errors
- Ensure WebGL is enabled in browser settings
- Try a different browser (Chrome recommended)

### Low Performance
- Reduce map size in `MapDataLoader`
- Disable shadow mapping: `renderer.shadowMap.enabled = false`
- Reduce voxel detail level
- Close other browser tabs

### Controls Not Working
- Ensure focus is on the game window
- Check browser console for JavaScript errors
- Try keyboard controls if touch controls fail
- Verify browser supports the required APIs

## Development Notes

### Adding OSM Data

To integrate real OpenStreetMap data:

```javascript
const osmData = await mapDataLoader.fetchOSMData(
    '4.1669,73.5093,4.1900,73.5400',  // Malé bbox
    'building'
);
const voxelBuildings = mapDataLoader.convertBuildingsToVoxels(osmData);
```

### Extending the Game

The modular architecture allows easy extension:

1. Create new renderer classes for specific elements
2. Add new game mechanics in `MaldivesGame`
3. Extend `MapDataLoader` for custom data sources
4. Customize UI in `UIHud`

### Performance Profiling

Use browser DevTools to profile:
- Frame rate (FPS)
- Memory usage
- Draw calls
- Shader compilation time

## Credits

**Game**: Raajje Theft Auto 1: The Baokalo Chronicles  
**Engine**: Three.js  
**Edition**: Maldivian Edition with Voxel Art  
**Inspiration**: Maldivian culture, geography, and architecture  

## License

This project is provided as-is for educational and entertainment purposes.

---

**Version**: 1.0 - Maldivian Edition  
**Last Updated**: December 22, 2025  
**Status**: Active Development
