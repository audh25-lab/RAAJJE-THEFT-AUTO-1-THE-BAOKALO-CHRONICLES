// ============================================
// ACT 10: COUP D'ÉTAT & EPILOGUE
// Timeline: 2023-2025 - The Final Reckoning
// ============================================

// ==================== ACT 10 MAPS ====================
const ACT10_MAPS = {
    presidential_palace: {
        name: "Muliaage - Presidential Palace",
        width: 60,
        height: 55,
        spawnX: 30,
        spawnY: 50,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            mainGate: { x: 25, y: 48, w: 10, h: 6, name: "Main Gate 🚪" },
            courtyard: { x: 15, y: 35, w: 30, h: 12, name: "Palace Courtyard 🏛️" },
            mainHall: { x: 20, y: 20, w: 20, h: 14, name: "Grand Hall 👑" },
            throneRoom: { x: 22, y: 8, w: 16, h: 10, name: "Throne Room 🪑" },
            securityWing: { x: 45, y: 25, w: 12, h: 15, name: "Security Wing 🔒" },
            escapeRoute: { x: 5, y: 10, w: 10, h: 20, name: "Secret Passage 🚪" }
        },
        isFinalLocation: true,
        isPalace: true
    },
    
    mndf_headquarters: {
        name: "MNDF Headquarters",
        width: 55,
        height: 50,
        spawnX: 27,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 22, y: 42, w: 10, h: 6, name: "MNDF Gate 🚪" },
            parade: { x: 10, y: 28, w: 35, h: 12, name: "Parade Ground 🎖️" },
            commandCenter: { x: 20, y: 12, w: 15, h: 14, name: "Command Center 📡" },
            armory: { x: 40, y: 15, w: 10, h: 12, name: "Armory 🔫" },
            detention: { x: 5, y: 10, w: 12, h: 15, name: "Detention Block 🔒" }
        },
        isMilitary: true
    },
    
    republic_square_final: {
        name: "Republic Square - Final Stand",
        width: 65,
        height: 60,
        spawnX: 32,
        spawnY: 55,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            southEntrance: { x: 27, y: 52, w: 10, h: 6, name: "South Entrance 🚶" },
            centralMonument: { x: 25, y: 25, w: 15, h: 15, name: "Independence Monument 🗽" },
            protestArea: { x: 10, y: 30, w: 45, h: 20, name: "Protest Zone 📢" },
            policeBarricade: { x: 10, y: 20, w: 45, h: 8, name: "Police Line 🚔" },
            sniperPosition: { x: 50, y: 10, w: 10, h: 10, name: "Rooftop ⚠️" }
        },
        isOutdoor: true,
        isFinalBattle: true
    },
    
    safe_house_final: {
        name: "Final Safe House",
        width: 40,
        height: 35,
        spawnX: 20,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 15, y: 28, w: 10, h: 6, name: "Hidden Door 🚪" },
            mainRoom: { x: 10, y: 15, w: 20, h: 12, name: "Planning Room 📋" },
            weaponRoom: { x: 5, y: 5, w: 12, h: 10, name: "Arsenal 🔫" },
            escapeHatch: { x: 28, y: 5, w: 8, h: 8, name: "Escape Tunnel 🕳️" }
        },
        isInterior: true,
        isSafeHouse: true
    },
    
    airport_escape: {
        name: "Velana Airport - Escape",
        width: 70,
        height: 50,
        spawnX: 35,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            terminal: { x: 25, y: 35, w: 20, h: 12, name: "Terminal 🛫" },
            runway: { x: 10, y: 15, w: 50, h: 15, name: "Runway ✈️" },
            hangar: { x: 55, y: 20, w: 12, h: 15, name: "Private Hangar 🛩️" },
            checkpoint: { x: 20, y: 30, w: 10, h: 8, name: "Security Check 🚔" }
        },
        isAirport: true,
        isEscape: true
    },
    
    // EPILOGUE LOCATIONS
    epilogue_beach: {
        name: "Quiet Beach - Years Later",
        width: 50,
        height: 40,
        spawnX: 25,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            shore: { x: 5, y: 30, w: 40, h: 8, name: "Shoreline 🏖️" },
            palmGrove: { x: 10, y: 15, w: 15, h: 12, name: "Palm Grove 🌴" },
            sunset: { x: 30, y: 10, w: 15, h: 15, name: "Sunset Point 🌅" }
        },
        isEpilogue: true,
        isPeaceful: true
    },
    
    epilogue_prison: {
        name: "Dhoonidhoo - Life Sentence",
        width: 40,
        height: 35,
        spawnX: 20,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            cell: { x: 15, y: 20, w: 10, h: 10, name: "Your Cell 🔒" },
            yard: { x: 5, y: 5, w: 30, h: 12, name: "Prison Yard ⛓️" }
        },
        isEpilogue: true,
        isPrison: true
    },
    
    epilogue_palace: {
        name: "Muliaage - Your Palace",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            throne: { x: 18, y: 10, w: 14, h: 12, name: "Your Throne 👑" },
            balcony: { x: 20, y: 5, w: 10, h: 6, name: "Balcony 🏛️" }
        },
        isEpilogue: true,
        isTyrant: true
    },
    
    epilogue_grave: {
        name: "Malé Cemetery - Memorial",
        width: 40,
        height: 35,
        spawnX: 20,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            yourGrave: { x: 15, y: 12, w: 10, h: 10, name: "Hero's Grave 🪦" },
            mourners: { x: 10, y: 20, w: 20, h: 10, name: "Mourners 🕯️" }
        },
        isEpilogue: true,
        isMartyr: true
    }
};

// ==================== ACT 10 MISSIONS ====================
const ACT10_MISSIONS = [
    {
        id: "act10_m1",
        title: "The Storm Gathers",
        type: "story",
        description: "The election results spark chaos across Malé",
        objectives: [
            { type: "travel", target: "safe_house_final", current: false },
            { type: "trigger", target: "stormGathers", current: false }
        ],
        rewards: { money: 5000 },
        dialogueStart: "storm_gathers",
        unlocks: ["act10_m2"]
    },
    {
        id: "act10_m2",
        title: "Choose Your Side",
        type: "story",
        description: "Make your final allegiance known",
        objectives: [
            { type: "decide", target: "finalAllegiance", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "final_allegiance_choice",
        unlocks: ["act10_m3_tyrant", "act10_m3_puppet", "act10_m3_redemption", "act10_m3_martyr"],
        majorChoice: "ending_path",
        moralChoice: true
    },
    
    // TYRANT PATH
    {
        id: "act10_m3_tyrant",
        title: "Seize Power",
        type: "combat",
        description: "Launch your own coup - take the palace",
        objectives: [
            { type: "travel", target: "presidential_palace", current: false },
            { type: "defeat", target: "palaceGuard", count: 20, current: 0 },
            { type: "boss", target: "mooizbe", current: false }
        ],
        rewards: { money: 50000, karma: -50 },
        requiresPath: "tyrant",
        unlocks: ["act10_tyrant_climax"]
    },
    {
        id: "act10_tyrant_climax",
        title: "The New Tyrant",
        type: "boss",
        description: "Eliminate all opposition - become the new ruler",
        objectives: [
            { type: "boss", target: "alibe", current: false },
            { type: "defeat", target: "opposition", count: 15, current: 0 },
            { type: "trigger", target: "tyrantEnding", current: false }
        ],
        rewards: { money: 100000 },
        requiresPath: "tyrant",
        unlocks: ["epilogue_tyrant"],
        actEnd: true
    },
    
    // PUPPET PATH
    {
        id: "act10_m3_puppet",
        title: "Loyal Servant",
        type: "combat",
        description: "Help Mooizbe crush the opposition",
        objectives: [
            { type: "travel", target: "republic_square_final", current: false },
            { type: "defeat", target: "protesters", count: 25, current: 0 },
            { type: "capture", target: "alibe", current: false }
        ],
        rewards: { money: 30000, karma: -30 },
        requiresPath: "puppet",
        unlocks: ["act10_puppet_climax"]
    },
    {
        id: "act10_puppet_climax",
        title: "The President's Dog",
        type: "story",
        description: "Mooizbe rewards your loyalty... or does he?",
        objectives: [
            { type: "travel", target: "presidential_palace", current: false },
            { type: "trigger", target: "puppetBetrayal", current: false },
            { type: "survive", target: "mooizbeBetrayal", current: false }
        ],
        rewards: { money: 0 },
        requiresPath: "puppet",
        unlocks: ["epilogue_puppet"],
        actEnd: true
    },
    
    // REDEMPTION PATH
    {
        id: "act10_m3_redemption",
        title: "Break the Cycle",
        type: "story",
        description: "Help Alibe peacefully restore democracy",
        objectives: [
            { type: "travel", target: "republic_square_final", current: false },
            { type: "protect", target: "protesters", duration: 120, current: 0 },
            { type: "negotiate", target: "military", current: false }
        ],
        rewards: { money: 10000, karma: 40 },
        requiresPath: "redemption",
        unlocks: ["act10_redemption_climax"]
    },
    {
        id: "act10_redemption_climax",
        title: "A New Dawn",
        type: "story",
        description: "Witness the peaceful transfer of power",
        objectives: [
            { type: "escort", target: "alibe", current: false },
            { type: "travel", target: "presidential_palace", current: false },
            { type: "trigger", target: "peacefulTransfer", current: false }
        ],
        rewards: { money: 20000, karma: 30 },
        requiresPath: "redemption",
        unlocks: ["epilogue_redemption"],
        actEnd: true
    },
    
    // MARTYR PATH
    {
        id: "act10_m3_martyr",
        title: "The Ultimate Sacrifice",
        type: "story",
        description: "Give your life to save Raajje",
        objectives: [
            { type: "travel", target: "republic_square_final", current: false },
            { type: "trigger", target: "martyrChoice", current: false }
        ],
        rewards: { money: 0, karma: 50 },
        requiresPath: "martyr",
        unlocks: ["act10_martyr_climax"]
    },
    {
        id: "act10_martyr_climax",
        title: "For Raajje",
        type: "sacrifice",
        description: "Stand between the military and the people",
        objectives: [
            { type: "stand", target: "centralMonument", current: false },
            { type: "speech", target: "finalSpeech", current: false },
            { type: "trigger", target: "martyrEnding", current: false }
        ],
        rewards: { money: 0 },
        requiresPath: "martyr",
        unlocks: ["epilogue_martyr"],
        actEnd: true
    }
];

// ==================== EPILOGUE MISSIONS ====================
const EPILOGUE_MISSIONS = {
    tyrant: {
        id: "epilogue_tyrant",
        title: "Epilogue: The Iron Fist",
        description: "2025 - You rule Raajje with absolute power",
        scene: "epilogue_palace",
        ending: "TYRANT"
    },
    puppet: {
        id: "epilogue_puppet",
        title: "Epilogue: The Caged Bird",
        description: "2025 - Mooizbe betrayed you. Life in Dhoonidhoo.",
        scene: "epilogue_prison",
        ending: "PUPPET"
    },
    redemption: {
        id: "epilogue_redemption",
        title: "Epilogue: Cycles Broken",
        description: "2025 - Democracy restored. You found peace.",
        scene: "epilogue_beach",
        ending: "REDEMPTION"
    },
    martyr: {
        id: "epilogue_martyr",
        title: "Epilogue: The People's Hero",
        description: "2025 - Your sacrifice inspired a nation.",
        scene: "epilogue_grave",
        ending: "MARTYR"
    }
};

// ==================== ACT 10 DIALOGUES ====================
const ACT10_DIALOGUES = {
    storm_gathers: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "Brother... the city is burning.", dhivehi: true },
            { text: "Mooizbe declared martial law. Military on streets.", dhivehi: true },
            { text: "Alibe's people are protesting. Thousands.", dhivehi: true },
            { text: "This is it. The moment mashakah waited for.", dhivehi: true },
            { text: "What do mashakah do?", dhivehi: true }
        ]
    },
    
    final_allegiance_choice: {
        speaker: "Narrator",
        sprite: "📖",
        lines: [
            { text: "The fate of Raajje hangs in the balance.", dhivehi: false },
            { text: "Your choices have led you here.", dhivehi: false },
            { text: "Now... make your final decision.", dhivehi: false }
        ],
        choices: [
            { text: "Seize power. Aharen will be the new ruler.", karma: -50, response: "path_tyrant", path: "tyrant" },
            { text: "Help Mooizbe. He promised protection.", karma: -30, response: "path_puppet", path: "puppet" },
            { text: "Help Alibe. Restore democracy peacefully.", karma: 30, response: "path_redemption", path: "redemption" },
            { text: "Sacrifice myself. End the violence.", karma: 50, response: "path_martyr", path: "martyr" }
        ]
    },
    
    path_tyrant: {
        speaker: "Baokalo",
        sprite: "🧑🏾",
        lines: [
            { text: "*cold determination* Mooizbe. Alibe. They're all the same.", dhivehi: true },
            { text: "Politicians. Liars. Users.", dhivehi: true },
            { text: "Aharen built this empire. Aharen will rule it.", dhivehi: true },
            { text: "Raajje needs a strong hand. Aharen hand.", dhivehi: true },
            { text: "Tonight... aharen take the palace.", dhivehi: true }
        ]
    },
    
    path_puppet: {
        speaker: "Baokalo",
        sprite: "🧑🏾",
        lines: [
            { text: "*resigned* Mooizbe is evil. But he's powerful.", dhivehi: true },
            { text: "Aharen family needs protection. He promised.", dhivehi: true },
            { text: "Maybe... maybe aharen can change things from inside.", dhivehi: true },
            { text: "Help him win. Then... we'll see.", dhivehi: true }
        ]
    },
    
    path_redemption: {
        speaker: "Baokalo",
        sprite: "🧑🏾",
        lines: [
            { text: "*hopeful* Father was wrong. Aharen was wrong.", dhivehi: true },
            { text: "Violence only breeds more violence.", dhivehi: true },
            { text: "Alibe... he's not perfect. But he believes in democracy.", dhivehi: true },
            { text: "Aharen will help him. Peacefully.", dhivehi: true },
            { text: "The cycle ends. Today.", dhivehi: true }
        ]
    },
    
    path_martyr: {
        speaker: "Baokalo",
        sprite: "🧑🏾",
        lines: [
            { text: "*at peace* Aharen understand now.", dhivehi: true },
            { text: "Aharen life... it was never about aharen.", dhivehi: true },
            { text: "It was about Raajje. About the people.", dhivehi: true },
            { text: "If aharen death can stop the bloodshed...", dhivehi: true },
            { text: "Then aharen die gladly. For Raajje.", dhivehi: true }
        ]
    },
    
    // TYRANT ENDING
    tyrant_victory: {
        speaker: "Baokalo",
        sprite: "👑",
        lines: [
            { text: "*sitting on throne* Mooizbe is dead. Alibe is exiled.", dhivehi: true },
            { text: "The military answers to aharen now.", dhivehi: true },
            { text: "Aharen am President. No... aharen am KING.", dhivehi: true },
            { text: "Let them call aharen tyrant. Aharen don't care.", dhivehi: true },
            { text: "Raajje is aharen. Forever.", dhivehi: true }
        ]
    },
    
    tyrant_epilogue: {
        speaker: "Narrator",
        sprite: "📖",
        lines: [
            { text: "2025. Two years since the coup.", dhivehi: false },
            { text: "Baokalo rules with an iron fist.", dhivehi: false },
            { text: "The gangs are now the government.", dhivehi: false },
            { text: "Opposition? Silenced. Press? Controlled.", dhivehi: false },
            { text: "The cycle didn't break. It consumed everything.", dhivehi: false },
            { text: "And somewhere, a young boy watches...", dhivehi: false },
            { text: "...and dreams of revenge.", dhivehi: false }
        ]
    },
    
    // PUPPET ENDING
    puppet_betrayal: {
        speaker: "President Mooizbe",
        sprite: "🎩",
        lines: [
            { text: "*laughing* Kaley thought aharen would share power?", dhivehi: true },
            { text: "Kaley useful. But kaley know too much.", dhivehi: true },
            { text: "Commissioner Hassan! Arrest this criminal.", dhivehi: true },
            { text: "Life sentence. Dhoonidhoo. Like kaley father.", dhivehi: true },
            { text: "Thank kaley for kaley service. *laughs*", dhivehi: true }
        ]
    },
    
    puppet_epilogue: {
        speaker: "Narrator",
        sprite: "📖",
        lines: [
            { text: "2025. Two years in Dhoonidhoo.", dhivehi: false },
            { text: "Baokalo trusted the wrong man.", dhivehi: false },
            { text: "Mooizbe rules unchallenged.", dhivehi: false },
            { text: "The family? Scattered. Broken.", dhivehi: false },
            { text: "In his cell, Baokalo thinks of his father.", dhivehi: false },
            { text: "Same prison. Same fate.", dhivehi: false },
            { text: "The cycle continues.", dhivehi: false }
        ]
    },
    
    // REDEMPTION ENDING
    redemption_victory: {
        speaker: "Alibe",
        sprite: "📢",
        lines: [
            { text: "*emotional* Mashakah did it. Peacefully.", dhivehi: true },
            { text: "Mooizbe has resigned. Free elections coming.", dhivehi: true },
            { text: "Kaley... kaley could have taken power. Why didn't kaley?", dhivehi: true },
            { text: "Kaley broke the cycle. Kaley father would be proud.", dhivehi: true },
            { text: "What will kaley do now?", dhivehi: true }
        ]
    },
    
    redemption_epilogue: {
        speaker: "Narrator",
        sprite: "📖",
        lines: [
            { text: "2025. Two years since the peaceful transition.", dhivehi: false },
            { text: "Baokalo left the gang life behind.", dhivehi: false },
            { text: "He runs a fishing business now. Honest work.", dhivehi: false },
            { text: "Rippoo is proud. Nunnu visits often.", dhivehi: false },
            { text: "Muaz? He's in politics now. The legal kind.", dhivehi: false },
            { text: "The cycle is broken.", dhivehi: false },
            { text: "For the first time in generations... there is hope.", dhivehi: false }
        ]
    },
    
    // MARTYR ENDING
    martyr_speech: {
        speaker: "Baokalo",
        sprite: "🧑🏾",
        lines: [
            { text: "*standing before the military* STOP!", dhivehi: true },
            { text: "Aharen am Baokalo. Son of Ibrahim Ronda.", dhivehi: true },
            { text: "Aharen have killed. Aharen have stolen. Aharen have sinned.", dhivehi: true },
            { text: "But today... aharen stand for something greater.", dhivehi: true },
            { text: "If kaley want to shoot the people... shoot aharen first.", dhivehi: true },
            { text: "SHOOT AHAREN!", dhivehi: true }
        ]
    },
    
    martyr_death: {
        speaker: "Narrator",
        sprite: "📖",
        lines: [
            { text: "A single shot rang out.", dhivehi: false },
            { text: "Baokalo fell.", dhivehi: false },
            { text: "But in that moment... something changed.", dhivehi: false },
            { text: "The soldiers lowered their weapons.", dhivehi: false },
            { text: "The crowd surged forward.", dhivehi: false },
            { text: "Not in violence. In grief. In unity.", dhivehi: false },
            { text: "Mooizbe fled that night.", dhivehi: false }
        ]
    },
    
    martyr_epilogue: {
        speaker: "Narrator",
        sprite: "📖",
        lines: [
            { text: "2025. Two years since the sacrifice.", dhivehi: false },
            { text: "They call him the People's Hero now.", dhivehi: false },
            { text: "His grave is a shrine. Flowers every day.", dhivehi: false },
            { text: "Raajje is free. Democracy restored.", dhivehi: false },
            { text: "Nunnu wrote his story. A bestseller.", dhivehi: false },
            { text: "Rippoo visits the grave every Friday.", dhivehi: false },
            { text: "'My son,' she whispers. 'You broke the cycle.'", dhivehi: false },
            { text: "And somewhere, a young boy reads the book...", dhivehi: false },
            { text: "...and dreams of being a hero.", dhivehi: false }
        ]
    },
    
    // FINAL FAMILY DIALOGUES
    rippoo_final: {
        speaker: "Rippoo",
        sprite: "👵🏾",
        lines: [
            { text: "*crying* My son... whatever kaley choose...", dhivehi: true },
            { text: "Aharen love kaley. Always.", dhivehi: true },
            { text: "Kaley father... he would understand.", dhivehi: true },
            { text: "Go. Do what kaley must.", dhivehi: true }
        ]
    },
    
    nunnu_final: {
        speaker: "Nunnu",
        sprite: "👩🏾",
        lines: [
            { text: "*hugging* Brother... be careful.", dhivehi: true },
            { text: "Aharen will tell kaley story. Whatever happens.", dhivehi: true },
            { text: "The world will know who kaley really were.", dhivehi: true }
        ]
    },
    
    muaz_final: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "Brother... mashakah came so far together.", dhivehi: true },
            { text: "Whatever kaley decide... aharen with kaley.", dhivehi: true },
            { text: "Blood is blood. Forever.", dhivehi: true }
        ]
    }
};

// ==================== ENDING SYSTEM ====================
const ENDINGS = {
    tyrant: {
        id: "tyrant",
        title: "THE TYRANT",
        subtitle: "You became what you hated",
        karmaRange: [-100, -30],
        requirements: { path: "tyrant" },
        color: "#8B0000",
        icon: "👑",
        summary: "Baokalo seized power through violence, becoming the new dictator of Raajje. The cycle of corruption continues."
    },
    puppet: {
        id: "puppet",
        title: "THE PUPPET",
        subtitle: "Betrayed by those you served",
        karmaRange: [-30, 0],
        requirements: { path: "puppet" },
        color: "#4a4a4a",
        icon: "⛓️",
        summary: "Baokalo trusted Mooizbe and was betrayed. He rots in prison, just like his father before him."
    },
    redemption: {
        id: "redemption",
        title: "REDEMPTION",
        subtitle: "The cycle is broken",
        karmaRange: [0, 50],
        requirements: { path: "redemption" },
        color: "#228B22",
        icon: "🌅",
        summary: "Baokalo chose peace over power. Democracy was restored, and he found a new life away from crime."
    },
    martyr: {
        id: "martyr",
        title: "THE MARTYR",
        subtitle: "A hero's sacrifice",
        karmaRange: [50, 100],
        requirements: { path: "martyr" },
        color: "#FFD700",
        icon: "🕯️",
        summary: "Baokalo gave his life to save Raajje. His sacrifice inspired a nation and ended the cycle of violence."
    }
};

// ==================== ACT 10 RADIO CONTENT ====================
const ACT10_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM (State Controlled)",
        segments: [
            { type: "emergency", text: "MARTIAL LAW DECLARED. Stay indoors." },
            { type: "news", text: "President Mooizbe addresses the nation: 'Order will be restored.'" },
            { type: "warning", text: "Curfew in effect. Violators will be arrested." },
            { type: "news", text: "Opposition leaders called 'terrorists' by government." }
        ]
    },
    freedomFM: {
        name: "📻 Freedom FM (Underground)",
        segments: [
            { type: "call", text: "Citizens! This is our moment! Take to the streets!" },
            { type: "truth", text: "Mooizbe stole the election. We have proof." },
            { type: "music", text: "♪ Playing: Songs of Revolution ♪" },
            { type: "call", text: "Remember 2012! Never again!" }
        ]
    }
};

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT10_MAPS = ACT10_MAPS;
    window.ACT10_MISSIONS = ACT10_MISSIONS;
    window.EPILOGUE_MISSIONS = EPILOGUE_MISSIONS;
    window.ACT10_DIALOGUES = ACT10_DIALOGUES;
    window.ENDINGS = ENDINGS;
    window.ACT10_RADIO = ACT10_RADIO;
}
