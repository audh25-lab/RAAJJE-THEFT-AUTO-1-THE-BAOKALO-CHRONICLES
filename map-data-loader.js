// map-data-loader.js
// Load and process OpenStreetMap data for Maldivian cities

class MapDataLoader {
    constructor() {
        this.mapData = null;
        this.buildings = [];
        this.roads = [];
        this.landmarks = [];
        this.waterAreas = [];
    }

    // Fetch OSM data from Overpass API
    async fetchOSMData(bbox, elementType = 'building') {
        /**
         * Bounding boxes for key Maldivian locations:
         * Malé: bbox=4.1669,73.5093,4.1900,73.5400
         * Hulhumale: bbox=4.1600,73.4400,4.1800,73.4700
         */
        
        const query = `
            [bbox:${bbox}];
            (
                node["${elementType}"];
                way["${elementType}"];
                relation["${elementType}"];
            );
            out geom;
        `;
        
        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        
        try {
            const response = await fetch(overpassUrl, {
                method: 'POST',
                body: query
            });
            
            if (!response.ok) {
                throw new Error(`Overpass API error: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching OSM data:', error);
            return null;
        }
    }

    // Convert OSM building data to voxel format
    convertBuildingsToVoxels(osmData, voxelSize = 1.0) {
        const voxelBuildings = [];
        
        if (!osmData || !osmData.elements) {
            return voxelBuildings;
        }
        
        osmData.elements.forEach(element => {
            if (element.type === 'way' && element.geometry) {
                const building = this.polygonToVoxelBuilding(
                    element.geometry,
                    element.tags,
                    voxelSize
                );
                
                if (building) {
                    voxelBuildings.push(building);
                }
            }
        });
        
        return voxelBuildings;
    }

    // Convert a polygon to a voxel building
    polygonToVoxelBuilding(geometry, tags, voxelSize = 1.0) {
        if (!geometry || geometry.length < 3) {
            return null;
        }
        
        // Calculate bounding box
        const lats = geometry.map(p => p.lat);
        const lons = geometry.map(p => p.lon);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        
        // Convert lat/lon to game coordinates (simplified)
        const gameX = (minLon + maxLon) / 2 * 100;
        const gameZ = (minLat + maxLat) / 2 * 100;
        
        // Calculate building dimensions
        const width = Math.max(1, Math.round((maxLon - minLon) * 100 / voxelSize));
        const depth = Math.max(1, Math.round((maxLat - minLat) * 100 / voxelSize));
        
        // Get building height from tags or use default
        let height = 3;
        if (tags['building:levels']) {
            height = parseInt(tags['building:levels']);
        } else if (tags['height']) {
            height = Math.round(parseInt(tags['height']) / 3); // Assume 3m per floor
        }
        
        // Assign color based on building type
        const color = this.getBuildingColor(tags['building']);
        
        return {
            x: gameX,
            z: gameZ,
            width: width,
            depth: depth,
            height: Math.max(1, height),
            color: color,
            tags: tags
        };
    }

    // Get building color based on type
    getBuildingColor(buildingType) {
        const colorMap = {
            'residential': 0xFF1493,      // Hot pink
            'commercial': 0x0077BE,       // Ocean blue
            'retail': 0x00FF00,           // Lime green
            'office': 0xFF8C00,           // Dark orange
            'hotel': 0xFFFF00,            // Bright yellow
            'mosque': 0xFFFFFF,           // White
            'government': 0x8B4513,       // Brown
            'hospital': 0xFF0000,         // Red
            'school': 0x32CD32,           // Lime green
            'market': 0xFF6B35,           // Terracotta
            'warehouse': 0x808080,        // Gray
            'industrial': 0x333333,       // Dark gray
            'default': 0xCCCCCC           // Light gray
        };
        
        return colorMap[buildingType] || colorMap['default'];
    }

    // Load predefined Maldivian landmarks
    loadMaldivianLandmarks() {
        return [
            {
                name: 'Islamic Center',
                lat: 4.1742,
                lon: 73.5093,
                type: 'mosque',
                description: 'Grand Mosque of Malé'
            },
            {
                name: 'Fish Market',
                lat: 4.1750,
                lon: 73.5100,
                type: 'market',
                description: 'Traditional fish market'
            },
            {
                name: 'Presidential Palace',
                lat: 4.1760,
                lon: 73.5110,
                type: 'government',
                description: 'Presidential residence'
            },
            {
                name: 'Hulhumale Central Park',
                lat: 4.1700,
                lon: 73.4500,
                type: 'park',
                description: 'Central park in Hulhumale'
            },
            {
                name: 'Male Harbor',
                lat: 4.1730,
                lon: 73.5080,
                type: 'harbor',
                description: 'Main port of Malé'
            }
        ];
    }

    // Create a procedural Maldivian city based on real data
    generateProceduralCity(centerLat, centerLon, citySize = 20) {
        const city = {
            buildings: [],
            roads: [],
            landmarks: [],
            waterAreas: []
        };
        
        // Generate building grid
        const buildingsPerSide = Math.floor(Math.sqrt(citySize));
        const buildingSpacing = citySize / buildingsPerSide;
        
        for (let i = 0; i < buildingsPerSide; i++) {
            for (let j = 0; j < buildingsPerSide; j++) {
                const building = {
                    x: centerLon * 100 + i * buildingSpacing,
                    z: centerLat * 100 + j * buildingSpacing,
                    width: Math.random() * 3 + 2,
                    depth: Math.random() * 3 + 2,
                    height: Math.floor(Math.random() * 5) + 2,
                    color: this.getRandomMaldivianColor(),
                    type: this.getRandomBuildingType()
                };
                city.buildings.push(building);
            }
        }
        
        // Generate roads
        for (let i = 0; i < buildingsPerSide + 1; i++) {
            // Horizontal roads
            city.roads.push({
                type: 'horizontal',
                position: centerLat * 100 + i * buildingSpacing,
                length: citySize
            });
            
            // Vertical roads
            city.roads.push({
                type: 'vertical',
                position: centerLon * 100 + i * buildingSpacing,
                length: citySize
            });
        }
        
        // Add landmarks
        city.landmarks = this.loadMaldivianLandmarks();
        
        return city;
    }

    // Get random Maldivian building color
    getRandomMaldivianColor() {
        const colors = [
            0xFF1493,  // Hot pink
            0x0077BE,  // Ocean blue
            0x00FF00,  // Lime green
            0xFF8C00,  // Dark orange
            0xFFFF00,  // Bright yellow
            0xFFFFFF,  // White
            0xF5F5F5   // Off-white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Get random building type
    getRandomBuildingType() {
        const types = [
            'residential',
            'commercial',
            'retail',
            'office',
            'hotel'
        ];
        return types[Math.floor(Math.random() * types.length)];
    }

    // Export city data to JSON format
    exportCityData(city) {
        return JSON.stringify(city, null, 2);
    }

    // Import city data from JSON
    importCityData(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing city data:', error);
            return null;
        }
    }

    // Create a sample Maldivian city for testing
    createSampleMaldivianCity() {
        /**
         * This creates a procedural representation of Malé/Hulhumale
         * based on real geographical data and Maldivian architecture
         */
        
        const sampleCity = {
            name: 'Malé',
            centerLat: 4.1742,
            centerLon: 73.5093,
            buildings: [
                // Residential area (pink/colorful buildings)
                {
                    x: 0, z: 0, width: 4, depth: 4, height: 4,
                    color: 0xFF1493, type: 'residential'
                },
                {
                    x: 5, z: 0, width: 4, depth: 4, height: 3,
                    color: 0x0077BE, type: 'residential'
                },
                {
                    x: 10, z: 0, width: 4, depth: 4, height: 5,
                    color: 0x00FF00, type: 'residential'
                },
                
                // Commercial area (varied colors)
                {
                    x: 0, z: 5, width: 5, depth: 5, height: 4,
                    color: 0xFF8C00, type: 'commercial'
                },
                {
                    x: 6, z: 5, width: 5, depth: 5, height: 3,
                    color: 0xFFFF00, type: 'retail'
                },
                
                // Landmark (mosque - white)
                {
                    x: 12, z: 5, width: 6, depth: 6, height: 6,
                    color: 0xFFFFFF, type: 'mosque'
                },
                
                // Market area
                {
                    x: 0, z: 11, width: 8, depth: 6, height: 2,
                    color: 0xFF6B35, type: 'market'
                }
            ],
            roads: [
                { type: 'horizontal', position: 4.5, length: 20 },
                { type: 'horizontal', position: 10.5, length: 20 },
                { type: 'vertical', position: 4.5, length: 20 },
                { type: 'vertical', position: 10.5, length: 20 }
            ],
            water: [
                { x: -5, z: -5, width: 20, depth: 5 },
                { x: -5, z: 17, width: 20, depth: 5 }
            ]
        };
        
        return sampleCity;
    }
}

export { MapDataLoader };
