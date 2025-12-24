// pixel-game-init.js
import { PixelGame } from './pixel-game-main.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        window.pixelGame = new PixelGame();
    } catch (e) {
        console.error("Game initialization failed:", e);
    }
});
