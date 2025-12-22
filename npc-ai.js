// npc-ai.js
// Comprehensive NPC AI System with Pathfinding and Behavior Trees



class NPC {
    constructor(id, name, position, type = 'civilian') {
        this.id = id;
        this.name = name;
        this.position = position.clone();
        this.type = type; // 'civilian', 'vendor', 'fisherman', 'guard', etc.
        
        // AI state
        this.state = 'idle'; // idle, walking, working, talking, fleeing
        this.currentBehavior = null;
        this.target = null;
        this.path = [];
        this.pathIndex = 0;
        
        // Physics
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.speed = 0.1;
        this.direction = new THREE.Vector3(0, 0, 1);
        
        // Behavior parameters
        this.idleTime = 0;
        this.idleDuration = Math.random() * 5 + 2;
        this.walkDistance = Math.random() * 20 + 10;
        
        // Interaction
        this.isInteracting = false;
        this.interactionRadius = 2;
        this.dialogueIndex = 0;
    }

    // Update NPC behavior
    update(delta, world, player) {
        // Update idle timer
        if (this.state === 'idle') {
            this.idleTime += delta;
            if (this.idleTime > this.idleDuration) {
                this.startWalking();
            }
        }

        // Update walking
        if (this.state === 'walking') {
            this.updateWalking(delta, world);
        }

        // Check if player is nearby for interaction
        const distanceToPlayer = this.position.distanceTo(player.position);
        if (distanceToPlayer < this.interactionRadius) {
            this.state = 'talking';
        } else if (this.state === 'talking') {
            this.state = 'idle';
        }

        // Apply physics
        this.position.add(this.velocity);
    }

    // Start walking behavior
    startWalking() {
        this.state = 'walking';
        this.idleTime = 0;
        
        // Generate random walk target
        const angle = Math.random() * Math.PI * 2;
        const distance = this.walkDistance;
        this.target = new THREE.Vector3(
            this.position.x + Math.cos(angle) * distance,
            this.position.y,
            this.position.z + Math.sin(angle) * distance
        );
        
        // Generate path using simple A* or waypoint system
        this.generatePath();
    }

    // Generate path to target
    generatePath() {
        this.path = [];
        this.pathIndex = 0;
        
        // Simple straight-line path with waypoints
        const direction = this.target.clone().sub(this.position).normalize();
        const distance = this.position.distanceTo(this.target);
        const steps = Math.ceil(distance / 2);
        
        for (let i = 1; i <= steps; i++) {
            const waypoint = this.position.clone().add(
                direction.clone().multiplyScalar((i / steps) * distance)
            );
            this.path.push(waypoint);
        }
    }

    // Update walking behavior
    updateWalking(delta, world) {
        if (this.pathIndex >= this.path.length) {
            this.state = 'idle';
            this.idleTime = 0;
            this.velocity.set(0, 0, 0);
            return;
        }

        const currentWaypoint = this.path[this.pathIndex];
        const direction = currentWaypoint.clone().sub(this.position).normalize();
        
        // Move towards waypoint
        this.velocity = direction.multiplyScalar(this.speed);
        
        // Check if reached waypoint
        if (this.position.distanceTo(currentWaypoint) < 0.5) {
            this.pathIndex++;
        }
    }

    // Get dialogue for this NPC
    getDialogue() {
        const dialogues = {
            fisherman: [
                "Welcome to Malé! Have you seen any dhonis?",
                "The fishing is good today. Would you like to join me?",
                "The sea is calling. Are you interested in a fishing quest?",
                "I've been fishing here for 20 years. This is my home.",
                "The weather looks perfect for sailing. Want to go out?"
            ],
            vendor: [
                "Welcome to my shop! What can I get for you?",
                "Fresh fish, spices, and local goods. Everything you need!",
                "Have you tried our local coconut drinks?",
                "Business is good today. Many tourists visiting.",
                "I have special deals on Maldivian crafts!"
            ],
            civilian: [
                "Hello there! Nice to see you.",
                "How are you doing today?",
                "The weather is beautiful, isn't it?",
                "Have you explored the island yet?",
                "Welcome to Malé!"
            ],
            guard: [
                "State your business here.",
                "This area is restricted. Move along.",
                "Everything is secure here.",
                "I'm watching you.",
                "No trouble here on my watch."
            ]
        };

        const typeDialogues = dialogues[this.type] || dialogues.civilian;
        return typeDialogues[this.dialogueIndex % typeDialogues.length];
    }

    // Get NPC state
    getState() {
        return {
            id: this.id,
            name: this.name,
            position: this.position.clone(),
            type: this.type,
            state: this.state,
            speed: this.speed,
            isInteracting: this.isInteracting
        };
    }
}

class NPCManager {
    constructor(scene) {
        this.scene = scene;
        this.npcs = [];
        this.npcMeshes = new Map();
    }

    // Create an NPC
    createNPC(id, name, position, type = 'civilian') {
        const npc = new NPC(id, name, position, type);
        this.npcs.push(npc);
        
        // Create visual representation
        this.createNPCMesh(npc);
        
        return npc;
    }

    // Create visual mesh for NPC
    createNPCMesh(npc) {
        // Simple voxel character representation
        const geometry = new THREE.BoxGeometry(0.5, 1.8, 0.5);
        const material = new THREE.MeshStandardMaterial({
            color: this.getColorForType(npc.type),
            roughness: 0.8,
            metalness: 0.2
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(npc.position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        this.scene.add(mesh);
        this.npcMeshes.set(npc.id, mesh);
    }

    // Get color for NPC type
    getColorForType(type) {
        const colors = {
            fisherman: 0x8B4513,
            vendor: 0xFF69B4,
            civilian: 0xD2691E,
            guard: 0x333333,
            tourist: 0xE8B4A0
        };
        return colors[type] || 0xD2691E;
    }

    // Update all NPCs
    updateNPCs(delta, world, player) {
        this.npcs.forEach(npc => {
            npc.update(delta, world, player);
            
            // Update mesh position
            const mesh = this.npcMeshes.get(npc.id);
            if (mesh) {
                mesh.position.copy(npc.position);
            }
        });
    }

    // Get NPC by ID
    getNPCById(id) {
        return this.npcs.find(npc => npc.id === id);
    }

    // Get NPCs within radius
    getNPCsInRadius(position, radius) {
        return this.npcs.filter(npc => npc.position.distanceTo(position) < radius);
    }

    // Get all NPCs
    getAllNPCs() {
        return this.npcs;
    }

    // Remove NPC
    removeNPC(id) {
        const index = this.npcs.findIndex(npc => npc.id === id);
        if (index !== -1) {
            const npc = this.npcs[index];
            const mesh = this.npcMeshes.get(id);
            if (mesh) {
                this.scene.remove(mesh);
                this.npcMeshes.delete(id);
            }
            this.npcs.splice(index, 1);
        }
    }

    // Clear all NPCs
    clearNPCs() {
        this.npcs.forEach(npc => {
            const mesh = this.npcMeshes.get(npc.id);
            if (mesh) {
                this.scene.remove(mesh);
            }
        });
        this.npcs = [];
        this.npcMeshes.clear();
    }

    // Get NPC statistics
    getStats() {
        const stats = {
            total: this.npcs.length,
            byType: {}
        };

        this.npcs.forEach(npc => {
            stats.byType[npc.type] = (stats.byType[npc.type] || 0) + 1;
        });

        return stats;
    }
}

export { NPC, NPCManager };
