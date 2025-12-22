// chat-system.js
// In-game chat and dialogue system for NPC interactions

class ChatSystem {
    constructor() {
        this.chatHistory = [];
        this.activeConversation = null;
        this.npcDatabase = this.initializeNPCDatabase();
        this.playerName = 'Player';
        this.maxChatMessages = 50;
        this.chatContainer = null;
    }

    // Initialize NPC database with Maldivian characters
    initializeNPCDatabase() {
        return {
            fisherman: {
                name: 'Hassan (Fisherman)',
                role: 'Local Fisherman',
                location: 'Harbor',
                avatar: '🎣',
                dialogues: [
                    "Welcome to Malé! Have you seen any dhonis?",
                    "The fishing is good today. Would you like to join me?",
                    "The sea is calling. Are you interested in a fishing quest?",
                    "I've been fishing here for 20 years. This is my home.",
                    "The weather looks perfect for sailing. Want to go out?"
                ],
                quests: [
                    { id: 'fish_001', title: 'Catch of the Day', reward: 500 },
                    { id: 'fish_002', title: 'Explore the Reefs', reward: 1000 }
                ]
            },
            vendor: {
                name: 'Aisha (Market Vendor)',
                role: 'Local Vendor',
                location: 'Market',
                avatar: '🏪',
                dialogues: [
                    "Welcome to my shop! What can I get for you?",
                    "Fresh fish, spices, and local goods. Everything you need!",
                    "Have you tried our local coconut drinks?",
                    "Business is good today. Many tourists visiting.",
                    "I have special deals on Maldivian crafts!"
                ],
                quests: [
                    { id: 'vendor_001', title: 'Deliver Goods', reward: 300 },
                    { id: 'vendor_002', title: 'Find Rare Spices', reward: 800 }
                ]
            },
            tourist: {
                name: 'Emma (Tourist)',
                role: 'Visiting Tourist',
                location: 'Beach',
                avatar: '🧳',
                dialogues: [
                    "This place is absolutely beautiful! Have you been here long?",
                    "I'm trying to explore all the islands. Any recommendations?",
                    "The water is so clear and blue. Perfect for diving!",
                    "I love the local culture here. So welcoming!",
                    "Have you tried the local food? It's amazing!"
                ],
                quests: [
                    { id: 'tourist_001', title: 'Guide the Tourist', reward: 400 },
                    { id: 'tourist_002', title: 'Show Island Secrets', reward: 600 }
                ]
            },
            boatCaptain: {
                name: 'Ahmed (Boat Captain)',
                role: 'Ferry Captain',
                location: 'Dock',
                avatar: '⛵',
                dialogues: [
                    "Need a ride to another island? I can take you!",
                    "My dhoni is the fastest in the archipelago.",
                    "The sea is calm today. Perfect for sailing.",
                    "I've sailed these waters for 30 years. I know them well.",
                    "Where are you headed? I can get you there safely."
                ],
                quests: [
                    { id: 'boat_001', title: 'Deliver Package', reward: 700 },
                    { id: 'boat_002', title: 'Rescue Mission', reward: 1500 }
                ]
            },
            official: {
                name: 'Ibrahim (Government Official)',
                role: 'City Administrator',
                location: 'Government Building',
                avatar: '👔',
                dialogues: [
                    "Welcome to Malé. How can I assist you?",
                    "We're working on improving the city infrastructure.",
                    "Tourism is very important to our economy.",
                    "Have you registered with the local authorities?",
                    "We welcome visitors who respect our culture."
                ],
                quests: [
                    { id: 'official_001', title: 'Complete Registration', reward: 250 },
                    { id: 'official_002', title: 'Cultural Exchange', reward: 900 }
                ]
            }
        };
    }

    // Start a conversation with an NPC
    startConversation(npcKey) {
        const npc = this.npcDatabase[npcKey];
        if (!npc) {
            console.error(`NPC not found: ${npcKey}`);
            return null;
        }

        this.activeConversation = {
            npc: npc,
            npcKey: npcKey,
            startTime: Date.now(),
            messages: [],
            questsOffered: []
        };

        // Add greeting message
        const greeting = npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
        this.addMessage(npc.name, greeting, 'npc');

        return this.activeConversation;
    }

    // End the current conversation
    endConversation() {
        if (this.activeConversation) {
            this.addMessage('System', 'Conversation ended.', 'system');
            this.activeConversation = null;
        }
    }

    // Add a message to the chat history
    addMessage(sender, text, type = 'player') {
        const message = {
            sender: sender,
            text: text,
            type: type,  // 'player', 'npc', 'system', 'quest'
            timestamp: new Date().toLocaleTimeString(),
            id: this.chatHistory.length
        };

        this.chatHistory.push(message);

        // Keep chat history within limit
        if (this.chatHistory.length > this.maxChatMessages) {
            this.chatHistory.shift();
        }

        // Trigger UI update
        this.updateChatDisplay();

        return message;
    }

    // Send a player message
    sendPlayerMessage(text) {
        if (!text || text.trim().length === 0) return;

        // Add player message
        this.addMessage(this.playerName, text, 'player');

        // Generate NPC response if in conversation
        if (this.activeConversation) {
            this.generateNPCResponse(text);
        }
    }

    // Generate an NPC response based on player input
    generateNPCResponse(playerInput) {
        if (!this.activeConversation) return;

        const npc = this.activeConversation.npc;
        let response = '';

        // Simple keyword matching for responses
        const lowerInput = playerInput.toLowerCase();

        if (lowerInput.includes('quest') || lowerInput.includes('mission')) {
            response = this.generateQuestResponse(npc);
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            response = "Nice to meet you! How can I help?";
        } else if (lowerInput.includes('goodbye') || lowerInput.includes('bye')) {
            response = "Safe travels! Come back soon!";
            setTimeout(() => this.endConversation(), 1000);
        } else if (lowerInput.includes('help')) {
            response = this.generateHelpResponse(npc);
        } else if (lowerInput.includes('where') || lowerInput.includes('location')) {
            response = `I'm usually at the ${npc.location}. You can find me there.`;
        } else if (lowerInput.includes('name')) {
            response = `I'm ${npc.name}, ${npc.role}. Nice to meet you!`;
        } else {
            // Random response from NPC dialogues
            response = npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
        }

        // Add NPC response with slight delay for realism
        setTimeout(() => {
            this.addMessage(npc.name, response, 'npc');
        }, 500);
    }

    // Generate a quest response
    generateQuestResponse(npc) {
        if (npc.quests && npc.quests.length > 0) {
            const quest = npc.quests[Math.floor(Math.random() * npc.quests.length)];
            this.activeConversation.questsOffered.push(quest);
            return `I have a quest for you: "${quest.title}". Interested? (Reward: ${quest.reward} coins)`;
        }
        return "I don't have any quests available right now.";
    }

    // Generate a help response
    generateHelpResponse(npc) {
        const helpTopics = [
            `I can help you with ${npc.role} related tasks.`,
            `You can ask me about quests, or just chat!`,
            `Type 'quest' to hear about available missions.`,
            `I know a lot about this area. Feel free to ask!`
        ];
        return helpTopics[Math.floor(Math.random() * helpTopics.length)];
    }

    // Accept a quest from an NPC
    acceptQuest(questId) {
        if (!this.activeConversation) return null;

        const quest = this.activeConversation.questsOffered.find(q => q.id === questId);
        if (!quest) return null;

        this.addMessage('System', `Quest accepted: "${quest.title}" (Reward: ${quest.reward} coins)`, 'quest');
        return quest;
    }

    // Get chat history
    getChatHistory() {
        return this.chatHistory;
    }

    // Get active conversation
    getActiveConversation() {
        return this.activeConversation;
    }

    // Get NPC list
    getNPCList() {
        return Object.keys(this.npcDatabase).map(key => ({
            key: key,
            ...this.npcDatabase[key]
        }));
    }

    // Update chat display (for UI integration)
    updateChatDisplay() {
        // This method will be called to update the UI
        // Implementation depends on the UI system being used
        const event = new CustomEvent('chatUpdated', {
            detail: { messages: this.chatHistory }
        });
        window.dispatchEvent(event);
    }

    // Clear chat history
    clearChatHistory() {
        this.chatHistory = [];
        this.updateChatDisplay();
    }

    // Export chat history
    exportChatHistory() {
        return JSON.stringify(this.chatHistory, null, 2);
    }

    // Get statistics about conversations
    getConversationStats() {
        const stats = {
            totalMessages: this.chatHistory.length,
            playerMessages: this.chatHistory.filter(m => m.type === 'player').length,
            npcMessages: this.chatHistory.filter(m => m.type === 'npc').length,
            systemMessages: this.chatHistory.filter(m => m.type === 'system').length,
            questMessages: this.chatHistory.filter(m => m.type === 'quest').length,
            uniqueNPCs: new Set(this.chatHistory.filter(m => m.type === 'npc').map(m => m.sender)).size
        };
        return stats;
    }

    // Create a chat UI element
    createChatUI() {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-system';
        chatContainer.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 500px;
            background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.95) 100%);
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(20px);
            box-shadow: 0 16px 64px rgba(0,0,0,0.6);
            z-index: 500;
            font-family: 'Segoe UI', sans-serif;
            color: #fff;
        `;

        // Chat header
        const header = document.createElement('div');
        header.style.cssText = `
            padding: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;
        header.textContent = '💬 Chat System';
        chatContainer.appendChild(header);

        // Chat messages area
        const messagesArea = document.createElement('div');
        messagesArea.id = 'chat-messages';
        messagesArea.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;
        chatContainer.appendChild(messagesArea);

        // Input area
        const inputArea = document.createElement('div');
        inputArea.style.cssText = `
            padding: 12px;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            gap: 8px;
        `;

        const input = document.createElement('input');
        input.id = 'chat-input';
        input.type = 'text';
        input.placeholder = 'Type a message...';
        input.style.cssText = `
            flex: 1;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            padding: 8px 12px;
            color: #fff;
            font-size: 12px;
        `;
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendPlayerMessage(input.value);
                input.value = '';
            }
        });
        inputArea.appendChild(input);

        const sendBtn = document.createElement('button');
        sendBtn.textContent = '📤';
        sendBtn.style.cssText = `
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            padding: 8px 12px;
            color: #fff;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        sendBtn.addEventListener('click', () => {
            this.sendPlayerMessage(input.value);
            input.value = '';
        });
        sendBtn.addEventListener('mouseover', () => {
            sendBtn.style.background = 'rgba(255,255,255,0.2)';
        });
        sendBtn.addEventListener('mouseout', () => {
            sendBtn.style.background = 'rgba(255,255,255,0.1)';
        });
        inputArea.appendChild(sendBtn);

        chatContainer.appendChild(inputArea);

        // Listen for chat updates
        window.addEventListener('chatUpdated', (e) => {
            this.renderChatMessages(messagesArea);
        });

        this.chatContainer = chatContainer;
        return chatContainer;
    }

    // Render chat messages in the UI
    renderChatMessages(container) {
        container.innerHTML = '';

        this.chatHistory.forEach(message => {
            const messageEl = document.createElement('div');
            messageEl.style.cssText = `
                display: flex;
                flex-direction: column;
                margin-bottom: 8px;
                padding: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                border-left: 3px solid ${this.getMessageColor(message.type)};
            `;

            const senderEl = document.createElement('div');
            senderEl.style.cssText = `
                font-weight: 700;
                font-size: 11px;
                color: ${this.getMessageColor(message.type)};
                text-transform: uppercase;
                letter-spacing: 0.5px;
            `;
            senderEl.textContent = `${message.sender} [${message.timestamp}]`;
            messageEl.appendChild(senderEl);

            const textEl = document.createElement('div');
            textEl.style.cssText = `
                font-size: 12px;
                color: rgba(255,255,255,0.8);
                margin-top: 4px;
                word-wrap: break-word;
            `;
            textEl.textContent = message.text;
            messageEl.appendChild(textEl);

            container.appendChild(messageEl);
        });

        // Auto-scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    // Get color for message type
    getMessageColor(type) {
        const colors = {
            'player': '#00FF00',      // Green
            'npc': '#FFD700',         // Gold
            'system': '#00BFFF',      // Sky blue
            'quest': '#FF69B4'        // Hot pink
        };
        return colors[type] || '#FFFFFF';
    }
}

export { ChatSystem };
