// pixel-renderer.js
// Handles all 2D rendering for the pixel edition.

export class PixelRenderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.tileWidth = 16;
        this.tileHeight = 16;
        this.sprites = {}; // To cache loaded sprite images
    }

    /**
     * Loads a spritesheet.
     * @param {string} name - The name to assign to the loaded sprite.
     * @param {string} src - The path to the sprite image.
     */
    loadSprite(name, src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.sprites[name] = img;
                console.log(`Sprite '${name}' loaded.`);
                resolve();
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Main render function.
     * @param {object} gameState - The current state of the game.
     */
    render(gameState) {
        this.ctx.imageSmoothingEnabled = false; // Ensure crisp pixels

        if (!gameState.map) {
            return;
        }

        if (gameState.cameraMode === 'isometric') {
            this.renderIsometric(gameState);
        } else {
            this.renderTopDown(gameState);
        }

        this.drawPlayer(gameState);
    }

    renderTopDown(gameState) {
        const tileset = this.sprites['tileset'];
        if (!tileset) return;

        const map = gameState.map;
        const scale = 2; // Scale up for visibility
        const camera = {
            x: gameState.player.x - (this.ctx.canvas.width / (2 * scale)),
            y: gameState.player.y - (this.ctx.canvas.height / (2 * scale))
        };

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tileType = map.grid[y][x];
                // In the provided tileset:
                // 0 = water (let's use the 5th tile)
                // 1 = ground (let's use the 1st tile)
                // 2 = road (let's use the 2nd tile)
                // 3 = building (let's use the 3rd tile)
                let sx;
                switch (tileType) {
                    case 0: sx = 4 * this.tileWidth; break; // Water
                    case 1: sx = 0 * this.tileWidth; break; // Ground
                    case 2: sx = 1 * this.tileWidth; break; // Road
                    case 3: sx = 2 * this.tileWidth; break; // Building
                    default: sx = 0;
                }

                const sy = 0;
                const dx = (x * this.tileWidth - camera.x) * scale;
                const dy = (y * this.tileHeight - camera.y) * scale;
                const dWidth = this.tileWidth * scale;
                const dHeight = this.tileHeight * scale;

                this.ctx.drawImage(
                    tileset,
                    sx, sy, this.tileWidth, this.tileHeight,
                    dx, dy, dWidth, dHeight
                );
            }
        }
    }

    renderIsometric(gameState) {
        const tileset = this.sprites['tileset'];
        if (!tileset) return;

        const map = gameState.map;
        const scale = 2; // Scale up for visibility
        const camera = {
            x: gameState.player.x - (this.ctx.canvas.width / 2),
            y: gameState.player.y - (this.ctx.canvas.height / 2)
        };

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tileType = map.grid[y][x];
                let sx;
                switch (tileType) {
                    case 0: sx = 4 * this.tileWidth; break; // Water
                    case 1: sx = 0 * this.tileWidth; break; // Ground
                    case 2: sx = 1 * this.tileWidth; break; // Road
                    case 3: sx = 2 * this.tileWidth; break; // Building
                    default: sx = 0;
                }

                const sy = 0;

                // Isometric projection
                const isoX = (x - y) * (this.tileWidth * scale) / 2;
                const isoY = (x + y) * (this.tileHeight * scale) / 4;

                const dx = this.ctx.canvas.width / 2 + isoX - camera.x;
                const dy = 100 + isoY - camera.y;
                const dWidth = this.tileWidth * scale;
                const dHeight = this.tileHeight * scale;

                this.ctx.drawImage(
                    tileset,
                    sx, sy, this.tileWidth, this.tileHeight,
                    dx, dy, dWidth, dHeight
                );
            }
        }
    }

    drawPlayer(gameState) {
        const characterSprite = this.sprites['character'];
        if (!characterSprite) return;

        const scale = 2;
        const player = gameState.player;
        const sWidth = 16;
        const sHeight = 16;

        let dx, dy;
        if (gameState.cameraMode === 'isometric') {
            const isoX = (player.x - player.y) * (this.tileWidth * scale) / (2 * this.tileWidth);
            const isoY = (player.x + player.y) * (this.tileHeight * scale) / (4 * this.tileHeight);
            dx = this.ctx.canvas.width / 2 + isoX - (sWidth * scale / 2) - gameState.player.x + this.ctx.canvas.width / 2;
            dy = 100 + isoY - (sHeight * scale / 2) - gameState.player.y + this.ctx.canvas.height / 2;
        } else {
            dx = this.ctx.canvas.width / 2 - (sWidth * scale / 2);
            dy = this.ctx.canvas.height / 2 - (sHeight * scale / 2);
        }

        this.ctx.drawImage(
            characterSprite,
            0, 0, sWidth, sHeight,
            dx, dy, sWidth * scale, sHeight * scale
        );
    }
}
