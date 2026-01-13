// 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('canvas3d'),
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2500;
const posArray = new Float32Array(particlesCount * 3);
const velocityArray = new Float32Array(particlesCount);

for(let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;
    velocityArray[i / 3] = Math.random() * 0.6 + 0.3;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.18,
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 30;

let mouseXNorm = 0;
let mouseYNorm = 0;

document.addEventListener('mousemove', (e) => {
    mouseXNorm = (e.clientX / window.innerWidth) * 2 - 1;
    mouseYNorm = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate3D() {
    requestAnimationFrame(animate3D);

    particlesMesh.rotation.y += 0.0008;
    particlesMesh.rotation.x += 0.0004;

    const positions = particlesGeometry.attributes.position.array;
    for(let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += velocityArray[i];
        
        if(positions[i3 + 2] > 50) {
            positions[i3 + 2] = -50;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
        }
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    camera.position.x += (mouseXNorm * 8 - camera.position.x) * 0.08;
    camera.position.y += (mouseYNorm * 8 - camera.position.y) * 0.08;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Typewriter Effect
const typingText = document.querySelector('.typing-text');
const text = 'CREATIVITY POWERED BY CODE';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in-section').forEach(section => {
    fadeInObserver.observe(section);
});

// Navbar scroll effect
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Resume download alert
document.querySelectorAll('a[href="Kusuma_Latha_resume.pdf"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('download')) {
            e.preventDefault();
            alert('Resume download functionality would connect to your actual resume file. Please replace this with your resume link!');
        }
    });
});
