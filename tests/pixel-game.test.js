// tests/pixel-game.test.js
import { PixelGame } from '../pixel-game-main.js';
import { JSDOM } from 'jsdom';

// Mock the DOM
const dom = new JSDOM('<!DOCTYPE html><html><body><canvas id="gameCanvas"></canvas></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.Image = dom.window.Image;
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};


// Simple assert function for testing
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// Test case
try {
    const game = new PixelGame();
    assert(game, "Game object should be created.");
    console.log("Test passed: Game initialization is successful.");
} catch (e) {
    console.error("Test failed:", e.message);
}
