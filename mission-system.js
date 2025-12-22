// mission-system.js
// Comprehensive Mission and Quest System

class Mission {
    constructor(id, title, description, type = 'main') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type; // 'main', 'side', 'optional'
        
        this.status = 'available'; // available, active, completed, failed
        this.progress = 0;
        this.targetProgress = 100;
        
        this.objectives = [];
        this.rewards = {
            money: 0,
            karma: 0,
            experience: 0
        };
        
        this.startTime = null;
        this.endTime = null;
        this.timeLimit = null; // in seconds
    }

    // Add objective to mission
    addObjective(id, description, type = 'collect') {
        this.objectives.push({
            id: id,
            description: description,
            type: type,
            completed: false,
            progress: 0,
            target: 1
        });
    }

    // Update objective progress
    updateObjective(objectiveId, progress) {
        const objective = this.objectives.find(obj => obj.id === objectiveId);
        if (objective) {
            objective.progress = Math.min(progress, objective.target);
            if (objective.progress >= objective.target) {
                objective.completed = true;
            }
            this.updateProgress();
        }
    }

    // Update mission progress
    updateProgress() {
        const completedObjectives = this.objectives.filter(obj => obj.completed).length;
        this.progress = (completedObjectives / this.objectives.length) * 100;
    }

    // Check if mission is complete
    isComplete() {
        return this.objectives.every(obj => obj.completed);
    }

    // Start mission
    start() {
        this.status = 'active';
        this.startTime = Date.now();
    }

    // Complete mission
    complete() {
        this.status = 'completed';
        this.endTime = Date.now();
    }

    // Fail mission
    fail() {
        this.status = 'failed';
        this.endTime = Date.now();
    }

    // Get mission state
    getState() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            type: this.type,
            status: this.status,
            progress: this.progress,
            objectives: this.objectives,
            rewards: this.rewards,
            timeRemaining: this.getTimeRemaining()
        };
    }

    // Get time remaining
    getTimeRemaining() {
        if (!this.timeLimit || !this.startTime) return null;
        const elapsed = (Date.now() - this.startTime) / 1000;
        const remaining = Math.max(0, this.timeLimit - elapsed);
        return remaining;
    }
}

class MissionManager {
    constructor() {
        this.missions = [];
        this.activeMissions = [];
        this.completedMissions = [];
        this.failedMissions = [];
    }

    // Create and register a mission
    createMission(id, title, description, type = 'main') {
        const mission = new Mission(id, title, description, type);
        this.missions.push(mission);
        return mission;
    }

    // Activate a mission
    activateMission(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission && mission.status === 'available') {
            mission.start();
            this.activeMissions.push(mission);
            return mission;
        }
        return null;
    }

    // Complete a mission
    completeMission(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission && mission.status === 'active') {
            mission.complete();
            this.activeMissions = this.activeMissions.filter(m => m.id !== missionId);
            this.completedMissions.push(mission);
            return mission;
        }
        return null;
    }

    // Fail a mission
    failMission(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission && mission.status === 'active') {
            mission.fail();
            this.activeMissions = this.activeMissions.filter(m => m.id !== missionId);
            this.failedMissions.push(mission);
            return mission;
        }
        return null;
    }

    // Get mission by ID
    getMissionById(missionId) {
        return this.missions.find(m => m.id === missionId);
    }

    // Get all active missions
    getActiveMissions() {
        return this.activeMissions;
    }

    // Get all completed missions
    getCompletedMissions() {
        return this.completedMissions;
    }

    // Get all available missions
    getAvailableMissions() {
        return this.missions.filter(m => m.status === 'available');
    }

    // Update mission progress
    updateMissionProgress(missionId, objectiveId, progress) {
        const mission = this.getMissionById(missionId);
        if (mission) {
            mission.updateObjective(objectiveId, progress);
            if (mission.isComplete()) {
                this.completeMission(missionId);
            }
        }
    }

    // Get mission statistics
    getStats() {
        return {
            total: this.missions.length,
            active: this.activeMissions.length,
            completed: this.completedMissions.length,
            failed: this.failedMissions.length,
            available: this.getAvailableMissions().length
        };
    }

    // Initialize default missions
    initializeDefaultMissions() {
        // Main missions
        const exploreMale = this.createMission('explore_male', 'Explore Malé', 'Discover the beauty of the Maldivian capital', 'main');
        exploreMale.addObjective('visit_market', 'Visit the local market');
        exploreMale.addObjective('visit_harbor', 'Visit the harbor');
        exploreMale.addObjective('visit_mosque', 'Visit the Grand Friday Mosque');
        exploreMale.rewards = { money: 500, karma: 10, experience: 100 };

        const meetFisherman = this.createMission('meet_fisherman', 'Meet the Fisherman', 'Find and talk to the local fisherman', 'main');
        meetFisherman.addObjective('find_fisherman', 'Find the fisherman at the harbor');
        meetFisherman.addObjective('talk_fisherman', 'Talk to the fisherman');
        meetFisherman.rewards = { money: 200, karma: 5, experience: 50 };

        // Side missions
        const deliverPackage = this.createMission('deliver_package', 'Deliver Package', 'Deliver a package to the market vendor', 'side');
        deliverPackage.addObjective('get_package', 'Get the package from the fisherman');
        deliverPackage.addObjective('deliver_package', 'Deliver to the market vendor');
        deliverPackage.rewards = { money: 300, karma: 0, experience: 75 };

        const collectSpices = this.createMission('collect_spices', 'Collect Spices', 'Collect local spices from the market', 'side');
        collectSpices.addObjective('collect_spices', 'Collect 5 types of spices');
        collectSpices.rewards = { money: 250, karma: 5, experience: 60 };

        return [exploreMale, meetFisherman, deliverPackage, collectSpices];
    }
}

export { Mission, MissionManager };
