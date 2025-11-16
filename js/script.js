// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del hamburger
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
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

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Crear el mensaje de WhatsApp
    const whatsappNumber = '5214443002373'; // Formato internacional
    const whatsappMessage = `¡Hola! Me gustaría solicitar información sobre sus servicios.%0A%0A` +
                           `*Nombre:* ${nombre}%0A` +
                           `*Email:* ${email}%0A` +
                           `*Teléfono:* ${telefono}%0A` +
                           `*Servicio de interés:* ${servicio}%0A` +
                           `*Mensaje:* ${mensaje}`;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    // Mostrar mensaje de confirmación
    alert('¡Gracias por tu interés! Serás redirigido a WhatsApp.');
    
    // Limpiar el formulario
    contactForm.reset();
});

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar las tarjetas de servicio
document.querySelectorAll('.servicio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observar las tarjetas de info
document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== CONTADOR DE STATS (opcional) =====
const animateStats = () => {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = stat.innerText;
        const isNumber = !isNaN(parseInt(target));
        
        if (isNumber) {
            const targetNumber = parseInt(target);
            let current = 0;
            const increment = targetNumber / 50;
            
            const updateCounter = () => {
                current += increment;
                if (current < targetNumber) {
                    stat.innerText = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            
            updateCounter();
        }
    });
};

// Observar la sección de nosotros para animar stats
const nosotrosSection = document.querySelector('.nosotros');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (nosotrosSection) {
    statsObserver.observe(nosotrosSection);
}

// ===== PARTÍCULAS EN EL FONDO (OPCIONAL) =====
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    hero.insertBefore(particlesContainer, hero.firstChild);
}

// Agregar keyframes para la animación float
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -10px);
        }
        50% {
            transform: translate(-5px, 5px);
        }
        75% {
            transform: translate(5px, 10px);
        }
    }
`;
document.head.appendChild(style);

// Ejecutar al cargar la página
window.addEventListener('load', () => {
    createParticles();
});

// ===== VALIDACIÓN DE EMAIL =====
document.getElementById('email').addEventListener('blur', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.value) && this.value !== '') {
        this.style.borderColor = '#ff4444';
    } else {
        this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
    }
});

// ===== VALIDACIÓN DE TELÉFONO =====
document.getElementById('telefono').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

console.log('🚀 CYBERNETIX - Digital Connectivity & Defense');
console.log('💻 Website loaded successfully!');