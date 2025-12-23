// voxel-renderer.js
// Voxel-based rendering system with pixel art styling for Maldivian game

import * as THREE from 'three';

class VoxelRenderer {
    constructor(scene, voxelSize = 1.0) {
        this.scene = scene;
        this.voxelSize = voxelSize;
        this.voxelMeshes = [];
        this.palette = {
            grass: 0x32CD32,
            sand: 0xF4A460,
            water: 0x1E90FF,
            road: 0x696969,
            building: 0xFFFFFF,
            roof: 0x8B4513,
            palm_trunk: 0x8B4513,
            palm_leaves: 0x228B22
        };
        
        // Pixel art shader parameters
        this.pixelShader = {
            uniforms: {
                "tDiffuse": { value: null },
                "resolution": { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                "pixelSize": { value: 4.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec2 resolution;
                uniform float pixelSize;
                varying vec2 vUv;
                void main() {
                    vec2 dxy = pixelSize / resolution;
                    vec2 pixelCoord = dxy * floor(vUv / dxy);
                    gl_FragColor = texture2D(tDiffuse, pixelCoord);
                }
            `
        };
    }

    // Create a voxel block (single cube)
    createVoxelBlock(x, y, z, colorHex, size = this.voxelSize) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshLambertMaterial({
            color: colorHex,
            flatShading: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x * size, y * size, z * size);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.voxelMeshes.push(mesh);
        return mesh;
    }

    // Create a building from voxels
    createBuilding(x, z, width, depth, height, color, roofColor) {
        const buildingGroup = new THREE.Group();
        
        // Walls
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                for (let k = 0; k < depth; k++) {
                    // Only create outer shell for performance
                    if (i === 0 || i === width - 1 || k === 0 || k === depth - 1) {
                        const voxel = this.createVoxelBlock(
                            x + i,
                            j,
                            z + k,
                            color
                        );
                        buildingGroup.add(voxel);
                    }
                }
            }
        }

        // Roof
        for (let i = 0; i < width; i++) {
            for (let k = 0; k < depth; k++) {
                const roofVoxel = this.createVoxelBlock(
                    x + i,
                    height,
                    z + k,
                    roofColor
                );
                buildingGroup.add(roofVoxel);
            }
        }

        return buildingGroup;
    }

    // Create a palm tree
    createPalmTree(x, z) {
        const treeGroup = new THREE.Group();
        const trunkHeight = 4 + Math.floor(Math.random() * 3);

        // Trunk
        for (let i = 0; i < trunkHeight; i++) {
            const trunk = this.createVoxelBlock(x, i, z, this.palette.palm_trunk);
            treeGroup.add(trunk);
        }

        // Leaves
        const leafPositions = [
            [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1],
            [2, -1, 0], [-2, -1, 0], [0, -1, 2], [0, -1, -2]
        ];

        leafPositions.forEach(pos => {
            const leaf = this.createVoxelBlock(
                x + pos[0],
                trunkHeight - 1 + pos[1],
                z + pos[2],
                this.palette.palm_leaves
            );
            treeGroup.add(leaf);
        });

        return treeGroup;
    }

    // Create a Dhoni (Maldivian boat)
    createDhoni(x, z, color) {
        const dhoniGroup = new THREE.Group();
        const length = 5;
        const width = 3;

        // Hull
        for (let i = 0; i < length; i++) {
            for (let k = 0; k < width; k++) {
                // Tapered ends
                if ((i === 0 || i === length - 1) && (k === 0 || k === width - 1)) continue;
                
                const hull = this.createVoxelBlock(x + i, 0.2, z + k, color);
                dhoniGroup.add(hull);
            }
        }

        // Mast
        for (let j = 1; j < 4; j++) {
            const mast = this.createVoxelBlock(x + 2, j, z + 1, 0x8B4513);
            dhoniGroup.add(mast);
        }

        return dhoniGroup;
    }

    // Create terrain tile
    createTerrainTile(x, z, type) {
        let color;
        let y = 0;

        switch (type) {
            case 'grass': color = this.palette.grass; break;
            case 'sand': color = this.palette.sand; break;
            case 'water': color = this.palette.water; y = -0.5; break;
            case 'road': color = this.palette.road; y = 0.05; break;
            default: color = 0xCCCCCC;
        }

        const tile = this.createVoxelBlock(x, y, z, color);
        this.scene.add(tile);
        return tile;
    }

    // Create character
    createCharacter(x, y, z, color) {
        const charGroup = new THREE.Group();
        
        // Body
        const body = this.createVoxelBlock(0, 1, 0, color);
        charGroup.add(body);
        
        // Head
        const head = this.createVoxelBlock(0, 2, 0, 0xFFDAB9);
        charGroup.add(head);
        
        // Legs
        const legL = this.createVoxelBlock(-0.3, 0, 0, 0x000080, 0.4);
        const legR = this.createVoxelBlock(0.3, 0, 0, 0x000080, 0.4);
        charGroup.add(legL);
        charGroup.add(legR);

        charGroup.position.set(x, y, z);
        return charGroup;
    }

    // Clear all voxels
    clear() {
        this.voxelMeshes.forEach(mesh => {
            this.scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
        });
        this.voxelMeshes = [];
    }
}

export { VoxelRenderer };
