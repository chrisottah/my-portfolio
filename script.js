document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Hero Text Reveal ---
    setTimeout(() => {
        document.querySelector('.reveal').style.opacity = '1';
        document.querySelectorAll('.reveal-delay').forEach(el => {
            el.style.opacity = '1';
        });
    }, 500);

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple UI feedback
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Simulate API Call
        setTimeout(() => {
            submitBtn.innerText = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            
            formStatus.innerText = "Thank you! Your message has been sent.";
            formStatus.style.color = "#00ff00";
            
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.innerText = "";
            }, 5000);
        }, 1500);
    });

    // --- Mobile Menu Placeholder ---
    // (In a real scenario, you'd toggle a 'show' class on .nav-links)
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.addEventListener('click', () => {
        alert("Mobile menu would open here.");
    });
});