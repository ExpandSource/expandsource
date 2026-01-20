/**
 * Navigation Menu Handler
 * Handles hamburger menu toggle and mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const body = document.body;

    // Toggle hamburger menu
    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
                // Set active link
                setActiveLink(link.href);
            });
        });

        // Close menu when clicking outside the menu
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                closeMenu();
            }
        });

        // Set active links on page load
        setActiveLink(window.location.href);
    }

    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        hamburger.classList.add('active');
        mobileOverlay.classList.add('active');
        body.classList.add('no-scroll');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    function setActiveLink(currentUrl) {
        // Get all navigation links (both desktop and mobile)
        const allLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            const linkUrl = new URL(href, window.location.origin);
            const currentPath = new URL(currentUrl, window.location.origin);

            // Check if this link matches the current page
            if (linkUrl.pathname === currentPath.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
