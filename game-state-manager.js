// game-state-manager.js
// Comprehensive Game State Manager and Game Loop

class GameStateManager {
    constructor() {
        this.state = {
            // Game status
            isRunning: true,
            isPaused: false,
            isGameOver: false,
            
            // Player stats
            player: {
                health: 100,
                maxHealth: 100,
                stamina: 100,
                maxStamina: 100,
                karma: 50,
                money: 1000,
                level: 1,
                experience: 0,
                nextLevelExp: 1000
            },
            
            // Game world
            timeOfDay: 12, // 0-24 hours
            weather: 'sunny', // sunny, rainy, cloudy, stormy
            dayCount: 1,
            
            // Mission tracking
            activeMissions: [],
            completedMissions: [],
            failedMissions: [],
            
            // Inventory
            inventory: {
                items: [],
                maxCapacity: 20,
                money: 1000
            },
            
            // Statistics
            stats: {
                distanceTraveled: 0,
                timePlayedSeconds: 0,
                missionsCompleted: 0,
                npcsMet: 0,
                vehiclesUsed: 0
            }
        };
        
        this.listeners = [];
        this.startTime = Date.now();
    }

    // Subscribe to state changes
    subscribe(callback) {
        this.listeners.push(callback);
    }

    // Notify listeners of state changes
    notifyListeners(eventType, data) {
        this.listeners.forEach(listener => {
            listener(eventType, data);
        });
    }

    // Update player health
    updateHealth(amount) {
        this.state.player.health = Math.max(0, Math.min(this.state.player.maxHealth, this.state.player.health + amount));
        if (this.state.player.health <= 0) {
            this.triggerGameOver();
        }
        this.notifyListeners('healthChanged', this.state.player.health);
    }

    // Update player stamina
    updateStamina(amount) {
        this.state.player.stamina = Math.max(0, Math.min(this.state.player.maxStamina, this.state.player.stamina + amount));
        this.notifyListeners('staminaChanged', this.state.player.stamina);
    }

    // Update player karma
    updateKarma(amount) {
        this.state.player.karma = Math.max(-100, Math.min(100, this.state.player.karma + amount));
        this.notifyListeners('karmaChanged', this.state.player.karma);
    }

    // Update player money
    updateMoney(amount) {
        this.state.player.money = Math.max(0, this.state.player.money + amount);
        this.state.inventory.money = this.state.player.money;
        this.notifyListeners('moneyChanged', this.state.player.money);
    }

    // Add experience
    addExperience(amount) {
        this.state.player.experience += amount;
        if (this.state.player.experience >= this.state.player.nextLevelExp) {
            this.levelUp();
        }
        this.notifyListeners('experienceChanged', this.state.player.experience);
    }

    // Level up
    levelUp() {
        this.state.player.level++;
        this.state.player.experience = 0;
        this.state.player.nextLevelExp = Math.floor(this.state.player.nextLevelExp * 1.5);
        this.state.player.maxHealth += 10;
        this.state.player.maxStamina += 10;
        this.state.player.health = this.state.player.maxHealth;
        this.state.player.stamina = this.state.player.maxStamina;
        this.notifyListeners('levelUp', this.state.player.level);
    }

    // Add item to inventory
    addItem(item) {
        if (this.state.inventory.items.length < this.state.inventory.maxCapacity) {
            this.state.inventory.items.push(item);
            this.notifyListeners('itemAdded', item);
            return true;
        }
        return false;
    }

    // Remove item from inventory
    removeItem(itemId) {
        const index = this.state.inventory.items.findIndex(item => item.id === itemId);
        if (index !== -1) {
            const item = this.state.inventory.items[index];
            this.state.inventory.items.splice(index, 1);
            this.notifyListeners('itemRemoved', item);
            return true;
        }
        return false;
    }

    // Update time of day
    updateTimeOfDay(delta) {
        this.state.timeOfDay += (delta / 3600) * 24; // Simulate 24 hours per hour of gameplay
        if (this.state.timeOfDay >= 24) {
            this.state.timeOfDay = 0;
            this.state.dayCount++;
            this.notifyListeners('dayChanged', this.state.dayCount);
        }
        this.notifyListeners('timeChanged', this.state.timeOfDay);
    }

    // Update weather
    updateWeather() {
        const weatherTypes = ['sunny', 'rainy', 'cloudy', 'stormy'];
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        if (randomWeather !== this.state.weather) {
            this.state.weather = randomWeather;
            this.notifyListeners('weatherChanged', this.state.weather);
        }
    }

    // Add mission
    addMission(mission) {
        this.state.activeMissions.push(mission);
        this.notifyListeners('missionAdded', mission);
    }

    // Complete mission
    completeMission(missionId) {
        const index = this.state.activeMissions.findIndex(m => m.id === missionId);
        if (index !== -1) {
            const mission = this.state.activeMissions[index];
            this.state.activeMissions.splice(index, 1);
            this.state.completedMissions.push(mission);
            
            // Add rewards
            this.updateMoney(mission.rewards.money);
            this.updateKarma(mission.rewards.karma);
            this.addExperience(mission.rewards.experience);
            
            this.state.stats.missionsCompleted++;
            this.notifyListeners('missionCompleted', mission);
        }
    }

    // Fail mission
    failMission(missionId) {
        const index = this.state.activeMissions.findIndex(m => m.id === missionId);
        if (index !== -1) {
            const mission = this.state.activeMissions[index];
            this.state.activeMissions.splice(index, 1);
            this.state.failedMissions.push(mission);
            this.notifyListeners('missionFailed', mission);
        }
    }

    // Pause game
    pauseGame() {
        this.state.isPaused = true;
        this.notifyListeners('gamePaused', null);
    }

    // Resume game
    resumeGame() {
        this.state.isPaused = false;
        this.notifyListeners('gameResumed', null);
    }

    // Trigger game over
    triggerGameOver() {
        this.state.isGameOver = true;
        this.state.isRunning = false;
        this.notifyListeners('gameOver', null);
    }

    // Update statistics
    updateStats(delta, playerVelocity) {
        this.state.stats.timePlayedSeconds += delta;
        if (playerVelocity && playerVelocity.length() > 0) {
            this.state.stats.distanceTraveled += playerVelocity.length() * delta;
        }
    }

    // Get game state
    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }

    // Save game state
    saveGameState() {
        const saveData = {
            state: this.state,
            timestamp: Date.now()
        };
        localStorage.setItem('maldives_game_save', JSON.stringify(saveData));
        this.notifyListeners('gameSaved', saveData);
    }

    // Load game state
    loadGameState() {
        const saveData = localStorage.getItem('maldives_game_save');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.state = data.state;
                this.notifyListeners('gameLoaded', data);
                return true;
            } catch (e) {
                console.error('Failed to load game state:', e);
                return false;
            }
        }
        return false;
    }

    // Reset game state
    resetGameState() {
        this.state = {
            isRunning: true,
            isPaused: false,
            isGameOver: false,
            player: {
                health: 100,
                maxHealth: 100,
                stamina: 100,
                maxStamina: 100,
                karma: 50,
                money: 1000,
                level: 1,
                experience: 0,
                nextLevelExp: 1000
            },
            timeOfDay: 12,
            weather: 'sunny',
            dayCount: 1,
            activeMissions: [],
            completedMissions: [],
            failedMissions: [],
            inventory: {
                items: [],
                maxCapacity: 20,
                money: 1000
            },
            stats: {
                distanceTraveled: 0,
                timePlayedSeconds: 0,
                missionsCompleted: 0,
                npcsMet: 0,
                vehiclesUsed: 0
            }
        };
        this.notifyListeners('gameReset', null);
    }

    // Get statistics
    getStats() {
        return {
            ...this.state.stats,
            currentLevel: this.state.player.level,
            currentHealth: this.state.player.health,
            currentMoney: this.state.player.money,
            missionsActive: this.state.activeMissions.length,
            daysPlayed: this.state.dayCount
        };
    }
}

export { GameStateManager };
