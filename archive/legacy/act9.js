// ============================================
// ACT 9: ELECTION CHAOS
// Timeline: 2023 - The Presidential Election
// ============================================

// ==================== ACT 9 MAPS ====================
const ACT9_MAPS = {
    campaign_hq_mooizbe: {
        name: "Mooizbe Campaign HQ",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 20, y: 38, w: 10, h: 6, name: "HQ Entrance 🚪" },
            mainHall: { x: 10, y: 25, w: 30, h: 12, name: "Main Hall 🏛️" },
            warRoom: { x: 35, y: 10, w: 12, h: 12, name: "War Room 🗺️" },
            mediaCenter: { x: 5, y: 10, w: 15, h: 12, name: "Media Center 📺" },
            mooizbeOffice: { x: 20, y: 5, w: 12, h: 8, name: "President's Office 🪑" }
        },
        isInterior: true,
        isPolitical: true
    },
    
    campaign_hq_alibe: {
        name: "Alibe Opposition HQ",
        width: 45,
        height: 40,
        spawnX: 22,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 18, y: 32, w: 8, h: 6, name: "Opposition HQ 🚪" },
            meetingRoom: { x: 10, y: 20, w: 25, h: 10, name: "Meeting Room 🤝" },
            alibeOffice: { x: 30, y: 8, w: 10, h: 10, name: "Alibe's Office 📋" },
            volunteerArea: { x: 5, y: 8, w: 12, h: 10, name: "Volunteer Center 👥" }
        },
        isInterior: true,
        isPolitical: true
    },
    
    rally_ground: {
        name: "Republic Square - Rally Ground",
        width: 60,
        height: 55,
        spawnX: 30,
        spawnY: 50,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 25, y: 48, w: 10, h: 6, name: "Square Entrance 🚶" },
            mainStage: { x: 20, y: 10, w: 20, h: 12, name: "Main Stage 🎤" },
            crowdArea: { x: 10, y: 22, w: 40, h: 25, name: "Crowd Area 👥" },
            vipSection: { x: 35, y: 12, w: 10, h: 8, name: "VIP Section ⭐" },
            mediaArea: { x: 5, y: 15, w: 10, h: 10, name: "Media Zone 📷" },
            securityPost: { x: 50, y: 40, w: 8, h: 8, name: "Security Post 🚔" }
        },
        isOutdoor: true,
        isRally: true
    },
    
    tv_station: {
        name: "Raajje TV Station",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            lobby: { x: 18, y: 35, w: 14, h: 8, name: "TV Lobby 🏢" },
            newsroom: { x: 5, y: 20, w: 20, h: 14, name: "Newsroom 📰" },
            studio: { x: 28, y: 20, w: 18, h: 14, name: "Live Studio 🎬" },
            controlRoom: { x: 35, y: 8, w: 12, h: 10, name: "Control Room 🎛️" },
            serverRoom: { x: 5, y: 8, w: 12, h: 10, name: "Server Room 💾" }
        },
        isInterior: true,
        isMedia: true
    },
    
    debate_hall: {
        name: "National Debate Hall",
        width: 55,
        height: 50,
        spawnX: 27,
        spawnY: 45,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 22, y: 42, w: 10, h: 6, name: "Hall Entrance 🚪" },
            debateStage: { x: 15, y: 10, w: 25, h: 15, name: "Debate Stage 🎤" },
            audienceLeft: { x: 5, y: 25, w: 15, h: 15, name: "Mooizbe Supporters 🔵" },
            audienceRight: { x: 35, y: 25, w: 15, h: 15, name: "Alibe Supporters 🟡" },
            moderatorDesk: { x: 22, y: 8, w: 10, h: 6, name: "Moderator Desk 📋" },
            backstage: { x: 40, y: 5, w: 12, h: 10, name: "Backstage 🎭" }
        },
        isInterior: true,
        isDebate: true
    },
    
    voting_center: {
        name: "Malé Voting Center",
        width: 45,
        height: 40,
        spawnX: 22,
        spawnY: 35,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 18, y: 32, w: 8, h: 6, name: "Voting Center 🗳️" },
            registrationDesk: { x: 10, y: 22, w: 12, h: 8, name: "Registration 📝" },
            votingBooths: { x: 25, y: 15, w: 15, h: 15, name: "Voting Booths 🗳️" },
            countingRoom: { x: 5, y: 8, w: 15, h: 10, name: "Counting Room 📊" },
            observerArea: { x: 30, y: 8, w: 10, h: 8, name: "Observer Area 👁️" }
        },
        isInterior: true,
        isVoting: true
    },
    
    election_night: {
        name: "Election Night - Results Center",
        width: 50,
        height: 45,
        spawnX: 25,
        spawnY: 40,
        tiles: [],
        npcs: [],
        items: [],
        zones: {
            entrance: { x: 20, y: 38, w: 10, h: 6, name: "Results Center 🚪" },
            mainScreen: { x: 15, y: 10, w: 20, h: 12, name: "Results Screen 📺" },
            pressArea: { x: 5, y: 22, w: 15, h: 12, name: "Press Area 📰" },
            vipLounge: { x: 35, y: 22, w: 12, h: 12, name: "VIP Lounge 🥂" },
            securityOffice: { x: 38, y: 8, w: 10, h: 10, name: "Security Office 🔒" }
        },
        isInterior: true,
        isElectionNight: true
    }
};

// ==================== ACT 9 CHARACTERS ====================
const ACT9_CHARACTERS = {
    mooizbe: {
        name: "President Mooizbe",
        sprite: "🎩",
        role: "Incumbent President",
        backstory: "Corrupt president seeking re-election. Will do anything to stay in power.",
        dialogues: {
            campaign_meeting: {
                speaker: "President Mooizbe",
                sprite: "🎩",
                lines: [
                    { text: "*smiles coldly* Ah, the Ronda boy. Kaley useful.", dhivehi: true },
                    { text: "Election coming. Aharen need... insurance.", dhivehi: true },
                    { text: "Alibe thinks he can win. Democracy. *laughs*", dhivehi: true },
                    { text: "Help aharen win, and kaley family protected. Forever.", dhivehi: true },
                    { text: "Refuse... and Commissioner Hassan visits kaley mother.", dhivehi: true }
                ]
            }
        }
    },
    
    alibe: {
        name: "Alibe (Opposition Leader)",
        sprite: "📢",
        role: "Opposition Candidate",
        backstory: "Former president, ousted in 2012 coup. Fighting for democracy.",
        dialogues: {
            opposition_meeting: {
                speaker: "Alibe",
                sprite: "📢",
                lines: [
                    { text: "*tired but determined* Kaley know who aharen am?", dhivehi: true },
                    { text: "They took aharen presidency. 2012. The coup.", dhivehi: true },
                    { text: "Mooizbe, the military, the judges... all corrupt.", dhivehi: true },
                    { text: "Kaley can help aharen. Or kaley can help them.", dhivehi: true },
                    { text: "But know this: aharen fight for Raajje. Not for aharen.", dhivehi: true }
                ]
            }
        }
    },
    
    campaignManager: {
        name: "Fathimath (Campaign Manager)",
        sprite: "👩🏾‍💼",
        role: "Mooizbe's Campaign Manager",
        backstory: "Ruthless political operative. Knows all the dirty tricks.",
        dialogues: {
            dirty_tricks: {
                speaker: "Fathimath",
                sprite: "👩🏾‍💼",
                lines: [
                    { text: "*businesslike* Kaley here for the special assignments?", dhivehi: true },
                    { text: "Mashakah need votes. By any means.", dhivehi: true },
                    { text: "Island chiefs can be... persuaded. With faisaa.", dhivehi: true },
                    { text: "Opposition rallies can have... accidents.", dhivehi: true },
                    { text: "Kaley understand? Good. Here's kaley first target.", dhivehi: true }
                ]
            }
        }
    },
    
    journalist: {
        name: "Ahmed (TV Journalist)",
        sprite: "🎤",
        role: "Raajje TV Anchor",
        backstory: "Trying to report truth in a controlled media environment.",
        dialogues: {
            media_truth: {
                speaker: "Ahmed",
                sprite: "🎤",
                lines: [
                    { text: "*whispers* Kaley Nunnu's brother, right?", dhivehi: true },
                    { text: "Aharen can't report the truth. They control everything.", dhivehi: true },
                    { text: "But if kaley get aharen evidence... real evidence...", dhivehi: true },
                    { text: "Aharen can broadcast it. Live. Before they cut the feed.", dhivehi: true },
                    { text: "One chance. Make it count.", dhivehi: true }
                ]
            }
        }
    },
    
    voteRigger: {
        name: "Hussain (Election Official)",
        sprite: "📊",
        role: "Corrupt Election Official",
        backstory: "Controls the vote counting. For the right price.",
        dialogues: {
            vote_rigging: {
                speaker: "Hussain",
                sprite: "📊",
                lines: [
                    { text: "*nervous* Kaley from the president's office?", dhivehi: true },
                    { text: "Aharen can... adjust the numbers. Certain boxes.", dhivehi: true },
                    { text: "But it's risky. International observers.", dhivehi: true },
                    { text: "50,000 rufiyaa per box. Final offer.", dhivehi: true }
                ],
                choices: [
                    { text: "Deal. Rig the votes.", karma: -40, response: "rig_accept" },
                    { text: "No. Democracy must win.", karma: 30, response: "rig_refuse" },
                    { text: "Aharen recording this. Kaley finished.", karma: 20, response: "rig_expose" }
                ]
            }
        }
    }
};

// ==================== ACT 9 MISSIONS ====================
const ACT9_MISSIONS = [
    {
        id: "act9_m1",
        title: "The Summons",
        type: "story",
        description: "President Mooizbe summons you to his campaign",
        objectives: [
            { type: "travel", target: "campaign_hq_mooizbe", current: false },
            { type: "trigger", target: "mooizbeMeeting", current: false }
        ],
        rewards: { money: 5000 },
        dialogueStart: "mooizbe_campaign_meeting",
        unlocks: ["act9_m2"]
    },
    {
        id: "act9_m2",
        title: "Opposition Contact",
        type: "story",
        description: "Secretly meet with Alibe's campaign",
        objectives: [
            { type: "stealth", target: "campaign_hq_alibe", current: false },
            { type: "trigger", target: "alibeMeeting", current: false }
        ],
        rewards: { money: 0, karma: 10 },
        dialogueStart: "alibe_opposition_meeting",
        unlocks: ["act9_m3"],
        moralChoice: true
    },
    {
        id: "act9_m3",
        title: "Dirty Tricks I",
        type: "sabotage",
        description: "Sabotage opposition rally (or warn them)",
        objectives: [
            { type: "travel", target: "rally_ground", current: false },
            { type: "decide", target: "rallySabotage", current: false }
        ],
        rewards: { money: 10000 },
        unlocks: ["act9_m4"],
        majorChoice: "rally_fate",
        moralChoice: true
    },
    {
        id: "act9_m4",
        title: "Media Control",
        type: "infiltration",
        description: "Infiltrate TV station to control narrative",
        objectives: [
            { type: "travel", target: "tv_station", current: false },
            { type: "stealth", target: "controlRoom", current: false },
            { type: "decide", target: "mediaControl", current: false }
        ],
        rewards: { money: 8000 },
        unlocks: ["act9_m5"],
        majorChoice: "media_truth",
        moralChoice: true
    },
    {
        id: "act9_m5",
        title: "Vote Buying",
        type: "corruption",
        description: "Buy votes from island chiefs",
        objectives: [
            { type: "travel", target: "islandChief1", current: false },
            { type: "bribe", target: "chief1", amount: 20000, current: false },
            { type: "travel", target: "islandChief2", current: false },
            { type: "bribe", target: "chief2", amount: 25000, current: false }
        ],
        rewards: { money: 0, karma: -20 },
        unlocks: ["act9_m6"],
        moralChoice: true
    },
    {
        id: "act9_m6",
        title: "The Debate",
        type: "story",
        description: "Attend the presidential debate",
        objectives: [
            { type: "travel", target: "debate_hall", current: false },
            { type: "trigger", target: "debateStart", current: false },
            { type: "minigame", target: "debate", current: false }
        ],
        rewards: { money: 0 },
        unlocks: ["act9_m7"],
        hasMinigame: "debate"
    },
    {
        id: "act9_m7",
        title: "Dirty Tricks II",
        type: "sabotage",
        description: "Plant evidence against Alibe (or expose Mooizbe)",
        objectives: [
            { type: "stealth", target: "alibeOffice", current: false },
            { type: "decide", target: "evidencePlant", current: false }
        ],
        rewards: { money: 15000 },
        unlocks: ["act9_m8"],
        majorChoice: "evidence_fate",
        moralChoice: true
    },
    {
        id: "act9_m8",
        title: "Election Day",
        type: "story",
        description: "Election day arrives - make your final choice",
        objectives: [
            { type: "travel", target: "voting_center", current: false },
            { type: "trigger", target: "votingStart", current: false },
            { type: "decide", target: "voteRigging", current: false }
        ],
        rewards: { money: 0 },
        dialogueStart: "vote_rigging_choice",
        unlocks: ["act9_m9"],
        majorChoice: "election_integrity",
        moralChoice: true
    },
    {
        id: "act9_m9",
        title: "The Count",
        type: "story",
        description: "Watch the votes being counted",
        objectives: [
            { type: "travel", target: "countingRoom", current: false },
            { type: "defend", target: "ballotBoxes", duration: 60, current: 0 }
        ],
        rewards: { money: 5000 },
        unlocks: ["act9_climax"]
    },
    {
        id: "act9_climax",
        title: "Election Night",
        type: "climax",
        description: "The results are announced - chaos erupts",
        objectives: [
            { type: "travel", target: "election_night", current: false },
            { type: "trigger", target: "resultsAnnounced", current: false },
            { type: "survive", target: "electionRiot", current: false },
            { type: "decide", target: "finalSide", current: false }
        ],
        rewards: { money: 20000 },
        unlocks: ["act10_start"],
        actEnd: true,
        majorChoice: "final_allegiance"
    }
];

// ==================== ACT 9 SIDE MISSIONS ====================
const ACT9_SIDE_MISSIONS = [
    { id: "side9_poster1", title: "Poster Campaign I", type: "task", reward: 500 },
    { id: "side9_poster2", title: "Poster Campaign II", type: "task", reward: 600 },
    { id: "side9_rally1", title: "Rally Security I", type: "defense", reward: 1000 },
    { id: "side9_rally2", title: "Rally Security II", type: "defense", reward: 1200 },
    { id: "side9_bribe1", title: "Bribe Delivery I", type: "delivery", reward: 800 },
    { id: "side9_bribe2", title: "Bribe Delivery II", type: "delivery", reward: 1000 },
    { id: "side9_spy1", title: "Opposition Spy I", type: "stealth", reward: 1500 },
    { id: "side9_spy2", title: "Opposition Spy II", type: "stealth", reward: 2000 },
    { id: "side9_media1", title: "Media Manipulation I", type: "task", reward: 1200 },
    { id: "side9_media2", title: "Media Manipulation II", type: "task", reward: 1500 },
    { id: "side9_intimidate", title: "Voter Intimidation", type: "combat", reward: 2000 }
];

// ==================== ACT 9 DIALOGUES ====================
const ACT9_DIALOGUES = {
    mooizbe_campaign_meeting: {
        speaker: "President Mooizbe",
        sprite: "🎩",
        lines: [
            { text: "*smiles coldly* Ah, the Ronda boy. Kaley useful.", dhivehi: true },
            { text: "Election coming. Aharen need... insurance.", dhivehi: true },
            { text: "Alibe thinks he can win. Democracy. *laughs*", dhivehi: true },
            { text: "Help aharen win, and kaley family protected. Forever.", dhivehi: true },
            { text: "Refuse... and Commissioner Hassan visits kaley mother.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen will help. What do kaley need?", karma: -15, response: "mooizbe_accept" },
            { text: "Aharen need to think about it.", karma: 0, response: "mooizbe_delay" },
            { text: "Never. Kaley a tyrant.", karma: 20, response: "mooizbe_refuse" }
        ]
    },
    
    mooizbe_accept: {
        speaker: "President Mooizbe",
        sprite: "🎩",
        lines: [
            { text: "*pleased* Smart choice. Like kaley father.", dhivehi: true },
            { text: "Fathimath will give kaley assignments.", dhivehi: true },
            { text: "Do them well, and kaley will be rewarded.", dhivehi: true },
            { text: "Fail... and kaley know what happens.", dhivehi: true }
        ]
    },
    
    mooizbe_refuse: {
        speaker: "President Mooizbe",
        sprite: "🎩",
        lines: [
            { text: "*cold fury* Kaley dare refuse aharen?", dhivehi: true },
            { text: "Kaley father made same mistake. Look where he is.", dhivehi: true },
            { text: "Kaley have 24 hours to reconsider.", dhivehi: true },
            { text: "After that... no more chances.", dhivehi: true }
        ]
    },
    
    alibe_opposition_meeting: {
        speaker: "Alibe",
        sprite: "📢",
        lines: [
            { text: "*tired but determined* Kaley know who aharen am?", dhivehi: true },
            { text: "They took aharen presidency. 2012. The coup.", dhivehi: true },
            { text: "Mooizbe, the military, the judges... all corrupt.", dhivehi: true },
            { text: "Kaley can help aharen. Or kaley can help them.", dhivehi: true },
            { text: "But know this: aharen fight for Raajje. Not for aharen.", dhivehi: true }
        ],
        choices: [
            { text: "Aharen will help the opposition.", karma: 20, response: "alibe_join" },
            { text: "Aharen just gathering information.", karma: 0, response: "alibe_neutral" },
            { text: "Aharen work for Mooizbe. This is a trap.", karma: -25, response: "alibe_betray" }
        ]
    },
    
    alibe_join: {
        speaker: "Alibe",
        sprite: "📢",
        lines: [
            { text: "*hopeful* Kaley serious? After everything?", dhivehi: true },
            { text: "Mashakah need people inside. Mooizbe's campaign.", dhivehi: true },
            { text: "Feed aharen information. Sabotage from within.", dhivehi: true },
            { text: "Together, mashakah can save Raajje.", dhivehi: true }
        ]
    },
    
    alibe_betray: {
        speaker: "Alibe",
        sprite: "📢",
        lines: [
            { text: "*shocked* Kaley... kaley work for him?", dhivehi: true },
            { text: "*sad* Aharen thought... never mind.", dhivehi: true },
            { text: "Do what kaley must. Aharen won't beg.", dhivehi: true },
            { text: "But remember: history judges us all.", dhivehi: true }
        ]
    },
    
    dirty_tricks_choice: {
        speaker: "Fathimath",
        sprite: "👩🏾‍💼",
        lines: [
            { text: "The opposition rally is tomorrow. Republic Square.", dhivehi: true },
            { text: "Mashakah have... options.", dhivehi: true },
            { text: "Cut the power. Plant agitators. Or worse.", dhivehi: true },
            { text: "What does kaley recommend?", dhivehi: true }
        ],
        choices: [
            { text: "Cut the power. Non-violent.", karma: -10, response: "sabotage_power" },
            { text: "Plant agitators. Start a riot.", karma: -30, response: "sabotage_riot" },
            { text: "Aharen will warn them instead.", karma: 25, response: "sabotage_warn" }
        ]
    },
    
    sabotage_warn: {
        speaker: "Alibe",
        sprite: "📢",
        lines: [
            { text: "*grateful* Kaley warned aharen? Why?", dhivehi: true },
            { text: "Mashakah moved the rally. They found nothing.", dhivehi: true },
            { text: "Kaley taking big risk. Mooizbe will be angry.", dhivehi: true },
            { text: "Thank you. Raajje needs more people like kaley.", dhivehi: true }
        ]
    },
    
    media_control_choice: {
        speaker: "Ahmed",
        sprite: "🎤",
        lines: [
            { text: "Kaley in the control room. Kaley have access.", dhivehi: true },
            { text: "Kaley can broadcast Mooizbe's propaganda...", dhivehi: true },
            { text: "Or kaley can broadcast the truth. Nunnu's files.", dhivehi: true },
            { text: "One button. Kaley choice.", dhivehi: true }
        ],
        choices: [
            { text: "Broadcast the propaganda. Stay safe.", karma: -20, response: "media_propaganda" },
            { text: "Broadcast the truth. Expose everything.", karma: 30, response: "media_truth" },
            { text: "Destroy the equipment. No one broadcasts.", karma: 0, response: "media_destroy" }
        ]
    },
    
    media_truth: {
        speaker: "Ahmed",
        sprite: "🎤",
        lines: [
            { text: "*broadcasting* Citizens of Raajje!", dhivehi: true },
            { text: "What kaley about to see is the truth.", dhivehi: true },
            { text: "Corruption. Murder. The 2012 coup.", dhivehi: true },
            { text: "President Mooizbe is a criminal. Here's the proof.", dhivehi: true }
        ]
    },
    
    vote_rigging_choice: {
        speaker: "Hussain",
        sprite: "📊",
        lines: [
            { text: "*nervous* Kaley from the president's office?", dhivehi: true },
            { text: "Aharen can... adjust the numbers. Certain boxes.", dhivehi: true },
            { text: "But it's risky. International observers.", dhivehi: true },
            { text: "50,000 rufiyaa per box. Final offer.", dhivehi: true }
        ],
        choices: [
            { text: "Deal. Rig the votes.", karma: -40, response: "rig_accept" },
            { text: "No. Democracy must win.", karma: 30, response: "rig_refuse" },
            { text: "Aharen recording this. Kaley finished.", karma: 20, response: "rig_expose" }
        ]
    },
    
    rig_accept: {
        speaker: "Hussain",
        sprite: "📊",
        lines: [
            { text: "*relieved* Good. Mashakah understand each other.", dhivehi: true },
            { text: "The boxes from outer islands. Easy to adjust.", dhivehi: true },
            { text: "Mooizbe wins. Everyone happy.", dhivehi: true },
            { text: "Except... kaley know. Democracy.", dhivehi: true }
        ]
    },
    
    rig_expose: {
        speaker: "Hussain",
        sprite: "📊",
        lines: [
            { text: "*panicked* What?! Kaley recording?!", dhivehi: true },
            { text: "No no no! Aharen was joking! Testing kaley!", dhivehi: true },
            { text: "Please! Aharen have family!", dhivehi: true },
            { text: "*runs away*", dhivehi: true }
        ]
    },
    
    election_results: {
        speaker: "TV Announcer",
        sprite: "📺",
        lines: [
            { text: "Ladies and gentlemen... the results are in.", dhivehi: false },
            { text: "With 98% of votes counted...", dhivehi: false },
            { text: "The winner of the 2023 Presidential Election is...", dhivehi: false }
        ]
    },
    
    election_chaos: {
        speaker: "Crowd",
        sprite: "👥",
        lines: [
            { text: "*shouting* RIGGED! THE ELECTION IS RIGGED!", dhivehi: true },
            { text: "*chaos erupts* MASHAKAH DEMAND RECOUNT!", dhivehi: true },
            { text: "*police sirens* EVERYONE STAY CALM!", dhivehi: false },
            { text: "*gunshots in distance*", dhivehi: false }
        ]
    },
    
    final_choice: {
        speaker: "Muaz",
        sprite: "👤",
        lines: [
            { text: "Brother! The city is burning!", dhivehi: true },
            { text: "Mooizbe's men are hunting opposition.", dhivehi: true },
            { text: "Alibe is trapped in his HQ.", dhivehi: true },
            { text: "Mashakah can save him... or let him die.", dhivehi: true },
            { text: "What do mashakah do?", dhivehi: true }
        ],
        choices: [
            { text: "Save Alibe. He's the future.", karma: 30, response: "save_alibe" },
            { text: "Let him die. Mooizbe wins.", karma: -40, response: "abandon_alibe" },
            { text: "Use the chaos. Take power ourselves.", karma: -20, response: "seize_power" }
        ]
    }
};

// ==================== ACT 9 MINI-GAME: DEBATE ====================
const ACT9_DEBATE_MINIGAME = {
    name: "Presidential Debate",
    description: "Choose the right arguments to win the debate",
    rounds: 5,
    topics: [
        {
            topic: "Economy",
            question: "How will you improve the economy?",
            options: [
                { text: "More tourism investment", score: 2, type: "moderate" },
                { text: "Fight corruption first", score: 3, type: "reform" },
                { text: "Foreign investment deals", score: 1, type: "corrupt" }
            ]
        },
        {
            topic: "Democracy",
            question: "What about democratic freedoms?",
            options: [
                { text: "Free press is essential", score: 3, type: "reform" },
                { text: "Stability comes first", score: 1, type: "corrupt" },
                { text: "Gradual reform", score: 2, type: "moderate" }
            ]
        },
        {
            topic: "Gangs",
            question: "How will you address gang violence?",
            options: [
                { text: "Root causes: poverty, education", score: 3, type: "reform" },
                { text: "Stronger police powers", score: 1, type: "corrupt" },
                { text: "Community programs", score: 2, type: "moderate" }
            ]
        },
        {
            topic: "Corruption",
            question: "What about government corruption?",
            options: [
                { text: "Independent anti-corruption body", score: 3, type: "reform" },
                { text: "Current system works fine", score: 0, type: "corrupt" },
                { text: "Internal reforms", score: 2, type: "moderate" }
            ]
        },
        {
            topic: "2012 Coup",
            question: "Was the 2012 transfer of power legitimate?",
            options: [
                { text: "It was a coup. Period.", score: 3, type: "reform" },
                { text: "Constitutional process", score: 0, type: "corrupt" },
                { text: "We must move forward", score: 1, type: "moderate" }
            ]
        }
    ]
};

// ==================== ACT 9 RADIO CONTENT ====================
const ACT9_RADIO = {
    raajjeFM: {
        name: "📻 Raajje FM",
        segments: [
            { type: "news", text: "Election Day approaches. President Mooizbe leads in polls." },
            { type: "ad", text: "Vote Mooizbe! Stability. Progress. Leadership." },
            { type: "news", text: "Opposition claims voter intimidation. Government denies." },
            { type: "satire", text: "'Free and fair' - when you control the definition." },
            { type: "news", text: "International observers arrive. 'Cautiously optimistic.'" }
        ]
    },
    oppositionFM: {
        name: "📻 Freedom FM (Pirate)",
        segments: [
            { type: "truth", text: "They're buying votes. We have proof." },
            { type: "call", text: "Caller: 'They offered me 5000 rufiyaa. I said no.'" },
            { type: "music", text: "♪ Playing: Songs of Freedom ♪" },
            { type: "truth", text: "Remember 2012. Don't let them steal it again." },
            { type: "call", text: "Caller: 'My family threatened if we vote opposition.'" }
        ]
    }
};

// ==================== EXPORT FOR MAIN GAME ====================
if (typeof window !== 'undefined') {
    window.ACT9_MAPS = ACT9_MAPS;
    window.ACT9_CHARACTERS = ACT9_CHARACTERS;
    window.ACT9_MISSIONS = ACT9_MISSIONS;
    window.ACT9_SIDE_MISSIONS = ACT9_SIDE_MISSIONS;
    window.ACT9_DIALOGUES = ACT9_DIALOGUES;
    window.ACT9_DEBATE_MINIGAME = ACT9_DEBATE_MINIGAME;
    window.ACT9_RADIO = ACT9_RADIO;
}
