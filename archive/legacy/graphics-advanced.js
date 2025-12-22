// ==================== ADVANCED GRAPHICS MODULE ====================
// Dynamic lighting, isometric perspective, enhanced sprites
// Real-world Maldives landmark rendering

// ==================== LIGHTING SYSTEM ====================
class LightingSystem {
    constructor() {
        this.timeOfDay = 12; // 0-24 hours
        this.dayLength = 300; // frames per day cycle
        this.frameCount = 0;
    }

    update() {
        this.frameCount++;
        this.timeOfDay = (this.frameCount / this.dayLength) % 24;
    }

    // Get lighting color based on time of day
    getLightColor() {
        const hour = this.timeOfDay;
        let r, g, b;

        if (hour >= 6 && hour < 8) { // Sunrise
            const t = (hour - 6) / 2;
            r = Math.floor(255 * (0.3 + t * 0.7));
            g = Math.floor(200 * (0.2 + t * 0.8));
            b = Math.floor(100 * (0.1 + t * 0.9));
        } else if (hour >= 8 && hour < 18) { // Day
            r = 255;
            g = 255;
            b = 255;
        } else if (hour >= 18 && hour < 20) { // Sunset
            const t = (hour - 18) / 2;
            r = Math.floor(255 * (1 - t * 0.5));
            g = Math.floor(200 * (1 - t * 0.7));
            b = Math.floor(100 * (1 - t * 0.8));
        } else { // Night
            r = 50;
            g = 60;
            b = 100;
        }

        return `rgb(${r}, ${g}, ${b})`;
    }

    // Get ambient darkness factor
    getAmbientFactor() {
        const hour = this.timeOfDay;
        if (hour >= 6 && hour < 18) return 1.0; // Full brightness
        if (hour >= 18 && hour < 20) return 0.8 - (hour - 18) * 0.1; // Sunset fade
        if (hour >= 20 || hour < 6) return 0.3; // Night (30% brightness)
        return 1.0;
    }

    // Get shadow intensity
    getShadowIntensity() {
        const hour = this.timeOfDay;
        if (hour >= 6 && hour < 12) return 0.3 + (hour - 6) * 0.05; // Morning shadows
        if (hour >= 12 && hour < 18) return 0.6 - (hour - 12) * 0.05; // Afternoon shadows fade
        if (hour >= 18 && hour < 20) return 0.2 + (hour - 18) * 0.15; // Sunset shadows
        return 0.4; // Night shadows
    }
}

// ==================== ENHANCED TILE RENDERER ====================
class AdvancedTileRenderer {
    constructor(tileSize = 32) {
        this.tileSize = tileSize;
        this.lighting = new LightingSystem();
    }

    renderTile(ctx, x, y, tileType, lightingFactor = 1.0) {
        const size = this.tileSize;

        // Apply lighting
        ctx.globalAlpha = lightingFactor;

        switch (tileType) {
            case 0: // Water
                this.drawWaterTile(ctx, x, y, size);
                break;
            case 1: // Grassland
                this.drawGrassland(ctx, x, y, size);
                break;
            case 2: // Road
                this.drawRoad(ctx, x, y, size);
                break;
            case 3: // Building
                this.drawBuilding(ctx, x, y, size);
                break;
            case 4: // Market
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
            case 9: // Beach
                this.drawBeach(ctx, x, y, size);
                break;
            case 10: // Resort
                this.drawResort(ctx, x, y, size);
                break;
            default:
                this.drawGrassland(ctx, x, y, size);
        }

        ctx.globalAlpha = 1.0;
    }

    drawWaterTile(ctx, x, y, size) {
        // Ocean gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + size);
        gradient.addColorStop(0, '#2a7f9e');
        gradient.addColorStop(1, '#1a4f6e');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);

        // Wave animation
        const waveOffset = (Date.now() / 50) % size;
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(x, y + i * 8 + waveOffset);
            ctx.lineTo(x + size, y + i * 8 + waveOffset);
            ctx.stroke();
        }

        // Depth shading
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(x, y + size - 8, size, 8);
    }

    drawGrassland(ctx, x, y, size) {
        // Grass base with gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + size);
        gradient.addColorStop(0, '#3d6a4a');
        gradient.addColorStop(1, '#2d5a3a');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);

        // Grass texture
        ctx.fillStyle = 'rgba(100,150,80,0.3)';
        for (let i = 0; i < 8; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            ctx.fillRect(px, py, 2, 2);
        }

        // Border shadow for depth
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
    }

    drawRoad(ctx, x, y, size) {
        // Asphalt with gradient
        const gradient = ctx.createLinearGradient(x, y, x + size, y);
        gradient.addColorStop(0, '#4a4a4a');
        gradient.addColorStop(0.5, '#3a3a3a');
        gradient.addColorStop(1, '#4a4a4a');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);

        // Road markings
        ctx.strokeStyle = '#ffff99';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.stroke();
        ctx.setLineDash([]);

        // Wear marks and details
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        for (let i = 0; i < 4; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            ctx.fillRect(px, py, 4, 2);
        }

        // Edge highlight
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.stroke();
    }

    drawBuilding(ctx, x, y, size) {
        // Building base with depth
        const gradient = ctx.createLinearGradient(x, y, x, y + size);
        gradient.addColorStop(0, '#a89968');
        gradient.addColorStop(1, '#8b7355');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);

        // Roof shadow
        ctx.fillStyle = '#6b5345';
        ctx.fillRect(x, y, size, 5);

        // Windows with light
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
                // Window reflection
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fillRect(wx + 1, wy + 1, 2, 2);
            }
        }

        // Door
        ctx.fillStyle = '#5a4a3a';
        ctx.fillRect(x + 12, y + 20, 8, 12);
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x + 14, y + 22, 4, 4);

        // Building edge shadow
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
    }

    drawMarket(ctx, x, y, size) {
        // Market stall base
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x, y, size, size);

        // Stall awning stripes
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        for (let i = 0; i < size; i += 6) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i + 3, y + size);
            ctx.stroke();
        }

        // Market goods
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(x + 4, y + 4, 8, 8);
        ctx.fillStyle = '#4ecdc4';
        ctx.fillRect(x + 20, y + 4, 8, 8);
        ctx.fillStyle = '#ffe66d';
        ctx.fillRect(x + 12, y + 16, 8, 8);

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(x, y + size - 6, size, 6);
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

        // Vertical grain
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < size; i += 4) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i, y + size);
            ctx.stroke();
        }

        // Water edge
        ctx.strokeStyle = '#2a7f9e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.stroke();
    }

    drawPark(ctx, x, y, size) {
        // Grass
        ctx.fillStyle = '#4a8c4a';
        ctx.fillRect(x, y, size, size);

        // Trees with foliage
        ctx.fillStyle = '#2d5a2d';
        ctx.beginPath();
        ctx.arc(x + 8, y + 8, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 24, y + 24, 5, 0, Math.PI * 2);
        ctx.fill();

        // Tree highlights
        ctx.fillStyle = 'rgba(100,200,100,0.4)';
        ctx.beginPath();
        ctx.arc(x + 6, y + 6, 3, 0, Math.PI * 2);
        ctx.fill();

        // Tree trunks
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x + 7, y + 12, 2, 5);
        ctx.fillRect(x + 23, y + 28, 2, 5);

        // Park bench
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 14, y + 14, 10, 2);
        ctx.fillRect(x + 13, y + 16, 2, 4);
        ctx.fillRect(x + 24, y + 16, 2, 4);
    }

    drawReligious(ctx, x, y, size) {
        // Mosque base
        ctx.fillStyle = '#e8d4b0';
        ctx.fillRect(x, y, size, size);

        // Dome with gradient
        const domeGrad = ctx.createRadialGradient(x + size / 2, y + 8, 2, x + size / 2, y + 8, 6);
        domeGrad.addColorStop(0, '#5aad7f');
        domeGrad.addColorStop(1, '#3a8d5f');
        ctx.fillStyle = domeGrad;
        ctx.beginPath();
        ctx.arc(x + size / 2, y + 8, 6, 0, Math.PI, true);
        ctx.fill();

        // Minaret
        ctx.fillStyle = '#c9a961';
        ctx.fillRect(x + size - 6, y + 4, 4, 20);
        // Minaret top
        ctx.fillStyle = '#4a9d6f';
        ctx.beginPath();
        ctx.arc(x + size - 4, y + 4, 2, 0, Math.PI * 2);
        ctx.fill();

        // Crescent symbol
        ctx.strokeStyle = '#ffff99';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + size / 2, y + 8, 3, 0.5, 2.6);
        ctx.stroke();
    }

    drawGangTerritory(ctx, x, y, size) {
        // Danger zone - darker
        ctx.fillStyle = '#4a3a2a';
        ctx.fillRect(x, y, size, size);

        // Gang graffiti
        ctx.fillStyle = 'rgba(255,100,100,0.5)';
        ctx.fillRect(x + 2, y + 2, 8, 8);
        ctx.fillStyle = 'rgba(100,100,255,0.5)';
        ctx.fillRect(x + 22, y + 22, 8, 8);

        // Warning pattern
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
        ctx.setLineDash([]);

        // Danger symbol
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚠', x + size / 2, y + size / 2 + 4);
    }

    drawBeach(ctx, x, y, size) {
        // Sand gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + size);
        gradient.addColorStop(0, '#e8d4a0');
        gradient.addColorStop(1, '#d4b890');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);

        // Sand texture
        ctx.fillStyle = 'rgba(200,180,140,0.2)';
        for (let i = 0; i < 10; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            ctx.fillRect(px, py, 3, 1);
        }

        // Shells/pebbles
        ctx.fillStyle = '#c9a961';
        ctx.beginPath();
        ctx.arc(x + 8, y + 8, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 24, y + 20, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    drawResort(ctx, x, y, size) {
        // Resort ground
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x, y, size, size);

        // Resort building
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 4, y + 4, 24, 16);

        // Roof
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.moveTo(x + 4, y + 4);
        ctx.lineTo(x + 16, y);
        ctx.lineTo(x + 28, y + 4);
        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = '#4ecdc4';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x + 6 + i * 5, y + 8, 3, 3);
        }

        // Pool area
        ctx.fillStyle = '#4ecdc4';
        ctx.fillRect(x + 4, y + 22, 10, 6);

        // Palm trees
        ctx.fillStyle = '#2d5a2d';
        ctx.beginPath();
        ctx.arc(x + 20, y + 26, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== ADVANCED CHARACTER RENDERER ====================
class AdvancedCharacterRenderer {
    static drawCharacter(ctx, x, y, character, direction = 'down', frame = 0) {
        const size = 24;
        const halfSize = size / 2;

        // Shadow with depth
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.ellipse(x, y + halfSize + 3, halfSize + 2, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body with gradient
        const bodyGrad = ctx.createLinearGradient(x - halfSize / 2, y - halfSize / 2, x - halfSize / 2, y + halfSize / 2);
        bodyGrad.addColorStop(0, character.color || '#a85a3a');
        bodyGrad.addColorStop(1, character.color || '#8b4513');
        ctx.fillStyle = bodyGrad;
        ctx.fillRect(x - halfSize / 2, y - halfSize / 2, halfSize, halfSize);

        // Head with shading
        ctx.fillStyle = character.skinColor || '#d4a574';
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 2, 5, 0, Math.PI * 2);
        ctx.fill();

        // Head highlight
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(x - 2, y - halfSize - 4, 2, 0, Math.PI * 2);
        ctx.fill();

        // Eyes with expression
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 2, y - halfSize - 4, 1.5, 1.5);
        ctx.fillRect(x + 1, y - halfSize - 4, 1.5, 1.5);

        // Mouth
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 1, 2, 0, Math.PI);
        ctx.stroke();

        // Weapon indicator
        if (character.weapon && character.weapon !== 'fists') {
            ctx.fillStyle = '#444444';
            ctx.fillRect(x + halfSize / 2 - 3, y - 2, 5, 5);
            // Weapon shine
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(x + halfSize / 2 - 2, y - 1, 2, 2);
        }

        // Movement animation (walking)
        if (frame > 0) {
            const bobAmount = Math.sin(frame * 0.2) * 1;
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(x - halfSize / 2, y - halfSize / 2 + bobAmount, halfSize, halfSize);
        }
    }

    static drawEnemy(ctx, x, y, enemyType = 'thug', frame = 0) {
        const size = 24;
        const halfSize = size / 2;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.ellipse(x, y + halfSize + 3, halfSize + 2, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (red for enemies)
        const bodyGrad = ctx.createLinearGradient(x - halfSize / 2, y - halfSize / 2, x - halfSize / 2, y + halfSize / 2);
        bodyGrad.addColorStop(0, '#dd5555');
        bodyGrad.addColorStop(1, '#cc3333');
        ctx.fillStyle = bodyGrad;
        ctx.fillRect(x - halfSize / 2, y - halfSize / 2, halfSize, halfSize);

        // Head
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 2, 5, 0, Math.PI * 2);
        ctx.fill();

        // Angry eyes
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x - 2, y - halfSize - 4, 1.5, 1.5);
        ctx.fillRect(x + 1, y - halfSize - 4, 1.5, 1.5);

        // Angry mouth
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 1, y - halfSize - 1);
        ctx.lineTo(x + 1, y - halfSize - 1);
        ctx.stroke();

        // Weapon
        ctx.fillStyle = '#333333';
        ctx.fillRect(x + halfSize / 2 - 3, y - 2, 5, 5);
        ctx.fillStyle = 'rgba(255,100,100,0.3)';
        ctx.fillRect(x + halfSize / 2 - 2, y - 1, 2, 2);
    }

    static drawNPC(ctx, x, y, npcType = 'civilian', frame = 0) {
        const size = 20;
        const halfSize = size / 2;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(x, y + halfSize + 2, halfSize, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body with type-specific colors
        const colors = {
            civilian: '#5a8fbe',
            merchant: '#9a8555',
            police: '#4a5a8a',
            tourist: '#ff9999'
        };
        const bodyGrad = ctx.createLinearGradient(x - halfSize / 2, y - halfSize / 2, x - halfSize / 2, y + halfSize / 2);
        bodyGrad.addColorStop(0, colors[npcType] || '#5a8fbe');
        bodyGrad.addColorStop(1, colors[npcType] || '#4a7fae');
        ctx.fillStyle = bodyGrad;
        ctx.fillRect(x - halfSize / 2, y - halfSize / 2, halfSize, halfSize);

        // Head
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.arc(x, y - halfSize - 1, 3, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 1, y - halfSize - 2, 0.5, 0.5);
        ctx.fillRect(x + 0.5, y - halfSize - 2, 0.5, 0.5);
    }
}

// ==================== ADVANCED VEHICLE RENDERER ====================
class AdvancedVehicleRenderer {
    static drawMotorcycle(ctx, x, y, direction = 'right', frame = 0) {
        // Motorcycle body with gradient
        const bodyGrad = ctx.createLinearGradient(x - 12, y - 6, x - 12, y + 6);
        bodyGrad.addColorStop(0, '#444444');
        bodyGrad.addColorStop(1, '#222222');
        ctx.fillStyle = bodyGrad;
        ctx.fillRect(x - 12, y - 6, 24, 12);

        // Wheels
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(x - 8, y + 6, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 8, y + 6, 4, 0, Math.PI * 2);
        ctx.fill();

        // Wheel rims
        ctx.strokeStyle = '#666666';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x - 8, y + 6, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + 8, y + 6, 3, 0, Math.PI * 2);
        ctx.stroke();

        // Seat
        ctx.fillStyle = '#cc6633';
        ctx.fillRect(x - 6, y - 4, 12, 3);

        // Headlight
        ctx.fillStyle = '#ffff99';
        ctx.beginPath();
        ctx.arc(x - 12, y - 1, 2, 0, Math.PI * 2);
        ctx.fill();

        // Headlight glow
        ctx.fillStyle = 'rgba(255,255,153,0.2)';
        ctx.beginPath();
        ctx.arc(x - 12, y - 1, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    static drawDhoni(ctx, x, y, frame = 0) {
        // Boat hull with gradient
        const hullGrad = ctx.createLinearGradient(x, y - 12, x, y + 12);
        hullGrad.addColorStop(0, '#a85a3a');
        hullGrad.addColorStop(1, '#8b4513');
        ctx.fillStyle = hullGrad;
        ctx.beginPath();
        ctx.ellipse(x, y, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Boat outline
        ctx.strokeStyle = '#5a2a0a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(x, y, 20, 12, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Cabin with gradient
        const cabinGrad = ctx.createLinearGradient(x - 8, y - 4, x - 8, y + 2);
        cabinGrad.addColorStop(0, '#e8d4b0');
        cabinGrad.addColorStop(1, '#d4a574');
        ctx.fillStyle = cabinGrad;
        ctx.fillRect(x - 8, y - 4, 16, 6);

        // Window with reflection
        ctx.fillStyle = '#4ecdc4';
        ctx.fillRect(x - 4, y - 2, 8, 3);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(x - 3, y - 1, 3, 1);

        // Mast
        ctx.strokeStyle = '#8b7355';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x, y - 14);
        ctx.stroke();

        // Flag
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(x + 2, y - 12, 6, 4);
    }

    static drawSpeedboat(ctx, x, y, frame = 0) {
        // Hull with gradient
        const hullGrad = ctx.createLinearGradient(x - 16, y - 4, x + 16, y + 4);
        hullGrad.addColorStop(0, '#ffffff');
        hullGrad.addColorStop(1, '#e8e8e8');
        ctx.fillStyle = hullGrad;
        ctx.beginPath();
        ctx.moveTo(x - 16, y);
        ctx.lineTo(x + 16, y - 4);
        ctx.lineTo(x + 16, y + 4);
        ctx.closePath();
        ctx.fill();

        // Hull outline
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 16, y);
        ctx.lineTo(x + 16, y - 4);
        ctx.lineTo(x + 16, y + 4);
        ctx.closePath();
        ctx.stroke();

        // Cabin
        ctx.fillStyle = '#5a8fbe';
        ctx.fillRect(x - 8, y - 6, 12, 6);

        // Window
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 4, y - 4, 6, 3);

        // Engine
        ctx.fillStyle = '#333333';
        ctx.fillRect(x + 12, y - 2, 6, 4);

        // Engine glow
        ctx.fillStyle = 'rgba(255,100,100,0.2)';
        ctx.fillRect(x + 12, y - 2, 6, 4);
    }

    static drawSeaplane(ctx, x, y, frame = 0) {
        // Fuselage with gradient
        const fuseGrad = ctx.createLinearGradient(x - 12, y - 4, x - 12, y + 4);
        fuseGrad.addColorStop(0, '#5a8fbe');
        fuseGrad.addColorStop(1, '#4a7fae');
        ctx.fillStyle = fuseGrad;
        ctx.fillRect(x - 12, y - 4, 24, 8);

        // Wings
        ctx.fillStyle = '#4a7fae';
        ctx.fillRect(x - 20, y - 2, 40, 2);

        // Wing highlights
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(x - 20, y - 2, 40, 1);

        // Tail
        ctx.fillStyle = '#3a6f9e';
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 3);
        ctx.lineTo(x + 16, y - 5);
        ctx.lineTo(x + 16, y + 5);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 6, y - 2, 8, 4);

        // Cockpit window
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(x - 5, y - 1, 6, 2);

        // Floats
        ctx.fillStyle = '#ffff99';
        ctx.fillRect(x - 16, y + 4, 6, 3);
        ctx.fillRect(x + 10, y + 4, 6, 3);

        // Float details
        ctx.strokeStyle = '#cccc00';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 16, y + 4, 6, 3);
        ctx.strokeRect(x + 10, y + 4, 6, 3);
    }
}

// ==================== WEATHER EFFECTS ====================
class WeatherEffects {
    constructor() {
        this.raindrops = [];
        this.fogDensity = 0;
    }

    generateRain(count = 50) {
        this.raindrops = [];
        for (let i = 0; i < count; i++) {
            this.raindrops.push({
                x: Math.random() * 1000,
                y: Math.random() * 600,
                speed: 3 + Math.random() * 2
            });
        }
    }

    updateRain() {
        this.raindrops.forEach(drop => {
            drop.y += drop.speed;
            if (drop.y > 600) {
                drop.y = -10;
                drop.x = Math.random() * 1000;
            }
        });
    }

    drawRain(ctx) {
        ctx.strokeStyle = 'rgba(200,220,255,0.6)';
        ctx.lineWidth = 1;
        this.raindrops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x - 2, drop.y + 8);
            ctx.stroke();
        });
    }

    drawFog(ctx, density = 0.3) {
        ctx.fillStyle = `rgba(200,200,200,${density})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdvancedTileRenderer, AdvancedCharacterRenderer, AdvancedVehicleRenderer, WeatherEffects, LightingSystem };
}
