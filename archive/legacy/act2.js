// ============================================
// ACT 2: MALÉ CORE WARS
// Timeline: 2016 - Baokalo rises in gang hierarchy
// ============================================

// ==================== ACT 2 MAPS ====================
const ACT2_MAPS = {
    male_henveiru: {
        name: "Henveiru District, Malé",
        width: 60,
        height: 50,
        spawnX: 10,
        spawnY: 25,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            kudaTurf: { x: 25, y: 15, w: 20, h: 20, name: "Kuda Henveiru Territory ⚠️" },
            sultanPark: { x: 5, y: 5, w: 15, h: 12, name: "Sultan Park 🌳" },
            mosque: { x: 45, y: 10, w: 10, h: 10, name: "Friday Mosque 🕌" },
            drugDen: { x: 50, y: 35, w: 8, h: 8, name: "Drug Den 💊" }
        },
        gangTerritory: "Kuda Henveiru",
        enemyGangs: ["kudaHenveiru", "masodi"]
    },
    
    male_galolhu: {
        name: "Galolhu District, Malé",
        width: 55,
        height: 45,
        spawnX: 30,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            parliament: { x: 20, y: 10, w: 15, h: 12, name: "People's Majlis 🏛️" },
            presidentialPalace: { x: 5, y: 5, w: 12, h: 10, name: "Presidential Palace 🏰" },
            maleSharksHQ: { x: 40, y: 25, w: 10, h: 10, name: "Malé Sharks HQ 🦈" },
            rippooTeaShop: { x: 25, y: 35, w: 8, h: 6, name: "Rippoo's Tea Shop ☕" }
        },
        gangTerritory: "Malé Sharks",
        politicalZone: true
    },
    
    male_machchangolhi: {
        name: "Machchangolhi District, Malé",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            port: { x: 0, y: 20, w: 10, h: 25, name: "Malé Port 🚢" },
            smugglersDock: { x: 5, y: 35, w: 8, h: 8, name: "Smuggler's Dock 📦" },
            warehouse: { x: 35, y: 15, w: 12, h: 10, name: "Abandoned Warehouse 🏚️" },
            masodiOutpost: { x: 40, y: 30, w: 8, h: 8, name: "Masodi Outpost ⚔️" }
        },
        gangTerritory: "Masodi",
        smugglingHub: true
    }
};

// ==================== ACT 2 CHARACTERS ====================
const ACT2_CHARACTERS = {
    rippoo_razor: {
        name: "Rippoo 'The Razor' Ronda",
        sprite: "👩🏾",
        angrySprite: "😤",
        role: "Mother / Former Gang Legend",
        backstory: "1993-1998: Malé Sharks enforcer. Left gang life when pregnant with Nunnu. Secret: She killed a man who threatened her family.",
        dialogues: {
            secret_reveal: {
                speaker: "Rippoo",
                sprite: "👩🏾",
                lines: [
                    { text: "*locks door* Sit down, Kipal.", dhivehi: false },
                    { text: "Kaley think mashakah don't know this life?", dhivehi: true },
                    { text: "Before kaley was born... aharen was Rippoo the Razor.", dhivehi: true },
                    { text: "Malé Sharks. Five years. Aharen did things...", dhivehi: true },
                    { text: "*shows scar on arm* This? From a man who threatened Nunnu.", dhivehi: false },
                    { text: "He's buried in Villingili. Mashakah buried him.", dhivehi: true },
                    { text: "So don't think kaley can hide from me. Aharen know everything.", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen... aharen didn't know. Why didn't kaley tell me?", karma: 5, familyKarma: 10, response: "rippoo_explain" },
                    { text: "So kaley a hypocrite! Judging me for what kaley did!", karma: -10, familyKarma: -15, response: "rippoo_angry" },
                    { text: "Teach me. Help me survive this.", karma: 0, familyKarma: 5, response: "rippoo_teach" }
                ]
            }
        }
    },
    
    maleSharksLeader: {
        name: "Miyaru Boss (Shark Boss)",
        sprite: "🦈",
        role: "Malé Sharks Leader",
        territory: "Galolhu",
        dialogues: {
            first_meeting: {
                speaker: "Miyaru Boss",
                sprite: "🦈",
                lines: [
                    { text: "So... Rippoo's son. The Razor's blood.", dhivehi: false },
                    { text: "Kaley mother was legend. Best enforcer mashakah ever had.", dhivehi: true },
                    { text: "She left us. But blood is blood.", dhivehi: false },
                    { text: "Work for Sharks. Honor kaley mother's legacy.", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen will honor her legacy. What do kaley need?", karma: -5, reputation: { maleSharks: 20 }, response: "shark_accept" },
                    { text: "Mashakah mother left for a reason. Aharen won't join.", karma: 10, reputation: { maleSharks: -30 }, response: "shark_refuse" },
                    { text: "What can Sharks offer that Hustlers can't?", karma: 0, response: "shark_negotiate" }
                ]
            }
        }
    },
    
    drugDealer: {
        name: "Beys Dealer",
        sprite: "💊",
        role: "Drug Supplier",
        dialogues: {
            intro: {
                speaker: "Beys Dealer",
                sprite: "💊",
                lines: [
                    { text: "Shhh... kaley want beys? Good stuff from India.", dhivehi: true },
                    { text: "Heroin, meth, whatever kaley need.", dhivehi: false },
                    { text: "Sell for mashakah. 40% cut. Easy faisaa.", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen in. Where's the product?", karma: -25, familyKarma: -20, response: "drug_accept" },
                    { text: "Drugs destroy families. Aharen won't touch beys.", karma: 15, familyKarma: 10, response: "drug_refuse" },
                    { text: "Maybe. But aharen need to think about it.", karma: 0, response: "drug_maybe" }
                ]
            }
        }
    },
    
    masodiLeader: {
        name: "Shiru (Masodi Boss)",
        sprite: "😈",
        role: "Masodi Gang Leader",
        territory: "Machchangolhi + Addu connections",
        dialogues: {
            confrontation: {
                speaker: "Shiru",
                sprite: "😈",
                lines: [
                    { text: "Baokalo. The Addu boy playing Malé gangster.", dhivehi: false },
                    { text: "Kaley think Hulhu Hustlers can protect kaley?", dhivehi: true },
                    { text: "Masodi controls the ports. The drugs. The politicians.", dhivehi: false },
                    { text: "Join us or die. Simple choice, Addu sodu.", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen bow to no one. Especially not Masodi.", karma: 5, reputation: { masodi: -50 }, response: "masodi_defy" },
                    { text: "What's in it for mashakah?", karma: -5, response: "masodi_negotiate" },
                    { text: "[Attack Shiru]", karma: -15, combat: true, response: "masodi_attack" }
                ]
            }
        }
    },
    
    corruptPolitician: {
        name: "MP Jabibe",
        sprite: "🤑",
        role: "Corrupt Parliamentarian",
        party: "PNC",
        dialogues: {
            bribe: {
                speaker: "MP Jabibe",
                sprite: "🤑",
                lines: [
                    { text: "Ah, the young gangster. Mashakah heard about kaley.", dhivehi: true },
                    { text: "Politics and crime... same business, different suits.", dhivehi: false },
                    { text: "Mashakah need... muscle. For the election.", dhivehi: true },
                    { text: "5000 rufiyaa per job. Intimidate voters. Simple.", dhivehi: false }
                ],
                choices: [
                    { text: "Faisaa is faisaa. Aharen do it.", karma: -20, familyKarma: -10, money: 5000, response: "jabibe_accept" },
                    { text: "Aharen criminal, not politician's dog.", karma: 10, response: "jabibe_refuse" },
                    { text: "10,000 or nothing.", karma: -5, money: 10000, response: "jabibe_negotiate" }
                ]
            }
        }
    }
};

// ==================== ACT 2 MISSIONS ====================
const ACT2_MISSIONS = [
    {
        id: "act2_m1",
        title: "New Territory",
        type: "exploration",
        description: "Explore Henveiru district and establish presence",
        objectives: [
            { type: "travel", target: "male_henveiru", current: false },
            { type: "discover", target: "kudaTurf", current: false },
            { type: "discover", target: "sultanPark", current: false }
        ],
        rewards: { money: 200, reputation: { hulhuHustlers: 10 } },
        unlocks: ["act2_m2"]
    },
    {
        id: "act2_m2",
        title: "Kuda Henveiru Clash",
        type: "combat",
        description: "Defend against Kuda Henveiru ambush",
        objectives: [
            { type: "defeat", target: "kudaThug", count: 5, current: 0 }
        ],
        rewards: { money: 300, karma: -10, reputation: { hulhuHustlers: 15, kudaHenveiru: -25 } },
        unlocks: ["act2_m3"]
    },
    {
        id: "act2_m3",
        title: "The Razor's Secret",
        type: "story",
        description: "Confront Rippoo about her past",
        objectives: [
            { type: "travel", target: "rippooTeaShop", current: false },
            { type: "trigger", target: "rippooSecret", current: false }
        ],
        rewards: { karma: 0 },
        dialogueStart: "rippoo_secret_reveal",
        unlocks: ["act2_m4", "act2_m5"],
        setFlag: "rippooSecretRevealed",
        majorStoryBeat: true
    },
    {
        id: "act2_m4",
        title: "Sharks Circling",
        type: "story",
        description: "Meet the Malé Sharks leader",
        objectives: [
            { type: "travel", target: "maleSharksHQ", current: false },
            { type: "trigger", target: "sharkMeeting", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "shark_first_meeting",
        unlocks: ["act2_m6"],
        moralChoice: true
    },
    {
        id: "act2_m5",
        title: "Drug Trade Introduction",
        type: "story",
        description: "A dealer offers you a partnership",
        objectives: [
            { type: "travel", target: "drugDen", current: false },
            { type: "trigger", target: "drugOffer", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "drug_intro",
        unlocks: ["act2_m6"],
        moralChoice: true,
        majorChoice: "drugs" // Affects entire game
    },
    {
        id: "act2_m6",
        title: "Port Heist",
        type: "heist",
        description: "Steal shipment from Masodi-controlled port",
        objectives: [
            { type: "travel", target: "smugglersDock", current: false },
            { type: "steal", target: "shipment", current: false },
            { type: "escape", target: "safehouse", current: false }
        ],
        rewards: { money: 1000, karma: -15, reputation: { masodi: -40 } },
        unlocks: ["act2_m7"],
        heistPlanning: true
    },
    {
        id: "act2_m7",
        title: "Masodi Retaliation",
        type: "combat",
        description: "Masodi attacks your territory",
        objectives: [
            { type: "defend", target: "maafannuTerritory", duration: 90, current: 0 },
            { type: "defeat", target: "masodiEnforcer", count: 8, current: 0 }
        ],
        rewards: { money: 500, karma: -10, reputation: { hulhuHustlers: 30 } },
        unlocks: ["act2_m8"]
    },
    {
        id: "act2_m8",
        title: "Political Puppet",
        type: "story",
        description: "MP Jabibe wants your services",
        objectives: [
            { type: "travel", target: "parliament", current: false },
            { type: "trigger", target: "jabibeMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "jabibe_bribe",
        unlocks: ["act2_m9", "act2_m10"],
        moralChoice: true
    },
    {
        id: "act2_m9",
        title: "Voter Intimidation",
        type: "intimidation",
        description: "Threaten opposition voters for Jabibe",
        objectives: [
            { type: "intimidate", target: "voter", count: 5, current: 0 }
        ],
        rewards: { money: 5000, karma: -25, familyKarma: -15 },
        unlocks: ["act2_m11"],
        requiresChoice: "jabibe_accept"
    },
    {
        id: "act2_m10",
        title: "Expose the Corrupt",
        type: "stealth",
        description: "Gather evidence against Jabibe",
        objectives: [
            { type: "photograph", target: "jabibeEvidence", count: 3, current: 0 },
            { type: "deliver", target: "journalist", current: false }
        ],
        rewards: { money: 200, karma: 20, familyKarma: 10 },
        unlocks: ["act2_m11"],
        requiresChoice: "jabibe_refuse"
    },
    {
        id: "act2_m11",
        title: "Shiru's Challenge",
        type: "boss",
        description: "Face Shiru in Machchangolhi",
        objectives: [
            { type: "travel", target: "masodiOutpost", current: false },
            { type: "defeat", target: "shiru", count: 1, current: 0 }
        ],
        rewards: { money: 2000, karma: -20, reputation: { masodi: -60, hulhuHustlers: 40 } },
        unlocks: ["act2_m12"],
        bossMusic: true
    },
    {
        id: "act2_m12",
        title: "Gang Alliance",
        type: "story",
        description: "Form alliance or go independent",
        objectives: [
            { type: "trigger", target: "allianceChoice", current: false }
        ],
        rewards: { money: 0 },
        moralChoice: true,
        choices: [
            { text: "Alliance with Malé Sharks", karma: -10, outcome: "shark_alliance" },
            { text: "Alliance with Hulhu Hustlers only", karma: 0, outcome: "hustler_loyalty" },
            { text: "Go independent - start own crew", karma: 5, outcome: "independent" }
        ],
        unlocks: ["act2_m13"]
    },
    {
        id: "act2_m13",
        title: "Warehouse Takeover",
        type: "combat",
        description: "Capture the abandoned warehouse",
        objectives: [
            { type: "capture", target: "warehouse", current: false },
            { type: "defeat", target: "warehouseGuard", count: 6, current: 0 }
        ],
        rewards: { money: 1500, reputation: { hulhuHustlers: 25 } },
        unlocks: ["act2_m14"]
    },
    {
        id: "act2_m14",
        title: "Family Tensions",
        type: "story",
        description: "Nunnu returns from medical school",
        objectives: [
            { type: "trigger", target: "nunnuReturn", current: false }
        ],
        rewards: { karma: 0 },
        dialogueStart: "nunnu_confrontation",
        unlocks: ["act2_climax"],
        setFlag: "nunnuReturned"
    },
    {
        id: "act2_climax",
        title: "The Malé Massacre",
        type: "combat",
        description: "All-out gang war in Galolhu",
        objectives: [
            { type: "survive", target: "gangWar", duration: 120, current: 0 },
            { type: "defeat", target: "enemyGangster", count: 15, current: 0 },
            { type: "protect", target: "hulhuLeader", current: true }
        ],
        rewards: { money: 3000, karma: -30, reputation: { hulhuHustlers: 50 } },
        unlocks: ["act3_start"],
        actEnd: true,
        bossMusic: true
    }
];

// ==================== ACT 2 SIDE MISSIONS ====================
const ACT2_SIDE_MISSIONS = [
    { id: "side2_race1", title: "Henveiru Street Race", type: "race", reward: 200 },
    { id: "side2_race2", title: "Galolhu Night Race", type: "race", reward: 300 },
    { id: "side2_delivery1", title: "Suspicious Package I", type: "delivery", reward: 150 },
    { id: "side2_delivery2", title: "Suspicious Package II", type: "delivery", reward: 200 },
    { id: "side2_delivery3", title: "Suspicious Package III", type: "delivery", reward: 250 },
    { id: "side2_fight1", title: "Underground Fight I", type: "fight", enemies: 3, reward: 200 },
    { id: "side2_fight2", title: "Underground Fight II", type: "fight", enemies: 5, reward: 350 },
    { id: "side2_fight3", title: "Underground Fight III", type: "fight", enemies: 7, reward: 500 },
    { id: "side2_extort1", title: "Shop Protection I", type: "extortion", reward: 300 },
    { id: "side2_extort2", title: "Shop Protection II", type: "extortion", reward: 400 },
    { id: "side2_steal1", title: "Tourist Wallets", type: "pickpocket", target: 10, reward: 250 },
    { id: "side2_steal2", title: "Politician's Briefcase", type: "steal", reward: 500 },
    { id: "side2_boduberu", title: "Boduberu Competition", type: "minigame", game: "boduberu", reward: 200 },
    { id: "side2_fishing", title: "Night Fishing", type: "minigame", game: "fishing", reward: 150 },
    { id: "side2_charisma1", title: "Recruit Members I", type: "charisma", target: 3, reward: 200 },
    { id: "side2_charisma2", title: "Recruit Members II", type: "charisma", target: 5, reward: 350 }
];

// ==================== ACT 2 DIALOGUES ====================
const ACT2_DIALOGUES = {
    rippoo_secret_reveal: {
        speaker: "Rippoo",
        sprite: "👩🏾",
        lines: [
            { text: "*locks door* Sit down, Kipal.", dhivehi: false },
            { text: "Kaley think mashakah don't know this life?", dhivehi: true },
            { text: "Before kaley was born... aharen was Rippoo the Razor.", dhivehi: true },
            { text: "Malé Sharks. Five years. Aharen did things...", dhivehi: true },
            { text: "*shows scar on arm* This? From a man who threatened Nunnu.", dhivehi: false },
            { text: "He's buried in Villingili. Mashakah buried him.", dhivehi: true },
            { text: "So don't think kaley can hide from me. Aharen know everything.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen... aharen didn't know. Why didn't kaley tell me?", karma: 5, familyKarma: 10, response: "rippoo_explain" },
            { text: "So kaley a hypocrite! Judging me for what kaley did!", karma: -10, familyKarma: -15, response: "rippoo_angry" },
            { text: "Teach me. Help me survive this.", karma: 0, familyKarma: 5, response: "rippoo_teach" }
        ]
    },
    
    rippoo_explain: {
        speaker: "Rippoo",
        sprite: "👩🏾",
        lines: [
            { text: "*sighs* Because aharen wanted better for kaley.", dhivehi: true },
            { text: "When Nunnu was born... mashakah saw her face and knew.", dhivehi: true },
            { text: "Aharen couldn't raise her in blood. So aharen left.", dhivehi: true },
            { text: "But kaley... kaley chose this path yourself.", dhivehi: true },
            { text: "Mashakah can't stop kaley. But aharen can guide kaley.", dhivehi: true }
        ]
    },
    
    rippoo_angry: {
        speaker: "Rippoo",
        sprite: "😤",
        lines: [
            { text: "*slaps Baokalo hard*", dhivehi: false },
            { text: "Kaley sodu! Aharen killed so kaley could LIVE!", dhivehi: true },
            { text: "Every night mashakah see his face. Every night!", dhivehi: true },
            { text: "Kaley think this is a game? This is HELL!", dhivehi: true },
            { text: "Get out. GET OUT OF MASHAKAH HOUSE!", dhivehi: true }
        ]
    },
    
    rippoo_teach: {
        speaker: "Rippoo",
        sprite: "👩🏾",
        lines: [
            { text: "*long pause* ...Alright.", dhivehi: false },
            { text: "If kaley going to do this... do it smart.", dhivehi: true },
            { text: "Rule one: Never trust politicians. They use gangs like tools.", dhivehi: false },
            { text: "Rule two: Family first. Always. Even when they hate kaley.", dhivehi: true },
            { text: "Rule three: The Sharks... they remember mashakah. Use that.", dhivehi: true },
            { text: "Now go. And don't get killed, darifulhaakah.", dhivehi: true }
        ]
    },
    
    shark_first_meeting: {
        speaker: "Miyaru Boss",
        sprite: "🦈",
        lines: [
            { text: "So... Rippoo's son. The Razor's blood.", dhivehi: false },
            { text: "Kaley mother was legend. Best enforcer mashakah ever had.", dhivehi: true },
            { text: "She left us. But blood is blood.", dhivehi: false },
            { text: "Work for Sharks. Honor kaley mother's legacy.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen will honor her legacy. What do kaley need?", karma: -5, reputation: { maleSharks: 20 }, response: "shark_accept" },
            { text: "Mashakah mother left for a reason. Aharen won't join.", karma: 10, reputation: { maleSharks: -30 }, response: "shark_refuse" },
            { text: "What can Sharks offer that Hustlers can't?", karma: 0, response: "shark_negotiate" }
        ]
    },
    
    shark_accept: {
        speaker: "Miyaru Boss",
        sprite: "🦈",
        lines: [
            { text: "*grins* Good. Kaley smart like mother.", dhivehi: true },
            { text: "First job: We need someone to handle Kuda Henveiru.", dhivehi: false },
            { text: "They've been stealing our shipments. Make them stop.", dhivehi: false },
            { text: "Do this, and Sharks will protect kaley. Always.", dhivehi: true }
        ]
    },
    
    shark_refuse: {
        speaker: "Miyaru Boss",
        sprite: "🦈",
        lines: [
            { text: "*cold stare* Kaley mother said same thing.", dhivehi: true },
            { text: "She regretted it. Kaley will too.", dhivehi: false },
            { text: "Mashakah give kaley one chance. Don't waste it.", dhivehi: true },
            { text: "Next time we meet... might not be so friendly.", dhivehi: false }
        ]
    },
    
    shark_negotiate: {
        speaker: "Miyaru Boss",
        sprite: "🦈",
        lines: [
            { text: "*laughs* Kaley got balls. Like mother.", dhivehi: true },
            { text: "Sharks control Galolhu. Politicians. Drugs. Money.", dhivehi: false },
            { text: "Hustlers? Small time. Fish market pickpockets.", dhivehi: false },
            { text: "With us, kaley could run this whole island.", dhivehi: true },
            { text: "Think about it. Door's always open for Razor's son.", dhivehi: true }
        ]
    },
    
    drug_intro: {
        speaker: "Beys Dealer",
        sprite: "💊",
        lines: [
            { text: "Psst... kaley. Over here.", dhivehi: true },
            { text: "Aharen heard about kaley. Rising star in Maafannu.", dhivehi: true },
            { text: "Want to make real faisaa? Not this pickpocket bullshit.", dhivehi: true },
            { text: "Beys. Heroin from India. Meth from Thailand.", dhivehi: false },
            { text: "Sell for mashakah. 40% cut. Thousands per week.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen in. Where's the product?", karma: -25, familyKarma: -20, response: "drug_accept" },
            { text: "Drugs destroy families. Aharen won't touch beys.", karma: 15, familyKarma: 10, response: "drug_refuse" },
            { text: "Maybe. But aharen need to think about it.", karma: 0, response: "drug_maybe" }
        ]
    },
    
    drug_accept: {
        speaker: "Beys Dealer",
        sprite: "💊",
        lines: [
            { text: "*grins* Smart choice. Here's the first batch.", dhivehi: false },
            { text: "Sell to tourists at resorts. Rich foreigners pay double.", dhivehi: false },
            { text: "Don't get caught. Police are paid off, but not all of them.", dhivehi: false },
            { text: "Welcome to the real business, Baokalo.", dhivehi: false }
        ]
    },
    
    drug_refuse: {
        speaker: "Beys Dealer",
        sprite: "💊",
        lines: [
            { text: "*spits* Kaley sodu. Think kaley better than mashakah?", dhivehi: true },
            { text: "Every gang in Malé sells beys. EVERY ONE.", dhivehi: false },
            { text: "Kaley can't survive without it. Mark mashakah words.", dhivehi: true },
            { text: "When kaley change mind... aharen be here.", dhivehi: true }
        ]
    },
    
    drug_maybe: {
        speaker: "Beys Dealer",
        sprite: "💊",
        lines: [
            { text: "Think fast. This offer won't last.", dhivehi: false },
            { text: "Other gangs want this territory. Masodi especially.", dhivehi: false },
            { text: "Kaley got one week. Then aharen find someone else.", dhivehi: true }
        ]
    },
    
    nunnu_confrontation: {
        speaker: "Nunnu",
        sprite: "👩🏾‍⚕️",
        lines: [
            { text: "*sees Baokalo's bruises* What happened to kaley?!", dhivehi: true },
            { text: "Aharen heard rumors in Bangalore. About my brother.", dhivehi: true },
            { text: "Gangs? GANGS?! After everything mashakah sacrificed?!", dhivehi: true },
            { text: "*crying* Aharen studying to save lives. Kaley taking them!", dhivehi: true },
            { text: "How can we be from same family?!", dhivehi: true }
        ],
        choices: [
            { text: "Aharen sorry, Nunnu. But kaley don't understand Malé.", karma: 5, familyKarma: 5, response: "nunnu_apologize" },
            { text: "Kaley got scholarship. Aharen got nothing. This is MY way.", karma: -10, familyKarma: -15, response: "nunnu_bitter" },
            { text: "*hug her* Aharen still your brother. Always.", karma: 10, familyKarma: 15, response: "nunnu_hug" }
        ]
    },
    
    nunnu_apologize: {
        speaker: "Nunnu",
        sprite: "👩🏾‍⚕️",
        lines: [
            { text: "*wipes tears* Aharen understand more than kaley think.", dhivehi: true },
            { text: "Mashakah saw the poverty. The desperation.", dhivehi: true },
            { text: "But there's always another way, Kipal.", dhivehi: false },
            { text: "Please... come back to us. Before it's too late.", dhivehi: true }
        ]
    },
    
    nunnu_bitter: {
        speaker: "Nunnu",
        sprite: "👩🏾‍⚕️",
        lines: [
            { text: "*steps back* Kaley think aharen had it easy?!", dhivehi: true },
            { text: "Mashakah studied 18 hours a day! While kaley partied!", dhivehi: true },
            { text: "Don't blame me for kaley failures!", dhivehi: true },
            { text: "*runs away crying*", dhivehi: false }
        ]
    },
    
    nunnu_hug: {
        speaker: "Nunnu",
        sprite: "👩🏾‍⚕️",
        lines: [
            { text: "*hugs back tightly*", dhivehi: false },
            { text: "Aharen missed kaley so much, Kipal.", dhivehi: true },
            { text: "Promise me... promise kaley won't die in this life.", dhivehi: true },
            { text: "Mashakah can't lose another family member.", dhivehi: true },
            { text: "Abuch is gone. Don't make mashakah bury kaley too.", dhivehi: true }
        ]
    },
    
    jabibe_bribe: {
        speaker: "MP Jabibe",
        sprite: "🤑",
        lines: [
            { text: "Ah, the young gangster. Mashakah heard about kaley.", dhivehi: true },
            { text: "Politics and crime... same business, different suits.", dhivehi: false },
            { text: "Mashakah need... muscle. For the election.", dhivehi: true },
            { text: "5000 rufiyaa per job. Intimidate opposition voters.", dhivehi: false },
            { text: "Nothing violent. Just... persuasion.", dhivehi: false }
        ],
        choices: [
            { text: "Faisaa is faisaa. Aharen do it.", karma: -20, familyKarma: -10, response: "jabibe_accept" },
            { text: "Aharen criminal, not politician's dog.", karma: 10, response: "jabibe_refuse" },
            { text: "10,000 or nothing.", karma: -5, response: "jabibe_negotiate" }
        ]
    },
    
    jabibe_accept: {
        speaker: "MP Jabibe",
        sprite: "🤑",
        lines: [
            { text: "*smiles* Excellent. Kaley smart.", dhivehi: true },
            { text: "Here's the list. These people vote MDP. Make them... reconsider.", dhivehi: false },
            { text: "No killing. Just fear. Fear wins elections.", dhivehi: false },
            { text: "Do this well, and mashakah have more work for kaley.", dhivehi: true }
        ]
    },
    
    jabibe_refuse: {
        speaker: "MP Jabibe",
        sprite: "🤑",
        lines: [
            { text: "*frowns* Kaley making a mistake.", dhivehi: true },
            { text: "Mashakah can make kaley life very difficult.", dhivehi: true },
            { text: "Police, judges, prison guards... all on mashakah payroll.", dhivehi: false },
            { text: "Think carefully before refusing again.", dhivehi: false }
        ]
    },
    
    jabibe_negotiate: {
        speaker: "MP Jabibe",
        sprite: "🤑",
        lines: [
            { text: "*laughs* Kaley got nerve. Aharen like that.", dhivehi: true },
            { text: "Fine. 8000. But kaley better deliver results.", dhivehi: false },
            { text: "One mistake and mashakah cut kaley loose. Understood?", dhivehi: true }
        ]
    }
};

// ==================== ACT 2 RADIO CONTENT ====================
const ACT2_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Election season! PNC promises 'law and order' while hiring gang security..." },
            { type: "news", text: "Drug seizure at port! 50kg heroin. Police: 'Biggest bust ever!' (Masodi shipment untouched)" },
            { type: "satire", text: "MP Jabibe: 'I've never met a gangster!' *photo surfaces with Masodi leaders*" },
            { type: "news", text: "Gang violence up 40%. Government: 'Fake news from opposition!'" },
            { type: "ad", text: "Visit Galolhu! Historic sites, culture, and definitely no gang headquarters!" },
            { type: "satire", text: "Police Commissioner: 'We're winning the war on gangs!' *gang membership increases*" },
            { type: "news", text: "Malé Sharks and Kuda Henveiru clash. 3 hospitalized. Police: 'Personal dispute.'" }
        ]
    },
    undergroundFM: {
        name: "📻 Underground FM",
        segments: [
            { type: "truth", text: "Real talk: Politicians fund gangs. Gangs fund politicians. Circle of corruption." },
            { type: "truth", text: "Jabibe's mansion? Built with drug money. Everyone knows. No one acts." },
            { type: "truth", text: "Rippoo the Razor... remember that name. She's why Sharks rule Galolhu." },
            { type: "truth", text: "Baokalo rising fast. Too fast. Someone's gonna clip his wings." },
            { type: "music", text: "♪ Playing: 'Malé Nights' - Street anthem ♪" }
        ]
    }
};

// ==================== HEIST PLANNING SYSTEM ====================
const HEIST_PLANS = {
    portHeist: {
        name: "Port Heist",
        location: "smugglersDock",
        approaches: [
            {
                name: "Stealth",
                description: "Sneak in at night, avoid guards, grab shipment",
                requirements: { stealth: 3 },
                risks: { detection: 0.3, combat: 0.1 },
                rewards: { money: 1200, karma: -10 }
            },
            {
                name: "Bribe",
                description: "Pay off the dock workers to look away",
                requirements: { charisma: 3, money: 500 },
                risks: { detection: 0.1, betrayal: 0.2 },
                rewards: { money: 800, karma: -5 }
            },
            {
                name: "Assault",
                description: "Go in guns blazing, take everything",
                requirements: { combat: 4 },
                risks: { detection: 0.9, combat: 0.8, police: 0.5 },
                rewards: { money: 1500, karma: -25 }
            }
        ]
    }
};

// ==================== GANG RECRUITMENT SYSTEM ====================
const RECRUITMENT = {
    requirements: {
        basic: { charisma: 1, reputation: 10 },
        skilled: { charisma: 2, reputation: 25, money: 200 },
        elite: { charisma: 3, reputation: 50, money: 500 }
    },
    
    recruits: [
        { name: "Street Kid", type: "basic", combat: 1, stealth: 2, loyalty: 0.6 },
        { name: "Ex-Fisherman", type: "basic", combat: 2, stealth: 1, loyalty: 0.7 },
        { name: "Dropout", type: "basic", combat: 1, stealth: 1, loyalty: 0.5 },
        { name: "Former Soldier", type: "skilled", combat: 4, stealth: 2, loyalty: 0.8 },
        { name: "Hacker", type: "skilled", combat: 1, stealth: 3, loyalty: 0.6 },
        { name: "Driver", type: "skilled", combat: 2, stealth: 2, loyalty: 0.7 },
        { name: "Assassin", type: "elite", combat: 5, stealth: 4, loyalty: 0.5 },
        { name: "Corrupt Cop", type: "elite", combat: 3, stealth: 3, loyalty: 0.4 }
    ]
};

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ACT2_MAPS,
        ACT2_CHARACTERS,
        ACT2_MISSIONS,
        ACT2_SIDE_MISSIONS,
        ACT2_DIALOGUES,
        ACT2_RADIO,
        HEIST_PLANS,
        RECRUITMENT
    };
}

// Add to global scope for browser
if (typeof window !== 'undefined') {
    window.ACT2_MAPS = ACT2_MAPS;
    window.ACT2_CHARACTERS = ACT2_CHARACTERS;
    window.ACT2_MISSIONS = ACT2_MISSIONS;
    window.ACT2_SIDE_MISSIONS = ACT2_SIDE_MISSIONS;
    window.ACT2_DIALOGUES = ACT2_DIALOGUES;
    window.ACT2_RADIO = ACT2_RADIO;
    window.HEIST_PLANS = HEIST_PLANS;
    window.RECRUITMENT = RECRUITMENT;
}
