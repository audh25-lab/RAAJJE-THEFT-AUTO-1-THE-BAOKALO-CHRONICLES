// ============================================
// ACT 3: SYNTHETIC SURGE
// Timeline: 2017 - Drug empire expansion
// ============================================

// ==================== ACT 3 MAPS ====================
const ACT3_MAPS = {
    hulhumale_phase1: {
        name: "Hulhumalé Phase 1",
        width: 70,
        height: 55,
        spawnX: 35,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            centralPark: { x: 30, y: 20, w: 15, h: 12, name: "Central Park 🌳" },
            beachFront: { x: 0, y: 45, w: 70, h: 10, name: "Beach Front 🏖️" },
            constructionZone: { x: 50, y: 10, w: 15, h: 20, name: "Construction Zone 🏗️" },
            apartmentBlocks: { x: 10, y: 15, w: 18, h: 15, name: "Apartment Blocks 🏢" },
            drugLab: { x: 55, y: 35, w: 10, h: 8, name: "Hidden Lab 🧪" },
            ferry: { x: 0, y: 25, w: 8, h: 10, name: "Ferry Terminal 🚢" }
        },
        gangTerritory: null,
        isNewCity: true,
        gridLayout: true
    },
    
    hulhumale_phase2: {
        name: "Hulhumalé Phase 2",
        width: 80,
        height: 60,
        spawnX: 40,
        spawnY: 50,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            luxuryApartments: { x: 20, y: 15, w: 20, h: 15, name: "Luxury Towers 🏙️" },
            industrialZone: { x: 55, y: 20, w: 20, h: 20, name: "Industrial Zone 🏭" },
            megaLab: { x: 60, y: 25, w: 12, h: 10, name: "Mega Lab 🧪" },
            yacht: { x: 5, y: 40, w: 10, h: 15, name: "Yacht Club ⛵" },
            airportLink: { x: 70, y: 45, w: 10, h: 10, name: "Airport Link 🛫" }
        },
        gangTerritory: "Synthetic Syndicate",
        isNewCity: true,
        gridLayout: true
    },
    
    velana_airport: {
        name: "Velana International Airport",
        width: 60,
        height: 50,
        spawnX: 30,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            terminal: { x: 20, y: 15, w: 25, h: 15, name: "Terminal 🛫" },
            runway: { x: 5, y: 35, w: 50, h: 8, name: "Runway ✈️" },
            cargoArea: { x: 45, y: 10, w: 12, h: 12, name: "Cargo Area 📦" },
            seaplaneTerminal: { x: 5, y: 10, w: 12, h: 12, name: "Seaplane Terminal 🛩️" },
            dhodhoOffice: { x: 48, y: 15, w: 6, h: 6, name: "DhoDho's Office 👨🏾‍✈️" }
        },
        gangTerritory: null,
        smugglingHub: true
    }
};

// ==================== ACT 3 CHARACTERS ====================
const ACT3_CHARACTERS = {
    dhodho: {
        name: "DhoDho (Uncle)",
        sprite: "👨🏾‍✈️",
        role: "Airport Customs Officer / Smuggling Contact",
        backstory: "Rippoo's brother. Corrupt customs officer who looks the other way for family. Key to drug import operations.",
        dialogues: {
            first_meeting: {
                speaker: "DhoDho",
                sprite: "👨🏾‍✈️",
                lines: [
                    { text: "Kipal! Mashakah nephew! Come, come!", dhivehi: true },
                    { text: "*looks around nervously* Rippoo told me about kaley.", dhivehi: true },
                    { text: "Aharen work customs 15 years. Know every trick.", dhivehi: true },
                    { text: "Kaley need something... imported? Aharen can help.", dhivehi: true },
                    { text: "But family discount only. 20% cut.", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen need chemicals. For... business.", karma: -15, response: "dhodho_chemicals" },
                    { text: "Just visiting uncle. No business today.", karma: 5, response: "dhodho_innocent" },
                    { text: "What else can kaley smuggle?", karma: -10, response: "dhodho_options" }
                ]
            }
        }
    },
    
    syntheticBoss: {
        name: "Dr. Waheed (The Chemist)",
        sprite: "🧑🏾‍🔬",
        role: "Synthetic Drug Manufacturer",
        backstory: "Former pharmaceutical researcher. Now cooks meth and synthetic drugs in Hulhumalé. Genius but unstable.",
        dialogues: {
            lab_intro: {
                speaker: "Dr. Waheed",
                sprite: "🧑🏾‍🔬",
                lines: [
                    { text: "*adjusts goggles* Ah, the famous Baokalo.", dhivehi: false },
                    { text: "Kaley want to make real faisaa? Not street corner beys.", dhivehi: true },
                    { text: "Synthetic. Pure. 10x profit margin.", dhivehi: false },
                    { text: "Aharen need distribution. Kaley need product.", dhivehi: true },
                    { text: "Partnership? 50-50 split.", dhivehi: false }
                ],
                choices: [
                    { text: "Aharen in. Show me the lab.", karma: -25, familyKarma: -20, response: "waheed_accept" },
                    { text: "Synthetic kills people. Aharen won't touch it.", karma: 20, familyKarma: 15, response: "waheed_refuse" },
                    { text: "60-40. Aharen take the risk.", karma: -20, response: "waheed_negotiate" }
                ]
            }
        }
    },
    
    cryptoBro: {
        name: "Crypto Maldives",
        sprite: "💰",
        role: "Money Launderer / Crypto Trader",
        backstory: "Tech entrepreneur who launders drug money through cryptocurrency. Runs 'legitimate' trading platform.",
        dialogues: {
            crypto_intro: {
                speaker: "Crypto Maldives",
                sprite: "💰",
                lines: [
                    { text: "Bro! Kaley heard of Bitcoin? Ethereum?", dhivehi: true },
                    { text: "Forget cash. Digital faisaa is future!", dhivehi: true },
                    { text: "Mashakah can clean kaley money. Untraceable.", dhivehi: true },
                    { text: "Small fee - 15%. But kaley money becomes... legitimate.", dhivehi: false },
                    { text: "Politicians use mashakah service. Very safe.", dhivehi: true }
                ],
                choices: [
                    { text: "Show me how it works.", karma: -10, response: "crypto_tutorial" },
                    { text: "Sounds like a scam.", karma: 5, response: "crypto_skeptic" },
                    { text: "Can aharen invest dirty faisaa?", karma: -15, response: "crypto_invest" }
                ]
            }
        }
    },
    
    mooizbe: {
        name: "President Mooizbe",
        sprite: "🤴🏾",
        role: "President of Maldives (2023-)",
        backstory: "Muizzu-inspired character. Pro-China, anti-India. Uses gangs for political control while publicly denying their existence.",
        dialogues: {
            political_meeting: {
                speaker: "President Mooizbe",
                sprite: "🤴🏾",
                lines: [
                    { text: "*in presidential office* So... kaley the one causing trouble.", dhivehi: true },
                    { text: "Gangs don't exist in Raajje. Officially.", dhivehi: false },
                    { text: "But unofficially... mashakah need people like kaley.", dhivehi: true },
                    { text: "Opposition getting loud. Elections coming.", dhivehi: false },
                    { text: "Help mashakah... and aharen make kaley problems disappear.", dhivehi: true }
                ],
                choices: [
                    { text: "What do kaley need, Mr. President?", karma: -20, response: "mooizbe_accept" },
                    { text: "Aharen don't work for politicians.", karma: 15, response: "mooizbe_refuse" },
                    { text: "How much protection can kaley offer?", karma: -10, response: "mooizbe_negotiate" }
                ]
            }
        }
    },
    
    hulhumaleGangLeader: {
        name: "Phase 2 Boss",
        sprite: "🏗️",
        role: "Hulhumalé Construction Mafia",
        backstory: "Controls construction contracts and worker exploitation. Uses migrant workers as drug mules.",
        dialogues: {
            territory_dispute: {
                speaker: "Phase 2 Boss",
                sprite: "🏗️",
                lines: [
                    { text: "Kaley think can just walk into Hulhumalé?", dhivehi: true },
                    { text: "This is mashakah territory. Every building, every worker.", dhivehi: true },
                    { text: "Malé gangs stay in Malé. Understood?", dhivehi: false },
                    { text: "*cracks knuckles* Or mashakah bury kaley in concrete.", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen not here to fight. Let's talk business.", karma: 0, response: "phase2_negotiate" },
                    { text: "Malé gangs go wherever we want.", karma: -10, response: "phase2_challenge" },
                    { text: "[Attack]", karma: -20, combat: true, response: "phase2_attack" }
                ]
            }
        }
    }
};

// ==================== ACT 3 MISSIONS ====================
const ACT3_MISSIONS = [
    {
        id: "act3_m1",
        title: "New Horizons",
        type: "exploration",
        description: "Take the ferry to Hulhumalé",
        objectives: [
            { type: "travel", target: "hulhumale_phase1", current: false },
            { type: "discover", target: "centralPark", current: false },
            { type: "discover", target: "beachFront", current: false }
        ],
        rewards: { money: 300 },
        unlocks: ["act3_m2"]
    },
    {
        id: "act3_m2",
        title: "Uncle's Connections",
        type: "story",
        description: "Meet Uncle DhoDho at the airport",
        objectives: [
            { type: "travel", target: "velana_airport", current: false },
            { type: "trigger", target: "dhodhoMeeting", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "dhodho_first_meeting",
        unlocks: ["act3_m3", "act3_m4"],
        setFlag: "metDhodho"
    },
    {
        id: "act3_m3",
        title: "Chemical Import",
        type: "smuggling",
        description: "Help DhoDho smuggle chemicals through customs",
        objectives: [
            { type: "stealth", target: "cargoArea", current: false },
            { type: "collect", target: "chemicalBarrel", count: 3, current: 0 },
            { type: "deliver", target: "drugLab", current: false }
        ],
        rewards: { money: 2000, karma: -20 },
        unlocks: ["act3_m5"],
        requiresChoice: "dhodho_chemicals"
    },
    {
        id: "act3_m4",
        title: "Legitimate Business",
        type: "delivery",
        description: "Help DhoDho with legal cargo (cover story)",
        objectives: [
            { type: "collect", target: "legalCargo", count: 5, current: 0 },
            { type: "deliver", target: "apartmentBlocks", current: false }
        ],
        rewards: { money: 500, karma: 5 },
        unlocks: ["act3_m5"],
        requiresChoice: "dhodho_innocent"
    },
    {
        id: "act3_m5",
        title: "The Chemist",
        type: "story",
        description: "Meet Dr. Waheed at the hidden lab",
        objectives: [
            { type: "travel", target: "drugLab", current: false },
            { type: "trigger", target: "waheedMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "waheed_lab_intro",
        unlocks: ["act3_m6", "act3_m7"],
        moralChoice: true,
        majorChoice: "synthetic"
    },
    {
        id: "act3_m6",
        title: "Cook's Apprentice",
        type: "minigame",
        description: "Learn to cook synthetic drugs",
        objectives: [
            { type: "minigame", target: "drugCooking", current: false }
        ],
        rewards: { money: 3000, karma: -30 },
        unlocks: ["act3_m8"],
        requiresChoice: "waheed_accept"
    },
    {
        id: "act3_m7",
        title: "Sabotage",
        type: "stealth",
        description: "Destroy the drug lab",
        objectives: [
            { type: "plant", target: "explosives", count: 3, current: 0 },
            { type: "escape", target: "safeDistance", current: false }
        ],
        rewards: { money: 500, karma: 25, familyKarma: 20 },
        unlocks: ["act3_m8"],
        requiresChoice: "waheed_refuse"
    },
    {
        id: "act3_m8",
        title: "Phase 2 Problems",
        type: "story",
        description: "Confront the Hulhumalé construction boss",
        objectives: [
            { type: "travel", target: "hulhumale_phase2", current: false },
            { type: "trigger", target: "phase2Meeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "phase2_territory_dispute",
        unlocks: ["act3_m9", "act3_m10"]
    },
    {
        id: "act3_m9",
        title: "Hostile Takeover",
        type: "combat",
        description: "Fight for Hulhumalé territory",
        objectives: [
            { type: "defeat", target: "constructionThug", count: 10, current: 0 },
            { type: "capture", target: "industrialZone", current: false }
        ],
        rewards: { money: 4000, karma: -25, reputation: { hulhumaleGang: -50 } },
        unlocks: ["act3_m11"],
        requiresChoice: "phase2_challenge"
    },
    {
        id: "act3_m10",
        title: "Business Partners",
        type: "negotiation",
        description: "Negotiate territory split with Phase 2 Boss",
        objectives: [
            { type: "charisma", target: "phase2Boss", current: false },
            { type: "pay", target: "tribute", amount: 5000, current: false }
        ],
        rewards: { money: -5000, karma: 0, reputation: { hulhumaleGang: 20 } },
        unlocks: ["act3_m11"],
        requiresChoice: "phase2_negotiate"
    },
    {
        id: "act3_m11",
        title: "Crypto Clean",
        type: "story",
        description: "Meet the crypto money launderer",
        objectives: [
            { type: "travel", target: "luxuryApartments", current: false },
            { type: "trigger", target: "cryptoMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "crypto_intro",
        unlocks: ["act3_m12"]
    },
    {
        id: "act3_m12",
        title: "Trading Tutorial",
        type: "minigame",
        description: "Learn crypto trading to launder money",
        objectives: [
            { type: "minigame", target: "cryptoTrading", current: false },
            { type: "earn", target: "cryptoProfit", amount: 1000, current: 0 }
        ],
        rewards: { money: 2000, karma: -15 },
        unlocks: ["act3_m13"]
    },
    {
        id: "act3_m13",
        title: "Presidential Summons",
        type: "story",
        description: "President Mooizbe wants to meet",
        objectives: [
            { type: "travel", target: "presidentialPalace", current: false },
            { type: "trigger", target: "mooizbeMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "mooizbe_political_meeting",
        unlocks: ["act3_m14", "act3_m15"],
        moralChoice: true,
        majorChoice: "political"
    },
    {
        id: "act3_m14",
        title: "Opposition Silencer",
        type: "intimidation",
        description: "Silence opposition journalists",
        objectives: [
            { type: "intimidate", target: "journalist", count: 3, current: 0 },
            { type: "destroy", target: "evidence", current: false }
        ],
        rewards: { money: 10000, karma: -35, familyKarma: -25 },
        unlocks: ["act3_climax"],
        requiresChoice: "mooizbe_accept"
    },
    {
        id: "act3_m15",
        title: "Whistleblower",
        type: "stealth",
        description: "Leak evidence of government corruption",
        objectives: [
            { type: "steal", target: "corruptionFiles", current: false },
            { type: "deliver", target: "foreignJournalist", current: false }
        ],
        rewards: { money: 1000, karma: 30, familyKarma: 20 },
        unlocks: ["act3_climax"],
        requiresChoice: "mooizbe_refuse"
    },
    {
        id: "act3_climax",
        title: "The Bust",
        type: "combat",
        description: "Police raid the mega lab - escape or fight",
        objectives: [
            { type: "survive", target: "policeRaid", duration: 120, current: 0 },
            { type: "escape", target: "yacht", current: false }
        ],
        rewards: { money: 5000, karma: -20 },
        unlocks: ["act4_start"],
        actEnd: true,
        bossMusic: true
    }
];

// ==================== ACT 3 SIDE MISSIONS ====================
const ACT3_SIDE_MISSIONS = [
    { id: "side3_ferry1", title: "Ferry Smuggling I", type: "smuggling", reward: 500 },
    { id: "side3_ferry2", title: "Ferry Smuggling II", type: "smuggling", reward: 750 },
    { id: "side3_construction1", title: "Construction Sabotage", type: "sabotage", reward: 600 },
    { id: "side3_construction2", title: "Worker Recruitment", type: "recruitment", reward: 400 },
    { id: "side3_crypto1", title: "Day Trading I", type: "minigame", game: "crypto", reward: 300 },
    { id: "side3_crypto2", title: "Day Trading II", type: "minigame", game: "crypto", reward: 500 },
    { id: "side3_crypto3", title: "Whale Hunting", type: "minigame", game: "crypto", reward: 1000 },
    { id: "side3_airport1", title: "Cargo Heist", type: "heist", reward: 800 },
    { id: "side3_airport2", title: "VIP Escort", type: "escort", reward: 600 },
    { id: "side3_lab1", title: "Chemical Run I", type: "delivery", reward: 400 },
    { id: "side3_lab2", title: "Chemical Run II", type: "delivery", reward: 600 },
    { id: "side3_race1", title: "Hulhumalé Street Race", type: "race", reward: 400 },
    { id: "side3_race2", title: "Airport Runway Race", type: "race", reward: 800 },
    { id: "side3_fight1", title: "Construction Yard Brawl", type: "fight", enemies: 8, reward: 500 },
    { id: "side3_fishing", title: "Deep Sea Fishing", type: "minigame", game: "fishing", reward: 300 }
];

// ==================== ACT 3 DIALOGUES ====================
const ACT3_DIALOGUES = {
    dhodho_first_meeting: {
        speaker: "DhoDho",
        sprite: "👨🏾‍✈️",
        lines: [
            { text: "Kipal! Mashakah nephew! Come, come!", dhivehi: true },
            { text: "*looks around nervously* Rippoo told me about kaley.", dhivehi: true },
            { text: "Aharen work customs 15 years. Know every trick.", dhivehi: true },
            { text: "Kaley need something... imported? Aharen can help.", dhivehi: true },
            { text: "But family discount only. 20% cut.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen need chemicals. For... business.", karma: -15, response: "dhodho_chemicals" },
            { text: "Just visiting uncle. No business today.", karma: 5, response: "dhodho_innocent" },
            { text: "What else can kaley smuggle?", karma: -10, response: "dhodho_options" }
        ]
    },
    
    dhodho_chemicals: {
        speaker: "DhoDho",
        sprite: "👨🏾‍✈️",
        lines: [
            { text: "*nods slowly* Chemicals. Aharen understand.", dhivehi: true },
            { text: "Precursors come from India. Labeled as 'cleaning supplies'.", dhivehi: false },
            { text: "Mashakah mark the containers. Kaley pick up at night.", dhivehi: true },
            { text: "Don't tell Rippoo. She'll kill us both.", dhivehi: true }
        ]
    },
    
    dhodho_innocent: {
        speaker: "DhoDho",
        sprite: "👨🏾‍✈️",
        lines: [
            { text: "*relieved* Good, good. Family first.", dhivehi: true },
            { text: "Kaley mother worries about kaley. Mashakah all do.", dhivehi: true },
            { text: "If kaley ever need help... legal help... aharen here.", dhivehi: true },
            { text: "Now come, let uncle show kaley the airport!", dhivehi: true }
        ]
    },
    
    dhodho_options: {
        speaker: "DhoDho",
        sprite: "👨🏾‍✈️",
        lines: [
            { text: "*grins* Kaley ambitious. Like mashakah.", dhivehi: true },
            { text: "Weapons from Pakistan. Luxury goods from Dubai.", dhivehi: false },
            { text: "Even people... if kaley know what aharen mean.", dhivehi: true },
            { text: "But that's dangerous. Very dangerous.", dhivehi: false },
            { text: "Start small. Build trust. Then we talk big business.", dhivehi: true }
        ]
    },
    
    waheed_lab_intro: {
        speaker: "Dr. Waheed",
        sprite: "🧑🏾‍🔬",
        lines: [
            { text: "*adjusts goggles* Ah, the famous Baokalo.", dhivehi: false },
            { text: "Kaley want to make real faisaa? Not street corner beys.", dhivehi: true },
            { text: "Synthetic. Pure. 10x profit margin.", dhivehi: false },
            { text: "Aharen need distribution. Kaley need product.", dhivehi: true },
            { text: "Partnership? 50-50 split.", dhivehi: false }
        ],
        choices: [
            { text: "Aharen in. Show me the lab.", karma: -25, familyKarma: -20, response: "waheed_accept" },
            { text: "Synthetic kills people. Aharen won't touch it.", karma: 20, familyKarma: 15, response: "waheed_refuse" },
            { text: "60-40. Aharen take the risk.", karma: -20, response: "waheed_negotiate" }
        ]
    },
    
    waheed_accept: {
        speaker: "Dr. Waheed",
        sprite: "🧑🏾‍🔬",
        lines: [
            { text: "*excited* Excellent! Come, come!", dhivehi: false },
            { text: "*shows lab equipment* This is where magic happens.", dhivehi: false },
            { text: "Methylamine, pseudoephedrine, red phosphorus...", dhivehi: false },
            { text: "Kaley don't need to understand. Just distribute.", dhivehi: true },
            { text: "First batch ready in 48 hours. Be ready.", dhivehi: false }
        ]
    },
    
    waheed_refuse: {
        speaker: "Dr. Waheed",
        sprite: "🧑🏾‍🔬",
        lines: [
            { text: "*laughs* Morals? In this business?", dhivehi: false },
            { text: "Kaley sell heroin but won't touch synthetic?", dhivehi: true },
            { text: "Hypocrite. But mashakah respect the choice.", dhivehi: true },
            { text: "Just know... if kaley not with us, kaley against us.", dhivehi: false },
            { text: "Choose wisely, Baokalo.", dhivehi: false }
        ]
    },
    
    waheed_negotiate: {
        speaker: "Dr. Waheed",
        sprite: "🧑🏾‍🔬",
        lines: [
            { text: "*strokes chin* 60-40... kaley got balls.", dhivehi: true },
            { text: "Fine. But kaley handle ALL distribution risk.", dhivehi: false },
            { text: "Police, rivals, angry customers... kaley problem.", dhivehi: true },
            { text: "Aharen just cook. Deal?", dhivehi: false }
        ]
    },
    
    crypto_intro: {
        speaker: "Crypto Maldives",
        sprite: "💰",
        lines: [
            { text: "Bro! Kaley heard of Bitcoin? Ethereum?", dhivehi: true },
            { text: "Forget cash. Digital faisaa is future!", dhivehi: true },
            { text: "Mashakah can clean kaley money. Untraceable.", dhivehi: true },
            { text: "Small fee - 15%. But kaley money becomes... legitimate.", dhivehi: false },
            { text: "Politicians use mashakah service. Very safe.", dhivehi: true }
        ],
        choices: [
            { text: "Show me how it works.", karma: -10, response: "crypto_tutorial" },
            { text: "Sounds like a scam.", karma: 5, response: "crypto_skeptic" },
            { text: "Can aharen invest dirty faisaa?", karma: -15, response: "crypto_invest" }
        ]
    },
    
    crypto_tutorial: {
        speaker: "Crypto Maldives",
        sprite: "💰",
        lines: [
            { text: "Simple! Kaley give mashakah rufiyaa.", dhivehi: true },
            { text: "Mashakah buy Bitcoin. Send to mixer.", dhivehi: false },
            { text: "Mixer scrambles everything. Untraceable!", dhivehi: false },
            { text: "Then convert back to clean faisaa.", dhivehi: true },
            { text: "Want to try? Start with 10,000.", dhivehi: true }
        ]
    },
    
    crypto_skeptic: {
        speaker: "Crypto Maldives",
        sprite: "💰",
        lines: [
            { text: "*offended* Scam?! Bro, this is TECHNOLOGY!", dhivehi: false },
            { text: "Mashakah made millions! Look at this apartment!", dhivehi: true },
            { text: "Fine, don't believe. Stay poor.", dhivehi: false },
            { text: "When kaley ready for real faisaa, call me.", dhivehi: true }
        ]
    },
    
    crypto_invest: {
        speaker: "Crypto Maldives",
        sprite: "💰",
        lines: [
            { text: "*eyes light up* NOW kaley talking!", dhivehi: true },
            { text: "Dirty faisaa becomes clean profit!", dhivehi: true },
            { text: "Mashakah show kaley the trading screen.", dhivehi: true },
            { text: "Buy low, sell high. Simple!", dhivehi: false },
            { text: "But careful - market can crash. Kaley warned.", dhivehi: true }
        ]
    },
    
    mooizbe_political_meeting: {
        speaker: "President Mooizbe",
        sprite: "🤴🏾",
        lines: [
            { text: "*in presidential office* So... kaley the one causing trouble.", dhivehi: true },
            { text: "Gangs don't exist in Raajje. Officially.", dhivehi: false },
            { text: "But unofficially... mashakah need people like kaley.", dhivehi: true },
            { text: "Opposition getting loud. Elections coming.", dhivehi: false },
            { text: "Help mashakah... and aharen make kaley problems disappear.", dhivehi: true }
        ],
        choices: [
            { text: "What do kaley need, Mr. President?", karma: -20, response: "mooizbe_accept" },
            { text: "Aharen don't work for politicians.", karma: 15, response: "mooizbe_refuse" },
            { text: "How much protection can kaley offer?", karma: -10, response: "mooizbe_negotiate" }
        ]
    },
    
    mooizbe_accept: {
        speaker: "President Mooizbe",
        sprite: "🤴🏾",
        lines: [
            { text: "*smiles coldly* Smart choice.", dhivehi: false },
            { text: "There are journalists. Asking questions.", dhivehi: false },
            { text: "About gangs. About drugs. About... mashakah.", dhivehi: true },
            { text: "Make them stop asking. Permanently if needed.", dhivehi: false },
            { text: "Do this, and kaley untouchable. Police, courts... all mine.", dhivehi: true }
        ]
    },
    
    mooizbe_refuse: {
        speaker: "President Mooizbe",
        sprite: "🤴🏾",
        lines: [
            { text: "*face hardens* Kaley making a mistake.", dhivehi: true },
            { text: "Aharen control everything. Police. Military. Courts.", dhivehi: false },
            { text: "One word from mashakah and kaley in Dhoonidhoo forever.", dhivehi: true },
            { text: "Think carefully. Door is still open.", dhivehi: false },
            { text: "For now.", dhivehi: false }
        ]
    },
    
    mooizbe_negotiate: {
        speaker: "President Mooizbe",
        sprite: "🤴🏾",
        lines: [
            { text: "*chuckles* Businessman. Aharen like that.", dhivehi: true },
            { text: "Full immunity. No arrests, no trials.", dhivehi: false },
            { text: "Kaley operations... invisible to law.", dhivehi: true },
            { text: "But kaley must be loyal. Completely.", dhivehi: false },
            { text: "Betray mashakah... and kaley family pays.", dhivehi: true }
        ]
    },
    
    phase2_territory_dispute: {
        speaker: "Phase 2 Boss",
        sprite: "🏗️",
        lines: [
            { text: "Kaley think can just walk into Hulhumalé?", dhivehi: true },
            { text: "This is mashakah territory. Every building, every worker.", dhivehi: true },
            { text: "Malé gangs stay in Malé. Understood?", dhivehi: false },
            { text: "*cracks knuckles* Or mashakah bury kaley in concrete.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen not here to fight. Let's talk business.", karma: 0, response: "phase2_negotiate" },
            { text: "Malé gangs go wherever we want.", karma: -10, response: "phase2_challenge" },
            { text: "[Attack]", karma: -20, combat: true, response: "phase2_attack" }
        ]
    },
    
    phase2_negotiate: {
        speaker: "Phase 2 Boss",
        sprite: "🏗️",
        lines: [
            { text: "*pauses* Business? Kaley got faisaa?", dhivehi: true },
            { text: "5000 rufiyaa. Monthly tribute.", dhivehi: false },
            { text: "Kaley can operate in Phase 1. Stay out of Phase 2.", dhivehi: true },
            { text: "Deal?", dhivehi: false }
        ]
    },
    
    phase2_challenge: {
        speaker: "Phase 2 Boss",
        sprite: "🏗️",
        lines: [
            { text: "*laughs* Kaley got death wish!", dhivehi: true },
            { text: "BOYS! We got a Malé rat!", dhivehi: true },
            { text: "*pulls out rebar* Let's show him Hulhumalé hospitality!", dhivehi: false }
        ]
    },
    
    phase2_attack: {
        speaker: "Phase 2 Boss",
        sprite: "🏗️",
        lines: [
            { text: "*surprised* Kaley sodu—!", dhivehi: true }
        ]
    }
};

// ==================== ACT 3 RADIO CONTENT ====================
const ACT3_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Hulhumalé development continues! New apartments for 'affordable' 5 million rufiyaa!" },
            { type: "news", text: "Drug bust at airport! 10kg seized! (100kg got through...)" },
            { type: "satire", text: "President Mooizbe: 'India Out!' Also Mooizbe: 'Why won't India help us?'" },
            { type: "news", text: "Cryptocurrency boom! Young Maldivians becoming 'millionaires' (on paper)" },
            { type: "ad", text: "Invest in Hulhumalé! Where dreams come true! (Terms and conditions apply)" },
            { type: "satire", text: "Construction worker falls from building. Company: 'He was taking selfie.'" },
            { type: "news", text: "Synthetic drug deaths up 300%. Government: 'Fake news!'" }
        ]
    },
    undergroundFM: {
        name: "📻 Underground FM",
        segments: [
            { type: "truth", text: "Hulhumalé built on migrant worker blood. 50 deaths 'unreported.'" },
            { type: "truth", text: "Airport customs? Biggest smuggling operation in Maldives." },
            { type: "truth", text: "Mooizbe's brother owns construction company. Coincidence?" },
            { type: "truth", text: "Crypto 'millionaires' can't cash out. It's all fake." },
            { type: "music", text: "♪ Playing: 'Concrete Jungle' - Hulhumalé anthem ♪" }
        ]
    }
};

// ==================== CRYPTO TRADING MINI-GAME ====================
let cryptoGame = {
    active: false,
    balance: 0,
    holdings: { BTC: 0, ETH: 0, DOGE: 0 },
    prices: { BTC: 50000, ETH: 3000, DOGE: 0.1 },
    priceHistory: { BTC: [], ETH: [], DOGE: [] },
    timer: 60,
    profit: 0
};

function startCryptoGame(startingBalance) {
    cryptoGame.active = true;
    cryptoGame.balance = startingBalance || 10000;
    cryptoGame.holdings = { BTC: 0, ETH: 0, DOGE: 0 };
    cryptoGame.prices = { BTC: 50000, ETH: 3000, DOGE: 0.1 };
    cryptoGame.priceHistory = { BTC: [50000], ETH: [3000], DOGE: [0.1] };
    cryptoGame.timer = 60;
    cryptoGame.profit = 0;
    GameState.isInMinigame = true;
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '💰 Crypto Trading';
    
    // Start price fluctuation
    const priceInterval = setInterval(() => {
        if (!cryptoGame.active) {
            clearInterval(priceInterval);
            return;
        }
        updateCryptoPrices();
    }, 1000);
    
    // Start timer
    const timerInterval = setInterval(() => {
        cryptoGame.timer--;
        if (cryptoGame.timer <= 0 || !cryptoGame.active) {
            clearInterval(timerInterval);
            if (cryptoGame.active) endCryptoGame();
        }
    }, 1000);
    
    document.addEventListener('keydown', cryptoKeyHandler);
    requestAnimationFrame(cryptoLoop);
}

function updateCryptoPrices() {
    // Random price fluctuation
    for (let coin in cryptoGame.prices) {
        const change = (Math.random() - 0.48) * 0.1; // Slight upward bias
        cryptoGame.prices[coin] *= (1 + change);
        cryptoGame.prices[coin] = Math.max(0.01, cryptoGame.prices[coin]);
        
        cryptoGame.priceHistory[coin].push(cryptoGame.prices[coin]);
        if (cryptoGame.priceHistory[coin].length > 30) {
            cryptoGame.priceHistory[coin].shift();
        }
    }
}

function cryptoKeyHandler(e) {
    if (!cryptoGame.active) return;
    
    const buyAmount = 1000;
    
    switch(e.key) {
        case '1': // Buy BTC
            if (cryptoGame.balance >= buyAmount) {
                cryptoGame.balance -= buyAmount;
                cryptoGame.holdings.BTC += buyAmount / cryptoGame.prices.BTC;
            }
            break;
        case '2': // Buy ETH
            if (cryptoGame.balance >= buyAmount) {
                cryptoGame.balance -= buyAmount;
                cryptoGame.holdings.ETH += buyAmount / cryptoGame.prices.ETH;
            }
            break;
        case '3': // Buy DOGE
            if (cryptoGame.balance >= buyAmount) {
                cryptoGame.balance -= buyAmount;
                cryptoGame.holdings.DOGE += buyAmount / cryptoGame.prices.DOGE;
            }
            break;
        case 'q': // Sell BTC
            if (cryptoGame.holdings.BTC > 0) {
                cryptoGame.balance += cryptoGame.holdings.BTC * cryptoGame.prices.BTC;
                cryptoGame.holdings.BTC = 0;
            }
            break;
        case 'w': // Sell ETH
            if (cryptoGame.holdings.ETH > 0) {
                cryptoGame.balance += cryptoGame.holdings.ETH * cryptoGame.prices.ETH;
                cryptoGame.holdings.ETH = 0;
            }
            break;
        case 'e': // Sell DOGE
            if (cryptoGame.holdings.DOGE > 0) {
                cryptoGame.balance += cryptoGame.holdings.DOGE * cryptoGame.prices.DOGE;
                cryptoGame.holdings.DOGE = 0;
            }
            break;
    }
}

function cryptoLoop() {
    if (!cryptoGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Timer
    ctx.fillStyle = cryptoGame.timer > 15 ? '#fff' : '#ff0000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Time: ${cryptoGame.timer}s`, width - 10, 20);
    
    // Balance
    ctx.fillStyle = '#00ff00';
    ctx.textAlign = 'left';
    ctx.fillText(`Balance: $${cryptoGame.balance.toFixed(2)}`, 10, 20);
    
    // Calculate total value
    let totalValue = cryptoGame.balance;
    for (let coin in cryptoGame.holdings) {
        totalValue += cryptoGame.holdings[coin] * cryptoGame.prices[coin];
    }
    ctx.fillText(`Total: $${totalValue.toFixed(2)}`, 10, 38);
    
    // Draw price charts
    const coins = ['BTC', 'ETH', 'DOGE'];
    const colors = ['#f7931a', '#627eea', '#c3a634'];
    const chartHeight = 60;
    const chartY = 55;
    
    coins.forEach((coin, index) => {
        const x = 10 + index * (width / 3 - 5);
        const chartWidth = width / 3 - 20;
        
        // Chart background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(x, chartY, chartWidth, chartHeight);
        
        // Price line
        const history = cryptoGame.priceHistory[coin];
        if (history.length > 1) {
            const minPrice = Math.min(...history);
            const maxPrice = Math.max(...history);
            const range = maxPrice - minPrice || 1;
            
            ctx.strokeStyle = colors[index];
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            history.forEach((price, i) => {
                const px = x + (i / (history.length - 1)) * chartWidth;
                const py = chartY + chartHeight - ((price - minPrice) / range) * chartHeight;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();
        }
        
        // Coin name and price
        ctx.fillStyle = colors[index];
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(coin, x + chartWidth / 2, chartY + chartHeight + 15);
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.fillText(`$${cryptoGame.prices[coin].toFixed(coin === 'DOGE' ? 4 : 0)}`, x + chartWidth / 2, chartY + chartHeight + 28);
        
        // Holdings
        ctx.fillStyle = '#aaa';
        ctx.fillText(`Own: ${cryptoGame.holdings[coin].toFixed(4)}`, x + chartWidth / 2, chartY + chartHeight + 40);
    });
    
    // Instructions
    ctx.fillStyle = '#778da9';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press 1/2/3 to BUY $1000 of BTC/ETH/DOGE', width / 2, height - 35);
    ctx.fillText('Press Q/W/E to SELL ALL BTC/ETH/DOGE', width / 2, height - 20);
    
    requestAnimationFrame(cryptoLoop);
}

function endCryptoGame() {
    cryptoGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', cryptoKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    // Calculate final value
    let totalValue = cryptoGame.balance;
    for (let coin in cryptoGame.holdings) {
        totalValue += cryptoGame.holdings[coin] * cryptoGame.prices[coin];
    }
    
    const startingBalance = 10000;
    const profit = totalValue - startingBalance;
    
    if (profit > 0) {
        GameState.player.money += Math.floor(profit);
        showNotification('Trading Complete!', `Profit: +${Math.floor(profit)} faisaa 📈`);
    } else {
        showNotification('Trading Complete!', `Loss: ${Math.floor(profit)} faisaa 📉`);
    }
    
    // Update mission objective
    if (profit >= 1000) {
        updateMissionObjective('earn', 'cryptoProfit', profit);
    }
}

// ==================== DRUG COOKING MINI-GAME ====================
let cookingGame = {
    active: false,
    temperature: 50,
    targetTemp: 75,
    purity: 0,
    timer: 45,
    stage: 0,
    stages: ['Mixing', 'Heating', 'Cooling', 'Crystallizing']
};

function startDrugCookingGame() {
    cookingGame.active = true;
    cookingGame.temperature = 50;
    cookingGame.targetTemp = 75;
    cookingGame.purity = 0;
    cookingGame.timer = 45;
    cookingGame.stage = 0;
    GameState.isInMinigame = true;
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🧪 Synthesis';
    
    // Timer
    const timerInterval = setInterval(() => {
        cookingGame.timer--;
        if (cookingGame.timer <= 0 || !cookingGame.active) {
            clearInterval(timerInterval);
            if (cookingGame.active) endCookingGame();
        }
    }, 1000);
    
    document.addEventListener('keydown', cookingKeyHandler);
    requestAnimationFrame(cookingLoop);
}

function cookingKeyHandler(e) {
    if (!cookingGame.active) return;
    
    if (e.key === 'ArrowUp' || e.key === 'w') {
        cookingGame.temperature = Math.min(100, cookingGame.temperature + 2);
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        cookingGame.temperature = Math.max(0, cookingGame.temperature - 2);
    } else if (e.key === ' ') {
        // Check if temperature is in target range
        const diff = Math.abs(cookingGame.temperature - cookingGame.targetTemp);
        if (diff < 5) {
            cookingGame.purity += 25;
            cookingGame.stage++;
            
            if (cookingGame.stage >= cookingGame.stages.length) {
                endCookingGame();
                return;
            }
            
            // New target for next stage
            cookingGame.targetTemp = 40 + Math.random() * 50;
        }
    }
}

function cookingLoop() {
    if (!cookingGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Timer
    ctx.fillStyle = cookingGame.timer > 10 ? '#fff' : '#ff0000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Time: ${cookingGame.timer}s`, width - 10, 25);
    
    // Stage
    ctx.fillStyle = '#ffcc00';
    ctx.textAlign = 'left';
    ctx.fillText(`Stage: ${cookingGame.stages[cookingGame.stage]}`, 10, 25);
    
    // Purity
    ctx.fillStyle = '#00ff00';
    ctx.fillText(`Purity: ${cookingGame.purity}%`, 10, 45);
    
    // Temperature gauge
    const gaugeX = width / 2 - 100;
    const gaugeY = 70;
    const gaugeWidth = 200;
    const gaugeHeight = 30;
    
    // Background
    ctx.fillStyle = '#333';
    ctx.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);
    
    // Target zone
    const targetX = gaugeX + (cookingGame.targetTemp / 100) * gaugeWidth;
    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.fillRect(targetX - 10, gaugeY, 20, gaugeHeight);
    
    // Current temperature
    const tempX = gaugeX + (cookingGame.temperature / 100) * gaugeWidth;
    ctx.fillStyle = cookingGame.temperature > 80 ? '#ff0000' : '#ff6600';
    ctx.fillRect(tempX - 3, gaugeY - 5, 6, gaugeHeight + 10);
    
    // Temperature labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('0°C', gaugeX, gaugeY + gaugeHeight + 15);
    ctx.fillText('50°C', gaugeX + gaugeWidth / 2, gaugeY + gaugeHeight + 15);
    ctx.fillText('100°C', gaugeX + gaugeWidth, gaugeY + gaugeHeight + 15);
    
    // Current temp display
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`${Math.floor(cookingGame.temperature)}°C`, width / 2, gaugeY + gaugeHeight + 50);
    
    // Target temp
    ctx.fillStyle = '#00ff00';
    ctx.font = '14px Arial';
    ctx.fillText(`Target: ${Math.floor(cookingGame.targetTemp)}°C`, width / 2, gaugeY + gaugeHeight + 70);
    
    // Flask visualization
    ctx.fillStyle = '#4a90d9';
    ctx.beginPath();
    ctx.moveTo(width / 2 - 30, height - 100);
    ctx.lineTo(width / 2 - 50, height - 30);
    ctx.lineTo(width / 2 + 50, height - 30);
    ctx.lineTo(width / 2 + 30, height - 100);
    ctx.closePath();
    ctx.fill();
    
    // Bubbles based on temperature
    if (cookingGame.temperature > 60) {
        for (let i = 0; i < cookingGame.temperature / 20; i++) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(
                width / 2 - 30 + Math.random() * 60,
                height - 50 - Math.random() * 40,
                2 + Math.random() * 3,
                0, Math.PI * 2
            );
            ctx.fill();
        }
    }
    
    // Instructions
    ctx.fillStyle = '#778da9';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('↑/↓ or W/S to adjust temperature', width / 2, height - 15);
    ctx.fillText('SPACE when temperature is in green zone', width / 2, height - 3);
    
    requestAnimationFrame(cookingLoop);
}

function endCookingGame() {
    cookingGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', cookingKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    const reward = Math.floor(cookingGame.purity * 30);
    
    if (cookingGame.purity >= 75) {
        GameState.player.money += reward;
        showNotification('Synthesis Complete!', `${cookingGame.purity}% purity! +${reward} faisaa`);
        updateMissionObjective('minigame', 'drugCooking', true);
    } else {
        showNotification('Synthesis Failed!', `Only ${cookingGame.purity}% purity. Batch ruined.`);
    }
}

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT3_MAPS = ACT3_MAPS;
    window.ACT3_CHARACTERS = ACT3_CHARACTERS;
    window.ACT3_MISSIONS = ACT3_MISSIONS;
    window.ACT3_SIDE_MISSIONS = ACT3_SIDE_MISSIONS;
    window.ACT3_DIALOGUES = ACT3_DIALOGUES;
    window.ACT3_RADIO = ACT3_RADIO;
    window.startCryptoGame = startCryptoGame;
    window.startDrugCookingGame = startDrugCookingGame;
}
