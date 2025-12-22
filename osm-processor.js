// osm-processor.js
// Comprehensive OpenStreetMap to Voxel Processor
// Converts real OSM building data into the game's voxel geometry



class OSMProcessor {
    constructor() {
        this.buildings = [];
        this.roads = [];
        this.water = [];
        this.landmarks = [];
        this.voxelSize = 1; // Size of each voxel block in meters
        this.mapBounds = {
            minLat: 4.16, // Malé
            maxLat: 4.18,
            minLon: 73.50,
            maxLon: 73.52
        };
        this.maldivianLandmarks = this.initializeLandmarks();
    }

    // Initialize known Maldivian landmarks with their coordinates and properties
    initializeLandmarks() {
        return {
            // Government & Administrative
            presidentialPalace: {
                name: 'Presidential Palace',
                lat: 4.1729,
                lon: 73.5107,
                width: 60,
                depth: 50,
                height: 8,
                color: 0xFFFFFF,
                type: 'government'
            },
            parliament: {
                name: 'Parliament Building',
                lat: 4.1743,
                lon: 73.5089,
                width: 40,
                depth: 35,
                height: 6,
                color: 0xE8E8E8,
                type: 'government'
            },
            // Religious
            grandFriday Mosque: {
                name: 'Grand Friday Mosque',
                lat: 4.1736,
                lon: 73.5099,
                width: 50,
                depth: 50,
                height: 10,
                color: 0xFFFFFF,
                type: 'mosque',
                dome: true
            },
            // Commercial & Market
            localMarket: {
                name: 'Local Market',
                lat: 4.1720,
                lon: 73.5110,
                width: 80,
                depth: 60,
                height: 4,
                color: 0xFF6B35,
                type: 'market'
            },
            // Tourism & Hospitality
            malèHarbor: {
                name: 'Malé Harbor',
                lat: 4.1715,
                lon: 73.5130,
                width: 200,
                depth: 150,
                height: 0,
                color: 0x0077BE,
                type: 'harbor'
            },
            // Residential
            residentialZone1: {
                name: 'Residential Zone - Maafannu',
                lat: 4.1750,
                lon: 73.5080,
                width: 150,
                depth: 150,
                height: 4,
                color: 0xFF1493,
                type: 'residential'
            }
        };
    }

    // Parse OSM XML/JSON data (simplified for demonstration)
    parseOSMData(osmData) {
        // This would normally parse the actual OSM XML or JSON format
        // For now, we'll use a simplified approach with the landmarks
        const processedBuildings = [];
        const processedRoads = [];
        const processedWater = [];

        // Add all known landmarks
        Object.values(this.maldivianLandmarks).forEach(landmark => {
            processedBuildings.push({
                id: landmark.name.replace(/\s+/g, '_'),
                name: landmark.name,
                lat: landmark.lat,
                lon: landmark.lon,
                width: landmark.width,
                depth: landmark.depth,
                height: landmark.height,
                color: landmark.color,
                type: landmark.type,
                dome: landmark.dome || false
            });
        });

        // Generate procedural residential buildings around landmarks
        processedBuildings.push(...this.generateResidentialArea());

        // Generate roads connecting key locations
        processedRoads.push(...this.generateRoadNetwork());

        // Generate water areas
        processedWater.push(...this.generateWaterAreas());

        this.buildings = processedBuildings;
        this.roads = processedRoads;
        this.water = processedWater;

        return {
            buildings: processedBuildings,
            roads: processedRoads,
            water: processedWater
        };
    }

    // Generate procedural residential buildings
    generateResidentialArea() {
        const buildings = [];
        const residentialZones = [
            { lat: 4.1750, lon: 73.5080, name: 'Maafannu' },
            { lat: 4.1720, lon: 73.5100, name: 'Henveiru' },
            { lat: 4.1740, lon: 73.5120, name: 'Galolhu' }
        ];

        residentialZones.forEach((zone, zoneIndex) => {
            // Generate a grid of buildings in each zone
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const offsetLat = (i - 4) * 0.0005;
                    const offsetLon = (j - 4) * 0.0005;

                    buildings.push({
                        id: `residential_${zoneIndex}_${i}_${j}`,
                        name: `Residential Building - ${zone.name} (${i},${j})`,
                        lat: zone.lat + offsetLat,
                        lon: zone.lon + offsetLon,
                        width: 4 + Math.random() * 3,
                        depth: 4 + Math.random() * 3,
                        height: 3 + Math.floor(Math.random() * 3),
                        color: [0xFF1493, 0xFF69B4, 0xFF1493, 0xFFB6C1][Math.floor(Math.random() * 4)],
                        type: 'residential'
                    });
                }
            }
        });

        return buildings;
    }

    // Generate road network connecting key locations
    generateRoadNetwork() {
        const roads = [];

        // Main roads connecting landmarks
        const mainRoads = [
            {
                from: { lat: 4.1729, lon: 73.5107 },
                to: { lat: 4.1743, lon: 73.5089 },
                name: 'Presidential Road'
            },
            {
                from: { lat: 4.1743, lon: 73.5089 },
                to: { lat: 4.1720, lon: 73.5110 },
                name: 'Market Street'
            },
            {
                from: { lat: 4.1720, lon: 73.5110 },
                to: { lat: 4.1715, lon: 73.5130 },
                name: 'Harbor Road'
            }
        ];

        mainRoads.forEach((road, index) => {
            roads.push({
                id: `road_${index}`,
                name: road.name,
                from: road.from,
                to: road.to,
                width: 2,
                type: 'main'
            });
        });

        return roads;
    }

    // Generate water areas (harbor, lagoons)
    generateWaterAreas() {
        const water = [];

        water.push({
            id: 'harbor_water',
            name: 'Malé Harbor',
            lat: 4.1715,
            lon: 73.5130,
            width: 200,
            depth: 150,
            type: 'harbor'
        });

        water.push({
            id: 'lagoon_north',
            name: 'North Lagoon',
            lat: 4.1760,
            lon: 73.5100,
            width: 100,
            depth: 100,
            type: 'lagoon'
        });

        return water;
    }

    // Convert lat/lon to voxel coordinates
    latLonToVoxel(lat, lon) {
        const latRange = this.mapBounds.maxLat - this.mapBounds.minLat;
        const lonRange = this.mapBounds.maxLon - this.mapBounds.minLon;

        const x = ((lon - this.mapBounds.minLon) / lonRange) * 100;
        const z = ((lat - this.mapBounds.minLat) / latRange) * 100;

        return { x: Math.floor(x), z: Math.floor(z) };
    }

    // Convert voxel coordinates back to lat/lon
    voxelToLatLon(x, z) {
        const latRange = this.mapBounds.maxLat - this.mapBounds.minLat;
        const lonRange = this.mapBounds.maxLon - this.mapBounds.minLon;

        const lon = this.mapBounds.minLon + (x / 100) * lonRange;
        const lat = this.mapBounds.minLat + (z / 100) * latRange;

        return { lat, lon };
    }

    // Generate voxel geometry for buildings
    generateBuildingVoxels(building) {
        const voxelCoords = this.latLonToVoxel(building.lat, building.lon);
        const voxels = [];

        // Create a voxel block for each unit of the building
        for (let x = 0; x < building.width; x++) {
            for (let z = 0; z < building.depth; z++) {
                for (let y = 0; y < building.height; y++) {
                    voxels.push({
                        x: voxelCoords.x + x,
                        y: y,
                        z: voxelCoords.z + z,
                        color: building.color,
                        type: building.type
                    });
                }
            }
        }

        // Add windows to buildings (if height > 1)
        if (building.height > 1) {
            for (let x = 1; x < building.width - 1; x += 2) {
                for (let z = 1; z < building.depth - 1; z += 2) {
                    for (let y = 1; y < building.height; y++) {
                        voxels.push({
                            x: voxelCoords.x + x,
                            y: y,
                            z: voxelCoords.z + z,
                            color: 0xFFFF00, // Yellow windows
                            type: 'window'
                        });
                    }
                }
            }
        }

        return voxels;
    }

    // Generate voxel geometry for roads
    generateRoadVoxels(road) {
        const voxels = [];
        const fromVoxel = this.latLonToVoxel(road.from.lat, road.from.lon);
        const toVoxel = this.latLonToVoxel(road.to.lat, road.to.lon);

        // Bresenham line algorithm to draw road
        const dx = Math.abs(toVoxel.x - fromVoxel.x);
        const dz = Math.abs(toVoxel.z - fromVoxel.z);
        const sx = fromVoxel.x < toVoxel.x ? 1 : -1;
        const sz = fromVoxel.z < toVoxel.z ? 1 : -1;
        let err = dx - dz;

        let x = fromVoxel.x;
        let z = fromVoxel.z;

        while (true) {
            // Create road tiles
            for (let i = 0; i < road.width; i++) {
                voxels.push({
                    x: x + i,
                    y: 0,
                    z: z,
                    color: 0x333333, // Dark gray road
                    type: 'road'
                });
            }

            if (x === toVoxel.x && z === toVoxel.z) break;

            const e2 = 2 * err;
            if (e2 > -dz) {
                err -= dz;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                z += sz;
            }
        }

        return voxels;
    }

    // Generate voxel geometry for water areas
    generateWaterVoxels(waterArea) {
        const voxels = [];
        const voxelCoords = this.latLonToVoxel(waterArea.lat, waterArea.lon);

        for (let x = 0; x < waterArea.width; x++) {
            for (let z = 0; z < waterArea.depth; z++) {
                voxels.push({
                    x: voxelCoords.x + x,
                    y: 0,
                    z: voxelCoords.z + z,
                    color: 0x0077BE, // Turquoise water
                    type: 'water'
                });
            }
        }

        return voxels;
    }

    // Generate the complete voxel world
    generateCompleteVoxelWorld() {
        const allVoxels = {
            buildings: [],
            roads: [],
            water: [],
            landmarks: []
        };

        // Generate building voxels
        this.buildings.forEach(building => {
            allVoxels.buildings.push(...this.generateBuildingVoxels(building));
        });

        // Generate road voxels
        this.roads.forEach(road => {
            allVoxels.roads.push(...this.generateRoadVoxels(road));
        });

        // Generate water voxels
        this.water.forEach(waterArea => {
            allVoxels.water.push(...this.generateWaterVoxels(waterArea));
        });

        return allVoxels;
    }

    // Export data for use in the game
    exportGameData() {
        return {
            buildings: this.buildings,
            roads: this.roads,
            water: this.water,
            voxels: this.generateCompleteVoxelWorld(),
            mapBounds: this.mapBounds,
            landmarks: this.maldivianLandmarks
        };
    }

    // Get statistics about the generated world
    getWorldStats() {
        const voxels = this.generateCompleteVoxelWorld();
        return {
            totalBuildings: this.buildings.length,
            totalRoads: this.roads.length,
            totalWaterAreas: this.water.length,
            totalVoxels: voxels.buildings.length + voxels.roads.length + voxels.water.length,
            buildingVoxels: voxels.buildings.length,
            roadVoxels: voxels.roads.length,
            waterVoxels: voxels.water.length
        };
    }
}

export { OSMProcessor };
