// ============================================
// KASIETA FOR SENATE - INTERACTIVE ELEMENTS
// Professional Campaign Website JavaScript
// ============================================

// ============================================
// MOBILE NAVIGATION
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    animateOnScrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('visible');
        }
    });
};

// Run on scroll
window.addEventListener('scroll', revealOnScroll);

// Run on load
window.addEventListener('load', revealOnScroll);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HERO SIGNUP FORM
// ============================================

const heroSignup = document.getElementById('heroSignup');

if (heroSignup) {
    heroSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(heroSignup);
        const email = heroSignup.querySelector('input[type="email"]').value;
        const zip = heroSignup.querySelector('input[type="text"]').value;
        
        // In production, this would send to a CRM/email service
        console.log('New signup:', { email, zip });
        
        // Show success message
        alert('Thank you for joining the campaign! We\'ll be in touch soon.');
        
        heroSignup.reset();
    });
}

// ============================================
// DONATE AMOUNT SELECTION
// ============================================

const amountButtons = document.querySelectorAll('.amount-btn');

amountButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get selected amount
        const amount = this.getAttribute('data-amount');
        console.log('Selected donation amount:', amount);
        
        // If "Other" is selected, could show input field
        if (amount === 'other') {
            // In production, show custom amount input
            const customAmount = prompt('Enter your donation amount:');
            if (customAmount) {
                console.log('Custom amount:', customAmount);
            }
        }
    });
});

// ============================================
// DONATE FORM
// ============================================

const donateForm = document.getElementById('donateForm');

if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(donateForm);
        
        // In production, this would process payment via Stripe/ActBlue/etc.
        console.log('Donation submission:', Object.fromEntries(formData));
        
        // Show success message
        alert('Thank you for your generous support! You will be redirected to our secure payment processor.');
        
        // In production, redirect to payment processor
        // window.location.href = 'https://secure.actblue.com/donate/kasieta2026';
    });
}

// ============================================
// PARALLAX EFFECT (SUBTLE)
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const heroOverlay = hero.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ============================================
// INTERSECTION OBSERVER (BETTER PERFORMANCE)
// ============================================

// Use Intersection Observer for more efficient scroll animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animate-on-scroll elements
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// FORM VALIDATION HELPERS
// ============================================

// ZIP code validation
const zipInputs = document.querySelectorAll('input[type="text"][maxlength="5"]');

zipInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        // Only allow numbers
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});

// Email validation helper
const emailInputs = document.querySelectorAll('input[type="email"]');

emailInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            input.setCustomValidity('Please enter a valid email address');
        } else {
            input.setCustomValidity('');
        }
    });
});

// Phone number formatting (basic)
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX
        if (value.length > 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length > 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    });
});

// ============================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ============================================

// Track button clicks
function trackEvent(category, action, label) {
    console.log('Analytics Event:', { category, action, label });
    
    // In production, integrate with Google Analytics, Facebook Pixel, etc.
    // gtag('event', action, { event_category: category, event_label: label });
}

// Track donate button clicks
document.querySelectorAll('.nav-link-donate, .btn-donate-submit').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Donation', 'Click', 'Donate Button');
    });
});

// Track position card interactions
document.querySelectorAll('.position-card, .ice-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        trackEvent('Engagement', 'Click', `Position: ${title}`);
    });
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c KASIETA FOR SENATE ', 'background: #002868; color: #FFFFFF; font-size: 20px; font-weight: bold; padding: 10px; letter-spacing: 2px;');
console.log('%c From Foster Care to the Fight for Michigan ', 'background: #BF0A30; color: #FFFFFF; font-size: 14px; padding: 8px;');
console.log('%c Michigan 2026 • Republican ', 'font-size: 12px; color: #6C757D; font-weight: 600;');
console.log('%c\nInterested in helping build this campaign?', 'font-size: 13px; color: #002868; font-weight: bold; margin-top: 8px;');
console.log('%c👉 Email: info@kasietaforsenate.com', 'font-size: 12px; color: #6C757D;');
console.log('%c👉 Website built with passion for Michigan', 'font-size: 12px; color: #6C757D;');

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log page load performance
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.className = 'sr-only';
skipLink.textContent = 'Skip to main content';
skipLink.style.position = 'absolute';
skipLink.style.left = '-9999px';

skipLink.addEventListener('focus', function() {
    this.style.left = '0';
    this.style.top = '0';
    this.style.zIndex = '10000';
    this.style.padding = '1rem';
    this.style.background = 'var(--navy)';
    this.style.color = 'var(--white)';
});

skipLink.addEventListener('blur', function() {
    this.style.left = '-9999px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ============================================
// READY STATE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Campaign website loaded and ready!');
    
    // Initialize all components
    revealOnScroll();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});