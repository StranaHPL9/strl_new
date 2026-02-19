// Button hover effects for .hero-button-wrapper
document.addEventListener('DOMContentLoaded', () => {
    const heroButtonWrapper = document.querySelector('.hero-button-wrapper');
    
    if (heroButtonWrapper) {
        const buttons = heroButtonWrapper.querySelectorAll('.button-cta');
        
        buttons.forEach((button) => {
            // Add transition for smooth effects
            button.style.transition = 'all 0.25s';
            
            // Hover in
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    y: -10,
                    duration: 0.25,
                    overwrite: 'auto',
                });
            });
            
            // Hover out
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    y: 0,
                    duration: 0.25,
                    overwrite: 'auto',
                });
            });
        });
    }
});

