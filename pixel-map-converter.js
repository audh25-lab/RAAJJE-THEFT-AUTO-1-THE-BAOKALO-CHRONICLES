// pixel-map-converter.js
// Converts city data from MapDataLoader into a 2D tile grid.

export class PixelMapConverter {
    constructor(tileWidth = 16, tileHeight = 16) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    /**
     * Converts the city data into a tilemap.
     * @param {object} cityData - The city data from MapDataLoader.
     * @returns {object} - A tilemap object.
     */
    convert(cityData) {
        // Determine the bounds of the map
        let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;

        cityData.buildings.forEach(b => {
            minX = Math.min(minX, b.x);
            maxX = Math.max(maxX, b.x + b.width);
            minZ = Math.min(minZ, b.z);
            maxZ = Math.max(maxZ, b.z + b.depth);
        });

        cityData.roads.forEach(r => {
            if (r.type === 'horizontal') {
                minZ = Math.min(minZ, r.position);
                maxZ = Math.max(maxZ, r.position);
            } else {
                minX = Math.min(minX, r.position);
                maxX = Math.max(maxX, r.position);
            }
        });

        const mapWidth = Math.ceil((maxX - minX));
        const mapHeight = Math.ceil((maxZ - minZ));

        // Create an empty grid filled with a default tile (e.g., grass)
        const grid = Array(mapHeight).fill(null).map(() => Array(mapWidth).fill(1));

        // Draw roads
        cityData.roads.forEach(road => {
            if (road.type === 'horizontal') {
                const y = Math.floor(road.position - minZ);
                for (let x = 0; x < mapWidth; x++) {
                    if(grid[y]) grid[y][x] = 2; // Road tile
                }
            } else { // vertical
                const x = Math.floor(road.position - minX);
                for (let y = 0; y < mapHeight; y++) {
                    if(grid[y]) grid[y][x] = 2; // Road tile
                }
            }
        });

        // Draw buildings
        cityData.buildings.forEach(building => {
            const startX = Math.floor(building.x - minX);
            const startZ = Math.floor(building.z - minZ);
            for (let z = 0; z < building.depth; z++) {
                for (let x = 0; x < building.width; x++) {
                    const gridX = startX + x;
                    const gridZ = startZ + z;
                    if (grid[gridZ] && grid[gridZ][gridX] !== undefined) {
                        grid[gridZ][gridX] = 3; // Building tile
                    }
                }
            }
        });

        // Draw water
        cityData.water.forEach(water => {
            const startX = Math.floor(water.x - minX);
            const startZ = Math.floor(water.z - minZ);
            for (let z = 0; z < water.depth; z++) {
                for (let x = 0; x < water.width; x++) {
                    const gridX = startX + x;
                    const gridZ = startZ + z;
                    if (grid[gridZ] && grid[gridZ][gridX] !== undefined) {
                        grid[gridZ][gridX] = 0; // Water tile
                    }
                }
            }
        });


        return {
            grid: grid,
            width: mapWidth,
            height: mapHeight,
            tileWidth: this.tileWidth,
            tileHeight: this.tileHeight
        };
    }
}
