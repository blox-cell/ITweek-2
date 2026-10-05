document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const scrollTopBtn = document.getElementById('scrollTop');
    const contactForm = document.getElementById('contactForm');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillsSection = document.getElementById('skills');

    // --- Mobile menu ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Navbar shadow on scroll ---
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        }
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
    });

    // --- Scroll to top ---
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function getHash(link) {
        return link.getAttribute('href').split('#')[1] || '';
    }

    function isSamePage(link) {
        const href = link.getAttribute('href');
        if (!href.includes('#')) return href === currentPage;
        return href.split('#')[0] === currentPage;
    }

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');

            if (current && getHash(item) === current) {
                item.classList.add('active');
            } else if (!current && !getHash(item) && isSamePage(item)) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // --- Project filters ---
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Skill bar animation on scroll ---
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated || !skillsSection || skillFills.length === 0) return;

        const rect = skillsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.8) {
            skillsAnimated = true;
            skillFills.forEach(fill => {
                fill.style.width = fill.dataset.width + '%';
            });
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // --- Contact form ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');

            contactForm.innerHTML = `
                <div class="form-success">
                    Bedankt ${name}! Je bericht is verzonden.
                </div>
            `;
        });
    }

    // --- Fade in animation on scroll ---
    const fadeElements = document.querySelectorAll(
        '.project-card, .skill-card, .about-content, .contact-content'
    );

    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });
    }

});
