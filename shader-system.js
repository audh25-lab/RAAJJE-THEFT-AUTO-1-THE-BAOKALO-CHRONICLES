// shader-system.js
// Advanced Shaders for Water, Lighting, and Particle Effects

import * as THREE from 'three';

class ShaderSystem {
    static createWaterShader() {
        return {
            uniforms: {
                time: { value: 0 },
                waterColor: { value: new THREE.Color(0x0077be) },
                foamColor: { value: new THREE.Color(0xffffff) },
                waveAmplitude: { value: 0.1 },
                waveFrequency: { value: 2.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vWave;
                uniform float time;
                uniform float waveAmplitude;
                uniform float waveFrequency;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Create multiple wave layers for realistic water
                    float wave1 = sin(pos.x * waveFrequency + time) * waveAmplitude;
                    float wave2 = sin(pos.y * (waveFrequency * 1.5) + time * 1.5) * (waveAmplitude * 0.8);
                    float wave3 = cos((pos.x + pos.y) * (waveFrequency * 0.7) + time * 0.7) * (waveAmplitude * 0.6);
                    
                    pos.z += wave1 + wave2 + wave3;
                    vWave = wave1 + wave2 + wave3;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 waterColor;
                uniform vec3 foamColor;
                uniform float time;
                varying vec2 vUv;
                varying float vWave;
                
                void main() {
                    vec3 color = waterColor;
                    
                    // Foam effect based on wave height
                    float foam = smoothstep(0.05, 0.15, vWave);
                    color = mix(color, foamColor, foam * 0.4);
                    
                    // Water sparkle effect
                    float sparkle = sin(vUv.x * 50.0 + time * 2.0) * sin(vUv.y * 50.0 + time * 2.0);
                    color += vec3(sparkle * 0.15);
                    
                    // Depth-based transparency
                    float depth = length(vUv - 0.5) * 2.0;
                    float alpha = mix(0.9, 0.7, depth);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `
        };
    }

    static createLightingShader() {
        return {
            uniforms: {
                lightColor: { value: new THREE.Color(0xffffff) },
                lightIntensity: { value: 1.0 },
                ambientIntensity: { value: 0.5 },
                timeOfDay: { value: 12.0 } // 0-24 hours
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = vec3(modelMatrix * vec4(position, 1.0));
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 lightColor;
                uniform float lightIntensity;
                uniform float ambientIntensity;
                uniform float timeOfDay;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Calculate time-based lighting color
                    vec3 timeColor = vec3(1.0);
                    if (timeOfDay < 6.0 || timeOfDay > 20.0) {
                        // Night
                        timeColor = vec3(0.3, 0.4, 0.6);
                    } else if (timeOfDay < 8.0) {
                        // Sunrise
                        float t = (timeOfDay - 6.0) / 2.0;
                        timeColor = mix(vec3(0.3, 0.4, 0.6), vec3(1.0), t);
                    } else if (timeOfDay < 18.0) {
                        // Day
                        timeColor = vec3(1.0);
                    } else if (timeOfDay < 20.0) {
                        // Sunset
                        float t = (timeOfDay - 18.0) / 2.0;
                        timeColor = mix(vec3(1.0), vec3(1.0, 0.6, 0.3), t);
                    }
                    
                    // Simple directional lighting
                    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                    float diff = max(dot(vNormal, lightDir), 0.0);
                    
                    vec3 finalColor = timeColor * (ambientIntensity + diff * lightIntensity);
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        };
    }

    static createParticleShader() {
        return {
            uniforms: {
                time: { value: 0 },
                particleColor: { value: new THREE.Color(0xffffff) },
                particleSize: { value: 1.0 }
            },
            vertexShader: `
                uniform float time;
                uniform float particleSize;
                attribute float life;
                attribute vec3 velocity;
                varying float vLife;
                
                void main() {
                    vLife = life;
                    
                    // Apply gravity and velocity
                    vec3 pos = position + velocity * time;
                    pos.y -= 0.5 * 9.8 * time * time; // Gravity simulation
                    
                    gl_PointSize = particleSize * (1.0 - (1.0 - life));
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 particleColor;
                varying float vLife;
                
                void main() {
                    // Create circular particles
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard;
                    
                    // Fade out as particles age
                    float alpha = vLife * (1.0 - r);
                    gl_FragColor = vec4(particleColor, alpha);
                }
            `
        };
    }

    static applyWaterShaderToMesh(mesh) {
        const shaderData = ShaderSystem.createWaterShader();
        const material = new THREE.ShaderMaterial({
            uniforms: shaderData.uniforms,
            vertexShader: shaderData.vertexShader,
            fragmentShader: shaderData.fragmentShader,
            transparent: true
        });
        mesh.material = material;
        return material;
    }

    static updateShaderTime(material, time) {
        if (material.uniforms && material.uniforms.time) {
            material.uniforms.time.value = time;
        }
    }

    static updateTimeOfDay(material, hour) {
        if (material.uniforms && material.uniforms.timeOfDay) {
            material.uniforms.timeOfDay.value = hour;
        }
    }
}

export { ShaderSystem };
