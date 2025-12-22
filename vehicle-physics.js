// vehicle-physics.js
// Vehicle Physics and Control System for Dhoni Boats and Motorcycles

class Vehicle {
    constructor(id, type, position) {
        this.id = id;
        this.type = type; // 'dhoni', 'motorcycle', 'speedboat'
        this.position = position.clone();
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.rotation = 0;
        
        // Vehicle properties based on type
        this.properties = this.getVehicleProperties(type);
        
        // Control input
        this.throttle = 0;
        this.steering = 0;
        this.brake = 0;
        
        // State
        this.isEngineOn = false;
        this.fuel = this.properties.maxFuel;
        this.health = 100;
        this.occupants = [];
    }

    getVehicleProperties(type) {
        const properties = {
            dhoni: {
                name: 'Traditional Dhoni Boat',
                maxSpeed: 0.15,
                acceleration: 0.02,
                deceleration: 0.01,
                turnSpeed: 0.05,
                mass: 2.0,
                drag: 0.98,
                maxFuel: 100,
                fuelConsumption: 0.5,
                width: 3,
                length: 5,
                height: 2
            },
            motorcycle: {
                name: 'Local Motorcycle',
                maxSpeed: 0.4,
                acceleration: 0.08,
                deceleration: 0.05,
                turnSpeed: 0.1,
                mass: 0.5,
                drag: 0.95,
                maxFuel: 50,
                fuelConsumption: 1.0,
                width: 1,
                length: 2,
                height: 1
            },
            speedboat: {
                name: 'Speed Boat',
                maxSpeed: 0.3,
                acceleration: 0.06,
                deceleration: 0.02,
                turnSpeed: 0.08,
                mass: 1.5,
                drag: 0.96,
                maxFuel: 80,
                fuelConsumption: 1.5,
                width: 2,
                length: 4,
                height: 1.5
            }
        };

        return properties[type] || properties.dhoni;
    }

    // Update vehicle physics
    update(delta, inputKeys) {
        if (!this.isEngineOn) {
            this.velocity.multiplyScalar(this.properties.drag * 0.5);
            return;
        }

        // Get input
        this.throttle = 0;
        this.steering = 0;
        this.brake = 0;

        if (inputKeys['w'] || inputKeys['arrowup']) this.throttle = 1;
        if (inputKeys['s'] || inputKeys['arrowdown']) this.brake = 1;
        if (inputKeys['a'] || inputKeys['arrowleft']) this.steering = -1;
        if (inputKeys['d'] || inputKeys['arrowright']) this.steering = 1;

        // Apply throttle and braking
        const targetSpeed = this.throttle * this.properties.maxSpeed;
        const speedDifference = targetSpeed - this.velocity.length();
        const acceleration = this.throttle > 0 ? this.properties.acceleration : -this.properties.deceleration;

        const velocityDirection = this.velocity.clone().normalize();
        if (this.velocity.length() > 0) {
            this.velocity.add(velocityDirection.multiplyScalar(acceleration * this.throttle));
        } else if (this.throttle > 0) {
            const direction = new THREE.Vector3(Math.sin(this.rotation), 0, Math.cos(this.rotation));
            this.velocity.add(direction.multiplyScalar(acceleration));
        }

        // Apply braking
        if (this.brake > 0) {
            this.velocity.multiplyScalar(1 - this.properties.deceleration * this.brake);
        }

        // Limit speed
        if (this.velocity.length() > this.properties.maxSpeed) {
            this.velocity.normalize().multiplyScalar(this.properties.maxSpeed);
        }

        // Apply steering
        if (this.velocity.length() > 0.01) {
            this.rotation += this.steering * this.properties.turnSpeed * (this.velocity.length() / this.properties.maxSpeed);
        }

        // Update velocity direction based on rotation
        this.velocity.x = Math.sin(this.rotation) * this.velocity.length();
        this.velocity.z = Math.cos(this.rotation) * this.velocity.length();

        // Apply drag
        this.velocity.multiplyScalar(this.properties.drag);

        // Update position
        this.position.add(this.velocity);

        // Consume fuel
        if (this.throttle > 0) {
            this.fuel -= this.properties.fuelConsumption * delta;
            if (this.fuel <= 0) {
                this.fuel = 0;
                this.isEngineOn = false;
            }
        }

        // Clamp position to world bounds
        this.position.x = Math.max(-150, Math.min(150, this.position.x));
        this.position.z = Math.max(-150, Math.min(150, this.position.z));
    }

    // Start engine
    startEngine() {
        if (this.fuel > 0) {
            this.isEngineOn = true;
        }
    }

    // Stop engine
    stopEngine() {
        this.isEngineOn = false;
    }

    // Add occupant
    addOccupant(player) {
        this.occupants.push(player);
    }

    // Remove occupant
    removeOccupant(player) {
        const index = this.occupants.indexOf(player);
        if (index !== -1) {
            this.occupants.splice(index, 1);
        }
    }

    // Take damage
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isEngineOn = false;
        }
    }

    // Repair vehicle
    repair(amount) {
        this.health = Math.min(100, this.health + amount);
    }

    // Refuel vehicle
    refuel(amount) {
        this.fuel = Math.min(this.properties.maxFuel, this.fuel + amount);
    }

    // Get vehicle state
    getState() {
        return {
            id: this.id,
            type: this.type,
            name: this.properties.name,
            position: this.position.clone(),
            rotation: this.rotation,
            velocity: this.velocity.clone(),
            speed: this.velocity.length(),
            isEngineOn: this.isEngineOn,
            fuel: this.fuel,
            fuelPercent: (this.fuel / this.properties.maxFuel) * 100,
            health: this.health,
            occupants: this.occupants.length
        };
    }
}

class VehicleManager {
    constructor(scene) {
        this.scene = scene;
        this.vehicles = [];
        this.vehicleMeshes = new Map();
        this.playerVehicle = null;
    }

    // Create a vehicle
    createVehicle(id, type, position) {
        const vehicle = new Vehicle(id, type, position);
        this.vehicles.push(vehicle);
        
        // Create visual representation
        this.createVehicleMesh(vehicle);
        
        return vehicle;
    }

    // Create visual mesh for vehicle
    createVehicleMesh(vehicle) {
        let mesh;
        const props = vehicle.properties;

        if (vehicle.type === 'dhoni') {
            // Create dhoni boat
            const geometry = new THREE.BoxGeometry(props.width, props.height * 0.5, props.length);
            const material = new THREE.MeshStandardMaterial({
                color: 0x1E90FF,
                roughness: 0.6,
                metalness: 0.1
            });
            mesh = new THREE.Mesh(geometry, material);
            
            // Add cabin
            const cabinGeometry = new THREE.BoxGeometry(props.width * 0.7, props.height, props.length * 0.4);
            const cabinMaterial = new THREE.MeshStandardMaterial({
                color: 0xFF6B35,
                roughness: 0.7
            });
            const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
            cabin.position.z = props.length * 0.2;
            mesh.add(cabin);
        } else if (vehicle.type === 'motorcycle') {
            // Create motorcycle
            const geometry = new THREE.BoxGeometry(props.width, props.height, props.length);
            const material = new THREE.MeshStandardMaterial({
                color: 0xFF1493,
                roughness: 0.5,
                metalness: 0.3
            });
            mesh = new THREE.Mesh(geometry, material);
        } else if (vehicle.type === 'speedboat') {
            // Create speedboat
            const geometry = new THREE.BoxGeometry(props.width, props.height, props.length);
            const material = new THREE.MeshStandardMaterial({
                color: 0x00CED1,
                roughness: 0.4,
                metalness: 0.2
            });
            mesh = new THREE.Mesh(geometry, material);
        }

        mesh.position.copy(vehicle.position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        this.scene.add(mesh);
        this.vehicleMeshes.set(vehicle.id, mesh);
    }

    // Update all vehicles
    updateVehicles(delta, inputKeys) {
        this.vehicles.forEach(vehicle => {
            vehicle.update(delta, inputKeys);
            
            // Update mesh position and rotation
            const mesh = this.vehicleMeshes.get(vehicle.id);
            if (mesh) {
                mesh.position.copy(vehicle.position);
                mesh.rotation.y = vehicle.rotation;
            }
        });
    }

    // Get vehicle by ID
    getVehicleById(id) {
        return this.vehicles.find(v => v.id === id);
    }

    // Get vehicles within radius
    getVehiclesInRadius(position, radius) {
        return this.vehicles.filter(v => v.position.distanceTo(position) < radius);
    }

    // Set player vehicle
    setPlayerVehicle(vehicleId) {
        this.playerVehicle = this.getVehicleById(vehicleId);
        if (this.playerVehicle) {
            this.playerVehicle.startEngine();
        }
    }

    // Remove player from vehicle
    removePlayerFromVehicle() {
        if (this.playerVehicle) {
            this.playerVehicle.stopEngine();
            this.playerVehicle = null;
        }
    }

    // Remove vehicle
    removeVehicle(id) {
        const index = this.vehicles.findIndex(v => v.id === id);
        if (index !== -1) {
            const vehicle = this.vehicles[index];
            const mesh = this.vehicleMeshes.get(id);
            if (mesh) {
                this.scene.remove(mesh);
                this.vehicleMeshes.delete(id);
            }
            this.vehicles.splice(index, 1);
        }
    }

    // Clear all vehicles
    clearVehicles() {
        this.vehicles.forEach(vehicle => {
            const mesh = this.vehicleMeshes.get(vehicle.id);
            if (mesh) {
                this.scene.remove(mesh);
            }
        });
        this.vehicles = [];
        this.vehicleMeshes.clear();
        this.playerVehicle = null;
    }

    // Get vehicle statistics
    getStats() {
        return {
            total: this.vehicles.length,
            byType: {
                dhoni: this.vehicles.filter(v => v.type === 'dhoni').length,
                motorcycle: this.vehicles.filter(v => v.type === 'motorcycle').length,
                speedboat: this.vehicles.filter(v => v.type === 'speedboat').length
            }
        };
    }
}

export { Vehicle, VehicleManager };
