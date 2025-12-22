// ============================================
// ACT 6: SOUTHERN EMPIRE
// Timeline: 2020 - Expansion to the South
// ============================================

// ==================== ACT 6 MAPS ====================
const ACT6_MAPS = {
    addu_hithadhoo: {
        name: "Addu City - Hithadhoo",
        width: 70,
        height: 60,
        spawnX: 35,
        spawnY: 50,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            harbor: { x: 5, y: 45, w: 15, h: 12, name: "Hithadhoo Harbor 🚢" },
            market: { x: 25, y: 35, w: 12, h: 10, name: "Fish Market 🐟" },
            mosque: { x: 40, y: 30, w: 8, h: 8, name: "Friday Mosque 🕌" },
            school: { x: 55, y: 25, w: 10, h: 8, name: "Addu High School 🏫" },
            hospital: { x: 30, y: 15, w: 12, h: 10, name: "Hithadhoo Hospital 🏥" },
            gangTerritory: { x: 50, y: 40, w: 15, h: 12, name: "Kalo Oiy Territory 💀" },
            causewayNorth: { x: 60, y: 5, w: 8, h: 10, name: "Causeway to Maradhoo →" }
        },
        gangTerritory: 'kalo_oiy',
        isAddu: true
    },
    
    addu_maradhoo: {
        name: "Addu City - Maradhoo",
        width: 55,
        height: 50,
        spawnX: 27,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            causewaySouth: { x: 5, y: 40, w: 8, h: 8, name: "← Causeway to Hithadhoo" },
            village: { x: 20, y: 25, w: 15, h: 12, name: "Maradhoo Village 🏘️" },
            beach: { x: 35, y: 35, w: 15, h: 10, name: "Maradhoo Beach 🏖️" },
            gangTerritory: { x: 10, y: 10, w: 12, h: 10, name: "Maradhoo Boys Territory 🔴" },
            causewayNorth: { x: 45, y: 5, w: 8, h: 8, name: "Causeway to Feydhoo →" }
        },
        gangTerritory: 'maradhoo_boys',
        isAddu: true
    },
    
    addu_feydhoo: {
        name: "Addu City - Feydhoo",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            causewaySouth: { x: 5, y: 35, w: 8, h: 8, name: "← Causeway to Maradhoo" },
            center: { x: 18, y: 20, w: 14, h: 12, name: "Feydhoo Center 🏛️" },
            gangTerritory: { x: 35, y: 15, w: 10, h: 10, name: "Feydhoo Fighters Territory ⚔️" },
            causewayEast: { x: 40, y: 35, w: 8, h: 8, name: "Link Road to Gan →" }
        },
        gangTerritory: 'feydhoo_fighters',
        isAddu: true
    },
    
    addu_gan: {
        name: "Addu City - Gan (Former British Base)",
        width: 65,
        height: 55,
        spawnX: 32,
        spawnY: 50,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            airport: { x: 10, y: 10, w: 25, h: 15, name: "Gan International Airport ✈️" },
            britishRuins: { x: 40, y: 15, w: 15, h: 12, name: "British Base Ruins 🏚️" },
            resort: { x: 45, y: 35, w: 15, h: 12, name: "Equator Village Resort 🏨" },
            linkRoad: { x: 5, y: 40, w: 8, h: 8, name: "← Link Road to Feydhoo" },
            smugglerCove: { x: 55, y: 45, w: 8, h: 8, name: "Smuggler's Cove 🏴‍☠️" }
        },
        hasAirport: true,
        isAddu: true
    },
    
    fuvahmulah: {
        name: "Fuvahmulah Island",
        width: 60,
        height: 55,
        spawnX: 30,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            harbor: { x: 25, y: 45, w: 10, h: 8, name: "Fuvahmulah Harbor 🚢" },
            thoondu: { x: 10, y: 35, w: 12, h: 10, name: "Thoondu Beach 🏖️" },
            bandaara: { x: 35, y: 25, w: 10, h: 8, name: "Bandaara Kilhi (Lake) 🌊" },
            dhadimago: { x: 20, y: 15, w: 12, h: 10, name: "Dhadimago Village 🏘️" },
            gangTerritory: { x: 40, y: 35, w: 12, h: 10, name: "Fuvahmulah Fury Territory 🔥" },
            tigerSharkPoint: { x: 50, y: 20, w: 8, h: 8, name: "Tiger Shark Point 🦈" }
        },
        gangTerritory: 'fuvahmulah_fury',
        isFuvahmulah: true,
        uniqueDialect: 'fuvahmulah_bas'
    },
    
    huvadhu_atoll: {
        name: "Huvadhu Atoll",
        width: 55,
        height: 50,
        spawnX: 27,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            thinadhoo: { x: 20, y: 20, w: 15, h: 12, name: "Thinadhoo Island 🏝️" },
            kolamaafushi: { x: 40, y: 15, w: 10, h: 8, name: "Kolamaafushi 🏝️" },
            gaddhoo: { x: 10, y: 35, w: 10, h: 8, name: "Gaddhoo 🏝️" },
            openSea: { x: 25, y: 35, w: 15, h: 10, name: "Open Sea 🌊" }
        },
        isAtoll: true,
        requiresBoat: true
    }
};

// ==================== ADDU GANGS (from Bible) ====================
const ADDU_GANGS = {
    kalo_oiy: {
        name: "Kalo Oiy",
        meaning: "Black Snake",
        territory: "Hithadhoo",
        strength: 45,
        specialty: "Drug trafficking",
        leader: "Kuda Manik",
        color: "#1a1a1a"
    },
    maradhoo_boys: {
        name: "Maradhoo Boys",
        meaning: "Maradhoo Boys",
        territory: "Maradhoo",
        strength: 30,
        specialty: "Robbery",
        leader: "Bodu Hassan",
        color: "#cc0000"
    },
    feydhoo_fighters: {
        name: "Feydhoo Fighters",
        meaning: "Feydhoo Fighters",
        territory: "Feydhoo",
        strength: 25,
        specialty: "Protection rackets",
        leader: "Ismail Didi",
        color: "#0066cc"
    },
    fuvahmulah_fury: {
        name: "Fuvahmulah Fury",
        meaning: "Fuvahmulah Fury",
        territory: "Fuvahmulah",
        strength: 40,
        specialty: "Fishing boat smuggling",
        leader: "Thakuru",
        color: "#ff6600"
    },
    gan_ghosts: {
        name: "Gan Ghosts",
        meaning: "Gan Ghosts",
        territory: "Gan",
        strength: 20,
        specialty: "Airport smuggling",
        leader: "British Ali",
        color: "#666666"
    },
    southern_syndicate: {
        name: "Southern Syndicate",
        meaning: "Southern Syndicate",
        territory: "All Addu",
        strength: 60,
        specialty: "Multi-island operations",
        leader: "Don Shareef",
        color: "#990099"
    }
};

// ==================== ACT 6 CHARACTERS ====================
const ACT6_CHARACTERS = {
    donShareef: {
        name: "Don Shareef",
        sprite: "🎩",
        role: "Southern Syndicate Boss",
        backstory: "Controls all southern drug routes. Former fisherman turned crime lord. Speaks refined Addu Bas.",
        dialogues: {
            first_meeting: {
                speaker: "Don Shareef",
                sprite: "🎩",
                lines: [
                    { text: "*in mansion* Kon aiy Baokalo. Malé aiy famous.", dhivehi: true, dialect: "addu" },
                    { text: "Kaley think kaley can come south and take over?", dhivehi: true },
                    { text: "Addu different from Malé. Aharemen control here.", dhivehi: true, dialect: "addu" },
                    { text: "But... aharemen hear kaley good. Useful.", dhivehi: true, dialect: "addu" },
                    { text: "Work WITH aharemen. Not against. Understand?", dhivehi: true }
                ],
                choices: [
                    { text: "What's the arrangement?", karma: 0, response: "shareef_deal" },
                    { text: "Aharen don't work for anyone.", karma: -10, response: "shareef_refuse" },
                    { text: "Aharen here to take over.", karma: -25, response: "shareef_challenge" }
                ]
            }
        }
    },
    
    kudaManik: {
        name: "Kuda Manik",
        sprite: "🐍",
        role: "Kalo Oiy Leader",
        backstory: "Hithadhoo's most feared gangster. Got his name from snake-like cunning. Muaz's contact in Addu.",
        dialogues: {
            introduction: {
                speaker: "Kuda Manik",
                sprite: "🐍",
                lines: [
                    { text: "*hisses* Muaz aiy brother sent kaley?", dhivehi: true, dialect: "addu" },
                    { text: "Aharemen heard about prison escape. Impressive.", dhivehi: true, dialect: "addu" },
                    { text: "Kalo Oiy can use someone like kaley.", dhivehi: true },
                    { text: "But first... prove kaley worth.", dhivehi: true }
                ]
            }
        }
    },
    
    thakuru: {
        name: "Thakuru",
        sprite: "🦈",
        role: "Fuvahmulah Fury Leader",
        backstory: "Named after the tiger sharks he swims with. Controls Fuvahmulah's fishing fleet and smuggling routes.",
        dialogues: {
            shark_meeting: {
                speaker: "Thakuru",
                sprite: "🦈",
                lines: [
                    { text: "*on boat* Kaley know why they call me Thakuru?", dhivehi: true },
                    { text: "Tiger shark. Aharemen swim with them.", dhivehi: true, dialect: "fuvahmulah" },
                    { text: "Fuvahmulah people... aharemen different.", dhivehi: true, dialect: "fuvahmulah" },
                    { text: "Aharemen own language. Own ways.", dhivehi: true, dialect: "fuvahmulah" },
                    { text: "Kaley want to work here? Learn respect first.", dhivehi: true }
                ],
                choices: [
                    { text: "Teach me your ways.", karma: 5, response: "thakuru_teach" },
                    { text: "Business is business.", karma: -5, response: "thakuru_business" },
                    { text: "Aharen just passing through.", karma: 0, response: "thakuru_pass" }
                ]
            }
        }
    },
    
    britishAli: {
        name: "British Ali",
        sprite: "🎖️",
        role: "Gan Ghosts Leader",
        backstory: "Grew up in British base ruins. Speaks English fluently. Runs airport smuggling operations.",
        dialogues: {
            airport_meeting: {
                speaker: "British Ali",
                sprite: "🎖️",
                lines: [
                    { text: "*in British accent* Ah, the famous Baokalo!", dhivehi: false },
                    { text: "Welcome to Gan. Former RAF base, you know.", dhivehi: false },
                    { text: "My grandfather worked for the British. Learned their ways.", dhivehi: false },
                    { text: "Now I run... import/export. Through the airport.", dhivehi: false },
                    { text: "Kaley interested in partnership?", dhivehi: true }
                ]
            }
        }
    },
    
    muazSouth: {
        name: "Muaz",
        sprite: "👤",
        role: "Half-Brother (Guide)",
        backstory: "Guides Baokalo through southern territories. Has connections from mother's Addu family.",
        dialogues: {
            addu_arrival: {
                speaker: "Muaz",
                sprite: "👤",
                lines: [
                    { text: "*on boat* Welcome to Addu, brother.", dhivehi: true },
                    { text: "Aharen mother's family from here. Aharemen have connections.", dhivehi: true, dialect: "addu" },
                    { text: "But careful. South different from Malé.", dhivehi: true },
                    { text: "People here... they remember everything.", dhivehi: false },
                    { text: "Our father had enemies here too.", dhivehi: true }
                ]
            }
        }
    },
    
    fisherwoman: {
        name: "Aisha Fulhu",
        sprite: "🎣",
        role: "Fishing Boat Captain",
        backstory: "One of few female boat captains. Knows all the smuggling routes. Neutral party.",
        dialogues: {
            fishing_lesson: {
                speaker: "Aisha Fulhu",
                sprite: "🎣",
                lines: [
                    { text: "*on dhoni* Kaley want to learn real fishing?", dhivehi: true },
                    { text: "Not this tourist nonsense. Real Maldivian way.", dhivehi: false },
                    { text: "Pole and line. No nets. Sustainable.", dhivehi: false },
                    { text: "Also... good cover for other cargo. Hehe.", dhivehi: true }
                ]
            }
        }
    }
};

// ==================== ACT 6 MISSIONS ====================
const ACT6_MISSIONS = [
    {
        id: "act6_m1",
        title: "Southern Arrival",
        type: "story",
        description: "Arrive in Addu with Muaz",
        objectives: [
            { type: "travel", target: "addu_hithadhoo", current: false },
            { type: "trigger", target: "muazAdduArrival", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "muaz_addu_arrival",
        unlocks: ["act6_m2"]
    },
    {
        id: "act6_m2",
        title: "The Black Snake",
        type: "story",
        description: "Meet Kuda Manik of Kalo Oiy",
        objectives: [
            { type: "travel", target: "gangTerritory", current: false },
            { type: "trigger", target: "kudaManikMeeting", current: false }
        ],
        rewards: { money: 300 },
        dialogueStart: "kudamanik_introduction",
        unlocks: ["act6_m3"]
    },
    {
        id: "act6_m3",
        title: "Prove Your Worth",
        type: "combat",
        description: "Clear rival gang from Hithadhoo market",
        objectives: [
            { type: "travel", target: "market", current: false },
            { type: "defeat", target: "rivalGang", count: 8, current: 0 }
        ],
        rewards: { money: 1500, reputation: { kalo_oiy: 20 } },
        unlocks: ["act6_m4"]
    },
    {
        id: "act6_m4",
        title: "Causeway Run",
        type: "driving",
        description: "Drive contraband across the causeways",
        objectives: [
            { type: "collect", target: "contraband", current: false },
            { type: "drive", target: "addu_maradhoo", current: false },
            { type: "deliver", target: "maradhooContact", current: false },
            { type: "avoid", target: "police", current: false }
        ],
        rewards: { money: 2000 },
        unlocks: ["act6_m5"],
        vehicleRequired: "motorcycle"
    },
    {
        id: "act6_m5",
        title: "The Don",
        type: "story",
        description: "Meet Don Shareef of the Southern Syndicate",
        objectives: [
            { type: "travel", target: "addu_gan", current: false },
            { type: "trigger", target: "shareefMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "donshareef_first_meeting",
        unlocks: ["act6_m6", "act6_m7"],
        moralChoice: true
    },
    {
        id: "act6_m6",
        title: "Syndicate Soldier",
        type: "missions",
        description: "Work for Don Shareef",
        objectives: [
            { type: "complete", target: "syndicateMission", count: 3, current: 0 }
        ],
        rewards: { money: 5000, karma: -20, reputation: { southern_syndicate: 40 } },
        unlocks: ["act6_m8"],
        requiresChoice: "shareef_deal"
    },
    {
        id: "act6_m7",
        title: "Independent Operator",
        type: "survival",
        description: "Build your own network without Shareef",
        objectives: [
            { type: "recruit", target: "localGang", count: 2, current: 0 },
            { type: "establish", target: "territory", current: false },
            { type: "survive", target: "syndicateAttack", current: false }
        ],
        rewards: { money: 3000, karma: 5 },
        unlocks: ["act6_m8"],
        requiresChoice: "shareef_refuse"
    },
    {
        id: "act6_m8",
        title: "Fuvahmulah Journey",
        type: "travel",
        description: "Take boat to Fuvahmulah",
        objectives: [
            { type: "travel", target: "harbor", current: false },
            { type: "boat", target: "fuvahmulah", current: false }
        ],
        rewards: { money: 500 },
        unlocks: ["act6_m9"],
        vehicleRequired: "speedboat"
    },
    {
        id: "act6_m9",
        title: "Tiger Shark",
        type: "story",
        description: "Meet Thakuru of Fuvahmulah Fury",
        objectives: [
            { type: "travel", target: "tigerSharkPoint", current: false },
            { type: "trigger", target: "thakuruMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "thakuru_shark_meeting",
        unlocks: ["act6_m10"],
        moralChoice: true
    },
    {
        id: "act6_m10",
        title: "Shark Dive",
        type: "diving",
        description: "Dive with tiger sharks to prove courage",
        objectives: [
            { type: "dive", target: "sharkPoint", current: false },
            { type: "survive", target: "sharkEncounter", duration: 60, current: 0 },
            { type: "collect", target: "underwaterCache", current: false }
        ],
        rewards: { money: 2000, karma: 5 },
        unlocks: ["act6_m11"],
        minigame: "diving"
    },
    {
        id: "act6_m11",
        title: "Fishing Lessons",
        type: "minigame",
        description: "Learn traditional fishing from Aisha",
        objectives: [
            { type: "talk", target: "aishaFulhu", current: false },
            { type: "minigame", target: "fishing", score: 500, current: 0 }
        ],
        rewards: { money: 800 },
        dialogueStart: "aisha_fishing_lesson",
        unlocks: ["act6_m12"]
    },
    {
        id: "act6_m12",
        title: "British Connection",
        type: "story",
        description: "Meet British Ali at Gan Airport",
        objectives: [
            { type: "travel", target: "airport", current: false },
            { type: "trigger", target: "britishAliMeeting", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "britishali_airport_meeting",
        unlocks: ["act6_m13"]
    },
    {
        id: "act6_m13",
        title: "Airport Heist",
        type: "heist",
        description: "Steal cargo from Gan Airport",
        objectives: [
            { type: "infiltrate", target: "airport", current: false },
            { type: "steal", target: "cargo", current: false },
            { type: "escape", target: "smugglerCove", current: false }
        ],
        rewards: { money: 10000, karma: -15 },
        unlocks: ["act6_climax"],
        heistPlanning: true
    },
    {
        id: "act6_climax",
        title: "Southern Crown",
        type: "boss",
        description: "Confront Don Shareef for control of the South",
        objectives: [
            { type: "travel", target: "resort", current: false },
            { type: "defeat", target: "syndicateGuard", count: 15, current: 0 },
            { type: "boss", target: "donShareef", current: false },
            { type: "decide", target: "southernFate", current: false }
        ],
        rewards: { money: 25000 },
        unlocks: ["act7_start"],
        actEnd: true,
        bossMusic: true,
        majorChoice: "southern_control"
    }
];

// ==================== ACT 6 SIDE MISSIONS ====================
const ACT6_SIDE_MISSIONS = [
    { id: "side6_fish1", title: "Fishing Run I", type: "fishing", reward: 300 },
    { id: "side6_fish2", title: "Fishing Run II", type: "fishing", reward: 500 },
    { id: "side6_fish3", title: "Night Fishing", type: "fishing", reward: 800 },
    { id: "side6_smuggle1", title: "Boat Smuggling I", type: "smuggling", reward: 600 },
    { id: "side6_smuggle2", title: "Boat Smuggling II", type: "smuggling", reward: 900 },
    { id: "side6_causeway1", title: "Causeway Race I", type: "racing", reward: 400 },
    { id: "side6_causeway2", title: "Causeway Race II", type: "racing", reward: 700 },
    { id: "side6_dive1", title: "Reef Diving I", type: "diving", reward: 500 },
    { id: "side6_dive2", title: "Shipwreck Dive", type: "diving", reward: 1000 },
    { id: "side6_gang1", title: "Gang Turf War", type: "combat", reward: 600 },
    { id: "side6_gang2", title: "Territory Defense", type: "combat", reward: 800 },
    { id: "side6_resort", title: "Resort Delivery", type: "delivery", reward: 500 },
    { id: "side6_british", title: "British Ruins Exploration", type: "exploration", reward: 400 },
    { id: "side6_shark", title: "Shark Photography", type: "diving", reward: 700 }
];

// ==================== ACT 6 DIALOGUES ====================
const ACT6_DIALOGUES = {
    muaz_addu_arrival: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*on boat* Welcome to Addu, brother.", dhivehi: true },
            { text: "Aharen mother's family from here. Aharemen have connections.", dhivehi: true },
            { text: "But careful. South different from Malé.", dhivehi: true },
            { text: "People here... they remember everything.", dhivehi: false },
            { text: "Our father had enemies here too.", dhivehi: true }
        ]
    },
    
    kudamanik_introduction: {
        speaker: "Kuda Manik",
        sprite: "🐍",
        lines: [
            { text: "*hisses* Muaz aiy brother sent kaley?", dhivehi: true },
            { text: "Aharemen heard about prison escape. Impressive.", dhivehi: true },
            { text: "Kalo Oiy can use someone like kaley.", dhivehi: true },
            { text: "But first... prove kaley worth.", dhivehi: true }
        ]
    },
    
    donshareef_first_meeting: {
        speaker: "Don Shareef",
        sprite: "🎩",
        lines: [
            { text: "*in mansion* Kon aiy Baokalo. Malé aiy famous.", dhivehi: true },
            { text: "Kaley think kaley can come south and take over?", dhivehi: true },
            { text: "Addu different from Malé. Aharemen control here.", dhivehi: true },
            { text: "But... aharemen hear kaley good. Useful.", dhivehi: true },
            { text: "Work WITH aharemen. Not against. Understand?", dhivehi: true }
        ],
        choices: [
            { text: "What's the arrangement?", karma: 0, response: "shareef_deal" },
            { text: "Aharen don't work for anyone.", karma: -10, response: "shareef_refuse" },
            { text: "Aharen here to take over.", karma: -25, response: "shareef_challenge" }
        ]
    },
    
    shareef_deal: {
        speaker: "Don Shareef",
        sprite: "🎩",
        lines: [
            { text: "*smiles* Smart. Very smart.", dhivehi: false },
            { text: "Kaley run operations in Hithadhoo. 40% to aharemen.", dhivehi: true },
            { text: "Aharemen provide protection. Connections. Boats.", dhivehi: true },
            { text: "Don't betray aharemen. Last one who did...", dhivehi: true },
            { text: "*points to shark tank* ...is in there.", dhivehi: false }
        ]
    },
    
    shareef_refuse: {
        speaker: "Don Shareef",
        sprite: "🎩",
        lines: [
            { text: "*cold* Kaley refuse Don Shareef?", dhivehi: true },
            { text: "Bold. Stupid, but bold.", dhivehi: false },
            { text: "Kaley have one week. Then aharemen come for kaley.", dhivehi: true },
            { text: "Leave Addu... or die here.", dhivehi: false }
        ]
    },
    
    shareef_challenge: {
        speaker: "Don Shareef",
        sprite: "🎩",
        lines: [
            { text: "*laughs* Take over? TAKE OVER?!", dhivehi: true },
            { text: "Aharemen built this empire 20 years!", dhivehi: true },
            { text: "Kaley think kaley can just walk in?!", dhivehi: true },
            { text: "*stands* Guards! Show this Malé boy the door.", dhivehi: false },
            { text: "The hard way.", dhivehi: false }
        ]
    },
    
    thakuru_shark_meeting: {
        speaker: "Thakuru",
        sprite: "🦈",
        lines: [
            { text: "*on boat* Kaley know why they call me Thakuru?", dhivehi: true },
            { text: "Tiger shark. Aharemen swim with them.", dhivehi: true },
            { text: "Fuvahmulah people... aharemen different.", dhivehi: true },
            { text: "Aharemen own language. Own ways.", dhivehi: true },
            { text: "Kaley want to work here? Learn respect first.", dhivehi: true }
        ],
        choices: [
            { text: "Teach me your ways.", karma: 5, response: "thakuru_teach" },
            { text: "Business is business.", karma: -5, response: "thakuru_business" },
            { text: "Aharen just passing through.", karma: 0, response: "thakuru_pass" }
        ]
    },
    
    thakuru_teach: {
        speaker: "Thakuru",
        sprite: "🦈",
        lines: [
            { text: "*nods approvingly* Good answer.", dhivehi: false },
            { text: "First lesson: the sea. She gives, she takes.", dhivehi: true },
            { text: "Respect her. Respect the sharks.", dhivehi: true },
            { text: "Tomorrow, kaley dive with aharemen.", dhivehi: true },
            { text: "If kaley survive... kaley one of us.", dhivehi: true }
        ]
    },
    
    thakuru_business: {
        speaker: "Thakuru",
        sprite: "🦈",
        lines: [
            { text: "*frowns* Business? That's Malé thinking.", dhivehi: true },
            { text: "Here, everything connected. Family. Sea. Land.", dhivehi: true },
            { text: "Kaley want to do business? Fine.", dhivehi: false },
            { text: "But don't expect loyalty. Just transactions.", dhivehi: true }
        ]
    },
    
    thakuru_pass: {
        speaker: "Thakuru",
        sprite: "🦈",
        lines: [
            { text: "*shrugs* Passing through? Nobody passes through Fuvahmulah.", dhivehi: true },
            { text: "Kaley either stay... or kaley leave.", dhivehi: true },
            { text: "But kaley don't 'pass through'.", dhivehi: false },
            { text: "Decide. Now.", dhivehi: true }
        ]
    },
    
    britishali_airport_meeting: {
        speaker: "British Ali",
        sprite: "🎖️",
        lines: [
            { text: "*in British accent* Ah, the famous Baokalo!", dhivehi: false },
            { text: "Welcome to Gan. Former RAF base, you know.", dhivehi: false },
            { text: "My grandfather worked for the British. Learned their ways.", dhivehi: false },
            { text: "Now I run... import/export. Through the airport.", dhivehi: false },
            { text: "Kaley interested in partnership?", dhivehi: true }
        ]
    },
    
    aisha_fishing_lesson: {
        speaker: "Aisha Fulhu",
        sprite: "🎣",
        lines: [
            { text: "*on dhoni* Kaley want to learn real fishing?", dhivehi: true },
            { text: "Not this tourist nonsense. Real Maldivian way.", dhivehi: false },
            { text: "Pole and line. No nets. Sustainable.", dhivehi: false },
            { text: "Also... good cover for other cargo. Hehe.", dhivehi: true }
        ]
    }
};

// ==================== ACT 6 RADIO CONTENT ====================
const ACT6_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Addu City development continues. New causeway planned." },
            { type: "news", text: "Fuvahmulah airport expansion approved." },
            { type: "satire", text: "Southern atolls: 'We exist too!' - Residents" },
            { type: "news", text: "Gan resort reports record tourism numbers." },
            { type: "ad", text: "Visit Addu! Where the sun rises first in Maldives!" }
        ]
    },
    adduFM: {
        name: "📻 Addu FM",
        segments: [
            { type: "local", text: "Hithadhoo market prices: Tuna 45 rufiyaa/kg" },
            { type: "local", text: "Causeway traffic advisory: Expect delays" },
            { type: "music", text: "♪ Playing: Traditional Addu Boduberu ♪" },
            { type: "local", text: "Fuvahmulah ferry schedule changed due to weather" },
            { type: "satire", text: "Malé people confused by Addu Bas. 'What language is that?'" }
        ]
    }
};

// ==================== DIVING MINI-GAME ====================
let divingGame = {
    active: false,
    depth: 0,
    maxDepth: 30,
    oxygen: 100,
    treasures: [],
    sharks: [],
    collected: 0,
    playerY: 50
};

function startDivingGame() {
    divingGame.active = true;
    divingGame.depth = 0;
    divingGame.oxygen = 100;
    divingGame.collected = 0;
    divingGame.playerY = 50;
    divingGame.treasures = [];
    divingGame.sharks = [];
    GameState.isInMinigame = true;
    
    // Generate treasures
    for (let i = 0; i < 5; i++) {
        divingGame.treasures.push({
            x: 50 + Math.random() * 200,
            y: 100 + Math.random() * 150,
            collected: false
        });
    }
    
    // Generate sharks
    for (let i = 0; i < 3; i++) {
        divingGame.sharks.push({
            x: Math.random() * 300,
            y: 80 + Math.random() * 180,
            direction: Math.random() < 0.5 ? 1 : -1,
            speed: 1 + Math.random()
        });
    }
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🤿 Underwater Diving';
    
    document.addEventListener('keydown', divingKeyHandler);
    requestAnimationFrame(divingLoop);
}

function divingKeyHandler(e) {
    if (!divingGame.active) return;
    
    const speed = 5;
    if (e.key === 'ArrowUp' || e.key === 'w') {
        divingGame.playerY = Math.max(30, divingGame.playerY - speed);
        divingGame.depth = Math.max(0, divingGame.depth - 1);
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        divingGame.playerY = Math.min(250, divingGame.playerY + speed);
        divingGame.depth = Math.min(divingGame.maxDepth, divingGame.depth + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        // Move left (scroll world right)
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        // Move right (scroll world left)
    }
}

function divingLoop() {
    if (!divingGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Decrease oxygen based on depth
    divingGame.oxygen -= 0.1 + (divingGame.depth * 0.02);
    
    // Background gradient (deeper = darker)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0088cc');
    gradient.addColorStop(1, '#001133');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Oxygen bar
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, 120, 20);
    ctx.fillStyle = divingGame.oxygen > 30 ? '#00aaff' : '#ff0000';
    ctx.fillRect(10, 10, divingGame.oxygen * 1.2, 20);
    ctx.fillStyle = '#fff';
    ctx.font = '11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`O₂: ${Math.floor(divingGame.oxygen)}%`, 15, 24);
    
    // Depth meter
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    ctx.fillText(`Depth: ${divingGame.depth}m`, width - 10, 24);
    
    // Collected counter
    ctx.textAlign = 'center';
    ctx.fillText(`Treasures: ${divingGame.collected}/5`, width / 2, 24);
    
    // Draw treasures
    divingGame.treasures.forEach(t => {
        if (!t.collected) {
            ctx.font = '20px Arial';
            ctx.fillText('💎', t.x, t.y);
            
            // Check collection
            const dx = t.x - 150;
            const dy = t.y - divingGame.playerY;
            if (Math.sqrt(dx * dx + dy * dy) < 25) {
                t.collected = true;
                divingGame.collected++;
            }
        }
    });
    
    // Draw and move sharks
    divingGame.sharks.forEach(shark => {
        shark.x += shark.direction * shark.speed;
        if (shark.x < 0 || shark.x > width) shark.direction *= -1;
        
        ctx.font = '25px Arial';
        ctx.save();
        if (shark.direction < 0) {
            ctx.scale(-1, 1);
            ctx.fillText('🦈', -shark.x, shark.y);
        } else {
            ctx.fillText('🦈', shark.x, shark.y);
        }
        ctx.restore();
        
        // Check shark collision
        const dx = shark.x - 150;
        const dy = shark.y - divingGame.playerY;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
            divingGame.oxygen -= 20;
            shark.x = shark.direction > 0 ? 0 : width;
        }
    });
    
    // Draw player (diver)
    ctx.font = '30px Arial';
    ctx.fillText('🤿', 150, divingGame.playerY);
    
    // Bubbles effect
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
            140 + Math.random() * 20,
            divingGame.playerY - 20 - Math.random() * 30,
            2 + Math.random() * 3,
            0, Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
    }
    
    // Check win/lose
    if (divingGame.collected >= 5) {
        endDivingGame(true);
        return;
    }
    
    if (divingGame.oxygen <= 0) {
        endDivingGame(false);
        return;
    }
    
    // Instructions
    ctx.fillStyle = '#fff';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('↑↓ to dive | Collect treasures | Avoid sharks!', width / 2, height - 10);
    
    requestAnimationFrame(divingLoop);
}

function endDivingGame(success) {
    divingGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', divingKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (success) {
        GameState.player.money += 2000;
        showNotification('Dive Complete!', '+2000 faisaa in treasures');
        updateMissionObjective('dive', 'sharkPoint', true);
    } else {
        GameState.player.health -= 40;
        showNotification('Out of Oxygen!', 'Barely made it back...');
    }
}

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT6_MAPS = ACT6_MAPS;
    window.ACT6_CHARACTERS = ACT6_CHARACTERS;
    window.ACT6_MISSIONS = ACT6_MISSIONS;
    window.ACT6_SIDE_MISSIONS = ACT6_SIDE_MISSIONS;
    window.ACT6_DIALOGUES = ACT6_DIALOGUES;
    window.ACT6_RADIO = ACT6_RADIO;
    window.ADDU_GANGS = ADDU_GANGS;
    window.startDivingGame = startDivingGame;
}
