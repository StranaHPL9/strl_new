// Navbar background on scroll and mobile menu toggle
const navbar = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
const scrollThreshold = 100;
let isMenuOpen = false;

// Handle scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        navbar.style.backgroundColor = '#01070e';
        navbar.style.transition = 'background-color 0.3s ease';
    } else {
        // If at top and menu is closed, make transparent
        if (!isMenuOpen) {
            navbar.style.backgroundColor = 'transparent';
        }
    }
});

// Handle mobile menu open/close
if (menuButton) {
    menuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen && window.scrollY <= scrollThreshold) {
            // Menu opened at top - make background black
            navbar.style.backgroundColor = '#010B10';
            navbar.style.transition = 'background-color 0.3s ease';
        } else if (!isMenuOpen && window.scrollY <= scrollThreshold) {
            // Menu closed at top - make transparent
            navbar.style.backgroundColor = 'transparent';
            navbar.style.transition = 'background-color 0.3s ease';
        }
    });
}
