// pixel-ui-hud.js
// Renders the HUD directly onto the canvas for the pixel edition.

export class PixelUIHud {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * Main render function for the HUD.
     * @param {object} gameState - The current state of the game.
     */
    render(gameState) {
        this.drawStats(gameState.player);
        this.drawMinimap(gameState);
        this.drawMissionTracker(gameState);
    }

    drawStats(player) {
        const { health, stamina, karma, money } = player;
        const barWidth = 150;
        const barHeight = 15;
        const startX = 20;
        const startY = 20;
        const gap = 10;

        // Health
        this.drawBar(startX, startY, barWidth, barHeight, health, 100, '#ff0000', '❤️');
        // Stamina
        this.drawBar(startX, startY + barHeight + gap, barWidth, barHeight, stamina, 100, '#00ff00', '⚡');
        // Karma
        this.drawBar(startX, startY + 2 * (barHeight + gap), barWidth, barHeight, karma, 100, '#ffff00', '⭐');

        // Money
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px "Courier New", Courier, monospace';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`$${money}`, this.ctx.canvas.width - 20, 40);
        this.ctx.textAlign = 'left';
    }

    drawBar(x, y, width, height, value, maxValue, color, icon) {
        // Background
        this.ctx.fillStyle = '#555';
        this.ctx.fillRect(x, y, width, height);
        // Fill
        const fillWidth = (value / maxValue) * width;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, fillWidth, height);
        // Border
        this.ctx.strokeStyle = '#fff';
        this.ctx.strokeRect(x, y, width, height);
        // Icon
        this.ctx.font = `${height}px Arial`;
        this.ctx.fillText(icon, x - height - 5, y + height - 2);
    }

    drawMinimap(gameState) {
        const map = gameState.map;
        if (!map) return;

        const minimapSize = 150;
        const minimapX = this.ctx.canvas.width - minimapSize - 20;
        const minimapY = 60;
        const tileWidth = minimapSize / map.width;
        const tileHeight = minimapSize / map.height;

        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(minimapX, minimapY, minimapSize, minimapSize);

        // Tiles
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tileType = map.grid[y][x];
                let color;
                switch (tileType) {
                    case 0: color = '#0000ff'; break; // Water
                    case 1: color = '#008000'; break; // Ground
                    case 2: color = '#808080'; break; // Road
                    case 3: color = '#ff0000'; break; // Building
                    default: color = '#000';
                }
                this.ctx.fillStyle = color;
                this.ctx.fillRect(minimapX + x * tileWidth, minimapY + y * tileHeight, tileWidth, tileHeight);
            }
        }

        // Player position
        const playerX = (gameState.player.x / (map.width * map.tileWidth * 2)) * minimapSize;
        const playerY = (gameState.player.y / (map.height * map.tileHeight * 2)) * minimapSize;
        this.ctx.fillStyle = '#ffff00';
        this.ctx.beginPath();
        this.ctx.arc(minimapX + playerX, minimapY + playerY, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Border
        this.ctx.strokeStyle = '#fff';
        this.ctx.strokeRect(minimapX, minimapY, minimapSize, minimapSize);
    }

    drawMissionTracker(gameState) {
        // Placeholder mission
        const missionTitle = "Explore Malé";
        const missionObjective = "Find the fish market.";

        const startX = 20;
        const startY = this.ctx.canvas.height - 80;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(startX, startY, 400, 60);

        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 18px "Courier New", Courier, monospace';
        this.ctx.fillText(missionTitle, startX + 10, startY + 25);

        this.ctx.font = '16px "Courier New", Courier, monospace';
        this.ctx.fillText(missionObjective, startX + 10, startY + 50);
    }
}
