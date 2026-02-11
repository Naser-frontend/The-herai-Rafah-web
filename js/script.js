// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual public key
})();

// Contact form handling with real email sending
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'در حال ارسال...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'naserahmad13.mohammady@gmail.com'
        };
        
        // Simple validation
        if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
            alert('لطفاً تمام فیلدها را پر کنید');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                // Fallback: Try using Formspree as backup
                sendViaFormspree(templateParams);
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Backup method using Formspree
function sendViaFormspree(data) {
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.from_name,
            email: data.from_email,
            subject: data.subject,
            message: data.message
        })
    })
    .then(response => {
        if (response.ok) {
            alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
            contactForm.reset();
        } else {
            alert('خطا در ارسال پیام. لطفاً مجدداً تلاش کنید یا مستقیماً با ما تماس بگیرید.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('خطا در ارسال پیام. لطفاً مجدداً تلاش کنید یا مستقیماً با ما تماس بگیرید.');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        let target = 0;
        let suffix = '';
        
        // Extract number and suffix from Persian text
        if (originalText.includes('۵۰')) {
            target = 50;
            suffix = '+';
        } else if (originalText.includes('۹۸')) {
            target = 98;
            suffix = '%';
        } else if (originalText.includes('۵')) {
            target = 5;
            suffix = '+';
        }
        
        if (target > 0) {
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    const currentValue = Math.ceil(current);
                    // Convert to Persian numbers
                    const persianNumber = currentValue.toString()
                        .replace(/0/g, '۰')
                        .replace(/1/g, '۱')
                        .replace(/2/g, '۲')
                        .replace(/3/g, '۳')
                        .replace(/4/g, '۴')
                        .replace(/5/g, '۵')
                        .replace(/6/g, '۶')
                        .replace(/7/g, '۷')
                        .replace(/8/g, '۸')
                        .replace(/9/g, '۹');
                    
                    counter.textContent = persianNumber + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final value in Persian
                    const finalPersianNumber = target.toString()
                        .replace(/0/g, '۰')
                        .replace(/1/g, '۱')
                        .replace(/2/g, '۲')
                        .replace(/3/g, '۳')
                        .replace(/4/g, '۴')
                        .replace(/5/g, '۵')
                        .replace(/6/g, '۶')
                        .replace(/7/g, '۷')
                        .replace(/8/g, '۸')
                        .replace(/9/g, '۹');
                    
                    counter.textContent = finalPersianNumber + suffix;
                }
            };
            
            updateCounter();
        }
    });
};

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize
document.body.style.opacity = '0';