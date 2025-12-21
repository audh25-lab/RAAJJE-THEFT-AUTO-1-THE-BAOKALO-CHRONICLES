# Raajje Theft Auto 1: The Baokalo Chronicles - Ultimate WebGL Edition

## Overview

The **Ultimate WebGL Edition** is a complete rewrite of the Raajje Theft Auto 1 game engine, leveraging **Three.js** for advanced 3D graphics, true isometric projection, and modern web technologies.

## Key Features

### 1. **Three.js Integration & WebGL Rendering Pipeline**
- Full 3D rendering using WebGL via Three.js
- Hardware-accelerated graphics for smooth performance
- Support for advanced lighting and shadow mapping
- Optimized rendering for both desktop and mobile devices

### 2. **True Isometric Projection & 3D Map Geometry**
- Authentic isometric perspective camera setup
- 3D buildings with variable heights
- Procedurally generated map with multiple tile types:
  - Water (with wave effects)
  - Roads (with lane markings)
  - Grass/Parks
  - Buildings (with windows and roofs)
- Dynamic tile system for interactive map changes

### 3. **Advanced Shaders**
- **Water Shader**: Realistic wave animations with foam effects and sparkle
- **Lighting Shader**: Time-of-day based lighting with sunrise/sunset transitions
- **Particle Shader**: Particle effects for explosions, dust, and environmental effects
- Custom shader material system for extensibility

### 4. **Modern UI/UX Design**
- **Top Bar**: Real-time stats display (Health, Stamina, Karma)
- **Money Display**: Dynamic cash counter with glow effects
- **Minimap**: Live player position tracking
- **Mission Tracker**: Current mission objectives
- **Touch Controls**: Virtual joystick and action buttons
- **Dialogue System**: NPC interaction with dialogue boxes
- **Responsive Design**: Adapts to all screen sizes

## Project Structure

```
RAAJJE-THEFT-AUTO-1-THE-BAOKALO-CHRONICLES/
├── ultimate-webgl-edition.html       # Main entry point
├── ultimate-webgl-main.js            # Game logic and integration
├── webgl-renderer.js                 # Three.js scene setup (legacy)
├── isometric-renderer.js             # Isometric map and tile rendering
├── shader-system.js                  # Custom shader definitions
├── ui-hud.js                         # HUD and UI components
├── game-webgl.js                     # Game state management (legacy)
├── graphics.js                       # Original 2D graphics (legacy)
├── graphics-advanced.js              # Advanced 2D graphics (legacy)
├── game.js                           # Original game logic (legacy)
└── [act*.js files]                   # Story/dialogue scripts
```

## Installation & Running

### Prerequisites
- Modern web browser with WebGL support
- No external dependencies (Three.js is loaded via CDN)

### Running the Game

1. **Open the main file in a web browser:**
   ```bash
   open ultimate-webgl-edition.html
   ```

2. **Or serve via a local HTTP server:**
   ```bash
   python3 -m http.server 8000
   # Then navigate to: http://localhost:8000/ultimate-webgl-edition.html
   ```

## Controls

### Keyboard Controls
- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Move left
- **D / Arrow Right**: Move right

### Touch Controls (Mobile)
- **Left Joystick**: Movement
- **Action Buttons**: Attack, Interact, Sprint, Menu

## Game Architecture

### Core Components

#### 1. **UltimateWebGLGame Class** (`ultimate-webgl-main.js`)
Main game controller that orchestrates all systems:
- Scene initialization
- Camera management
- Input handling
- Game state updates
- Animation loop

#### 2. **IsometricRenderer Class** (`isometric-renderer.js`)
Handles all map and tile rendering:
- Procedural map generation
- Tile rendering (water, road, grass, buildings)
- Building geometry with heights
- Window rendering for buildings
- Dynamic tile updates

#### 3. **ShaderSystem Class** (`shader-system.js`)
Custom shader implementations:
- Water shader with wave animations
- Lighting shader with time-of-day effects
- Particle shader for effects
- Shader material management

#### 4. **UIHud Class** (`ui-hud.js`)
User interface and HUD management:
- Stats display and updates
- Minimap rendering and updates
- Mission tracker
- Touch control setup
- Dialogue system
- Action button handling

## Game State

The game maintains a central state object:

```javascript
gameState = {
    player: {
        position: Vector3,      // Current position
        health: number,         // 0-100
        stamina: number,        // 0-100
        karma: number,          // 0-100
        money: number,          // Total cash
        speed: number           // Movement speed
    },
    isRunning: boolean,         // Game active state
    timeOfDay: number           // 0-24 hours
}
```

## Customization

### Adding New Tile Types

Edit `IsometricRenderer.generateMapData()` to add new tile types:

```javascript
case 'custom':
    this.renderCustomTile(worldX, worldZ);
    break;
```

Then implement the render method:

```javascript
renderCustomTile(x, z) {
    const geometry = new THREE.BoxGeometry(this.tileSize, height, this.tileSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x123456 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, height / 2, z);
    this.scene.add(mesh);
}
```

### Modifying Shaders

Edit `ShaderSystem` class to add or modify shaders:

```javascript
static createCustomShader() {
    return {
        uniforms: { /* ... */ },
        vertexShader: `/* ... */`,
        fragmentShader: `/* ... */`
    };
}
```

### Adjusting Camera

Modify camera setup in `UltimateWebGLGame.init()`:

```javascript
const frustumSize = 50; // Increase for wider view, decrease for zoom
```

## Performance Optimization

1. **Frustum Culling**: Only render visible tiles
2. **LOD (Level of Detail)**: Reduce geometry complexity for distant objects
3. **Texture Atlasing**: Combine textures to reduce draw calls
4. **Instancing**: Use THREE.InstancedMesh for repeated objects
5. **Baking**: Pre-bake lighting for static geometry

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 15+)
- **Mobile Browsers**: Full support with touch controls

## Future Enhancements

- [ ] NPCs with AI pathfinding
- [ ] Vehicle system with physics
- [ ] Dynamic weather system
- [ ] Sound and music integration
- [ ] Multiplayer networking
- [ ] Advanced physics engine
- [ ] Procedural mission generation
- [ ] Character customization
- [ ] Inventory system
- [ ] Quest system

## Troubleshooting

### Black Screen
- Check browser console for WebGL errors
- Ensure WebGL is enabled in browser settings
- Try a different browser

### Low Performance
- Reduce map size in `IsometricRenderer` constructor
- Disable shadow mapping: `renderer.shadowMap.enabled = false`
- Reduce shader complexity

### Controls Not Working
- Ensure focus is on the game window
- Check browser console for JavaScript errors
- Try keyboard controls if touch controls fail

## Credits

**Game**: Raajje Theft Auto 1: The Baokalo Chronicles  
**Engine**: Three.js  
**WebGL Edition**: Ultimate Upgrade  

## License

This project is provided as-is for educational and entertainment purposes.

---

**Last Updated**: December 2025  
**Version**: 1.0.0 - Ultimate WebGL Edition
