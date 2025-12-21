// ui-hud.js
// Modern UI/UX for Controls and HUD

class UIHud {
    constructor() {
        this.hudContainer = null;
        this.init();
    }

    init() {
        // Create the main HUD container if it doesn't exist
        let hudContainer = document.getElementById('hud');
        if (!hudContainer) {
            hudContainer = document.createElement('div');
            hudContainer.id = 'hud';
            document.body.appendChild(hudContainer);
        }
        this.hudContainer = hudContainer;

        // Initialize all HUD sections
        this.createTopBar();
        this.createMinimap();
        this.createMissionTracker();
        this.createTouchControls();
        this.createDialogueBox();
    }

    createTopBar() {
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        topBar.innerHTML = `
            <div class="stats-panel">
                <div class="stat-row">
                    <span class="stat-icon">❤️</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar health" style="width: 100%"></div>
                    </div>
                    <span class="stat-value">100/100</span>
                </div>
                <div class="stat-row">
                    <span class="stat-icon">⚡</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar stamina" style="width: 100%"></div>
                    </div>
                    <span class="stat-value">100/100</span>
                </div>
                <div class="stat-row">
                    <span class="stat-icon">⭐</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar karma" style="width: 50%"></div>
                    </div>
                    <span class="stat-value">50/100</span>
                </div>
            </div>
            <div class="money-display">
                <div class="money-label">CASH</div>
                <div class="money-amount">$500</div>
            </div>
        `;
        this.hudContainer.appendChild(topBar);
    }

    createMinimap() {
        const minimapContainer = document.createElement('div');
        minimapContainer.className = 'minimap-container';
        minimapContainer.innerHTML = `<canvas id="minimap-canvas"></canvas>`;
        this.hudContainer.appendChild(minimapContainer);

        // Initialize minimap canvas
        const minimapCanvas = document.getElementById('minimap-canvas');
        const ctx = minimapCanvas.getContext('2d');
        minimapCanvas.width = 180;
        minimapCanvas.height = 180;

        // Draw a simple minimap
        ctx.fillStyle = '#1a3a4a';
        ctx.fillRect(0, 0, 180, 180);
        ctx.strokeStyle = '#778da9';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 180, 180);

        // Draw player position
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(90, 90, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    createMissionTracker() {
        const missionTracker = document.createElement('div');
        missionTracker.className = 'mission-tracker';
        missionTracker.innerHTML = `
            <div class="mission-title">Current Mission</div>
            <div class="mission-objective">Explore the Baokalo Islands and complete the first mission.</div>
        `;
        this.hudContainer.appendChild(missionTracker);
    }

    createTouchControls() {
        const touchControls = document.createElement('div');
        touchControls.className = 'touch-controls';
        touchControls.innerHTML = `
            <div class="joystick-area">
                <div class="joystick-knob"></div>
            </div>
            <div class="action-buttons">
                <button class="action-btn attack" title="Attack">⚔️</button>
                <button class="action-btn interact" title="Interact">🤝</button>
                <button class="action-btn sprint" title="Sprint">💨</button>
                <button class="action-btn menu" title="Menu">☰</button>
            </div>
        `;
        this.hudContainer.appendChild(touchControls);

        // Add event listeners to action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleActionButtonClick(e));
        });
    }

    createDialogueBox() {
        const dialogueBox = document.createElement('div');
        dialogueBox.className = 'dialogue-box';
        dialogueBox.innerHTML = `
            <div class="dialogue-speaker">NPC Name</div>
            <div class="dialogue-text">This is a placeholder dialogue message.</div>
            <div class="dialogue-continue">Press SPACE to continue...</div>
        `;
        this.hudContainer.appendChild(dialogueBox);
    }

    updateStats(health, stamina, karma, money) {
        // Update health bar
        const healthBar = document.querySelector('.stat-bar.health');
        if (healthBar) {
            healthBar.style.width = `${(health / 100) * 100}%`;
            healthBar.parentElement.nextElementSibling.textContent = `${health}/100`;
        }

        // Update stamina bar
        const staminaBar = document.querySelector('.stat-bar.stamina');
        if (staminaBar) {
            staminaBar.style.width = `${(stamina / 100) * 100}%`;
            staminaBar.parentElement.nextElementSibling.textContent = `${stamina}/100`;
        }

        // Update karma bar
        const karmaBar = document.querySelector('.stat-bar.karma');
        if (karmaBar) {
            karmaBar.style.width = `${(karma / 100) * 100}%`;
            karmaBar.parentElement.nextElementSibling.textContent = `${karma}/100`;
        }

        // Update money display
        const moneyAmount = document.querySelector('.money-amount');
        if (moneyAmount) {
            moneyAmount.textContent = `$${money}`;
        }
    }

    updateMinimap(playerX, playerZ, mapSize) {
        const minimapCanvas = document.getElementById('minimap-canvas');
        const ctx = minimapCanvas.getContext('2d');

        // Clear and redraw minimap
        ctx.fillStyle = '#1a3a4a';
        ctx.fillRect(0, 0, 180, 180);
        ctx.strokeStyle = '#778da9';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 180, 180);

        // Calculate player position on minimap
        const mapX = ((playerX / mapSize) + 0.5) * 180;
        const mapZ = ((playerZ / mapSize) + 0.5) * 180;

        // Draw player
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(mapX, mapZ, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    showDialogue(speaker, text) {
        const dialogueBox = document.querySelector('.dialogue-box');
        if (dialogueBox) {
            dialogueBox.querySelector('.dialogue-speaker').textContent = speaker;
            dialogueBox.querySelector('.dialogue-text').textContent = text;
            dialogueBox.classList.add('active');
        }
    }

    hideDialogue() {
        const dialogueBox = document.querySelector('.dialogue-box');
        if (dialogueBox) {
            dialogueBox.classList.remove('active');
        }
    }

    handleActionButtonClick(event) {
        const button = event.target.closest('.action-btn');
        if (!button) return;

        const action = button.className.split(' ')[1];
        console.log(`Action: ${action}`);

        // Dispatch custom event for game logic to handle
        const actionEvent = new CustomEvent('gameAction', { detail: { action } });
        window.dispatchEvent(actionEvent);
    }

    updateMissionTracker(title, objective) {
        const missionTitle = document.querySelector('.mission-title');
        const missionObjective = document.querySelector('.mission-objective');

        if (missionTitle) missionTitle.textContent = title;
        if (missionObjective) missionObjective.textContent = objective;
    }
}

// Export for use in other modules
export { UIHud };
