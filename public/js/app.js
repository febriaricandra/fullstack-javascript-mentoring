import { router } from './router.js';

// Handle navigation
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router(url);
};

// Handle link clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigateTo(e.target.getAttribute('href'));
    }
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    router(location.pathname);
});

// Initial load
router(location.pathname);