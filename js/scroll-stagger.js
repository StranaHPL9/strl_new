// Scroll Stagger Animation using GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize stagger animations
const staggerContainers = document.querySelectorAll('[data-scroll-stagger]');

staggerContainers.forEach((container) => {
    const children = container.children;

    // Set initial state for all children
    gsap.set(children, {
        opacity: 0,
        top: '25px',
        position: 'relative',
    });

    // Create stagger animation
    gsap.to(children, {
        opacity: 1,
        top: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.2,
        scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'top 50%',
            scrub: false,
            markers: false,
        },
    });
});
