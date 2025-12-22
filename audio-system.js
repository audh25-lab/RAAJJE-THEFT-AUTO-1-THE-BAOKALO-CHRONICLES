// audio-system.js
// Comprehensive Audio System for Ambient Sounds, Music, and Effects

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.audioElements = new Map();
        this.soundEffects = new Map();
        this.musicTracks = new Map();
        this.currentTrack = null;
        this.masterVolume = 0.7;
        this.sfxVolume = 0.6;
        this.musicVolume = 0.5;
        this.ambientVolume = 0.4;
        
        this.initializeAudio();
    }

    initializeAudio() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    // Register a sound effect
    registerSoundEffect(id, url, volume = 1.0) {
        const audio = new Audio(url);
        audio.volume = volume * this.sfxVolume;
        this.soundEffects.set(id, {
            audio: audio,
            volume: volume,
            url: url
        });
    }

    // Register music track
    registerMusicTrack(id, url, volume = 1.0) {
        const audio = new Audio(url);
        audio.volume = volume * this.musicVolume;
        audio.loop = true;
        this.musicTracks.set(id, {
            audio: audio,
            volume: volume,
            url: url
        });
    }

    // Play sound effect
    playSoundEffect(id) {
        const sound = this.soundEffects.get(id);
        if (sound) {
            sound.audio.currentTime = 0;
            sound.audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    // Play music track
    playMusicTrack(id, fadeIn = true) {
        // Stop current track if playing
        if (this.currentTrack) {
            this.stopMusicTrack(this.currentTrack, fadeIn);
        }

        const track = this.musicTracks.get(id);
        if (track) {
            this.currentTrack = id;
            if (fadeIn) {
                track.audio.volume = 0;
                const interval = setInterval(() => {
                    if (track.audio.volume < this.musicVolume * this.masterVolume) {
                        track.audio.volume += 0.01;
                    } else {
                        clearInterval(interval);
                    }
                }, 50);
            }
            track.audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    // Stop music track
    stopMusicTrack(id, fadeOut = true) {
        const track = this.musicTracks.get(id);
        if (track) {
            if (fadeOut) {
                const interval = setInterval(() => {
                    if (track.audio.volume > 0) {
                        track.audio.volume -= 0.01;
                    } else {
                        track.audio.pause();
                        clearInterval(interval);
                    }
                }, 50);
            } else {
                track.audio.pause();
            }
        }
    }

    // Set master volume
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        this.updateAllVolumes();
    }

    // Set SFX volume
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        this.soundEffects.forEach(sound => {
            sound.audio.volume = sound.volume * this.sfxVolume * this.masterVolume;
        });
    }

    // Set music volume
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        this.musicTracks.forEach(track => {
            track.audio.volume = track.volume * this.musicVolume * this.masterVolume;
        });
    }

    // Update all volumes
    updateAllVolumes() {
        this.soundEffects.forEach(sound => {
            sound.audio.volume = sound.volume * this.sfxVolume * this.masterVolume;
        });
        this.musicTracks.forEach(track => {
            track.audio.volume = track.volume * this.musicVolume * this.masterVolume;
        });
    }

    // Initialize default sounds
    initializeDefaultSounds() {
        // Ambient sounds
        this.registerAmbientSound('waves', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.3);
        this.registerAmbientSound('market', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.2);
        this.registerAmbientSound('birds', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.2);

        // Sound effects
        this.registerSoundEffect('footstep', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.5);
        this.registerSoundEffect('jump', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.6);
        this.registerSoundEffect('pickup', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.7);
        this.registerSoundEffect('interact', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.5);
        this.registerSoundEffect('mission_complete', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.8);
        this.registerSoundEffect('vehicle_engine', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.6);

        // Music tracks
        this.registerMusicTrack('ambient_day', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.5);
        this.registerMusicTrack('ambient_night', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.4);
        this.registerMusicTrack('boduberu', 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==', 0.6);
    }

    // Register ambient sound
    registerAmbientSound(id, url, volume = 0.3) {
        const audio = new Audio(url);
        audio.volume = volume * this.ambientVolume;
        audio.loop = true;
        this.audioElements.set(id, {
            audio: audio,
            volume: volume,
            type: 'ambient'
        });
    }

    // Play ambient sound
    playAmbientSound(id) {
        const sound = this.audioElements.get(id);
        if (sound && sound.type === 'ambient') {
            sound.audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    // Stop ambient sound
    stopAmbientSound(id) {
        const sound = this.audioElements.get(id);
        if (sound && sound.type === 'ambient') {
            sound.audio.pause();
            sound.audio.currentTime = 0;
        }
    }

    // Get audio statistics
    getStats() {
        return {
            soundEffects: this.soundEffects.size,
            musicTracks: this.musicTracks.size,
            ambientSounds: Array.from(this.audioElements.values()).filter(s => s.type === 'ambient').length,
            currentTrack: this.currentTrack,
            masterVolume: this.masterVolume,
            sfxVolume: this.sfxVolume,
            musicVolume: this.musicVolume
        };
    }
}

export { AudioSystem };
