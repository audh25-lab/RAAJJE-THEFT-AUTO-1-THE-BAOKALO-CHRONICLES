// maldives-game-main.js
// Main game engine for Raajje Theft Auto 1: Maldivian Edition
// Integrates voxel rendering, map data, and game logic

import * as THREE from 'three';
import { VoxelRenderer } from './voxel-renderer.js';
import { MapDataLoader } from './map-data-loader.js';
import { UIHud } from './ui-hud.js';
import { ChatSystem } from './chat-system.js';
import { GraphicsSearchSystem } from './graphics-search-system.js';

class MaldivesGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.voxelRenderer = null;
        this.mapDataLoader = null;
        this.uiHud = null;
        this.chatSystem = null;
        this.graphicsSearchSystem = null;
        this.clock = new THREE.Clock();
        this.gameState = {
            player: {
                position: new THREE.Vector3(0, 0, 0),
                health: 100,
                stamina: 100,
                karma: 50,
                money: 500,
                speed: 0.5
            },
            currentCity: null,
            isRunning: true,
            timeOfDay: 12,
            weather: 'sunny'
        };
        this.keys = {};
        this.init();
    }

    init() {
        // 1. Initialize Three.js Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.Fog(0x87CEEB, 100, 200);

        // 2. Setup Camera (Isometric View)
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 80;
        this.camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            1000
        );
        this.camera.position.set(50, 50, 50);
        this.camera.lookAt(0, 0, 0);

        // 3. Setup WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        // 4. Setup Lighting
        this.setupLighting();

        // 5. Initialize Voxel Renderer
        this.voxelRenderer = new VoxelRenderer(this.scene, 1.0);

        // 6. Initialize Map Data Loader
        this.mapDataLoader = new MapDataLoader();

        // 7. Initialize UI/HUD
        this.uiHud = new UIHud();

        // 8. Initialize Chat System
        this.chatSystem = new ChatSystem();

        // 9. Initialize Graphics Search System
        this.graphicsSearchSystem = new GraphicsSearchSystem();

        // 10. Load and render the Maldivian city
        this.loadMaldivianCity();

        // 11. Create player character
        this.createPlayer();

        // 12. Setup UI Components
        this.setupUIComponents();

        // 13. Setup Input Handlers
        this.setupInputHandlers();

        // 14. Setup Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        window.addEventListener('gameAction', this.handleGameAction.bind(this), false);
        window.addEventListener('chatUpdated', this.onChatUpdated.bind(this), false);

        // 15. Start Game Loop
        this.animate();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight);

        // Hemisphere light for better ambient lighting
        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x000000, 0.6);
        this.scene.add(hemiLight);
    }

    loadMaldivianCity() {
        // Create a sample Maldivian city
        const city = this.mapDataLoader.createSampleMaldivianCity();
        this.gameState.currentCity = city;

        // Render buildings
        city.buildings.forEach(building => {
            const voxelBuilding = this.voxelRenderer.createBuilding(
                building.x,
                building.z,
                building.width,
                building.depth,
                building.height,
                building.color,
                0xFF6B35
            );
            this.scene.add(voxelBuilding);

            // Add windows to buildings (temporarily disabled due to bug in voxel-renderer.js)
            /*
            if (building.height > 1) {
                this.voxelRenderer.createWindowsOnFace(
                    voxelBuilding,
                    building.x,
                    building.z,
                    building.height,
                    0xFFFF00
                );
            }
            */
        });

        // Render roads
        city.roads.forEach(road => {
            if (road.type === 'horizontal') {
                for (let i = 0; i < road.length; i++) {
                    this.voxelRenderer.createTerrainTile(i - road.length / 2, road.position, 'road');
                }
            } else if (road.type === 'vertical') {
                for (let i = 0; i < road.length; i++) {
                    this.voxelRenderer.createTerrainTile(road.position, i - road.length / 2, 'road');
                }
            }
        });

        // Render water areas
        city.water.forEach(water => {
            for (let i = 0; i < water.width; i++) {
                for (let j = 0; j < water.depth; j++) {
                    this.voxelRenderer.createTerrainTile(
                        water.x + i,
                        water.z + j,
                        'water'
                    );
                }
            }
        });

        // Add some palm trees for atmosphere
        for (let i = 0; i < 5; i++) {
            const palmTree = this.voxelRenderer.createPalmTree(
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
            );
            this.scene.add(palmTree);
        }

        // Add dhoni boats in the water
        for (let i = 0; i < 3; i++) {
            const dhoni = this.voxelRenderer.createDhoni(
                Math.random() * 10 - 5,
                -10 + i * 3,
                [0x1E90FF, 0x00CED1, 0xFF6B35][i]
            );
            this.scene.add(dhoni);
        }
    }

    createPlayer() {
        const playerCharacter = this.voxelRenderer.createCharacter(
            0,
            0,
            0,
            0xD2691E
        );
        this.scene.add(playerCharacter);
        this.playerCharacter = playerCharacter;
    }

    setupUIComponents() {
        // UI components are initialized and appended to the DOM in their respective constructors.
        // This function is left empty to maintain the structure but prevent redundant DOM manipulation.
    }

    setupInputHandlers() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            // Hotkeys for chat and search
            if (e.key === 'c' || e.key === 'C') {
                this.toggleChat();
            }
            if (e.key === 'f' || e.key === 'F') {
                this.toggleSearch();
            }
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    toggleChat() {
        const chatUI = document.getElementById('chat-system');
        if (chatUI) {
            chatUI.style.display = chatUI.style.display === 'none' ? 'flex' : 'none';
        }
    }

    toggleSearch() {
        const searchUI = document.getElementById('graphics-search');
        if (searchUI) {
            searchUI.style.display = searchUI.style.display === 'none' ? 'block' : 'none';
        }
    }

    onChatUpdated(event) {
        console.log('Chat updated:', event.detail);
    }

    handleGameAction(event) {
        const { action } = event.detail;
        console.log(`Game Action: ${action}`);

        switch (action) {
            case 'attack':
                this.playerAttack();
                break;
            case 'interact':
                this.playerInteract();
                break;
            case 'sprint':
                this.playerSprint();
                break;
            case 'menu':
                this.toggleMenu();
                break;
        }
    }

    playerAttack() {
        console.log('Player attacked!');
        // Add attack animation and logic here
    }

    playerInteract() {
        console.log('Player interacted!');
        // Check for nearby NPCs or objects
        this.uiHud.showDialogue('Local Fisherman', 'Welcome to Malé! Have you seen any dhonis?');
    }

    playerSprint() {
        console.log('Player sprinting!');
        this.gameState.player.speed = 1.0;
        setTimeout(() => {
            this.gameState.player.speed = 0.5;
        }, 2000);
    }

    toggleMenu() {
        console.log('Menu toggled!');
        // Implement menu logic here
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 80;
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updatePlayer(delta) {
        let moveVector = new THREE.Vector3();

        if (this.keys['w'] || this.keys['arrowup']) moveVector.z -= this.gameState.player.speed;
        if (this.keys['s'] || this.keys['arrowdown']) moveVector.z += this.gameState.player.speed;
        if (this.keys['a'] || this.keys['arrowleft']) moveVector.x -= this.gameState.player.speed;
        if (this.keys['d'] || this.keys['arrowright']) moveVector.x += this.gameState.player.speed;

        if (moveVector.length() > 0) {
            moveVector.normalize().multiplyScalar(this.gameState.player.speed);
            this.gameState.player.position.add(moveVector);
            this.playerCharacter.position.copy(this.gameState.player.position);

            // Update camera to follow player
            this.camera.position.x = this.gameState.player.position.x + 50;
            this.camera.position.z = this.gameState.player.position.z + 50;
            this.camera.lookAt(this.gameState.player.position.x, 0, this.gameState.player.position.z);

            // Update minimap
            this.uiHud.updateMinimap(
                this.gameState.player.position.x,
                this.gameState.player.position.z,
                100
            );
        }
    }

    updateGameState(delta) {
        // Update time of day (cycle every 5 minutes = 300 seconds)
        this.gameState.timeOfDay = (this.gameState.timeOfDay + (delta / 300) * 24) % 24;

        // Stamina regeneration
        if (this.gameState.player.stamina < 100) {
            this.gameState.player.stamina += 10 * delta;
            if (this.gameState.player.stamina > 100) {
                this.gameState.player.stamina = 100;
            }
        }

        // Update player position
        this.updatePlayer(delta);

        // Update UI
        this.uiHud.updateStats(
            this.gameState.player.health,
            this.gameState.player.stamina,
            this.gameState.player.karma,
            this.gameState.player.money
        );

        // Update mission tracker
        this.uiHud.updateMissionTracker(
            'Explore Malé',
            'Discover the beauty of the Maldivian capital and complete local missions.'
        );
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        const delta = this.clock.getDelta();

        // Update game state
        this.updateGameState(delta);

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.maldivesGame = new MaldivesGame();
    } catch (e) {
        console.error("Game initialization failed:", e);
    }
});

export { MaldivesGame };
