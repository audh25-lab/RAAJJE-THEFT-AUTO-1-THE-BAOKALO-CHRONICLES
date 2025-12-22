// voxel-renderer.js
// Voxel-based rendering system with pixel art styling for Maldivian game

// THREE is loaded globally via CDN in maldives-complete.html

class VoxelRenderer {
    constructor(scene, voxelSize = 1.0) {
        this.scene = scene;
        this.voxelSize = voxelSize;
        this.voxelMeshes = [];
        this.colorPalette = this.initializeMaldivianColorPalette();
        this.pixelArtShader = this.createPixelArtShader();
    }

    // Initialize Maldivian tropical color palette
    initializeMaldivianColorPalette() {
        return {
            // Building colors
            residentialPink: 0xFF1493,      // Hot pink
            residentialBlue: 0x0077BE,      // Ocean blue
            residentialGreen: 0x00FF00,     // Lime green
            residentialOrange: 0xFF8C00,    // Dark orange
            residentialYellow: 0xFFFF00,    // Bright yellow
            
            // Structural colors
            roofRed: 0xFF6B35,              // Terracotta red
            roofBrown: 0x8B4513,            // Saddle brown
            wallWhite: 0xF5F5F5,            // Off-white
            wallCream: 0xFFF8DC,            // Cornsilk
            
            // Natural colors
            waterBlue: 0x0077BE,            // Ocean blue
            sandYellow: 0xF4D03F,           // Sand yellow
            grassGreen: 0x228B22,           // Forest green
            palmGreen: 0x32CD32,            // Lime green
            
            // Vehicle colors
            dhoniBlue: 0x1E90FF,            // Dodger blue
            dhoniGreen: 0x00CED1,           // Dark turquoise
            taxiYellow: 0xFFD700,           // Gold
            
            // UI colors
            neonPink: 0xFF69B4,             // Hot pink
            neonGreen: 0x39FF14,            // Neon green
            neonBlue: 0x00D9FF,             // Neon blue
            
            // Neutral colors
            black: 0x000000,
            darkGray: 0x333333,
            gray: 0x808080,
            lightGray: 0xCCCCCC,
            white: 0xFFFFFF
        };
    }

    // Create pixel art shader for upscaling effect
    createPixelArtShader() {
        return {
            uniforms: {
                texture: { value: null },
                pixelSize: { value: 2.0 },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D texture;
                uniform float pixelSize;
                uniform vec2 resolution;
                varying vec2 vUv;
                
                void main() {
                    vec2 pixelCoord = floor(vUv * resolution / pixelSize) * pixelSize / resolution;
                    gl_FragColor = texture2D(texture, pixelCoord);
                }
            `
        };
    }

    // Create a voxel block (single cube)
    createVoxelBlock(x, y, z, colorHex, size = this.voxelSize) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({
            color: colorHex,
            metalness: 0.1,
            roughness: 0.8,
            flatShading: true // Important for pixel art look
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x * size, y * size, z * size);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.voxelMeshes.push(mesh);
        return mesh;
    }

    // Create a building from voxel blocks
    createBuilding(x, z, width, depth, height, colorHex, roofColor = 0xFF6B35) {
        const building = new THREE.Group();
        
        // Create walls
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < depth; j++) {
                for (let k = 0; k < height; k++) {
                    // Only create voxels on the edges (hollow building)
                    if (i === 0 || i === width - 1 || j === 0 || j === depth - 1 || k === height - 1) {
                        const voxel = this.createVoxelBlock(
                            x + i, 
                            k, 
                            z + j, 
                            colorHex, 
                            this.voxelSize
                        );
                        building.add(voxel);
                    }
                }
            }
        }
        
        // Create roof
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < depth; j++) {
                const voxel = this.createVoxelBlock(
                    x + i, 
                    height, 
                    z + j, 
                    roofColor, 
                    this.voxelSize
                );
                building.add(voxel);
            }
        }
        
        return building;
    }

    // Create windows on a building face
    createWindowsOnFace(buildingGroup, faceX, faceZ, height, windowColor = 0xFFFF00) {
        const windowSpacing = 2;
        const windowSize = 1;
        
        for (let y = 1; y < height; y += windowSpacing) {
            const windowVoxel = this.createVoxelBlock(
                faceX, 
                y, 
                faceZ, 
                windowColor, 
                this.voxelSize * 0.8
            );
            buildingGroup.add(windowVoxel);
        }
    }

    // Create a dhoni (traditional boat)
    createDhoni(x, z, color = 0x1E90FF) {
        const dhoni = new THREE.Group();
        
        // Hull (boat body)
        const hullLength = 8;
        const hullWidth = 3;
        const hullHeight = 2;
        
        for (let i = 0; i < hullLength; i++) {
            for (let j = 0; j < hullWidth; j++) {
                for (let k = 0; k < hullHeight; k++) {
                    const voxel = this.createVoxelBlock(
                        x + i - hullLength / 2, 
                        k - 1, 
                        z + j - hullWidth / 2, 
                        color, 
                        this.voxelSize
                    );
                    dhoni.add(voxel);
                }
            }
        }
        
        // Cabin
        const cabinLength = 3;
        const cabinWidth = 2;
        const cabinHeight = 2;
        
        for (let i = 0; i < cabinLength; i++) {
            for (let j = 0; j < cabinWidth; j++) {
                for (let k = 0; k < cabinHeight; k++) {
                    const voxel = this.createVoxelBlock(
                        x + i - cabinLength / 2, 
                        hullHeight + k, 
                        z + j - cabinWidth / 2, 
                        0xFFFFFF, 
                        this.voxelSize
                    );
                    dhoni.add(voxel);
                }
            }
        }
        
        // Mast
        const mastVoxel = this.createVoxelBlock(
            x, 
            hullHeight + cabinHeight, 
            z, 
            0x8B4513, 
            this.voxelSize * 0.5
        );
        dhoni.add(mastVoxel);
        
        return dhoni;
    }

    // Create a character voxel model
    createCharacter(x, y, z, skinColor = 0xD2691E) {
        const character = new THREE.Group();
        
        // Head
        const headVoxel = this.createVoxelBlock(x, y + 3, z, skinColor, this.voxelSize);
        character.add(headVoxel);
        
        // Body
        for (let i = 0; i < 2; i++) {
            const bodyVoxel = this.createVoxelBlock(x, y + 2 - i, z, 0x1E90FF, this.voxelSize);
            character.add(bodyVoxel);
        }
        
        // Arms
        const leftArmVoxel = this.createVoxelBlock(x - 1, y + 2, z, skinColor, this.voxelSize);
        const rightArmVoxel = this.createVoxelBlock(x + 1, y + 2, z, skinColor, this.voxelSize);
        character.add(leftArmVoxel);
        character.add(rightArmVoxel);
        
        // Legs
        const leftLegVoxel = this.createVoxelBlock(x - 0.5, y, z, 0x333333, this.voxelSize);
        const rightLegVoxel = this.createVoxelBlock(x + 0.5, y, z, 0x333333, this.voxelSize);
        character.add(leftLegVoxel);
        character.add(rightLegVoxel);
        
        return character;
    }

    // Create terrain tiles
    createTerrainTile(x, z, type = 'grass') {
        let colorHex;
        
        switch (type) {
            case 'water':
                colorHex = this.colorPalette.waterBlue;
                break;
            case 'sand':
                colorHex = this.colorPalette.sandYellow;
                break;
            case 'road':
                colorHex = this.colorPalette.darkGray;
                break;
            case 'grass':
            default:
                colorHex = this.colorPalette.grassGreen;
                break;
        }
        
        const tile = this.createVoxelBlock(x, -1, z, colorHex, this.voxelSize);
        return tile;
    }

    // Create a palm tree
    createPalmTree(x, z) {
        const tree = new THREE.Group();
        
        // Trunk
        for (let i = 0; i < 3; i++) {
            const trunkVoxel = this.createVoxelBlock(x, i, z, 0x8B4513, this.voxelSize);
            tree.add(trunkVoxel);
        }
        
        // Foliage (crown)
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                if (Math.sqrt(i * i + j * j) <= 2) {
                    const foliageVoxel = this.createVoxelBlock(
                        x + i, 
                        3, 
                        z + j, 
                        this.colorPalette.palmGreen, 
                        this.voxelSize
                    );
                    tree.add(foliageVoxel);
                }
            }
        }
        
        return tree;
    }

    // Merge voxel meshes for performance
    mergeVoxelMeshes() {
        const geometries = [];
        const materials = [];
        
        this.voxelMeshes.forEach(mesh => {
            geometries.push(mesh.geometry);
            materials.push(mesh.material);
        });
        
        // This is a simplified approach; for production, use THREE.BufferGeometryUtils.mergeGeometries
        // and create a single merged mesh
    }

    // Apply pixel art post-processing effect
    applyPixelArtEffect(renderer, scene, camera) {
        // Create render target for pixel art effect
        const pixelRenderTarget = new THREE.WebGLRenderTarget(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
        
        // Render scene to render target
        renderer.setRenderTarget(pixelRenderTarget);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        
        return pixelRenderTarget;
    }

    // Get color from palette by name
    getColor(colorName) {
        return this.colorPalette[colorName] || this.colorPalette.white;
    }

    // Create a complete city block
    createCityBlock(centerX, centerZ, blockSize = 10) {
        const block = new THREE.Group();
        
        // Create buildings in a grid
        const buildingSize = 3;
        const spacing = 1;
        
        for (let i = 0; i < blockSize; i += buildingSize + spacing) {
            for (let j = 0; j < blockSize; j += buildingSize + spacing) {
                const buildingHeight = Math.floor(Math.random() * 4) + 3;
                const colorIndex = Math.floor(Math.random() * 5);
                const colors = [
                    this.colorPalette.residentialPink,
                    this.colorPalette.residentialBlue,
                    this.colorPalette.residentialGreen,
                    this.colorPalette.residentialOrange,
                    this.colorPalette.residentialYellow
                ];
                
                const building = this.createBuilding(
                    centerX + i,
                    centerZ + j,
                    buildingSize,
                    buildingSize,
                    buildingHeight,
                    colors[colorIndex],
                    this.colorPalette.roofRed
                );
                block.add(building);
            }
        }
        
        return block;
    }
}

export { VoxelRenderer };
