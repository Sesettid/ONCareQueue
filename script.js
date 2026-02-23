// =====================================================
// ONCareQueue - Premium Animations & Interactivity
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initQueueSimulator();
    initParticles();
    initCursorGlow();
    initSmoothReveal();
    initTypewriter();
    initFormHandlers();
    initMobileMenu();
});

// =====================================================
// NAVBAR - Transparent to solid on scroll
// =====================================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// =====================================================
// MOBILE MENU
// =====================================================
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');
    if (!btn) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        links.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            links.classList.remove('mobile-open');
        });
    });
}

// =====================================================
// TYPEWRITER EFFECT - Hero badge
// =====================================================
function initTypewriter() {
    const badge = document.querySelector('.hero-badge');
    if (!badge) return;

    const texts = [
        "Ontario's Leading Healthcare Platform",
        "Find Doctors Accepting New Patients",
        "Real-Time Wait Time Updates",
        "PHIPA Compliant & Secure"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            badge.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            badge.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1000);
}

// =====================================================
// HERO ANIMATIONS - Entrance & Parallax
// =====================================================
function initHeroAnimations() {
    // Parallax on hero background
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) {
            heroGradient.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        const heroPattern = document.querySelector('.hero-pattern');
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    });

    // Floating animation on hero card
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        let time = 0;
        setInterval(() => {
            time += 0.05;
            heroCard.style.transform = `translateY(${Math.sin(time) * 8}px)`;
        }, 50);
    }

    // Doctor image parallax
    const doctorImg = document.querySelector('.hero-doctor-image');
    if (doctorImg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            doctorImg.style.transform = `translateY(${scrollY * 0.1}px) scale(1.02)`;
        });
    }
}

// =====================================================
// SMOOTH SCROLL REVEAL - All elements
// =====================================================
function initSmoothReveal() {
    // Mark elements to animate
    const animatables = [
        { selector: '.feature-card', delay: 100, class: 'slide-up' },
        { selector: '.service-card', delay: 150, class: 'slide-up' },
        { selector: '.testimonial-card', delay: 100, class: 'slide-up' },
        { selector: '.section-header', delay: 0, class: 'fade-in' },
        { selector: '.stat-box', delay: 100, class: 'zoom-in' },
        { selector: '.hero-image-container', delay: 200, class: 'slide-right' },
    ];

    animatables.forEach(({ selector, delay, class: animClass }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('will-animate', animClass);
            el.style.transitionDelay = `${i * delay}ms`;
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.will-animate').forEach(el => observer.observe(el));
}

// =====================================================
// SCROLL ANIMATIONS - Smooth scroll
// =====================================================
function initScrollAnimations() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// =====================================================
// COUNTER ANIMATIONS - Stats numbers
// =====================================================
function initCounterAnimations() {
    const counters = [
        { selector: '.stat-number:nth-child(1)', end: 50, suffix: 'K+', label: 'Patients Served' },
        { selector: '.stat-number:nth-child(2)', end: 200, suffix: '+', label: 'Ontario Clinics' },
    ];

    const statValues = document.querySelectorAll('.stat-value');
    
    const animateCounter = (el, target, suffix) => {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const raw = el.textContent;
            const hasComma = raw.includes(',');
            const num = Math.floor(current);
            el.textContent = hasComma 
                ? num.toLocaleString() + suffix.replace(/\d+/g, '')
                : num + suffix.replace(/\d+/g, '');
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const raw = el.textContent;
                const match = raw.match(/[\d,]+/);
                if (!match) return;
                const target = parseInt(match[0].replace(/,/g, ''));
                const suffix = raw.replace(/[\d,]/g, '');
                animateCounter(el, target, suffix);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));

    // Also animate hero stats
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

// =====================================================
// QUEUE SIMULATOR - Live queue updates in hero
// =====================================================
function initQueueSimulator() {
    const queueItems = document.querySelectorAll('.queue-item');
    if (!queueItems.length) return;

    const names = ['Emma Thompson', 'Liam Patel', 'Olivia Chen', 'Noah Williams', 'Aisha Malik', 'Lucas Brown'];
    let nameIndex = 0;

    // Pulse the ready item
    setInterval(() => {
        const readyItem = document.querySelector('.queue-item:first-child');
        if (readyItem) {
            readyItem.style.background = 'rgba(16, 185, 129, 0.08)';
            readyItem.style.borderLeft = '3px solid #10B981';
            setTimeout(() => {
                readyItem.style.background = '';
                readyItem.style.borderLeft = '';
            }, 1000);
        }
    }, 2000);

    // Simulate patient being called
    setInterval(() => {
        const items = document.querySelectorAll('.queue-item');
        if (!items.length) return;

        // Animate removal of first item
        items[0].style.transform = 'translateX(-20px)';
        items[0].style.opacity = '0';
        items[0].style.transition = 'all 0.4s ease';

        setTimeout(() => {
            // Update all items: shift up
            const numbers = document.querySelectorAll('.queue-number');
            const names_el = document.querySelectorAll('.queue-name');
            const times = document.querySelectorAll('.queue-time');
            const statuses = document.querySelectorAll('.queue-status');

            numbers.forEach((num, i) => {
                if (i < items.length - 1) {
                    num.textContent = numbers[i + 1]?.textContent || num.textContent;
                }
            });
            names_el.forEach((n, i) => {
                if (i < items.length - 1) {
                    n.textContent = names_el[i + 1]?.textContent || n.textContent;
                }
            });

            // Reset first item and update last
            items[0].style.transform = '';
            items[0].style.opacity = '1';
            
            // Add new patient at bottom
            const lastItem = items[items.length - 1];
            const lastName = lastItem.querySelector('.queue-name');
            const lastTime = lastItem.querySelector('.queue-time');
            const lastNum = lastItem.querySelector('.queue-number');
            
            if (lastName) lastName.textContent = names[nameIndex % names.length];
            if (lastTime) lastTime.textContent = 'Wait: 30 min';
            if (lastNum) lastNum.textContent = String(parseInt(lastNum.textContent) + 1).padStart(3, '0');
            nameIndex++;

            // Flash new item
            lastItem.style.background = 'rgba(20, 184, 166, 0.1)';
            setTimeout(() => { lastItem.style.background = ''; }, 800);

            // Update first status to ready
            const firstStatus = statuses[0];
            if (firstStatus) {
                firstStatus.className = 'queue-status ready';
                firstStatus.textContent = 'Ready';
            }

            // Update wait times
            times.forEach((t, i) => {
                if (i === 0) t.textContent = 'Wait: 0 min';
                else {
                    const mins = (i * 6) + Math.floor(Math.random() * 3);
                    t.textContent = `Wait: ${mins} min`;
                }
            });
        }, 400);
    }, 4000);
}

// =====================================================
// PARTICLE BACKGROUND - Hero section
// =====================================================
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    canvas.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.4;
    `;
    hero.prepend(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const PARTICLE_COUNT = 40;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '#0F766E' : '#14B8A6'
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });

        // Draw connecting lines
        ctx.globalAlpha = 0.05;
        ctx.strokeStyle = '#0F766E';
        ctx.lineWidth = 1;
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}

// =====================================================
// CURSOR GLOW - Subtle interactive cursor effect
// =====================================================
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Scale on interactive elements
    document.querySelectorAll('a, button, .feature-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => glow.classList.add('expanded'));
        el.addEventListener('mouseleave', () => glow.classList.remove('expanded'));
    });
}

// =====================================================
// FORM HANDLERS
// =====================================================
function initFormHandlers() {
    const form = document.querySelector('.cta-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const btn = form.querySelector('button');
        
        btn.textContent = '✓ You\'re on the list!';
        btn.style.background = '#10B981';
        btn.disabled = true;
        
        form.querySelector('input').value = '';
        
        setTimeout(() => {
            btn.textContent = 'Request Demo';
            btn.style.background = '';
            btn.disabled = false;
        }, 4000);
    });
}
