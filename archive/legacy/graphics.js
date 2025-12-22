// ==================== GTA 2-STYLE GRAPHICS MODULE ====================
// Canvas-based sprite and tile rendering system
// All graphics are procedurally generated - no external assets

// ==================== TILE RENDERING ====================
class TileRenderer {
    constructor(tileSize = 32) {
        this.tileSize = tileSize;
        this.tileCache = {};
    }

    // Render a tile with GTA 2-style appearance
    renderTile(ctx, x, y, tileType, isSelected = false) {
        const size = this.tileSize;
        const cacheKey = `${tileType}_${size}`;

        // Draw tile background
        switch (tileType) {
            case 0: // Water
                this.drawWaterTile(ctx, x, y, size);
                break;
            case 1: // Ground/Grass
                this.drawGrassland(ctx, x, y, size);
                break;
            case 2: // Road
                this.drawRoad(ctx, x, y, size);
                break;
            case 3: // Building
                this.drawBuilding(ctx, x, y, size);
                break;
            case 4: // Market/Zone
                this.drawMarket(ctx, x, y, size);
                break;
            case 5: // Dock
                this.drawDock(ctx, x, y, size);
                break;
            case 6: // Park
                this.drawPark(ctx, x, y, size);
                break;
            case 7: // Religious
                this.drawReligious(ctx, x, y, size);
                break;
            case 8: // Gang Territory
                this.drawGangTerritory(ctx, x, y, size);
                break;
            default:
                this.drawGrassland(ctx, x, y, size);
        }

        // Highlight if selected
        if (isSelected) {
            ctx.strokeStyle = '#ffff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, size, size);
        }
    }

    drawWaterTile(ctx, x, y, size) {
        // Ocean blue gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + size);
        gradient.addColorStop(0, '#1a5f7a');
        gradient.addColorStop(1, '#0d3a4a');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);

        // Wave pattern
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(x, y + i * 10);
            ctx.lineTo(x + size, y + i * 10);
            ctx.stroke();
        }
    }

    drawGrassland(ctx, x, y, size) {
        // Grass base
        ctx.fillStyle = '#2d5a3d';
        ctx.fillRect(x, y, size, size);

        // Grass texture
        ctx.fillStyle = 'rgba(100,150,80,0.3)';
        for (let i = 0; i < 5; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            ctx.fillRect(px, py, 2, 2);
        }

        // Border shadow
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
    }

    drawRoad(ctx, x, y, size) {
        // Asphalt base
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, size, size);

        // Road markings
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.stroke();
        ctx.setLineDash([]);

        // Wear marks
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        for (let i = 0; i < 3; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            ctx.fillRect(px, py, 3, 3);
        }
    }

    drawBuilding(ctx, x, y, size) {
        // Building base
        const baseColor = '#8b7355';
        ctx.fillStyle = baseColor;
        ctx.fillRect(x, y, size, size);

        // Roof shadow
        ctx.fillStyle = '#6b5345';
        ctx.fillRect(x, y, size, 4);

        // Windows
        ctx.fillStyle = '#ffff99';
        const windowSize = 6;
        const windowGap = 2;
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                const wx = x + 4 + col * (windowSize + windowGap);
                const wy = y + 8 + row * (windowSize + windowGap);
                ctx.fillRect(wx, wy, windowSize, windowSize);
                // Window frame
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 1;
                ctx.strokeRect(wx, wy, windowSize, windowSize);
            }
        }

        // Door
        ctx.fillStyle = '#5a4a3a';
        ctx.fillRect(x + 12, y + 20, 8, 12);
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x + 14, y + 22, 4, 4);
    }

    drawMarket(ctx, x, y, size) {
        // Market stall base
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x, y, size, size);

        // Stall stripes (market awning)
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        for (let i = 0; i < size; i += 6) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i + 3, y + size);
            ctx.stroke();
        }

        // Market goods (small boxes)
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(x + 4, y + 4, 8, 8);
        ctx.fillStyle = '#4ecdc4';
        ctx.fillRect(x + 20, y + 4, 8, 8);
    }

    drawDock(ctx, x, y, size) {
        // Dock wood texture
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x, y, size, size);

        // Wooden planks
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < size; i += 8) {
            ctx.beginPath();
            ctx.moveTo(x, y + i);
            ctx.lineTo(x + size, y + i);
            ctx.stroke();
        }

        // Water edge
        ctx.strokeStyle = '#1a5f7a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.stroke();
    }

    drawPark(ctx, x, y, size) {
        // Grass
        ctx.fillStyle = '#4a7c3a';
        ctx.fillRect(x, y, size, size);

        // Trees
        ctx.fillStyle = '#2d5a2d';
        ctx.beginPath();
        ctx.arc(x + 8, y + 8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 24, y + 24, 4, 0, Math.PI * 2);
        ctx.fill();

        // Tree trunks
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x + 7, y + 12, 2, 4);
        ctx.fillRect(x + 23, y + 28, 2, 4);
    }

    drawReligious(ctx, x, y, size) {
        // Mosque base
        ctx.fillStyle = '#e8d4b0';
        ctx.fillRect(x, y, size, size);

        // Dome
        ctx.fillStyle = '#4a9d6f';
        ctx.beginPath();
        ctx.arc(x + size / 2, y + 8, 6, 0, Math.PI, true);
        ctx.fill();

        // Minaret
        ctx.fillStyle = '#c9a961';
        ctx.fillRect(x + size - 6, y + 4, 4, 20);

        // Crescent on dome
        ctx.strokeStyle = '#ffff99';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x + size / 2, y + 8, 4, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawGangTerritory(ctx, x, y, size) {
        // Danger zone - darker, grittier
        ctx.fillStyle = '#4a3a2a';
        ctx.fillRect(x, y, size, size);

        // Gang markings (graffiti)
        ctx.fillStyle = 'rgba(255,100,100,0.4)';
        ctx.fillRect(x + 2, y + 2, 6, 6);
        ctx.fillStyle = 'rgba(100,100,255,0.4)';
        ctx.fillRect(x + 22, y + 22, 6, 6);

        // Warning pattern
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
        ctx.setLineDash([]);
    }
}

// ==================== CHARACTER SPRITE RENDERER ====================
class CharacterRenderer {
    static drawCharacter(ctx, x, y, character, direction = 'down') {
        const size = 24;
        const halfSize = size / 2;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(x, y + halfSize + 2, halfSize, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = character.color || '#8b4513';
        ctx.fillRect(x - halfSize / 2, y - halfSize / 2, halfSize, halfSize);

        // Head
        ctx.fillStyle = character.skinColor || '#d4a574';
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 2, 4, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 2, y - halfSize - 4, 1, 1);
        ctx.fillRect(x + 1, y - halfSize - 4, 1, 1);

        // Weapon indicator
        if (character.weapon && character.weapon !== 'fists') {
            ctx.fillStyle = '#444444';
            ctx.fillRect(x + halfSize / 2 - 2, y - 2, 4, 4);
        }
    }

    static drawEnemy(ctx, x, y, enemyType = 'thug') {
        const size = 24;
        const halfSize = size / 2;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(x, y + halfSize + 2, halfSize, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (red for enemies)
        ctx.fillStyle = '#cc3333';
        ctx.fillRect(x - halfSize / 2, y - halfSize / 2, halfSize, halfSize);

        // Head
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 2, 4, 0, Math.PI * 2);
        ctx.fill();

        // Angry eyes
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x - 2, y - halfSize - 4, 1, 1);
        ctx.fillRect(x + 1, y - halfSize - 4, 1, 1);

        // Weapon
        ctx.fillStyle = '#333333';
        ctx.fillRect(x + halfSize / 2 - 2, y - 2, 4, 4);
    }

    static drawNPC(ctx, x, y, npcType = 'civilian') {
        const size = 20;
        const halfSize = size / 2;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(x, y + halfSize + 1, halfSize, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (various colors for NPCs)
        const colors = { civilian: '#4a7c9e', merchant: '#8b7355', police: '#3a4a6a' };
        ctx.fillStyle = colors[npcType] || '#4a7c9e';
        ctx.fillRect(x - halfSize / 2, y - halfSize / 2, halfSize, halfSize);

        // Head
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 1, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== VEHICLE SPRITE RENDERER ====================
class VehicleRenderer {
    static drawMotorcycle(ctx, x, y, direction = 'right') {
        // Motorcycle body
        ctx.fillStyle = '#333333';
        ctx.fillRect(x - 12, y - 6, 24, 12);

        // Wheels
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(x - 8, y + 6, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 8, y + 6, 4, 0, Math.PI * 2);
        ctx.fill();

        // Seat
        ctx.fillStyle = '#cc6633';
        ctx.fillRect(x - 6, y - 4, 12, 3);

        // Headlight
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 12, y - 2, 3, 3);
    }

    static drawDhoni(ctx, x, y) {
        // Boat hull
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.ellipse(x, y, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Boat outline
        ctx.strokeStyle = '#5a2a0a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(x, y, 20, 12, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Cabin
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x - 8, y - 4, 16, 6);

        // Window
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 4, y - 2, 8, 3);

        // Mast
        ctx.strokeStyle = '#8b7355';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x, y - 12);
        ctx.stroke();
    }

    static drawSpeedboat(ctx, x, y) {
        // Hull
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(x - 16, y);
        ctx.lineTo(x + 16, y - 4);
        ctx.lineTo(x + 16, y + 4);
        ctx.closePath();
        ctx.fill();

        // Cabin
        ctx.fillStyle = '#4a7c9e';
        ctx.fillRect(x - 8, y - 6, 12, 6);

        // Window
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 4, y - 4, 6, 3);

        // Engine
        ctx.fillStyle = '#333333';
        ctx.fillRect(x + 12, y - 2, 6, 4);
    }

    static drawSeaplane(ctx, x, y) {
        // Fuselage
        ctx.fillStyle = '#4a7c9e';
        ctx.fillRect(x - 12, y - 4, 24, 8);

        // Wings
        ctx.fillStyle = '#3a6a8e';
        ctx.fillRect(x - 20, y - 2, 40, 2);

        // Tail
        ctx.fillStyle = '#3a6a8e';
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 3);
        ctx.lineTo(x + 16, y - 5);
        ctx.lineTo(x + 16, y + 5);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 6, y - 2, 8, 4);

        // Floats
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 16, y + 4, 6, 3);
        ctx.fillRect(x + 10, y + 4, 6, 3);
    }
}

// ==================== ENVIRONMENT RENDERER ====================
class EnvironmentRenderer {
    static drawTree(ctx, x, y) {
        // Trunk
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x - 2, y, 4, 10);

        // Foliage
        ctx.fillStyle = '#2d5a2d';
        ctx.beginPath();
        ctx.arc(x, y - 4, 8, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = 'rgba(100,150,80,0.4)';
        ctx.beginPath();
        ctx.arc(x - 3, y - 6, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    static drawLamppost(ctx, x, y) {
        // Pole
        ctx.strokeStyle = '#666666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 16);
        ctx.stroke();

        // Light
        ctx.fillStyle = '#ffff99';
        ctx.beginPath();
        ctx.arc(x + 4, y - 16, 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.fillStyle = 'rgba(255,255,153,0.2)';
        ctx.beginPath();
        ctx.arc(x + 4, y - 16, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    static drawFence(ctx, x, y, length = 32) {
        // Posts
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x, y, 2, 12);
        ctx.fillRect(x + length - 2, y, 2, 12);

        // Rails
        ctx.strokeStyle = '#8b6f47';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 2, y + 3);
        ctx.lineTo(x + length - 2, y + 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 2, y + 9);
        ctx.lineTo(x + length - 2, y + 9);
        ctx.stroke();
    }

    static drawBarrier(ctx, x, y) {
        // Barrier block
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(x - 6, y - 4, 12, 8);

        // Stripes
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 4, y - 2, 2, 4);
        ctx.fillRect(x + 2, y - 2, 2, 4);
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TileRenderer, CharacterRenderer, VehicleRenderer, EnvironmentRenderer };
}
