// ============================================
// ACT 5: PRISON & REDEMPTION
// Timeline: 2019 - Incarceration and escape
// ============================================

// ==================== ACT 5 MAPS ====================
const ACT5_MAPS = {
    dhoonidhoo_interior: {
        name: "Dhoonidhoo Prison - Interior",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            cellBlockA: { x: 5, y: 5, w: 15, h: 12, name: "Cell Block A 🔒" },
            cellBlockB: { x: 30, y: 5, w: 15, h: 12, name: "Cell Block B 🔒" },
            messHall: { x: 15, y: 20, w: 20, h: 10, name: "Mess Hall 🍽️" },
            exerciseYard: { x: 5, y: 32, w: 25, h: 10, name: "Exercise Yard 🏃" },
            solitaryConfinement: { x: 35, y: 32, w: 10, h: 8, name: "Solitary 💀" },
            wardenOffice: { x: 35, y: 20, w: 10, h: 8, name: "Warden's Office 👔" },
            infirmary: { x: 20, y: 5, w: 8, h: 8, name: "Infirmary 🏥" },
            muazCell: { x: 8, y: 8, w: 4, h: 4, name: "Muaz's Cell 👤" }
        },
        isPrison: true,
        restrictedMovement: true
    },
    
    prison_tunnels: {
        name: "Escape Tunnels",
        width: 40,
        height: 35,
        spawnX: 5,
        spawnY: 30,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            tunnelEntrance: { x: 3, y: 28, w: 5, h: 5, name: "Tunnel Entrance 🕳️" },
            mainTunnel: { x: 8, y: 15, w: 25, h: 5, name: "Main Tunnel 🚇" },
            caveIn: { x: 20, y: 10, w: 8, h: 5, name: "Cave-In ⚠️" },
            underwaterSection: { x: 30, y: 5, w: 8, h: 10, name: "Underwater Exit 🌊" },
            exitPoint: { x: 35, y: 3, w: 4, h: 4, name: "Freedom 🌅" }
        },
        isDark: true,
        requiresFlashlight: true
    },
    
    flashback_father: {
        name: "1998 - Father's Last Day",
        width: 45,
        height: 40,
        spawnX: 22,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            familyHome: { x: 15, y: 20, w: 12, h: 10, name: "Ronda Home 🏠" },
            fatherWorkshop: { x: 30, y: 22, w: 8, h: 8, name: "Father's Workshop 🔧" },
            policeRaid: { x: 10, y: 10, w: 15, h: 8, name: "Raid Zone 🚔" }
        },
        isFlashback: true,
        year: 1998
    },
    
    safe_house_post_escape: {
        name: "Addu Safe House",
        width: 35,
        height: 30,
        spawnX: 17,
        spawnY: 25,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            hideout: { x: 10, y: 10, w: 15, h: 12, name: "Safe House 🏠" },
            dock: { x: 25, y: 20, w: 8, h: 8, name: "Hidden Dock 🚤" },
            lookout: { x: 5, y: 5, w: 6, h: 6, name: "Lookout Point 👁️" }
        },
        isSafeZone: true
    }
};

// ==================== ACT 5 CHARACTERS ====================
const ACT5_CHARACTERS = {
    muaz: {
        name: "Muaz",
        sprite: "👤",
        role: "Half-Brother (Revealed)",
        backstory: "Baokalo's half-brother from father's secret second family. In prison for gang activity. Knows the truth about their father's death.",
        dialogues: {
            first_meeting: {
                speaker: "Muaz",
                sprite: "👤",
                lines: [
                    { text: "*stares* Kaley... kaley Baokalo, right?", dhivehi: true },
                    { text: "Aharen been waiting for this moment.", dhivehi: true },
                    { text: "Kaley don't know me. But aharen know kaley.", dhivehi: true },
                    { text: "Mashakah share same blood. Same father.", dhivehi: true },
                    { text: "*shows scar* He gave us both this life.", dhivehi: false }
                ],
                choices: [
                    { text: "What are kaley talking about?", karma: 0, response: "muaz_explain" },
                    { text: "Aharen have no brother.", karma: -5, response: "muaz_denial" },
                    { text: "Father... he had another family?", karma: 5, response: "muaz_truth" }
                ]
            }
        }
    },
    
    warden: {
        name: "Warden Rasheed",
        sprite: "👔",
        role: "Prison Warden",
        backstory: "Corrupt warden who runs prison like personal fiefdom. Takes bribes, arranges 'accidents'. Connected to Mooizbe.",
        dialogues: {
            intimidation: {
                speaker: "Warden Rasheed",
                sprite: "👔",
                lines: [
                    { text: "*in office* The famous Baokalo. In MY prison.", dhivehi: false },
                    { text: "Kaley caused lot of trouble outside.", dhivehi: true },
                    { text: "In here? Aharen am god. Aharen decide who lives.", dhivehi: true },
                    { text: "Behave... and maybe kaley survive.", dhivehi: false },
                    { text: "Or... accidents happen. Understand?", dhivehi: true }
                ],
                choices: [
                    { text: "Aharen understand, sir.", karma: -5, response: "warden_submit" },
                    { text: "Kaley don't scare me.", karma: 5, response: "warden_defiant" },
                    { text: "How much for better treatment?", karma: -10, response: "warden_bribe" }
                ]
            }
        }
    },
    
    prisonGangLeader: {
        name: "Big Ismail",
        sprite: "💪🏾",
        role: "Prison Gang Boss",
        backstory: "Controls prison black market. Former Masodi lieutenant. Knows everyone's secrets.",
        dialogues: {
            alliance_offer: {
                speaker: "Big Ismail",
                sprite: "💪🏾",
                lines: [
                    { text: "*in yard* Fresh meat. Baokalo.", dhivehi: false },
                    { text: "Kaley reputation precedes kaley.", dhivehi: true },
                    { text: "In here, kaley need friends. Protection.", dhivehi: false },
                    { text: "Work with mashakah. Run contraband.", dhivehi: true },
                    { text: "Or... kaley on kaley own. Not recommended.", dhivehi: false }
                ],
                choices: [
                    { text: "What's the deal?", karma: -10, response: "ismail_deal" },
                    { text: "Aharen work alone.", karma: 0, response: "ismail_refuse" },
                    { text: "Aharen take over. Kaley work for me.", karma: -15, response: "ismail_challenge" }
                ]
            }
        }
    },
    
    oldPrisoner: {
        name: "Old Man Hussain",
        sprite: "👴🏾",
        role: "Long-term Prisoner / Father's Friend",
        backstory: "Knew Baokalo's father. In prison 25 years. Knows the truth about the Ronda family.",
        dialogues: {
            father_truth: {
                speaker: "Old Man Hussain",
                sprite: "👴🏾",
                lines: [
                    { text: "*coughs* Kaley... kaley look like him.", dhivehi: true },
                    { text: "Kaley father. Ibrahim. Good man.", dhivehi: true },
                    { text: "He didn't deserve what happened.", dhivehi: false },
                    { text: "They set him up. The politicians.", dhivehi: false },
                    { text: "He knew too much. About the 1988 coup.", dhivehi: true },
                    { text: "About who REALLY brought the mercenaries.", dhivehi: false }
                ],
                choices: [
                    { text: "Tell me everything.", karma: 5, response: "hussain_full_story" },
                    { text: "Who killed him?", karma: 0, response: "hussain_killer" },
                    { text: "Aharen don't want to know.", karma: -5, response: "hussain_ignore" }
                ]
            }
        }
    },
    
    youngBaokaloChild: {
        name: "Young Baokalo (1998)",
        sprite: "👦🏾",
        role: "5-year-old Baokalo",
        backstory: "Flashback character. Witnessed father's arrest.",
        dialogues: {
            father_arrest: {
                speaker: "Young Baokalo",
                sprite: "👦🏾",
                lines: [
                    { text: "*crying* Bappa! Bappa!", dhivehi: true },
                    { text: "Where are they taking Bappa?!", dhivehi: true },
                    { text: "*Rippoo holds him* Mama! Make them stop!", dhivehi: true }
                ]
            }
        }
    },
    
    father: {
        name: "Ibrahim Ronda (Father)",
        sprite: "👨🏾",
        role: "Baokalo's Father (Flashback)",
        backstory: "Mechanic who knew too much. Killed in prison under mysterious circumstances.",
        dialogues: {
            last_words: {
                speaker: "Ibrahim",
                sprite: "👨🏾",
                lines: [
                    { text: "*being dragged away* Take care of your mother!", dhivehi: true },
                    { text: "Protect your sister! Be strong!", dhivehi: true },
                    { text: "Aharen love kaley! Always!", dhivehi: true },
                    { text: "*to Rippoo* Tell him the truth. When he's ready.", dhivehi: true }
                ]
            }
        }
    },
    
    escapeContact: {
        name: "Guard Fazeel",
        sprite: "👮🏾",
        role: "Corrupt Guard / Escape Contact",
        backstory: "Takes bribes to look the other way. Key to escape plan.",
        dialogues: {
            escape_plan: {
                speaker: "Guard Fazeel",
                sprite: "👮🏾",
                lines: [
                    { text: "*whispers* Kaley want out? Aharen can help.", dhivehi: true },
                    { text: "Old tunnel from construction days.", dhivehi: false },
                    { text: "50,000 rufiyaa. Half now, half when kaley free.", dhivehi: false },
                    { text: "But kaley need to move fast. Warden suspicious.", dhivehi: true }
                ],
                choices: [
                    { text: "Deal. When do we go?", karma: -5, response: "fazeel_accept" },
                    { text: "How do aharen know this isn't trap?", karma: 0, response: "fazeel_suspicious" },
                    { text: "Aharen serve my time.", karma: 10, response: "fazeel_refuse" }
                ]
            }
        }
    }
};

// ==================== ACT 5 MISSIONS ====================
const ACT5_MISSIONS = [
    {
        id: "act5_m1",
        title: "Welcome to Dhoonidhoo",
        type: "story",
        description: "Arrive at prison and meet the warden",
        objectives: [
            { type: "trigger", target: "prisonArrival", current: false },
            { type: "travel", target: "wardenOffice", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "warden_intimidation",
        unlocks: ["act5_m2"]
    },
    {
        id: "act5_m2",
        title: "Cell Block Politics",
        type: "story",
        description: "Navigate prison gang dynamics",
        objectives: [
            { type: "travel", target: "cellBlockA", current: false },
            { type: "trigger", target: "ismailMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "ismail_alliance_offer",
        unlocks: ["act5_m3", "act5_m4"],
        moralChoice: true
    },
    {
        id: "act5_m3",
        title: "Contraband Runner",
        type: "stealth",
        description: "Smuggle goods for Big Ismail",
        objectives: [
            { type: "collect", target: "contraband", count: 5, current: 0 },
            { type: "deliver", target: "cellBlockB", current: false },
            { type: "avoid", target: "guard", current: false }
        ],
        rewards: { money: 500, karma: -15 },
        unlocks: ["act5_m5"],
        requiresChoice: "ismail_deal"
    },
    {
        id: "act5_m4",
        title: "Lone Wolf",
        type: "survival",
        description: "Survive without gang protection",
        objectives: [
            { type: "survive", target: "prisonDays", duration: 3, current: 0 },
            { type: "defeat", target: "attacker", count: 3, current: 0 }
        ],
        rewards: { money: 0, karma: 5 },
        unlocks: ["act5_m5"],
        requiresChoice: "ismail_refuse"
    },
    {
        id: "act5_m5",
        title: "Blood Revelation",
        type: "story",
        description: "Meet your half-brother Muaz",
        objectives: [
            { type: "travel", target: "muazCell", current: false },
            { type: "trigger", target: "muazMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "muaz_first_meeting",
        unlocks: ["act5_m6"],
        majorReveal: true
    },
    {
        id: "act5_m6",
        title: "Father's Shadow",
        type: "story",
        description: "Learn the truth from Old Man Hussain",
        objectives: [
            { type: "travel", target: "exerciseYard", current: false },
            { type: "trigger", target: "hussainMeeting", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "hussain_father_truth",
        unlocks: ["act5_m7"]
    },
    {
        id: "act5_m7",
        title: "Flashback: The Arrest",
        type: "flashback",
        description: "Relive the day father was taken",
        objectives: [
            { type: "travel", target: "flashback_father", current: false },
            { type: "witness", target: "fatherArrest", current: false }
        ],
        rewards: { karma: 0 },
        dialogueStart: "father_last_words",
        unlocks: ["act5_m8"],
        isFlashback: true,
        specialMusic: "sad_theme"
    },
    {
        id: "act5_m8",
        title: "Brotherhood",
        type: "story",
        description: "Bond with Muaz in prison",
        objectives: [
            { type: "talk", target: "muaz", count: 3, current: 0 },
            { type: "help", target: "muazFight", current: false }
        ],
        rewards: { money: 0, familyKarma: 20 },
        unlocks: ["act5_m9"]
    },
    {
        id: "act5_m9",
        title: "Escape Plan",
        type: "story",
        description: "Contact the corrupt guard",
        objectives: [
            { type: "collect", target: "bribeMoney", amount: 25000, current: 0 },
            { type: "trigger", target: "fazeelMeeting", current: false }
        ],
        rewards: { money: -25000 },
        dialogueStart: "fazeel_escape_plan",
        unlocks: ["act5_m10", "act5_m11"],
        moralChoice: true
    },
    {
        id: "act5_m10",
        title: "Tunnel Run",
        type: "escape",
        description: "Escape through the tunnels with Muaz",
        objectives: [
            { type: "travel", target: "prison_tunnels", current: false },
            { type: "navigate", target: "mainTunnel", current: false },
            { type: "survive", target: "caveIn", current: false },
            { type: "swim", target: "underwaterSection", current: false },
            { type: "reach", target: "exitPoint", current: false }
        ],
        rewards: { money: 0, karma: -10 },
        unlocks: ["act5_m12"],
        requiresChoice: "fazeel_accept",
        tensionMusic: true
    },
    {
        id: "act5_m11",
        title: "Serve Your Time",
        type: "patience",
        description: "Complete your sentence honorably",
        objectives: [
            { type: "survive", target: "prisonMonths", duration: 6, current: 0 },
            { type: "avoid", target: "trouble", current: false },
            { type: "help", target: "inmates", count: 5, current: 0 }
        ],
        rewards: { money: 0, karma: 25, familyKarma: 15 },
        unlocks: ["act5_m12"],
        requiresChoice: "fazeel_refuse"
    },
    {
        id: "act5_m12",
        title: "Safe House",
        type: "story",
        description: "Reach the Addu safe house",
        objectives: [
            { type: "travel", target: "safe_house_post_escape", current: false },
            { type: "trigger", target: "safeArrival", current: false }
        ],
        rewards: { money: 1000 },
        unlocks: ["act5_climax"]
    },
    {
        id: "act5_climax",
        title: "New Beginning",
        type: "story",
        description: "Plan the next move with Muaz",
        objectives: [
            { type: "talk", target: "muaz", current: false },
            { type: "decide", target: "futureChoice", current: false }
        ],
        rewards: { money: 5000 },
        unlocks: ["act6_start"],
        actEnd: true,
        majorChoice: "redemption_path"
    }
];

// ==================== ACT 5 SIDE MISSIONS ====================
const ACT5_SIDE_MISSIONS = [
    { id: "side5_contraband1", title: "Cigarette Run", type: "smuggling", reward: 200 },
    { id: "side5_contraband2", title: "Phone Smuggling", type: "smuggling", reward: 400 },
    { id: "side5_contraband3", title: "Drug Mule", type: "smuggling", reward: 600 },
    { id: "side5_fight1", title: "Yard Fight I", type: "combat", reward: 150 },
    { id: "side5_fight2", title: "Yard Fight II", type: "combat", reward: 250 },
    { id: "side5_fight3", title: "Cell Block Brawl", type: "combat", reward: 400 },
    { id: "side5_favor1", title: "Inmate Favor I", type: "fetch", reward: 100 },
    { id: "side5_favor2", title: "Inmate Favor II", type: "fetch", reward: 150 },
    { id: "side5_info1", title: "Information Trade", type: "dialogue", reward: 200 },
    { id: "side5_info2", title: "Snitch Hunt", type: "investigation", reward: 300 },
    { id: "side5_exercise", title: "Workout Challenge", type: "minigame", game: "exercise", reward: 100 },
    { id: "side5_chess", title: "Chess Match", type: "minigame", game: "strategy", reward: 150 }
];

// ==================== ACT 5 DIALOGUES ====================
const ACT5_DIALOGUES = {
    warden_intimidation: {
        speaker: "Warden Rasheed",
        sprite: "👔",
        lines: [
            { text: "*in office* The famous Baokalo. In MY prison.", dhivehi: false },
            { text: "Kaley caused lot of trouble outside.", dhivehi: true },
            { text: "In here? Aharen am god. Aharen decide who lives.", dhivehi: true },
            { text: "Behave... and maybe kaley survive.", dhivehi: false },
            { text: "Or... accidents happen. Understand?", dhivehi: true }
        ],
        choices: [
            { text: "Aharen understand, sir.", karma: -5, response: "warden_submit" },
            { text: "Kaley don't scare me.", karma: 5, response: "warden_defiant" },
            { text: "How much for better treatment?", karma: -10, response: "warden_bribe" }
        ]
    },
    
    warden_submit: {
        speaker: "Warden Rasheed",
        sprite: "👔",
        lines: [
            { text: "*smirks* Good. Kaley learning already.", dhivehi: true },
            { text: "Cell Block A. Bunk 7. Don't cause trouble.", dhivehi: false },
            { text: "Guards! Take him away.", dhivehi: false }
        ]
    },
    
    warden_defiant: {
        speaker: "Warden Rasheed",
        sprite: "👔",
        lines: [
            { text: "*laughs* Brave words. Stupid, but brave.", dhivehi: false },
            { text: "Kaley remind me of another tough guy.", dhivehi: true },
            { text: "He's in solitary now. Three years.", dhivehi: false },
            { text: "Solitary for kaley first week. Think about attitude.", dhivehi: true }
        ]
    },
    
    warden_bribe: {
        speaker: "Warden Rasheed",
        sprite: "👔",
        lines: [
            { text: "*interested* Kaley speak aharen language.", dhivehi: true },
            { text: "5000 rufiyaa monthly. Private cell.", dhivehi: false },
            { text: "10000 for... special privileges.", dhivehi: false },
            { text: "Family can deposit to aharen account.", dhivehi: true }
        ]
    },
    
    ismail_alliance_offer: {
        speaker: "Big Ismail",
        sprite: "💪🏾",
        lines: [
            { text: "*in yard* Fresh meat. Baokalo.", dhivehi: false },
            { text: "Kaley reputation precedes kaley.", dhivehi: true },
            { text: "In here, kaley need friends. Protection.", dhivehi: false },
            { text: "Work with mashakah. Run contraband.", dhivehi: true },
            { text: "Or... kaley on kaley own. Not recommended.", dhivehi: false }
        ],
        choices: [
            { text: "What's the deal?", karma: -10, response: "ismail_deal" },
            { text: "Aharen work alone.", karma: 0, response: "ismail_refuse" },
            { text: "Aharen take over. Kaley work for me.", karma: -15, response: "ismail_challenge" }
        ]
    },
    
    ismail_deal: {
        speaker: "Big Ismail",
        sprite: "💪🏾",
        lines: [
            { text: "*nods* Smart choice.", dhivehi: false },
            { text: "Phones, cigarettes, drugs. All come through mashakah.", dhivehi: true },
            { text: "Kaley distribute to Cell Block A. 20% cut.", dhivehi: false },
            { text: "Don't get caught. Don't talk to guards.", dhivehi: true },
            { text: "Welcome to the family.", dhivehi: false }
        ]
    },
    
    ismail_refuse: {
        speaker: "Big Ismail",
        sprite: "💪🏾",
        lines: [
            { text: "*shrugs* Kaley choice.", dhivehi: true },
            { text: "But remember - in here, alone means dead.", dhivehi: false },
            { text: "Mashakah won't protect kaley. Won't help kaley.", dhivehi: true },
            { text: "Good luck, Baokalo. Kaley need it.", dhivehi: false }
        ]
    },
    
    ismail_challenge: {
        speaker: "Big Ismail",
        sprite: "💪🏾",
        lines: [
            { text: "*laughs* Kaley got balls! Big balls!", dhivehi: true },
            { text: "But kaley new here. Aharen been king 10 years.", dhivehi: false },
            { text: "Want my throne? Take it.", dhivehi: true },
            { text: "*cracks knuckles* Right here. Right now.", dhivehi: false }
        ]
    },
    
    muaz_first_meeting: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*stares* Kaley... kaley Baokalo, right?", dhivehi: true },
            { text: "Aharen been waiting for this moment.", dhivehi: true },
            { text: "Kaley don't know me. But aharen know kaley.", dhivehi: true },
            { text: "Mashakah share same blood. Same father.", dhivehi: true },
            { text: "*shows scar* He gave us both this life.", dhivehi: false }
        ],
        choices: [
            { text: "What are kaley talking about?", karma: 0, response: "muaz_explain" },
            { text: "Aharen have no brother.", karma: -5, response: "muaz_denial" },
            { text: "Father... he had another family?", karma: 5, response: "muaz_truth" }
        ]
    },
    
    muaz_explain: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*sighs* Ibrahim Ronda. Our father.", dhivehi: true },
            { text: "He had two families. Kaley mother Rippoo.", dhivehi: false },
            { text: "And aharen mother. Fathimath. In Addu.", dhivehi: true },
            { text: "He visited us when he could. Before...", dhivehi: false },
            { text: "Before they killed him.", dhivehi: true }
        ]
    },
    
    muaz_denial: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*angry* Denial won't change blood!", dhivehi: true },
            { text: "Look at us! Same eyes. Same jaw.", dhivehi: false },
            { text: "Kaley mother knows. Ask her.", dhivehi: true },
            { text: "Aharen not here to fight. Aharen here for truth.", dhivehi: false }
        ]
    },
    
    muaz_truth: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "*nods slowly* Kaley ready to hear.", dhivehi: true },
            { text: "Father was good man. Tried to provide for both families.", dhivehi: false },
            { text: "But he knew things. Dangerous things.", dhivehi: true },
            { text: "About 1988. About who really planned the coup.", dhivehi: false },
            { text: "They silenced him. Made it look like accident.", dhivehi: true },
            { text: "Aharen been searching for truth. Now mashakah search together.", dhivehi: true }
        ]
    },
    
    hussain_father_truth: {
        speaker: "Old Man Hussain",
        sprite: "👴🏾",
        lines: [
            { text: "*coughs* Kaley... kaley look like him.", dhivehi: true },
            { text: "Kaley father. Ibrahim. Good man.", dhivehi: true },
            { text: "He didn't deserve what happened.", dhivehi: false },
            { text: "They set him up. The politicians.", dhivehi: false },
            { text: "He knew too much. About the 1988 coup.", dhivehi: true },
            { text: "About who REALLY brought the mercenaries.", dhivehi: false }
        ],
        choices: [
            { text: "Tell me everything.", karma: 5, response: "hussain_full_story" },
            { text: "Who killed him?", karma: 0, response: "hussain_killer" },
            { text: "Aharen don't want to know.", karma: -5, response: "hussain_ignore" }
        ]
    },
    
    hussain_full_story: {
        speaker: "Old Man Hussain",
        sprite: "👴🏾",
        lines: [
            { text: "1988. Everyone blames Luthufi. The businessman.", dhivehi: false },
            { text: "But he was just... middleman.", dhivehi: true },
            { text: "Real planners? Inside government. Inside Gayoom's circle.", dhivehi: false },
            { text: "Kaley father fixed their boats. Heard conversations.", dhivehi: true },
            { text: "He could have exposed them. So they framed him.", dhivehi: false },
            { text: "Drug charges. Then 'suicide' in prison.", dhivehi: true },
            { text: "Same people still in power. Different titles.", dhivehi: false }
        ]
    },
    
    hussain_killer: {
        speaker: "Old Man Hussain",
        sprite: "👴🏾",
        lines: [
            { text: "*looks around* Names are dangerous.", dhivehi: true },
            { text: "But... one man gave the order.", dhivehi: false },
            { text: "He's old now. Still powerful.", dhivehi: true },
            { text: "His son... in government today.", dhivehi: false },
            { text: "Kaley want revenge? Be careful.", dhivehi: true },
            { text: "They killed kaley father. They'll kill kaley too.", dhivehi: false }
        ]
    },
    
    hussain_ignore: {
        speaker: "Old Man Hussain",
        sprite: "👴🏾",
        lines: [
            { text: "*sad* Maybe kaley right.", dhivehi: true },
            { text: "Truth is heavy burden.", dhivehi: false },
            { text: "But it finds way out. Always.", dhivehi: true },
            { text: "When kaley ready... aharen here.", dhivehi: true }
        ]
    },
    
    father_last_words: {
        speaker: "Ibrahim",
        sprite: "👨🏾",
        lines: [
            { text: "*being dragged away* Take care of your mother!", dhivehi: true },
            { text: "Protect your sister! Be strong!", dhivehi: true },
            { text: "Aharen love kaley! Always!", dhivehi: true },
            { text: "*to Rippoo* Tell him the truth. When he's ready.", dhivehi: true }
        ]
    },
    
    fazeel_escape_plan: {
        speaker: "Guard Fazeel",
        sprite: "👮🏾",
        lines: [
            { text: "*whispers* Kaley want out? Aharen can help.", dhivehi: true },
            { text: "Old tunnel from construction days.", dhivehi: false },
            { text: "50,000 rufiyaa. Half now, half when kaley free.", dhivehi: false },
            { text: "But kaley need to move fast. Warden suspicious.", dhivehi: true }
        ],
        choices: [
            { text: "Deal. When do we go?", karma: -5, response: "fazeel_accept" },
            { text: "How do aharen know this isn't trap?", karma: 0, response: "fazeel_suspicious" },
            { text: "Aharen serve my time.", karma: 10, response: "fazeel_refuse" }
        ]
    },
    
    fazeel_accept: {
        speaker: "Guard Fazeel",
        sprite: "👮🏾",
        lines: [
            { text: "*nods* Tomorrow night. 2 AM.", dhivehi: false },
            { text: "Aharen unlock maintenance door.", dhivehi: true },
            { text: "Tunnel entrance in basement. Follow it.", dhivehi: false },
            { text: "Exits near old dock. Boat waiting.", dhivehi: true },
            { text: "Don't be late. Aharen won't wait.", dhivehi: false }
        ]
    },
    
    fazeel_suspicious: {
        speaker: "Guard Fazeel",
        sprite: "👮🏾",
        lines: [
            { text: "*shrugs* Kaley don't trust? Fine.", dhivehi: true },
            { text: "But ask around. Aharen helped others.", dhivehi: false },
            { text: "Aharen not loyal to warden. He's monster.", dhivehi: true },
            { text: "Kaley choice. Freedom or rot here.", dhivehi: false }
        ]
    },
    
    fazeel_refuse: {
        speaker: "Guard Fazeel",
        sprite: "👮🏾",
        lines: [
            { text: "*surprised* Kaley... want to stay?", dhivehi: true },
            { text: "First time aharen hear that.", dhivehi: false },
            { text: "Kaley either brave or stupid.", dhivehi: true },
            { text: "Good luck, Baokalo. Kaley need it here.", dhivehi: false }
        ]
    }
};

// ==================== ACT 5 RADIO CONTENT ====================
const ACT5_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Gang leader Baokalo sentenced to 15 years. Justice served!" },
            { type: "news", text: "Prison reform bill rejected. 'Conditions are fine' - Warden" },
            { type: "satire", text: "Dhoonidhoo: 5-star accommodation for criminals! (Bribes extra)" },
            { type: "news", text: "Escaped prisoner recaptured. 'Security is tight' - Police" },
            { type: "ad", text: "Visit Maldives! Where even prisons have ocean views!" }
        ]
    },
    undergroundFM: {
        name: "📻 Underground FM",
        segments: [
            { type: "truth", text: "Dhoonidhoo death toll covered up. 15 'suicides' this year." },
            { type: "truth", text: "Warden Rasheed's Swiss accounts revealed." },
            { type: "truth", text: "Political prisoners mixed with violent criminals. Intentional?" },
            { type: "music", text: "♪ Playing: 'Prison Blues' - Dhoonidhoo Anthem ♪" }
        ]
    }
};

// ==================== PRISON MINI-GAMES ====================

// Exercise Yard Workout
let workoutGame = {
    active: false,
    exercise: '',
    reps: 0,
    targetReps: 0,
    timer: 30,
    score: 0
};

function startWorkoutGame() {
    workoutGame.active = true;
    workoutGame.exercise = ['Push-ups', 'Squats', 'Burpees'][Math.floor(Math.random() * 3)];
    workoutGame.reps = 0;
    workoutGame.targetReps = 15 + Math.floor(Math.random() * 10);
    workoutGame.timer = 30;
    workoutGame.score = 0;
    GameState.isInMinigame = true;
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = `💪 ${workoutGame.exercise}`;
    
    const timerInterval = setInterval(() => {
        workoutGame.timer--;
        if (workoutGame.timer <= 0 || !workoutGame.active) {
            clearInterval(timerInterval);
            if (workoutGame.active) endWorkoutGame();
        }
    }, 1000);
    
    document.addEventListener('keydown', workoutKeyHandler);
    requestAnimationFrame(workoutLoop);
}

function workoutKeyHandler(e) {
    if (!workoutGame.active) return;
    
    if (e.key === ' ' || e.key === 'Enter') {
        workoutGame.reps++;
        workoutGame.score += 10;
        
        if (workoutGame.reps >= workoutGame.targetReps) {
            endWorkoutGame();
        }
    }
}

function workoutLoop() {
    if (!workoutGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Timer
    ctx.fillStyle = workoutGame.timer > 10 ? '#fff' : '#ff0000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Time: ${workoutGame.timer}s`, width - 10, 25);
    
    // Exercise name
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(workoutGame.exercise, width / 2, 50);
    
    // Progress bar
    const progress = workoutGame.reps / workoutGame.targetReps;
    ctx.fillStyle = '#333';
    ctx.fillRect(50, 80, width - 100, 30);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(50, 80, (width - 100) * Math.min(1, progress), 30);
    
    // Reps counter
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`${workoutGame.reps} / ${workoutGame.targetReps}`, width / 2, 160);
    
    // Character animation
    const bounce = Math.sin(workoutGame.reps * 0.5) * 10;
    ctx.font = '60px Arial';
    ctx.fillText('🏋️', width / 2, 220 + bounce);
    
    // Instructions
    ctx.fillStyle = '#778da9';
    ctx.font = '14px Arial';
    ctx.fillText('Press SPACE or ENTER rapidly!', width / 2, height - 20);
    
    requestAnimationFrame(workoutLoop);
}

function endWorkoutGame() {
    workoutGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', workoutKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (workoutGame.reps >= workoutGame.targetReps) {
        GameState.player.maxHealth += 5;
        showNotification('Workout Complete!', '+5 Max Health');
    } else {
        showNotification('Workout Failed', `Only ${workoutGame.reps} reps`);
    }
}

// Tunnel Navigation (for escape)
let tunnelGame = {
    active: false,
    position: 0,
    oxygen: 100,
    obstacles: [],
    distance: 100,
    speed: 1
};

function startTunnelGame() {
    tunnelGame.active = true;
    tunnelGame.position = 0;
    tunnelGame.oxygen = 100;
    tunnelGame.obstacles = [];
    tunnelGame.distance = 100;
    tunnelGame.speed = 1;
    GameState.isInMinigame = true;
    
    // Generate obstacles
    for (let i = 0; i < 10; i++) {
        tunnelGame.obstacles.push({
            x: 20 + i * 10,
            type: Math.random() < 0.5 ? 'rock' : 'water'
        });
    }
    
    document.getElementById('minigame-overlay').classList.remove('hidden');
    document.getElementById('minigame-title').textContent = '🕳️ Escape Tunnel';
    
    document.addEventListener('keydown', tunnelKeyHandler);
    requestAnimationFrame(tunnelLoop);
}

function tunnelKeyHandler(e) {
    if (!tunnelGame.active) return;
    
    if (e.key === 'ArrowRight' || e.key === 'd') {
        tunnelGame.position += tunnelGame.speed;
    } else if (e.key === ' ') {
        // Jump over obstacle
        tunnelGame.speed = 2;
        setTimeout(() => tunnelGame.speed = 1, 500);
    }
}

function tunnelLoop() {
    if (!tunnelGame.active) return;
    
    const ctx = minigameCtx;
    const width = minigameCanvas.width;
    const height = minigameCanvas.height;
    
    // Decrease oxygen
    tunnelGame.oxygen -= 0.1;
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Oxygen bar
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, 150, 20);
    ctx.fillStyle = tunnelGame.oxygen > 30 ? '#00aaff' : '#ff0000';
    ctx.fillRect(10, 10, tunnelGame.oxygen * 1.5, 20);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`O₂: ${Math.floor(tunnelGame.oxygen)}%`, 15, 25);
    
    // Progress
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 40, width - 20, 15);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(10, 40, (width - 20) * (tunnelGame.position / tunnelGame.distance), 15);
    
    // Tunnel visualization
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 80, width, height - 100);
    
    // Player
    const playerX = 50;
    ctx.font = '30px Arial';
    ctx.fillText('🏃', playerX, 150);
    
    // Obstacles
    tunnelGame.obstacles.forEach(obs => {
        const obsX = (obs.x - tunnelGame.position) * 10 + 100;
        if (obsX > 0 && obsX < width) {
            ctx.font = '25px Arial';
            ctx.fillText(obs.type === 'rock' ? '🪨' : '💧', obsX, 150);
        }
    });
    
    // Check win/lose
    if (tunnelGame.position >= tunnelGame.distance) {
        endTunnelGame(true);
        return;
    }
    
    if (tunnelGame.oxygen <= 0) {
        endTunnelGame(false);
        return;
    }
    
    // Instructions
    ctx.fillStyle = '#778da9';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('→ or D to move | SPACE to jump', width / 2, height - 10);
    
    requestAnimationFrame(tunnelLoop);
}

function endTunnelGame(success) {
    tunnelGame.active = false;
    GameState.isInMinigame = false;
    document.removeEventListener('keydown', tunnelKeyHandler);
    document.getElementById('minigame-overlay').classList.add('hidden');
    
    if (success) {
        showNotification('Escaped!', 'Freedom awaits...');
        updateMissionObjective('reach', 'exitPoint', true);
    } else {
        showNotification('Caught!', 'Ran out of oxygen');
        GameState.player.health -= 30;
    }
}

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT5_MAPS = ACT5_MAPS;
    window.ACT5_CHARACTERS = ACT5_CHARACTERS;
    window.ACT5_MISSIONS = ACT5_MISSIONS;
    window.ACT5_SIDE_MISSIONS = ACT5_SIDE_MISSIONS;
    window.ACT5_DIALOGUES = ACT5_DIALOGUES;
    window.ACT5_RADIO = ACT5_RADIO;
    window.startWorkoutGame = startWorkoutGame;
    window.startTunnelGame = startTunnelGame;
}
