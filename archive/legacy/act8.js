// ============================================
// ACT 8: THE RECKONING
// Timeline: 2022 - Family Secrets Unveiled
// ============================================

// ==================== ACT 8 MAPS ====================
const ACT8_MAPS = {
    ronda_home: {
        name: "Ronda Family Home - Maafannu",
        width: 45,
        height: 40,
        spawnX: 22,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 18, y: 30, w: 8, h: 8, name: "Home Entrance 🚪" },
            livingRoom: { x: 15, y: 20, w: 14, h: 10, name: "Living Room 🛋️" },
            kitchen: { x: 30, y: 20, w: 10, h: 8, name: "Kitchen 🍳" },
            rippooRoom: { x: 5, y: 10, w: 10, h: 10, name: "Rippoo's Room 👵" },
            nunnuRoom: { x: 30, y: 10, w: 10, h: 8, name: "Nunnu's Room 📰" },
            secretBasement: { x: 15, y: 5, w: 12, h: 8, name: "Secret Basement 🔒" },
            backyard: { x: 5, y: 25, w: 10, h: 10, name: "Backyard 🌳" }
        },
        isInterior: true,
        isFamilyHome: true
    },
    
    dhodho_warehouse: {
        name: "DhoDho's Warehouse - Hulhumalé",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 20, y: 35, w: 10, h: 8, name: "Warehouse Entrance 🚪" },
            mainFloor: { x: 10, y: 20, w: 30, h: 15, name: "Main Floor 📦" },
            office: { x: 35, y: 10, w: 10, h: 10, name: "DhoDho's Office 💼" },
            secretRoom: { x: 5, y: 5, w: 12, h: 10, name: "Hidden Room 🔐" },
            loadingDock: { x: 40, y: 30, w: 8, h: 10, name: "Loading Dock 🚛" }
        },
        isInterior: true
    },
    
    newspaper_office: {
        name: "Maldives Independent - Office",
        width: 40,
        height: 35,
        spawnX: 20,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            reception: { x: 15, y: 25, w: 10, h: 8, name: "Reception 🏢" },
            newsroom: { x: 5, y: 15, w: 20, h: 10, name: "Newsroom 📰" },
            nunnuDesk: { x: 25, y: 15, w: 10, h: 8, name: "Nunnu's Desk 💻" },
            archive: { x: 30, y: 5, w: 8, h: 10, name: "Archive Room 📁" },
            rooftop: { x: 5, y: 5, w: 15, h: 8, name: "Rooftop Access 🏗️" }
        },
        isInterior: true
    },
    
    father_grave: {
        name: "Malé Cemetery",
        width: 40,
        height: 35,
        spawnX: 20,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 15, y: 28, w: 10, h: 6, name: "Cemetery Gate ⛩️" },
            oldSection: { x: 5, y: 15, w: 15, h: 12, name: "Old Section 🪦" },
            fatherGrave: { x: 25, y: 10, w: 8, h: 8, name: "Ibrahim's Grave 🪦" },
            familyPlot: { x: 20, y: 5, w: 12, h: 8, name: "Ronda Family Plot 👨‍👩‍👧‍👦" }
        },
        isCemetery: true
    },
    
    confrontation_rooftop: {
        name: "Malé Rooftop - Final Confrontation",
        width: 35,
        height: 30,
        spawnX: 17,
        spawnY: 25,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            stairAccess: { x: 12, y: 22, w: 10, h: 6, name: "Stair Access 🪜" },
            mainRoof: { x: 5, y: 10, w: 25, h: 12, name: "Main Rooftop 🏢" },
            edge: { x: 5, y: 5, w: 25, h: 5, name: "Rooftop Edge ⚠️" },
            waterTank: { x: 25, y: 15, w: 6, h: 6, name: "Water Tank 🛢️" }
        },
        isRooftop: true,
        dangerZone: true
    },
    
    muaz_hideout: {
        name: "Muaz's Safe House",
        width: 35,
        height: 30,
        spawnX: 17,
        spawnY: 25,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 12, y: 22, w: 10, h: 6, name: "Hidden Entrance 🚪" },
            mainRoom: { x: 8, y: 12, w: 18, h: 10, name: "Main Room 🛋️" },
            planningArea: { x: 5, y: 5, w: 12, h: 8, name: "Planning Area 📋" },
            weaponCache: { x: 22, y: 5, w: 8, h: 8, name: "Weapon Cache 🔫" }
        },
        isInterior: true,
        isSafeHouse: true
    }
};

// ==================== ACT 8 CHARACTERS ====================
const ACT8_CHARACTERS = {
    rippooFinal: {
        name: "Rippoo (Mother)",
        sprite: "👵🏾",
        role: "Mother - Final Truth",
        backstory: "Finally reveals the complete truth about the family's criminal past and her role as 'Rippoo the Razor'.",
        dialogues: {
            final_truth: {
                speaker: "Rippoo",
                sprite: "👵🏾",
                lines: [
                    { text: "*crying* Aharen should have told kaley long ago...", dhivehi: true },
                    { text: "Kaley father... Ibrahim... he wasn't just a fisherman.", dhivehi: true },
                    { text: "He was the FOUNDER. The first Baokalo.", dhivehi: true },
                    { text: "And aharen... aharen was his enforcer. Rippoo the Razor.", dhivehi: true },
                    { text: "Mashakah built the empire kaley now control.", dhivehi: true },
                    { text: "The politicians... they killed him because he knew too much.", dhivehi: true }
                ]
            }
        }
    },
    
    dhodhoBetrayal: {
        name: "DhoDho (Uncle)",
        sprite: "👴🏾",
        role: "Uncle - Betrayer",
        backstory: "Reveals his true colors. Has been working with enemies all along, jealous of his brother Ibrahim.",
        dialogues: {
            betrayal_reveal: {
                speaker: "DhoDho",
                sprite: "👴🏾",
                lines: [
                    { text: "*laughs* Kaley finally figured it out?", dhivehi: true },
                    { text: "Aharen HATED kaley father. Always the favorite.", dhivehi: true },
                    { text: "He got the empire. Aharen got nothing.", dhivehi: true },
                    { text: "So aharen made a deal. With Mooizbe. With the police.", dhivehi: true },
                    { text: "Ibrahim's death? Aharen arranged it.", dhivehi: true },
                    { text: "And now... aharen will take what's mine.", dhivehi: true }
                ],
                choices: [
                    { text: "Kaley will kill you for this.", karma: -25, response: "dhodho_fight" },
                    { text: "Why? He was your brother!", karma: 0, response: "dhodho_why" },
                    { text: "Aharen forgive you. Family is family.", karma: 25, response: "dhodho_forgive" }
                ]
            }
        }
    },
    
    nunnuDanger: {
        name: "Nunnu (Sister)",
        sprite: "👩🏾",
        role: "Sister - In Danger",
        backstory: "Her journalism has made her a target. She's uncovered the truth about the family and the government.",
        dialogues: {
            danger_warning: {
                speaker: "Nunnu",
                sprite: "👩🏾",
                lines: [
                    { text: "*scared* Brother... they're coming for aharen.", dhivehi: true },
                    { text: "Aharen found everything. Father's files. The truth.", dhivehi: true },
                    { text: "Mooizbe, DhoDho, the 2012 coup... it's all connected.", dhivehi: true },
                    { text: "If aharen publish this... they'll kill aharen.", dhivehi: true },
                    { text: "But if aharen don't... the cycle continues forever.", dhivehi: true }
                ],
                choices: [
                    { text: "Publish it. Aharen will protect you.", karma: 15, response: "nunnu_publish" },
                    { text: "Don't publish. Your life matters more.", karma: 5, response: "nunnu_hide" },
                    { text: "Give aharen the files. Aharen will use them.", karma: -10, response: "nunnu_files" }
                ]
            }
        }
    },
    
    muazBrother: {
        name: "Muaz (Half-Brother)",
        sprite: "👤",
        role: "Half-Brother - Alliance",
        backstory: "Fully committed to Baokalo now. Wants revenge for their father together.",
        dialogues: {
            alliance_final: {
                speaker: "Muaz",
                sprite: "👤",
                lines: [
                    { text: "Brother... mashakah have same blood. Same enemies.", dhivehi: true },
                    { text: "DhoDho betrayed our father. Mooizbe ordered the hit.", dhivehi: true },
                    { text: "Mashakah can end this. Together.", dhivehi: true },
                    { text: "Or... mashakah can walk away. Start new.", dhivehi: true },
                    { text: "What does kaley want? Revenge or peace?", dhivehi: true }
                ],
                choices: [
                    { text: "Revenge. They all pay.", karma: -30, response: "muaz_revenge" },
                    { text: "Peace. The cycle must end.", karma: 30, response: "muaz_peace" },
                    { text: "Justice. Legal way.", karma: 15, response: "muaz_justice" }
                ]
            }
        }
    },
    
    fatherGhost: {
        name: "Ibrahim (Father's Memory)",
        sprite: "👻",
        role: "Father - Flashback/Vision",
        backstory: "Appears in dreams/visions to guide Baokalo toward the truth.",
        dialogues: {
            grave_vision: {
                speaker: "Ibrahim (Vision)",
                sprite: "👻",
                lines: [
                    { text: "*ethereal* My son... kaley have grown strong.", dhivehi: true },
                    { text: "Aharen made mistakes. Many mistakes.", dhivehi: true },
                    { text: "The empire... it corrupted aharen. Corrupted everyone.", dhivehi: true },
                    { text: "Kaley can be different. Kaley can break the cycle.", dhivehi: true },
                    { text: "Or kaley can become what aharen was. The choice is kaley.", dhivehi: true }
                ]
            }
        }
    },
    
    enemyLeader: {
        name: "Commissioner Hassan",
        sprite: "👮🏾",
        role: "Police Commissioner - Enemy",
        backstory: "The man who orchestrated Ibrahim's arrest and death. Now targeting the whole family.",
        dialogues: {
            confrontation: {
                speaker: "Commissioner Hassan",
                sprite: "👮🏾",
                lines: [
                    { text: "*sneering* The Ronda boy. Just like kaley father.", dhivehi: true },
                    { text: "Aharen put him in Dhoonidhoo. Aharen watched him die.", dhivehi: true },
                    { text: "And now... aharen will do the same to kaley.", dhivehi: true },
                    { text: "Unless... kaley want to make a deal?", dhivehi: true }
                ],
                choices: [
                    { text: "No deals. Kaley end this now.", karma: 0, response: "hassan_fight" },
                    { text: "What kind of deal?", karma: -15, response: "hassan_deal" },
                    { text: "Aharen have evidence. Kaley going down.", karma: 10, response: "hassan_evidence" }
                ]
            }
        }
    }
};

// ==================== ACT 8 MISSIONS ====================
const ACT8_MISSIONS = [
    {
        id: "act8_m1",
        title: "Homecoming",
        type: "story",
        description: "Return to the family home after years away",
        objectives: [
            { type: "travel", target: "ronda_home", current: false },
            { type: "trigger", target: "familyReunion", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "family_reunion",
        unlocks: ["act8_m2"]
    },
    {
        id: "act8_m2",
        title: "Mother's Confession",
        type: "story",
        description: "Rippoo finally tells the truth",
        objectives: [
            { type: "travel", target: "rippooRoom", current: false },
            { type: "trigger", target: "rippooConfession", current: false }
        ],
        rewards: { money: 0, karma: 0 },
        dialogueStart: "rippoo_final_truth",
        unlocks: ["act8_m3"],
        emotionalScene: true
    },
    {
        id: "act8_m3",
        title: "The Secret Basement",
        type: "exploration",
        description: "Discover father's hidden files",
        objectives: [
            { type: "find", target: "basementKey", current: false },
            { type: "travel", target: "secretBasement", current: false },
            { type: "collect", target: "fatherFiles", current: false }
        ],
        rewards: { money: 0 },
        unlocks: ["act8_m4"]
    },
    {
        id: "act8_m4",
        title: "Sister's Warning",
        type: "story",
        description: "Nunnu reveals she's being targeted",
        objectives: [
            { type: "travel", target: "newspaper_office", current: false },
            { type: "trigger", target: "nunnuWarning", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "nunnu_danger_warning",
        unlocks: ["act8_m5"],
        moralChoice: true
    },
    {
        id: "act8_m5",
        title: "Protect the Press",
        type: "defense",
        description: "Defend Nunnu from attackers",
        objectives: [
            { type: "defend", target: "nunnuDesk", duration: 120, current: 0 },
            { type: "defeat", target: "hitman", count: 8, current: 0 },
            { type: "escort", target: "nunnu", current: false }
        ],
        rewards: { money: 3000, karma: 10, family: 15 },
        unlocks: ["act8_m6"]
    },
    {
        id: "act8_m6",
        title: "Uncle's Warehouse",
        type: "investigation",
        description: "Investigate DhoDho's suspicious activities",
        objectives: [
            { type: "travel", target: "dhodho_warehouse", current: false },
            { type: "stealth", target: "secretRoom", current: false },
            { type: "collect", target: "evidence", current: false }
        ],
        rewards: { money: 2000 },
        unlocks: ["act8_m7"]
    },
    {
        id: "act8_m7",
        title: "The Betrayal",
        type: "story",
        description: "Confront DhoDho with the evidence",
        objectives: [
            { type: "travel", target: "office", current: false },
            { type: "trigger", target: "dhodhoConfrontation", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "dhodho_betrayal_reveal",
        unlocks: ["act8_m8", "act8_m9"],
        majorChoice: "dhodho_fate",
        moralChoice: true
    },
    {
        id: "act8_m8",
        title: "Blood Vengeance",
        type: "combat",
        description: "Kill DhoDho for his betrayal",
        objectives: [
            { type: "boss", target: "dhodho", current: false },
            { type: "defeat", target: "dhodhoGuard", count: 6, current: 0 }
        ],
        rewards: { money: 10000, karma: -40, family: -30 },
        unlocks: ["act8_m10"],
        requiresChoice: "dhodho_fight",
        bossMusic: true
    },
    {
        id: "act8_m9",
        title: "Family Forgiveness",
        type: "story",
        description: "Spare DhoDho despite his betrayal",
        objectives: [
            { type: "trigger", target: "dhodhoSpared", current: false },
            { type: "escort", target: "dhodho", current: false }
        ],
        rewards: { money: 0, karma: 30, family: 20 },
        unlocks: ["act8_m10"],
        requiresChoice: "dhodho_forgive"
    },
    {
        id: "act8_m10",
        title: "Father's Grave",
        type: "story",
        description: "Visit Ibrahim's grave for answers",
        objectives: [
            { type: "travel", target: "father_grave", current: false },
            { type: "trigger", target: "graveVision", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "father_grave_vision",
        unlocks: ["act8_m11"],
        emotionalScene: true
    },
    {
        id: "act8_m11",
        title: "Brother's Alliance",
        type: "story",
        description: "Decide the future with Muaz",
        objectives: [
            { type: "travel", target: "muaz_hideout", current: false },
            { type: "trigger", target: "muazAlliance", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "muaz_alliance_final",
        unlocks: ["act8_m12"],
        majorChoice: "path_forward",
        moralChoice: true
    },
    {
        id: "act8_m12",
        title: "The Commissioner",
        type: "story",
        description: "Commissioner Hassan makes his move",
        objectives: [
            { type: "survive", target: "policeRaid", current: false },
            { type: "escape", target: "safeHouse", current: false }
        ],
        rewards: { money: 5000 },
        unlocks: ["act8_climax"]
    },
    {
        id: "act8_climax",
        title: "Rooftop Reckoning",
        type: "boss",
        description: "Final confrontation with Commissioner Hassan",
        objectives: [
            { type: "travel", target: "confrontation_rooftop", current: false },
            { type: "defeat", target: "policeElite", count: 10, current: 0 },
            { type: "boss", target: "commissionerHassan", current: false },
            { type: "decide", target: "hassanFate", current: false }
        ],
        rewards: { money: 15000 },
        unlocks: ["act9_start"],
        actEnd: true,
        bossMusic: true,
        majorChoice: "hassan_ending"
    }
];

// ==================== ACT 8 SIDE MISSIONS ====================
const ACT8_SIDE_MISSIONS = [
    { id: "side8_memory1", title: "Childhood Memories I", type: "exploration", reward: 300 },
    { id: "side8_memory2", title: "Childhood Memories II", type: "exploration", reward: 400 },
    { id: "side8_photo", title: "Family Photos", type: "collection", reward: 500 },
    { id: "side8_grave1", title: "Visit Grandfather's Grave", type: "story", reward: 200 },
    { id: "side8_grave2", title: "Clean Family Plot", type: "task", reward: 300 },
    { id: "side8_protect1", title: "Protect Nunnu I", type: "defense", reward: 800 },
    { id: "side8_protect2", title: "Protect Nunnu II", type: "defense", reward: 1000 },
    { id: "side8_evidence1", title: "Gather Evidence I", type: "investigation", reward: 600 },
    { id: "side8_evidence2", title: "Gather Evidence II", type: "investigation", reward: 800 },
    { id: "side8_muaz1", title: "Help Muaz I", type: "combat", reward: 700 },
    { id: "side8_muaz2", title: "Help Muaz II", type: "combat", reward: 900 }
];

// ==================== ACT 8 DIALOGUES ====================
const ACT8_DIALOGUES = {
    family_reunion: {
        speaker: "Rippoo",
        sprite: "👵🏾",
        lines: [
            { text: "*opens door* My son... kaley finally home.", dhivehi: true },
            { text: "Aharen heard what kaley did. In the south. The resorts.", dhivehi: true },
            { text: "Kaley becoming... like kaley father.", dhivehi: true },
            { text: "Come inside. Mashakah need to talk. All of us.", dhivehi: true }
        ]
    },
    
    rippoo_final_truth: {
        speaker: "Rippoo",
        sprite: "👵🏾",
        lines: [
            { text: "*crying* Aharen should have told kaley long ago...", dhivehi: true },
            { text: "Kaley father... Ibrahim... he wasn't just a fisherman.", dhivehi: true },
            { text: "He was the FOUNDER. The first Baokalo.", dhivehi: true },
            { text: "And aharen... aharen was his enforcer. Rippoo the Razor.", dhivehi: true },
            { text: "Mashakah built the empire kaley now control.", dhivehi: true },
            { text: "The politicians... they killed him because he knew too much.", dhivehi: true },
            { text: "About the 1988 coup. About Gayoom. About everything.", dhivehi: true }
        ]
    },
    
    nunnu_danger_warning: {
        speaker: "Nunnu",
        sprite: "👩🏾",
        lines: [
            { text: "*scared* Brother... they're coming for aharen.", dhivehi: true },
            { text: "Aharen found everything. Father's files. The truth.", dhivehi: true },
            { text: "Mooizbe, DhoDho, the 2012 coup... it's all connected.", dhivehi: true },
            { text: "If aharen publish this... they'll kill aharen.", dhivehi: true },
            { text: "But if aharen don't... the cycle continues forever.", dhivehi: true }
        ],
        choices: [
            { text: "Publish it. Aharen will protect you.", karma: 15, response: "nunnu_publish" },
            { text: "Don't publish. Your life matters more.", karma: 5, response: "nunnu_hide" },
            { text: "Give aharen the files. Aharen will use them.", karma: -10, response: "nunnu_files" }
        ]
    },
    
    nunnu_publish: {
        speaker: "Nunnu",
        sprite: "👩🏾",
        lines: [
            { text: "*determined* Kaley right. The truth must come out.", dhivehi: true },
            { text: "Aharen will publish tomorrow. Front page.", dhivehi: true },
            { text: "Whatever happens... aharen proud of kaley, brother.", dhivehi: true },
            { text: "Mashakah Rondas... mashakah don't hide from truth.", dhivehi: true }
        ]
    },
    
    nunnu_hide: {
        speaker: "Nunnu",
        sprite: "👩🏾",
        lines: [
            { text: "*relieved but sad* Maybe kaley right...", dhivehi: true },
            { text: "Aharen will hide the files. For now.", dhivehi: true },
            { text: "But someday... the truth will come out.", dhivehi: true },
            { text: "Aharen just hope mashakah still alive to see it.", dhivehi: true }
        ]
    },
    
    nunnu_files: {
        speaker: "Nunnu",
        sprite: "👩🏾",
        lines: [
            { text: "*hesitant* Kaley want to use them? For what?", dhivehi: true },
            { text: "Blackmail? Leverage? That's not journalism.", dhivehi: true },
            { text: "*sighs* Fine. Take them. Kaley the boss now.", dhivehi: true },
            { text: "Just... don't become what father became.", dhivehi: true }
        ]
    },
    
    dhodho_betrayal_reveal: {
        speaker: "DhoDho",
        sprite: "👴🏾",
        lines: [
            { text: "*laughs* Kaley finally figured it out?", dhivehi: true },
            { text: "Aharen HATED kaley father. Always the favorite.", dhivehi: true },
            { text: "He got the empire. Aharen got nothing.", dhivehi: true },
            { text: "So aharen made a deal. With Mooizbe. With the police.", dhivehi: true },
            { text: "Ibrahim's death? Aharen arranged it.", dhivehi: true },
            { text: "And now... aharen will take what's mine.", dhivehi: true }
        ],
        choices: [
            { text: "Kaley will kill you for this.", karma: -25, response: "dhodho_fight" },
            { text: "Why? He was your brother!", karma: 0, response: "dhodho_why" },
            { text: "Aharen forgive you. Family is family.", karma: 25, response: "dhodho_forgive" }
        ]
    },
    
    dhodho_fight: {
        speaker: "DhoDho",
        sprite: "👴🏾",
        lines: [
            { text: "*draws weapon* Then come, nephew!", dhivehi: true },
            { text: "Aharen killed kaley father. Aharen can kill kaley too!", dhivehi: true },
            { text: "GUARDS! KILL HIM!", dhivehi: true }
        ]
    },
    
    dhodho_why: {
        speaker: "DhoDho",
        sprite: "👴🏾",
        lines: [
            { text: "*bitter* Brother? He was never a brother to aharen.", dhivehi: true },
            { text: "Always Ibrahim this, Ibrahim that.", dhivehi: true },
            { text: "Aharen worked just as hard. Got nothing.", dhivehi: true },
            { text: "So aharen took what aharen deserved.", dhivehi: true }
        ]
    },
    
    dhodho_forgive: {
        speaker: "DhoDho",
        sprite: "👴🏾",
        lines: [
            { text: "*shocked* Kaley... forgive aharen?", dhivehi: true },
            { text: "After everything aharen did?", dhivehi: true },
            { text: "*breaks down* Aharen... aharen sorry. So sorry.", dhivehi: true },
            { text: "Kaley better man than aharen ever was.", dhivehi: true }
        ]
    },
    
    father_grave_vision: {
        speaker: "Ibrahim (Vision)",
        sprite: "👻",
        lines: [
            { text: "*ethereal* My son... kaley have grown strong.", dhivehi: true },
            { text: "Aharen made mistakes. Many mistakes.", dhivehi: true },
            { text: "The empire... it corrupted aharen. Corrupted everyone.", dhivehi: true },
            { text: "Kaley can be different. Kaley can break the cycle.", dhivehi: true },
            { text: "Or kaley can become what aharen was. The choice is kaley.", dhivehi: true },
            { text: "Whatever kaley choose... aharen love kaley. Always.", dhivehi: true }
        ]
    },
    
    muaz_alliance_final: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "Brother... mashakah have same blood. Same enemies.", dhivehi: true },
            { text: "DhoDho betrayed our father. Mooizbe ordered the hit.", dhivehi: true },
            { text: "Mashakah can end this. Together.", dhivehi: true },
            { text: "Or... mashakah can walk away. Start new.", dhivehi: true },
            { text: "What does kaley want? Revenge or peace?", dhivehi: true }
        ],
        choices: [
            { text: "Revenge. They all pay.", karma: -30, response: "muaz_revenge" },
            { text: "Peace. The cycle must end.", karma: 30, response: "muaz_peace" },
            { text: "Justice. Legal way.", karma: 15, response: "muaz_justice" }
        ]
    },
    
    muaz_revenge: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*nods grimly* Aharen understand, brother.", dhivehi: true },
            { text: "Mashakah will make them all pay.", dhivehi: true },
            { text: "Mooizbe. Hassan. Everyone who hurt our family.", dhivehi: true },
            { text: "Blood for blood. The Maldivian way.", dhivehi: true }
        ]
    },
    
    muaz_peace: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*surprised* Peace? After everything?", dhivehi: true },
            { text: "*thinks* Maybe kaley right. Maybe enough blood.", dhivehi: true },
            { text: "Mashakah can disappear. Start over. New names.", dhivehi: true },
            { text: "But... can kaley really walk away from all this?", dhivehi: true }
        ]
    },
    
    muaz_justice: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*skeptical* Legal way? In Maldives?", dhivehi: true },
            { text: "The courts are bought. The police are corrupt.", dhivehi: true },
            { text: "But... if kaley have the evidence...", dhivehi: true },
            { text: "Maybe international courts. ICC. UN.", dhivehi: true },
            { text: "Risky. But... honorable. Aharen with kaley.", dhivehi: true }
        ]
    },
    
    hassan_confrontation: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "*sneering* The Ronda boy. Just like kaley father.", dhivehi: true },
            { text: "Aharen put him in Dhoonidhoo. Aharen watched him die.", dhivehi: true },
            { text: "And now... aharen will do the same to kaley.", dhivehi: true },
            { text: "Unless... kaley want to make a deal?", dhivehi: true }
        ],
        choices: [
            { text: "No deals. Kaley end this now.", karma: 0, response: "hassan_fight" },
            { text: "What kind of deal?", karma: -15, response: "hassan_deal" },
            { text: "Aharen have evidence. Kaley going down.", karma: 10, response: "hassan_evidence" }
        ]
    },
    
    hassan_fight: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "*draws gun* Brave. Stupid, but brave.", dhivehi: true },
            { text: "Just like kaley father's last words.", dhivehi: true },
            { text: "MEN! KILL HIM!", dhivehi: true }
        ]
    },
    
    hassan_deal: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "*smiles* Smart. Work for aharen. Like DhoDho did.", dhivehi: true },
            { text: "Kaley run the streets. Aharen get 50%.", dhivehi: true },
            { text: "Everyone wins. Except... kaley soul.", dhivehi: true }
        ]
    },
    
    hassan_evidence: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "*laughs nervously* Evidence? What evidence?", dhivehi: true },
            { text: "Kaley bluffing. Kaley have nothing.", dhivehi: true },
            { text: "*sees files* Where... where did kaley get those?!", dhivehi: true },
            { text: "GIVE THEM TO AHAREN!", dhivehi: true }
        ]
    }
};

// ==================== ACT 8 RADIO CONTENT ====================
const ACT8_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Police Commissioner Hassan denies corruption allegations." },
            { type: "news", text: "Journalist receives death threats. Identity protected." },
            { type: "satire", text: "'Family values' - When your uncle sells you out." },
            { type: "news", text: "Cemetery vandalism reported in Malé. Investigation ongoing." },
            { type: "ad", text: "Family counseling services. Because some secrets hurt." }
        ]
    },
    undergroundFM: {
        name: "📻 Underground FM",
        segments: [
            { type: "truth", text: "The Ronda family secret: What really happened in 1998?" },
            { type: "truth", text: "DhoDho's warehouse: More than just imports." },
            { type: "music", text: "♪ Playing: Boduberu of Betrayal ♪" },
            { type: "truth", text: "Commissioner Hassan's offshore accounts revealed." },
            { type: "call", text: "Caller: 'My family destroyed by same people. Fight back!'" }
        ]
    }
};

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT8_MAPS = ACT8_MAPS;
    window.ACT8_CHARACTERS = ACT8_CHARACTERS;
    window.ACT8_MISSIONS = ACT8_MISSIONS;
    window.ACT8_SIDE_MISSIONS = ACT8_SIDE_MISSIONS;
    window.ACT8_DIALOGUES = ACT8_DIALOGUES;
    window.ACT8_RADIO = ACT8_RADIO;
}
