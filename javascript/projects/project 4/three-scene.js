/*
  three-scene.js
  Simple Three.js scene: rotating torus + particles.
  Exposes a small `sceneAPI` on window to be called from game logic:
    - sceneAPI.pulseSuccess()
    - sceneAPI.pulseFail()
    - sceneAPI.setAttempts(n)
  This file uses the global THREE provided by the included UMD build.
*/
(function(){
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not found. 3D background disabled.');
        window.sceneAPI = window.sceneAPI || {
            pulseSuccess: ()=>{},
            pulseFail: ()=>{},
            setAttempts: ()=>{}
        };
        return;
    }

    const container = document.getElementById('three-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070217, 0.0025);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Ambient + key lights
    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 10, 10);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8bd4ff, 0.35);
    rim.position.set(-10, -5, 5);
    scene.add(rim);

    // polished torus knot (physical material)
    const torusGeo = new THREE.TorusKnotGeometry(3.8, 0.9, 200, 32);
    const torusMat = new THREE.MeshPhysicalMaterial({
        color: 0x7c5cff,
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
        reflectivity: 0.8,
        emissive: 0x000000,
        emissiveIntensity: 0.2
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = 0.5;
    scene.add(torus);

    // reactive HUD box that indicates attempts left via emissive color
    const hudGeo = new THREE.BoxGeometry(2.4, 1.2, 0.4);
    const hudMat = new THREE.MeshStandardMaterial({ color: 0x2bd4e6, metalness: 0.3, roughness: 0.2, emissive: 0x2bd4e6, emissiveIntensity: 0.25, transparent: true, opacity: 0.9 });
    const hud = new THREE.Mesh(hudGeo, hudMat);
    hud.position.set(-6, 4, 0);
    hud.rotation.y = 0.2;
    scene.add(hud);

    // particles (depth field)
    const particleCount = (window.innerWidth < 600) ? 220 : 700;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i*3+0] = (Math.random()-0.5) * 120;
        positions[i*3+1] = (Math.random()-0.5) * 60;
        positions[i*3+2] = (Math.random()-0.5) * 140;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xa0f0ff, size: (window.innerWidth < 600) ? 0.12 : 0.22, opacity: 0.9, transparent: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // postprocessing setup if available
    let composer, renderPass, bloomPass, fxaaPass;
    const useComposer = (typeof EffectComposer !== 'undefined' && typeof UnrealBloomPass !== 'undefined');
    if (useComposer) {
        renderPass = new RenderPass(scene, camera);
        const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
        bloomPass = new UnrealBloomPass(size, 0.9, 0.6, 0.9);
        bloomPass.threshold = 0.1;
        bloomPass.strength = 0.9;
        bloomPass.radius = 0.6;

        composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);

        if (typeof THREE !== 'undefined' && typeof FXAAShader !== 'undefined') {
            fxaaPass = new THREE.ShaderPass(FXAAShader);
            fxaaPass.material.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
            composer.addPass(fxaaPass);
        }
    }

    // responsive resize
    function onResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (composer) composer.setSize(window.innerWidth, window.innerHeight);
        if (fxaaPass && fxaaPass.material && fxaaPass.material.uniforms && fxaaPass.material.uniforms['resolution']) {
            fxaaPass.material.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        }
    }
    window.addEventListener('resize', onResize);

    // parallax with mouse
    let pointer = {x:0,y:0};
    window.addEventListener('pointermove', (e)=>{
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    let clock = new THREE.Clock();
    let shake = 0;

    function animate(){
        const t = clock.getElapsedTime();
        // gentle rotations
        torus.rotation.y += 0.0065;
        torus.rotation.x += 0.0032;
        torus.rotation.z = Math.sin(t * 0.25) * 0.28;

        // camera parallax
        camera.position.x += (pointer.x * 2 - camera.position.x) * 0.03;
        camera.position.y += (-pointer.y * 1.5 - camera.position.y) * 0.03;
        camera.lookAt(0,0,0);

        // subtle emissive breathing
        torus.material.emissiveIntensity = 0.15 + Math.abs(Math.sin(t * 0.7)) * 0.28;

        // particle drift
        particles.rotation.y = t * 0.018;

        if (shake > 0) {
            const s = (Math.random()-0.5) * shake * 0.9;
            camera.position.x += s;
            shake *= 0.9;
            if (shake < 0.01) { shake = 0; }
        }

        // render with composer when available
        if (composer) composer.render(); else renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    // Scene API
    let bloomBoostTimeout = null;
    window.sceneAPI = {
        pulseSuccess: function(){
            // color shift & bloom boost
            torus.material.color.set(0x9dffdd);
            torus.material.emissive.set(0x88ffe5);
            hudMat.emissive.set(0x9dffdd);
            if (bloomPass) {
                const prev = bloomPass.strength;
                bloomPass.strength = Math.min(2.2, prev + 1.2);
                clearTimeout(bloomBoostTimeout);
                bloomBoostTimeout = setTimeout(()=>{ if (bloomPass) bloomPass.strength = prev; }, 700);
            }
            camera.position.z = 21.5;
            setTimeout(()=>{ camera.position.z = 24; }, 420);
        },
        pulseFail: function(){
            // red flash and shake
            torus.material.color.set(0xff6b6b);
            torus.material.emissive.set(0xff9a9a);
            hudMat.emissive.set(0xff6b6b);
            shake = 1.6;
            setTimeout(()=>{ torus.material.color.set(0x7c5cff); torus.material.emissive.set(0x000000); hudMat.emissive.set(0x2bd4e6); }, 700);
        },
        setAttempts: function(n){
            // n in [0..10]
            const ratio = Math.max(0, Math.min(1, n/10));
            // color from green->cyan->purple based on ratio
            const r = Math.floor(120 + (124 * (1-ratio)));
            const g = Math.floor(255 - (80 * (1-ratio)));
            const b = Math.floor(200 + (55 * ratio));
            const col = (r << 16) | (g << 8) | b;
            hudMat.emissive.set(col);
            // scale HUD slightly
            const s = 0.9 + 0.2 * ratio;
            hud.scale.set(s, s, s);
        }
    };

    // init
    animate();
})();
