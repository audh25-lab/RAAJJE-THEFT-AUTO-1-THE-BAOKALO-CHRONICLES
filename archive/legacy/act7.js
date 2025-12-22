// ============================================
// ACT 7: RESORT WARS
// Timeline: 2021 - Infiltrating Paradise
// ============================================

// ==================== ACT 7 MAPS ====================
const ACT7_MAPS = {
    reethi_rah: {
        name: "One&Only Reethi Rah",
        width: 80,
        height: 70,
        spawnX: 40,
        spawnY: 60,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            jetty: { x: 35, y: 55, w: 10, h: 10, name: "Main Jetty 🚤" },
            reception: { x: 30, y: 45, w: 12, h: 8, name: "Grand Reception 🏛️" },
            overwater: { x: 50, y: 30, w: 20, h: 15, name: "Overwater Villas 🏠" },
            beach: { x: 10, y: 35, w: 18, h: 12, name: "Private Beach 🏖️" },
            spa: { x: 20, y: 20, w: 10, h: 8, name: "Luxury Spa 💆" },
            restaurant: { x: 40, y: 15, w: 12, h: 10, name: "Fine Dining 🍽️" },
            divingCenter: { x: 60, y: 45, w: 10, h: 8, name: "Diving Center 🤿" },
            staffQuarters: { x: 5, y: 5, w: 12, h: 10, name: "Staff Quarters 👷" },
            vipVilla: { x: 65, y: 10, w: 12, h: 12, name: "Presidential Villa 👑" }
        },
        isResort: true,
        luxuryLevel: 5
    },
    
    soneva_fushi: {
        name: "Soneva Fushi",
        width: 75,
        height: 65,
        spawnX: 37,
        spawnY: 55,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            arrival: { x: 30, y: 50, w: 14, h: 10, name: "Arrival Pavilion 🌴" },
            cinema: { x: 15, y: 35, w: 10, h: 8, name: "Open-Air Cinema 🎬" },
            observatory: { x: 55, y: 20, w: 10, h: 10, name: "Observatory 🔭" },
            jungle: { x: 25, y: 15, w: 20, h: 15, name: "Jungle Reserve 🌳" },
            beachVillas: { x: 45, y: 40, w: 18, h: 12, name: "Beach Villas 🏡" },
            underwaterRestaurant: { x: 10, y: 20, w: 12, h: 10, name: "Underwater Restaurant 🐠" },
            winecellar: { x: 35, y: 25, w: 8, h: 8, name: "Wine Cellar 🍷" },
            staffArea: { x: 60, y: 50, w: 10, h: 10, name: "Staff Area 👷" }
        },
        isResort: true,
        luxuryLevel: 5
    },
    
    budget_resort: {
        name: "Paradise Island Resort",
        width: 55,
        height: 50,
        spawnX: 27,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            lobby: { x: 22, y: 35, w: 10, h: 8, name: "Main Lobby 🏨" },
            pool: { x: 30, y: 25, w: 12, h: 10, name: "Swimming Pool 🏊" },
            buffet: { x: 15, y: 20, w: 10, h: 8, name: "Buffet Restaurant 🍴" },
            rooms: { x: 35, y: 15, w: 15, h: 12, name: "Guest Rooms 🛏️" },
            beach: { x: 5, y: 30, w: 12, h: 15, name: "Public Beach 🏖️" },
            watersports: { x: 45, y: 35, w: 8, h: 8, name: "Water Sports 🚣" }
        },
        isResort: true,
        luxuryLevel: 3
    },
    
    seaplane_base: {
        name: "Trans Maldivian Airways Base",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            terminal: { x: 18, y: 30, w: 14, h: 10, name: "Seaplane Terminal ✈️" },
            hangar: { x: 30, y: 15, w: 15, h: 12, name: "Maintenance Hangar 🔧" },
            dock: { x: 10, y: 35, w: 10, h: 8, name: "Seaplane Dock 🛩️" },
            lounge: { x: 35, y: 30, w: 10, h: 8, name: "VIP Lounge 🛋️" },
            cargo: { x: 5, y: 15, w: 12, h: 10, name: "Cargo Area 📦" }
        },
        hasSeaplanes: true
    },
    
    underwater_cache: {
        name: "Underwater Treasure Site",
        width: 40,
        height: 35,
        spawnX: 20,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            shallows: { x: 15, y: 25, w: 10, h: 8, name: "Shallow Reef 🐠" },
            deepReef: { x: 10, y: 15, w: 12, h: 10, name: "Deep Reef 🪸" },
            shipwreck: { x: 25, y: 10, w: 10, h: 8, name: "Shipwreck 🚢" },
            cave: { x: 5, y: 5, w: 8, h: 8, name: "Underwater Cave 🕳️" }
        },
        isUnderwater: true
    }
};

// ==================== ACT 7 CHARACTERS ====================
const ACT7_CHARACTERS = {
    rishbe: {
        name: "Rishbe",
        sprite: "📸",
        role: "Instagram Influencer",
        backstory: "500K followers. Sells 'Maldives lifestyle' to tourists. Secret drug courier using resort connections.",
        dialogues: {
            first_meeting: {
                speaker: "Rishbe",
                sprite: "📸",
                lines: [
                    { text: "*taking selfie* OMG hi! Kaley must be the new... staff?", dhivehi: true },
                    { text: "Wait... kaley not staff. Kaley have that... look.", dhivehi: true },
                    { text: "Aharen know everyone in Maldives resorts. EVERYONE.", dhivehi: true },
                    { text: "Kaley want to make real money? Not resort salary.", dhivehi: true },
                    { text: "Rich tourists... they want more than sunset photos. 😏", dhivehi: true }
                ],
                choices: [
                    { text: "What kind of business?", karma: 0, response: "rishbe_business" },
                    { text: "Aharen not interested in tourist scams.", karma: 5, response: "rishbe_refuse" },
                    { text: "How much money we talking?", karma: -5, response: "rishbe_money" }
                ]
            }
        }
    },
    
    shalube: {
        name: "Shalube",
        sprite: "🎭",
        role: "TikTok Star / Party Host",
        backstory: "1M followers. Hosts exclusive yacht parties. Front for money laundering operations.",
        dialogues: {
            yacht_party: {
                speaker: "Shalube",
                sprite: "🎭",
                lines: [
                    { text: "*on yacht* Welcome to the REAL Maldives, baby!", dhivehi: false },
                    { text: "Forget those boring resorts. This is where money flows.", dhivehi: true },
                    { text: "Aharen host parties for... special guests.", dhivehi: true },
                    { text: "Politicians. Businessmen. People who need to... relax.", dhivehi: true },
                    { text: "Kaley look like someone who can provide... security.", dhivehi: true }
                ]
            }
        }
    },
    
    resortManager: {
        name: "Mr. Ahmed",
        sprite: "👔",
        role: "Resort General Manager",
        backstory: "Runs One&Only. Knows about illegal activities but turns blind eye for kickbacks.",
        dialogues: {
            manager_meeting: {
                speaker: "Mr. Ahmed",
                sprite: "👔",
                lines: [
                    { text: "*in office* Kaley the new... consultant?", dhivehi: true },
                    { text: "Aharen run this resort 15 years. Aharen know everything.", dhivehi: true },
                    { text: "What happens in the villas... stays in the villas.", dhivehi: true },
                    { text: "But some guests... they need special services.", dhivehi: true },
                    { text: "Kaley understand? Good. Here's kaley first assignment.", dhivehi: true }
                ]
            }
        }
    },
    
    russianOligarch: {
        name: "Viktor Petrov",
        sprite: "🎰",
        role: "Russian Oligarch",
        backstory: "Hiding money in Maldives. Rents entire resort wings. Major target for heist.",
        dialogues: {
            oligarch_meeting: {
                speaker: "Viktor Petrov",
                sprite: "🎰",
                lines: [
                    { text: "*heavy accent* You are the local... fixer?", dhivehi: false },
                    { text: "I need things done. Quietly. No questions.", dhivehi: false },
                    { text: "Money is not problem. Discretion is everything.", dhivehi: false },
                    { text: "You help me, I help you. Russian way.", dhivehi: false }
                ]
            }
        }
    },
    
    diveMaster: {
        name: "Hussain 'Deep' Rasheed",
        sprite: "🤿",
        role: "Dive Master / Smuggler",
        backstory: "Best diver in Maldives. Uses diving trips as cover for underwater smuggling.",
        dialogues: {
            dive_intro: {
                speaker: "Deep Hussain",
                sprite: "🤿",
                lines: [
                    { text: "*checking gear* Kaley want to see real Maldives?", dhivehi: true },
                    { text: "Not this resort fakeness. The underwater world.", dhivehi: true },
                    { text: "Aharen know every reef, every cave, every... hiding spot.", dhivehi: true },
                    { text: "Some things better hidden underwater. Kaley understand?", dhivehi: true }
                ]
            }
        }
    },
    
    seaplanePilot: {
        name: "Captain Nazim",
        sprite: "✈️",
        role: "Seaplane Pilot",
        backstory: "Ex-military pilot. Now flies tourists... and contraband between islands.",
        dialogues: {
            pilot_intro: {
                speaker: "Captain Nazim",
                sprite: "✈️",
                lines: [
                    { text: "*in cockpit* Beautiful day for flying, no?", dhivehi: true },
                    { text: "Aharen fly these waters 20 years. Know every island.", dhivehi: true },
                    { text: "Some islands... not on tourist maps.", dhivehi: true },
                    { text: "Kaley need fast transport? No questions? Aharen your man.", dhivehi: true }
                ]
            }
        }
    }
};

// ==================== ACT 7 MISSIONS ====================
const ACT7_MISSIONS = [
    {
        id: "act7_m1",
        title: "Paradise Arrival",
        type: "story",
        description: "Arrive at One&Only Reethi Rah undercover",
        objectives: [
            { type: "travel", target: "reethi_rah", current: false },
            { type: "trigger", target: "resortArrival", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "resort_arrival",
        unlocks: ["act7_m2"]
    },
    {
        id: "act7_m2",
        title: "The Influencer",
        type: "story",
        description: "Meet Rishbe at the beach",
        objectives: [
            { type: "travel", target: "beach", current: false },
            { type: "trigger", target: "rishbeMeeting", current: false }
        ],
        rewards: { money: 300 },
        dialogueStart: "rishbe_first_meeting",
        unlocks: ["act7_m3"],
        moralChoice: true
    },
    {
        id: "act7_m3",
        title: "Tourist Trap",
        type: "delivery",
        description: "Deliver 'special package' to VIP villa",
        objectives: [
            { type: "collect", target: "package", current: false },
            { type: "deliver", target: "vipVilla", current: false },
            { type: "avoid", target: "security", current: false }
        ],
        rewards: { money: 2000, karma: -10 },
        unlocks: ["act7_m4"]
    },
    {
        id: "act7_m4",
        title: "Deep Dive",
        type: "diving",
        description: "Learn diving from Deep Hussain",
        objectives: [
            { type: "talk", target: "deepHussain", current: false },
            { type: "minigame", target: "diving", score: 300, current: 0 }
        ],
        rewards: { money: 800 },
        dialogueStart: "deep_dive_intro",
        unlocks: ["act7_m5", "act7_m6"]
    },
    {
        id: "act7_m5",
        title: "Underwater Cache",
        type: "diving",
        description: "Retrieve hidden cargo from shipwreck",
        objectives: [
            { type: "travel", target: "underwater_cache", current: false },
            { type: "dive", target: "shipwreck", current: false },
            { type: "collect", target: "cargo", count: 3, current: 0 },
            { type: "surface", target: "boat", current: false }
        ],
        rewards: { money: 5000 },
        unlocks: ["act7_m7"],
        minigame: "advancedDiving"
    },
    {
        id: "act7_m6",
        title: "Yacht Party",
        type: "story",
        description: "Attend Shalube's exclusive yacht party",
        objectives: [
            { type: "travel", target: "jetty", current: false },
            { type: "trigger", target: "yachtParty", current: false },
            { type: "mingle", target: "vipGuests", count: 3, current: 0 }
        ],
        rewards: { money: 1000 },
        dialogueStart: "shalube_yacht_party",
        unlocks: ["act7_m7"]
    },
    {
        id: "act7_m7",
        title: "The Russian",
        type: "story",
        description: "Meet Viktor Petrov at his villa",
        objectives: [
            { type: "travel", target: "vipVilla", current: false },
            { type: "trigger", target: "viktorMeeting", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "oligarch_meeting",
        unlocks: ["act7_m8"],
        moralChoice: true
    },
    {
        id: "act7_m8",
        title: "Oligarch's Errand",
        type: "delivery",
        description: "Transport Viktor's 'documents' to Soneva",
        objectives: [
            { type: "collect", target: "documents", current: false },
            { type: "travel", target: "seaplane_base", current: false },
            { type: "fly", target: "soneva_fushi", current: false },
            { type: "deliver", target: "contact", current: false }
        ],
        rewards: { money: 8000, karma: -15 },
        unlocks: ["act7_m9"],
        vehicleRequired: "seaplane"
    },
    {
        id: "act7_m9",
        title: "Wings of Paradise",
        type: "story",
        description: "Learn to fly seaplanes from Captain Nazim",
        objectives: [
            { type: "talk", target: "captainNazim", current: false },
            { type: "minigame", target: "seaplaneFlight", score: 500, current: 0 }
        ],
        rewards: { money: 1000, skill: { piloting: 20 } },
        dialogueStart: "pilot_intro",
        unlocks: ["act7_m10"]
    },
    {
        id: "act7_m10",
        title: "Resort Heist Planning",
        type: "heist",
        description: "Plan the big resort heist",
        objectives: [
            { type: "scout", target: "reethi_rah", current: false },
            { type: "recruit", target: "crew", count: 3, current: 0 },
            { type: "plan", target: "heistApproach", current: false }
        ],
        rewards: { money: 2000 },
        unlocks: ["act7_m11"],
        heistPlanning: true
    },
    {
        id: "act7_m11",
        title: "The Big Score",
        type: "heist",
        description: "Execute the resort heist",
        objectives: [
            { type: "infiltrate", target: "vipVilla", current: false },
            { type: "steal", target: "safe", current: false },
            { type: "escape", target: "seaplane", current: false }
        ],
        rewards: { money: 50000, karma: -25 },
        unlocks: ["act7_m12"],
        heistExecution: true
    },
    {
        id: "act7_m12",
        title: "Betrayal at Sea",
        type: "combat",
        description: "Someone tipped off Viktor - fight your way out",
        objectives: [
            { type: "survive", target: "ambush", current: false },
            { type: "defeat", target: "mercenary", count: 12, current: 0 },
            { type: "escape", target: "speedboat", current: false }
        ],
        rewards: { money: 5000 },
        unlocks: ["act7_climax"]
    },
    {
        id: "act7_climax",
        title: "Paradise Lost",
        type: "boss",
        description: "Confront the traitor and secure your escape",
        objectives: [
            { type: "chase", target: "traitor", current: false },
            { type: "boss", target: "viktorGuard", current: false },
            { type: "decide", target: "resortFate", current: false }
        ],
        rewards: { money: 20000 },
        unlocks: ["act8_start"],
        actEnd: true,
        bossMusic: true,
        majorChoice: "resort_ending"
    }
];

// ==================== ACT 7 SIDE MISSIONS ====================
const ACT7_SIDE_MISSIONS = [
    { id: "side7_photo1", title: "Instagram Shoot I", type: "photography", reward: 400 },
    { id: "side7_photo2", title: "Instagram Shoot II", type: "photography", reward: 600 },
    { id: "side7_dive1", title: "Reef Exploration", type: "diving", reward: 500 },
    { id: "side7_dive2", title: "Night Dive", type: "diving", reward: 800 },
    { id: "side7_dive3", title: "Cave Dive", type: "diving", reward: 1200 },
    { id: "side7_delivery1", title: "VIP Delivery I", type: "delivery", reward: 600 },
    { id: "side7_delivery2", title: "VIP Delivery II", type: "delivery", reward: 900 },
    { id: "side7_party1", title: "Party Security I", type: "security", reward: 700 },
    { id: "side7_party2", title: "Party Security II", type: "security", reward: 1000 },
    { id: "side7_flight1", title: "Seaplane Taxi I", type: "flying", reward: 800 },
    { id: "side7_flight2", title: "Seaplane Taxi II", type: "flying", reward: 1200 },
    { id: "side7_smuggle", title: "Resort Smuggling", type: "smuggling", reward: 1500 }
];

// ==================== ACT 7 DIALOGUES ====================
const ACT7_DIALOGUES = {
    resort_arrival: {
        speaker: "Resort Staff",
        sprite: "👔",
        lines: [
            { text: "Welcome to One&Only Reethi Rah, sir.", dhivehi: false },
            { text: "Kaley reservation is confirmed. Villa 23.", dhivehi: true },
            { text: "If kaley need anything... ANYTHING... just call.", dhivehi: true },
            { text: "*whispers* Mr. Ahmed wants to see kaley. Staff quarters.", dhivehi: true }
        ]
    },
    
    rishbe_first_meeting: {
        speaker: "Rishbe",
        sprite: "📸",
        lines: [
            { text: "*taking selfie* OMG hi! Kaley must be the new... staff?", dhivehi: true },
            { text: "Wait... kaley not staff. Kaley have that... look.", dhivehi: true },
            { text: "Aharen know everyone in Maldives resorts. EVERYONE.", dhivehi: true },
            { text: "Kaley want to make real money? Not resort salary.", dhivehi: true },
            { text: "Rich tourists... they want more than sunset photos. 😏", dhivehi: true }
        ],
        choices: [
            { text: "What kind of business?", karma: 0, response: "rishbe_business" },
            { text: "Aharen not interested in tourist scams.", karma: 5, response: "rishbe_refuse" },
            { text: "How much money we talking?", karma: -5, response: "rishbe_money" }
        ]
    },
    
    rishbe_business: {
        speaker: "Rishbe",
        sprite: "📸",
        lines: [
            { text: "*looks around* Okay, listen...", dhivehi: true },
            { text: "These tourists? They pay $2000 a night.", dhivehi: false },
            { text: "But they want... experiences. Special ones.", dhivehi: true },
            { text: "Aharen connect them. Kaley deliver. We split.", dhivehi: true },
            { text: "Easy money. No violence. Just... hospitality. 😉", dhivehi: true }
        ]
    },
    
    rishbe_refuse: {
        speaker: "Rishbe",
        sprite: "📸",
        lines: [
            { text: "*laughs* Tourist scams? Kaley so naive!", dhivehi: true },
            { text: "This is business. High-end business.", dhivehi: false },
            { text: "But okay... kaley loss.", dhivehi: true },
            { text: "When kaley change mind... find aharen at the spa.", dhivehi: true }
        ]
    },
    
    rishbe_money: {
        speaker: "Rishbe",
        sprite: "📸",
        lines: [
            { text: "*grins* NOW kaley speaking my language!", dhivehi: true },
            { text: "Last month? Aharen made 50,000 dollars.", dhivehi: false },
            { text: "Just from... connecting people.", dhivehi: true },
            { text: "Kaley in? Good. First job tonight.", dhivehi: true }
        ]
    },
    
    shalube_yacht_party: {
        speaker: "Shalube",
        sprite: "🎭",
        lines: [
            { text: "*on yacht* Welcome to the REAL Maldives, baby!", dhivehi: false },
            { text: "Forget those boring resorts. This is where money flows.", dhivehi: true },
            { text: "Aharen host parties for... special guests.", dhivehi: true },
            { text: "Politicians. Businessmen. People who need to... relax.", dhivehi: true },
            { text: "Kaley look like someone who can provide... security.", dhivehi: true }
        ]
    },
    
    deep_dive_intro: {
        speaker: "Deep Hussain",
        sprite: "🤿",
        lines: [
            { text: "*checking gear* Kaley want to see real Maldives?", dhivehi: true },
            { text: "Not this resort fakeness. The underwater world.", dhivehi: true },
            { text: "Aharen know every reef, every cave, every... hiding spot.", dhivehi: true },
            { text: "Some things better hidden underwater. Kaley understand?", dhivehi: true },
            { text: "First lesson: breathing. Control. Then we go deep.", dhivehi: true }
        ]
    },
    
    oligarch_meeting: {
        speaker: "Viktor Petrov",
        sprite: "🎰",
        lines: [
            { text: "*heavy accent* You are the local... fixer?", dhivehi: false },
            { text: "I need things done. Quietly. No questions.", dhivehi: false },
            { text: "Money is not problem. Discretion is everything.", dhivehi: false },
            { text: "You help me, I help you. Russian way.", dhivehi: false }
        ],
        choices: [
            { text: "What do you need?", karma: -5, response: "viktor_job" },
            { text: "Aharen don't work for foreigners.", karma: 5, response: "viktor_refuse" },
            { text: "How much are we talking?", karma: -10, response: "viktor_money" }
        ]
    },
    
    viktor_job: {
        speaker: "Viktor Petrov",
        sprite: "🎰",
        lines: [
            { text: "*nods* Good. Smart man.", dhivehi: false },
            { text: "I have... documents. Need to reach Soneva Fushi.", dhivehi: false },
            { text: "No customs. No questions. You understand?", dhivehi: false },
            { text: "50,000 dollars. Half now, half after.", dhivehi: false }
        ]
    },
    
    viktor_refuse: {
        speaker: "Viktor Petrov",
        sprite: "🎰",
        lines: [
            { text: "*laughs coldly* Foreigner? I own half this resort.", dhivehi: false },
            { text: "Your president? He calls ME for loans.", dhivehi: false },
            { text: "Think carefully before refusing Viktor Petrov.", dhivehi: false },
            { text: "Door is there. Use it wisely.", dhivehi: false }
        ]
    },
    
    viktor_money: {
        speaker: "Viktor Petrov",
        sprite: "🎰",
        lines: [
            { text: "*smiles* Ah, businessman. I like.", dhivehi: false },
            { text: "100,000 dollars. One job. No questions.", dhivehi: false },
            { text: "But if you fail... or talk...", dhivehi: false },
            { text: "*gestures to guards* ...my friends here handle problems.", dhivehi: false }
        ]
    },
    
    pilot_intro: {
        speaker: "Captain Nazim",
        sprite: "✈️",
        lines: [
            { text: "*in cockpit* Beautiful day for flying, no?", dhivehi: true },
            { text: "Aharen fly these waters 20 years. Know every island.", dhivehi: true },
            { text: "Some islands... not on tourist maps.", dhivehi: true },
            { text: "Kaley need fast transport? No questions? Aharen your man.", dhivehi: true },
            { text: "First, kaley learn basics. Then we fly for real.", dhivehi: true }
        ]
    },
    
    manager_meeting: {
        speaker: "Mr. Ahmed",
        sprite: "👔",
        lines: [
            { text: "*in office* Kaley the new... consultant?", dhivehi: true },
            { text: "Aharen run this resort 15 years. Aharen know everything.", dhivehi: true },
            { text: "What happens in the villas... stays in the villas.", dhivehi: true },
            { text: "But some guests... they need special services.", dhivehi: true },
            { text: "Kaley understand? Good. Here's kaley first assignment.", dhivehi: true }
        ]
    }
};

// ==================== ACT 7 RADIO CONTENT ====================
const ACT7_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Tourism numbers hit record high. 2 million visitors expected." },
            { type: "news", text: "New luxury resort opens in Baa Atoll." },
            { type: "satire", text: "Resort workers: 'We see things. We say nothing.'" },
            { type: "ad", text: "Visit Maldives! Where your secrets stay secret!" },
            { type: "news", text: "Russian investment in Maldives tourism increases 300%." }
        ]
    },
    resortFM: {
        name: "📻 Resort FM",
        segments: [
            { type: "music", text: "♪ Playing: Smooth Jazz for Paradise ♪" },
            { type: "ad", text: "Spa treatments starting at only $500!" },
            { type: "info", text: "Tonight's sunset cruise departs at 5:30 PM" },
            { type: "music", text: "♪ Playing: Tropical House Mix ♪" },
            { type: "ad", text: "Private dining on the beach. Reserve now." }
        ]
    }
};

// ==================== SEAPLANE MINI-GAME ====================
let seaplaneGame = {
    active: false,
    x: 200,
    y: 150,
    speed: 0,
    altitude: 100,
    fuel: 100,
    destination: { x: 350, y: 100 },
    obstacles: [],
    score: 0
};

function startSeaplaneGame() {
    seaplaneGame.active = true;
    seaplaneGame.x = 50;
    seaplaneGame.y = 150;
    seaplaneGame.speed = 2;
    seaplaneGame.altitude = 100;
    seaplaneGame.fuel = 100;
    seaplaneGame.score = 0;
    seaplaneGame.obstacles = [];
    GameState.isInMinigame = true;
    
    // Generate clouds/obstacles
    for (let i = 0; i < 5; i++) {
        seaplaneGame.obstacles.push({
            x: 150 + i * 80,
            y: 50 + Math.random() * 150,
            type: Math.random() < 0.3 ? 'storm' : 'cloud'
        });
    }
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '✈️ Seaplane Flight';
    
    document.addEventListener('keydown', seaplaneKeyHandler);
    requestAnimationFrame(seaplaneLoop);
}

function seaplaneKeyHandler(e) {
    if (!seaplaneGame.active) return;
    
    if (e.key === 'ArrowUp' || e.key === 'w') {
        seaplaneGame.y = Math.max(20, seaplaneGame.y - 5);
        seaplaneGame.altitude = Math.min(200, seaplaneGame.altitude + 5);
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        seaplaneGame.y = Math.min(250, seaplaneGame.y + 5);
        seaplaneGame.altitude = Math.max(0, seaplaneGame.altitude - 5);
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        seaplaneGame.speed = Math.min(5, seaplaneGame.speed + 0.5);
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        seaplaneGame.speed = Math.max(1, seaplaneGame.speed - 0.5);
    }
}

function seaplaneLoop() {
    if (!seaplaneGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Move plane
    seaplaneGame.x += seaplaneGame.speed;
    seaplaneGame.fuel -= 0.1;
    seaplaneGame.score += seaplaneGame.speed;
    
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.7, '#E0F6FF');
    gradient.addColorStop(1, '#0066aa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Ocean
    ctx.fillStyle = '#0077aa';
    ctx.fillRect(0, height - 50, width, 50);
    
    // Islands (background)
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.ellipse(100, height - 45, 30, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(300, height - 45, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw and move obstacles
    seaplaneGame.obstacles.forEach(obs => {
        obs.x -= seaplaneGame.speed * 0.5;
        if (obs.x < -50) obs.x = width + 50;
        
        if (obs.type === 'storm') {
            ctx.fillStyle = '#555';
            ctx.font = '30px Arial';
            ctx.fillText('⛈️', obs.x, obs.y);
            
            // Storm collision
            const dx = obs.x - seaplaneGame.x;
            const dy = obs.y - seaplaneGame.y;
            if (Math.sqrt(dx * dx + dy * dy) < 30) {
                seaplaneGame.fuel -= 5;
                seaplaneGame.y += (Math.random() - 0.5) * 20;
            }
        } else {
            ctx.fillStyle = '#fff';
            ctx.font = '25px Arial';
            ctx.fillText('☁️', obs.x, obs.y);
        }
    });
    
    // Draw seaplane
    ctx.font = '35px Arial';
    ctx.fillText('🛩️', seaplaneGame.x, seaplaneGame.y);
    
    // HUD
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, 120, 20);
    ctx.fillStyle = seaplaneGame.fuel > 30 ? '#00aa00' : '#ff0000';
    ctx.fillRect(10, 10, seaplaneGame.fuel * 1.2, 20);
    ctx.fillStyle = '#fff';
    ctx.font = '11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Fuel: ${Math.floor(seaplaneGame.fuel)}%`, 15, 24);
    
    ctx.textAlign = 'right';
    ctx.fillText(`Altitude: ${Math.floor(seaplaneGame.altitude)}m`, width - 10, 24);
    ctx.fillText(`Speed: ${seaplaneGame.speed.toFixed(1)}`, width - 10, 40);
    
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${Math.floor(seaplaneGame.score)}`, width / 2, 24);
    
    // Destination marker
    if (seaplaneGame.x > 300) {
        ctx.fillStyle = '#00ff00';
        ctx.font = '20px Arial';
        ctx.fillText('🏝️', 380, height - 60);
        ctx.font = '10px Arial';
        ctx.fillText('DESTINATION', 380, height - 40);
    }
    
    // Check win/lose
    if (seaplaneGame.x >= 380 && seaplaneGame.y > height - 80) {
        endSeaplaneGame(true);
        return;
    }
    
    if (seaplaneGame.fuel <= 0 || seaplaneGame.y >= height - 30) {
        endSeaplaneGame(false);
        return;
    }
    
    // Instructions
    ctx.fillStyle = '#333';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('↑↓ altitude | ←→ speed | Land at destination island!', width / 2, height - 10);
    
    requestAnimationFrame(seaplaneLoop);
}

function endSeaplaneGame(success) {
    seaplaneGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', seaplaneKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (success) {
        GameState.player.money += 3000;
        GameState.player.skills.piloting = (GameState.player.skills.piloting || 0) + 10;
        showNotification('Flight Complete!', '+3000 faisaa, +10 Piloting');
    } else {
        GameState.player.health -= 30;
        showNotification('Crash Landing!', 'Lost fuel or crashed into ocean');
    }
}

// ==================== ADVANCED DIVING MINI-GAME ====================
let advancedDivingGame = {
    active: false,
    depth: 0,
    maxDepth: 50,
    oxygen: 100,
    nitrogen: 0,
    treasures: [],
    hazards: [],
    collected: 0,
    playerX: 150,
    playerY: 50,
    targetTreasures: 3
};

function startAdvancedDivingGame() {
    advancedDivingGame.active = true;
    advancedDivingGame.depth = 0;
    advancedDivingGame.oxygen = 100;
    advancedDivingGame.nitrogen = 0;
    advancedDivingGame.collected = 0;
    advancedDivingGame.playerX = 150;
    advancedDivingGame.playerY = 50;
    advancedDivingGame.treasures = [];
    advancedDivingGame.hazards = [];
    GameState.isInMinigame = true;
    
    // Generate treasures (deeper = more valuable)
    for (let i = 0; i < 5; i++) {
        advancedDivingGame.treasures.push({
            x: 50 + Math.random() * 300,
            y: 100 + i * 40,
            value: (i + 1) * 1000,
            collected: false,
            type: i < 2 ? '💎' : (i < 4 ? '📦' : '💰')
        });
    }
    
    // Generate hazards
    for (let i = 0; i < 4; i++) {
        advancedDivingGame.hazards.push({
            x: Math.random() * 350,
            y: 80 + Math.random() * 180,
            type: Math.random() < 0.5 ? 'shark' : 'jellyfish',
            direction: Math.random() < 0.5 ? 1 : -1,
            speed: 1 + Math.random()
        });
    }
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🤿 Deep Dive - Shipwreck';
    
    document.addEventListener('keydown', advancedDivingKeyHandler);
    requestAnimationFrame(advancedDivingLoop);
}

function advancedDivingKeyHandler(e) {
    if (!advancedDivingGame.active) return;
    
    const speed = 5;
    if (e.key === 'ArrowUp' || e.key === 'w') {
        advancedDivingGame.playerY = Math.max(30, advancedDivingGame.playerY - speed);
        advancedDivingGame.depth = Math.max(0, advancedDivingGame.depth - 2);
        advancedDivingGame.nitrogen = Math.max(0, advancedDivingGame.nitrogen - 1);
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        advancedDivingGame.playerY = Math.min(280, advancedDivingGame.playerY + speed);
        advancedDivingGame.depth = Math.min(advancedDivingGame.maxDepth, advancedDivingGame.depth + 2);
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        advancedDivingGame.playerX = Math.max(20, advancedDivingGame.playerX - speed);
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        advancedDivingGame.playerX = Math.min(380, advancedDivingGame.playerX + speed);
    }
}

function advancedDivingLoop() {
    if (!advancedDivingGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Oxygen decreases faster at depth
    advancedDivingGame.oxygen -= 0.1 + (advancedDivingGame.depth * 0.01);
    // Nitrogen builds up at depth
    if (advancedDivingGame.depth > 20) {
        advancedDivingGame.nitrogen += 0.2;
    }
    
    // Background gradient (deeper = darker)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0099cc');
    gradient.addColorStop(0.5, '#006699');
    gradient.addColorStop(1, '#001133');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Shipwreck at bottom
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(100, 250, 200, 40);
    ctx.font = '30px Arial';
    ctx.fillText('🚢', 180, 275);
    
    // Coral/reef decorations
    ctx.font = '20px Arial';
    ctx.fillText('🪸', 50, 280);
    ctx.fillText('🪸', 320, 270);
    ctx.fillText('🐚', 150, 290);
    
    // Oxygen bar
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, 100, 15);
    ctx.fillStyle = advancedDivingGame.oxygen > 30 ? '#00aaff' : '#ff0000';
    ctx.fillRect(10, 10, advancedDivingGame.oxygen, 15);
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`O₂: ${Math.floor(advancedDivingGame.oxygen)}%`, 15, 22);
    
    // Nitrogen bar (decompression sickness risk)
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 28, 100, 15);
    ctx.fillStyle = advancedDivingGame.nitrogen < 50 ? '#ffaa00' : '#ff0000';
    ctx.fillRect(10, 28, advancedDivingGame.nitrogen, 15);
    ctx.fillText(`N₂: ${Math.floor(advancedDivingGame.nitrogen)}%`, 15, 40);
    
    // Depth meter
    ctx.textAlign = 'right';
    ctx.fillText(`Depth: ${advancedDivingGame.depth}m`, width - 10, 22);
    
    // Collected counter
    ctx.textAlign = 'center';
    ctx.fillText(`Cargo: ${advancedDivingGame.collected}/${advancedDivingGame.targetTreasures}`, width / 2, 22);
    
    // Draw treasures
    advancedDivingGame.treasures.forEach(t => {
        if (!t.collected) {
            ctx.font = '20px Arial';
            ctx.fillText(t.type, t.x, t.y);
            
            // Check collection
            const dx = t.x - advancedDivingGame.playerX;
            const dy = t.y - advancedDivingGame.playerY;
            if (Math.sqrt(dx * dx + dy * dy) < 25) {
                t.collected = true;
                advancedDivingGame.collected++;
                GameState.player.money += t.value;
            }
        }
    });
    
    // Draw and move hazards
    advancedDivingGame.hazards.forEach(h => {
        h.x += h.direction * h.speed;
        if (h.x < 0 || h.x > width) h.direction *= -1;
        
        ctx.font = '25px Arial';
        if (h.type === 'shark') {
            ctx.save();
            if (h.direction < 0) {
                ctx.scale(-1, 1);
                ctx.fillText('🦈', -h.x, h.y);
            } else {
                ctx.fillText('🦈', h.x, h.y);
            }
            ctx.restore();
        } else {
            ctx.fillText('🎐', h.x, h.y); // Jellyfish
        }
        
        // Check collision
        const dx = h.x - advancedDivingGame.playerX;
        const dy = h.y - advancedDivingGame.playerY;
        if (Math.sqrt(dx * dx + dy * dy) < 25) {
            if (h.type === 'shark') {
                advancedDivingGame.oxygen -= 15;
            } else {
                advancedDivingGame.oxygen -= 5;
                advancedDivingGame.nitrogen += 10;
            }
            h.x = h.direction > 0 ? 0 : width;
        }
    });
    
    // Draw player (diver)
    ctx.font = '30px Arial';
    ctx.fillText('🤿', advancedDivingGame.playerX, advancedDivingGame.playerY);
    
    // Bubbles
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
            advancedDivingGame.playerX - 10 + Math.random() * 20,
            advancedDivingGame.playerY - 20 - Math.random() * 30,
            2 + Math.random() * 3,
            0, Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
    }
    
    // Check win/lose
    if (advancedDivingGame.collected >= advancedDivingGame.targetTreasures && advancedDivingGame.playerY < 50) {
        endAdvancedDivingGame(true);
        return;
    }
    
    if (advancedDivingGame.oxygen <= 0) {
        endAdvancedDivingGame(false, 'oxygen');
        return;
    }
    
    if (advancedDivingGame.nitrogen >= 100) {
        endAdvancedDivingGame(false, 'nitrogen');
        return;
    }
    
    // Instructions
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('WASD to move | Collect cargo | Return to surface to win!', width / 2, height - 10);
    if (advancedDivingGame.collected >= advancedDivingGame.targetTreasures) {
        ctx.fillStyle = '#00ff00';
        ctx.fillText('✓ Cargo collected! Return to surface!', width / 2, height - 25);
    }
    
    requestAnimationFrame(advancedDivingLoop);
}

function endAdvancedDivingGame(success, failReason) {
    advancedDivingGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', advancedDivingKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (success) {
        showNotification('Dive Complete!', `Retrieved ${advancedDivingGame.collected} cargo items!`);
        updateMissionObjective('dive', 'shipwreck', true);
    } else {
        GameState.player.health -= 50;
        if (failReason === 'nitrogen') {
            showNotification('Decompression Sickness!', 'Ascended too fast with high nitrogen!');
        } else {
            showNotification('Out of Oxygen!', 'Barely made it back alive...');
        }
    }
}

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT7_MAPS = ACT7_MAPS;
    window.ACT7_CHARACTERS = ACT7_CHARACTERS;
    window.ACT7_MISSIONS = ACT7_MISSIONS;
    window.ACT7_SIDE_MISSIONS = ACT7_SIDE_MISSIONS;
    window.ACT7_DIALOGUES = ACT7_DIALOGUES;
    window.ACT7_RADIO = ACT7_RADIO;
    window.startSeaplaneGame = startSeaplaneGame;
    window.startAdvancedDivingGame = startAdvancedDivingGame;
}
