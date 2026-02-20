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

// Modal gallery logic for .gallery-modal-link
(function(){
    const galleries = {
        industrial: [
            'images/optimizovano/Industrial&Commercial/Beenleigh/ind1.webp',
            'images/optimizovano/Industrial&Commercial/NewAldiSupermarketOrmeau/ind2.webp',
            'images/optimizovano/Industrial&Commercial/PWRAdvancedCoolingTechnology,Stapylton-NewFactoryAlterations/ind3.webp',
            'images/optimizovano/Industrial&Commercial/WaterfordPlazaUplift&Restoration/ind4.webp',
            'images/optimizovano/Industrial&Commercial/WaterfordPlazaUplift&Restoration/ind5.webp',
            'images/optimizovano/Industrial&Commercial/WaterfordPlazaUplift&Restoration/ind6.webp',
            'images/optimizovano/Industrial&Commercial/WaterfordPlazaUplift&Restoration/ind7.webp'
        ],
        residential: [
            'images/optimizovano/Residential/dkp_Trac_Kingsholme09S.webp',
            'images/optimizovano/Residential/dkp_Trac_Kingsholme12S.webp',
            'images/optimizovano/Residential/dkp_mer_clay08S.webp',
            'images/optimizovano/Residential/dkp_mer_baker21S.webp',
            'images/optimizovano/Residential/dkp_mer_baker20S.webp',
            'images/optimizovano/Residential/DSC_0027.webp',
            'images/optimizovano/Residential/DSC_0525.webp',
            'images/optimizovano/Residential/n4023.webp',
            'images/optimizovano/Residential/n4027.webp',
            'images/optimizovano/Residential/n4064.webp',
            'images/optimizovano/Residential/Trac 016.webp'
        ],
        schools: [
            'images/optimizovano/Schools/Oxley State School-New Walkways & Ramps/260f2163-8f44-4f05-8474-70d32cdaeffd.webp',
            'images/optimizovano/Schools/Oxley State School-New Walkways & Ramps/ChatGPT Image Feb 8, 2026, 04_39_03 PM.webp',
            'images/optimizovano/Schools/Oxley State School-New Walkways & Ramps/ChatGPT Image Feb 8, 2026, 04_54_07 PM.webp',
            'images/optimizovano/Schools/Γü¿Seven Hills State SchoolΓü⌐ Γü¿BrisbaneΓü⌐ - New Canopy, Walkways & Alterations to Admin Building/ChatGPT Image Feb 8, 2026, 04_32_54 PM.webp',
            'images/optimizovano/Schools/Γü¿Seven Hills State SchoolΓü⌐ Γü¿BrisbaneΓü⌐ - New Canopy, Walkways & Alterations to Admin Building/a29aff6f-64c0-4da7-8e5b-06eaa186c85a.webp'
        ]
    };

    const modal = document.getElementById('modalGallery');
    const modalImg = document.getElementById('modalGalleryImage');
    const modalCaption = document.getElementById('modalGalleryCaption');
    const previewsContainer = document.getElementById('modalPreviews');
    const btnClose = modal.querySelector('.modal-close');
    const btnPrev = modal.querySelector('.modal-prev');
    const btnNext = modal.querySelector('.modal-next');

    let currentArray = [];
    let currentIndex = 0;

    function openModal(arr, index){
        currentArray = arr.slice();
        currentIndex = index || 0;
        renderPreviews();
        updateModal();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(){
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
    }

    function updateModal(){
        const src = currentArray[currentIndex];
        if(!src) return;
        modalImg.src = src;
        const fileName = src.split('/').pop();
        modalImg.alt = fileName;
        modalCaption.textContent = `${currentIndex+1} / ${currentArray.length}`;
        // update preview active state and attempt to scroll active thumb into view
        if(previewsContainer){
            const thumbs = previewsContainer.querySelectorAll('img');
            thumbs.forEach((t, idx) => t.classList.toggle('active', idx === currentIndex));
            const activeThumb = thumbs[currentIndex];
            if(activeThumb && activeThumb.scrollIntoView) activeThumb.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
        }
    }

    function showNext(){
        currentIndex = (currentIndex + 1) % currentArray.length;
        updateModal();
    }
    function showPrev(){
        currentIndex = (currentIndex - 1 + currentArray.length) % currentArray.length;
        updateModal();
    }

    // Delegate click on .gallery-modal-link
    document.addEventListener('click', function(e){
        const el = e.target.closest('.gallery-modal-link');
        if(!el) return;
        e.preventDefault();
        const id = el.id || '';
        // determine which gallery
        let arr = [];
        if(id.indexOf('industrial') !== -1) arr = galleries.industrial;
        else if(id.indexOf('residential') !== -1) arr = galleries.residential;
        else if(id.indexOf('schools') !== -1) arr = galleries.schools;
        else arr = galleries.industrial;

        // try to start at clicked thumbnail if it has an img
        const thumb = el.querySelector('img');
        let startIndex = 0;
        if(thumb){
            const src = thumb.getAttribute('src');
            const idx = arr.indexOf(src);
            if(idx >= 0) startIndex = idx;
        }
        openModal(arr, startIndex);
    });

    // render preview thumbnails for currentArray
    function renderPreviews(){
        if(!previewsContainer) return;
        previewsContainer.innerHTML = '';
        currentArray.forEach((s, i) => {
            const thumb = document.createElement('img');
            thumb.src = s;
            thumb.alt = `Preview ${i+1}`;
            thumb.dataset.index = i;
            if(i === currentIndex) thumb.classList.add('active');
            thumb.addEventListener('click', function(){
                currentIndex = i;
                updateModal();
            });
            previewsContainer.appendChild(thumb);
        });
    }

    btnClose.addEventListener('click', closeModal);
    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    modal.addEventListener('click', function(e){
        if(e.target === modal) closeModal();
    });

    // keyboard
    document.addEventListener('keydown', function(e){
        if(modal.classList.contains('open')){
            if(e.key === 'ArrowRight') showNext();
            else if(e.key === 'ArrowLeft') showPrev();
            else if(e.key === 'Escape') closeModal();
        }
    });
})();
