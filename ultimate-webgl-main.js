// ultimate-webgl-main.js
// Main integration file for the Ultimate WebGL Edition

import * as THREE from 'three';
import { IsometricRenderer } from './isometric-renderer.js';
import { ShaderSystem } from './shader-system.js';
import { UIHud } from './ui-hud.js';

class UltimateWebGLGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.isometricRenderer = null;
        this.uiHud = null;
        this.playerMesh = null;
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
            isRunning: true,
            timeOfDay: 12
        };

        this.init();
    }

    init() {
        // 1. Initialize Three.js Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        // 2. Setup Camera (Isometric View)
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 50;
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
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        // 4. Setup Lighting
        this.setupLighting();

        // 5. Initialize Isometric Map Renderer
        this.isometricRenderer = new IsometricRenderer(this.scene, 100, 5);

        // 6. Create Player Mesh
        this.createPlayerMesh();

        // 7. Initialize UI/HUD
        this.uiHud = new UIHud();

        // 8. Setup Input Handlers
        this.setupInputHandlers();

        // 9. Setup Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        window.addEventListener('gameAction', this.handleGameAction.bind(this), false);

        // 10. Start Game Loop
        this.animate();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Hemisphere light for better ambient lighting
        const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x000000, 0.5);
        this.scene.add(hemiLight);
    }

    createPlayerMesh() {
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            metalness: 0.3,
            roughness: 0.4
        });
        this.playerMesh = new THREE.Mesh(geometry, material);
        this.playerMesh.position.set(0, 1, 0);
        this.playerMesh.castShadow = true;
        this.playerMesh.receiveShadow = true;
        this.scene.add(this.playerMesh);
    }

    setupInputHandlers() {
        const keys = {};
        window.addEventListener('keydown', (e) => {
            keys[e.key.toLowerCase()] = true;
            this.handleKeyDown(e, keys);
        });
        window.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
        });

        // Store keys in game state for continuous movement
        this.keys = keys;
    }

    handleKeyDown(event, keys) {
        const speed = this.gameState.player.speed;
        const moveVector = new THREE.Vector3();

        if (keys['w'] || keys['arrowup']) moveVector.z -= speed;
        if (keys['s'] || keys['arrowdown']) moveVector.z += speed;
        if (keys['a'] || keys['arrowleft']) moveVector.x -= speed;
        if (keys['d'] || keys['arrowright']) moveVector.x += speed;

        if (moveVector.length() > 0) {
            moveVector.normalize().multiplyScalar(speed);
            this.gameState.player.position.add(moveVector);
            this.playerMesh.position.copy(this.gameState.player.position);

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
        this.uiHud.showDialogue('NPC', 'Hello, traveler!');
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
        const frustumSize = 50;
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        const delta = this.clock.getDelta();

        // Update game state
        this.updateGameState(delta);

        // Update UI
        this.uiHud.updateStats(
            this.gameState.player.health,
            this.gameState.player.stamina,
            this.gameState.player.karma,
            this.gameState.player.money
        );

        // Render the scene
        this.renderer.render(this.scene, this.camera);
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

        // Handle continuous movement
        this.handleKeyDown(null, this.keys);
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ultimateWebGLGame = new UltimateWebGLGame();
});

export { UltimateWebGLGame };
