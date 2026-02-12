// Tailwind Config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                bordeaux: '#5B0A25',
                gold: '#DAB97F',
                cream: '#FAFAFA',
                charcoal: '#1F2937'
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'gold': '0 4px 20px -2px rgba(218, 185, 127, 0.3)',
                'bordeaux': '0 4px 20px -2px rgba(91, 10, 37, 0.2)',
            }
        }
    }
}

// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Scroll Reveal Animation (Building Floors Effect)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.floor-reveal').forEach((el) => observer.observe(el));

// Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 16);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

// Portfolio 3D Toggle
function togglePortfolio(card) {
    // Close other cards
    document.querySelectorAll('.portfolio-card').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });
    
    // Toggle current
    card.classList.toggle('active');
    
    // Re-init icons for AR elements if opening
    if (card.classList.contains('active')) {
        setTimeout(() => lucide.createIcons(), 100);
    }
}

// Auto-fill contact subject from portfolio
function openContact(projectName) {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        const textarea = document.querySelector('textarea');
        textarea.value = `Olá Ana, vi o projeto "${projectName}" no portfólio e gostaria de solicitar um orçamento similar.\n\n`;
        textarea.focus();
    }, 800);
}

// Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const modal = document.getElementById('successModal');
    const content = document.getElementById('modalContent');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    this.reset();
});

function closeModal() {
    const modal = document.getElementById('successModal');
    const content = document.getElementById('modalContent');
    
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

// Close modal on outside click
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});