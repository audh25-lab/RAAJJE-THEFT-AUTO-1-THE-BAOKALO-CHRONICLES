// maldives-game-complete.js
// Simplified version for debugging module imports

// THREE is loaded globally via CDN in maldives-complete.html
console.log('Loading VoxelRenderer...');
import { VoxelRenderer } from './voxel-renderer.js';
// console.log('Loading OSMProcessor...');
// import { OSMProcessor } from './osm-processor.js';
// console.log('Loading PlayerPhysics...');
// import { PlayerPhysics } from './player-physics.js';
console.log('Loading NPCManager...');
import { NPCManager } from './npc-ai.js';
console.log('Loading MissionManager...');
import { MissionManager } from './mission-system.js';
console.log('Loading ChatSystem...');
import { ChatSystem } from './chat-system.js';
console.log('Loading GraphicsSearchSystem...');
import { GraphicsSearchSystem } from './graphics-search-system.js';
console.log('Loading UIHud...');
import { UIHud } from './ui-hud.js';
console.log('Loading VehicleManager...');
import { VehicleManager } from './vehicle-physics.js';
// console.log('Loading AdvancedShaders...');
// import { AdvancedShaders } from './advanced-shaders.js';
// console.log('Loading AudioSystem...');
// import { AudioSystem } from './audio-system.js';
// console.log('Loading GameStateManager...');
// import { GameStateManager } from './game-state-manager.js';

console.log('All modules imported successfully. (Test 1: No Imports)');

class MaldivesGameComplete {
    constructor() {
        console.log('MaldivesGameComplete constructor called.');
        this.init();
    }

    init() {
        console.log('init() called. Setting up minimal scene.');
        
        // Minimal Three.js setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        // Check if game-container exists before appending
        const container = document.getElementById('game-container');
        if (container) {
            container.appendChild( this.renderer.domElement );
        } else {
            console.error('Game container not found!');
        }

        // Test module instantiation
        try {
         new VoxelRenderer(this.scene, 1.0);
            new OSMProcessor();
            new PlayerPhysics(this.scene, null);
           new NPCManager(this.scene);          new MissionManager();         new ChatSystem();          new GraphicsSearchSystem();           new UIHud();         new VehicleManager(this.scene);       // new AdvancedShaders();
            // new AudioSystem();
            // new GameStateManager();         console.log('All modules instantiated successfully.');
        } catch (e) {
            console.error('Module instantiation failed:', e);
        }

        // Start a simple render loop to show something is happening
        this.camera.position.z = 5;
        const animate = () => {
            requestAnimationFrame( animate );
            this.renderer.render( this.scene, this.camera );
        };
        animate();
        
        console.log('Minimal game loop started.');
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, attempting to initialize game...');
    window.maldivesGameComplete = new MaldivesGameComplete();
    console.log('Game initialization attempt complete.');
});

export { MaldivesGameComplete };
