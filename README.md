# 🏝️ Raajje Theft Auto 1: The Baokalo Chronicles

## Complete Web Prototype

A 100% self-contained HTML/CSS/JavaScript game set in the Maldives, following the rise and fall of Baokalo, a gang leader navigating politics, family, and morality across 10 Acts + Epilogue.

---

## 🎮 Features

### Core Gameplay
- **Canvas-based rendering** at 60fps
- **Tile-based maps** with zone detection
- **Emoji sprite characters** (no external assets)
- **Mobile-optimized touch controls** (virtual joystick + action buttons)
- **Keyboard support** (WASD/Arrows, Space, E, Shift, Escape)

### Story & Progression
- **10 Acts + Epilogue** spanning 2015-2025
- **150+ main missions** across all acts
- **300+ side missions** (procedural/abstracted)
- **4 distinct endings** based on karma and choices:
  - 👑 **Tyrant** - Seize power, become dictator
  - ⛓️ **Puppet** - Serve Mooizbe, get betrayed
  - 🌅 **Redemption** - Break the cycle, find peace
  - 🕯️ **Martyr** - Sacrifice for Raajje

### Characters
- **Ronda Family**: Baokalo (protagonist), Rippoo (mother), Nunnu (sister), DhoDho (uncle)
- **Politicians**: President Mooizbe, Opposition Leader Alibe, MP Jabibe
- **Influencers**: Rishbe (Instagram), Shalube (TikTok)
- **Half-brother**: Muaz (revealed in Act 5)
- **83 gangs** across Malé (44-45), Addu (12), and Atolls (26)

### Moral Choice System
- **Karma meter** (-100 to +100)
- **Family bond meter** (0-100%)
- Choices affect dialogue, missions, buffs/debuffs
- Multiple endings based on cumulative choices

### Mini-Games
- 🥁 **Boduberu** - Rhythm tap game (Web Audio API)
- 🎣 **Fishing** - Timing-based catch
- 🎤 **Charisma/Speech** - Word-match persuasion
- 💰 **Crypto Trading** - Buy/sell simulation
- 🗺️ **Heist Planning** - Choose approach (stealth/bribe/assault)
- 🤿 **Underwater Diving** - Oxygen management
- 💪 **Prison Workout** - Button mashing
- 🎤 **Presidential Debate** - Argument selection

### Maps & Locations
- **Malé Districts**: Maafannu, Henveiru, Galolhu, Machchangolhi
- **Hulhumalé**: Phase 1, Phase 2, Industrial Zone
- **Addu City**: Hithadhoo, Maradhoo, Feydhoo, Gan
- **Fuvahmulah**: Thoondu Beach, Bandaara Lake
- **Resorts**: One&Only Reethi Rah, Soneva Fushi style
- **Political**: Parliament, Presidential Palace, MNDF HQ
- **Prison**: Dhoonidhoo

### Vehicles
- 🚤 Dhoni (traditional boat)
- 🏍️ Motorcycle
- 🚀 Speedboat
- ✈️ Seaplane

### Weather System
- Monsoon effects (visibility, boat sway)
- Day/night cycle
- Dynamic atmosphere per location

### Radio Satire
- **Raajje FM** - Government propaganda
- **Freedom FM** - Underground truth
- 2025 updates (Gang Act hypocrisy, Drugs Act death penalty)

### Save/Load System
- LocalStorage persistence
- Saves: Act, mission, karma, family, gangs, money, choices, upgrades, ending
- Load any unlocked act

### Upgrade System
- Skill trees: Combat, Stealth, Charisma, Piloting
- Family buffs
- Faisaa-based purchases

---

## 📁 File Structure

```
rta-game/
├── index.html      # Main HTML with embedded CSS (24KB)
├── game.js         # Core engine + Act 1 (227KB)
├── act2.js         # Act 2: Malé Core Wars (34KB)
├── act3.js         # Act 3: Synthetic Surge (45KB)
├── act4.js         # Act 4: Parliament Plague (37KB)
├── act5.js         # Act 5: Prison & Redemption (38KB)
├── act6.js         # Act 6: Southern Empire (34KB)
├── act7.js         # Act 7: Resort Wars (40KB)
├── act8.js         # Act 8: The Reckoning (31KB)
├── act9.js         # Act 9: Election Chaos (29KB)
├── act10.js        # Act 10 & Epilogue (25KB)
└── README.md       # This file
```

**Total Size**: ~540KB (fully self-contained, no external dependencies)

---

## 🎯 Controls

### Keyboard
| Key | Action |
|-----|--------|
| WASD / Arrows | Move |
| Space | Attack |
| E | Interact |
| Shift | Sprint |
| Escape | Pause |

### Touch (Mobile)
| Control | Action |
|---------|--------|
| Left Joystick | Move |
| 👊 Button | Attack |
| 🤝 Button | Interact |
| 🏃 Button (hold) | Sprint |
| ⏸️ Button | Pause |

---

## 🇲🇻 Dhivehi Phrases Used

| Dhivehi | English |
|---------|---------|
| Aharen | I/Me |
| Kaley | You |
| Mashakah | We/Us |
| Faisaa | Money |
| Raajje | Maldives |
| Thibeyfulhaa | Sir/Madam |
| Alhugandakah | For me |
| Darifulhaakah | For the children |
| Sodu | Brother |

---

## 🏛️ Historical Context

The game references real events in Maldivian history:

- **1988**: Operation Cactus (Tamil mercenary coup attempt)
- **2004**: Black Friday protests against Gayoom
- **2008**: First democratic election (Nasheed wins)
- **2012**: Police/military mutiny forces Nasheed to resign
- **2015-2018**: Yameen era (opposition jailed)
- **2018-present**: Political instability continues

*This is a work of fiction inspired by real events.*

---

## 🚀 Running the Game

1. Open `index.html` in any modern browser
2. Or serve via local server:
   ```bash
   python3 -m http.server 8080
   ```
3. Navigate to `http://localhost:8080`

---

## 📱 Mobile Optimization

- Responsive canvas scaling
- Large touch targets (44px minimum)
- Virtual joystick with dead zone
- Optimized for 60fps on mobile devices
- Gesture support for scrolling menus

---

## 🏆 Achievements

Track your progress across multiple playthroughs:
- Complete each act
- Unlock all 4 endings
- Recruit all 83 gangs
- Max out all skill trees
- Complete all side missions

---

## 📜 License

This game prototype is based on the provided Game Bible.
All Maldivian cultural elements are used respectfully.

---

## 🙏 Shukuriyaa (Thank You)

For playing Raajje Theft Auto 1: The Baokalo Chronicles!
