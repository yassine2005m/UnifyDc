// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Manage header border-bottom on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle Logic
    const toggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const closeBtn = document.getElementById('mobile-menu-close');
        
    if (toggle && overlay) {
        const closeMenu = () => {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', () => {
            const isActive = toggle.classList.toggle('active');
            overlay.classList.toggle('active');
            
            if (isActive) {
                gsap.fromTo(mobileLinks, 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
                );
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        const allMobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-sub-links a');
        
        allMobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // SCC-Style Search Toggle
        const searchToggle = document.getElementById('search-toggle');
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('site-search-input');
        const searchIcon = searchToggle?.querySelector('.search-icon');
        const closeIcon = searchToggle?.querySelector('.close-icon');

        if (searchToggle && searchOverlay) {
            searchToggle.addEventListener('click', () => {
                const isActive = searchOverlay.classList.toggle('active');
                
                if (isActive) {
                    searchIcon.style.display = 'none';
                    closeIcon.style.display = 'block';
                    setTimeout(() => searchInput.focus(), 300);
                } else {
                    searchIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            });

            // Close search on escape
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                    searchToggle.click();
                }
            });
        }

        // Functional Search logic
        const searchSubmitBtn = document.querySelector('.search-submit-btn');
        if (searchSubmitBtn && searchInput) {
            const performSearch = () => {
                const query = searchInput.value.trim().toLowerCase();
                if (!query) return;

                const sections = document.querySelectorAll('section');
                let found = false;

                sections.forEach(section => {
                    if (found) return;
                    const text = section.innerText.toLowerCase();
                    if (text.includes(query)) {
                        searchToggle.click(); // Close search
                        section.scrollIntoView({ behavior: 'smooth' });
                        
                        // Highlight effect
                        section.classList.add('search-highlight');
                        setTimeout(() => section.classList.remove('search-highlight'), 2000);
                        found = true;
                    }
                });
            };

            searchSubmitBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }

    // 2. Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

  

    // 4. Hero Section Animation (Cinematic Entry)
    const heroWords = document.querySelectorAll('.hero-word');
    const heroSubtext = document.querySelector('.hero-subtext');
    const heroBtns = document.querySelectorAll('.hero-btn');
    
    // Initial state for hero
    gsap.set(heroWords, { y: 60, opacity: 0, rotationX: -20 });
    gsap.set(heroSubtext, { y: 30, opacity: 0 });
    gsap.set(heroBtns, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.to(heroWords, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.4,
        stagger: 0.15,
        delay: 0.2
    })
    .to(heroSubtext, {
        y: 0,
        opacity: 0.9,
        duration: 1.2,
    }, "-=0.8")
    .to(heroBtns, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
    }, "-=0.8");

    // 5. Scroll Animations throughout the entire site
    
    // a. Section Titles and Descriptions
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
        const tag = sec.querySelector('.section-tag-blue, .section-tag');
        const title = sec.querySelector('.huge-text, .med-text');
        const desc = sec.querySelector('.desc-text');
        
        const secTl = gsap.timeline({
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        if (tag) {
            gsap.set(tag, { y: 20, opacity: 0 });
            secTl.to(tag, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
        if (title) {
            gsap.set(title, { y: 30, opacity: 0 });
            secTl.to(title, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, "-=0.5");
        }
        if (desc) {
            gsap.set(desc, { y: 20, opacity: 0 });
            secTl.to(desc, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.7");
        }
    });

    // b. Lists items stagger (Services, Valeurs)
    const lists = document.querySelectorAll('.minimal-list, .clean-bullet-list');
    lists.forEach(list => {
        const items = list.children;
        gsap.set(items, { y: 40, opacity: 0 });
        
        gsap.to(items, {
            scrollTrigger: {
                trigger: list,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15
        });
    });

    // c. Image reveals
    const imageHalves = document.querySelectorAll('.image-half');
    imageHalves.forEach(imgHalf => {
        const img = imgHalf.querySelector('img');
        const overlay = imgHalf.querySelector('.ambition-overlay');
        
        if (img) {
            gsap.set(img, { scale: 1.05, opacity: 0, filter: 'blur(10px)' });
            gsap.to(img, {
                scrollTrigger: {
                    trigger: imgHalf,
                    start: "top 80%",
                },
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power3.out'
            });
        }
        
        if (overlay) {
            gsap.set(overlay, { x: -30, opacity: 0 });
            gsap.to(overlay, {
                scrollTrigger: {
                    trigger: imgHalf,
                    start: "top 70%",
                },
                x: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.4,
                ease: 'power3.out'
            });
        }
    });

    // d. Badges animation (Pour Qui)
    const badges = document.querySelectorAll('.badge');
    if (badges.length > 0) {
        gsap.set(badges, { scale: 0.8, opacity: 0, y: 20 });
        gsap.to(badges, {
            scrollTrigger: {
                trigger: '.badges-row',
                start: "top 85%",
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
            stagger: 0.15
        });
    }
});
