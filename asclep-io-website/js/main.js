document.addEventListener('DOMContentLoaded', () => {
    // Cost section slideshow functionality
    const initCostSlideshow = () => {
        const slides = document.querySelectorAll('.cost-slide');
        const dots = document.querySelectorAll('.slide-dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Touch tracking variables
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Auto-advance timer
        let slideInterval = setInterval(nextSlide, 6000);
        
        function goToSlide(n) {
            // Prepare the slides for transition
            const direction = n > currentSlide ? 1 : -1;
            const outgoingSlide = slides[currentSlide];
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active', 'slide-out-left', 'slide-out-right'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Set the new active slide and dot
            currentSlide = (n + slideCount) % slideCount; // Handle negative numbers
            
            // Add appropriate transition classes
            if (direction > 0) {
                outgoingSlide.classList.add('slide-out-left');
            } else {
                outgoingSlide.classList.add('slide-out-right');
            }
            
            // Delay the new slide appearance slightly for better effect
            setTimeout(() => {
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }, 50);
            
            // Reset the timer
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
            
            // Animate counting for cost values (if needed)
            animateCostValues();
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
        }
        
        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance in pixels
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance > swipeThreshold) {
                // Swiped right - go to previous slide
                prevSlide();
            } else if (swipeDistance < -swipeThreshold) {
                // Swiped left - go to next slide
                nextSlide();
            }
        }
        
        function animateCostValues() {
            // Optional future enhancement: animate counting of cost values
            // For percentages, currency values, etc.
        }
        
        // Event listeners
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Touch events for mobile
        const costGrid = document.querySelector('.cost-grid');
        if (costGrid) {
            costGrid.addEventListener('touchstart', handleTouchStart, {passive: true});
            costGrid.addEventListener('touchend', handleTouchEnd, {passive: true});
            
            // Pause slideshow when interacting with it
            costGrid.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            costGrid.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 6000);
            });
            
            // Also pause on touch
            costGrid.addEventListener('touchstart', () => {
                clearInterval(slideInterval);
            }, {passive: true});
            
            costGrid.addEventListener('touchend', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 6000);
            }, {passive: true});
        }
    };
    
    // Initialize the cost slideshow if elements exist
    if (document.querySelector('.cost-slide')) {
        initCostSlideshow();
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    // Scroll behavior for header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
        } else {
            header.classList.remove('scrolled');
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
                
                // Scroll to the target
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle scroll down arrow in hero section
    const scrollArrow = document.querySelector('.hero-scroll');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const nextSection = document.querySelector('.stats-section') || document.querySelector('.solutions-section');
            if (nextSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-card, .solution-card, .cost-card, .impact-text, .impact-media');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initialize animations
    setTimeout(animateOnScroll, 100);
    window.addEventListener('scroll', animateOnScroll);
    
    // Current year for copyright
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // FAQ Toggle (if present)
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            }
        });
    }
});
