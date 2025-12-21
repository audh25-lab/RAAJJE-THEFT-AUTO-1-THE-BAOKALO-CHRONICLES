 for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
// ============================================
// RAAJJE THEFT AUTO 1: THE BAOKALO CHRONICLES
// Complete Game Engine - Act 1: Maafannu Awakening
// ============================================

// ==================== GAME STATE ====================
const GameState = {
    // Core state
    currentAct: 1,
    currentMission: 0,
    missionPhase: 0,
    isPlaying: false,
    isPaused: false,
    isInDialogue: false,
    isInMinigame: false,
    
    // Player stats
    player: {
        x: 400,
        y: 300,
        width: 32,
        height: 32,
        speed: 3,
        health: 100,
        maxHealth: 100,
        stamina: 100,
        maxStamina: 100,
        karma: 50, // 0-100, 50 is neutral
        familyMeter: 50, // 0-100
        money: 0,
        direction: 'down',
        isMoving: false,
        isSprinting: false,
        isAttacking: false,
        attackCooldown: 0,
        inventory: [],
        weapons: ['fists'],
        currentWeapon: 'fists',
        skills: {
            combat: 1,
            stealth: 1,
            charisma: 1,
            piloting: 1
        }
    },
    
    // World state
    world: {
        currentMap: 'male_maafannu',
        time: 8, // 0-24 hours
        weather: 'clear', // clear, cloudy, rain, storm
        heat: 0, // 0-5 police heat level
    },
    
    // Gang relations
    gangs: {
        hulhuHustlers: { reputation: 0, allied: false },
        maleSharks: { reputation: 0, allied: false },
        masodi: { reputation: -20, allied: false },
        kudaHenveiru: { reputation: -10, allied: false },
        wanted: { reputation: -30, allied: false }
    },
    
    // Story flags
    flags: {
        metHulhuHustlers: false,
        completedTutorial: false,
        sawNunnuNews: false,
        familyDinnerHappened: false,
        rippooSecretHinted: false,
        recruitedMinors: false
    },
    
    // Completed missions
    completedMissions: [],
    completedSideMissions: [],
    
    // Choices made
    choices: [],
    
    // Achievements
    achievements: [],
    
    // Upgrades purchased
    upgrades: []
};

// ==================== CONSTANTS ====================
const TILE_SIZE = 32;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Character emoji sprites
const SPRITES = {
    baokalo: '🧑🏾',
    baokaloAngry: '😠',
    rippoo: '👩🏾',
    abuch: '👨🏾',
    nunnu: '👩🏾‍⚕️',
    ronda: '👴🏾',
    nappey: '👵🏾',
    dhodho: '👨🏾‍✈️',
    zadey: '👩🏾‍💼',
    gangMember: '🧔🏾',
    gangLeader: '😎',
    police: '👮🏾',
    tourist: '🧑🏻',
    fisherman: '🎣',
    shopkeeper: '🧑🏾‍🍳',
    politician: '🤵🏾',
    mooizbe: '🤴🏾',
    anni: '👨🏾‍💼',
    jabibe: '🤑',
    rishbe: '🧑🏾‍💻',
    muaz: '🧔🏾‍♂️',
    npc: '🧑🏾',
    child: '👦🏾'
};

// Vehicle sprites
const VEHICLES = {
    motorcycle: '🏍️',
    dhoni: '🚣',
    speedboat: '🚤',
    seaplane: '🛩️',
    bicycle: '🚲'
};

// Item sprites
const ITEMS = {
    money: '💵',
    wallet: '👛',
    phone: '📱',
    bat: '🏏',
    knife: '🔪',
    drugs: '💊',
    fish: '🐟',
    key: '🔑'
};

// ==================== DHIVEHI DIALOGUES ====================
const DIALOGUES = {
    // Tutorial dialogues
    tutorial_intro: {
        speaker: "Hulhu Hustlers Member",
        sprite: SPRITES.gangMember,
        lines: [
            { text: "Kaley new? Aharen Faisal. Welcome to Maafannu.", dhivehi: true },
            { text: "Easy job first - just snatch wallets in fish market.", dhivehi: false },
            { text: "Mashakah show kaley how it's done. Follow me.", dhivehi: true }
        ]
    },
    
    tutorial_pickpocket: {
        speaker: "Faisal",
        sprite: SPRITES.gangMember,
        lines: [
            { text: "See that tourist? 🧑🏻 Walk behind, press 🤝 to grab wallet.", dhivehi: false },
            { text: "Don't let them see kaley! Stealth is key.", dhivehi: true },
            { text: "Bring 3 wallets. Faisaa for the crew!", dhivehi: true }
        ]
    },
    
    tutorial_combat: {
        speaker: "Faisal",
        sprite: SPRITES.gangMember,
        lines: [
            { text: "Kuda Henveiru sodu coming! Time to fight!", dhivehi: true },
            { text: "Use 👊 to attack. Dodge their swings!", dhivehi: false },
            { text: "Show them Hulhu Hustlers own Maafannu!", dhivehi: true }
        ]
    },
    
    // Family dialogues
    rippoo_confrontation: {
        speaker: "Rippoo (Mother)",
        sprite: SPRITES.rippoo,
        lines: [
            { text: "Kipal! Aharen heard what kaley doing in Maafannu!", dhivehi: true },
            { text: "Mashakah escaped this life! Why kaley choose it?!", dhivehi: true },
            { text: "Darifulhaakah... please. Come home.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen sorry, mother. But I have no choice.", karma: 5, response: "choice_apologize" },
            { text: "Kaley don't understand! Nunnu gets everything!", karma: -5, response: "choice_angry" },
            { text: "[Stay silent]", karma: 0, response: "choice_silent" }
        ]
    },
    
    rippoo_response_apologize: {
        speaker: "Rippoo",
        sprite: SPRITES.rippoo,
        lines: [
            { text: "*sighs* There's always a choice, Kipal.", dhivehi: false },
            { text: "Mashakah praying for kaley. Be careful.", dhivehi: true }
        ]
    },
    
    rippoo_response_angry: {
        speaker: "Rippoo",
        sprite: SPRITES.rippoo,
        lines: [
            { text: "*slaps Baokalo* Kaley sodu! Don't speak of sister!", dhivehi: true },
            { text: "Aharen sacrificed everything for this family!", dhivehi: true }
        ]
    },
    
    rippoo_response_silent: {
        speaker: "Rippoo",
        sprite: SPRITES.rippoo,
        lines: [
            { text: "*tears up* Just like your father... stubborn.", dhivehi: false },
            { text: "Go then. But remember - mashakah always here.", dhivehi: true }
        ]
    },
    
    // Grandfather disownment
    ronda_disown: {
        speaker: "Ronda Masterah (Grandfather)",
        sprite: SPRITES.ronda,
        lines: [
            { text: "*playing boduberu stops*", dhivehi: false },
            { text: "Thilhen... kaley destroyed our family name.", dhivehi: true },
            { text: "Alhugandakah ashamed. Uzaa from my house!", dhivehi: true }
        ]
    },
    
    // Grandmother support
    nappey_support: {
        speaker: "Nappey Aunty (Grandmother)",
        sprite: SPRITES.nappey,
        lines: [
            { text: "Kalaa dhon darifulhaakah...", dhivehi: true },
            { text: "He is lost, not evil. Mashakah praying for kaley.", dhivehi: true },
            { text: "*hands huni roshi* Eat. Stay safe.", dhivehi: false }
        ]
    },
    
    // Gang dialogues
    gang_recruit: {
        speaker: "Hulhu Hustlers Boss",
        sprite: SPRITES.gangLeader,
        lines: [
            { text: "Kaley got skills, Addu boy.", dhivehi: true },
            { text: "Mashakah need more soldiers. Kids from the street.", dhivehi: true },
            { text: "Recruit 3 young ones. They listen to kaley.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen won't recruit children. Find another way.", karma: 15, familyKarma: 10, response: "refuse_recruit" },
            { text: "Whatever it takes. Mashakah do it.", karma: -20, familyKarma: -15, response: "accept_recruit" }
        ]
    },
    
    // Newspaper about Nunnu
    nunnu_news: {
        speaker: "Newspaper",
        sprite: "📰",
        lines: [
            { text: "BREAKING: Addu Student Wins Medical Scholarship!", dhivehi: false },
            { text: "Nunnu Bats Ronda, 18, accepted to Bangalore Medical College.", dhivehi: false },
            { text: "'My family sacrificed everything,' says proud scholar.", dhivehi: false }
        ]
    },
    
    // Mission complete
    mission_complete: {
        speaker: "System",
        sprite: "✅",
        lines: [
            { text: "Mission Complete!", dhivehi: false },
            { text: "Faisaa earned. Reputation increased.", dhivehi: false }
        ]
    }
};

// ==================== RADIO SATIRE ====================
const RADIO_CONTENT = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Breaking: President Mooizbe declares 'No gangs exist in Raajje!' Police confirm 83 active gangs..." },
            { type: "news", text: "Gang Act 2025 passes! 48-hour detention without lawyer now legal. Minister says 'for safety.'" },
            { type: "satire", text: "Tourism Minister: 'Paradise has no crime!' *gunshots in background*" },
            { type: "news", text: "Drugs Act death penalty proposed. Critics ask: 'What about politician dealers?'" },
            { type: "ad", text: "Visit Maldives! Sun, sand, and definitely no organized crime! 🏝️" },
            { type: "satire", text: "PNC MP: 'Gangs are fiction!' *surrounded by bodyguards from Masodi*" },
            { type: "news", text: "India boycott continues. China investments surge. Debt? What debt?" },
            { type: "music", text: "♪ Now playing: Traditional Boduberu - 'Dhoni Life' ♪" }
        ]
    },
    undergroundFM: {
        name: "📻 Underground FM",
        segments: [
            { type: "truth", text: "Real talk: 3,050 gang members. 97 are children. Government knows." },
            { type: "truth", text: "Yameen in jail. Muizzu in power. Same corruption, different face." },
            { type: "truth", text: "Journalist Yamin Rasheed - murdered 2017. Case still 'unsolved.'" },
            { type: "truth", text: "250 Maldivians joined ISIS. Highest per capita. Where's the outrage?" },
            { type: "music", text: "♪ Playing: 'Kazzabu Anthem' - The Liars Song ♪" }
        ]
    }
};

// ==================== MAPS DATA ====================
const MAPS = {
    male_maafannu: {
        name: "Maafannu District, Malé",
        width: 50,
        height: 40,
        spawnX: 25,
        spawnY: 35,
        // Tile types: 0=water, 1=ground, 2=road, 3=building, 4=market, 5=dock
        tiles: [], // Generated procedurally
        npcs: [],
        items: [],
        zones: {
            fishMarket: { x: 10, y: 10, w: 15, h: 10, name: "Fish Market 🐟" },
            teaShop: { x: 30, y: 20, w: 8, h: 6, name: "Rippoo's Tea Shop ☕" },
            safehouse: { x: 40, y: 30, w: 6, h: 6, name: "Hulhu Safehouse 🏠" },
            alley: { x: 20, y: 25, w: 5, h: 10, name: "Dark Alley 🌑" }
        },
        gangTerritory: "Hulhu Hustlers"
    },
    
    male_henveiru: {
        name: "Henveiru District, Malé",
        width: 50,
        height: 40,
        spawnX: 5,
        spawnY: 20,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            kudaTerritory: { x: 20, y: 15, w: 20, h: 15, name: "Kuda Henveiru Turf ⚠️" },
            park: { x: 35, y: 5, w: 10, h: 10, name: "Sultan Park 🌳" }
        },
        gangTerritory: "Kuda Henveiru"
    },
    
    addu_maradhoo: {
        name: "Maradhoo, Addu City",
        width: 60,
        height: 50,
        spawnX: 30,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            rondaHome: { x: 25, y: 20, w: 10, h: 8, name: "Ronda Family Home 🏡" },
            beach: { x: 0, y: 35, w: 60, h: 15, name: "Maradhoo Beach 🏖️" }
        },
        gangTerritory: null // No gang initially
    }
};

// ==================== MISSIONS DATA ====================
const MISSIONS = {
    act1: [
        {
            id: "act1_m1",
            title: "The First Score",
            type: "tutorial",
            description: "Pickpocket 3 wallets in the fish market",
            objectives: [
                { type: "collect", target: "wallet", count: 3, current: 0 }
            ],
            rewards: { money: 100, karma: -5, reputation: { hulhuHustlers: 10 } },
            dialogueStart: "tutorial_intro",
            dialogueEnd: "mission_complete",
            unlocks: ["act1_m2"]
        },
        {
            id: "act1_m2",
            title: "Bat Initiation",
            type: "combat",
            description: "Fight Kuda Henveiru thugs in the alley",
            objectives: [
                { type: "defeat", target: "kudaThug", count: 3, current: 0 }
            ],
            rewards: { money: 150, karma: -10, reputation: { hulhuHustlers: 15, kudaHenveiru: -20 } },
            dialogueStart: "tutorial_combat",
            unlocks: ["act1_m3"]
        },
        {
            id: "act1_m3",
            title: "Mother's Business",
            type: "delivery",
            description: "Deliver package for Rippoo's tea shop",
            objectives: [
                { type: "deliver", target: "package", destination: "velanaAirport", current: false }
            ],
            rewards: { money: 200, karma: -5 },
            dialogueStart: null,
            unlocks: ["act1_m4", "act1_m5", "act1_m6"],
            vehicleUnlock: "motorcycle"
        },
        {
            id: "act1_m4",
            title: "Territory Wars I",
            type: "combat",
            description: "Help Hulhu Hustlers fight Masodi scouts",
            objectives: [
                { type: "defeat", target: "masodiScout", count: 5, current: 0 }
            ],
            rewards: { money: 250, karma: -15, reputation: { hulhuHustlers: 20, masodi: -25 } },
            unlocks: ["act1_m5"]
        },
        {
            id: "act1_m5",
            title: "Territory Wars II",
            type: "combat",
            description: "Defend the fish market from Masodi",
            objectives: [
                { type: "defend", target: "fishMarket", duration: 60, current: 0 }
            ],
            rewards: { money: 300, karma: -10, reputation: { hulhuHustlers: 25 } },
            unlocks: ["act1_m6"]
        },
        {
            id: "act1_m6",
            title: "Territory Wars III",
            type: "combat",
            description: "Push Masodi out of Maafannu",
            objectives: [
                { type: "capture", target: "masodiOutpost", current: false }
            ],
            rewards: { money: 400, karma: -20, reputation: { hulhuHustlers: 30, masodi: -40 } },
            unlocks: ["act1_m7"]
        },
        {
            id: "act1_m7",
            title: "Sister's Shadow",
            type: "story",
            description: "See the newspaper about Nunnu's scholarship",
            objectives: [
                { type: "trigger", target: "readNewspaper", current: false }
            ],
            rewards: { karma: 0 },
            dialogueStart: "nunnu_news",
            unlocks: ["act1_m8", "act1_m9"],
            setFlag: "sawNunnuNews"
        },
        {
            id: "act1_m8",
            title: "Bail Money I",
            type: "extortion",
            description: "Get bail money for arrested gang member",
            objectives: [
                { type: "collect", target: "bailMoney", count: 500, current: 0 }
            ],
            rewards: { money: 100, reputation: { hulhuHustlers: 15 } },
            moralChoice: true,
            unlocks: ["act1_m9"]
        },
        {
            id: "act1_m9",
            title: "Bail Money II",
            type: "extortion",
            description: "Collect remaining bail from shop owner",
            objectives: [
                { type: "interact", target: "shopOwner", current: false }
            ],
            rewards: { money: 200 },
            moralChoice: true,
            choices: [
                { text: "Threaten the owner", karma: -15, outcome: "threaten" },
                { text: "Offer to do a job instead", karma: 10, outcome: "help" }
            ],
            unlocks: ["act1_m10"]
        },
        {
            id: "act1_m10",
            title: "The Recruit",
            type: "recruitment",
            description: "Recruit new members for Hulhu Hustlers",
            objectives: [
                { type: "recruit", target: "gangMember", count: 3, current: 0 }
            ],
            rewards: { money: 300, reputation: { hulhuHustlers: 25 } },
            moralChoice: true,
            dialogueStart: "gang_recruit",
            unlocks: ["act1_m11"],
            setFlag: "recruitedMinors"
        },
        {
            id: "act1_m11",
            title: "Maafannu Claimed I",
            type: "combat",
            description: "Turf war vs Wanted gang",
            objectives: [
                { type: "defeat", target: "wantedMember", count: 8, current: 0 }
            ],
            rewards: { money: 500, karma: -25, reputation: { hulhuHustlers: 35, wanted: -50 } },
            unlocks: ["act1_m12"]
        },
        {
            id: "act1_m12",
            title: "Maafannu Claimed II",
            type: "boss",
            description: "Defeat Marn, leader of Wanted gang",
            objectives: [
                { type: "defeat", target: "marn", count: 1, current: 0 }
            ],
            rewards: { money: 1000, karma: -30, reputation: { hulhuHustlers: 50, wanted: -100 } },
            unlocks: ["act1_climax"],
            bossMusic: true
        },
        {
            id: "act1_climax",
            title: "Family Dinner Disaster",
            type: "story",
            description: "Attend family dinner at Ronda's home",
            objectives: [
                { type: "travel", target: "addu_maradhoo", current: false },
                { type: "trigger", target: "familyDinner", current: false }
            ],
            rewards: { karma: 0 },
            dialogueStart: "ronda_disown",
            unlocks: ["act2_start"],
            setFlag: "familyDinnerHappened",
            actEnd: true
        }
    ]
};

// ==================== SIDE MISSIONS ====================
const SIDE_MISSIONS = {
    act1: [
        { id: "side_pickpocket1", title: "Quick Fingers I", type: "pickpocket", target: 5, reward: 50 },
        { id: "side_pickpocket2", title: "Quick Fingers II", type: "pickpocket", target: 10, reward: 100 },
        { id: "side_race1", title: "Street Race I", type: "race", reward: 150 },
        { id: "side_race2", title: "Street Race II", type: "race", reward: 200 },
        { id: "side_delivery1", title: "Package Run I", type: "delivery", reward: 75 },
        { id: "side_delivery2", title: "Package Run II", type: "delivery", reward: 100 },
        { id: "side_fight1", title: "Alley Brawl I", type: "fight", enemies: 3, reward: 100 },
        { id: "side_fight2", title: "Alley Brawl II", type: "fight", enemies: 5, reward: 150 },
        { id: "side_fishing1", title: "Dhoni Fishing", type: "minigame", game: "fishing", reward: 50 },
        { id: "side_boduberu1", title: "Boduberu Beat", type: "minigame", game: "boduberu", reward: 75 }
    ]
};

// ==================== UPGRADES SYSTEM ====================
const UPGRADES = {
    combat: [
        { id: "combat1", name: "Bat Mastery I", cost: 500, effect: { damage: 1.2 }, requires: null },
        { id: "combat2", name: "Bat Mastery II", cost: 1000, effect: { damage: 1.5 }, requires: "combat1" },
        { id: "combat3", name: "Counter Strike", cost: 1500, effect: { counter: true }, requires: "combat2" },
        { id: "combat4", name: "Rage Mode", cost: 2500, effect: { rage: true }, requires: "combat3" }
    ],
    stealth: [
        { id: "stealth1", name: "Silent Steps", cost: 500, effect: { noise: 0.8 }, requires: null },
        { id: "stealth2", name: "Pickpocket Pro", cost: 1000, effect: { pickpocket: 1.3 }, requires: "stealth1" },
        { id: "stealth3", name: "Blend In", cost: 1500, effect: { detection: 0.7 }, requires: "stealth2" },
        { id: "stealth4", name: "Ghost", cost: 2500, effect: { invisible: 3 }, requires: "stealth3" }
    ],
    charisma: [
        { id: "charisma1", name: "Street Talk", cost: 500, effect: { persuade: 1.2 }, requires: null },
        { id: "charisma2", name: "Intimidate", cost: 1000, effect: { intimidate: 1.3 }, requires: "charisma1" },
        { id: "charisma3", name: "Leader's Voice", cost: 1500, effect: { recruit: 1.5 }, requires: "charisma2" },
        { id: "charisma4", name: "Kingpin Aura", cost: 2500, effect: { allCharisma: 2 }, requires: "charisma3" }
    ],
    piloting: [
        { id: "pilot1", name: "Motorcycle Basics", cost: 300, effect: { bikeSpeed: 1.2 }, requires: null },
        { id: "pilot2", name: "Dhoni Captain", cost: 800, effect: { boatSpeed: 1.3 }, requires: "pilot1" },
        { id: "pilot3", name: "Speedboat Pro", cost: 1500, effect: { speedboatUnlock: true }, requires: "pilot2" },
        { id: "pilot4", name: "Seaplane License", cost: 3000, effect: { seaplaneUnlock: true }, requires: "pilot3" }
    ]
};

// ==================== ACHIEVEMENTS ====================
const ACHIEVEMENTS_LIST = [
    { id: "first_score", name: "First Score", desc: "Complete your first pickpocket", icon: "👛" },
    { id: "bat_fighter", name: "Bat Fighter", desc: "Win 10 melee fights", icon: "🏏" },
    { id: "family_man", name: "Family Man", desc: "Keep family meter above 70", icon: "👨‍👩‍👧‍👦" },
    { id: "black_sheep", name: "Black Sheep", desc: "Get disowned by grandfather", icon: "🐑" },
    { id: "street_racer", name: "Street Racer", desc: "Win 5 motorcycle races", icon: "🏍️" },
    { id: "boduberu_master", name: "Boduberu Master", desc: "Perfect score in rhythm game", icon: "🥁" },
    { id: "act1_complete", name: "Maafannu Awakening", desc: "Complete Act 1", icon: "🏆" },
    { id: "merciful", name: "Merciful", desc: "Spare 10 enemies", icon: "🕊️" },
    { id: "ruthless", name: "Ruthless", desc: "Show no mercy to 10 enemies", icon: "💀" },
    { id: "rich", name: "Faisaa King", desc: "Earn 10,000 money", icon: "💰" }
];

// ==================== CODEX DATA ====================
const CODEX = {
    history: [
        { title: "1988: Operation Cactus", text: "Tamil mercenaries attempted coup against Gayoom. India intervened. 19 killed. Baokalo's grandfather witnessed the chaos as a young musician." },
        { title: "2004: Black Friday", text: "5,000 protesters demanded Gayoom's resignation after 26 years. NSS used tear gas and batons. Baokalo's earliest memory - age 4." },
        { title: "2008: First Democracy", text: "Nasheed defeats Gayoom in first democratic election. Hope spreads across Maldives." },
        { title: "2012: The Coup", text: "Police and military mutiny forces Nasheed to resign. Baokalo learns: politics = violence = power." },
        { title: "2015: Yameen Era", text: "Dictatorship peak. Nasheed jailed on terrorism charges. Baokalo joins gangs at age 15." }
    ],
    characters: [
        { title: "Baokalo (Ahmed Kipal Ronda)", text: "Born 2000 in Maradhoo, Addu City. Black sheep of respectable family. Street name means 'The Dark Leader' in Addu Bas." },
        { title: "Rippoo (Mother)", text: "Former gang member 'Rippoo the Razor' (1993-1998). Left gang life when pregnant with Nunnu. Now social worker." },
        { title: "Abuch (Father)", text: "Honest fisherman who worked 18-hour shifts. Died 2020 in storm at sea. His fishing knife is Baokalo's memento." },
        { title: "Ronda Masterah (Grandfather)", text: "Traditional boduberu drummer, 75 years old. Performed for all 5 regimes. Disowns Baokalo for destroying family name." },
        { title: "Nappey Aunty (Grandmother)", text: "Only family member who never judges Baokalo. 'He is lost, not evil.' Provides safe house." }
    ],
    gangs: [
        { title: "Hulhu Hustlers", text: "Baokalo's first gang. Controls Maafannu fish market. Petty crimes, pickpocketing, street fights." },
        { title: "Malé Sharks", text: "Major Malé gang. Rippoo's old crew from the 1990s. Drug trafficking, extortion." },
        { title: "Masodi (Titans)", text: "Highly active gang. Leaders: Shiru, Nadhamaa. Links to Addu. PNC protection." },
        { title: "Kuda Henveiru", text: "Henveiru district gang. Allied with Masodi. Pickpocketing, drug courier." },
        { title: "Wanted", text: "Professional criminals. Assassination contracts, high-value theft. Leaders: Marn, Thaju." }
    ],
    locations: [
        { title: "Malé", text: "Capital city. 103,693 people in 5.8 km². 44-45 active gangs. Overcrowded, chaotic, dangerous." },
        { title: "Maafannu District", text: "Slum area of Malé. Baokalo's starting territory. Fish market, narrow alleys." },
        { title: "Addu City", text: "Southern stronghold. Baokalo's birthplace. 12 gangs, 250+ members. Ronda family home in Maradhoo." },
        { title: "Velana Airport", text: "International airport. Smuggling hub. Uncle DhoDho works here." }
    ],
    dhivehi: [
        { title: "Pronouns", text: "Aharen/Alhugandakah = I (formal). Mashakah = Me. Kaley = You (disrespectful). Thibeyfulhaa = You (respectful). Thilhen = You (extremely offensive)." },
        { title: "Common Phrases", text: "Uzaa = Go away. Sodu = Bastard. Faisaa = Money. Dhimaa = Blood. Darifulhaakah = My child." },
        { title: "Gang Slang", text: "Bao = Boss. Kalo = Dark/black. Miyaru = Shark. Dhoni = Boat. Beys = Drugs." },
        { title: "Political Terms", text: "Kazzabu = Liar. Appathurey = Puppet. Laadheenee = Godless. Beyfulhi = Elite snob." }
    ]
};

// ==================== GAME ENGINE ====================
let canvas, ctx, minimapCanvas, minimapCtx, minigameCanvas, minigameCtx;
let lastTime = 0;
let deltaTime = 0;
let frameCount = 0;

// Input state
const Input = {
    keys: {},
    mouse: { x: 0, y: 0, down: false },
    touch: { active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 },
    joystick: { x: 0, y: 0 }
};

// Camera
const Camera = {
    x: 0,
    y: 0,
    zoom: 1,
    targetX: 0,
    targetY: 0,
    shake: 0
};

// NPCs in current map
let currentNPCs = [];
let currentItems = [];
let currentEnemies = [];

// Audio context for Web Audio API
let audioCtx = null;

// ==================== INITIALIZATION ====================
function init() {
    // Get canvas elements
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    minimapCanvas = document.getElementById('minimap-canvas');
    minimapCtx = minimapCanvas.getContext('2d');
    minigameCanvas = document.getElementById('minigame-canvas');
    minigameCtx = minigameCanvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Setup input handlers
    setupInputHandlers();
    
    // Setup touch controls
    setupTouchControls();
    
    // Setup menu buttons
    setupMenuButtons();
    
    // Load saved game if exists
    loadGame();
    
    // Generate maps
    generateMaps();
    
    // Show loading complete
    simulateLoading();
}

function resizeCanvas() {
    const container = document.getElementById('game-container');
    const aspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
    
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    if (width / height > aspectRatio) {
        width = height * aspectRatio;
    } else {
        height = width / aspectRatio;
    }
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Minimap
    const minimapSize = Math.min(150, width * 0.2);
    minimapCanvas.width = minimapSize;
    minimapCanvas.height = minimapSize;
}

function simulateLoading() {
    const loadingFill = document.getElementById('loading-fill');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('main-menu').classList.remove('hidden');
            }, 500);
        }
        loadingFill.style.width = progress + '%';
    }, 100);
}

function generateMaps() {
    // Generate tile data for each map
    for (let mapKey in MAPS) {
        const map = MAPS[mapKey];
        map.tiles = [];
        
        for (let y = 0; y < map.height; y++) {
            map.tiles[y] = [];
            for (let x = 0; x < map.width; x++) {
                // Default to ground
                let tile = 1;
                
                // Water borders
                if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                    tile = 0;
                }
                // Roads (every 5 tiles horizontally and vertically)
                else if (x % 8 === 0 || y % 8 === 0) {
                    tile = 2;
                }
                // Random buildings
                else if (Math.random() < 0.15) {
                    tile = 3;
                }
                
                map.tiles[y][x] = tile;
            }
        }
        
        // Add zones
        for (let zoneKey in map.zones) {
            const zone = map.zones[zoneKey];
            for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
                for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                    if (y >= 0 && x >= 0) {
                        map.tiles[y][x] = zoneKey.includes('Market') ? 4 : 
                                          zoneKey.includes('dock') ? 5 : 1;
                    }
                }
            }
        }
    }
}

// ==================== INPUT HANDLING ====================
function setupInputHandlers() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
        Input.keys[e.code] = true;
        
        // Prevent default for game keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyE', 'Escape'].includes(e.code)) {
            e.preventDefault();
        }
        
        // Handle specific keys
        if (e.code === 'Escape' && GameState.isPlaying) {
            togglePause();
        }
    });
    
    window.addEventListener('keyup', (e) => {
        Input.keys[e.code] = false;
    });
    
    // Mouse
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        Input.mouse.x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
        Input.mouse.y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
    });
    
    canvas.addEventListener('mousedown', () => Input.mouse.down = true);
    canvas.addEventListener('mouseup', () => Input.mouse.down = false);
}

function setupTouchControls() {
    const joystickContainer = document.getElementById('joystick-container');
    const joystickStick = document.getElementById('joystick-stick');
    
    let joystickActive = false;
    let joystickCenter = { x: 60, y: 60 };
    
    joystickContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        joystickActive = true;
        const touch = e.touches[0];
        const rect = joystickContainer.getBoundingClientRect();
        joystickCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    });
    
    joystickContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!joystickActive) return;
        
        const touch = e.touches[0];
        let dx = touch.clientX - joystickCenter.x;
        let dy = touch.clientY - joystickCenter.y;
        
        const maxDist = 40;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
        }
        
        joystickStick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        
        Input.joystick.x = dx / maxDist;
        Input.joystick.y = dy / maxDist;
    });
    
    joystickContainer.addEventListener('touchend', (e) => {
        e.preventDefault();
        joystickActive = false;
        joystickStick.style.transform = 'translate(-50%, -50%)';
        Input.joystick.x = 0;
        Input.joystick.y = 0;
    });
    
    // Action buttons
    document.getElementById('btn-attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        playerAttack();
    });
    
    document.getElementById('btn-interact').addEventListener('touchstart', (e) => {
        e.preventDefault();
        playerInteract();
    });
    
    document.getElementById('btn-sprint').addEventListener('touchstart', (e) => {
        e.preventDefault();
        GameState.player.isSprinting = true;
    });
    
    document.getElementById('btn-sprint').addEventListener('touchend', (e) => {
        e.preventDefault();
        GameState.player.isSprinting = false;
    });
    
    document.getElementById('btn-pause').addEventListener('touchstart', (e) => {
        e.preventDefault();
        togglePause();
    });
}

function setupMenuButtons() {
    // Main menu buttons
    document.getElementById('btn-new-game').addEventListener('click', startNewGame);
    document.getElementById('btn-continue').addEventListener('click', continueGame);
    document.getElementById('btn-load-act').addEventListener('click', () => openSubMenu('load-act-menu'));
    document.getElementById('btn-codex').addEventListener('click', () => openSubMenu('codex-menu'));
    document.getElementById('btn-upgrades').addEventListener('click', () => openSubMenu('upgrades-menu'));
    document.getElementById('btn-options').addEventListener('click', () => openSubMenu('options-menu'));
    document.getElementById('btn-achievements').addEventListener('click', () => openSubMenu('achievements-menu'));
    
    // Pause menu buttons
    document.getElementById('btn-resume').addEventListener('click', togglePause);
    document.getElementById('btn-save').addEventListener('click', () => { saveGame(); showNotification('Game Saved', 'Progress saved to LocalStorage'); });
    document.getElementById('btn-load').addEventListener('click', () => { loadGame(); showNotification('Game Loaded', 'Progress restored'); });
    document.getElementById('btn-options-pause').addEventListener('click', () => openSubMenu('options-menu'));
    document.getElementById('btn-quit').addEventListener('click', quitToMenu);
    
    // Initialize sub-menu content
    initCodex();
    initUpgrades();
    initOptions();
    initAchievements();
    initLoadAct();
}

// ==================== MENU FUNCTIONS ====================
function openSubMenu(menuId) {
    document.getElementById(menuId).classList.remove('hidden');
}

function closeSubMenu(menuId) {
    document.getElementById(menuId).classList.add('hidden');
}

function initCodex() {
    const content = document.getElementById('codex-content');
    let html = '<div class="codex-tabs">';
    
    for (let category in CODEX) {
        html += `<button class="codex-tab" onclick="showCodexCategory('${category}')">${category.charAt(0).toUpperCase() + category.slice(1)}</button>`;
    }
    
    html += '</div><div id="codex-entries"></div>';
    content.innerHTML = html;
    
    showCodexCategory('history');
}

function showCodexCategory(category) {
    const entries = document.getElementById('codex-entries');
    let html = '';
    
    CODEX[category].forEach(entry => {
        html += `
            <div class="codex-entry">
                <div class="codex-entry-title">${entry.title}</div>
                <div class="codex-entry-text">${entry.text}</div>
            </div>
        `;
    });
    
    entries.innerHTML = html;
    
    // Update active tab
    document.querySelectorAll('.codex-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase() === category) {
            tab.classList.add('active');
        }
    });
}

function initUpgrades() {
    const content = document.getElementById('upgrades-content');
    let html = '<div class="upgrade-tree">';
    
    for (let category in UPGRADES) {
        html += `
            <div class="upgrade-category">
                <div class="upgrade-category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
        `;
        
        UPGRADES[category].forEach(upgrade => {
            const isUnlocked = GameState.upgrades.includes(upgrade.id);
            const canAfford = GameState.player.money >= upgrade.cost;
            const hasRequirement = !upgrade.requires || GameState.upgrades.includes(upgrade.requires);
            const statusClass = isUnlocked ? 'unlocked' : (!hasRequirement ? 'locked' : '');
            
            html += `
                <div class="upgrade-item ${statusClass}" onclick="purchaseUpgrade('${upgrade.id}')">
                    <div class="upgrade-name">${isUnlocked ? '✓ ' : ''}${upgrade.name}</div>
                    <div class="upgrade-cost">${isUnlocked ? 'Owned' : `💰 ${upgrade.cost}`}</div>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    html += '</div>';
    content.innerHTML = html;
}

function purchaseUpgrade(upgradeId) {
    // Find the upgrade
    let upgrade = null;
    for (let category in UPGRADES) {
        upgrade = UPGRADES[category].find(u => u.id === upgradeId);
        if (upgrade) break;
    }
    
    if (!upgrade) return;
    
    // Check if already owned
    if (GameState.upgrades.includes(upgradeId)) {
        showNotification('Already Owned', 'You already have this upgrade');
        return;
    }
    
    // Check requirements
    if (upgrade.requires && !GameState.upgrades.includes(upgrade.requires)) {
        showNotification('Locked', 'Complete the previous upgrade first');
        return;
    }
    
    // Check money
    if (GameState.player.money < upgrade.cost) {
        showNotification('Not Enough Faisaa', `Need ${upgrade.cost} faisaa`);
        return;
    }
    
    // Purchase
    GameState.player.money -= upgrade.cost;
    GameState.upgrades.push(upgradeId);
    
    showNotification('Upgrade Purchased', upgrade.name);
    initUpgrades(); // Refresh display
    updateHUD();
}

function initOptions() {
    const content = document.getElementById('options-content');
    content.innerHTML = `
        <div class="codex-entry">
            <div class="codex-entry-title">🔊 Sound Volume</div>
            <input type="range" min="0" max="100" value="80" id="volume-slider" style="width: 100%">
        </div>
        <div class="codex-entry">
            <div class="codex-entry-title">🎵 Music Volume</div>
            <input type="range" min="0" max="100" value="60" id="music-slider" style="width: 100%">
        </div>
        <div class="codex-entry">
            <div class="codex-entry-title">📱 Touch Controls</div>
            <label><input type="checkbox" id="touch-enabled" checked> Enable Touch Controls</label>
        </div>
        <div class="codex-entry">
            <div class="codex-entry-title">🎮 Controls</div>
            <div class="codex-entry-text">
                <strong>Keyboard:</strong><br>
                WASD / Arrow Keys - Move<br>
                Space - Attack<br>
                E - Interact<br>
                Shift - Sprint<br>
                Escape - Pause<br><br>
                <strong>Touch:</strong><br>
                Left joystick - Move<br>
                👊 - Attack<br>
                🤝 - Interact<br>
                🏃 - Sprint (hold)<br>
                ⏸️ - Pause
            </div>
        </div>
    `;
}

function initAchievements() {
    const content = document.getElementById('achievements-content');
    let html = '';
    
    ACHIEVEMENTS_LIST.forEach(achievement => {
        const isUnlocked = GameState.achievements.includes(achievement.id);
        html += `
            <div class="codex-entry" style="opacity: ${isUnlocked ? 1 : 0.5}">
                <div class="codex-entry-title">${achievement.icon} ${achievement.name}</div>
                <div class="codex-entry-text">${isUnlocked ? achievement.desc : '???'}</div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

function initLoadAct() {
    const content = document.getElementById('load-act-content');
    const acts = [
        { num: 1, name: "Maafannu Awakening", unlocked: true },
        { num: 2, name: "Malé Core Wars", unlocked: GameState.completedMissions.includes('act1_climax') },
        { num: 3, name: "Synthetic Surge", unlocked: false },
        { num: 4, name: "Hulhumalé Heist", unlocked: false },
        { num: 5, name: "Parliament Plague", unlocked: false },
        { num: 6, name: "Atoll Anarchy", unlocked: false },
        { num: 7, name: "The President's Pawn", unlocked: false },
        { num: 8, name: "The Great Betrayal", unlocked: false },
        { num: 9, name: "Syndicate Revolution", unlocked: false },
        { num: 10, name: "Coup d'État", unlocked: false },
        { num: 11, name: "Epilogue: Cycles Broken?", unlocked: false }
    ];
    
    let html = '';
    acts.forEach(act => {
        html += `
            <div class="codex-entry" style="opacity: ${act.unlocked ? 1 : 0.5}; cursor: ${act.unlocked ? 'pointer' : 'default'}"
                 onclick="${act.unlocked ? `loadAct(${act.num})` : ''}">
                <div class="codex-entry-title">Act ${act.num}: ${act.name}</div>
                <div class="codex-entry-text">${act.unlocked ? 'Click to start' : '🔒 Locked'}</div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

function loadAct(actNum) {
    GameState.currentAct = actNum;
    GameState.currentMission = 0;
    closeSubMenu('load-act-menu');
    startGame();
}

// ==================== GAME FLOW ====================
function startNewGame() {
    // Reset game state
    GameState.currentAct = 1;
    GameState.currentMission = 0;
    GameState.player.health = 100;
    GameState.player.stamina = 100;
    GameState.player.karma = 50;
    GameState.player.familyMeter = 50;
    GameState.player.money = 0;
    GameState.completedMissions = [];
    GameState.completedSideMissions = [];
    GameState.choices = [];
    GameState.achievements = [];
    GameState.upgrades = [];
    GameState.flags = {
        metHulhuHustlers: false,
        completedTutorial: false,
        sawNunnuNews: false,
        familyDinnerHappened: false,
        rippooSecretHinted: false,
        recruitedMinors: false
    };
    
    startGame();
}

function continueGame() {
    if (localStorage.getItem('rta_save')) {
        loadGame();
        startGame();
    }
}

function startGame() {
    // Hide menu, show game
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('touch-controls').classList.remove('hidden');
    document.getElementById('mission-tracker').classList.remove('hidden');
    document.getElementById('radio-display').classList.remove('hidden');
    
    // Generate map tiles first
    generateMapTiles(GameState.world.currentMap);
    
    // Set initial map
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    // Spawn NPCs
    spawnNPCs();
    
    // Start game loop
    GameState.isPlaying = true;
    GameState.isPaused = false;
    
    // Start current mission
    if (GameState.currentMission < MISSIONS.act1.length) {
        startMission(MISSIONS.act1[GameState.currentMission]);
    }
    
    // Start radio
    startRadio();
    
    // Start game loop
    requestAnimationFrame(gameLoop);
    
    // Show act intro
    showNotification(`Act ${GameState.currentAct}`, getActTitle(GameState.currentAct));
}

function getActTitle(act) {
    const titles = {
        1: "Maafannu Awakening",
        2: "Malé Core Wars",
        3: "Synthetic Surge",
        4: "Hulhumalé Heist",
        5: "Parliament Plague",
        6: "Atoll Anarchy",
        7: "The President's Pawn",
        8: "The Great Betrayal",
        9: "Syndicate Revolution",
        10: "Coup d'État",
        11: "Epilogue: Cycles Broken?"
    };
    return titles[act] || "Unknown";
}

function togglePause() {
    GameState.isPaused = !GameState.isPaused;
    document.getElementById('pause-menu').classList.toggle('hidden', !GameState.isPaused);
}

function quitToMenu() {
    GameState.isPlaying = false;
    GameState.isPaused = false;
    
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('touch-controls').classList.add('hidden');
    document.getElementById('mission-tracker').classList.add('hidden');
    document.getElementById('radio-display').classList.add('hidden');
    document.getElementById('dialogue-box').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
    
    // Enable continue button if save exists
    if (localStorage.getItem('rta_save')) {
        document.getElementById('btn-continue').disabled = false;
    }
}

// ==================== SAVE/LOAD ====================
function saveGame() {
    const saveData = {
        version: 1,
        timestamp: Date.now(),
        state: GameState
    };
    
    localStorage.setItem('rta_save', JSON.stringify(saveData));
}

function loadGame() {
    const saveData = localStorage.getItem('rta_save');
    if (saveData) {
        try {
            const data = JSON.parse(saveData);
            Object.assign(GameState, data.state);
            document.getElementById('btn-continue').disabled = false;
        } catch (e) {
            console.error('Failed to load save:', e);
        }
    }
}

// ==================== GAME LOOP ====================
function gameLoop(timestamp) {
    if (!GameState.isPlaying) return;
    
    // Calculate delta time
    deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    frameCount++;
    
    // Cap delta time to prevent huge jumps
    if (deltaTime > 0.1) deltaTime = 0.1;
    
    if (!GameState.isPaused && !GameState.isInDialogue && !GameState.isInMinigame) {
        update(deltaTime);
    }
    
    render();
    
    requestAnimationFrame(gameLoop);
}

function update(dt) {
    // Update player
    updatePlayer(dt);
    
    // Update NPCs
    updateNPCs(dt);
    
    // Update enemies
    updateEnemies(dt);
    
    // Update camera
    updateCamera(dt);
    
    // Update world time
    updateWorldTime(dt);
    
    // Update weather
    updateWeather(dt);
    
    // Check mission objectives
    checkMissionObjectives();
    
    // Regenerate stamina
    if (!GameState.player.isSprinting && GameState.player.stamina < GameState.player.maxStamina) {
        GameState.player.stamina = Math.min(GameState.player.maxStamina, GameState.player.stamina + 10 * dt);
    }
    
    // Update HUD
    updateHUD();
}

function updatePlayer(dt) {
    const player = GameState.player;
    let dx = 0, dy = 0;
    
    // Keyboard input
    if (Input.keys['KeyW'] || Input.keys['ArrowUp']) dy -= 1;
    if (Input.keys['KeyS'] || Input.keys['ArrowDown']) dy += 1;
    if (Input.keys['KeyA'] || Input.keys['ArrowLeft']) dx -= 1;
    if (Input.keys['KeyD'] || Input.keys['ArrowRight']) dx += 1;
    
    // Joystick input
    if (Math.abs(Input.joystick.x) > 0.1) dx = Input.joystick.x;
    if (Math.abs(Input.joystick.y) > 0.1) dy = Input.joystick.y;
    
    // Keyboard sprint
    if (Input.keys['ShiftLeft'] || Input.keys['ShiftRight']) {
        player.isSprinting = true;
    } else if (!Input.touch.active) {
        player.isSprinting = false;
    }
    
    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        dx /= len;
        dy /= len;
    }
    
    // Calculate speed
    let speed = player.speed;
    if (player.isSprinting && player.stamina > 0) {
        speed *= 1.8;
        player.stamina -= 20 * dt;
    }
    
    // Apply movement
    if (dx !== 0 || dy !== 0) {
        player.isMoving = true;
        
        // Update direction
        if (Math.abs(dx) > Math.abs(dy)) {
            player.direction = dx > 0 ? 'right' : 'left';
        } else {
            player.direction = dy > 0 ? 'down' : 'up';
        }
        
        // Calculate new position
        const newX = player.x + dx * speed * dt * 60;
        const newY = player.y + dy * speed * dt * 60;
        
        // Check collision
        if (!checkCollision(newX, player.y, player.width, player.height)) {
            player.x = newX;
        }
        if (!checkCollision(player.x, newY, player.width, player.height)) {
            player.y = newY;
        }
        
        // Clamp to map bounds
        const map = MAPS[GameState.world.currentMap];
        player.x = Math.max(TILE_SIZE, Math.min(player.x, (map.width - 2) * TILE_SIZE));
        player.y = Math.max(TILE_SIZE, Math.min(player.y, (map.height - 2) * TILE_SIZE));
    } else {
        player.isMoving = false;
    }
    
    // Attack cooldown
    if (player.attackCooldown > 0) {
        player.attackCooldown -= dt;
    }
    
    // Keyboard attack
    if (Input.keys['Space'] && player.attackCooldown <= 0) {
        playerAttack();
    }
    
    // Keyboard interact
    if (Input.keys['KeyE']) {
        playerInteract();
        Input.keys['KeyE'] = false; // Prevent repeat
    }
}

function checkCollision(x, y, w, h) {
    const map = MAPS[GameState.world.currentMap];
    
    // Check tile collision
    const tileX1 = Math.floor(x / TILE_SIZE);
    const tileY1 = Math.floor(y / TILE_SIZE);
    const tileX2 = Math.floor((x + w) / TILE_SIZE);
    const tileY2 = Math.floor((y + h) / TILE_SIZE);
    
    for (let ty = tileY1; ty <= tileY2; ty++) {
        for (let tx = tileX1; tx <= tileX2; tx++) {
            if (ty >= 0 && ty < map.height && tx >= 0 && tx < map.width) {
                const tile = map.tiles[ty][tx];
                if (tile === 0 || tile === 3) { // Water or building
                    return true;
                }
            }
        }
    }
    
    return false;
}

function playerAttack() {
    const player = GameState.player;
    if (player.attackCooldown > 0) return;
    
    player.isAttacking = true;
    player.attackCooldown = 0.5;
    
    // Play attack sound
    playSound('hit');
    
    // Check for enemies in range
    const attackRange = 50;
    const attackAngle = getDirectionAngle(player.direction);
    
    currentEnemies.forEach(enemy => {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < attackRange) {
            // Calculate damage
            let damage = 10;
            if (GameState.upgrades.includes('combat1')) damage *= 1.2;
            if (GameState.upgrades.includes('combat2')) damage *= 1.25;
            
            enemy.health -= damage;
            enemy.hitFlash = 0.2;
            
            // Camera shake
            Camera.shake = 5;
            
            // Check if defeated
            if (enemy.health <= 0) {
                defeatEnemy(enemy);
            }
        }
    });
    
    setTimeout(() => {
        player.isAttacking = false;
    }, 200);
}

function getDirectionAngle(direction) {
    switch (direction) {
        case 'up': return -Math.PI / 2;
        case 'down': return Math.PI / 2;
        case 'left': return Math.PI;
        case 'right': return 0;
    }
}

function playerInteract() {
    const player = GameState.player;
    const interactRange = 50;
    
    // Check NPCs
    for (let npc of currentNPCs) {
        const dx = npc.x - player.x;
        const dy = npc.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < interactRange) {
            interactWithNPC(npc);
            return;
        }
    }
    
    // Check items
    for (let i = currentItems.length - 1; i >= 0; i--) {
        const item = currentItems[i];
        const dx = item.x - player.x;
        const dy = item.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < interactRange) {
            collectItem(item, i);
            return;
        }
    }
    
    // Check zones
    const map = MAPS[GameState.world.currentMap];
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        if (player.x >= zone.x * TILE_SIZE && player.x < (zone.x + zone.w) * TILE_SIZE &&
            player.y >= zone.y * TILE_SIZE && player.y < (zone.y + zone.h) * TILE_SIZE) {
            interactWithZone(zoneKey, zone);
            return;
        }
    }
}

function interactWithNPC(npc) {
    if (npc.dialogue) {
        showDialogue(npc.dialogue);
    } else if (npc.type === 'tourist' && !npc.robbed) {
        // Pickpocket attempt
        attemptPickpocket(npc);
    } else if (npc.type === 'shopkeeper') {
        showNotification('Shop', 'Coming soon: Buy items and upgrades');
    }
}

function attemptPickpocket(npc) {
    const stealthSkill = GameState.player.skills.stealth;
    const successChance = 0.5 + (stealthSkill * 0.1);
    
    if (GameState.upgrades.includes('stealth2')) {
        successChance *= 1.3;
    }
    
    if (Math.random() < successChance) {
        // Success
        npc.robbed = true;
        const money = Math.floor(Math.random() * 50) + 20;
        GameState.player.money += money;
        
        // Add wallet to inventory for mission tracking
        GameState.player.inventory.push({ type: 'wallet', value: money });
        
        showNotification('Success!', `Stole ${money} faisaa 💰`);
        playSound('coin');
        
        // Update mission objective
        updateMissionObjective('collect', 'wallet', 1);
        
        // Achievement check
        if (!GameState.achievements.includes('first_score')) {
            unlockAchievement('first_score');
        }
        
        // Karma hit
        GameState.player.karma = Math.max(0, GameState.player.karma - 2);
    } else {
        // Failed - alert nearby NPCs
        showNotification('Failed!', 'They noticed you! 👀');
        GameState.world.heat = Math.min(5, GameState.world.heat + 1);
        npc.alerted = true;
    }
}

function collectItem(item, index) {
    if (item.type === 'money') {
        GameState.player.money += item.value;
        showNotification('Collected', `+${item.value} faisaa 💰`);
        playSound('coin');
    } else if (item.type === 'wallet') {
        GameState.player.inventory.push(item);
        GameState.player.money += item.value || 30;
        updateMissionObjective('collect', 'wallet', 1);
        showNotification('Collected', 'Wallet 👛');
    } else if (item.type === 'health') {
        GameState.player.health = Math.min(GameState.player.maxHealth, GameState.player.health + 25);
        showNotification('Healed', '+25 Health ❤️');
    }
    
    currentItems.splice(index, 1);
}

function interactWithZone(zoneKey, zone) {
    if (zoneKey === 'fishMarket') {
        showNotification(zone.name, 'Tourists everywhere. Easy pickings...');
    } else if (zoneKey === 'teaShop') {
        showDialogue(DIALOGUES.rippoo_confrontation);
    } else if (zoneKey === 'safehouse') {
        showNotification(zone.name, 'Safe! Heat reduced. Game saved.');
        GameState.world.heat = 0;
        saveGame();
    } else if (zoneKey === 'rondaHome') {
        if (!GameState.flags.familyDinnerHappened) {
            showDialogue(DIALOGUES.ronda_disown);
            GameState.flags.familyDinnerHappened = true;
        } else {
            showDialogue(DIALOGUES.nappey_support);
        }
    }
}

function defeatEnemy(enemy) {
    // Remove from array
    const index = currentEnemies.indexOf(enemy);
    if (index > -1) {
        currentEnemies.splice(index, 1);
    }
    
    // Drop loot
    if (Math.random() < 0.5) {
        currentItems.push({
            type: 'money',
            x: enemy.x,
            y: enemy.y,
            value: Math.floor(Math.random() * 30) + 10
        });
    }
    
    // Update mission
    updateMissionObjective('defeat', enemy.type, 1);
    
    // Karma
    GameState.player.karma = Math.max(0, GameState.player.karma - 3);
    
    showNotification('Enemy Defeated', `${enemy.name} down!`);
}

// Continue in next part...


// ==================== NPC SYSTEM ====================
function spawnNPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Spawn tourists in fish market
    if (map.zones.fishMarket) {
        const zone = map.zones.fishMarket;
        for (let i = 0; i < 8; i++) {
            currentNPCs.push({
                type: 'tourist',
                sprite: SPRITES.tourist,
                x: (zone.x + Math.random() * zone.w) * TILE_SIZE,
                y: (zone.y + Math.random() * zone.h) * TILE_SIZE,
                direction: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
                robbed: false,
                alerted: false
            });
        }
    }
    
    // Spawn gang members
    if (GameState.flags.metHulhuHustlers || GameState.currentMission >= 1) {
        for (let i = 0; i < 3; i++) {
            currentNPCs.push({
                type: 'gangMember',
                sprite: SPRITES.gangMember,
                name: 'Hulhu Hustler',
                x: 200 + Math.random() * 200,
                y: 300 + Math.random() * 200,
                direction: Math.random() * Math.PI * 2,
                speed: 0.3,
                dialogue: DIALOGUES.tutorial_intro
            });
        }
    }
    
    // Spawn enemies based on mission
    const mission = MISSIONS.act1[GameState.currentMission];
    if (mission && mission.type === 'combat') {
        spawnEnemiesForMission(mission);
    }
    
    // Spawn random items
    for (let i = 0; i < 5; i++) {
        currentItems.push({
            type: Math.random() < 0.7 ? 'money' : 'health',
            x: (5 + Math.random() * (map.width - 10)) * TILE_SIZE,
            y: (5 + Math.random() * (map.height - 10)) * TILE_SIZE,
            value: Math.floor(Math.random() * 20) + 5
        });
    }
}

function spawnEnemiesForMission(mission) {
    const map = MAPS[GameState.world.currentMap];
    const enemyCount = mission.objectives.find(o => o.type === 'defeat')?.count || 3;
    
    for (let i = 0; i < enemyCount; i++) {
        let enemyType = 'kudaThug';
        let sprite = SPRITES.gangMember;
        let name = 'Kuda Henveiru Thug';
        
        if (mission.objectives[0].target === 'masodiScout') {
            enemyType = 'masodiScout';
            name = 'Masodi Scout';
        } else if (mission.objectives[0].target === 'wantedMember') {
            enemyType = 'wantedMember';
            name = 'Wanted Member';
            sprite = SPRITES.gangLeader;
        } else if (mission.objectives[0].target === 'marn') {
            enemyType = 'marn';
            name = 'Marn (Wanted Boss)';
            sprite = SPRITES.gangLeader;
        }
        
        currentEnemies.push({
            type: enemyType,
            sprite: sprite,
            name: name,
            x: 300 + Math.random() * 400,
            y: 200 + Math.random() * 300,
            health: enemyType === 'marn' ? 100 : 30,
            maxHealth: enemyType === 'marn' ? 100 : 30,
            speed: 1 + Math.random() * 0.5,
            direction: Math.random() * Math.PI * 2,
            state: 'patrol',
            attackCooldown: 0,
            hitFlash: 0
        });
    }
}

function updateNPCs(dt) {
    currentNPCs.forEach(npc => {
        // Simple wandering behavior
        if (Math.random() < 0.01) {
            npc.direction = Math.random() * Math.PI * 2;
        }
        
        if (!npc.alerted) {
            npc.x += Math.cos(npc.direction) * npc.speed * dt * 30;
            npc.y += Math.sin(npc.direction) * npc.speed * dt * 30;
        }
        
        // Keep in bounds
        const map = MAPS[GameState.world.currentMap];
        npc.x = Math.max(TILE_SIZE, Math.min(npc.x, (map.width - 2) * TILE_SIZE));
        npc.y = Math.max(TILE_SIZE, Math.min(npc.y, (map.height - 2) * TILE_SIZE));
    });
}

function updateEnemies(dt) {
    const player = GameState.player;
    
    currentEnemies.forEach(enemy => {
        // Update hit flash
        if (enemy.hitFlash > 0) {
            enemy.hitFlash -= dt;
        }
        
        // AI behavior
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
            // Chase player
            enemy.state = 'chase';
            enemy.x += (dx / dist) * enemy.speed * dt * 60;
            enemy.y += (dy / dist) * enemy.speed * dt * 60;
            
            // Attack if close
            if (dist < 40 && enemy.attackCooldown <= 0) {
                enemyAttack(enemy);
            }
        } else {
            // Patrol
            enemy.state = 'patrol';
            if (Math.random() < 0.02) {
                enemy.direction = Math.random() * Math.PI * 2;
            }
            enemy.x += Math.cos(enemy.direction) * enemy.speed * 0.3 * dt * 60;
            enemy.y += Math.sin(enemy.direction) * enemy.speed * 0.3 * dt * 60;
        }
        
        // Update attack cooldown
        if (enemy.attackCooldown > 0) {
            enemy.attackCooldown -= dt;
        }
        
        // Keep in bounds
        const map = MAPS[GameState.world.currentMap];
        enemy.x = Math.max(TILE_SIZE, Math.min(enemy.x, (map.width - 2) * TILE_SIZE));
        enemy.y = Math.max(TILE_SIZE, Math.min(enemy.y, (map.height - 2) * TILE_SIZE));
    });
}

function enemyAttack(enemy) {
    enemy.attackCooldown = 1;
    
    const damage = enemy.type === 'marn' ? 15 : 8;
    GameState.player.health -= damage;
    
    Camera.shake = 8;
    playSound('hurt');
    
    if (GameState.player.health <= 0) {
        playerDeath();
    }
}

function playerDeath() {
    showNotification('Wasted!', 'You were defeated...');
    
    // Reset to safehouse
    setTimeout(() => {
        GameState.player.health = GameState.player.maxHealth;
        GameState.player.x = 400;
        GameState.player.y = 300;
        GameState.world.heat = 0;
        spawnNPCs();
    }, 2000);
}

// ==================== CAMERA ====================
function updateCamera(dt) {
    // Follow player
    Camera.targetX = GameState.player.x - CANVAS_WIDTH / 2;
    Camera.targetY = GameState.player.y - CANVAS_HEIGHT / 2;
    
    // Smooth follow
    Camera.x += (Camera.targetX - Camera.x) * 5 * dt;
    Camera.y += (Camera.targetY - Camera.y) * 5 * dt;
    
    // Camera shake
    if (Camera.shake > 0) {
        Camera.shake -= dt * 20;
        Camera.x += (Math.random() - 0.5) * Camera.shake;
        Camera.y += (Math.random() - 0.5) * Camera.shake;
    }
    
    // Clamp to map bounds
    const map = MAPS[GameState.world.currentMap];
    Camera.x = Math.max(0, Math.min(Camera.x, map.width * TILE_SIZE - CANVAS_WIDTH));
    Camera.y = Math.max(0, Math.min(Camera.y, map.height * TILE_SIZE - CANVAS_HEIGHT));
}

// ==================== WORLD UPDATES ====================
function updateWorldTime(dt) {
    // 1 game hour = 60 real seconds
    GameState.world.time += dt / 60;
    if (GameState.world.time >= 24) {
        GameState.world.time = 0;
    }
}

function updateWeather(dt) {
    // Random weather changes
    if (Math.random() < 0.0001) {
        const weathers = ['clear', 'clear', 'clear', 'cloudy', 'rain', 'storm'];
        GameState.world.weather = weathers[Math.floor(Math.random() * weathers.length)];
        
        if (GameState.world.weather === 'rain' || GameState.world.weather === 'storm') {
            createRainEffect();
        } else {
            clearRainEffect();
        }
    }
}

function createRainEffect() {
    const overlay = document.getElementById('weather-overlay');
    overlay.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        overlay.appendChild(drop);
    }
}

function clearRainEffect() {
    document.getElementById('weather-overlay').innerHTML = '';
}

// ==================== RENDERING ====================
function render() {
    // Initialize advanced graphics if not exists
    if (!window.advancedRenderer) {
        window.advancedRenderer = new AdvancedTileRenderer(TILE_SIZE);
        window.weatherEffects = new WeatherEffects();
    }
    
    // Get lighting factor
    window.advancedRenderer.lighting.update();
    const lightingFactor = window.advancedRenderer.lighting.getAmbientFactor();
    const lightColor = window.advancedRenderer.lighting.getLightColor();
    
    // Clear canvas with time-of-day color
    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Save context for camera transform
    ctx.save();
    ctx.translate(-Camera.x, -Camera.y);
    
    // Render map
    renderMap();
    
    // Render items
    renderItems();
    
    // Render NPCs
    renderNPCs();
    
    // Render enemies
    renderEnemies();
    
    // Render player
    renderPlayer();
    
    // Render zone labels
    renderZoneLabels();
    
    // Restore context
    ctx.restore();
    
    // Render minimap
    renderMinimap();
    
    // Render weather effects
    renderWeatherEffects();
    
    // Render time of day overlay
    renderTimeOverlay();
}

function renderMap() {
    const map = MAPS[GameState.world.currentMap];
    
    // Calculate visible tiles
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    const lightingFactor = window.advancedRenderer.lighting.getAmbientFactor();
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y][x];
            const screenX = x * TILE_SIZE;
            const screenY = y * TILE_SIZE;
            
            // Use advanced tile renderer with lighting
            window.advancedRenderer.renderTile(ctx, screenX, screenY, tile, lightingFactor);
        }
    }
}

function renderItems() {
    currentItems.forEach(item => {
        let emoji;
        switch (item.type) {
            case 'money': emoji = ITEMS.money; break;
            case 'wallet': emoji = ITEMS.wallet; break;
            case 'health': emoji = '❤️'; break;
            default: emoji = '❓';
        }
        
        // Bobbing animation
        const bob = Math.sin(frameCount * 0.1) * 3;
        
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(emoji, item.x, item.y + bob);
    });
}

function renderNPCs() {
    currentNPCs.forEach(npc => {
        // Use advanced NPC renderer
        const npcType = npc.type || 'civilian';
        const frame = Math.floor((frameCount / 5) % 4);
        AdvancedCharacterRenderer.drawNPC(ctx, npc.x, npc.y, npcType, frame);
        
        // Alert indicator
        if (npc.alerted) {
            ctx.fillStyle = '#ff0000';
            ctx.font = '16px Arial';
            ctx.fillText('!', npc.x, npc.y - 20);
        }
        
        // Interaction hint
        const dx = npc.x - GameState.player.x;
        const dy = npc.y - GameState.player.y;
        if (Math.sqrt(dx * dx + dy * dy) < 50) {
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.font = '12px Arial';
            ctx.fillText('[E] / Talk', npc.x, npc.y - 25);
        }
    });
}

function renderEnemies() {
    currentEnemies.forEach(enemy => {
        // Use advanced enemy renderer
        const frame = Math.floor((frameCount / 5) % 4);
        AdvancedCharacterRenderer.drawEnemy(ctx, enemy.x, enemy.y, enemy.type || 'thug', frame);
        
        // Hit flash
        if (enemy.hitFlash > 0) {
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y - 5, 20, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Health bar
        const barWidth = 30;
        const barHeight = 4;
        const healthPercent = enemy.health / enemy.maxHealth;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(enemy.x - barWidth / 2, enemy.y - 30, barWidth, barHeight);
        
        ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
        ctx.fillRect(enemy.x - barWidth / 2, enemy.y - 30, barWidth * healthPercent, barHeight);
        
        // Name
        ctx.fillStyle = '#ff6666';
        ctx.font = '10px Arial';
        ctx.fillText(enemy.name, enemy.x, enemy.y - 35);
    });
}

function renderPlayer() {
    const player = GameState.player;
    
    // Use advanced character renderer
    const characterData = {
        color: '#8b4513',
        skinColor: '#d4a574',
        weapon: player.currentWeapon
    };
    
    const frame = Math.floor((frameCount / 5) % 4);
    AdvancedCharacterRenderer.drawCharacter(ctx, player.x, player.y, characterData, player.direction, frame);
    
    // Attack effect
    if (player.isAttacking) {
        ctx.strokeStyle = 'rgba(255,100,100,0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        const angle = getDirectionAngle(player.direction);
        ctx.arc(player.x, player.y, 35, angle - 0.5, angle + 0.5);
        ctx.stroke();
    }
    
    // Sprint effect
    if (player.isSprinting && player.isMoving) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(player.x - 15, player.y - 15, 30, 30);
    }
}

function renderZoneLabels() {
    const map = MAPS[GameState.world.currentMap];
    
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        const centerX = (zone.x + zone.w / 2) * TILE_SIZE;
        const centerY = zone.y * TILE_SIZE - 10;
        
        // Check if player is near
        const dx = centerX - GameState.player.x;
        const dy = (zone.y + zone.h / 2) * TILE_SIZE - GameState.player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            
            const textWidth = ctx.measureText(zone.name).width;
            ctx.fillRect(centerX - textWidth / 2 - 5, centerY - 12, textWidth + 10, 18);
            
            ctx.fillStyle = '#ffcc00';
            ctx.fillText(zone.name, centerX, centerY);
        }
    }
}

function renderMinimap() {
    const map = MAPS[GameState.world.currentMap];
    const scale = minimapCanvas.width / (map.width * TILE_SIZE);
    
    minimapCtx.fillStyle = '#0a0a0a';
    minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    
    // Draw simplified map
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const tile = map.tiles[y][x];
            let color;
            
            switch (tile) {
                case 0: color = '#003366'; break;
                case 1: color = '#5a4a3a'; break;
                case 2: color = '#333'; break;
                case 3: color = '#222'; break;
                case 4: color = '#4a6a2a'; break;
                default: color = '#5a4a3a';
            }
            
            minimapCtx.fillStyle = color;
            minimapCtx.fillRect(x * scale * TILE_SIZE, y * scale * TILE_SIZE, 
                               scale * TILE_SIZE + 1, scale * TILE_SIZE + 1);
        }
    }
    
    // Draw player
    minimapCtx.fillStyle = '#00ff00';
    minimapCtx.beginPath();
    minimapCtx.arc(GameState.player.x * scale, GameState.player.y * scale, 3, 0, Math.PI * 2);
    minimapCtx.fill();
    
    // Draw enemies
    minimapCtx.fillStyle = '#ff0000';
    currentEnemies.forEach(enemy => {
        minimapCtx.beginPath();
        minimapCtx.arc(enemy.x * scale, enemy.y * scale, 2, 0, Math.PI * 2);
        minimapCtx.fill();
    });
    
    // Draw mission marker if applicable
    // TODO: Add mission waypoint
}

function renderWeatherEffects() {
    if (GameState.world.weather === 'cloudy') {
        ctx.fillStyle = 'rgba(100,100,100,0.2)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else if (GameState.world.weather === 'storm') {
        ctx.fillStyle = 'rgba(50,50,80,0.3)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Lightning flash
        if (Math.random() < 0.002) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }
}

function renderTimeOverlay() {
    const time = GameState.world.time;
    let alpha = 0;
    
    // Night time (20:00 - 6:00)
    if (time >= 20 || time < 6) {
        alpha = 0.4;
        if (time >= 20) alpha = 0.4 * ((time - 20) / 4);
        if (time < 6) alpha = 0.4 * (1 - time / 6);
    }
    
    if (alpha > 0) {
        ctx.fillStyle = `rgba(0,0,30,${alpha})`;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

// ==================== HUD ====================
function updateHUD() {
    document.getElementById('health-bar').style.width = 
        (GameState.player.health / GameState.player.maxHealth * 100) + '%';
    document.getElementById('stamina-bar').style.width = 
        (GameState.player.stamina / GameState.player.maxStamina * 100) + '%';
    document.getElementById('karma-bar').style.width = GameState.player.karma + '%';
    document.getElementById('money-display').textContent = GameState.player.money;
}

// ==================== MISSION SYSTEM ====================
function startMission(mission) {
    GameState.currentMissionData = mission;
    
    document.getElementById('mission-title').textContent = mission.title;
    document.getElementById('mission-objective').textContent = mission.description;
    
    showNotification('New Mission', mission.title);
    
    // Show starting dialogue
    if (mission.dialogueStart && DIALOGUES[mission.dialogueStart]) {
        setTimeout(() => {
            showDialogue(DIALOGUES[mission.dialogueStart]);
        }, 2000);
    }
    
    // Spawn mission-specific content
    if (mission.type === 'combat') {
        spawnEnemiesForMission(mission);
    }
}

function updateMissionObjective(type, target, amount) {
    const mission = GameState.currentMissionData;
    if (!mission) return;
    
    mission.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target) {
            obj.current += amount;
            
            // Update display
            document.getElementById('mission-objective').textContent = 
                `${mission.description} (${obj.current}/${obj.count})`;
        }
    });
    
    checkMissionObjectives();
}

function checkMissionObjectives() {
    const mission = GameState.currentMissionData;
    if (!mission) return;
    
    let allComplete = true;
    
    mission.objectives.forEach(obj => {
        if (obj.type === 'collect' || obj.type === 'defeat' || obj.type === 'recruit') {
            if (obj.current < obj.count) {
                allComplete = false;
            }
        } else if (obj.type === 'deliver' || obj.type === 'trigger' || obj.type === 'interact') {
            if (!obj.current) {
                allComplete = false;
            }
        }
    });
    
    if (allComplete) {
        completeMission(mission);
    }
}

function completeMission(mission) {
    // Mark as completed
    GameState.completedMissions.push(mission.id);
    
    // Apply rewards
    if (mission.rewards) {
        if (mission.rewards.money) {
            GameState.player.money += mission.rewards.money;
        }
        if (mission.rewards.karma) {
            GameState.player.karma = Math.max(0, Math.min(100, 
                GameState.player.karma + mission.rewards.karma));
        }
        if (mission.rewards.reputation) {
            for (let gang in mission.rewards.reputation) {
                if (GameState.gangs[gang]) {
                    GameState.gangs[gang].reputation += mission.rewards.reputation[gang];
                }
            }
        }
    }
    
    // Set flags
    if (mission.setFlag) {
        GameState.flags[mission.setFlag] = true;
    }
    
    // Unlock vehicle
    if (mission.vehicleUnlock) {
        showNotification('Vehicle Unlocked', `${mission.vehicleUnlock} 🏍️`);
    }
    
    // Show completion
    showNotification('Mission Complete!', `+${mission.rewards?.money || 0} faisaa`);
    
    // Show end dialogue
    if (mission.dialogueEnd && DIALOGUES[mission.dialogueEnd]) {
        setTimeout(() => {
            showDialogue(DIALOGUES[mission.dialogueEnd]);
        }, 1500);
    }
    
    // Check for act end
    if (mission.actEnd) {
        setTimeout(() => {
            showActComplete();
        }, 3000);
    } else {
        // Start next mission
        GameState.currentMission++;
        if (GameState.currentMission < MISSIONS.act1.length) {
            setTimeout(() => {
                startMission(MISSIONS.act1[GameState.currentMission]);
            }, 3000);
        }
    }
    
    // Save progress
    saveGame();
}

function showActComplete() {
    unlockAchievement('act1_complete');
    
    showNotification('Act 1 Complete!', 'Maafannu Awakening');
    
    // In full game, would transition to Act 2
    setTimeout(() => {
        showNotification('To Be Continued...', 'Act 2: Malé Core Wars coming soon!');
    }, 3000);
}

// ==================== DIALOGUE SYSTEM ====================
let currentDialogue = null;
let currentDialogueIndex = 0;

function showDialogue(dialogue) {
    GameState.isInDialogue = true;
    currentDialogue = dialogue;
    currentDialogueIndex = 0;
    
    document.getElementById('dialogue-box').classList.remove('hidden');
    updateDialogueDisplay();
}

function updateDialogueDisplay() {
    const box = document.getElementById('dialogue-box');
    const speaker = document.getElementById('dialogue-speaker');
    const text = document.getElementById('dialogue-text');
    const choices = document.getElementById('dialogue-choices');
    
    speaker.textContent = `${currentDialogue.sprite} ${currentDialogue.speaker}`;
    
    if (currentDialogueIndex < currentDialogue.lines.length) {
        const line = currentDialogue.lines[currentDialogueIndex];
        text.textContent = line.text;
        
        if (line.dhivehi) {
            text.style.fontStyle = 'italic';
        } else {
            text.style.fontStyle = 'normal';
        }
        
        choices.innerHTML = '<div class="dialogue-choice" onclick="advanceDialogue()">Continue ▶</div>';
    } else if (currentDialogue.choices) {
        text.textContent = 'What do you say?';
        choices.innerHTML = '';
        
        currentDialogue.choices.forEach((choice, index) => {
            const karmaClass = choice.karma > 0 ? 'karma-good' : (choice.karma < 0 ? 'karma-bad' : '');
            choices.innerHTML += `
                <div class="dialogue-choice ${karmaClass}" onclick="selectDialogueChoice(${index})">
                    ${choice.text}
                </div>
            `;
        });
    } else {
        closeDialogue();
    }
}

function advanceDialogue() {
    currentDialogueIndex++;
    updateDialogueDisplay();
}

function selectDialogueChoice(index) {
    const choice = currentDialogue.choices[index];
    
    // Apply karma
    if (choice.karma) {
        GameState.player.karma = Math.max(0, Math.min(100, 
            GameState.player.karma + choice.karma));
    }
    
    // Apply family karma
    if (choice.familyKarma) {
        GameState.player.familyMeter = Math.max(0, Math.min(100,
            GameState.player.familyMeter + choice.familyKarma));
    }
    
    // Record choice
    GameState.choices.push({
        dialogue: currentDialogue.speaker,
        choice: choice.text,
        karma: choice.karma
    });
    
    // Show response dialogue if exists
    if (choice.response && DIALOGUES[choice.response]) {
        currentDialogue = DIALOGUES[choice.response];
        currentDialogueIndex = 0;
        updateDialogueDisplay();
    } else {
        closeDialogue();
    }
    
    // Update mission if applicable
    if (choice.outcome) {
        updateMissionObjective('interact', choice.outcome, true);
    }
}

function closeDialogue() {
    GameState.isInDialogue = false;
    currentDialogue = null;
    document.getElementById('dialogue-box').classList.add('hidden');
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(title, text) {
    const notif = document.getElementById('notification');
    document.getElementById('notif-title').textContent = title;
    document.getElementById('notif-text').textContent = text;
    
    notif.classList.add('show');
    
    setTimeout(() => {
        notif.classList.remove('show');
    }, 3000);
}

// ==================== ACHIEVEMENT SYSTEM ====================
function unlockAchievement(id) {
    if (GameState.achievements.includes(id)) return;
    
    const achievement = ACHIEVEMENTS_LIST.find(a => a.id === id);
    if (achievement) {
        GameState.achievements.push(id);
        showNotification(`🏆 Achievement Unlocked!`, `${achievement.icon} ${achievement.name}`);
        saveGame();
    }
}

// ==================== RADIO SYSTEM ====================
let radioInterval = null;
let currentRadioIndex = 0;
let currentStation = 'raajjeFM';

function startRadio() {
    updateRadio();
    radioInterval = setInterval(updateRadio, 8000);
}

function updateRadio() {
    const station = RADIO_CONTENT[currentStation];
    const segment = station.segments[currentRadioIndex];
    
    document.getElementById('radio-station').textContent = station.name;
    document.getElementById('radio-text').textContent = segment.text;
    
    currentRadioIndex = (currentRadioIndex + 1) % station.segments.length;
}

// ==================== AUDIO SYSTEM (Web Audio API) ====================
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    initAudio();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch (type) {
        case 'hit':
            oscillator.frequency.value = 150;
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialDecayTo(0.01, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
            break;
            
        case 'hurt':
            oscillator.frequency.value = 200;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialDecayTo(0.01, audioCtx.currentTime + 0.2);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.2);
            break;
            
        case 'coin':
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialDecayTo(0.01, audioCtx.currentTime + 0.15);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.15);
            break;
    }
}

// Polyfill for exponentialDecayTo
GainNode.prototype.exponentialDecayTo = function(value, endTime) {
    this.gain.exponentialRampToValueAtTime(Math.max(value, 0.0001), endTime);
};

// ==================== MINI-GAMES ====================

// Boduberu Rhythm Game
let boduberuGame = {
    active: false,
    score: 0,
    combo: 0,
    notes: [],
    bpm: 120,
    noteSpeed: 3
};

function startBoduberuMinigame() {
    GameState.isInMinigame = true;
    boduberuGame.active = true;
    boduberuGame.score = 0;
    boduberuGame.combo = 0;
    boduberuGame.notes = [];
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🥁 Boduberu Beat';
    document.getElementById('minigame-score').textContent = 'Score: 0 | Combo: 0';
    
    // Generate notes
    for (let i = 0; i < 20; i++) {
        boduberuGame.notes.push({
            lane: Math.floor(Math.random() * 4),
            y: -50 - i * 100,
            hit: false
        });
    }
    
    // Start game loop
    requestAnimationFrame(boduberuLoop);
    
    // Setup input
    document.addEventListener('keydown', boduberuInput);
    minigameCanvas.addEventListener('touchstart', boduberuTouchInput);
}

function boduberuLoop() {
    if (!boduberuGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Draw lanes
    const laneWidth = width / 4;
    const laneColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    const laneKeys = ['A', 'S', 'D', 'F'];
    
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `${laneColors[i]}33`;
        ctx.fillRect(i * laneWidth, 0, laneWidth, height);
        
        // Hit zone
        ctx.fillStyle = `${laneColors[i]}66`;
        ctx.fillRect(i * laneWidth, height - 60, laneWidth, 50);
        
        // Key label
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(laneKeys[i], i * laneWidth + laneWidth / 2, height - 25);
    }
    
    // Update and draw notes
    let activeNotes = 0;
    boduberuGame.notes.forEach(note => {
        if (note.hit) return;
        
        note.y += boduberuGame.noteSpeed;
        
        if (note.y > height + 50) {
            // Missed
            note.hit = true;
            boduberuGame.combo = 0;
        } else {
            activeNotes++;
            
            // Draw note
            ctx.fillStyle = laneColors[note.lane];
            ctx.beginPath();
            ctx.arc(note.lane * laneWidth + laneWidth / 2, note.y, 20, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.font = '24px Arial';
            ctx.fillText('🥁', note.lane * laneWidth + laneWidth / 2, note.y + 8);
        }
    });
    
    // Update score display
    document.getElementById('minigame-score').textContent = 
        `Score: ${boduberuGame.score} | Combo: ${boduberuGame.combo}`;
    
    // Check if game over
    if (activeNotes === 0) {
        endBoduberuMinigame();
        return;
    }
    
    requestAnimationFrame(boduberuLoop);
}

function boduberuInput(e) {
    if (!boduberuGame.active) return;
    
    const laneMap = { 'KeyA': 0, 'KeyS': 1, 'KeyD': 2, 'KeyF': 3 };
    const lane = laneMap[e.code];
    
    if (lane !== undefined) {
        checkBoduberuHit(lane);
    }
}

function boduberuTouchInput(e) {
    if (!boduberuGame.active) return;
    
    const rect = minigameCanvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const lane = Math.floor(x / (rect.width / 4));
    
    checkBoduberuHit(lane);
}

function checkBoduberuHit(lane) {
    const hitZoneY = minigameCanvas.height - 60;
    const hitTolerance = 40;
    
    for (let note of boduberuGame.notes) {
        if (note.hit || note.lane !== lane) continue;
        
        if (Math.abs(note.y - hitZoneY) < hitTolerance) {
            // Hit!
            note.hit = true;
            boduberuGame.combo++;
            boduberuGame.score += 100 * (1 + boduberuGame.combo * 0.1);
            
            playBoduberuSound();
            return;
        }
    }
    
    // Miss
    boduberuGame.combo = 0;
}

function playBoduberuSound() {
    initAudio();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = 100 + Math.random() * 50;
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialDecayTo(0.01, audioCtx.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}

function endBoduberuMinigame() {
    boduberuGame.active = false;
    GameState.isInMinigame = false;
    
    document.removeEventListener('keydown', boduberuInput);
    minigameCanvas.removeEventListener('touchstart', boduberuTouchInput);
    
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    // Calculate reward
    const reward = Math.floor(boduberuGame.score / 10);
    GameState.player.money += reward;
    
    showNotification('Boduberu Complete!', `Score: ${boduberuGame.score} | +${reward} faisaa`);
    
    // Achievement check
    if (boduberuGame.score >= 2000 && !GameState.achievements.includes('boduberu_master')) {
        unlockAchievement('boduberu_master');
    }
}

// Fishing Mini-game
let fishingGame = {
    active: false,
    fishY: 150,
    hookY: 150,
    fishSpeed: 2,
    fishDirection: 1,
    tension: 0,
    caught: false,
    timer: 30
};

function startFishingMinigame() {
    GameState.isInMinigame = true;
    fishingGame.active = true;
    fishingGame.fishY = 150;
    fishingGame.hookY = 150;
    fishingGame.tension = 0;
    fishingGame.caught = false;
    fishingGame.timer = 30;
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🎣 Dhoni Fishing';
    
    requestAnimationFrame(fishingLoop);
    
    document.addEventListener('keydown', fishingInput);
    document.addEventListener('keyup', fishingInputUp);
    minigameCanvas.addEventListener('touchstart', fishingTouchStart);
    minigameCanvas.addEventListener('touchend', fishingTouchEnd);
}

function fishingLoop() {
    if (!fishingGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#0066aa';
    ctx.fillRect(0, 0, width, height);
    
    // Draw water waves
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 50 + i * 60);
        for (let x = 0; x < width; x += 20) {
            ctx.lineTo(x, 50 + i * 60 + Math.sin(x * 0.05 + frameCount * 0.1) * 10);
        }
        ctx.stroke();
    }
    
    // Update fish
    fishingGame.fishY += fishingGame.fishSpeed * fishingGame.fishDirection;
    if (fishingGame.fishY < 50 || fishingGame.fishY > height - 50) {
        fishingGame.fishDirection *= -1;
    }
    
    // Random direction changes
    if (Math.random() < 0.02) {
        fishingGame.fishDirection *= -1;
        fishingGame.fishSpeed = 1 + Math.random() * 3;
    }
    
    // Draw fish zone
    ctx.fillStyle = 'rgba(255,255,0,0.3)';
    ctx.fillRect(width / 2 - 30, fishingGame.fishY - 30, 60, 60);
    
    // Draw fish
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🐟', width / 2, fishingGame.fishY + 10);
    
    // Draw hook
    ctx.fillStyle = '#fff';
    ctx.fillText('🪝', width / 2, fishingGame.hookY + 10);
    
    // Draw tension meter
    ctx.fillStyle = '#333';
    ctx.fillRect(20, 20, 20, height - 40);
    
    const tensionColor = fishingGame.tension < 50 ? '#00ff00' : 
                        fishingGame.tension < 80 ? '#ffff00' : '#ff0000';
    ctx.fillStyle = tensionColor;
    ctx.fillRect(20, 20 + (100 - fishingGame.tension) * (height - 40) / 100, 
                 20, fishingGame.tension * (height - 40) / 100);
    
    // Check catch
    if (Math.abs(fishingGame.fishY - fishingGame.hookY) < 30) {
        fishingGame.tension += 2;
        
        if (fishingGame.tension >= 100) {
            fishingGame.caught = true;
            endFishingMinigame();
            return;
        }
    } else {
        fishingGame.tension = Math.max(0, fishingGame.tension - 1);
    }
    
    // Timer
    fishingGame.timer -= 1/60;
    document.getElementById('minigame-score').textContent = 
        `Time: ${Math.ceil(fishingGame.timer)}s | Tension: ${Math.floor(fishingGame.tension)}%`;
    
    if (fishingGame.timer <= 0) {
        endFishingMinigame();
        return;
    }
    
    requestAnimationFrame(fishingLoop);
}

let fishingHolding = false;

function fishingInput(e) {
    if (!fishingGame.active) return;
    if (e.code === 'Space') {
        fishingHolding = true;
    }
}

function fishingInputUp(e) {
    if (e.code === 'Space') {
        fishingHolding = false;
    }
}

function fishingTouchStart() {
    fishingHolding = true;
}

function fishingTouchEnd() {
    fishingHolding = false;
}

// Update hook position based on input
setInterval(() => {
    if (fishingGame.active && fishingHolding) {
        fishingGame.hookY = Math.max(50, fishingGame.hookY - 5);
    } else if (fishingGame.active) {
        fishingGame.hookY = Math.min(250, fishingGame.hookY + 3);
    }
}, 1000/60);

function endFishingMinigame() {
    fishingGame.active = false;
    GameState.isInMinigame = false;
    
    document.removeEventListener('keydown', fishingInput);
    document.removeEventListener('keyup', fishingInputUp);
    minigameCanvas.removeEventListener('touchstart', fishingTouchStart);
    minigameCanvas.removeEventListener('touchend', fishingTouchEnd);
    
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (fishingGame.caught) {
        const reward = 50 + Math.floor(Math.random() * 50);
        GameState.player.money += reward;
        showNotification('Fish Caught! 🐟', `+${reward} faisaa`);
    } else {
        showNotification('Fish Escaped!', 'Better luck next time...');
    }
}

// ==================== INITIALIZE ====================
window.addEventListener('load', init);

// Make functions globally accessible for HTML onclick
window.closeSubMenu = closeSubMenu;
window.showCodexCategory = showCodexCategory;
window.purchaseUpgrade = purchaseUpgrade;
window.loadAct = loadAct;
window.advanceDialogue = advanceDialogue;
window.selectDialogueChoice = selectDialogueChoice;

// Debug functions (remove in production)
window.DEBUG = {
    addMoney: (amount) => { GameState.player.money += amount; updateHUD(); },
    setKarma: (value) => { GameState.player.karma = value; updateHUD(); },
    completeMission: () => { 
        if (GameState.currentMissionData) {
            GameState.currentMissionData.objectives.forEach(o => {
                if (o.count) o.current = o.count;
                else o.current = true;
            });
            checkMissionObjectives();
        }
    },
    spawnEnemy: () => {
        currentEnemies.push({
            type: 'kudaThug',
            sprite: SPRITES.gangMember,
            name: 'Test Enemy',
            x: GameState.player.x + 100,
            y: GameState.player.y,
            health: 30,
            maxHealth: 30,
            speed: 1,
            direction: 0,
            state: 'patrol',
            attackCooldown: 0,
            hitFlash: 0
        });
    },
    startBoduberu: startBoduberuMinigame,
    startFishing: startFishingMinigame
};


// ============================================
// ACT 2 INTEGRATION
// ============================================

// Extend MAPS with Act 2 maps
function loadAct2Content() {
    if (typeof ACT2_MAPS !== 'undefined') {
        // Add Act 2 maps to main MAPS object
        for (let mapKey in ACT2_MAPS) {
            MAPS[mapKey] = ACT2_MAPS[mapKey];
        }
        
        // Generate tiles for new maps
        for (let mapKey in ACT2_MAPS) {
            generateMapTiles(mapKey);
        }
        
        // Add Act 2 dialogues
        if (typeof ACT2_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT2_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT2_DIALOGUES[dialogueKey];
            }
        }
        
        // Add Act 2 missions
        if (typeof ACT2_MISSIONS !== 'undefined') {
            MISSIONS.act2 = ACT2_MISSIONS;
        }
        
        // Add Act 2 side missions
        if (typeof ACT2_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act2 = ACT2_SIDE_MISSIONS;
        }
        
        console.log('Act 2 content loaded successfully');
    }
}

// Generate tiles for a specific map
function generateMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 1; // Default ground
            
            // Water borders
            if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                tile = 0;
            }
            // Roads
            else if (x % 8 === 0 || y % 8 === 0) {
                tile = 2;
            }
            // Random buildings
            else if (Math.random() < 0.12) {
                tile = 3;
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    // Different tile types for different zones
                    if (zoneKey.includes('park') || zoneKey.includes('Park')) {
                        map.tiles[y][x] = 6; // Park
                    } else if (zoneKey.includes('mosque') || zoneKey.includes('Mosque')) {
                        map.tiles[y][x] = 7; // Religious
                    } else if (zoneKey.includes('port') || zoneKey.includes('dock') || zoneKey.includes('Dock')) {
                        map.tiles[y][x] = 5; // Dock
                    } else if (zoneKey.includes('HQ') || zoneKey.includes('Outpost')) {
                        map.tiles[y][x] = 8; // Gang territory
                    } else {
                        map.tiles[y][x] = 4; // Generic zone
                    }
                }
            }
        }
    }
}

// Transition to Act 2
function startAct2() {
    GameState.currentAct = 2;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'male_henveiru';
    
    // Load Act 2 content
    loadAct2Content();
    
    // Set player position
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    // Spawn NPCs for Act 2
    spawnAct2NPCs();
    
    // Update radio
    if (typeof ACT2_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT2_RADIO.raajjeFM.segments;
        RADIO_CONTENT.undergroundFM.segments = ACT2_RADIO.undergroundFM.segments;
    }
    
    // Show act intro
    showNotification('Act 2', 'Malé Core Wars');
    
    // Start first mission
    if (MISSIONS.act2 && MISSIONS.act2.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act2[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 2
function spawnAct2NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Spawn gang members based on territory
    if (map.gangTerritory === 'Kuda Henveiru') {
        for (let i = 0; i < 5; i++) {
            currentEnemies.push({
                type: 'kudaThug',
                sprite: SPRITES.gangMember,
                name: 'Kuda Henveiru Thug',
                x: 300 + Math.random() * 400,
                y: 200 + Math.random() * 300,
                health: 35,
                maxHealth: 35,
                speed: 1.2,
                direction: Math.random() * Math.PI * 2,
                state: 'patrol',
                attackCooldown: 0,
                hitFlash: 0
            });
        }
    } else if (map.gangTerritory === 'Malé Sharks') {
        // Sharks are neutral until player makes choice
        for (let i = 0; i < 3; i++) {
            currentNPCs.push({
                type: 'sharkMember',
                sprite: '🦈',
                name: 'Malé Shark',
                x: 400 + Math.random() * 200,
                y: 300 + Math.random() * 200,
                direction: Math.random() * Math.PI * 2,
                speed: 0.3,
                dialogue: ACT2_DIALOGUES?.shark_first_meeting
            });
        }
    } else if (map.gangTerritory === 'Masodi') {
        for (let i = 0; i < 6; i++) {
            currentEnemies.push({
                type: 'masodiEnforcer',
                sprite: '😈',
                name: 'Masodi Enforcer',
                x: 350 + Math.random() * 300,
                y: 250 + Math.random() * 250,
                health: 40,
                maxHealth: 40,
                speed: 1.3,
                direction: Math.random() * Math.PI * 2,
                state: 'patrol',
                attackCooldown: 0,
                hitFlash: 0
            });
        }
    }
    
    // Spawn civilians
    for (let i = 0; i < 6; i++) {
        currentNPCs.push({
            type: 'civilian',
            sprite: SPRITES.npc,
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.4
        });
    }
    
    // Spawn items
    for (let i = 0; i < 8; i++) {
        currentItems.push({
            type: Math.random() < 0.6 ? 'money' : 'health',
            x: (5 + Math.random() * (map.width - 10)) * TILE_SIZE,
            y: (5 + Math.random() * (map.height - 10)) * TILE_SIZE,
            value: Math.floor(Math.random() * 40) + 15
        });
    }
    
    // Spawn special NPCs based on mission
    if (GameState.currentMission >= 2 && !GameState.flags.rippooSecretRevealed) {
        // Rippoo at tea shop
        const teaShop = map.zones?.rippooTeaShop;
        if (teaShop) {
            currentNPCs.push({
                type: 'rippoo',
                sprite: SPRITES.rippoo,
                name: 'Rippoo (Mother)',
                x: (teaShop.x + teaShop.w / 2) * TILE_SIZE,
                y: (teaShop.y + teaShop.h / 2) * TILE_SIZE,
                direction: 0,
                speed: 0,
                dialogue: ACT2_DIALOGUES?.rippoo_secret_reveal
            });
        }
    }
}

// Travel between maps
function travelToMap(mapKey) {
    if (!MAPS[mapKey]) {
        showNotification('Error', 'Map not found');
        return;
    }
    
    // Fade out effect
    showNotification('Traveling...', MAPS[mapKey].name);
    
    setTimeout(() => {
        GameState.world.currentMap = mapKey;
        const map = MAPS[mapKey];
        
        // Generate tiles if needed
        if (!map.tiles || map.tiles.length === 0) {
            generateMapTiles(mapKey);
        }
        
        // Set player position
        GameState.player.x = map.spawnX * TILE_SIZE;
        GameState.player.y = map.spawnY * TILE_SIZE;
        
        // Reset camera
        Camera.x = GameState.player.x - CANVAS_WIDTH / 2;
        Camera.y = GameState.player.y - CANVAS_HEIGHT / 2;
        
        // Spawn appropriate NPCs
        if (GameState.currentAct === 2) {
            spawnAct2NPCs();
        } else {
            spawnNPCs();
        }
        
        // Update mission objective if travel was required
        updateMissionObjective('travel', mapKey, true);
        
        showNotification('Arrived', map.name);
    }, 1000);
}

// Heist planning mini-game
let heistPlanningActive = false;
let currentHeist = null;

function startHeistPlanning(heistId) {
    if (typeof HEIST_PLANS === 'undefined' || !HEIST_PLANS[heistId]) {
        showNotification('Error', 'Heist not found');
        return;
    }
    
    heistPlanningActive = true;
    currentHeist = HEIST_PLANS[heistId];
    GameState.isInMinigame = true;
    
    // Show heist planning UI
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = `🎯 ${currentHeist.name} - Planning`;
    
    renderHeistPlanning();
}

function renderHeistPlanning() {
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Title
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Choose Your Approach', width / 2, 30);
    
    // Draw approach options
    const approaches = currentHeist.approaches;
    const optionHeight = 80;
    const startY = 60;
    
    approaches.forEach((approach, index) => {
        const y = startY + index * (optionHeight + 10);
        
        // Background
        ctx.fillStyle = '#2a2a4e';
        ctx.fillRect(20, y, width - 40, optionHeight);
        
        // Border
        ctx.strokeStyle = '#778da9';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, y, width - 40, optionHeight);
        
        // Name
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(approach.name, 30, y + 20);
        
        // Description
        ctx.fillStyle = '#aaa';
        ctx.font = '11px Arial';
        ctx.fillText(approach.description, 30, y + 38);
        
        // Requirements
        ctx.fillStyle = '#ffcc00';
        ctx.font = '10px Arial';
        let reqText = 'Requires: ';
        for (let req in approach.requirements) {
            reqText += `${req}: ${approach.requirements[req]} `;
        }
        ctx.fillText(reqText, 30, y + 55);
        
        // Rewards
        ctx.fillStyle = '#00ff00';
        ctx.fillText(`Reward: ${approach.rewards.money} faisaa`, 30, y + 70);
        
        // Click handler
        minigameCanvas.onclick = (e) => {
            const rect = minigameCanvas.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            
            approaches.forEach((app, idx) => {
                const appY = startY + idx * (optionHeight + 10);
                if (clickY >= appY && clickY <= appY + optionHeight) {
                    selectHeistApproach(idx);
                }
            });
        };
    });
    
    // Instructions
    ctx.fillStyle = '#778da9';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Click an approach to select', width / 2, height - 20);
}

function selectHeistApproach(index) {
    const approach = currentHeist.approaches[index];
    
    // Check requirements
    let canProceed = true;
    for (let req in approach.requirements) {
        if (req === 'money' && GameState.player.money < approach.requirements[req]) {
            canProceed = false;
            showNotification('Not Enough Faisaa', `Need ${approach.requirements[req]} faisaa`);
        } else if (req !== 'money' && GameState.player.skills[req] < approach.requirements[req]) {
            canProceed = false;
            showNotification('Skill Too Low', `Need ${req} level ${approach.requirements[req]}`);
        }
    }
    
    if (!canProceed) return;
    
    // Deduct money if required
    if (approach.requirements.money) {
        GameState.player.money -= approach.requirements.money;
    }
    
    // Calculate success based on risks
    let success = true;
    for (let risk in approach.risks) {
        if (Math.random() < approach.risks[risk]) {
            success = false;
            break;
        }
    }
    
    // End heist planning
    heistPlanningActive = false;
    currentHeist = null;
    GameState.isInMinigame = false;
    document.getElementById('minigame-overlay').classList.add('hidden');
    minigameCanvas.onclick = null;
    
    if (success) {
        GameState.player.money += approach.rewards.money;
        GameState.player.karma += approach.rewards.karma;
        showNotification('Heist Successful!', `+${approach.rewards.money} faisaa`);
        updateMissionObjective('steal', 'shipment', true);
    } else {
        showNotification('Heist Failed!', 'You were detected!');
        GameState.world.heat = Math.min(5, GameState.world.heat + 2);
        // Spawn enemies
        for (let i = 0; i < 3; i++) {
            currentEnemies.push({
                type: 'guard',
                sprite: '👮🏾',
                name: 'Security Guard',
                x: GameState.player.x + (Math.random() - 0.5) * 200,
                y: GameState.player.y + (Math.random() - 0.5) * 200,
                health: 25,
                maxHealth: 25,
                speed: 1.5,
                direction: 0,
                state: 'chase',
                attackCooldown: 0,
                hitFlash: 0
            });
        }
    }
}

// Charisma mini-game for recruitment
let charismaGameActive = false;
let charismaTarget = null;
let charismaWords = [];
let charismaInput = '';
let charismaScore = 0;
let charismaTimer = 30;

const CHARISMA_PHRASES = [
    { word: 'FAISAA', meaning: 'Money - promise rewards' },
    { word: 'DHIMAA', meaning: 'Blood - appeal to loyalty' },
    { word: 'FAMILY', meaning: 'Family - emotional appeal' },
    { word: 'POWER', meaning: 'Power - promise influence' },
    { word: 'RESPECT', meaning: 'Respect - appeal to honor' },
    { word: 'REVENGE', meaning: 'Revenge - appeal to anger' }
];

function startCharismaGame(target) {
    charismaGameActive = true;
    charismaTarget = target;
    charismaWords = [...CHARISMA_PHRASES].sort(() => Math.random() - 0.5).slice(0, 4);
    charismaInput = '';
    charismaScore = 0;
    charismaTimer = 30;
    GameState.isInMinigame = true;
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🗣️ Persuasion';
    
    // Start timer
    const timerInterval = setInterval(() => {
        charismaTimer--;
        if (charismaTimer <= 0 || !charismaGameActive) {
            clearInterval(timerInterval);
            if (charismaGameActive) endCharismaGame();
        }
    }, 1000);
    
    document.addEventListener('keydown', charismaKeyHandler);
    requestAnimationFrame(charismaLoop);
}

function charismaKeyHandler(e) {
    if (!charismaGameActive) return;
    
    if (e.key === 'Backspace') {
        charismaInput = charismaInput.slice(0, -1);
    } else if (e.key === 'Enter') {
        checkCharismaWord();
    } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        charismaInput += e.key.toUpperCase();
    }
}

function checkCharismaWord() {
    const matchedWord = charismaWords.find(w => w.word === charismaInput);
    if (matchedWord) {
        charismaScore += 25;
        charismaWords = charismaWords.filter(w => w !== matchedWord);
        
        // Add new word
        const remaining = CHARISMA_PHRASES.filter(p => !charismaWords.includes(p));
        if (remaining.length > 0) {
            charismaWords.push(remaining[Math.floor(Math.random() * remaining.length)]);
        }
    }
    charismaInput = '';
    
    if (charismaScore >= 100) {
        endCharismaGame();
    }
}

function charismaLoop() {
    if (!charismaGameActive) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Timer
    ctx.fillStyle = charismaTimer > 10 ? '#fff' : '#ff0000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Time: ${charismaTimer}s`, width - 20, 25);
    
    // Score
    ctx.fillStyle = '#00ff00';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${charismaScore}/100`, 20, 25);
    
    // Words to type
    ctx.fillStyle = '#ffcc00';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Type these words to persuade:', width / 2, 60);
    
    charismaWords.forEach((word, index) => {
        const y = 90 + index * 40;
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(word.word, width / 2, y);
        
        ctx.fillStyle = '#778da9';
        ctx.font = '11px Arial';
        ctx.fillText(word.meaning, width / 2, y + 15);
    });
    
    // Input field
    ctx.fillStyle = '#333';
    ctx.fillRect(50, height - 60, width - 100, 40);
    ctx.strokeStyle = '#778da9';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, height - 60, width - 100, 40);
    
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(charismaInput + '_', width / 2, height - 32);
    
    requestAnimationFrame(charismaLoop);
}

function endCharismaGame() {
    charismaGameActive = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', charismaKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (charismaScore >= 100) {
        showNotification('Recruitment Success!', `${charismaTarget} joined your crew!`);
        updateMissionObjective('recruit', 'gangMember', 1);
    } else {
        showNotification('Recruitment Failed', 'They weren\'t convinced...');
    }
}

// Override completeMission to handle act transitions
const originalCompleteMission = completeMission;
completeMission = function(mission) {
    // Call original function
    originalCompleteMission(mission);
    
    // Check for act transition
    if (mission.actEnd && mission.unlocks && mission.unlocks.includes('act2_start')) {
        setTimeout(() => {
            startAct2();
        }, 3000);
    } else if (mission.actEnd && mission.unlocks && mission.unlocks.includes('act3_start')) {
        setTimeout(() => {
            showNotification('Act 2 Complete!', 'Malé Core Wars');
            setTimeout(() => {
                showNotification('To Be Continued...', 'Act 3: Synthetic Surge coming soon!');
            }, 2000);
        }, 3000);
    }
};

// Update render function for new tile types
const originalRenderMap = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    // Calculate visible tiles
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y][x];
            let color;
            
            switch (tile) {
                case 0: color = '#0066aa'; break; // Water
                case 1: color = '#8B7355'; break; // Ground
                case 2: color = '#555555'; break; // Road
                case 3: color = '#4a4a4a'; break; // Building
                case 4: color = '#6B8E23'; break; // Market/Zone
                case 5: color = '#8B4513'; break; // Dock
                case 6: color = '#228B22'; break; // Park
                case 7: color = '#DAA520'; break; // Religious
                case 8: color = '#8B0000'; break; // Gang territory
                default: color = '#8B7355';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Add texture
            if (tile === 1 || tile === 4 || tile === 6) {
                ctx.fillStyle = 'rgba(0,0,0,0.1)';
                if ((x + y) % 2 === 0) {
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
            
            // Water animation
            if (tile === 0) {
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(frameCount * 0.05 + x + y) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Gang territory pulsing
            if (tile === 8) {
                ctx.fillStyle = `rgba(255,0,0,${0.1 + Math.sin(frameCount * 0.08) * 0.1})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Load Act 2 content on game start
const originalInit = init;
init = function() {
    originalInit();
    
    // Load Act 2 content after a short delay
    setTimeout(() => {
        loadAct2Content();
    }, 100);
};

// Update loadAct function to handle Act 2
const originalLoadAct = loadAct;
loadAct = function(actNum) {
    if (actNum === 2) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct2();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadAct(actNum);
    }
};

// Add debug commands for Act 2
window.DEBUG.startAct2 = startAct2;
window.DEBUG.travelTo = travelToMap;
window.DEBUG.startHeist = () => startHeistPlanning('portHeist');
window.DEBUG.startCharisma = () => startCharismaGame('Street Kid');

console.log('Act 2 integration loaded');


// ============================================
// ACT 3 INTEGRATION
// ============================================

function loadAct3Content() {
    if (typeof ACT3_MAPS !== 'undefined') {
        // Add Act 3 maps
        for (let mapKey in ACT3_MAPS) {
            MAPS[mapKey] = ACT3_MAPS[mapKey];
            generateMapTiles(mapKey);
        }
        
        // Add Act 3 dialogues
        if (typeof ACT3_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT3_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT3_DIALOGUES[dialogueKey];
            }
        }
        
        // Add Act 3 missions
        if (typeof ACT3_MISSIONS !== 'undefined') {
            MISSIONS.act3 = ACT3_MISSIONS;
        }
        
        // Add Act 3 side missions
        if (typeof ACT3_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act3 = ACT3_SIDE_MISSIONS;
        }
        
        console.log('Act 3 content loaded successfully');
    }
}

// Generate Hulhumalé grid layout
function generateHulhumaleMap(mapKey) {
    const map = MAPS[mapKey];
    if (!map || !map.gridLayout) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 1; // Default ground
            
            // Water borders (beach on south)
            if (x === 0 || y === 0 || x === map.width - 1) {
                tile = 0;
            }
            // Beach at bottom
            else if (y >= map.height - 5) {
                tile = 9; // Sand
            }
            // Grid roads (Hulhumalé has regular grid)
            else if (x % 6 === 0 || y % 6 === 0) {
                tile = 2; // Road
            }
            // Apartment blocks
            else if ((x % 6 === 2 || x % 6 === 3) && (y % 6 === 2 || y % 6 === 3)) {
                tile = 10; // Modern building
            }
            // Parks
            else if (Math.random() < 0.05) {
                tile = 6; // Park
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 4;
        
        if (zoneKey.includes('Lab') || zoneKey.includes('lab')) tileType = 11; // Lab
        else if (zoneKey.includes('construction') || zoneKey.includes('Construction')) tileType = 12; // Construction
        else if (zoneKey.includes('beach') || zoneKey.includes('Beach')) tileType = 9; // Beach
        else if (zoneKey.includes('ferry') || zoneKey.includes('Ferry')) tileType = 5; // Dock
        else if (zoneKey.includes('airport') || zoneKey.includes('Airport')) tileType = 13; // Airport
        else if (zoneKey.includes('luxury') || zoneKey.includes('Luxury')) tileType = 14; // Luxury
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 3
function startAct3() {
    GameState.currentAct = 3;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'hulhumale_phase1';
    
    // Load Act 3 content
    loadAct3Content();
    
    // Generate Hulhumalé maps
    generateHulhumaleMap('hulhumale_phase1');
    generateHulhumaleMap('hulhumale_phase2');
    
    // Set player position
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    // Spawn NPCs
    spawnAct3NPCs();
    
    // Update radio
    if (typeof ACT3_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT3_RADIO.raajjeFM.segments;
        RADIO_CONTENT.undergroundFM.segments = ACT3_RADIO.undergroundFM.segments;
    }
    
    showNotification('Act 3', 'Synthetic Surge');
    
    // Start first mission
    if (MISSIONS.act3 && MISSIONS.act3.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act3[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 3
function spawnAct3NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Spawn construction workers
    for (let i = 0; i < 8; i++) {
        currentNPCs.push({
            type: 'worker',
            sprite: '👷🏾',
            name: 'Construction Worker',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 2 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.3
        });
    }
    
    // Spawn tourists on beach
    for (let i = 0; i < 4; i++) {
        currentNPCs.push({
            type: 'tourist',
            sprite: '🏖️',
            name: 'Tourist',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: (map.height - 3) * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.2
        });
    }
    
    // Spawn gang members based on territory
    if (map.gangTerritory === 'Synthetic Syndicate') {
        for (let i = 0; i < 5; i++) {
            currentEnemies.push({
                type: 'syndicateThug',
                sprite: '🧪',
                name: 'Syndicate Enforcer',
                x: 300 + Math.random() * 400,
                y: 200 + Math.random() * 300,
                health: 45,
                maxHealth: 45,
                speed: 1.3,
                direction: Math.random() * Math.PI * 2,
                state: 'patrol',
                attackCooldown: 0,
                hitFlash: 0
            });
        }
    }
    
    // Spawn items
    for (let i = 0; i < 10; i++) {
        currentItems.push({
            type: Math.random() < 0.5 ? 'money' : (Math.random() < 0.5 ? 'health' : 'chemical'),
            x: (5 + Math.random() * (map.width - 10)) * TILE_SIZE,
            y: (5 + Math.random() * (map.height - 15)) * TILE_SIZE,
            value: Math.floor(Math.random() * 50) + 20
        });
    }
    
    // Special NPCs
    if (GameState.world.currentMap === 'velana_airport') {
        // DhoDho
        const dhodhoZone = map.zones?.dhodhoOffice;
        if (dhodhoZone) {
            currentNPCs.push({
                type: 'dhodho',
                sprite: '👨🏾‍✈️',
                name: 'DhoDho (Uncle)',
                x: (dhodhoZone.x + dhodhoZone.w / 2) * TILE_SIZE,
                y: (dhodhoZone.y + dhodhoZone.h / 2) * TILE_SIZE,
                direction: 0,
                speed: 0,
                dialogue: ACT3_DIALOGUES?.dhodho_first_meeting
            });
        }
    }
}

// Extended tile rendering for Act 3
const originalRenderMapAct3 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 1;
            let color;
            
            switch (tile) {
                case 0: color = '#0066aa'; break; // Water
                case 1: color = '#8B7355'; break; // Ground
                case 2: color = '#555555'; break; // Road
                case 3: color = '#4a4a4a'; break; // Building
                case 4: color = '#6B8E23'; break; // Zone
                case 5: color = '#8B4513'; break; // Dock
                case 6: color = '#228B22'; break; // Park
                case 7: color = '#DAA520'; break; // Religious
                case 8: color = '#8B0000'; break; // Gang territory
                case 9: color = '#F4D03F'; break; // Sand/Beach
                case 10: color = '#708090'; break; // Modern building
                case 11: color = '#9B59B6'; break; // Lab (purple)
                case 12: color = '#E67E22'; break; // Construction (orange)
                case 13: color = '#34495E'; break; // Airport
                case 14: color = '#2ECC71'; break; // Luxury
                default: color = '#8B7355';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Texture effects
            if (tile === 9) { // Sand sparkle
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(frameCount * 0.1 + x * y) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            if (tile === 11) { // Lab glow
                ctx.fillStyle = `rgba(155,89,182,${0.2 + Math.sin(frameCount * 0.15) * 0.1})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            if (tile === 12) { // Construction animation
                if (Math.random() < 0.01) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(x * TILE_SIZE + Math.random() * TILE_SIZE, y * TILE_SIZE, 2, 2);
                }
            }
            
            // Water animation
            if (tile === 0) {
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(frameCount * 0.05 + x + y) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Update loadAct function for Act 3
const originalLoadActAct3 = loadAct;
loadAct = function(actNum) {
    if (actNum === 3) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct3();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct3(actNum);
    }
};

// Update completeMission for Act 3 transitions
const originalCompleteMissionAct3 = completeMission;
completeMission = function(mission) {
    originalCompleteMissionAct3(mission);
    
    if (mission.unlocks && mission.unlocks.includes('act4_start')) {
        setTimeout(() => {
            showNotification('Act 3 Complete!', 'Synthetic Surge');
            // Will transition to Act 4 when built
        }, 3000);
    }
};

// Debug commands for Act 3
window.DEBUG.startAct3 = startAct3;
window.DEBUG.startCrypto = () => startCryptoGame(10000);
window.DEBUG.startCooking = startDrugCookingGame;

// Load Act 3 content on init
setTimeout(() => {
    loadAct3Content();
}, 200);

console.log('Act 3 integration loaded');


// ============================================
// ACT 4 INTEGRATION
// ============================================

function loadAct4Content() {
    if (typeof ACT4_MAPS !== 'undefined') {
        for (let mapKey in ACT4_MAPS) {
            MAPS[mapKey] = ACT4_MAPS[mapKey];
            generatePoliticalMapTiles(mapKey);
        }
        
        if (typeof ACT4_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT4_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT4_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT4_MISSIONS !== 'undefined') {
            MISSIONS.act4 = ACT4_MISSIONS;
        }
        
        if (typeof ACT4_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act4 = ACT4_SIDE_MISSIONS;
        }
        
        console.log('Act 4 content loaded successfully');
    }
}

// Generate political district map tiles
function generatePoliticalMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 1; // Default ground
            
            // Water borders
            if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                tile = 0;
            }
            // Main roads
            else if (x % 10 === 0 || y % 10 === 0) {
                tile = 2;
            }
            // Secondary roads
            else if (x % 5 === 0 || y % 5 === 0) {
                tile = 15; // Paved walkway
            }
            // Government buildings
            else if (Math.random() < 0.08) {
                tile = 16; // Government building
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 16;
        
        if (zoneKey.includes('parliament') || zoneKey.includes('Parliament') || zoneKey.includes('Majlis')) tileType = 17;
        else if (zoneKey.includes('palace') || zoneKey.includes('Palace') || zoneKey.includes('Muliaage')) tileType = 18;
        else if (zoneKey.includes('court') || zoneKey.includes('Court')) tileType = 19;
        else if (zoneKey.includes('police') || zoneKey.includes('Police')) tileType = 20;
        else if (zoneKey.includes('square') || zoneKey.includes('Square')) tileType = 21;
        else if (zoneKey.includes('cell') || zoneKey.includes('Cell') || zoneKey.includes('prison')) tileType = 22;
        else if (zoneKey.includes('yard') || zoneKey.includes('Yard')) tileType = 23;
        else if (zoneKey.includes('protest') || zoneKey.includes('Protest')) tileType = 24;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 4
function startAct4() {
    GameState.currentAct = 4;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'parliament_district';
    
    loadAct4Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct4NPCs();
    
    if (typeof ACT4_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT4_RADIO.raajjeFM.segments;
        RADIO_CONTENT.undergroundFM.segments = ACT4_RADIO.undergroundFM.segments;
    }
    
    showNotification('Act 4', 'Parliament Plague');
    
    if (MISSIONS.act4 && MISSIONS.act4.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act4[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 4
function spawnAct4NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Politicians
    for (let i = 0; i < 5; i++) {
        currentNPCs.push({
            type: 'politician',
            sprite: '🤵🏾',
            name: 'MP',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.2
        });
    }
    
    // Security guards
    for (let i = 0; i < 6; i++) {
        currentEnemies.push({
            type: 'securityGuard',
            sprite: '👮🏾',
            name: 'Security Guard',
            x: 200 + Math.random() * 400,
            y: 150 + Math.random() * 300,
            health: 40,
            maxHealth: 40,
            speed: 1.2,
            direction: Math.random() * Math.PI * 2,
            state: 'patrol',
            attackCooldown: 0,
            hitFlash: 0
        });
    }
    
    // Protesters (neutral)
    for (let i = 0; i < 8; i++) {
        currentNPCs.push({
            type: 'protester',
            sprite: '📢',
            name: 'Protester',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.3
        });
    }
    
    // Journalists
    for (let i = 0; i < 3; i++) {
        currentNPCs.push({
            type: 'journalist',
            sprite: '📰',
            name: 'Journalist',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.4
        });
    }
    
    // Items
    for (let i = 0; i < 8; i++) {
        currentItems.push({
            type: Math.random() < 0.4 ? 'money' : (Math.random() < 0.5 ? 'health' : 'document'),
            x: (5 + Math.random() * (map.width - 10)) * TILE_SIZE,
            y: (5 + Math.random() * (map.height - 10)) * TILE_SIZE,
            value: Math.floor(Math.random() * 60) + 25
        });
    }
    
    // Special NPCs
    const alibeZone = map.zones?.alibeOffice;
    if (alibeZone) {
        currentNPCs.push({
            type: 'alibe',
            sprite: '🗳️',
            name: 'Alibe (Opposition Leader)',
            x: (alibeZone.x + alibeZone.w / 2) * TILE_SIZE,
            y: (alibeZone.y + alibeZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT4_DIALOGUES?.alibe_first_meeting
        });
    }
}

// Extended tile rendering for Act 4
const originalRenderMapAct4 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 1;
            let color;
            
            switch (tile) {
                case 0: color = '#0066aa'; break; // Water
                case 1: color = '#8B7355'; break; // Ground
                case 2: color = '#555555'; break; // Road
                case 3: color = '#4a4a4a'; break; // Building
                case 4: color = '#6B8E23'; break; // Zone
                case 5: color = '#8B4513'; break; // Dock
                case 6: color = '#228B22'; break; // Park
                case 7: color = '#DAA520'; break; // Religious
                case 8: color = '#8B0000'; break; // Gang territory
                case 9: color = '#F4D03F'; break; // Sand
                case 10: color = '#708090'; break; // Modern building
                case 11: color = '#9B59B6'; break; // Lab
                case 12: color = '#E67E22'; break; // Construction
                case 13: color = '#34495E'; break; // Airport
                case 14: color = '#2ECC71'; break; // Luxury
                case 15: color = '#7F8C8D'; break; // Paved walkway
                case 16: color = '#5D6D7E'; break; // Government building
                case 17: color = '#1ABC9C'; break; // Parliament (teal)
                case 18: color = '#E74C3C'; break; // Presidential Palace (red)
                case 19: color = '#9B59B6'; break; // Supreme Court (purple)
                case 20: color = '#3498DB'; break; // Police HQ (blue)
                case 21: color = '#F39C12'; break; // Republic Square (gold)
                case 22: color = '#2C3E50'; break; // Prison cell (dark)
                case 23: color = '#95A5A6'; break; // Prison yard (gray)
                case 24: color = '#E74C3C'; break; // Protest zone (red)
                default: color = '#8B7355';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Special effects
            if (tile === 17) { // Parliament glow
                ctx.fillStyle = `rgba(26,188,156,${0.15 + Math.sin(frameCount * 0.05) * 0.1})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            if (tile === 18) { // Palace shimmer
                ctx.fillStyle = `rgba(231,76,60,${0.1 + Math.sin(frameCount * 0.08) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            if (tile === 24) { // Protest zone pulse
                ctx.fillStyle = `rgba(255,0,0,${0.2 + Math.sin(frameCount * 0.1) * 0.15})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            if (tile === 22) { // Prison darkness
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Water animation
            if (tile === 0) {
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(frameCount * 0.05 + x + y) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Flashback mode
let isFlashbackMode = false;

function startFlashback(year) {
    isFlashbackMode = true;
    
    // Apply sepia filter effect
    const overlay = document.createElement('div');
    overlay.id = 'flashback-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(112, 66, 20, 0.3);
        pointer-events: none;
        z-index: 45;
    `;
    document.getElementById('game-container').appendChild(overlay);
    
    showNotification(`Flashback: ${year}`, 'Memory sequence...');
}

function endFlashback() {
    isFlashbackMode = false;
    const overlay = document.getElementById('flashback-overlay');
    if (overlay) overlay.remove();
}

// Update loadAct function for Act 4
const originalLoadActAct4 = loadAct;
loadAct = function(actNum) {
    if (actNum === 4) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct4();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct4(actNum);
    }
};

// Debug commands for Act 4
window.DEBUG.startAct4 = startAct4;
window.DEBUG.startSpeech = () => startSpeechGame('democracy');
window.DEBUG.flashback = () => startFlashback(2012);

// Load Act 4 content
setTimeout(() => {
    loadAct4Content();
}, 300);

console.log('Act 4 integration loaded');


// ============================================
// ACT 5 INTEGRATION
// ============================================

function loadAct5Content() {
    if (typeof ACT5_MAPS !== 'undefined') {
        for (let mapKey in ACT5_MAPS) {
            MAPS[mapKey] = ACT5_MAPS[mapKey];
            generatePrisonMapTiles(mapKey);
        }
        
        if (typeof ACT5_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT5_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT5_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT5_MISSIONS !== 'undefined') {
            MISSIONS.act5 = ACT5_MISSIONS;
        }
        
        if (typeof ACT5_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act5 = ACT5_SIDE_MISSIONS;
        }
        
        console.log('Act 5 content loaded successfully');
    }
}

// Generate prison map tiles
function generatePrisonMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 25; // Prison floor
            
            // Walls
            if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                tile = 26; // Prison wall
            }
            // Corridors
            else if (x % 8 === 0 || y % 8 === 0) {
                tile = 27; // Corridor
            }
            // Cell bars
            else if (Math.random() < 0.05) {
                tile = 28; // Bars
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 25;
        
        if (zoneKey.includes('cell') || zoneKey.includes('Cell')) tileType = 29;
        else if (zoneKey.includes('mess') || zoneKey.includes('Mess')) tileType = 30;
        else if (zoneKey.includes('yard') || zoneKey.includes('Yard')) tileType = 31;
        else if (zoneKey.includes('solitary') || zoneKey.includes('Solitary')) tileType = 32;
        else if (zoneKey.includes('warden') || zoneKey.includes('Warden')) tileType = 33;
        else if (zoneKey.includes('infirmary') || zoneKey.includes('Infirmary')) tileType = 34;
        else if (zoneKey.includes('tunnel') || zoneKey.includes('Tunnel')) tileType = 35;
        else if (zoneKey.includes('underwater') || zoneKey.includes('Underwater')) tileType = 0;
        else if (zoneKey.includes('exit') || zoneKey.includes('Exit') || zoneKey.includes('Freedom')) tileType = 36;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 5
function startAct5() {
    GameState.currentAct = 5;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'dhoonidhoo_interior';
    
    loadAct5Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct5NPCs();
    
    if (typeof ACT5_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT5_RADIO.raajjeFM.segments;
        RADIO_CONTENT.undergroundFM.segments = ACT5_RADIO.undergroundFM.segments;
    }
    
    showNotification('Act 5', 'Prison & Redemption');
    
    if (MISSIONS.act5 && MISSIONS.act5.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act5[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 5
function spawnAct5NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Prison guards (enemies)
    for (let i = 0; i < 8; i++) {
        currentEnemies.push({
            type: 'prisonGuard',
            sprite: '👮🏾',
            name: 'Prison Guard',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            health: 50,
            maxHealth: 50,
            speed: 1.0,
            direction: Math.random() * Math.PI * 2,
            state: 'patrol',
            attackCooldown: 0,
            hitFlash: 0
        });
    }
    
    // Inmates (neutral/friendly)
    for (let i = 0; i < 12; i++) {
        currentNPCs.push({
            type: 'inmate',
            sprite: '👤',
            name: 'Inmate',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.3
        });
    }
    
    // Gang inmates (potential enemies)
    for (let i = 0; i < 5; i++) {
        currentEnemies.push({
            type: 'gangInmate',
            sprite: '💪🏾',
            name: 'Gang Member',
            x: Math.random() * (map.width - 4) * TILE_SIZE + 2 * TILE_SIZE,
            y: Math.random() * (map.height - 4) * TILE_SIZE + 2 * TILE_SIZE,
            health: 35,
            maxHealth: 35,
            speed: 0.8,
            direction: Math.random() * Math.PI * 2,
            state: 'idle',
            attackCooldown: 0,
            hitFlash: 0
        });
    }
    
    // Special NPCs
    const muazZone = map.zones?.muazCell;
    if (muazZone) {
        currentNPCs.push({
            type: 'muaz',
            sprite: '👤',
            name: 'Muaz (Half-Brother)',
            x: (muazZone.x + muazZone.w / 2) * TILE_SIZE,
            y: (muazZone.y + muazZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT5_DIALOGUES?.muaz_first_meeting,
            isSpecial: true
        });
    }
    
    const wardenZone = map.zones?.wardenOffice;
    if (wardenZone) {
        currentNPCs.push({
            type: 'warden',
            sprite: '👔',
            name: 'Warden Rasheed',
            x: (wardenZone.x + wardenZone.w / 2) * TILE_SIZE,
            y: (wardenZone.y + wardenZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT5_DIALOGUES?.warden_intimidation,
            isSpecial: true
        });
    }
    
    const yardZone = map.zones?.exerciseYard;
    if (yardZone) {
        currentNPCs.push({
            type: 'bigIsmail',
            sprite: '💪🏾',
            name: 'Big Ismail',
            x: (yardZone.x + yardZone.w / 2) * TILE_SIZE,
            y: (yardZone.y + yardZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT5_DIALOGUES?.ismail_alliance_offer,
            isSpecial: true
        });
        
        currentNPCs.push({
            type: 'oldHussain',
            sprite: '👴🏾',
            name: 'Old Man Hussain',
            x: (yardZone.x + 2) * TILE_SIZE,
            y: (yardZone.y + 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT5_DIALOGUES?.hussain_father_truth,
            isSpecial: true
        });
    }
    
    // Contraband items
    for (let i = 0; i < 5; i++) {
        currentItems.push({
            type: Math.random() < 0.3 ? 'contraband' : (Math.random() < 0.5 ? 'health' : 'money'),
            x: (5 + Math.random() * (map.width - 10)) * TILE_SIZE,
            y: (5 + Math.random() * (map.height - 10)) * TILE_SIZE,
            value: Math.floor(Math.random() * 30) + 10
        });
    }
}

// Extended tile rendering for Act 5
const originalRenderMapAct5 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 1;
            let color;
            
            switch (tile) {
                case 0: color = '#0066aa'; break; // Water
                case 1: color = '#8B7355'; break; // Ground
                case 2: color = '#555555'; break; // Road
                // ... previous tiles ...
                case 25: color = '#3d3d3d'; break; // Prison floor
                case 26: color = '#1a1a1a'; break; // Prison wall
                case 27: color = '#4a4a4a'; break; // Corridor
                case 28: color = '#2c2c2c'; break; // Bars
                case 29: color = '#2a2a2a'; break; // Cell
                case 30: color = '#4a3a2a'; break; // Mess hall
                case 31: color = '#5a5a4a'; break; // Exercise yard
                case 32: color = '#1a0a0a'; break; // Solitary (dark red)
                case 33: color = '#4a4a5a'; break; // Warden office
                case 34: color = '#5a6a5a'; break; // Infirmary (green tint)
                case 35: color = '#2a2a1a'; break; // Tunnel
                case 36: color = '#6a8a6a'; break; // Exit/Freedom
                default: color = '#8B7355';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Prison atmosphere effects
            if (map.isPrison) {
                // Dim lighting
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            if (map.isDark) {
                // Very dark tunnel
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Solitary confinement darkness
            if (tile === 32) {
                ctx.fillStyle = 'rgba(50,0,0,0.3)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Exit glow
            if (tile === 36) {
                ctx.fillStyle = `rgba(100,200,100,${0.2 + Math.sin(frameCount * 0.1) * 0.1})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Water animation
            if (tile === 0) {
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(frameCount * 0.05 + x + y) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Update loadAct function for Act 5
const originalLoadActAct5 = loadAct;
loadAct = function(actNum) {
    if (actNum === 5) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct5();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct5(actNum);
    }
};

// Debug commands for Act 5
window.DEBUG.startAct5 = startAct5;
window.DEBUG.startWorkout = () => startWorkoutGame();
window.DEBUG.startTunnel = () => startTunnelGame();

// Load Act 5 content
setTimeout(() => {
    loadAct5Content();
}, 400);

console.log('Act 5 integration loaded');


// ============================================
// ACT 6 INTEGRATION
// ============================================

function loadAct6Content() {
    if (typeof ACT6_MAPS !== 'undefined') {
        for (let mapKey in ACT6_MAPS) {
            MAPS[mapKey] = ACT6_MAPS[mapKey];
            generateSouthernMapTiles(mapKey);
        }
        
        if (typeof ACT6_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT6_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT6_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT6_MISSIONS !== 'undefined') {
            MISSIONS.act6 = ACT6_MISSIONS;
        }
        
        if (typeof ACT6_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act6 = ACT6_SIDE_MISSIONS;
        }
        
        console.log('Act 6 content loaded successfully');
    }
}

// Generate southern island map tiles
function generateSouthernMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 1; // Default ground
            
            // Water borders (islands)
            if (x < 3 || y < 3 || x > map.width - 4 || y > map.height - 4) {
                tile = 0; // Ocean
            }
            // Beach edges
            else if (x < 5 || y < 5 || x > map.width - 6 || y > map.height - 6) {
                tile = 9; // Sand/beach
            }
            // Roads
            else if (x % 12 === 0 || y % 12 === 0) {
                tile = 2; // Road
            }
            // Vegetation
            else if (Math.random() < 0.15) {
                tile = 6; // Palm trees/vegetation
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 1;
        
        if (zoneKey.includes('harbor') || zoneKey.includes('Harbor')) tileType = 37;
        else if (zoneKey.includes('market') || zoneKey.includes('Market')) tileType = 38;
        else if (zoneKey.includes('mosque') || zoneKey.includes('Mosque')) tileType = 7;
        else if (zoneKey.includes('beach') || zoneKey.includes('Beach')) tileType = 9;
        else if (zoneKey.includes('airport') || zoneKey.includes('Airport')) tileType = 13;
        else if (zoneKey.includes('resort') || zoneKey.includes('Resort')) tileType = 14;
        else if (zoneKey.includes('gang') || zoneKey.includes('Gang')) tileType = 8;
        else if (zoneKey.includes('causeway') || zoneKey.includes('Causeway') || zoneKey.includes('link') || zoneKey.includes('Link')) tileType = 39;
        else if (zoneKey.includes('ruins') || zoneKey.includes('Ruins')) tileType = 40;
        else if (zoneKey.includes('village') || zoneKey.includes('Village')) tileType = 41;
        else if (zoneKey.includes('sea') || zoneKey.includes('Sea')) tileType = 0;
        else if (zoneKey.includes('shark') || zoneKey.includes('Shark')) tileType = 42;
        else if (zoneKey.includes('smuggler') || zoneKey.includes('Smuggler')) tileType = 43;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 6
function startAct6() {
    GameState.currentAct = 6;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'addu_hithadhoo';
    
    loadAct6Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct6NPCs();
    
    if (typeof ACT6_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT6_RADIO.raajjeFM.segments;
        if (ACT6_RADIO.adduFM) {
            RADIO_CONTENT.adduFM = ACT6_RADIO.adduFM;
        }
    }
    
    showNotification('Act 6', 'Southern Empire');
    
    if (MISSIONS.act6 && MISSIONS.act6.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act6[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 6
function spawnAct6NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Fishermen
    for (let i = 0; i < 6; i++) {
        currentNPCs.push({
            type: 'fisherman',
            sprite: '🎣',
            name: 'Fisherman',
            x: Math.random() * (map.width - 6) * TILE_SIZE + 3 * TILE_SIZE,
            y: Math.random() * (map.height - 6) * TILE_SIZE + 3 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.2
        });
    }
    
    // Local villagers
    for (let i = 0; i < 8; i++) {
        currentNPCs.push({
            type: 'villager',
            sprite: '👤',
            name: 'Villager',
            x: Math.random() * (map.width - 6) * TILE_SIZE + 3 * TILE_SIZE,
            y: Math.random() * (map.height - 6) * TILE_SIZE + 3 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.3
        });
    }
    
    // Gang members (Kalo Oiy)
    for (let i = 0; i < 5; i++) {
        currentEnemies.push({
            type: 'kaloOiy',
            sprite: '🐍',
            name: 'Kalo Oiy Member',
            x: Math.random() * (map.width - 6) * TILE_SIZE + 3 * TILE_SIZE,
            y: Math.random() * (map.height - 6) * TILE_SIZE + 3 * TILE_SIZE,
            health: 40,
            maxHealth: 40,
            speed: 1.0,
            direction: Math.random() * Math.PI * 2,
            state: 'patrol',
            attackCooldown: 0,
            hitFlash: 0
        });
    }
    
    // Special NPCs
    const gangZone = map.zones?.gangTerritory;
    if (gangZone) {
        currentNPCs.push({
            type: 'kudaManik',
            sprite: '🐍',
            name: 'Kuda Manik',
            x: (gangZone.x + gangZone.w / 2) * TILE_SIZE,
            y: (gangZone.y + gangZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT6_DIALOGUES?.kudamanik_introduction,
            isSpecial: true
        });
    }
    
    const harborZone = map.zones?.harbor;
    if (harborZone) {
        currentNPCs.push({
            type: 'muaz',
            sprite: '👤',
            name: 'Muaz',
            x: (harborZone.x + harborZone.w / 2) * TILE_SIZE,
            y: (harborZone.y + harborZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT6_DIALOGUES?.muaz_addu_arrival,
            isSpecial: true
        });
    }
    
    // Items (fish, money, etc.)
    for (let i = 0; i < 10; i++) {
        currentItems.push({
            type: Math.random() < 0.3 ? 'fish' : (Math.random() < 0.5 ? 'money' : 'health'),
            x: (5 + Math.random() * (map.width - 10)) * TILE_SIZE,
            y: (5 + Math.random() * (map.height - 10)) * TILE_SIZE,
            value: Math.floor(Math.random() * 50) + 20
        });
    }
}

// Extended tile rendering for Act 6
const originalRenderMapAct6 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 1;
            let color;
            
            switch (tile) {
                case 0: color = '#006699'; break; // Ocean (deeper blue for south)
                case 1: color = '#8B7355'; break; // Ground
                case 2: color = '#555555'; break; // Road
                case 6: color = '#228B22'; break; // Vegetation
                case 7: color = '#DAA520'; break; // Mosque
                case 8: color = '#8B0000'; break; // Gang territory
                case 9: color = '#F4D03F'; break; // Beach/sand
                case 13: color = '#34495E'; break; // Airport
                case 14: color = '#2ECC71'; break; // Resort
                case 37: color = '#4a6a8a'; break; // Harbor
                case 38: color = '#8a6a4a'; break; // Market
                case 39: color = '#666666'; break; // Causeway
                case 40: color = '#5a5a5a'; break; // British ruins
                case 41: color = '#7a6a5a'; break; // Village
                case 42: color = '#004466'; break; // Shark point (dark water)
                case 43: color = '#3a3a3a'; break; // Smuggler cove
                default: color = '#8B7355';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Island atmosphere - brighter, tropical
            if (map.isAddu || map.isFuvahmulah) {
                // Slight tropical tint
                ctx.fillStyle = 'rgba(100,200,150,0.05)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Water animation (more active for southern seas)
            if (tile === 0) {
                ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.sin(frameCount * 0.08 + x + y) * 0.1})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Beach shimmer
            if (tile === 9) {
                ctx.fillStyle = `rgba(255,255,200,${0.1 + Math.sin(frameCount * 0.03 + x) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Gang territory pulse
            if (tile === 8) {
                ctx.fillStyle = `rgba(139,0,0,${0.2 + Math.sin(frameCount * 0.05) * 0.1})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Causeway highlight
            if (tile === 39) {
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Update loadAct function for Act 6
const originalLoadActAct6 = loadAct;
loadAct = function(actNum) {
    if (actNum === 6) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct6();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct6(actNum);
    }
};

// Debug commands for Act 6
window.DEBUG.startAct6 = startAct6;
window.DEBUG.startDiving = () => startDivingGame();

// Load Act 6 content
setTimeout(() => {
    loadAct6Content();
}, 500);

console.log('Act 6 integration loaded');


// ============================================
// ACT 7 INTEGRATION
// ============================================

function loadAct7Content() {
    if (typeof ACT7_MAPS !== 'undefined') {
        for (let mapKey in ACT7_MAPS) {
            MAPS[mapKey] = ACT7_MAPS[mapKey];
            generateResortMapTiles(mapKey);
        }
        
        if (typeof ACT7_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT7_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT7_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT7_MISSIONS !== 'undefined') {
            MISSIONS.act7 = ACT7_MISSIONS;
        }
        
        if (typeof ACT7_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act7 = ACT7_SIDE_MISSIONS;
        }
        
        console.log('Act 7 content loaded successfully');
    }
}

// Generate resort map tiles
function generateResortMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 0; // Default water (resort islands)
            
            // Island shape (elliptical)
            const centerX = map.width / 2;
            const centerY = map.height / 2;
            const dx = (x - centerX) / (map.width * 0.4);
            const dy = (y - centerY) / (map.height * 0.4);
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 1) {
                // Inside island
                if (dist > 0.85) {
                    tile = 9; // Beach
                } else if (dist > 0.7) {
                    tile = 6; // Vegetation
                } else {
                    tile = 44; // Resort ground (luxury)
                }
            }
            
            // Paths
            if (dist < 0.8 && (x % 10 === 0 || y % 10 === 0)) {
                tile = 45; // Resort path
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 44;
        
        if (zoneKey.includes('jetty') || zoneKey.includes('Jetty') || zoneKey.includes('dock')) tileType = 46;
        else if (zoneKey.includes('reception') || zoneKey.includes('Reception') || zoneKey.includes('lobby')) tileType = 47;
        else if (zoneKey.includes('overwater') || zoneKey.includes('Overwater')) tileType = 48;
        else if (zoneKey.includes('beach') || zoneKey.includes('Beach')) tileType = 9;
        else if (zoneKey.includes('spa') || zoneKey.includes('Spa')) tileType = 49;
        else if (zoneKey.includes('restaurant') || zoneKey.includes('Restaurant') || zoneKey.includes('dining')) tileType = 50;
        else if (zoneKey.includes('diving') || zoneKey.includes('Diving')) tileType = 51;
        else if (zoneKey.includes('staff') || zoneKey.includes('Staff')) tileType = 52;
        else if (zoneKey.includes('vip') || zoneKey.includes('VIP') || zoneKey.includes('Presidential')) tileType = 53;
        else if (zoneKey.includes('pool') || zoneKey.includes('Pool')) tileType = 54;
        else if (zoneKey.includes('terminal') || zoneKey.includes('Terminal')) tileType = 13;
        else if (zoneKey.includes('hangar') || zoneKey.includes('Hangar')) tileType = 55;
        else if (zoneKey.includes('underwater') || zoneKey.includes('Underwater')) tileType = 0;
        else if (zoneKey.includes('shipwreck') || zoneKey.includes('Shipwreck')) tileType = 56;
        else if (zoneKey.includes('cave') || zoneKey.includes('Cave')) tileType = 57;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 7
function startAct7() {
    GameState.currentAct = 7;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'reethi_rah';
    
    loadAct7Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct7NPCs();
    
    if (typeof ACT7_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT7_RADIO.raajjeFM.segments;
        if (ACT7_RADIO.resortFM) {
            RADIO_CONTENT.resortFM = ACT7_RADIO.resortFM;
        }
    }
    
    showNotification('Act 7', 'Resort Wars');
    
    if (MISSIONS.act7 && MISSIONS.act7.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act7[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 7
function spawnAct7NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Tourists
    for (let i = 0; i < 10; i++) {
        currentNPCs.push({
            type: 'tourist',
            sprite: ['👨🏻', '👩🏼', '👨🏽', '👩🏾', '🧔🏻'][Math.floor(Math.random() * 5)],
            name: 'Tourist',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 5 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.2
        });
    }
    
    // Resort staff
    for (let i = 0; i < 6; i++) {
        currentNPCs.push({
            type: 'staff',
            sprite: '👔',
            name: 'Resort Staff',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 5 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.4
        });
    }
    
    // Security (potential enemies)
    for (let i = 0; i < 4; i++) {
        currentEnemies.push({
            type: 'security',
            sprite: '🕴️',
            name: 'Security Guard',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 5 * TILE_SIZE,
            health: 45,
            maxHealth: 45,
            speed: 1.2,
            direction: Math.random() * Math.PI * 2,
            state: 'patrol',
            attackCooldown: 0,
            hitFlash: 0
        });
    }
    
    // Special NPCs
    const beachZone = map.zones?.beach;
    if (beachZone) {
        currentNPCs.push({
            type: 'rishbe',
            sprite: '📸',
            name: 'Rishbe (Influencer)',
            x: (beachZone.x + beachZone.w / 2) * TILE_SIZE,
            y: (beachZone.y + beachZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT7_DIALOGUES?.rishbe_first_meeting,
            isSpecial: true
        });
    }
    
    const staffZone = map.zones?.staffQuarters;
    if (staffZone) {
        currentNPCs.push({
            type: 'manager',
            sprite: '👔',
            name: 'Mr. Ahmed (Manager)',
            x: (staffZone.x + staffZone.w / 2) * TILE_SIZE,
            y: (staffZone.y + staffZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT7_DIALOGUES?.manager_meeting,
            isSpecial: true
        });
    }
    
    const vipZone = map.zones?.vipVilla;
    if (vipZone) {
        currentNPCs.push({
            type: 'oligarch',
            sprite: '🎰',
            name: 'Viktor Petrov',
            x: (vipZone.x + vipZone.w / 2) * TILE_SIZE,
            y: (vipZone.y + vipZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT7_DIALOGUES?.oligarch_meeting,
            isSpecial: true
        });
    }
    
    const divingZone = map.zones?.divingCenter;
    if (divingZone) {
        currentNPCs.push({
            type: 'diveMaster',
            sprite: '🤿',
            name: 'Deep Hussain',
            x: (divingZone.x + divingZone.w / 2) * TILE_SIZE,
            y: (divingZone.y + divingZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT7_DIALOGUES?.deep_dive_intro,
            isSpecial: true
        });
    }
    
    // Luxury items
    for (let i = 0; i < 8; i++) {
        currentItems.push({
            type: Math.random() < 0.3 ? 'jewelry' : (Math.random() < 0.5 ? 'money' : 'health'),
            x: (8 + Math.random() * (map.width - 16)) * TILE_SIZE,
            y: (8 + Math.random() * (map.height - 16)) * TILE_SIZE,
            value: Math.floor(Math.random() * 200) + 100
        });
    }
}

// Extended tile rendering for Act 7
const originalRenderMapAct7 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 0;
            let color;
            
            switch (tile) {
                case 0: color = '#0088bb'; break; // Crystal clear water
                case 6: color = '#228B22'; break; // Vegetation
                case 9: color = '#F5DEB3'; break; // White sand beach
                case 13: color = '#34495E'; break; // Terminal
                case 44: color = '#D4C4A8'; break; // Resort ground
                case 45: color = '#C9B896'; break; // Resort path
                case 46: color = '#8B7355'; break; // Jetty/dock
                case 47: color = '#E8DCC8'; break; // Reception
                case 48: color = '#87CEEB'; break; // Overwater (water with structure)
                case 49: color = '#DDA0DD'; break; // Spa (lavender)
                case 50: color = '#F4A460'; break; // Restaurant
                case 51: color = '#4682B4'; break; // Diving center
                case 52: color = '#A9A9A9'; break; // Staff quarters
                case 53: color = '#FFD700'; break; // VIP villa (gold)
                case 54: color = '#00CED1'; break; // Pool
                case 55: color = '#696969'; break; // Hangar
                case 56: color = '#2F4F4F'; break; // Shipwreck
                case 57: color = '#1a1a2e'; break; // Cave
                default: color = '#0088bb';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Resort luxury effects
            if (map.isResort) {
                // Slight golden tint for luxury
                if (tile >= 44 && tile <= 53) {
                    ctx.fillStyle = 'rgba(255,215,0,0.05)';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
            
            // Water sparkle effect
            if (tile === 0 || tile === 48 || tile === 54) {
                const sparkle = Math.sin(frameCount * 0.1 + x * 0.5 + y * 0.3);
                if (sparkle > 0.8) {
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.fillRect(x * TILE_SIZE + 4, y * TILE_SIZE + 4, 4, 4);
                }
            }
            
            // VIP villa glow
            if (tile === 53) {
                ctx.fillStyle = `rgba(255,215,0,${0.1 + Math.sin(frameCount * 0.05) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Beach shimmer
            if (tile === 9) {
                ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(frameCount * 0.03 + x) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Update loadAct function for Act 7
const originalLoadActAct7 = loadAct;
loadAct = function(actNum) {
    if (actNum === 7) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct7();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct7(actNum);
    }
};

// Debug commands for Act 7
window.DEBUG.startAct7 = startAct7;
window.DEBUG.startSeaplane = () => startSeaplaneGame();
window.DEBUG.startAdvancedDiving = () => startAdvancedDivingGame();

// Load Act 7 content
setTimeout(() => {
    loadAct7Content();
}, 600);

console.log('Act 7 integration loaded');


// ============================================
// ACT 8 INTEGRATION
// ============================================

function loadAct8Content() {
    if (typeof ACT8_MAPS !== 'undefined') {
        for (let mapKey in ACT8_MAPS) {
            MAPS[mapKey] = ACT8_MAPS[mapKey];
            generateInteriorMapTiles(mapKey);
        }
        
        if (typeof ACT8_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT8_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT8_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT8_MISSIONS !== 'undefined') {
            MISSIONS.act8 = ACT8_MISSIONS;
        }
        
        if (typeof ACT8_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act8 = ACT8_SIDE_MISSIONS;
        }
        
        console.log('Act 8 content loaded successfully');
    }
}

// Generate interior map tiles
function generateInteriorMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 58; // Default interior floor
            
            // Walls
            if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                tile = 59; // Interior wall
            }
            // Room dividers
            else if ((x % 15 === 0 || y % 12 === 0) && Math.random() < 0.7) {
                tile = 59; // Wall
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 58;
        
        if (zoneKey.includes('entrance') || zoneKey.includes('Entrance')) tileType = 60;
        else if (zoneKey.includes('living') || zoneKey.includes('Living') || zoneKey.includes('main') || zoneKey.includes('Main')) tileType = 61;
        else if (zoneKey.includes('kitchen') || zoneKey.includes('Kitchen')) tileType = 62;
        else if (zoneKey.includes('Room') || zoneKey.includes('room')) tileType = 63;
        else if (zoneKey.includes('secret') || zoneKey.includes('Secret') || zoneKey.includes('hidden') || zoneKey.includes('Hidden')) tileType = 64;
        else if (zoneKey.includes('backyard') || zoneKey.includes('Backyard')) tileType = 6;
        else if (zoneKey.includes('office') || zoneKey.includes('Office')) tileType = 65;
        else if (zoneKey.includes('newsroom') || zoneKey.includes('Newsroom')) tileType = 66;
        else if (zoneKey.includes('archive') || zoneKey.includes('Archive')) tileType = 67;
        else if (zoneKey.includes('rooftop') || zoneKey.includes('Rooftop') || zoneKey.includes('roof')) tileType = 68;
        else if (zoneKey.includes('grave') || zoneKey.includes('Grave') || zoneKey.includes('cemetery')) tileType = 69;
        else if (zoneKey.includes('edge') || zoneKey.includes('Edge')) tileType = 70;
        else if (zoneKey.includes('weapon') || zoneKey.includes('Weapon')) tileType = 71;
        else if (zoneKey.includes('dock') || zoneKey.includes('Dock') || zoneKey.includes('loading')) tileType = 72;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 8
function startAct8() {
    GameState.currentAct = 8;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'ronda_home';
    
    loadAct8Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct8NPCs();
    
    if (typeof ACT8_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT8_RADIO.raajjeFM.segments;
        if (ACT8_RADIO.undergroundFM) {
            RADIO_CONTENT.undergroundFM = ACT8_RADIO.undergroundFM;
        }
    }
    
    showNotification('Act 8', 'The Reckoning');
    
    if (MISSIONS.act8 && MISSIONS.act8.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act8[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 8
function spawnAct8NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Family members
    const rippooZone = map.zones?.rippooRoom || map.zones?.livingRoom;
    if (rippooZone) {
        currentNPCs.push({
            type: 'rippoo',
            sprite: '👵🏾',
            name: 'Rippoo (Mother)',
            x: (rippooZone.x + rippooZone.w / 2) * TILE_SIZE,
            y: (rippooZone.y + rippooZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT8_DIALOGUES?.rippoo_final_truth,
            isSpecial: true,
            isFamily: true
        });
    }
    
    const nunnuZone = map.zones?.nunnuRoom;
    if (nunnuZone) {
        currentNPCs.push({
            type: 'nunnu',
            sprite: '👩🏾',
            name: 'Nunnu (Sister)',
            x: (nunnuZone.x + nunnuZone.w / 2) * TILE_SIZE,
            y: (nunnuZone.y + nunnuZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT8_DIALOGUES?.nunnu_danger_warning,
            isSpecial: true,
            isFamily: true
        });
    }
    
    // Items (family artifacts)
    currentItems.push({
        type: 'fatherPhoto',
        x: (map.width / 2) * TILE_SIZE,
        y: (map.height / 2) * TILE_SIZE,
        value: 0,
        isStoryItem: true
    });
    
    // Hidden items in secret areas
    const secretZone = map.zones?.secretBasement;
    if (secretZone) {
        currentItems.push({
            type: 'fatherFiles',
            x: (secretZone.x + secretZone.w / 2) * TILE_SIZE,
            y: (secretZone.y + secretZone.h / 2) * TILE_SIZE,
            value: 0,
            isStoryItem: true,
            isHidden: true
        });
    }
}

// Extended tile rendering for Act 8
const originalRenderMapAct8 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 58;
            let color;
            
            switch (tile) {
                case 0: color = '#0077aa'; break; // Water
                case 6: color = '#228B22'; break; // Vegetation/backyard
                case 58: color = '#8B7355'; break; // Interior floor
                case 59: color = '#4a4a4a'; break; // Interior wall
                case 60: color = '#6a5a4a'; break; // Entrance
                case 61: color = '#9a8a7a'; break; // Living room
                case 62: color = '#aaa090'; break; // Kitchen
                case 63: color = '#7a6a5a'; break; // Bedroom
                case 64: color = '#3a3a3a'; break; // Secret room (dark)
                case 65: color = '#5a5a6a'; break; // Office
                case 66: color = '#6a6a7a'; break; // Newsroom
                case 67: color = '#5a5a5a'; break; // Archive
                case 68: color = '#8a8a8a'; break; // Rooftop
                case 69: color = '#4a5a4a'; break; // Cemetery/grave
                case 70: color = '#aa4a4a'; break; // Danger edge (red tint)
                case 71: color = '#4a4a5a'; break; // Weapon cache
                case 72: color = '#6a6a6a'; break; // Loading dock
                default: color = '#8B7355';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Family home warmth
            if (map.isFamilyHome) {
                ctx.fillStyle = 'rgba(255,200,150,0.05)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Cemetery atmosphere
            if (map.isCemetery) {
                ctx.fillStyle = 'rgba(100,100,120,0.1)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Rooftop wind effect
            if (map.isRooftop) {
                const wind = Math.sin(frameCount * 0.02 + x * 0.1);
                ctx.fillStyle = `rgba(200,200,220,${0.05 + wind * 0.02})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Secret room darkness
            if (tile === 64) {
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Danger zone pulse
            if (tile === 70) {
                ctx.fillStyle = `rgba(255,0,0,${0.1 + Math.sin(frameCount * 0.1) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Grave markers
            if (tile === 69 && Math.random() < 0.02) {
                ctx.fillStyle = '#666';
                ctx.fillRect(x * TILE_SIZE + 4, y * TILE_SIZE + 2, 8, 12);
            }
        }
    }
};

// Update loadAct function for Act 8
const originalLoadActAct8 = loadAct;
loadAct = function(actNum) {
    if (actNum === 8) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct8();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct8(actNum);
    }
};

// Debug commands for Act 8
window.DEBUG.startAct8 = startAct8;

// Load Act 8 content
setTimeout(() => {
    loadAct8Content();
}, 700);

console.log('Act 8 integration loaded');


// ============================================
// ACT 9 INTEGRATION
// ============================================

function loadAct9Content() {
    if (typeof ACT9_MAPS !== 'undefined') {
        for (let mapKey in ACT9_MAPS) {
            MAPS[mapKey] = ACT9_MAPS[mapKey];
            generatePoliticalMapTiles(mapKey);
        }
        
        if (typeof ACT9_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT9_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT9_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT9_MISSIONS !== 'undefined') {
            MISSIONS.act9 = ACT9_MISSIONS;
        }
        
        if (typeof ACT9_SIDE_MISSIONS !== 'undefined') {
            SIDE_MISSIONS.act9 = ACT9_SIDE_MISSIONS;
        }
        
        console.log('Act 9 content loaded successfully');
    }
}

// Generate political/election map tiles
function generatePoliticalMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 73; // Default political floor
            
            // Walls
            if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                tile = 74; // Political wall
            }
            
            // Rally ground is outdoor
            if (map.isRally || map.isOutdoor) {
                tile = 75; // Outdoor ground
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 73;
        
        if (zoneKey.includes('entrance') || zoneKey.includes('Entrance')) tileType = 76;
        else if (zoneKey.includes('stage') || zoneKey.includes('Stage')) tileType = 77;
        else if (zoneKey.includes('crowd') || zoneKey.includes('Crowd') || zoneKey.includes('audience')) tileType = 78;
        else if (zoneKey.includes('vip') || zoneKey.includes('VIP')) tileType = 79;
        else if (zoneKey.includes('media') || zoneKey.includes('Media') || zoneKey.includes('press')) tileType = 80;
        else if (zoneKey.includes('office') || zoneKey.includes('Office')) tileType = 81;
        else if (zoneKey.includes('war') || zoneKey.includes('War') || zoneKey.includes('control')) tileType = 82;
        else if (zoneKey.includes('studio') || zoneKey.includes('Studio')) tileType = 83;
        else if (zoneKey.includes('server') || zoneKey.includes('Server')) tileType = 84;
        else if (zoneKey.includes('voting') || zoneKey.includes('Voting') || zoneKey.includes('booth')) tileType = 85;
        else if (zoneKey.includes('counting') || zoneKey.includes('Counting')) tileType = 86;
        else if (zoneKey.includes('security') || zoneKey.includes('Security')) tileType = 87;
        else if (zoneKey.includes('backstage') || zoneKey.includes('Backstage')) tileType = 88;
        else if (zoneKey.includes('volunteer') || zoneKey.includes('Volunteer')) tileType = 89;
        else if (zoneKey.includes('screen') || zoneKey.includes('Screen')) tileType = 90;
        else if (zoneKey.includes('lounge') || zoneKey.includes('Lounge')) tileType = 91;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 9
function startAct9() {
    GameState.currentAct = 9;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'campaign_hq_mooizbe';
    
    loadAct9Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct9NPCs();
    
    if (typeof ACT9_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT9_RADIO.raajjeFM.segments;
        if (ACT9_RADIO.oppositionFM) {
            RADIO_CONTENT.oppositionFM = ACT9_RADIO.oppositionFM;
        }
    }
    
    showNotification('Act 9', 'Election Chaos');
    
    if (MISSIONS.act9 && MISSIONS.act9.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act9[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 9
function spawnAct9NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Political staff
    for (let i = 0; i < 8; i++) {
        currentNPCs.push({
            type: 'campaignStaff',
            sprite: ['👔', '👩🏾‍💼', '🧑🏾‍💼'][Math.floor(Math.random() * 3)],
            name: 'Campaign Staff',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 5 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.3
        });
    }
    
    // Security
    for (let i = 0; i < 4; i++) {
        currentNPCs.push({
            type: 'security',
            sprite: '🕴️',
            name: 'Security',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 5 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.4
        });
    }
    
    // Key characters
    const mooizbeZone = map.zones?.mooizbeOffice;
    if (mooizbeZone) {
        currentNPCs.push({
            type: 'mooizbe',
            sprite: '🎩',
            name: 'President Mooizbe',
            x: (mooizbeZone.x + mooizbeZone.w / 2) * TILE_SIZE,
            y: (mooizbeZone.y + mooizbeZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT9_DIALOGUES?.mooizbe_campaign_meeting,
            isSpecial: true,
            isPolitician: true
        });
    }
    
    const warRoomZone = map.zones?.warRoom;
    if (warRoomZone) {
        currentNPCs.push({
            type: 'fathimath',
            sprite: '👩🏾‍💼',
            name: 'Fathimath (Campaign Manager)',
            x: (warRoomZone.x + warRoomZone.w / 2) * TILE_SIZE,
            y: (warRoomZone.y + warRoomZone.h / 2) * TILE_SIZE,
            direction: 0,
            speed: 0,
            dialogue: ACT9_DIALOGUES?.dirty_tricks_choice,
            isSpecial: true
        });
    }
    
    // Campaign items
    currentItems.push({
        type: 'campaignPoster',
        x: (map.width / 3) * TILE_SIZE,
        y: (map.height / 3) * TILE_SIZE,
        value: 100
    });
    
    currentItems.push({
        type: 'bribeMoney',
        x: (map.width * 2 / 3) * TILE_SIZE,
        y: (map.height / 3) * TILE_SIZE,
        value: 5000,
        isHidden: true
    });
}

// Debate mini-game
function startDebateGame() {
    if (typeof ACT9_DEBATE_MINIGAME === 'undefined') return;
    
    GameState.isPaused = true;
    
    const debateUI = document.createElement('div');
    debateUI.id = 'debate-game';
    debateUI.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 3px solid #ffd700;
        border-radius: 15px;
        padding: 30px;
        z-index: 2000;
        min-width: 350px;
        max-width: 90vw;
        color: white;
        font-family: Arial, sans-serif;
    `;
    
    let currentRound = 0;
    let totalScore = 0;
    const debate = ACT9_DEBATE_MINIGAME;
    
    function showRound() {
        if (currentRound >= debate.topics.length) {
            endDebate();
            return;
        }
        
        const topic = debate.topics[currentRound];
        debateUI.innerHTML = `
            <h2 style="color: #ffd700; text-align: center; margin-bottom: 10px;">🎤 Presidential Debate</h2>
            <div style="text-align: center; margin-bottom: 15px;">
                Round ${currentRound + 1}/${debate.topics.length} | Score: ${totalScore}
            </div>
            <h3 style="color: #4ecdc4; margin-bottom: 10px;">Topic: ${topic.topic}</h3>
            <p style="margin-bottom: 20px; font-style: italic;">"${topic.question}"</p>
            <div id="debate-options"></div>
        `;
        
        const optionsDiv = debateUI.querySelector('#debate-options');
        topic.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.textContent = option.text;
            btn.style.cssText = `
                display: block;
                width: 100%;
                padding: 12px;
                margin: 8px 0;
                background: #2d3436;
                color: white;
                border: 2px solid #636e72;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s;
            `;
            btn.onmouseover = () => btn.style.borderColor = '#ffd700';
            btn.onmouseout = () => btn.style.borderColor = '#636e72';
            btn.onclick = () => {
                totalScore += option.score;
                
                // Show feedback
                btn.style.background = option.score >= 2 ? '#27ae60' : (option.score >= 1 ? '#f39c12' : '#e74c3c');
                btn.style.borderColor = btn.style.background;
                
                // Karma effect
                if (option.type === 'reform') {
                    GameState.player.karma = Math.min(100, GameState.player.karma + 5);
                } else if (option.type === 'corrupt') {
                    GameState.player.karma = Math.max(-100, GameState.player.karma - 5);
                }
                
                setTimeout(() => {
                    currentRound++;
                    showRound();
                }, 1000);
            };
            optionsDiv.appendChild(btn);
        });
    }
    
    function endDebate() {
        const maxScore = debate.topics.length * 3;
        const percentage = Math.round((totalScore / maxScore) * 100);
        let result, reward;
        
        if (percentage >= 80) {
            result = "VICTORY! You dominated the debate!";
            reward = 10000;
        } else if (percentage >= 60) {
            result = "Good performance. Voters are impressed.";
            reward = 5000;
        } else if (percentage >= 40) {
            result = "Mixed results. The race remains close.";
            reward = 2000;
        } else {
            result = "Poor showing. Your opponents gained ground.";
            reward = 500;
        }
        
        debateUI.innerHTML = `
            <h2 style="color: #ffd700; text-align: center;">🎤 Debate Results</h2>
            <div style="text-align: center; font-size: 48px; margin: 20px 0;">${percentage}%</div>
            <p style="text-align: center; margin-bottom: 20px;">${result}</p>
            <p style="text-align: center; color: #4ecdc4;">+${reward} faisaa</p>
            <button id="debate-close" style="
                display: block;
                width: 100%;
                padding: 15px;
                margin-top: 20px;
                background: #ffd700;
                color: black;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            ">Continue</button>
        `;
        
        GameState.player.money += reward;
        
        debateUI.querySelector('#debate-close').onclick = () => {
            debateUI.remove();
            GameState.isPaused = false;
            showNotification('Debate Complete', `Score: ${percentage}%`);
        };
    }
    
    document.body.appendChild(debateUI);
    showRound();
}

// Extended tile rendering for Act 9
const originalRenderMapAct9 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 73;
            let color;
            
            switch (tile) {
                case 73: color = '#3a3a4a'; break; // Political floor
                case 74: color = '#2a2a3a'; break; // Political wall
                case 75: color = '#4a5a4a'; break; // Outdoor ground
                case 76: color = '#5a5a6a'; break; // Entrance
                case 77: color = '#8a6a4a'; break; // Stage (wood)
                case 78: color = '#4a4a5a'; break; // Crowd area
                case 79: color = '#6a5a7a'; break; // VIP section
                case 80: color = '#5a6a7a'; break; // Media area
                case 81: color = '#4a4a5a'; break; // Office
                case 82: color = '#3a4a5a'; break; // War room
                case 83: color = '#5a5a6a'; break; // Studio
                case 84: color = '#2a3a4a'; break; // Server room
                case 85: color = '#5a6a5a'; break; // Voting booths
                case 86: color = '#4a5a5a'; break; // Counting room
                case 87: color = '#4a4a4a'; break; // Security
                case 88: color = '#3a3a3a'; break; // Backstage
                case 89: color = '#5a5a5a'; break; // Volunteer area
                case 90: color = '#2a2a4a'; break; // Screen area
                case 91: color = '#5a4a5a'; break; // Lounge
                default: color = '#3a3a4a';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Political atmosphere
            if (map.isPolitical) {
                // Slight blue tint for political buildings
                ctx.fillStyle = 'rgba(50,50,100,0.05)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Rally energy
            if (map.isRally) {
                const energy = Math.sin(frameCount * 0.05 + x * 0.2 + y * 0.2);
                if (energy > 0.7) {
                    ctx.fillStyle = 'rgba(255,215,0,0.1)';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
            
            // Stage spotlight
            if (tile === 77) {
                ctx.fillStyle = `rgba(255,255,200,${0.1 + Math.sin(frameCount * 0.03) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Voting booth privacy
            if (tile === 85) {
                ctx.fillStyle = 'rgba(0,100,0,0.1)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // VIP glow
            if (tile === 79) {
                ctx.fillStyle = `rgba(150,100,200,${0.1 + Math.sin(frameCount * 0.04) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Update loadAct function for Act 9
const originalLoadActAct9 = loadAct;
loadAct = function(actNum) {
    if (actNum === 9) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct9();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct9(actNum);
    }
};

// Debug commands for Act 9
window.DEBUG.startAct9 = startAct9;
window.DEBUG.startDebate = startDebateGame;

// Load Act 9 content
setTimeout(() => {
    loadAct9Content();
}, 800);

console.log('Act 9 integration loaded');


// ============================================
// ACT 10 & EPILOGUE INTEGRATION
// ============================================

function loadAct10Content() {
    if (typeof ACT10_MAPS !== 'undefined') {
        for (let mapKey in ACT10_MAPS) {
            MAPS[mapKey] = ACT10_MAPS[mapKey];
            generateFinalMapTiles(mapKey);
        }
        
        if (typeof ACT10_DIALOGUES !== 'undefined') {
            for (let dialogueKey in ACT10_DIALOGUES) {
                DIALOGUES[dialogueKey] = ACT10_DIALOGUES[dialogueKey];
            }
        }
        
        if (typeof ACT10_MISSIONS !== 'undefined') {
            MISSIONS.act10 = ACT10_MISSIONS;
        }
        
        if (typeof EPILOGUE_MISSIONS !== 'undefined') {
            MISSIONS.epilogue = EPILOGUE_MISSIONS;
        }
        
        console.log('Act 10 & Epilogue content loaded successfully');
    }
}

// Generate final act map tiles
function generateFinalMapTiles(mapKey) {
    const map = MAPS[mapKey];
    if (!map || map.tiles.length > 0) return;
    
    map.tiles = [];
    
    for (let y = 0; y < map.height; y++) {
        map.tiles[y] = [];
        for (let x = 0; x < map.width; x++) {
            let tile = 92; // Default final floor
            
            // Walls for interiors
            if (map.isInterior || map.isPalace || map.isMilitary) {
                if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
                    tile = 93; // Wall
                }
            }
            
            // Outdoor areas
            if (map.isOutdoor || map.isFinalBattle) {
                tile = 94; // Outdoor ground
            }
            
            // Epilogue peaceful
            if (map.isPeaceful) {
                tile = 95; // Beach sand
            }
            
            // Prison
            if (map.isPrison) {
                tile = 96; // Prison floor
            }
            
            map.tiles[y][x] = tile;
        }
    }
    
    // Add zones with special tiles
    for (let zoneKey in map.zones) {
        const zone = map.zones[zoneKey];
        let tileType = 92;
        
        if (zoneKey.includes('gate') || zoneKey.includes('Gate') || zoneKey.includes('entrance')) tileType = 97;
        else if (zoneKey.includes('courtyard') || zoneKey.includes('Courtyard')) tileType = 98;
        else if (zoneKey.includes('throne') || zoneKey.includes('Throne')) tileType = 99;
        else if (zoneKey.includes('security') || zoneKey.includes('Security')) tileType = 100;
        else if (zoneKey.includes('escape') || zoneKey.includes('Escape') || zoneKey.includes('passage')) tileType = 101;
        else if (zoneKey.includes('parade') || zoneKey.includes('Parade')) tileType = 102;
        else if (zoneKey.includes('command') || zoneKey.includes('Command')) tileType = 103;
        else if (zoneKey.includes('armory') || zoneKey.includes('Armory') || zoneKey.includes('weapon')) tileType = 104;
        else if (zoneKey.includes('detention') || zoneKey.includes('Detention') || zoneKey.includes('cell')) tileType = 105;
        else if (zoneKey.includes('monument') || zoneKey.includes('Monument')) tileType = 106;
        else if (zoneKey.includes('protest') || zoneKey.includes('Protest')) tileType = 107;
        else if (zoneKey.includes('barricade') || zoneKey.includes('Barricade') || zoneKey.includes('police')) tileType = 108;
        else if (zoneKey.includes('sniper') || zoneKey.includes('Sniper')) tileType = 109;
        else if (zoneKey.includes('runway') || zoneKey.includes('Runway')) tileType = 110;
        else if (zoneKey.includes('hangar') || zoneKey.includes('Hangar')) tileType = 111;
        else if (zoneKey.includes('shore') || zoneKey.includes('Shore')) tileType = 112;
        else if (zoneKey.includes('palm') || zoneKey.includes('Palm')) tileType = 113;
        else if (zoneKey.includes('sunset') || zoneKey.includes('Sunset')) tileType = 114;
        else if (zoneKey.includes('grave') || zoneKey.includes('Grave')) tileType = 115;
        else if (zoneKey.includes('mourner') || zoneKey.includes('Mourner')) tileType = 116;
        else if (zoneKey.includes('yard') || zoneKey.includes('Yard')) tileType = 117;
        else if (zoneKey.includes('balcony') || zoneKey.includes('Balcony')) tileType = 118;
        
        for (let y = zone.y; y < zone.y + zone.h && y < map.height; y++) {
            for (let x = zone.x; x < zone.x + zone.w && x < map.width; x++) {
                if (y >= 0 && x >= 0 && y < map.height && x < map.width) {
                    map.tiles[y][x] = tileType;
                }
            }
        }
    }
}

// Start Act 10
function startAct10() {
    GameState.currentAct = 10;
    GameState.currentMission = 0;
    GameState.world.currentMap = 'safe_house_final';
    
    loadAct10Content();
    
    const map = MAPS[GameState.world.currentMap];
    GameState.player.x = map.spawnX * TILE_SIZE;
    GameState.player.y = map.spawnY * TILE_SIZE;
    
    spawnAct10NPCs();
    
    if (typeof ACT10_RADIO !== 'undefined') {
        RADIO_CONTENT.raajjeFM.segments = ACT10_RADIO.raajjeFM.segments;
        if (ACT10_RADIO.freedomFM) {
            RADIO_CONTENT.freedomFM = ACT10_RADIO.freedomFM;
        }
    }
    
    showNotification('Act 10', 'Coup d\'État');
    
    if (MISSIONS.act10 && MISSIONS.act10.length > 0) {
        setTimeout(() => {
            startMission(MISSIONS.act10[0]);
        }, 2000);
    }
    
    saveGame();
}

// Spawn NPCs for Act 10
function spawnAct10NPCs() {
    currentNPCs = [];
    currentItems = [];
    currentEnemies = [];
    
    const map = MAPS[GameState.world.currentMap];
    
    // Muaz (always present)
    currentNPCs.push({
        type: 'muaz',
        sprite: '👤',
        name: 'Muaz (Brother)',
        x: (map.width / 2 + 2) * TILE_SIZE,
        y: (map.height / 2) * TILE_SIZE,
        direction: 0,
        speed: 0,
        dialogue: ACT10_DIALOGUES?.storm_gathers,
        isSpecial: true,
        isFamily: true
    });
    
    // Armed allies
    for (let i = 0; i < 5; i++) {
        currentNPCs.push({
            type: 'ally',
            sprite: '🔫',
            name: 'Armed Ally',
            x: Math.random() * (map.width - 10) * TILE_SIZE + 5 * TILE_SIZE,
            y: Math.random() * (map.height - 10) * TILE_SIZE + 5 * TILE_SIZE,
            direction: Math.random() * Math.PI * 2,
            speed: 0.2
        });
    }
    
    // Weapons cache
    const weaponZone = map.zones?.weaponRoom || map.zones?.armory;
    if (weaponZone) {
        currentItems.push({
            type: 'weapon',
            x: (weaponZone.x + weaponZone.w / 2) * TILE_SIZE,
            y: (weaponZone.y + weaponZone.h / 2) * TILE_SIZE,
            value: 0,
            isStoryItem: true
        });
    }
}

// Show ending screen
function showEnding(endingId) {
    const ending = ENDINGS[endingId];
    if (!ending) return;
    
    GameState.isPaused = true;
    GameState.ending = endingId;
    
    const endingUI = document.createElement('div');
    endingUI.id = 'ending-screen';
    endingUI.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, ${ending.color}33 100%);
        z-index: 3000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Arial, sans-serif;
        animation: fadeIn 2s ease-in;
    `;
    
    endingUI.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        </style>
        <div style="font-size: 80px; animation: pulse 2s infinite;">${ending.icon}</div>
        <h1 style="font-size: 48px; color: ${ending.color}; margin: 20px 0; text-shadow: 2px 2px 10px black;">
            ${ending.title}
        </h1>
        <h2 style="font-size: 24px; color: #aaa; margin-bottom: 30px; font-style: italic;">
            "${ending.subtitle}"
        </h2>
        <p style="max-width: 600px; text-align: center; font-size: 18px; line-height: 1.6; margin-bottom: 40px;">
            ${ending.summary}
        </p>
        <div style="display: flex; gap: 20px; margin-top: 20px;">
            <button id="ending-epilogue" style="
                padding: 15px 30px;
                background: ${ending.color};
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
            ">View Epilogue</button>
            <button id="ending-credits" style="
                padding: 15px 30px;
                background: #333;
                color: white;
                border: 2px solid ${ending.color};
                border-radius: 8px;
                cursor: pointer;
                font-size: 18px;
            ">Credits</button>
        </div>
        <div style="margin-top: 40px; color: #666;">
            <p>Final Karma: ${GameState.player.karma}</p>
            <p>Family Bond: ${GameState.player.familyMeter}%</p>
            <p>Total Faisaa: ${GameState.player.money.toLocaleString()}</p>
        </div>
    `;
    
    document.body.appendChild(endingUI);
    
    // Epilogue button
    endingUI.querySelector('#ending-epilogue').onclick = () => {
        endingUI.remove();
        showEpilogue(endingId);
    };
    
    // Credits button
    endingUI.querySelector('#ending-credits').onclick = () => {
        endingUI.remove();
        showCredits();
    };
    
    // Save completed ending
    GameState.completedEndings = GameState.completedEndings || [];
    if (!GameState.completedEndings.includes(endingId)) {
        GameState.completedEndings.push(endingId);
    }
    saveGame();
}

// Show epilogue scene
function showEpilogue(endingId) {
    const epilogue = EPILOGUE_MISSIONS[endingId];
    const dialogue = ACT10_DIALOGUES[`${endingId}_epilogue`];
    
    if (!epilogue || !dialogue) {
        showCredits();
        return;
    }
    
    // Load epilogue map
    GameState.world.currentMap = epilogue.scene;
    const map = MAPS[epilogue.scene];
    if (map) {
        generateFinalMapTiles(epilogue.scene);
        GameState.player.x = map.spawnX * TILE_SIZE;
        GameState.player.y = map.spawnY * TILE_SIZE;
    }
    
    GameState.isPaused = false;
    
    // Start epilogue dialogue
    setTimeout(() => {
        startDialogue(dialogue);
    }, 1000);
    
    // After dialogue, show credits
    setTimeout(() => {
        showCredits();
    }, dialogue.lines.length * 4000 + 5000);
}

// Show credits
function showCredits() {
    const creditsUI = document.createElement('div');
    creditsUI.id = 'credits-screen';
    creditsUI.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        z-index: 3000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 50px;
        color: white;
        font-family: Arial, sans-serif;
        overflow-y: auto;
    `;
    
    creditsUI.innerHTML = `
        <h1 style="font-size: 36px; color: #ffd700; margin-bottom: 40px;">
            🏝️ RAAJJE THEFT AUTO 1 🏝️
        </h1>
        <h2 style="color: #4ecdc4; margin-bottom: 30px;">The Baokalo Chronicles</h2>
        
        <div style="max-width: 500px; text-align: center;">
            <h3 style="color: #ffd700; margin: 20px 0;">Story & Design</h3>
            <p>Based on the Game Bible</p>
            
            <h3 style="color: #ffd700; margin: 20px 0;">Development</h3>
            <p>Pure HTML/CSS/JavaScript</p>
            <p>No External Libraries</p>
            
            <h3 style="color: #ffd700; margin: 20px 0;">Special Thanks</h3>
            <p>The People of Maldives</p>
            <p>For their resilience and hope</p>
            
            <h3 style="color: #ffd700; margin: 20px 0;">Historical Note</h3>
            <p style="font-size: 14px; color: #888; line-height: 1.6;">
                This game is a work of fiction inspired by real events in Maldivian history.
                The 1988 coup attempt, 2012 political crisis, and ongoing challenges with
                gang violence and political corruption are real issues that deserve attention
                and peaceful resolution.
            </p>
            
            <h3 style="color: #ffd700; margin: 20px 0;">Dhivehi Phrases Used</h3>
            <p style="font-size: 14px; color: #888;">
                Aharen (I/Me) • Kaley (You) • Mashakah (We/Us)<br>
                Faisaa (Money) • Raajje (Maldives) • Thibeyfulhaa (Sir/Madam)
            </p>
            
            <div style="margin-top: 50px;">
                <p style="color: #ffd700; font-size: 24px;">🙏 Shukuriyaa 🙏</p>
                <p style="color: #888;">Thank You for Playing</p>
            </div>
        </div>
        
        <button id="credits-close" style="
            margin-top: 40px;
            margin-bottom: 50px;
            padding: 15px 40px;
            background: #ffd700;
            color: black;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        ">Return to Main Menu</button>
    `;
    
    document.body.appendChild(creditsUI);
    
    creditsUI.querySelector('#credits-close').onclick = () => {
        creditsUI.remove();
        GameState.isPaused = false;
        GameState.isPlaying = false;
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('touch-controls').classList.add('hidden');
    };
}

// Extended tile rendering for Act 10
const originalRenderMapAct10 = renderMap;
renderMap = function() {
    const map = MAPS[GameState.world.currentMap];
    
    const startX = Math.floor(Camera.x / TILE_SIZE);
    const startY = Math.floor(Camera.y / TILE_SIZE);
    const endX = Math.ceil((Camera.x + CANVAS_WIDTH) / TILE_SIZE);
    const endY = Math.ceil((Camera.y + CANVAS_HEIGHT) / TILE_SIZE);
    
    for (let y = startY; y <= endY && y < map.height; y++) {
        for (let x = startX; x <= endX && x < map.width; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = map.tiles[y]?.[x] ?? 92;
            let color;
            
            switch (tile) {
                case 92: color = '#4a4a5a'; break; // Final floor
                case 93: color = '#2a2a3a'; break; // Wall
                case 94: color = '#5a5a5a'; break; // Outdoor
                case 95: color = '#F5DEB3'; break; // Beach sand
                case 96: color = '#3a3a3a'; break; // Prison floor
                case 97: color = '#5a5a6a'; break; // Gate
                case 98: color = '#6a6a7a'; break; // Courtyard
                case 99: color = '#8a7a5a'; break; // Throne room (gold tint)
                case 100: color = '#4a4a5a'; break; // Security
                case 101: color = '#2a2a2a'; break; // Escape passage
                case 102: color = '#5a6a5a'; break; // Parade ground
                case 103: color = '#3a4a5a'; break; // Command center
                case 104: color = '#4a3a3a'; break; // Armory
                case 105: color = '#2a2a2a'; break; // Detention
                case 106: color = '#7a7a8a'; break; // Monument
                case 107: color = '#5a5a6a'; break; // Protest area
                case 108: color = '#4a4a4a'; break; // Barricade
                case 109: color = '#3a3a4a'; break; // Sniper position
                case 110: color = '#5a5a5a'; break; // Runway
                case 111: color = '#4a4a4a'; break; // Hangar
                case 112: color = '#87CEEB'; break; // Shore (water edge)
                case 113: color = '#228B22'; break; // Palm grove
                case 114: color = '#FFB347'; break; // Sunset point
                case 115: color = '#4a5a4a'; break; // Grave
                case 116: color = '#5a5a5a'; break; // Mourners area
                case 117: color = '#5a5a5a'; break; // Prison yard
                case 118: color = '#6a6a7a'; break; // Balcony
                default: color = '#4a4a5a';
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            // Palace grandeur
            if (map.isPalace) {
                ctx.fillStyle = 'rgba(255,215,0,0.03)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Military atmosphere
            if (map.isMilitary) {
                ctx.fillStyle = 'rgba(50,100,50,0.05)';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Final battle chaos
            if (map.isFinalBattle) {
                const chaos = Math.sin(frameCount * 0.1 + x * 0.3 + y * 0.3);
                if (chaos > 0.8) {
                    ctx.fillStyle = 'rgba(255,100,0,0.1)';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
            
            // Epilogue peace
            if (map.isPeaceful) {
                const shimmer = Math.sin(frameCount * 0.02 + x * 0.1);
                ctx.fillStyle = `rgba(255,200,100,${0.05 + shimmer * 0.03})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Throne room glow
            if (tile === 99) {
                ctx.fillStyle = `rgba(255,215,0,${0.1 + Math.sin(frameCount * 0.03) * 0.05})`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            
            // Sunset effect
            if (tile === 114) {
                const sunset = Math.sin(frameCount * 0.01);
                ctx.fillStyle = `rgba(255,${150 + sunset * 50},${100 + sunset * 50},0.2)`;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
};

// Update loadAct function for Act 10
const originalLoadActAct10 = loadAct;
loadAct = function(actNum) {
    if (actNum === 10) {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        document.getElementById('touch-controls').classList.remove('hidden');
        document.getElementById('mission-tracker').classList.remove('hidden');
        document.getElementById('radio-display').classList.remove('hidden');
        
        GameState.isPlaying = true;
        GameState.isPaused = false;
        
        startAct10();
        requestAnimationFrame(gameLoop);
    } else {
        originalLoadActAct10(actNum);
    }
};

// Debug commands for Act 10
window.DEBUG.startAct10 = startAct10;
window.DEBUG.showEnding = showEnding;
window.DEBUG.showCredits = showCredits;
window.DEBUG.tyrantEnding = () => showEnding('tyrant');
window.DEBUG.puppetEnding = () => showEnding('puppet');
window.DEBUG.redemptionEnding = () => showEnding('redemption');
window.DEBUG.martyrEnding = () => showEnding('martyr');

// Load Act 10 content
setTimeout(() => {
    loadAct10Content();
}, 900);

console.log('Act 10 & Epilogue integration loaded');
