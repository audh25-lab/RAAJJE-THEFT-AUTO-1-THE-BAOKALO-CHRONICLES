// player-physics.js
// Comprehensive Player Physics and Collision Detection System



class PlayerPhysics {
    constructor(scene, voxelWorld) {
        this.scene = scene;
        this.voxelWorld = voxelWorld;
        
        // Player properties
        this.position = new THREE.Vector3(0, 1, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);
        
        // Physics parameters
        this.mass = 1.0;
        this.friction = 0.95;
        this.acceleration_factor = 0.5;
        this.max_speed = 0.3;
        this.sprint_multiplier = 1.5;
        this.gravity = -0.01;
        this.jump_force = 0.2;
        
        // State
        this.isGrounded = false;
        this.isSprinting = false;
        this.isJumping = false;
        this.canJump = true;
        
        // Collision
        this.collisionRadius = 0.4;
        this.collisionHeight = 1.8;
        this.collisionBoxes = [];
        
        // Input
        this.inputVector = new THREE.Vector3(0, 0, 0);
        this.camera_offset = new THREE.Vector3(50, 50, 50);
    }

    // Update player position and physics
    update(delta, inputKeys, camera) {
        // Apply gravity
        if (!this.isGrounded) {
            this.velocity.y += this.gravity;
        }

        // Get input
        this.inputVector.set(0, 0, 0);
        if (inputKeys['w'] || inputKeys['arrowup']) this.inputVector.z -= 1;
        if (inputKeys['s'] || inputKeys['arrowdown']) this.inputVector.z += 1;
        if (inputKeys['a'] || inputKeys['arrowleft']) this.inputVector.x -= 1;
        if (inputKeys['d'] || inputKeys['arrowright']) this.inputVector.x += 1;

        // Normalize input
        if (this.inputVector.length() > 0) {
            this.inputVector.normalize();
        }

        // Check sprint
        this.isSprinting = inputKeys['shift'];
        const speedMultiplier = this.isSprinting ? this.sprint_multiplier : 1.0;

        // Apply acceleration
        const targetSpeed = this.max_speed * speedMultiplier;
        this.velocity.x = this.inputVector.x * targetSpeed;
        this.velocity.z = this.inputVector.z * targetSpeed;

        // Apply friction
        this.velocity.x *= this.friction;
        this.velocity.z *= this.friction;

        // Check for collisions before moving
        const newPosition = this.position.clone().add(this.velocity);
        
        if (!this.checkCollision(newPosition)) {
            this.position.copy(newPosition);
        } else {
            // Try sliding along collision
            const slideX = this.position.clone();
            slideX.x += this.velocity.x;
            if (!this.checkCollision(slideX)) {
                this.position.copy(slideX);
            }

            const slideZ = this.position.clone();
            slideZ.z += this.velocity.z;
            if (!this.checkCollision(slideZ)) {
                this.position.copy(slideZ);
            }
        }

        // Check if grounded
        const groundCheck = this.position.clone();
        groundCheck.y -= 0.1;
        this.isGrounded = this.checkCollision(groundCheck) || this.position.y <= 0;

        // Reset velocity if grounded
        if (this.isGrounded && this.velocity.y < 0) {
            this.velocity.y = 0;
        }

        // Handle jumping
        if (inputKeys[' '] && this.canJump && this.isGrounded) {
            this.velocity.y = this.jump_force;
            this.isGrounded = false;
            this.canJump = false;
        } else if (!inputKeys[' ']) {
            this.canJump = true;
        }

        // Update camera to follow player
        if (camera) {
            const targetCameraPos = this.position.clone().add(this.camera_offset);
            camera.position.lerp(targetCameraPos, 0.1);
            camera.lookAt(this.position);
        }

        // Clamp position to world bounds
        this.position.x = Math.max(-100, Math.min(100, this.position.x));
        this.position.z = Math.max(-100, Math.min(100, this.position.z));
        this.position.y = Math.max(0, this.position.y);
    }

    // Check collision at a given position
    checkCollision(position) {
        // Check collision with voxel world
        if (this.voxelWorld && this.voxelWorld.voxels) {
            for (const voxel of this.voxelWorld.voxels) {
                if (voxel.type === 'building' || voxel.type === 'window') {
                    if (this.checkVoxelCollision(position, voxel)) {
                        return true;
                    }
                }
            }
        }

        // Check collision with collision boxes (buildings, obstacles)
        for (const box of this.collisionBoxes) {
            if (this.checkBoxCollision(position, box)) {
                return true;
            }
        }

        return false;
    }

    // Check collision with a single voxel
    checkVoxelCollision(position, voxel) {
        const voxelSize = 1.0;
        const voxelPos = new THREE.Vector3(voxel.x * voxelSize, voxel.y * voxelSize, voxel.z * voxelSize);
        
        // Simple AABB collision
        return (
            Math.abs(position.x - voxelPos.x) < this.collisionRadius + voxelSize / 2 &&
            Math.abs(position.y - voxelPos.y) < this.collisionHeight / 2 &&
            Math.abs(position.z - voxelPos.z) < this.collisionRadius + voxelSize / 2
        );
    }

    // Check collision with a bounding box
    checkBoxCollision(position, box) {
        return (
            position.x > box.min.x && position.x < box.max.x &&
            position.y > box.min.y && position.y < box.max.y &&
            position.z > box.min.z && position.z < box.max.z
        );
    }

    // Add a collision box (for buildings, obstacles)
    addCollisionBox(min, max) {
        this.collisionBoxes.push({ min, max });
    }

    // Clear collision boxes
    clearCollisionBoxes() {
        this.collisionBoxes = [];
    }

    // Get player position
    getPosition() {
        return this.position.clone();
    }

    // Set player position
    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    // Get player velocity
    getVelocity() {
        return this.velocity.clone();
    }

    // Get player speed
    getSpeed() {
        return Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
    }

    // Check if player is moving
    isMoving() {
        return this.getSpeed() > 0.01;
    }

    // Get player state
    getState() {
        return {
            position: this.position.clone(),
            velocity: this.velocity.clone(),
            speed: this.getSpeed(),
            isGrounded: this.isGrounded,
            isSprinting: this.isSprinting,
            isJumping: this.isJumping,
            isMoving: this.isMoving()
        };
    }
}

export { PlayerPhysics };
