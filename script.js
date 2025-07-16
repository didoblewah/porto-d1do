// Reset projects section layout
function resetProjectsLayout() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectsGrid) {
        // Force grid layout reset
        projectsGrid.style.display = 'none';
        projectsGrid.offsetHeight; // Force reflow
        projectsGrid.style.display = 'grid';
        
        // Reset all project cards
        projectCards.forEach(card => {
            card.style.position = 'static';
            card.style.transform = 'none';
            card.style.opacity = '1';
            card.classList.add('visible'); // Ensure visible class is added
        });
    }
}

// Function to fix projects layout on first load
function fixProjectsOnFirstLoad() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.classList.add('visible');
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Reset projects layout if navigating to projects section
            if (this.getAttribute('href') === '#projects') {
                setTimeout(() => {
                    resetProjectsLayout();
                }, 500); // Wait for smooth scroll to complete
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for projects section
            if (entry.target.classList.contains('project-card')) {
                fixProjectsOnFirstLoad();
            }
        }
    });
}, observerOptions);

// Special observer for projects section
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Immediately fix projects layout when section becomes visible
            setTimeout(() => {
                fixProjectsOnFirstLoad();
                resetProjectsLayout();
            }, 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe projects section
const projectsSection = document.querySelector('#projects');
if (projectsSection) {
    projectsObserver.observe(projectsSection);
}

// Add fade-in class to elements and observe them
const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .stat, .skill-card, .project-card, .contact-item');
elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Mohon lengkapi semua field!');
            return;
        }
        
        // Show success message (in real scenario, you would send data to server)
        alert('Terima kasih! Pesan Anda telah diterima. Saya akan menghubungi Anda segera.');
        
        // Reset form
        this.reset();
    });
}

// Gmail integration for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const userName = document.getElementById('userName').value;
            const userEmail = document.getElementById('userEmail').value;
            const userMessage = document.getElementById('userMessage').value;
            
            // Create Gmail compose URL with pre-filled data
            const emailSubject = encodeURIComponent(`Pesan dari ${userName} - Portfolio Website`);
            const emailBody = encodeURIComponent(
                `Nama: ${userName}\n` +
                `Email: ${userEmail}\n\n` +
                `Pesan:\n${userMessage}\n\n` +
                `---\n` +
                `Pesan ini dikirim melalui form kontak di website portfolio.`
            );
            
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=farhanwalker27@gmail.com&su=${emailSubject}&body=${emailBody}`;
            
            // Open Gmail in new tab
            window.open(gmailUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message (optional)
            alert('Form berhasil dikirim! Gmail akan terbuka untuk mengirim pesan.');
        });
    }
});

// Typing animation for hero text
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
}

// Skills cards hover effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards parallax effect
window.addEventListener('scroll', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.1;
    
    projectCards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > cardTop && scrolled < cardTop + cardHeight) {
            const yPos = rate * (index + 1) * 0.5;
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace('+', ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.innerText = target + '+';
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + '+';
            }
        }, 16);
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles after page load
window.addEventListener('load', createParticles);

// Smooth reveal animation for elements
const revealElements = () => {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealElements);

// Ensure projects are visible on page load
document.addEventListener('DOMContentLoaded', function() {
    // Fix projects layout immediately on page load
    setTimeout(() => {
        fixProjectsOnFirstLoad();
    }, 100);
    
    // Also fix after a longer delay to ensure all animations are done
    setTimeout(() => {
        fixProjectsOnFirstLoad();
        resetProjectsLayout();
    }, 1000);
});

// Fix projects on window load (backup)
window.addEventListener('load', function() {
    setTimeout(() => {
        fixProjectsOnFirstLoad();
        resetProjectsLayout();
    }, 500);
});

// Monitor scroll and fix projects if needed
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isProjectsVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isProjectsVisible) {
            // Check if any project card is invisible and fix it
            const projectCards = document.querySelectorAll('.project-card');
            let needsFix = false;
            projectCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                if (cardRect.opacity === 0 || window.getComputedStyle(card).opacity === '0') {
                    needsFix = true;
                }
            });
            
            if (needsFix) {
                fixProjectsOnFirstLoad();
            }
        }
    }
}, { passive: true });

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    revealElements();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Disable right-click context menu (optional)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Add some CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .particle {
        z-index: 1;
    }
    
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Framer Motion animations for About section
document.addEventListener('DOMContentLoaded', function() {
    // Check if Motion is available (loaded from CDN)
    if (typeof Motion !== 'undefined') {
        // Initialize Framer Motion animations for About section
        const initMotionAnimations = () => {
            // Get all elements with data-motion attribute
            const motionElements = document.querySelectorAll('[data-motion]');
            
            motionElements.forEach(element => {
                const motionType = element.getAttribute('data-motion');
                const delay = parseFloat(element.getAttribute('data-delay')) || 0;
                
                // Set initial state
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                
                // Create intersection observer for each element
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animate element when it comes into view
                            setTimeout(() => {
                                if (motionType === 'fade-up') {
                                    // Animate to visible state
                                    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                    element.style.opacity = '1';
                                    element.style.transform = 'translateY(0px)';
                                    
                                    // Add a subtle bounce effect
                                    setTimeout(() => {
                                        element.style.transform = 'translateY(-5px)';
                                        setTimeout(() => {
                                            element.style.transform = 'translateY(0px)';
                                        }, 150);
                                    }, 400);
                                }
                            }, delay * 1000);
                            
                            // Stop observing after animation
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                observer.observe(element);
            });
        };
        
        // Initialize animations
        initMotionAnimations();
        
        // Add hover effects for stats
        const stats = document.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transition = 'transform 0.3s ease';
                stat.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(0px) scale(1)';
            });
        });
        
    } else {
        // Fallback if Motion library doesn't load
        console.log('Framer Motion library not loaded, using fallback animations');
        
        // Simple CSS-based animations as fallback
        const fallbackElements = document.querySelectorAll('[data-motion]');
        fallbackElements.forEach(element => {
            const delay = parseFloat(element.getAttribute('data-delay')) || 0;
            
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0px)';
                        }, delay * 1000);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
});

// Reset layout when page becomes visible or when scrolling to projects
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(resetProjectsLayout, 100);
    }
});

// Also reset when window is resized
window.addEventListener('resize', () => {
    setTimeout(resetProjectsLayout, 100);
});

// Reset on page load
window.addEventListener('load', () => {
    setTimeout(resetProjectsLayout, 100);
});
