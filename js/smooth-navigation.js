// Smooth navigation with Lenis
document.addEventListener('DOMContentLoaded', () => {
    // Get all nav links that have href starting with #
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .footer_link[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const href = link.getAttribute('href');
            const targetElement = document.querySelector(href);

            if (targetElement && window.lenis) {
                // Scroll to target element using Lenis
                window.lenis.scrollTo(targetElement, {
                    offset: -80, // Offset for navbar height
                    duration: 1.5,
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.w-nav-menu');
                const menuButton = document.querySelector('.menu-button');
                
                if (navMenu && navMenu.classList.contains('w--open')) {
                    menuButton.click();
                }
            }
        });
    });
});
