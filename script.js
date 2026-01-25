document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // NEW: Trigger Skill Bars Animation
                if (entry.target.id === 'experience') {
                    const bars = entry.target.querySelectorAll('.bar-fill');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }

                // NEW: Trigger Number Counter Animation (Fixes the "7" and adds "+" fade-in)
                if (entry.target.classList.contains('about-stats')) {
                    const counters = entry.target.querySelectorAll('.stat-num');
                    counters.forEach(counter => {
                        // Check if already animated to prevent looping
                        if (counter.classList.contains('done')) return;
                        
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // 2 seconds
                        const stepTime = 30;
                        const totalSteps = duration / stepTime;
                        const increment = target / totalSteps;
                        let currentCount = 0;

                        const updateCount = () => {
                            currentCount += increment;
                            if (currentCount < target) {
                                counter.innerText = Math.floor(currentCount);
                                setTimeout(updateCount, stepTime);
                            } else {
                                counter.innerText = target;
                                counter.classList.add('done');
                                // Find the '+' next to it and fade it in
                                const plus = counter.parentElement.querySelector('.stat-plus');
                                if (plus) plus.classList.add('visible');
                            }
                        };
                        updateCount();
                    });
                }
            }
        });
    }, observerOptions);

    // Ensure we observe the sections for the new animations
    document.querySelectorAll('.animate-on-scroll, #experience, .about-stats').forEach(el => {
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
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.addEventListener('click', () => {
        // Keeping your alert as requested
        alert("Mobile menu would open here.");
    });
});