// pixel-game-main.js
// Main game engine for Raajje Theft Auto 1: Pixel Edition

import { PixelRenderer } from './pixel-renderer.js';
import { MapDataLoader } from './map-data-loader.js';
import { PixelUIHud } from './pixel-ui-hud.js';
import { PixelMapConverter } from './pixel-map-converter.js';

class PixelGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameState = {
            player: {
                x: 300,
                y: 300,
                health: 100,
                stamina: 100,
                karma: 50,
                money: 500,
                speed: 150
            },
            currentCity: null,
            isRunning: true,
            timeOfDay: 12,
            weather: 'sunny',
            cameraMode: 'top-down', // 'top-down' or 'isometric'
            map: null
        };
        this.keys = {};
        this.lastTime = 0;
        this.pixelRenderer = new PixelRenderer(this.ctx);
        this.mapDataLoader = new MapDataLoader();
        this.pixelUIHud = new PixelUIHud(this.ctx);
        this.pixelMapConverter = new PixelMapConverter();

        this.init();
    }

    async init() {
        // 1. Setup Canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // 2. Initialize Renderer
        await this.pixelRenderer.loadSprite('tileset', 'assets/tilesets/tileset.png');
        await this.pixelRenderer.loadSprite('character', 'assets/sprites/character.png');

        // 3. Setup Input Handlers
        this.setupInputHandlers();

        // 4. Load Game Data
        this.loadGameData();

        // 5. Start Game Loop
        this.gameLoop(0);

        console.log("Pixel Game Initialized");
    }

    setupInputHandlers() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.handleKeyPress(e.key.toLowerCase());
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    handleKeyPress(key) {
        if (key === 't') {
            this.gameState.cameraMode = 'top-down';
            console.log('Camera switched to Top-Down');
        } else if (key === 'i') {
            this.gameState.cameraMode = 'isometric';
            console.log('Camera switched to Isometric');
        }
    }

    loadGameData() {
        const cityData = this.mapDataLoader.createSampleMaldivianCity();
        this.gameState.map = this.pixelMapConverter.convert(cityData);
        console.log("Map data loaded and converted.");
    }

    update(deltaTime) {
        // Update game state, player position, AI, etc.
        this.updatePlayer(deltaTime);
    }

    updatePlayer(deltaTime) {
        let moveX = 0;
        let moveY = 0;

        if (this.keys['w'] || this.keys['arrowup']) moveY -= this.gameState.player.speed;
        if (this.keys['s'] || this.keys['arrowdown']) moveY += this.gameState.player.speed;
        if (this.keys['a'] || this.keys['arrowleft']) moveX -= this.gameState.player.speed;
        if (this.keys['d'] || this.keys['arrowright']) moveX += this.gameState.player.speed;

        if (moveX !== 0 || moveY !== 0) {
            this.gameState.player.x += moveX * deltaTime;
            this.gameState.player.y += moveY * deltaTime;
        }
    }

    render() {
        // Clear the canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render the game world
        this.pixelRenderer.render(this.gameState);

        // Render the HUD
        this.pixelUIHud.render(this.gameState);

        // Draw camera mode text
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Camera Mode: ${this.gameState.cameraMode}`, 10, this.ctx.canvas.height - 20);
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000; // Delta time in seconds
        this.lastTime = timestamp;

        if (this.gameState.isRunning) {
            this.update(deltaTime || 0); // Handle initial frame
            this.render();
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

export { PixelGame };
