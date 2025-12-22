// advanced-shaders.js
// Advanced Shader System for Water, Lighting, and Particle Effects

import * as THREE from 'three';

class AdvancedShaders {
    constructor() {
        this.shaders = {};
        this.initializeShaders();
    }

    initializeShaders() {
        // Water shader with wave animation
        this.shaders.water = {
            vertex: `
                uniform float uTime;
                uniform float uWaveAmplitude;
                uniform float uWaveFrequency;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vWave;
                
                void main() {
                    vPosition = position;
                    
                    // Create wave effect
                    float wave = sin(position.x * uWaveFrequency + uTime) * uWaveAmplitude;
                    wave += sin(position.z * uWaveFrequency * 0.7 + uTime * 0.8) * uWaveAmplitude * 0.7;
                    
                    vec3 pos = position;
                    pos.y += wave;
                    
                    vWave = wave;
                    vNormal = normalize(normalMatrix * normal);
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragment: `
                uniform float uTime;
                uniform vec3 uWaterColor;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vWave;
                
                void main() {
                    // Create water color with wave-based variation
                    vec3 color = uWaterColor;
                    color += vec3(0.1) * sin(vWave * 10.0);
                    
                    // Add specular highlight
                    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                    float spec = pow(max(dot(vNormal, lightDir), 0.0), 32.0);
                    color += vec3(spec) * 0.3;
                    
                    // Add foam
                    float foam = smoothstep(0.5, 0.7, vWave);
                    color = mix(color, vec3(1.0), foam * 0.2);
                    
                    gl_FragColor = vec4(color, 0.8);
                }
            `
        };

        // Lighting shader with dynamic day/night cycle
        this.shaders.lighting = {
            vertex: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = vec3(modelMatrix * vec4(position, 1.0));
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                uniform float uTimeOfDay;
                uniform vec3 uSunColor;
                uniform vec3 uMoonColor;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Calculate day/night lighting
                    float dayFactor = sin(uTimeOfDay * 3.14159 / 24.0);
                    dayFactor = clamp(dayFactor, 0.0, 1.0);
                    
                    // Sun lighting
                    vec3 sunDir = normalize(vec3(1.0, 1.0, 0.5));
                    float sunLight = max(dot(vNormal, sunDir), 0.0);
                    vec3 sunColor = uSunColor * sunLight * dayFactor;
                    
                    // Moon lighting
                    float moonFactor = 1.0 - dayFactor;
                    vec3 moonDir = normalize(vec3(-1.0, 0.5, -0.5));
                    float moonLight = max(dot(vNormal, moonDir), 0.0);
                    vec3 moonColor = uMoonColor * moonLight * moonFactor * 0.3;
                    
                    // Ambient light
                    vec3 ambientColor = mix(vec3(0.1, 0.1, 0.2), vec3(0.8, 0.8, 0.9), dayFactor);
                    
                    vec3 finalColor = sunColor + moonColor + ambientColor * 0.5;
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        };

        // Particle shader for effects (rain, sea spray, etc.)
        this.shaders.particle = {
            vertex: `
                uniform float uTime;
                
                attribute float aLifetime;
                attribute float aSize;
                
                varying float vAlpha;
                varying vec3 vColor;
                
                void main() {
                    // Calculate particle life progress
                    float life = mod(uTime + aLifetime, 1.0);
                    vAlpha = 1.0 - life;
                    
                    // Particle color based on type
                    vColor = mix(vec3(0.5, 0.8, 1.0), vec3(1.0, 1.0, 1.0), life);
                    
                    // Particle size based on life
                    float size = aSize * (1.0 - life * 0.5);
                    
                    gl_PointSize = size;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                varying float vAlpha;
                varying vec3 vColor;
                
                void main() {
                    // Create circular particle
                    vec2 uv = gl_PointCoord - 0.5;
                    float dist = length(uv);
                    
                    if (dist > 0.5) discard;
                    
                    float alpha = (1.0 - dist * 2.0) * vAlpha;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `
        };

        // Voxel shader for pixelated look
        this.shaders.voxel = {
            vertex: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec3 vColor;
                
                attribute vec3 aColor;
                
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = vec3(modelMatrix * vec4(position, 1.0));
                    vColor = aColor;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                uniform vec3 uLightDir;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec3 vColor;
                
                void main() {
                    // Voxel-based lighting
                    float light = max(dot(vNormal, normalize(uLightDir)), 0.3);
                    
                    // Add edge detection for voxel look
                    vec3 edgeColor = vColor * 0.7;
                    vec3 finalColor = mix(edgeColor, vColor, light);
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        };
    }

    // Create water material
    createWaterMaterial(scene) {
        const uniforms = {
            uTime: { value: 0 },
            uWaveAmplitude: { value: 0.3 },
            uWaveFrequency: { value: 0.5 },
            uWaterColor: { value: new THREE.Color(0x0077BE) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: this.shaders.water.vertex,
            fragmentShader: this.shaders.water.fragment,
            transparent: true,
            side: THREE.DoubleSide
        });

        // Store reference to update time
        material.updateTime = (time) => {
            material.uniforms.uTime.value = time;
        };

        return material;
    }

    // Create lighting material
    createLightingMaterial() {
        const uniforms = {
            uTimeOfDay: { value: 12 },
            uSunColor: { value: new THREE.Color(0xFFFF00) },
            uMoonColor: { value: new THREE.Color(0xCCCCFF) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: this.shaders.lighting.vertex,
            fragmentShader: this.shaders.lighting.fragment
        });

        // Store reference to update time of day
        material.updateTimeOfDay = (timeOfDay) => {
            material.uniforms.uTimeOfDay.value = timeOfDay;
        };

        return material;
    }

    // Create particle material
    createParticleMaterial() {
        const uniforms = {
            uTime: { value: 0 }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: this.shaders.particle.vertex,
            fragmentShader: this.shaders.particle.fragment,
            transparent: true,
            depthWrite: false
        });

        material.updateTime = (time) => {
            material.uniforms.uTime.value = time;
        };

        return material;
    }

    // Create voxel material
    createVoxelMaterial(color = 0xFF1493) {
        const uniforms = {
            uLightDir: { value: new THREE.Vector3(1, 1, 1).normalize() }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: this.shaders.voxel.vertex,
            fragmentShader: this.shaders.voxel.fragment
        });

        return material;
    }

    // Create particle system for effects
    createParticleSystem(position, type = 'rain', count = 100) {
        const particles = new THREE.BufferGeometry();
        const positions = [];
        const lifetimes = [];
        const sizes = [];

        for (let i = 0; i < count; i++) {
            positions.push(
                (Math.random() - 0.5) * 20 + position.x,
                Math.random() * 30 + position.y,
                (Math.random() - 0.5) * 20 + position.z
            );
            lifetimes.push(Math.random());
            sizes.push(Math.random() * 2 + 1);
        }

        particles.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        particles.setAttribute('aLifetime', new THREE.BufferAttribute(new Float32Array(lifetimes), 1));
        particles.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(sizes), 1));

        const material = this.createParticleMaterial();
        const particleSystem = new THREE.Points(particles, material);

        return particleSystem;
    }
}

export { AdvancedShaders };
