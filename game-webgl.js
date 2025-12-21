// game-webgl.js
// Game logic adapted for the Three.js WebGL environment

import * as THREE from 'three';
import { WebGLRenderer } from './webgl-renderer.js';

// Global Game State (simplified for the upgrade focus)
const GameState = {
    player: {
        position: new THREE.Vector3(0, 0, 0),
        health: 100,
        stamina: 100,
        karma: 50,
        money: 500,
        speed: 0.5,
    },
    map: {
        size: 100,
        // Placeholder for a simple grid-based map data structure
        // In a real implementation, this would be loaded from a file
        getTileType: (x, z) => {
            if (Math.abs(x) < 10 && Math.abs(z) < 10) return 'road';
            if (Math.abs(x) > 40 || Math.abs(z) > 40) return 'water';
            return 'building';
        }
    },
    ui: {
        updateHUD: () => {
            // This function will be called every frame to update the modern UI/UX (Phase 4)
            const { health, stamina, karma, money } = GameState.player;
            
            // Placeholder for DOM manipulation (to be fully implemented in Phase 4)
            const healthBar = document.querySelector('.stat-bar.health');
            if (healthBar) healthBar.style.width = `${health}%`;
            
            const staminaBar = document.querySelector('.stat-bar.stamina');
            if (staminaBar) staminaBar.style.width = `${stamina}%`;
            
            const karmaBar = document.querySelector('.stat-bar.karma');
            if (karmaBar) karmaBar.style.width = `${karma}%`;
            
            const moneyAmount = document.querySelector('.money-amount');
            if (moneyAmount) moneyAmount.textContent = `$${money}`;
        }
    }
};

class Game {
    constructor() {
        this.renderer = window.webGLRenderer; // Access the global renderer instance
        this.playerMesh = null;
        this.init();
    }

    init() {
        // 1. Initialize Player Mesh
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.playerMesh = new THREE.Mesh(geometry, material);
        this.playerMesh.position.set(0, 1, 0); // Start at (0, 1, 0)
        this.renderer.scene.add(this.playerMesh);

        // 2. Setup Input Handlers (Placeholder for movement)
        document.addEventListener('keydown', this.handleInput.bind(this));

        // 3. Start Game Loop
        this.renderer.animate = this.update.bind(this);
        this.renderer.animate(); // Override the renderer's default animate with our game loop
    }

    handleInput(event) {
        let dx = 0, dz = 0;
        switch (event.key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
                dz = -1;
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                dz = 1;
                break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                dx = -1;
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                dx = 1;
                break;
        }

        if (dx !== 0 || dz !== 0) {
            const moveVector = new THREE.Vector3(dx, 0, dz).normalize().multiplyScalar(GameState.player.speed);
            GameState.player.position.add(moveVector);
            this.playerMesh.position.x = GameState.player.position.x;
            this.playerMesh.position.z = GameState.player.position.z;
            
            // Update camera to follow player (essential for isometric view)
            this.renderer.camera.position.x = GameState.player.position.x + 50;
            this.renderer.camera.position.z = GameState.player.position.z + 50;
            this.renderer.camera.lookAt(GameState.player.position.x, 0, GameState.player.position.z);
        }
    }

    update() {
        // Game logic update (e.g., physics, AI, mission updates)
        const delta = this.renderer.clock.getDelta();
        
        // Example: Player loses stamina over time
        if (GameState.player.stamina > 0) {
            GameState.player.stamina -= 0.1 * delta;
        }

        // Update UI
        GameState.ui.updateHUD();

        // Render the scene
        this.renderer.renderer.render(this.renderer.scene, this.renderer.camera);

        // Request next frame
        requestAnimationFrame(this.update.bind(this));
    }
}

// Start the game once the renderer is initialized
document.addEventListener('DOMContentLoaded', () => {
    // The WebGLRenderer is initialized immediately upon script load (in webgl-renderer.js)
    // We wait for the DOM to be ready before starting the game logic
    new Game();
});
