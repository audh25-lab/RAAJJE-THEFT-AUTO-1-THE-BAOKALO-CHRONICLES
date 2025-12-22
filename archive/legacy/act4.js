// ============================================
// ACT 4: PARLIAMENT PLAGUE
// Timeline: 2018 - Political corruption deepens
// ============================================

// ==================== ACT 4 MAPS ====================
const ACT4_MAPS = {
    parliament_district: {
        name: "Parliament District",
        width: 65,
        height: 55,
        spawnX: 32,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            parliament: { x: 25, y: 15, w: 15, h: 12, name: "People's Majlis 🏛️" },
            presidentialPalace: { x: 10, y: 20, w: 12, h: 10, name: "Muliaage 🏰" },
            supremeCourt: { x: 45, y: 18, w: 10, h: 8, name: "Supreme Court ⚖️" },
            republicSquare: { x: 28, y: 30, w: 10, h: 8, name: "Republic Square 🏛️" },
            policeHQ: { x: 50, y: 30, w: 8, h: 8, name: "Police HQ 👮" },
            mediaCenter: { x: 8, y: 35, w: 10, h: 8, name: "Media Center 📺" },
            alibeOffice: { x: 45, y: 40, w: 8, h: 6, name: "Opposition HQ 🗳️" }
        },
        gangTerritory: null,
        politicalZone: true
    },
    
    coup_2012_flashback: {
        name: "February 7, 2012 - The Coup",
        width: 60,
        height: 50,
        spawnX: 30,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            mndfHQ: { x: 20, y: 15, w: 15, h: 10, name: "MNDF Headquarters 🎖️" },
            policeStation: { x: 40, y: 20, w: 10, h: 8, name: "Police Station 👮" },
            protestArea: { x: 25, y: 30, w: 12, h: 10, name: "Protest Zone 📢" },
            presidentOffice: { x: 10, y: 25, w: 10, h: 8, name: "President's Office 🏛️" }
        },
        isFlashback: true,
        year: 2012
    },
    
    dhoonidhoo_prison: {
        name: "Dhoonidhoo Detention Center",
        width: 45,
        height: 40,
        spawnX: 22,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            cellBlock: { x: 15, y: 10, w: 15, h: 12, name: "Cell Block A 🔒" },
            interrogation: { x: 32, y: 15, w: 8, h: 6, name: "Interrogation 💀" },
            yard: { x: 10, y: 25, w: 20, h: 10, name: "Prison Yard 🏃" },
            adminBuilding: { x: 5, y: 10, w: 8, h: 8, name: "Admin Building 📋" },
            dock: { x: 35, y: 30, w: 8, h: 8, name: "Prison Dock 🚢" }
        },
        isPrison: true
    },
    
    journalist_hideout: {
        name: "Underground Press",
        width: 35,
        height: 30,
        spawnX: 17,
        spawnY: 25,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            printingRoom: { x: 10, y: 8, w: 15, h: 10, name: "Printing Room 📰" },
            serverRoom: { x: 5, y: 20, w: 8, h: 6, name: "Server Room 💻" },
            safehouse: { x: 20, y: 18, w: 10, h: 8, name: "Safe House 🏠" }
        },
        isHidden: true
    }
};

// ==================== ACT 4 CHARACTERS ====================
const ACT4_CHARACTERS = {
    alibe: {
        name: "Alibe",
        sprite: "🗳️",
        role: "Opposition Leader",
        backstory: "Nasheed-inspired character. Former president, now opposition leader fighting against Mooizbe's authoritarian rule. Idealistic but willing to use gangs for political ends.",
        dialogues: {
            first_meeting: {
                speaker: "Alibe",
                sprite: "🗳️",
                lines: [
                    { text: "So kaley the famous Baokalo. Mashakah heard stories.", dhivehi: true },
                    { text: "Aharen know what kaley think - another politician.", dhivehi: true },
                    { text: "But aharen different. Aharen was president. They took it.", dhivehi: false },
                    { text: "2012. The coup. Aharen remember every face.", dhivehi: false },
                    { text: "Now Mooizbe destroying everything. Mashakah need help.", dhivehi: true }
                ],
                choices: [
                    { text: "What kind of help?", karma: 0, response: "alibe_explain" },
                    { text: "Politicians are all the same.", karma: -5, response: "alibe_cynical" },
                    { text: "Aharen already work for Mooizbe.", karma: -20, response: "alibe_betray" }
                ]
            }
        }
    },
    
    mpJabibe: {
        name: "MP Jabibe",
        sprite: "🤵🏾",
        role: "Corrupt Parliamentarian",
        backstory: "Takes bribes from both sides. Sells votes, leaks information. Represents everything wrong with Maldivian politics.",
        dialogues: {
            bribe_offer: {
                speaker: "MP Jabibe",
                sprite: "🤵🏾",
                lines: [
                    { text: "*counting money* Ah, Baokalo! Come in, come in!", dhivehi: false },
                    { text: "Kaley want something passed? Blocked? Aharen can arrange.", dhivehi: true },
                    { text: "50,000 rufiyaa per vote. Bulk discount for 10+.", dhivehi: false },
                    { text: "Democracy is expensive, no? Hehe.", dhivehi: false }
                ],
                choices: [
                    { text: "Aharen need the Gang Act delayed.", karma: -15, response: "jabibe_gang_act" },
                    { text: "Who else is buying votes?", karma: 0, response: "jabibe_info" },
                    { text: "Kaley disgusting. Aharen won't deal.", karma: 10, response: "jabibe_refuse" }
                ]
            }
        }
    },
    
    chiefJustice: {
        name: "Chief Justice Abdulla",
        sprite: "⚖️",
        role: "Supreme Court Chief Justice",
        backstory: "Appointed by Mooizbe. Rules in favor of whoever pays most. Key to keeping opposition leaders jailed.",
        dialogues: {
            court_meeting: {
                speaker: "Chief Justice",
                sprite: "⚖️",
                lines: [
                    { text: "*in chambers* The law is... flexible.", dhivehi: false },
                    { text: "Kaley friend needs charges dropped? Possible.", dhivehi: true },
                    { text: "Kaley enemy needs conviction? Also possible.", dhivehi: true },
                    { text: "Justice has a price. What can kaley afford?", dhivehi: false }
                ],
                choices: [
                    { text: "Free Rippoo's old friends.", karma: 5, response: "justice_free" },
                    { text: "Convict my rivals.", karma: -20, response: "justice_convict" },
                    { text: "Record this conversation.", karma: 15, response: "justice_record" }
                ]
            }
        }
    },
    
    youngBaokalo: {
        name: "Young Baokalo (2012)",
        sprite: "👦🏾",
        role: "12-year-old Baokalo during coup",
        backstory: "Flashback character. Witnessed the 2012 coup that shaped his worldview.",
        dialogues: {
            coup_witness: {
                speaker: "Young Baokalo",
                sprite: "👦🏾",
                lines: [
                    { text: "*hiding behind wall* Mama, what's happening?", dhivehi: true },
                    { text: "Why are soldiers fighting police?", dhivehi: false },
                    { text: "*explosion* MAMA!", dhivehi: true },
                    { text: "*Rippoo pulls him away* Come! Now!", dhivehi: true }
                ]
            }
        }
    },
    
    policeCommissioner: {
        name: "Commissioner Hassan",
        sprite: "👮🏾",
        role: "Police Commissioner",
        backstory: "Mooizbe's enforcer. Uses police to harass opposition and protect government allies.",
        dialogues: {
            arrest_threat: {
                speaker: "Commissioner Hassan",
                sprite: "👮🏾",
                lines: [
                    { text: "Baokalo. Aharen been watching kaley.", dhivehi: true },
                    { text: "Drug trafficking. Murder. Extortion.", dhivehi: false },
                    { text: "Aharen can make it all go away. Or...", dhivehi: true },
                    { text: "Kaley can spend 25 years in Dhoonidhoo.", dhivehi: false },
                    { text: "President needs... a favor.", dhivehi: true }
                ],
                choices: [
                    { text: "What does Mooizbe want?", karma: -10, response: "commissioner_task" },
                    { text: "Kaley can't prove anything.", karma: 0, response: "commissioner_bluff" },
                    { text: "[Attack]", karma: -25, combat: true, response: "commissioner_attack" }
                ]
            }
        }
    },
    
    nunnuJournalist: {
        name: "Nunnu (Sister)",
        sprite: "📰",
        role: "Investigative Journalist",
        backstory: "Baokalo's sister. Works for underground press exposing corruption. Constantly in danger.",
        dialogues: {
            investigation_help: {
                speaker: "Nunnu",
                sprite: "📰",
                lines: [
                    { text: "*shows documents* Look at this, brother.", dhivehi: true },
                    { text: "Mooizbe. Jabibe. The Chief Justice. All connected.", dhivehi: false },
                    { text: "Money from China. Bribes. Offshore accounts.", dhivehi: false },
                    { text: "If mashakah publish this... they'll kill me.", dhivehi: true },
                    { text: "But people deserve to know.", dhivehi: false }
                ],
                choices: [
                    { text: "Aharen protect kaley. Publish it.", karma: 20, familyKarma: 25, response: "nunnu_publish" },
                    { text: "Too dangerous. Hide the evidence.", karma: 5, familyKarma: 10, response: "nunnu_hide" },
                    { text: "Give it to me. Aharen use it for leverage.", karma: -15, familyKarma: -20, response: "nunnu_leverage" }
                ]
            }
        }
    }
};

// ==================== ACT 4 MISSIONS ====================
const ACT4_MISSIONS = [
    {
        id: "act4_m1",
        title: "Political Animal",
        type: "story",
        description: "Enter the Parliament District",
        objectives: [
            { type: "travel", target: "parliament_district", current: false },
            { type: "discover", target: "parliament", current: false },
            { type: "discover", target: "republicSquare", current: false }
        ],
        rewards: { money: 400 },
        unlocks: ["act4_m2"]
    },
    {
        id: "act4_m2",
        title: "The Opposition",
        type: "story",
        description: "Meet opposition leader Alibe",
        objectives: [
            { type: "travel", target: "alibeOffice", current: false },
            { type: "trigger", target: "alibeMeeting", current: false }
        ],
        rewards: { money: 500 },
        dialogueStart: "alibe_first_meeting",
        unlocks: ["act4_m3", "act4_m4"],
        moralChoice: true
    },
    {
        id: "act4_m3",
        title: "Vote Buying",
        type: "corruption",
        description: "Bribe MPs for Alibe's bill",
        objectives: [
            { type: "talk", target: "mpJabibe", current: false },
            { type: "pay", target: "bribe", amount: 50000, current: false },
            { type: "collect", target: "votePromise", count: 5, current: 0 }
        ],
        rewards: { money: -50000, karma: -20, reputation: { opposition: 30 } },
        unlocks: ["act4_m5"],
        requiresChoice: "alibe_explain"
    },
    {
        id: "act4_m4",
        title: "Double Agent",
        type: "betrayal",
        description: "Report Alibe's plans to Mooizbe",
        objectives: [
            { type: "travel", target: "presidentialPalace", current: false },
            { type: "trigger", target: "mooizbeReport", current: false }
        ],
        rewards: { money: 100000, karma: -35, reputation: { government: 50, opposition: -100 } },
        unlocks: ["act4_m5"],
        requiresChoice: "alibe_betray"
    },
    {
        id: "act4_m5",
        title: "Flashback: February 7",
        type: "flashback",
        description: "Relive the 2012 coup as young Baokalo",
        objectives: [
            { type: "travel", target: "coup_2012_flashback", current: false },
            { type: "survive", target: "coupChaos", duration: 60, current: 0 },
            { type: "escape", target: "safeHouse", current: false }
        ],
        rewards: { karma: 0 },
        dialogueStart: "coup_witness",
        unlocks: ["act4_m6"],
        isFlashback: true,
        specialMusic: "coup_theme"
    },
    {
        id: "act4_m6",
        title: "Sister's Investigation",
        type: "story",
        description: "Help Nunnu with her investigation",
        objectives: [
            { type: "travel", target: "journalist_hideout", current: false },
            { type: "trigger", target: "nunnuMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "nunnu_investigation_help",
        unlocks: ["act4_m7", "act4_m8", "act4_m9"],
        moralChoice: true,
        majorChoice: "journalism"
    },
    {
        id: "act4_m7",
        title: "Press Freedom",
        type: "protection",
        description: "Protect Nunnu while she publishes",
        objectives: [
            { type: "escort", target: "nunnu", current: false },
            { type: "defend", target: "printingRoom", duration: 90, current: 0 },
            { type: "defeat", target: "governmentThug", count: 15, current: 0 }
        ],
        rewards: { money: 2000, karma: 25, familyKarma: 30 },
        unlocks: ["act4_m10"],
        requiresChoice: "nunnu_publish"
    },
    {
        id: "act4_m8",
        title: "Buried Truth",
        type: "stealth",
        description: "Hide the evidence safely",
        objectives: [
            { type: "collect", target: "evidence", current: false },
            { type: "travel", target: "safehouse", current: false },
            { type: "hide", target: "documents", current: false }
        ],
        rewards: { money: 500, karma: 5, familyKarma: 10 },
        unlocks: ["act4_m10"],
        requiresChoice: "nunnu_hide"
    },
    {
        id: "act4_m9",
        title: "Blackmail Material",
        type: "corruption",
        description: "Use evidence to blackmail politicians",
        objectives: [
            { type: "collect", target: "evidence", current: false },
            { type: "talk", target: "mpJabibe", current: false },
            { type: "extort", target: "politician", count: 3, current: 0 }
        ],
        rewards: { money: 75000, karma: -25, familyKarma: -30 },
        unlocks: ["act4_m10"],
        requiresChoice: "nunnu_leverage"
    },
    {
        id: "act4_m10",
        title: "Judicial Corruption",
        type: "story",
        description: "Meet the Chief Justice",
        objectives: [
            { type: "travel", target: "supremeCourt", current: false },
            { type: "trigger", target: "justiceMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "court_meeting",
        unlocks: ["act4_m11", "act4_m12"]
    },
    {
        id: "act4_m11",
        title: "Arrest Warrant",
        type: "combat",
        description: "Commissioner Hassan comes for you",
        objectives: [
            { type: "survive", target: "policeRaid", duration: 60, current: 0 },
            { type: "escape", target: "safehouse", current: false }
        ],
        rewards: { money: 0, karma: -10 },
        dialogueStart: "arrest_threat",
        unlocks: ["act4_m12"]
    },
    {
        id: "act4_m12",
        title: "Parliament Siege",
        type: "combat",
        description: "Storm Parliament to rescue arrested allies",
        objectives: [
            { type: "travel", target: "parliament", current: false },
            { type: "defeat", target: "securityGuard", count: 20, current: 0 },
            { type: "rescue", target: "prisoner", count: 3, current: 0 }
        ],
        rewards: { money: 5000, karma: -15 },
        unlocks: ["act4_climax"]
    },
    {
        id: "act4_climax",
        title: "State of Emergency",
        type: "boss",
        description: "Mooizbe declares emergency - escape Malé",
        objectives: [
            { type: "survive", target: "martialLaw", duration: 120, current: 0 },
            { type: "defeat", target: "specialForces", count: 10, current: 0 },
            { type: "escape", target: "speedboat", current: false }
        ],
        rewards: { money: 10000, karma: -20 },
        unlocks: ["act5_start"],
        actEnd: true,
        bossMusic: true
    }
];

// ==================== ACT 4 SIDE MISSIONS ====================
const ACT4_SIDE_MISSIONS = [
    { id: "side4_bribe1", title: "Bribe Runner I", type: "delivery", reward: 600 },
    { id: "side4_bribe2", title: "Bribe Runner II", type: "delivery", reward: 800 },
    { id: "side4_protest1", title: "Protest Infiltration", type: "stealth", reward: 500 },
    { id: "side4_protest2", title: "Counter-Protest", type: "combat", reward: 700 },
    { id: "side4_leak1", title: "Document Leak I", type: "stealth", reward: 400 },
    { id: "side4_leak2", title: "Document Leak II", type: "stealth", reward: 600 },
    { id: "side4_intimidate1", title: "Witness Intimidation", type: "intimidation", reward: 500 },
    { id: "side4_intimidate2", title: "Jury Tampering", type: "corruption", reward: 800 },
    { id: "side4_escort1", title: "VIP Escort", type: "escort", reward: 600 },
    { id: "side4_escort2", title: "Journalist Protection", type: "escort", reward: 700 },
    { id: "side4_sabotage1", title: "Media Sabotage", type: "sabotage", reward: 500 },
    { id: "side4_rally", title: "Rally Security", type: "protection", reward: 600 },
    { id: "side4_speech", title: "Speech Writing", type: "minigame", game: "charisma", reward: 400 },
    { id: "side4_debate", title: "Debate Prep", type: "minigame", game: "charisma", reward: 500 }
];

// ==================== ACT 4 DIALOGUES ====================
const ACT4_DIALOGUES = {
    alibe_first_meeting: {
        speaker: "Alibe",
        sprite: "🗳️",
        lines: [
            { text: "So kaley the famous Baokalo. Mashakah heard stories.", dhivehi: true },
            { text: "Aharen know what kaley think - another politician.", dhivehi: true },
            { text: "But aharen different. Aharen was president. They took it.", dhivehi: false },
            { text: "2012. The coup. Aharen remember every face.", dhivehi: false },
            { text: "Now Mooizbe destroying everything. Mashakah need help.", dhivehi: true }
        ],
        choices: [
            { text: "What kind of help?", karma: 0, response: "alibe_explain" },
            { text: "Politicians are all the same.", karma: -5, response: "alibe_cynical" },
            { text: "Aharen already work for Mooizbe.", karma: -20, response: "alibe_betray" }
        ]
    },
    
    alibe_explain: {
        speaker: "Alibe",
        sprite: "🗳️",
        lines: [
            { text: "Mooizbe controls police. Military. Courts.", dhivehi: false },
            { text: "But not the streets. That's kaley territory.", dhivehi: true },
            { text: "Mashakah need... pressure. On certain MPs.", dhivehi: false },
            { text: "Nothing violent. Just... persuasion.", dhivehi: false },
            { text: "Help mashakah pass reform bill. Aharen protect kaley operations.", dhivehi: true }
        ]
    },
    
    alibe_cynical: {
        speaker: "Alibe",
        sprite: "🗳️",
        lines: [
            { text: "*sighs* Kaley not wrong to be suspicious.", dhivehi: true },
            { text: "Aharen made mistakes. Trusted wrong people.", dhivehi: false },
            { text: "But aharen trying to fix this country.", dhivehi: true },
            { text: "Kaley can help... or watch it burn.", dhivehi: false },
            { text: "Choice is kaley.", dhivehi: true }
        ]
    },
    
    alibe_betray: {
        speaker: "Alibe",
        sprite: "🗳️",
        lines: [
            { text: "*face hardens* Kaley work for that dictator?", dhivehi: true },
            { text: "Then kaley enemy. Get out.", dhivehi: false },
            { text: "And tell Mooizbe... aharen coming for him.", dhivehi: true },
            { text: "One way or another.", dhivehi: false }
        ]
    },
    
    jabibe_bribe_offer: {
        speaker: "MP Jabibe",
        sprite: "🤵🏾",
        lines: [
            { text: "*counting money* Ah, Baokalo! Come in, come in!", dhivehi: false },
            { text: "Kaley want something passed? Blocked? Aharen can arrange.", dhivehi: true },
            { text: "50,000 rufiyaa per vote. Bulk discount for 10+.", dhivehi: false },
            { text: "Democracy is expensive, no? Hehe.", dhivehi: false }
        ],
        choices: [
            { text: "Aharen need the Gang Act delayed.", karma: -15, response: "jabibe_gang_act" },
            { text: "Who else is buying votes?", karma: 0, response: "jabibe_info" },
            { text: "Kaley disgusting. Aharen won't deal.", karma: 10, response: "jabibe_refuse" }
        ]
    },
    
    jabibe_gang_act: {
        speaker: "MP Jabibe",
        sprite: "🤵🏾",
        lines: [
            { text: "Gang Act? Tricky, tricky...", dhivehi: false },
            { text: "Government pushing hard. Death penalty clause.", dhivehi: false },
            { text: "But for right price... aharen can delay committee vote.", dhivehi: true },
            { text: "Six months. 100,000 rufiyaa. Final offer.", dhivehi: false }
        ]
    },
    
    jabibe_info: {
        speaker: "MP Jabibe",
        sprite: "🤵🏾",
        lines: [
            { text: "*leans in* Everyone, my friend. Everyone.", dhivehi: false },
            { text: "Mooizbe buys loyalty. Alibe buys opposition.", dhivehi: false },
            { text: "Chinese buy infrastructure votes. Indians buy defense.", dhivehi: false },
            { text: "Aharen? Aharen just... facilitate.", dhivehi: true },
            { text: "Information also has price. 20,000 for names.", dhivehi: false }
        ]
    },
    
    jabibe_refuse: {
        speaker: "MP Jabibe",
        sprite: "🤵🏾",
        lines: [
            { text: "*laughs* Disgusting? Aharen just honest!", dhivehi: true },
            { text: "Other MPs take money AND pretend to be clean.", dhivehi: false },
            { text: "Aharen transparent. Professional.", dhivehi: false },
            { text: "Kaley will be back. They always come back.", dhivehi: true }
        ]
    },
    
    court_meeting: {
        speaker: "Chief Justice",
        sprite: "⚖️",
        lines: [
            { text: "*in chambers* The law is... flexible.", dhivehi: false },
            { text: "Kaley friend needs charges dropped? Possible.", dhivehi: true },
            { text: "Kaley enemy needs conviction? Also possible.", dhivehi: true },
            { text: "Justice has a price. What can kaley afford?", dhivehi: false }
        ],
        choices: [
            { text: "Free Rippoo's old friends.", karma: 5, response: "justice_free" },
            { text: "Convict my rivals.", karma: -20, response: "justice_convict" },
            { text: "Record this conversation.", karma: 15, response: "justice_record" }
        ]
    },
    
    justice_free: {
        speaker: "Chief Justice",
        sprite: "⚖️",
        lines: [
            { text: "The old Sharks? Interesting...", dhivehi: false },
            { text: "They've been in Dhoonidhoo 10 years.", dhivehi: false },
            { text: "Paperwork... lost. Evidence... contaminated.", dhivehi: true },
            { text: "200,000 rufiyaa. They walk in one week.", dhivehi: false }
        ]
    },
    
    justice_convict: {
        speaker: "Chief Justice",
        sprite: "⚖️",
        lines: [
            { text: "*smiles* Now kaley speaking aharen language.", dhivehi: true },
            { text: "Give me names. Aharen find charges.", dhivehi: false },
            { text: "Terrorism is popular these days. 25 years minimum.", dhivehi: false },
            { text: "50,000 per conviction. Bulk rates available.", dhivehi: false }
        ]
    },
    
    justice_record: {
        speaker: "Chief Justice",
        sprite: "⚖️",
        lines: [
            { text: "*notices phone* What is... GUARDS!", dhivehi: true },
            { text: "Kaley think can trap me?!", dhivehi: true },
            { text: "Aharen AM the law in this country!", dhivehi: false },
            { text: "Kaley just made powerful enemy, Baokalo.", dhivehi: true }
        ]
    },
    
    coup_witness: {
        speaker: "Young Baokalo",
        sprite: "👦🏾",
        lines: [
            { text: "*hiding behind wall* Mama, what's happening?", dhivehi: true },
            { text: "Why are soldiers fighting police?", dhivehi: false },
            { text: "*explosion* MAMA!", dhivehi: true }
        ]
    },
    
    coup_rippoo_save: {
        speaker: "Rippoo (2012)",
        sprite: "👩🏾",
        lines: [
            { text: "*grabs young Baokalo* Come! NOW!", dhivehi: true },
            { text: "Don't look back! Keep running!", dhivehi: true },
            { text: "*gunfire* This way! Through the alley!", dhivehi: false },
            { text: "Aharen won't let them hurt kaley. Never.", dhivehi: true }
        ]
    },
    
    nunnu_investigation_help: {
        speaker: "Nunnu",
        sprite: "📰",
        lines: [
            { text: "*shows documents* Look at this, brother.", dhivehi: true },
            { text: "Mooizbe. Jabibe. The Chief Justice. All connected.", dhivehi: false },
            { text: "Money from China. Bribes. Offshore accounts.", dhivehi: false },
            { text: "If mashakah publish this... they'll kill me.", dhivehi: true },
            { text: "But people deserve to know.", dhivehi: false }
        ],
        choices: [
            { text: "Aharen protect kaley. Publish it.", karma: 20, familyKarma: 25, response: "nunnu_publish" },
            { text: "Too dangerous. Hide the evidence.", karma: 5, familyKarma: 10, response: "nunnu_hide" },
            { text: "Give it to me. Aharen use it for leverage.", karma: -15, familyKarma: -20, response: "nunnu_leverage" }
        ]
    },
    
    nunnu_publish: {
        speaker: "Nunnu",
        sprite: "📰",
        lines: [
            { text: "*hugs* Thank you, brother.", dhivehi: true },
            { text: "Aharen knew kaley would understand.", dhivehi: true },
            { text: "Mashakah publish tonight. International media ready.", dhivehi: false },
            { text: "They'll come for us. Be ready.", dhivehi: true }
        ]
    },
    
    nunnu_hide: {
        speaker: "Nunnu",
        sprite: "📰",
        lines: [
            { text: "*disappointed* Kaley right... it's too dangerous.", dhivehi: true },
            { text: "But someday, brother. Someday truth comes out.", dhivehi: false },
            { text: "Aharen hide copies. Multiple locations.", dhivehi: true },
            { text: "If anything happens to me... kaley know where to look.", dhivehi: true }
        ]
    },
    
    nunnu_leverage: {
        speaker: "Nunnu",
        sprite: "📰",
        lines: [
            { text: "*pulls back* Kaley want to use this for... blackmail?", dhivehi: true },
            { text: "This is about justice! Not faisaa!", dhivehi: false },
            { text: "*sighs* Fine. Take it. Kaley always were selfish.", dhivehi: true },
            { text: "Just... don't get us killed.", dhivehi: true }
        ]
    },
    
    arrest_threat: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "Baokalo. Aharen been watching kaley.", dhivehi: true },
            { text: "Drug trafficking. Murder. Extortion.", dhivehi: false },
            { text: "Aharen can make it all go away. Or...", dhivehi: true },
            { text: "Kaley can spend 25 years in Dhoonidhoo.", dhivehi: false },
            { text: "President needs... a favor.", dhivehi: true }
        ],
        choices: [
            { text: "What does Mooizbe want?", karma: -10, response: "commissioner_task" },
            { text: "Kaley can't prove anything.", karma: 0, response: "commissioner_bluff" },
            { text: "[Attack]", karma: -25, combat: true, response: "commissioner_attack" }
        ]
    },
    
    commissioner_task: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "Smart choice.", dhivehi: false },
            { text: "Alibe planning something. Big rally.", dhivehi: false },
            { text: "Mashakah need it... disrupted. Violently.", dhivehi: true },
            { text: "Make it look like gang violence. Not political.", dhivehi: false },
            { text: "Do this, and kaley file disappears forever.", dhivehi: true }
        ]
    },
    
    commissioner_bluff: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "*laughs* Can't prove? Aharen don't need proof!", dhivehi: true },
            { text: "This is Maldives. Aharen AM the proof.", dhivehi: false },
            { text: "One phone call. Terrorism charges.", dhivehi: false },
            { text: "Kaley want to test me?", dhivehi: true }
        ]
    },
    
    commissioner_attack: {
        speaker: "Commissioner Hassan",
        sprite: "👮🏾",
        lines: [
            { text: "Kaley sodu—! OFFICERS!", dhivehi: true }
        ]
    }
};

// ==================== ACT 4 RADIO CONTENT ====================
const ACT4_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Parliament passes new security bill. Opposition calls it 'dictatorship.'" },
            { type: "news", text: "President Mooizbe: 'Democracy is safe. Trust the process.'" },
            { type: "satire", text: "Chief Justice buys third yacht. 'Judges deserve nice things.'" },
            { type: "news", text: "Gang Act debate continues. Death penalty clause controversial." },
            { type: "ad", text: "Vote for stability! Vote for Mooizbe! (Paid for by definitely not China)" },
            { type: "satire", text: "MP Jabibe denies bribery. 'That was a gift! From a friend! Who wanted a favor!'" },
            { type: "news", text: "Opposition leader Alibe under investigation. Again." }
        ]
    },
    undergroundFM: {
        name: "📻 Underground FM",
        segments: [
            { type: "truth", text: "2012 coup architects now in government. Democracy died that day." },
            { type: "truth", text: "Supreme Court for sale. Highest bidder wins." },
            { type: "truth", text: "Police commissioner's offshore accounts revealed." },
            { type: "truth", text: "Gang Act designed to silence political opponents, not gangs." },
            { type: "music", text: "♪ Playing: 'February 7' - The Coup Anthem ♪" }
        ]
    }
};

// ==================== SPEECH/DEBATE MINI-GAME ====================
let speechGame = {
    active: false,
    topic: '',
    points: [],
    selectedPoints: [],
    score: 0,
    timer: 45,
    audience: 50
};

const SPEECH_TOPICS = {
    democracy: {
        name: "Democracy",
        goodPoints: ["Freedom", "Elections", "Rights", "Justice", "Transparency"],
        badPoints: ["Chaos", "Weakness", "Foreign", "Slow", "Expensive"]
    },
    security: {
        name: "Security",
        goodPoints: ["Safety", "Order", "Protection", "Stability", "Peace"],
        badPoints: ["Oppression", "Fear", "Control", "Surveillance", "Tyranny"]
    },
    economy: {
        name: "Economy",
        goodPoints: ["Jobs", "Growth", "Investment", "Tourism", "Development"],
        badPoints: ["Corruption", "Inequality", "Debt", "Foreign", "Exploitation"]
    }
};

function startSpeechGame(topic) {
    const topicData = SPEECH_TOPICS[topic] || SPEECH_TOPICS.democracy;
    
    speechGame.active = true;
    speechGame.topic = topicData.name;
    speechGame.points = [...topicData.goodPoints, ...topicData.badPoints].sort(() => Math.random() - 0.5);
    speechGame.selectedPoints = [];
    speechGame.score = 0;
    speechGame.timer = 45;
    speechGame.audience = 50;
    speechGame.goodPoints = topicData.goodPoints;
    GameState.isInMinigame = true;
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = `🎤 Speech: ${topicData.name}`;
    
    const timerInterval = setInterval(() => {
        speechGame.timer--;
        if (speechGame.timer <= 0 || !speechGame.active) {
            clearInterval(timerInterval);
            if (speechGame.active) endSpeechGame();
        }
    }, 1000);
    
    minigameCanvas.onclick = speechClickHandler;
    requestAnimationFrame(speechLoop);
}

function speechClickHandler(e) {
    if (!speechGame.active) return;
    
    const rect = minigameCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const startY = 80;
    const pointHeight = 35;
    
    speechGame.points.forEach((point, index) => {
        const y = startY + index * pointHeight;
        if (clickY >= y && clickY <= y + 30 && clickX >= 50 && clickX <= minigameCanvas.width - 50) {
            selectSpeechPoint(index);
        }
    });
}

function selectSpeechPoint(index) {
    const point = speechGame.points[index];
    
    if (speechGame.goodPoints.includes(point)) {
        speechGame.score += 20;
        speechGame.audience = Math.min(100, speechGame.audience + 10);
        showNotification('Good Point!', `+20 score`);
    } else {
        speechGame.score -= 10;
        speechGame.audience = Math.max(0, speechGame.audience - 15);
        showNotification('Bad Point!', `-10 score`);
    }
    
    speechGame.selectedPoints.push(point);
    speechGame.points.splice(index, 1);
    
    if (speechGame.points.length === 0 || speechGame.selectedPoints.length >= 5) {
        endSpeechGame();
    }
}

function speechLoop() {
    if (!speechGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Clear
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Timer
    ctx.fillStyle = speechGame.timer > 10 ? '#fff' : '#ff0000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Time: ${speechGame.timer}s`, width - 10, 20);
    
    // Score
    ctx.fillStyle = '#00ff00';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${speechGame.score}`, 10, 20);
    
    // Audience meter
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 35, 150, 15);
    ctx.fillStyle = speechGame.audience > 30 ? '#00ff00' : '#ff0000';
    ctx.fillRect(10, 35, speechGame.audience * 1.5, 15);
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.fillText(`Audience: ${speechGame.audience}%`, 15, 47);
    
    // Topic
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Topic: ${speechGame.topic}`, width / 2, 65);
    
    // Points to select
    const startY = 80;
    const pointHeight = 35;
    
    speechGame.points.forEach((point, index) => {
        const y = startY + index * pointHeight;
        
        ctx.fillStyle = '#2a2a4e';
        ctx.fillRect(50, y, width - 100, 30);
        ctx.strokeStyle = '#778da9';
        ctx.lineWidth = 1;
        ctx.strokeRect(50, y, width - 100, 30);
        
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(point, width / 2, y + 20);
    });
    
    // Instructions
    ctx.fillStyle = '#778da9';
    ctx.font = '11px Arial';
    ctx.fillText('Click points that support your argument', width / 2, height - 15);
    
    requestAnimationFrame(speechLoop);
}

function endSpeechGame() {
    speechGame.active = false;
    GameState.isInMinigame = false;
    minigameCanvas.onclick = null;
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (speechGame.score >= 60 && speechGame.audience >= 50) {
        GameState.player.money += 1000;
        showNotification('Speech Success!', `Audience convinced! +1000 faisaa`);
        updateMissionObjective('minigame', 'charisma', true);
    } else {
        showNotification('Speech Failed', 'Audience not convinced...');
    }
}

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT4_MAPS = ACT4_MAPS;
    window.ACT4_CHARACTERS = ACT4_CHARACTERS;
    window.ACT4_MISSIONS = ACT4_MISSIONS;
    window.ACT4_SIDE_MISSIONS = ACT4_SIDE_MISSIONS;
    window.ACT4_DIALOGUES = ACT4_DIALOGUES;
    window.ACT4_RADIO = ACT4_RADIO;
    window.startSpeechGame = startSpeechGame;
}
