// ===== AOS Init =====
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
});

// ===== Navbar Scroll Effect =====
const nav = document.querySelector('.landing-nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.textContent = '☰';
    });
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

// ===== Counter Animation for Stats =====
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(stat => {
                const text = stat.textContent;
                const num = parseInt(text);
                if (!isNaN(num) && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    let current = 0;
                    const increment = num / 30;
                    const suffix = text.replace(/[0-9]/g, '');
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            clearInterval(timer);
                            stat.textContent = text;
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.intro-stats');
if (statsSection) {
    statsObserver.observe(statsSection.closest('.intro-section'));
}

// ===== Timeline Items Staggered Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.6s ease ${index * 0.15}s`;
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            timelineItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        }
    });
}, { threshold: 0.2 });

const timeline = document.querySelector('.timeline');
if (timeline) {
    timelineObserver.observe(timeline);
}

// ===== Parallax Hero Images =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

console.log('🎨 Landing Page RashinaThor — loaded!');
