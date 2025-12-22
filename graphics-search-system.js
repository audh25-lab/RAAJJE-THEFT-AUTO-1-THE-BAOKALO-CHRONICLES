// graphics-search-system.js
// Graphics asset search and loading system for dynamic asset management

class GraphicsSearchSystem {
    constructor() {
        this.assetDatabase = this.initializeAssetDatabase();
        this.loadedAssets = new Map();
        this.searchHistory = [];
        this.favorites = [];
        this.maxSearchHistory = 20;
    }

    // Initialize asset database with available graphics
    initializeAssetDatabase() {
        return {
            buildings: [
                {
                    id: 'building_residential_pink',
                    name: 'Residential Building (Pink)',
                    category: 'buildings',
                    type: 'residential',
                    color: 0xFF1493,
                    width: 4,
                    depth: 4,
                    height: 4,
                    description: 'Colorful residential apartment block',
                    tags: ['residential', 'pink', 'maldivian', 'apartment']
                },
                {
                    id: 'building_commercial_blue',
                    name: 'Commercial Building (Blue)',
                    category: 'buildings',
                    type: 'commercial',
                    color: 0x0077BE,
                    width: 5,
                    depth: 5,
                    height: 5,
                    description: 'Modern commercial office building',
                    tags: ['commercial', 'blue', 'office', 'modern']
                },
                {
                    id: 'building_mosque_white',
                    name: 'Mosque (White)',
                    category: 'buildings',
                    type: 'mosque',
                    color: 0xFFFFFF,
                    width: 6,
                    depth: 6,
                    height: 8,
                    description: 'Islamic Center with distinctive dome',
                    tags: ['mosque', 'white', 'religious', 'landmark']
                },
                {
                    id: 'building_market_orange',
                    name: 'Market Building (Orange)',
                    category: 'buildings',
                    type: 'market',
                    color: 0xFF6B35,
                    width: 8,
                    depth: 6,
                    height: 3,
                    description: 'Traditional market structure',
                    tags: ['market', 'orange', 'commercial', 'traditional']
                },
                {
                    id: 'building_hotel_yellow',
                    name: 'Hotel Building (Yellow)',
                    category: 'buildings',
                    type: 'hotel',
                    color: 0xFFFF00,
                    width: 6,
                    depth: 6,
                    height: 6,
                    description: 'Tourist hotel with modern amenities',
                    tags: ['hotel', 'yellow', 'tourism', 'accommodation']
                }
            ],
            vehicles: [
                {
                    id: 'dhoni_blue',
                    name: 'Dhoni Boat (Blue)',
                    category: 'vehicles',
                    type: 'boat',
                    color: 0x1E90FF,
                    length: 8,
                    width: 3,
                    height: 4,
                    description: 'Traditional Maldivian fishing vessel',
                    tags: ['dhoni', 'boat', 'fishing', 'traditional', 'water']
                },
                {
                    id: 'dhoni_green',
                    name: 'Dhoni Boat (Green)',
                    category: 'vehicles',
                    type: 'boat',
                    color: 0x00CED1,
                    length: 8,
                    width: 3,
                    height: 4,
                    description: 'Turquoise dhoni boat',
                    tags: ['dhoni', 'boat', 'green', 'turquoise']
                },
                {
                    id: 'taxi_yellow',
                    name: 'Taxi (Yellow)',
                    category: 'vehicles',
                    type: 'taxi',
                    color: 0xFFD700,
                    length: 4,
                    width: 2,
                    height: 2,
                    description: 'Urban taxi vehicle',
                    tags: ['taxi', 'yellow', 'transport', 'urban']
                },
                {
                    id: 'motorcycle_red',
                    name: 'Motorcycle (Red)',
                    category: 'vehicles',
                    type: 'motorcycle',
                    color: 0xFF0000,
                    length: 2,
                    width: 1,
                    height: 1.5,
                    description: 'Personal motorcycle for quick transport',
                    tags: ['motorcycle', 'red', 'personal', 'transport']
                }
            ],
            characters: [
                {
                    id: 'character_fisherman',
                    name: 'Fisherman Character',
                    category: 'characters',
                    type: 'fisherman',
                    skinColor: 0xD2691E,
                    clothingColor: 0x8B4513,
                    height: 2,
                    description: 'Local fisherman with traditional attire',
                    tags: ['character', 'fisherman', 'local', 'male']
                },
                {
                    id: 'character_vendor',
                    name: 'Market Vendor Character',
                    category: 'characters',
                    type: 'vendor',
                    skinColor: 0xD2691E,
                    clothingColor: 0xFF69B4,
                    height: 2,
                    description: 'Local market vendor',
                    tags: ['character', 'vendor', 'female', 'local']
                },
                {
                    id: 'character_tourist',
                    name: 'Tourist Character',
                    category: 'characters',
                    type: 'tourist',
                    skinColor: 0xE8B4A0,
                    clothingColor: 0x00BFFF,
                    height: 2,
                    description: 'Visiting tourist',
                    tags: ['character', 'tourist', 'visitor']
                },
                {
                    id: 'character_official',
                    name: 'Government Official',
                    category: 'characters',
                    type: 'official',
                    skinColor: 0xD2691E,
                    clothingColor: 0x333333,
                    height: 2,
                    description: 'City administrator',
                    tags: ['character', 'official', 'government']
                }
            ],
            terrain: [
                {
                    id: 'terrain_water',
                    name: 'Water Tile',
                    category: 'terrain',
                    type: 'water',
                    color: 0x0077BE,
                    description: 'Ocean water tile',
                    tags: ['terrain', 'water', 'ocean', 'natural']
                },
                {
                    id: 'terrain_sand',
                    name: 'Sand Tile',
                    category: 'terrain',
                    type: 'sand',
                    color: 0xF4D03F,
                    description: 'Beach sand tile',
                    tags: ['terrain', 'sand', 'beach', 'natural']
                },
                {
                    id: 'terrain_grass',
                    name: 'Grass Tile',
                    category: 'terrain',
                    type: 'grass',
                    color: 0x228B22,
                    description: 'Green grass tile',
                    tags: ['terrain', 'grass', 'green', 'natural']
                },
                {
                    id: 'terrain_road',
                    name: 'Road Tile',
                    category: 'terrain',
                    type: 'road',
                    color: 0x333333,
                    description: 'Urban road tile',
                    tags: ['terrain', 'road', 'urban', 'paved']
                }
            ],
            effects: [
                {
                    id: 'effect_water_wave',
                    name: 'Water Wave Effect',
                    category: 'effects',
                    type: 'water',
                    description: 'Animated water wave effect',
                    tags: ['effect', 'water', 'animation', 'shader']
                },
                {
                    id: 'effect_particle_smoke',
                    name: 'Smoke Particle Effect',
                    category: 'effects',
                    type: 'particle',
                    description: 'Smoke particle system',
                    tags: ['effect', 'particle', 'smoke', 'animation']
                },
                {
                    id: 'effect_lighting_sun',
                    name: 'Sun Lighting Effect',
                    category: 'effects',
                    type: 'lighting',
                    description: 'Dynamic sun lighting',
                    tags: ['effect', 'lighting', 'sun', 'dynamic']
                }
            ]
        };
    }

    // Search for assets by query
    searchAssets(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        // Search across all categories
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                // Search by name, description, and tags
                const nameMatch = asset.name.toLowerCase().includes(lowerQuery);
                const descMatch = asset.description.toLowerCase().includes(lowerQuery);
                const tagMatch = asset.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

                if (nameMatch || descMatch || tagMatch) {
                    results.push(asset);
                }
            });
        });

        // Add to search history
        this.addToSearchHistory(query);

        return results;
    }

    // Search assets by category
    searchByCategory(category) {
        if (!this.assetDatabase[category]) {
            return [];
        }
        return this.assetDatabase[category];
    }

    // Search assets by type
    searchByType(type) {
        const results = [];
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                if (asset.type === type) {
                    results.push(asset);
                }
            });
        });
        return results;
    }

    // Search assets by color
    searchByColor(colorHex) {
        const results = [];
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                if (asset.color === colorHex) {
                    results.push(asset);
                }
            });
        });
        return results;
    }

    // Search assets by tag
    searchByTag(tag) {
        const results = [];
        const lowerTag = tag.toLowerCase();
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                if (asset.tags.some(t => t.toLowerCase() === lowerTag)) {
                    results.push(asset);
                }
            });
        });
        return results;
    }

    // Get asset by ID
    getAssetById(assetId) {
        for (const category of Object.values(this.assetDatabase)) {
            const asset = category.find(a => a.id === assetId);
            if (asset) return asset;
        }
        return null;
    }

    // Add asset to favorites
    addToFavorites(assetId) {
        const asset = this.getAssetById(assetId);
        if (asset && !this.favorites.find(a => a.id === assetId)) {
            this.favorites.push(asset);
            return true;
        }
        return false;
    }

    // Remove asset from favorites
    removeFromFavorites(assetId) {
        this.favorites = this.favorites.filter(a => a.id !== assetId);
    }

    // Get all favorites
    getFavorites() {
        return this.favorites;
    }

    // Add to search history
    addToSearchHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            if (this.searchHistory.length > this.maxSearchHistory) {
                this.searchHistory.pop();
            }
        }
    }

    // Get search history
    getSearchHistory() {
        return this.searchHistory;
    }

    // Clear search history
    clearSearchHistory() {
        this.searchHistory = [];
    }

    // Load asset (simulate loading)
    loadAsset(assetId) {
        const asset = this.getAssetById(assetId);
        if (!asset) return null;

        this.loadedAssets.set(assetId, {
            ...asset,
            loadedAt: Date.now(),
            status: 'loaded'
        });

        return this.loadedAssets.get(assetId);
    }

    // Unload asset
    unloadAsset(assetId) {
        return this.loadedAssets.delete(assetId);
    }

    // Get loaded assets
    getLoadedAssets() {
        return Array.from(this.loadedAssets.values());
    }

    // Get asset statistics
    getAssetStats() {
        const stats = {
            totalAssets: 0,
            byCategory: {},
            byType: {},
            loadedCount: this.loadedAssets.size
        };

        Object.entries(this.assetDatabase).forEach(([category, assets]) => {
            stats.byCategory[category] = assets.length;
            stats.totalAssets += assets.length;

            assets.forEach(asset => {
                stats.byType[asset.type] = (stats.byType[asset.type] || 0) + 1;
            });
        });

        return stats;
    }

    // Export asset library
    exportAssetLibrary() {
        return JSON.stringify(this.assetDatabase, null, 2);
    }

    // Get advanced search filters
    getAdvancedSearchFilters() {
        return {
            categories: Object.keys(this.assetDatabase),
            types: this.getAllTypes(),
            colors: this.getAllColors(),
            tags: this.getAllTags()
        };
    }

    // Get all unique types
    getAllTypes() {
        const types = new Set();
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                types.add(asset.type);
            });
        });
        return Array.from(types);
    }

    // Get all unique colors
    getAllColors() {
        const colors = new Set();
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                if (asset.color) colors.add(asset.color);
            });
        });
        return Array.from(colors);
    }

    // Get all unique tags
    getAllTags() {
        const tags = new Set();
        Object.values(this.assetDatabase).forEach(category => {
            category.forEach(asset => {
                asset.tags.forEach(tag => tags.add(tag));
            });
        });
        return Array.from(tags).sort();
    }

    // Create search UI
    createSearchUI() {
        const searchContainer = document.createElement('div');
        searchContainer.id = 'graphics-search';
        searchContainer.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.95) 100%);
            border-radius: 16px;
            padding: 16px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 16px 64px rgba(0,0,0,0.6);
            z-index: 400;
            font-family: 'Segoe UI', sans-serif;
            color: #fff;
        `;

        // Search title
        const title = document.createElement('div');
        title.style.cssText = `
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;
        title.textContent = '🔍 Graphics Asset Search';
        searchContainer.appendChild(title);

        // Search input
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search buildings, vehicles, characters, effects...';
        input.style.cssText = `
            width: 100%;
            padding: 10px 12px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 12px;
            margin-bottom: 12px;
        `;

        // Results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.style.cssText = `
            max-height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        input.addEventListener('input', (e) => {
            const query = e.target.value;
            const results = this.searchAssets(query);
            this.renderSearchResults(resultsContainer, results);
        });

        searchContainer.appendChild(input);
        searchContainer.appendChild(resultsContainer);

        return searchContainer;
    }

    // Render search results
    renderSearchResults(container, results) {
        container.innerHTML = '';

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.style.cssText = `
                text-align: center;
                color: rgba(255,255,255,0.5);
                font-size: 12px;
                padding: 20px;
            `;
            noResults.textContent = 'No results found';
            container.appendChild(noResults);
            return;
        }

        results.forEach(asset => {
            const resultEl = document.createElement('div');
            resultEl.style.cssText = `
                padding: 10px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                border-left: 3px solid ${this.colorToString(asset.color || 0xFFFFFF)};
                cursor: pointer;
                transition: all 0.2s ease;
            `;

            resultEl.addEventListener('mouseover', () => {
                resultEl.style.background = 'rgba(255,255,255,0.1)';
            });

            resultEl.addEventListener('mouseout', () => {
                resultEl.style.background = 'rgba(255,255,255,0.05)';
            });

            const nameEl = document.createElement('div');
            nameEl.style.cssText = `
                font-weight: 700;
                font-size: 12px;
                color: #FFD700;
            `;
            nameEl.textContent = asset.name;
            resultEl.appendChild(nameEl);

            const descEl = document.createElement('div');
            descEl.style.cssText = `
                font-size: 11px;
                color: rgba(255,255,255,0.7);
                margin-top: 4px;
            `;
            descEl.textContent = asset.description;
            resultEl.appendChild(descEl);

            container.appendChild(resultEl);
        });
    }

    // Convert hex color to RGB string
    colorToString(hex) {
        const r = (hex >> 16) & 255;
        const g = (hex >> 8) & 255;
        const b = hex & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }
}

export { GraphicsSearchSystem };
