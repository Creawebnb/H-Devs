// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);
activateNavLink(); // Initial check

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .project-card, .tech-item, .about-feature, .pricing-card, .maintenance-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message envoyé ✓';
        submitBtn.style.background = 'var(--gradient-1)';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2500) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.includes('+') ? '+' : '';
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target') || stat.textContent.replace(/\D/g, ''));
                if (target && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    stat.textContent = '0';
                    animateCounter(stat, target, 2500);
                }
            });
            
            // Animate hero stats
            const heroStats = document.querySelectorAll('.hero-stat-number');
            heroStats.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    stat.textContent = '0';
                    animateCounter(stat, number, 2000);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
const heroSection = document.querySelector('.hero');
if (statsSection) {
    statsObserver.observe(statsSection);
}
if (heroSection) {
    statsObserver.observe(heroSection);
}

// Parallax Effect for Hero Section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        const heroVisual = hero.querySelector('.hero-visual');
        if (heroContent && scrolled < window.innerHeight) {
            const parallax = scrolled * 0.2;
            heroContent.style.transform = `translateY(${parallax}px)`;
            heroContent.style.opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight) * 1.5);
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${-parallax * 0.3}px)`;
            }
        }
    }
});

// Add glow effect on hover for buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 50px rgba(0, 255, 136, 0.5)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 30px rgba(0, 255, 136, 0.3)';
    });
});

// Add active class to nav links with CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
        width: 0;
    }
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// Cursor glow effect (optional enhancement)
let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 24px;
    height: 24px;
    border: 2px solid var(--accent-1);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    opacity: 0;
    mix-blend-mode: difference;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 12 + 'px';
    cursor.style.top = e.clientY - 12 + 'px';
    cursor.style.opacity = '1';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Add scale effect on interactive elements
document.querySelectorAll('a, button, .service-card, .project-card, .tech-item, .pricing-card, .pricing-btn, .custom-project-btn').forEach(el => {
    el.addEventListener('mouseenter', function() {
        cursor.style.transform = 'scale(1.8)';
        cursor.style.borderWidth = '1px';
    });
    
    el.addEventListener('mouseleave', function() {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderWidth = '2px';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll reveal animations for section headers
const scrollReveal = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section-header, .section-title, .section-description, .section-badge, .about-description').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollReveal.observe(el);
});

// Hero blob animations
document.querySelectorAll('.hero-blob').forEach((blob, index) => {
    blob.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3)';
        this.style.opacity = '0.8';
    });
    
    blob.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.opacity = '0.6';
    });
});

// Service cards icon animation enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.filter = 'grayscale(0) brightness(1.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.filter = 'grayscale(0) brightness(1)';
        }
    });
});

// Smooth reveal for about features
const aboutFeaturesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.about-feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-30px)';
    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    aboutFeaturesObserver.observe(feature);
});

// Project card image hover effect
document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image');
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', function() {
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Pricing card featured animation
document.querySelectorAll('.pricing-card.featured').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Pricing buttons hover effect
document.querySelectorAll('.pricing-btn, .custom-project-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
