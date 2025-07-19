// You can keep this file empty if you don't need any JavaScript functionality
// Or add any specific functionality for this page if needed

// Example: If you want to add smooth scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});