// Initialize Lenis
window.lenis = new Lenis({
    autoRaf: true,
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    lerp: 0.08,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
});
