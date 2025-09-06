// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function toggleMenu() {
    const isExpanded = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
}

function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

// Toggle menu on button click
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMenu();
    }
});

// Close menu on scroll down (mobile only)
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Only apply scroll behavior on mobile (when menu toggle is visible)
    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - close menu
            closeMenu();
        }
    }
    lastScrollY = currentScrollY;
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const themeLabel = document.getElementById('themeLabel');
const themeLabelMobile = document.getElementById('themeLabelMobile');
const THEME_KEY = 'cafelab_theme';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('theme-dark');
        if (themeLabel) themeLabel.textContent = 'Dark Mode';
        if (themeLabelMobile) themeLabelMobile.textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('theme-dark');
        if (themeLabel) themeLabel.textContent = 'Light Mode';
        if (themeLabelMobile) themeLabelMobile.textContent = 'Light Mode';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    applyTheme(isDark ? 'dark' : 'light');
}

// Initialize theme from storage or prefers-color-scheme
const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme) {
    applyTheme(storedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

// Add event listeners to both theme buttons
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
}

// Login button functionality
const loginBtn = document.getElementById('loginBtn');
const loginPopup = document.getElementById('loginPopup');
const loginClose = document.getElementById('loginClose');
const loginForm = document.getElementById('loginForm');

// Show login popup
function showLoginPopup() {
    if (loginPopup) {
        loginPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Hide login popup
function hideLoginPopup() {
    if (loginPopup) {
        loginPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Login button click
if (loginBtn) {
    loginBtn.addEventListener('click', showLoginPopup);
}

// Close login popup
if (loginClose) {
    loginClose.addEventListener('click', hideLoginPopup);
}

// Close login popup when clicking outside
if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
        if (e.target === loginPopup) {
            hideLoginPopup();
        }
    });
}

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Show loading state
        const submitButton = loginForm.querySelector('.login-submit-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Logging in...';
        submitButton.disabled = true;
        
        // Simulate login process
        setTimeout(() => {
            // Show success message
            alert(`🎉 Login successful!\n\nEmail: ${email}\nRemember me: ${rememberMe ? 'Yes' : 'No'}\n\nWelcome to Café Lab!`);
            
            // Reset form
            loginForm.reset();
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Close popup
            hideLoginPopup();
            
            // Log login data (for development)
            console.log('Login attempt:', {
                email: email,
                rememberMe: rememberMe
            });
        }, 1500);
    });
}

// Social login buttons
const googleBtn = document.querySelector('.google-btn');
const facebookBtn = document.querySelector('.facebook-btn');

if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        alert('🔗 Google login would be implemented here!\n\nThis would integrate with:\n- Google OAuth API\n- User authentication\n- Account creation/linking');
    });
}

if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
        alert('🔗 Facebook login would be implemented here!\n\nThis would integrate with:\n- Facebook Login API\n- User authentication\n- Account creation/linking');
    });
}

// Sign up link
const signupLink = document.getElementById('signupLink');
if (signupLink) {
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📝 Sign up functionality would be implemented here!\n\nThis could:\n- Open a registration form\n- Redirect to signup page\n- Show registration modal');
    });
}

// Offers popup functionality
const offersPopup = document.getElementById('offersPopup');
const popupClose = document.getElementById('popupClose');
const claimOffer = document.getElementById('claimOffer');

// Show offers popup (can be triggered by various events)
function showOffersPopup() {
    if (offersPopup) {
        offersPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Hide offers popup
function hideOffersPopup() {
    if (offersPopup) {
        offersPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close popup when clicking close button
if (popupClose) {
    popupClose.addEventListener('click', hideOffersPopup);
}

// Close popup when clicking outside
if (offersPopup) {
    offersPopup.addEventListener('click', (e) => {
        if (e.target === offersPopup) {
            hideOffersPopup();
        }
    });
}

// Claim offer button
if (claimOffer) {
    claimOffer.addEventListener('click', () => {
        alert('🎉 Offers claimed!\n\nYour offers have been saved to your account.\nShow this message at checkout to redeem your discounts.');
        hideOffersPopup();
    });
}

// Show offers popup on page load (after 2 seconds)
setTimeout(() => {
    showOffersPopup();
}, 2000);

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && offersPopup && offersPopup.classList.contains('active')) {
        hideOffersPopup();
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userMessage = document.getElementById('userMessage').value;
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        // Show success message
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Log form data (for development)
        console.log('Form submitted:', {
            name: userName,
            email: userEmail,
            message: userMessage
        });
    }, 1000);
});

// Simple gallery lightbox
const galleryImages = document.querySelectorAll('.gallery-img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 2000;
        const imgClone = document.createElement('img');
        imgClone.src = img.src;
        imgClone.style.maxWidth = '90vw';
        imgClone.style.maxHeight = '80vh';
        imgClone.style.borderRadius = '10px';
        overlay.appendChild(imgClone);
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        document.body.appendChild(overlay);
    });
}); 

// Rating widget
const ratingWidget = document.getElementById('ratingWidget');
const ratingMessage = document.getElementById('ratingMessage');
if (ratingWidget) {
    const stars = Array.from(ratingWidget.querySelectorAll('.star'));
    const STORAGE_KEY = 'cafelab_user_rating';
    const STATS_KEY = 'cafelab_rating_stats';

    // Initialize rating statistics
    function initializeStats() {
        const stats = JSON.parse(localStorage.getItem(STATS_KEY) || '{"1":0,"2":0,"3":0,"4":0,"5":0}');
        updateStatsDisplay(stats);
        return stats;
    }

    // Update statistics display
    function updateStatsDisplay(stats) {
        const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
        
        // Update counts
        for (let i = 1; i <= 5; i++) {
            const countElement = document.getElementById(`count${i}`);
            const progressElement = document.getElementById(`progress${i}`);
            if (countElement && progressElement) {
                countElement.textContent = stats[i] || 0;
                const percentage = total > 0 ? ((stats[i] || 0) / total) * 100 : 0;
                progressElement.style.width = `${percentage}%`;
            }
        }
        
        // Update total reviews
        const totalElement = document.getElementById('totalReviews');
        if (totalElement) {
            totalElement.textContent = total;
        }
    }

    // Add a rating to statistics
    function addRatingToStats(rating) {
        const stats = JSON.parse(localStorage.getItem(STATS_KEY) || '{"1":0,"2":0,"3":0,"4":0,"5":0}');
        stats[rating] = (stats[rating] || 0) + 1;
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        updateStatsDisplay(stats);
    }

    function setSelected(rating) {
        stars.forEach((star, idx) => {
            const isActive = idx < rating;
            star.classList.toggle('selected', isActive);
            star.setAttribute('aria-checked', isActive && idx === rating - 1 ? 'true' : 'false');
        });
        if (ratingMessage) {
            ratingMessage.textContent = rating ? `Thanks! You rated us ${rating}/5.` : 'Tap a star to rate your experience.';
        }
    }

    // Load saved rating and initialize stats
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if (!Number.isNaN(saved) && saved > 0) {
        setSelected(saved);
    }
    initializeStats();

    // Hover preview
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => s.classList.toggle('hovered', i <= index));
        });
        star.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hovered'));
        });
        star.addEventListener('click', () => {
            const value = index + 1;
            localStorage.setItem(STORAGE_KEY, String(value));
            setSelected(value);
            addRatingToStats(value);
        });
        // Keyboard support
        star.addEventListener('keydown', (e) => {
            const key = e.key;
            const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10) || 0;
            if (key === 'ArrowRight' || key === 'ArrowUp') {
                e.preventDefault();
                const next = Math.min(5, current + 1 || index + 1);
                localStorage.setItem(STORAGE_KEY, String(next));
                setSelected(next);
                stars[Math.max(0, next - 1)].focus();
            } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
                e.preventDefault();
                const prev = Math.max(1, current - 1 || index + 1);
                localStorage.setItem(STORAGE_KEY, String(prev));
                setSelected(prev);
                stars[Math.max(0, prev - 1)].focus();
            } else if (key === 'Enter' || key === ' ') {
                e.preventDefault();
                const value = index + 1;
                localStorage.setItem(STORAGE_KEY, String(value));
                setSelected(value);
                addRatingToStats(value);
            }
        });
        // Make buttons focusable in all browsers
        star.setAttribute('tabindex', '0');
    });
}