// ============================================
// KASIETA FOR SENATE - JAVASCRIPT
// ============================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

// Run on scroll
window.addEventListener('scroll', revealOnScroll);

// Run on load
window.addEventListener('load', revealOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Volunteer Form Handling (Demo)
const volunteerForm = document.getElementById('volunteerForm');

volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real implementation, this would send data to a server
    alert('Thank you for volunteering! Someone from the campaign will be in touch soon.');
    
    volunteerForm.reset();
});

// Donate Amount Buttons
const amountButtons = document.querySelectorAll('.amount-btn');

amountButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // In a real implementation, this would set the donation amount
        const amount = this.textContent;
        console.log('Selected donation amount:', amount);
    });
});

// Add active state styling for amount buttons
const style = document.createElement('style');
style.textContent = `
    .amount-btn.active {
        background: var(--red) !important;
        color: var(--white) !important;
        border-color: var(--red) !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const heroBackground = hero.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Console message for developers
console.log('%c From Foster Care to the Fight for Michigan ', 'background: #1B2A4A; color: #C5A55A; font-size: 16px; font-weight: bold; padding: 8px;');
console.log('%c Justin Kasieta for U.S. Senate 2026 ', 'background: #C41E3A; color: white; font-size: 14px; padding: 6px;');
console.log('%c Interested in helping build this campaign? Email info@kasietaforsenate.com ', 'font-size: 12px; color: #6C757D;');
