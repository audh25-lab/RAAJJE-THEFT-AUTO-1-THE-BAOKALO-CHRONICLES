// maldives-game-complete.js
// Complete Maldivian Edition Game Engine with all systems integrated

import * as THREE from 'three';
import { VoxelRenderer } from './voxel-renderer.js';
import { OSMProcessor } from './osm-processor.js';
import { PlayerPhysics } from './player-physics.js';
import { NPCManager } from './npc-ai.js';
import { MissionManager } from './mission-system.js';
import { ChatSystem } from './chat-system.js';
import { GraphicsSearchSystem } from './graphics-search-system.js';
import { UIHud } from './ui-hud.js';

class MaldivesGameComplete {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.voxelRenderer = null;
        this.osmProcessor = null;
        this.playerPhysics = null;
        this.npcManager = null;
        this.missionManager = null;
        this.chatSystem = null;
        this.graphicsSearchSystem = null;
        this.uiHud = null;
        
        this.clock = new THREE.Clock();
        this.keys = {};
        this.gameState = {
            player: {
                health: 100,
                stamina: 100,
                karma: 50,
                money: 1000,
                level: 1,
                experience: 0
            },
            isPaused: false,
            timeOfDay: 12,
            weather: 'sunny'
        };
        
        this.init();
    }

    init() {
        // Initialize Three.js Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        this.scene.fog = new THREE.Fog(0x87CEEB, 200, 400);

        // Setup Camera (Isometric View)
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 150;
        this.camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            2000
        );
        this.camera.position.set(50, 50, 50);
        this.camera.lookAt(0, 0, 0);

        // Setup WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        // Setup Lighting
        this.setupLighting();

        // Initialize all game systems
        this.voxelRenderer = new VoxelRenderer(this.scene, 1.0);
        this.osmProcessor = new OSMProcessor();
        this.playerPhysics = new PlayerPhysics(this.scene, null);
        this.npcManager = new NPCManager(this.scene);
        this.missionManager = new MissionManager();
        this.chatSystem = new ChatSystem();
        this.graphicsSearchSystem = new GraphicsSearchSystem();
        this.uiHud = new UIHud();

        // Generate the complete Maldivian world
        this.generateWorld();

        // Initialize player
        this.initializePlayer();

        // Initialize NPCs
        this.initializeNPCs();

        // Initialize missions
        this.missionManager.initializeDefaultMissions();

        // Setup UI
        this.setupUI();

        // Setup input handlers
        this.setupInputHandlers();

        // Setup event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        // Start game loop
        this.animate();
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.left = -200;
        directionalLight.shadow.camera.right = 200;
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = -200;
        this.scene.add(directionalLight);

        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x000000, 0.6);
        this.scene.add(hemiLight);
    }

    generateWorld() {
        // Parse OSM data and generate world
        const osmData = this.osmProcessor.parseOSMData(null);
        const voxelWorld = this.osmProcessor.generateCompleteVoxelWorld();

        // Render all buildings
        osmData.buildings.forEach(building => {
            const voxelBuilding = this.voxelRenderer.createBuilding(
                building.lat * 100,
                building.lon * 100,
                building.width,
                building.depth,
                building.height,
                building.color,
                0xFF6B35
            );
            this.scene.add(voxelBuilding);
        });

        // Render roads
        osmData.roads.forEach(road => {
            const fromVoxel = this.osmProcessor.latLonToVoxel(road.from.lat, road.from.lon);
            const toVoxel = this.osmProcessor.latLonToVoxel(road.to.lat, road.to.lon);
            
            // Draw road between points
            for (let i = 0; i < Math.abs(toVoxel.x - fromVoxel.x); i++) {
                const roadTile = this.voxelRenderer.createTerrainTile(
                    fromVoxel.x + i,
                    fromVoxel.z,
                    'road'
                );
                this.scene.add(roadTile);
            }
        });

        // Render water areas
        osmData.water.forEach(water => {
            for (let i = 0; i < water.width; i += 5) {
                for (let j = 0; j < water.depth; j += 5) {
                    const waterTile = this.voxelRenderer.createTerrainTile(
                        water.lat * 100 + i,
                        water.lon * 100 + j,
                        'water'
                    );
                    this.scene.add(waterTile);
                }
            }
        });

        // Add palm trees
        for (let i = 0; i < 15; i++) {
            const palmTree = this.voxelRenderer.createPalmTree(
                Math.random() * 50 - 25,
                Math.random() * 50 - 25
            );
            this.scene.add(palmTree);
        }

        // Add dhoni boats
        for (let i = 0; i < 5; i++) {
            const dhoni = this.voxelRenderer.createDhoni(
                Math.random() * 30 - 15,
                -30 + i * 5,
                [0x1E90FF, 0x00CED1, 0xFF6B35][i % 3]
            );
            this.scene.add(dhoni);
        }
    }

    initializePlayer() {
        const playerCharacter = this.voxelRenderer.createCharacter(0, 0, 0, 0xD2691E);
        this.scene.add(playerCharacter);
        this.playerPhysics.setPosition(0, 1, 0);
    }

    initializeNPCs() {
        // Create fisherman
        this.npcManager.createNPC(
            'fisherman_1',
            'Hassan (Fisherman)',
            new THREE.Vector3(-20, 0, -30),
            'fisherman'
        );

        // Create vendor
        this.npcManager.createNPC(
            'vendor_1',
            'Aisha (Vendor)',
            new THREE.Vector3(10, 0, 10),
            'vendor'
        );

        // Create civilians
        for (let i = 0; i < 5; i++) {
            this.npcManager.createNPC(
                `civilian_${i}`,
                `Civilian ${i + 1}`,
                new THREE.Vector3(Math.random() * 40 - 20, 0, Math.random() * 40 - 20),
                'civilian'
            );
        }

        // Create guards
        for (let i = 0; i < 2; i++) {
            this.npcManager.createNPC(
                `guard_${i}`,
                `Guard ${i + 1}`,
                new THREE.Vector3(Math.random() * 40 - 20, 0, Math.random() * 40 - 20),
                'guard'
            );
        }
    }

    setupUI() {
        const chatUI = this.chatSystem.createChatUI();
        document.getElementById('game-container').appendChild(chatUI);

        const searchUI = this.graphicsSearchSystem.createSearchUI();
        document.getElementById('game-container').appendChild(searchUI);
    }

    setupInputHandlers() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (e.key === 'c' || e.key === 'C') {
                this.toggleChat();
            }
            if (e.key === 'f' || e.key === 'F') {
                this.toggleSearch();
            }
            if (e.key === 'Escape') {
                this.togglePause();
            }
            if (e.key === 'e' || e.key === 'E') {
                this.interactWithNearby();
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

    togglePause() {
        this.gameState.isPaused = !this.gameState.isPaused;
    }

    interactWithNearby() {
        const nearbyNPCs = this.npcManager.getNPCsInRadius(this.playerPhysics.position, 5);
        if (nearbyNPCs.length > 0) {
            const npc = nearbyNPCs[0];
            const dialogue = npc.getDialogue();
            this.chatSystem.addMessage(npc.name, dialogue, 'npc');
        }
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 150;
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateGameState(delta) {
        if (this.gameState.isPaused) return;

        // Update player physics
        this.playerPhysics.update(delta, this.keys, this.camera);

        // Update NPCs
        this.npcManager.updateNPCs(delta, null, { position: this.playerPhysics.position });

        // Update UI
        this.uiHud.updateStats(
            this.gameState.player.health,
            this.gameState.player.stamina,
            this.gameState.player.karma,
            this.gameState.player.money
        );

        // Update time of day
        this.gameState.timeOfDay = (this.gameState.timeOfDay + (delta / 300) * 24) % 24;

        // Update mission tracker
        const activeMissions = this.missionManager.getActiveMissions();
        if (activeMissions.length > 0) {
            this.uiHud.updateMissionTracker(
                activeMissions[0].title,
                activeMissions[0].description
            );
        }
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
    window.maldivesGameComplete = new MaldivesGameComplete();
});

export { MaldivesGameComplete };
