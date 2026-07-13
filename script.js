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

    // Hero background image rotation
    const heroImages = [
        'rotating/landscaping 1.jpeg',
        'rotating/153B0843-A597-47E6-B5FC-630C1B80D2BC_1_102_o.jpeg',
        'rotating/17741B17-9F60-44D0-9FE2-B6B26A75B4BA_1_105_c.jpeg',
        'rotating/5339AF6C-7635-474B-A0C4-2E21D70798DC_1_105_c.jpeg',
        'rotating/54CF7E3A-0FF9-4D3B-BE80-AC467984CFE5_1_105_c.jpeg',
        'rotating/B7FD7874-58A0-4AC3-A373-190B7DEB03E1_1_105_c.jpeg',
        'rotating/DA2B54FE-7A7B-4A16-99FA-FC48D4A85A4F_1_105_c.jpeg',
        'rotating/E201AAB8-BA69-4E86-A99F-8B17B0FFCC5A_1_102_o.jpeg'
    ];
    let currentImageIndex = 0;
    const heroBg1 = document.querySelector('.hero-bg-1');
    const heroBg2 = document.querySelector('.hero-bg-2');
    let autoRotateTimer;

    function goToImage(index) {
        currentImageIndex = ((index % heroImages.length) + heroImages.length) % heroImages.length;
        const nextImage = heroImages[currentImageIndex];

        if (heroBg1.style.opacity === '1' || heroBg1.style.opacity === '') {
            heroBg2.style.backgroundImage = `url('${nextImage}')`;
            heroBg2.style.opacity = '1';
            heroBg1.style.opacity = '0';
        } else {
            heroBg1.style.backgroundImage = `url('${nextImage}')`;
            heroBg1.style.opacity = '1';
            heroBg2.style.opacity = '0';
        }
    }

    function resetAutoRotate() {
        clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(() => goToImage(currentImageIndex + 1), 6000);
    }

    // Arrow click handlers
    document.querySelector('.hero-arrow-left').addEventListener('click', () => {
        goToImage(currentImageIndex - 1);
        resetAutoRotate();
    });

    document.querySelector('.hero-arrow-right').addEventListener('click', () => {
        goToImage(currentImageIndex + 1);
        resetAutoRotate();
    });

    // Start auto-rotation
    autoRotateTimer = setInterval(() => goToImage(currentImageIndex + 1), 6000);

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
