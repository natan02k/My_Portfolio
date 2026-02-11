// ===== INITIALIZATION & GLOBAL VARIABLES =====
gsap.registerPlugin(ScrollTrigger);

let isMobile = window.innerWidth <= 768;
let cursor = document.getElementById('cursor');
let cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Initialize animations after loading
        initAnimations();
        initCustomCursor();
        initThreeJS();
        initParticles();
        initScrollEffects();
        initThemeToggle();
        initContactForm();
        initProjectCards();
        initSkillBars();
        initStatsCounter();
    }, 2000);
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    if (isMobile) return;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('button, a, .project-card, .skill-category, .stat-item, .social-link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ===== ELEGANT GRADIENT MESH BACKGROUND =====
function initThreeJS() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create elegant gradient mesh instead of particles
    const geometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    
    // Custom shader for animated gradient
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            mouseX: { value: 0 },
            mouseY: { value: 0 }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float mouseX;
            uniform float mouseY;
            
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
                vec2 st = vUv;
                
                // Create flowing gradient effect
                float r = abs(sin(st.x * 3.0 + time) * 0.5 + 0.5);
                float g = abs(sin(st.y * 3.0 + time * 0.8) * 0.5 + 0.5);
                float b = abs(sin((st.x + st.y) * 2.0 + time * 1.2) * 0.5 + 0.5);
                
                // Add mouse interaction
                float dist = distance(st, vec2(mouseX, mouseY));
                float influence = 1.0 - smoothstep(0.0, 0.5, dist);
                
                r = mix(r, 0.0, influence * 0.3);
                g = mix(g, 1.0, influence * 0.5);
                b = mix(b, 0.8, influence * 0.4);
                
                // Create elegant color scheme
                vec3 color1 = vec3(0.0, 1.0, 0.5); // #00ff88
                vec3 color2 = vec3(0.0, 1.0, 1.0); // #00ffff
                vec3 color3 = vec3(1.0, 0.0, 1.0); // #ff00ff
                
                vec3 finalColor = mix(color1, color2, r);
                finalColor = mix(finalColor, color3, g);
                
                // Add subtle wave distortion
                float wave = sin(vPosition.x * 0.5 + time) * sin(vPosition.y * 0.5 + time * 0.7) * 0.1;
                finalColor += wave;
                
                gl_FragColor = vec4(finalColor, 0.3);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    camera.position.z = 5;
    
    // Mouse interaction
    let mouseX = 0.5;
    let mouseY = 0.5;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth;
        mouseY = 1.0 - (event.clientY / window.innerHeight);
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Update shader uniforms
        material.uniforms.time.value = elapsedTime;
        material.uniforms.mouseX.value = mouseX;
        material.uniforms.mouseY.value = mouseY;
        
        // Subtle mesh movement
        mesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        mesh.rotation.y = Math.cos(elapsedTime * 0.3) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== PARTICLE EFFECTS =====
function initParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: linear-gradient(135deg, #00ff88, #00ffff);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== GSAP ANIMATIONS =====
function initAnimations() {
    // Hero title animation
    gsap.from('.title-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Hero content animation
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-actions', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    // Floating elements animation
    gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        stagger: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ScrollTrigger animations for sections
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // About section animation
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Skills animation
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Projects animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Timeline animation
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.3,
            ease: 'power3.out'
        });
    });
    
    // Contact section animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Parallax effect for hero section
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.5,
        ease: 'none'
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        gsap.from('body', {
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.querySelector('.btn-text').textContent = 'Wird gesendet...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Nachricht erfolgreich gesendet! Ich melde mich bald bei Ihnen.', 'success');
            form.reset();
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===== PROJECT CARDS =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            if (isMobile) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
        
        // View project button
        const viewBtn = card.querySelector('.view-project');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Projekt-Demo wird in neuem Tab geöffnet...', 'info');
            });
        }
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                
                gsap.to(bar, {
                    width: progress + '%',
                    duration: 2,
                    ease: 'power3.out',
                    onComplete: () => {
                        observer.unobserve(bar);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, 20);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Initialize mobile menu
initMobileMenu();

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-primary)' : type === 'error' ? '#ff4444' : 'var(--accent-secondary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== EXPLORE AND CONTACT BUTTONS =====
document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

document.getElementById('contactBtn')?.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    
    // Hide custom cursor on mobile
    if (isMobile && cursor) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    } else if (cursor) {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler
const debouncedResize = debounce(() => {
    // Handle resize operations
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== MAGNETIC BUTTONS EFFECT =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn, .view-project');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            if (isMobile) return;
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const moveX = x * force * 0.3;
                const moveY = y * force * 0.3;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.05})`;
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// ===== TEXT SCRAMBLE ANIMATION =====
function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.nav-link, .hero-title .title-line, .section-title');
    
    scrambleElements.forEach(element => {
        const originalText = element.textContent;
        let isAnimating = false;
        
        element.addEventListener('mouseenter', () => {
            if (isAnimating || isMobile) return;
            isAnimating = true;
            
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            const iterations = 10;
            let iteration = 0;
            
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                    isAnimating = false;
                }
                
                iteration += 1 / 3;
            }, 30);
        });
    });
}

// Initialize text scramble
initTextScramble();

// ===== SIMPLIFIED STAGGERED REVEAL =====
function initSimplifiedStaggeredReveal() {
    // Only animate skill categories and project cards
    const elements = document.querySelectorAll('.skill-category, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                gsap.fromTo(element, 
                    {
                        opacity: 0,
                        y: 25,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: 'power2.out'
                    }
                );
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize simplified staggered reveal
initSimplifiedStaggeredReveal();

// ===== GSAP TEXT ANIMATION EFFECTS =====
function initAdvancedTextAnimations() {
    // Split text animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100px) rotateX(90deg)';
            heroTitle.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                delay: index * 0.05,
                ease: 'power3.out'
            });
        });
    }
    
    // Text reveal on scroll with blur effect
    gsap.utils.toArray('.text-block h3, .text-block p').forEach(element => {
        gsap.fromTo(element, 
            {
                opacity: 0,
                y: 50,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                ease: 'power3.out'
            }
        );
    });
    
    // Highlight text animation
    gsap.utils.toArray('.section-title').forEach(title => {
        const text = title.textContent;
        title.innerHTML = `<span class="highlight-text">${text}</span>`;
        
        gsap.fromTo('.highlight-text', 
            {
                backgroundSize: '0% 100%',
                backgroundImage: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0% 50%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            },
            {
                backgroundSize: '100% 100%',
                duration: 2,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                ease: 'power3.inOut'
            }
        );
    });
}

// Initialize advanced text animations
initAdvancedTextAnimations();

// ===== SVG MORPHING ANIMATIONS =====
function initSVGMorphing() {
    const logoPath = document.getElementById('logoPath');
    if (!logoPath) return;
    
    const shapes = [
        'M10,20 Q20,5 30,20 T30,20',
        'M10,20 Q20,35 30,20 T30,20',
        'M15,10 L25,10 L25,30 L15,30 Z',
        'M20,10 L30,20 L20,30 L10,20 Z',
        'M10,20 Q15,10 20,20 Q25,30 30,20'
    ];
    
    let currentShape = 0;
    
    function morphLogo() {
        currentShape = (currentShape + 1) % shapes.length;
        
        gsap.to(logoPath, {
            attr: { d: shapes[currentShape] },
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                setTimeout(morphLogo, 2000);
            }
        });
    }
    
    // Start morphing after initial load
    setTimeout(morphLogo, 3000);
    
    // Add hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logoPath, {
                attr: { d: 'M10,20 Q20,35 30,20 Q20,5 10,20' },
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            gsap.to(logoPath, {
                attr: { d: shapes[currentShape] },
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

// Initialize SVG morphing
initSVGMorphing();

// ===== FIXED PARALLAX SECTIONS =====
function initFixedParallax() {
    // Disable parallax on mobile for performance
    if (isMobile) return;
    
    // Simple parallax for hero elements only
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            gsap.to(heroContent, {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroSection,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    }
    
    // Remove problematic parallax from cards - use simple fade-in instead
    const cards = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    cards.forEach((card, index) => {
        // Simple staggered fade-in animation
        gsap.fromTo(card, 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Initialize fixed parallax
initFixedParallax();

// ===== MAGNETIC CURSOR EFFECT ON TEXT =====
function initMagneticCursorText() {
    const textElements = document.querySelectorAll('h1, h2, h3, .nav-link, .hero-subtitle');
    
    textElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            if (isMobile) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const moveX = x * force * 0.1;
                const moveY = y * force * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.02})`;
                element.style.textShadow = `${moveX * 0.1}px ${moveY * 0.1}px 20px rgba(0, 255, 136, ${force * 0.3})`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0) scale(1)';
            element.style.textShadow = 'none';
        });
    });
}

// Initialize magnetic cursor text effect
initMagneticCursorText();

// ===== CLEAN PAGE TRANSITIONS =====
function initCleanPageTransitions() {
    // Simple smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Simple section entrance animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Simple fade-in for children
                const children = entry.target.querySelectorAll('.skill-category, .project-card, .stat-item, .timeline-item');
                children.forEach((child, index) => {
                    gsap.fromTo(child, 
                        {
                            opacity: 0,
                            y: 20
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: index * 0.05,
                            ease: 'power2.out'
                        }
                    );
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize clean page transitions
initCleanPageTransitions();

// ===== TYPING ANIMATION FOR HERO TEXT =====
function initTypingAnimation() {
    const heroDescription = document.querySelector('.hero-description p');
    if (!heroDescription) return;
    
    const text = "Ich verwandle Code in digitale Kunst";
    heroDescription.textContent = '';
    heroDescription.classList.add('typing-text');
    
    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            heroDescription.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroDescription.classList.remove('typing-text');
            }, 2000);
        }
    }
    
    // Start typing after hero title animation
    setTimeout(typeWriter, 2000);
}

// Initialize typing animation
initTypingAnimation();

// ===== COOL GEOMETRIC SHAPE BACKGROUND =====
function initCoolShapeBackground() {
    const container = document.getElementById('threejs-container');
    if (!container) return;
    
    let scene, camera, renderer, shape;
    let mouseX = 0, mouseY = 0;
    let scrollProgress = 0;
    
    function init() {
        // Scene setup
        scene = new THREE.Scene();
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Create cool geometric shape - Torus Knot
        const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
        
        // Create wireframe material only (no fill)
        const material = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        
        // Create mesh
        shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        
        // // Add additional wireframe layers for depth
        // const wireframeMaterial2 = new THREE.MeshBasicMaterial({
        //     color: 0x8b5cf6,
        //     wireframe: true,
        //     transparent: true,
        //     opacity: 0.5
        // });
        // const wireframeShape2 = new THREE.Mesh(geometry, wireframeMaterial2);
        // wireframeShape2.scale.set(1.1, 1.1, 1.1);
        // scene.add(wireframeShape2);
        
        // const wireframeMaterial3 = new THREE.MeshBasicMaterial({
        //     color: 0xec4899,
        //     wireframe: true,
        //     transparent: true,
        //     opacity: 0.3
        // });
        // const wireframeShape3 = new THREE.Mesh(geometry, wireframeMaterial3);
        // wireframeShape3.scale.set(1.2, 1.2, 1.2);
        // scene.add(wireframeShape3);
        
        // // Add additional geometric shapes for complexity
        // const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 1);
        // const icosahedronMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xec4899,
        //     wireframe: true,
        //     transparent: true,
        //     opacity: 0.2
        // });
        // const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
        // icosahedron.position.set(3, 2, -1);
        // scene.add(icosahedron);
        
        // const octahedronGeometry = new THREE.OctahedronGeometry(0.8, 0);
        // const octahedronMaterial = new THREE.MeshBasicMaterial({
        //     color: 0x4b0082,
        //     wireframe: true,
        //     transparent: true,
        //     opacity: 0.15
        // });
        // const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
        // octahedron.position.set(-3, -2, 1);
        // scene.add(octahedron);
        
        // Lights (minimal for wireframe focus)
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x6366f1, 1, 100);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8, 100);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);
        
        // Event listeners
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('scroll', onScroll);
    }
    
    function onMouseMove(event) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function onScroll() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = window.scrollY / maxScroll;
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Main shape rotation
        shape.rotation.x = time * 0.3 + mouseY * 0.5;
        shape.rotation.y = time * 0.2 + mouseX * 0.5;
        shape.rotation.z = time * 0.1;
        
        // Morphing effect
        const scale = 1 + Math.sin(time * 2) * 0.1;
        shape.scale.set(scale, scale, scale);
        
        // Scroll-based transformations
        const scrollRotation = scrollProgress * Math.PI * 2;
        shape.rotation.y += scrollRotation * 0.01;
        
        const scrollScale = 1 - scrollProgress * 0.3;
        shape.scale.multiplyScalar(scrollScale);
        
        // Animate additional shapes
        scene.children.forEach((child, index) => {
            if (child !== shape && child.geometry) {
                child.rotation.x = time * (0.2 + index * 0.1);
                child.rotation.y = time * (0.3 + index * 0.1);
                child.position.x = Math.sin(time + index) * 3;
                child.position.y = Math.cos(time + index) * 2;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    init();
    animate();
}

// Initialize cool shape background
initCoolShapeBackground();

// ===== SELF-DRAWING SVG ANIMATION TRIGGER =====
function initSelfDrawingSVG() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target;
                const paths = svg.querySelectorAll('.draw-path');
                
                paths.forEach((path, index) => {
                    path.style.animation = 'none';
                    path.offsetHeight; // Trigger reflow
                    path.style.animation = `drawLine 2s ease forwards`;
                    path.style.animationDelay = `${0.5 + index * 0.5}s`;
                });
                
                observer.unobserve(svg);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.self-drawing-svg').forEach(svg => {
        observer.observe(svg);
    });
}

// Initialize self-drawing SVG
initSelfDrawingSVG();

// Initialize magnetic buttons
initMagneticButtons();