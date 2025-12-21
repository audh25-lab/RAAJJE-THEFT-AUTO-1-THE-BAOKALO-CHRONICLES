// isometric-renderer.js
// True Isometric Projection and 3D Map Geometry

import * as THREE from 'three';

class IsometricRenderer {
    constructor(scene, mapSize = 100, tileSize = 5) {
        this.scene = scene;
        this.mapSize = mapSize;
        this.tileSize = tileSize;
        this.mapData = [];
        this.meshes = {};
        this.buildingMeshes = [];
        
        this.generateMapData();
        this.renderMap();
    }

    // Generate a simple procedural map
    generateMapData() {
        this.mapData = [];
        for (let x = 0; x < this.mapSize; x++) {
            this.mapData[x] = [];
            for (let z = 0; z < this.mapSize; z++) {
                const distance = Math.sqrt(
                    Math.pow(x - this.mapSize / 2, 2) + Math.pow(z - this.mapSize / 2, 2)
                );
                
                // Determine tile type based on distance from center
                let tileType = 'grass';
                let height = 0;
                
                if (distance < 10) {
                    tileType = 'road';
                    height = 0;
                } else if (distance < 20) {
                    tileType = 'building';
                    height = Math.random() * 4 + 2; // Buildings have random heights 2-6 units
                } else if (distance < 35) {
                    tileType = 'grass';
                    height = 0;
                } else {
                    tileType = 'water';
                    height = -1;
                }
                
                this.mapData[x][z] = {
                    type: tileType,
                    height: height,
                    x: x,
                    z: z
                };
            }
        }
    }

    // Render the entire map
    renderMap() {
        for (let x = 0; x < this.mapSize; x++) {
            for (let z = 0; z < this.mapSize; z++) {
                const tile = this.mapData[x][z];
                this.renderTile(tile);
            }
        }
    }

    // Render an individual tile
    renderTile(tile) {
        const { x, z, type, height } = tile;
        const worldX = (x - this.mapSize / 2) * this.tileSize;
        const worldZ = (z - this.mapSize / 2) * this.tileSize;

        switch (type) {
            case 'water':
                this.renderWater(worldX, worldZ);
                break;
            case 'road':
                this.renderRoad(worldX, worldZ);
                break;
            case 'grass':
                this.renderGrass(worldX, worldZ);
                break;
            case 'building':
                this.renderBuilding(worldX, worldZ, height);
                break;
        }
    }

    renderWater(x, z) {
        const geometry = new THREE.PlaneGeometry(this.tileSize, this.tileSize);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0077be,
            metalness: 0.3,
            roughness: 0.4
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, -0.5, z);
        this.scene.add(mesh);
    }

    renderRoad(x, z) {
        const geometry = new THREE.PlaneGeometry(this.tileSize, this.tileSize);
        const material = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.1,
            roughness: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, 0, z);
        this.scene.add(mesh);

        // Add road markings
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array([
            -this.tileSize / 2, 0.01, 0,
            this.tileSize / 2, 0.01, 0
        ]);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.position.set(x, 0, z);
        this.scene.add(line);
    }

    renderGrass(x, z) {
        const geometry = new THREE.PlaneGeometry(this.tileSize, this.tileSize);
        const material = new THREE.MeshStandardMaterial({
            color: 0x228b22,
            metalness: 0,
            roughness: 1
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, 0, z);
        this.scene.add(mesh);
    }

    renderBuilding(x, z, height) {
        // Building body
        const geometry = new THREE.BoxGeometry(this.tileSize * 0.8, height, this.tileSize * 0.8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x8b7355,
            metalness: 0.2,
            roughness: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, height / 2, z);
        this.scene.add(mesh);
        this.buildingMeshes.push(mesh);

        // Building roof
        const roofGeometry = new THREE.ConeGeometry(this.tileSize * 0.5, this.tileSize * 0.3, 4);
        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b35,
            metalness: 0.1,
            roughness: 0.7
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.set(x, height + this.tileSize * 0.15, z);
        roof.rotation.y = Math.PI / 4;
        this.scene.add(roof);

        // Add windows to the building
        this.addWindowsToBuilding(mesh, height);
    }

    addWindowsToBuilding(buildingMesh, height) {
        const windowSize = 0.3;
        const windowSpacing = 0.6;
        const numWindows = Math.floor(height / windowSpacing);

        for (let i = 0; i < numWindows; i++) {
            const windowGeometry = new THREE.PlaneGeometry(windowSize, windowSize);
            const windowMaterial = new THREE.MeshStandardMaterial({
                color: 0xffff00,
                emissive: 0xffff00,
                emissiveIntensity: 0.3
            });
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            window.position.set(
                buildingMesh.position.x + this.tileSize * 0.35,
                buildingMesh.position.y - height / 2 + (i + 0.5) * windowSpacing,
                buildingMesh.position.z
            );
            this.scene.add(window);
        }
    }

    // Update a specific tile (for dynamic changes)
    updateTile(x, z, newType, newHeight = 0) {
        if (x >= 0 && x < this.mapSize && z >= 0 && z < this.mapSize) {
            this.mapData[x][z].type = newType;
            this.mapData[x][z].height = newHeight;
            
            // Remove old mesh and re-render
            const tile = this.mapData[x][z];
            this.renderTile(tile);
        }
    }

    // Get tile information at world coordinates
    getTileAtWorldPosition(worldX, worldZ) {
        const mapX = Math.floor(worldX / this.tileSize + this.mapSize / 2);
        const mapZ = Math.floor(worldZ / this.tileSize + this.mapSize / 2);
        
        if (mapX >= 0 && mapX < this.mapSize && mapZ >= 0 && mapZ < this.mapSize) {
            return this.mapData[mapX][mapZ];
        }
        return null;
    }
}

export { IsometricRenderer };
