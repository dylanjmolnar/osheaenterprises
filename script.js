document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Animate hamburger to X
        const hamburger = document.querySelector('.hamburger');
        if (navList.classList.contains('active')) {
            hamburger.style.backgroundColor = 'transparent';
            hamburger.style.setProperty('--pseudo-before-transform', 'rotate(45deg) translate(5px, 6px)');
            hamburger.style.setProperty('--pseudo-after-transform', 'rotate(-45deg) translate(5px, -6px)');
            
            // Apply a small hack since we can't easily style pseudo elements in JS directly
            mobileMenuToggle.classList.add('is-active');
        } else {
            hamburger.style.backgroundColor = '';
            mobileMenuToggle.classList.remove('is-active');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('is-active');
        });
    });

    // Add CSS for the hamburger animation
    const style = document.createElement('style');
    style.innerHTML = `
        .mobile-menu-toggle.is-active .hamburger {
            background-color: transparent;
        }
        .mobile-menu-toggle.is-active .hamburger::before {
            transform: rotate(45deg) translate(5px, 6px);
        }
        .mobile-menu-toggle.is-active .hamburger::after {
            transform: rotate(-45deg) translate(5px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Simple scroll reveal animation for elements
    const revealElements = document.querySelectorAll('.service-card, .about-content, .stats-container, .about-image-wrapper');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        revealObserver.observe(el);
    });
});
