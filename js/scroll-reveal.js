// Scroll Reveal Animation using GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize reveal animations
const revealElements = document.querySelectorAll('[data-scroll-reveal], .scroll-reveal');

revealElements.forEach((element) => {
    // Set initial state
    gsap.set(element, {
        opacity: 0,
        top: '25px',
        position: 'relative',
    });

    // Create scroll animation
    gsap.to(element, {
        opacity: 1,
        top: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 50%',
            scrub: false,
            markers: false,
        },
    });
});
