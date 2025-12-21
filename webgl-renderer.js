// webgl-renderer.js
// Core Three.js setup for the Ultimate WebGL Edition

import * as THREE from 'three';

class WebGLRenderer {
    constructor(containerId = 'game-container') {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = null;
        this.clock = new THREE.Clock();
        this.init();
    }

    init() {
        // 1. Renderer Setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x0a0a0a, 1); // Match body background
        this.container.appendChild(this.renderer.domElement);

        // 2. Camera Setup (Initial Orthographic for Isometric View)
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 50; // Controls the zoom level
        this.camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            1000
        );
        
        // Set up for Isometric Projection (45 degrees rotation around Y, 30 degrees tilt)
        // Standard isometric view is achieved by rotating the camera.
        this.camera.position.set(50, 50, 50);
        this.camera.lookAt(0, 0, 0);
        
        // 3. Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 5); // soft white light
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(100, 100, 100);
        this.scene.add(directionalLight);

        // 4. Basic Test Geometry (A simple cube)
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 2.5, 0); // Lift it half its height
        this.scene.add(cube);

        // 5. Ground Plane (Placeholder)
        const planeGeometry = new THREE.PlaneGeometry(100, 100);
        const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
        this.scene.add(plane);

        // 6. Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        // 7. Start the animation loop
        this.animate();
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 50;
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        const delta = this.clock.getDelta();
        
        // Update logic here (e.g., water shader time)
        // ...

        this.renderer.render(this.scene, this.camera);
    }
}

// Global access point
window.webGLRenderer = new WebGLRenderer();
