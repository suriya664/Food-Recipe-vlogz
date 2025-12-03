// ============================================
// FOOD BLOG - MAIN JAVASCRIPT
// ============================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    });

    // Set active menu item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(form);
        });
    });

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterRecipes(this.dataset.filter);
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchRecipes(this.value);
        });
    }
});

// Form Validation Function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        const errorElement = input.parentElement.querySelector('.form-error');
        
        if (!input.value.trim()) {
            isValid = false;
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.classList.add('show');
            }
            input.style.borderColor = '#e74c3c';
        } else {
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            input.style.borderColor = '';
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.classList.add('show');
                }
                input.style.borderColor = '#e74c3c';
            }
        }
        
        // Password confirmation validation (for register page)
        if (input.id === 'register-confirm-password' && input.value) {
            const passwordInput = form.querySelector('#register-password');
            if (passwordInput && input.value !== passwordInput.value) {
                isValid = false;
                if (errorElement) {
                    errorElement.textContent = 'Passwords do not match';
                    errorElement.classList.add('show');
                }
                input.style.borderColor = '#e74c3c';
            }
        }
    });

    if (isValid) {
        showSuccessMessage(form);
        form.reset();
    }
}

// Show Success Message
function showSuccessMessage(form) {
    const successElement = form.querySelector('.form-success');
    if (successElement) {
        successElement.classList.add('show');
        successElement.textContent = 'Thank you! Your message has been sent successfully.';
        
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 5000);
    }
}

// Filter Recipes
function filterRecipes(filterType) {
    const recipeCards = document.querySelectorAll('.card');
    recipeCards.forEach(card => {
        const cardFilter = card.dataset.filter || '';
        if (filterType === 'all' || cardFilter.includes(filterType)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search Recipes
function searchRecipes(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    const recipeCards = document.querySelectorAll('.card');
    
    recipeCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const toggleText = document.getElementById('toggleText');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggleIcon) toggleIcon.textContent = '☀️';
        if (toggleText) toggleText.textContent = 'Light Mode';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                localStorage.setItem('theme', 'dark');
                if (toggleIcon) toggleIcon.textContent = '☀️';
                if (toggleText) toggleText.textContent = 'Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                if (toggleIcon) toggleIcon.textContent = '🌙';
                if (toggleText) toggleText.textContent = 'Dark Mode';
            }
        });
    }
});

