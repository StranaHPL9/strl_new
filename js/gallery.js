// Image Gallery with Swiper.js
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    const selectorContainer = document.querySelector('.selector');
    
    if (!galleryContainer || !selectorContainer) return;
    
    const imageWrapper = galleryContainer.querySelector('.project_image-wrapper');
    const totalImages = imageWrapper.querySelectorAll('.project_item').length;
    
    // Function to generate dots based on slides per view
    function generateDots(slidesPerView) {
        slidesPerView = slidesPerView || 1;
        const totalSlides = Math.ceil(totalImages / slidesPerView);
        selectorContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `selector_dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                // slideTo expects a slide index; multiply by slidesPerView to go to page
                swiper.slideTo(i * slidesPerView);
            });
            selectorContainer.appendChild(dot);
        }
    }
    
    // Initialize Swiper with responsive breakpoints
    const swiper = new Swiper('.gallery-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        allowTouchMove: true,
        grabCursor: true,
        breakpoints: {
            991: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        },
        on: {
            slideChange: function() {
                // Update active dot based on page index
                const spv = swiper.params.slidesPerView || 1;
                const pageIndex = Math.floor(swiper.activeIndex / spv);
                document.querySelectorAll('.selector_dot').forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === pageIndex);
                });
            },
            init: function() {
                // Generate dots on init
                generateDots(swiper.params.slidesPerView || 1);
            },
            breakpoint: function() {
                // Regenerate dots when breakpoint changes
                setTimeout(() => {
                    generateDots(swiper.params.slidesPerView || 1);
                }, 100);
            }
        }
    });
});
