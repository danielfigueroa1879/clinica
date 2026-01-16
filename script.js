/**
 * ============================================
 * CLÍNICA DE CARABINEROS - JAVASCRIPT
 * Archivo: script.js
 * Versión: 1.0
 * ============================================
 */

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Clínica de Carabineros - Sistema cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavigation();
    initScrollToTop();
});

// ===== ANIMACIONES AL HACER SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NAVEGACIÓN ACTIVA =====
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== BOTÓN SCROLL TO TOP =====
function initScrollToTop() {
    // Crear botón scroll to top
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollButton);

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll al hacer click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CONTADOR DE VISITAS (LocalStorage) =====
function trackVisits() {
    let visits = localStorage.getItem('clinica_visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('clinica_visits', visits);
    console.log(`Visita número: ${visits}`);
}

// Opcional: Llamar la función de visitas
trackVisits();

// ===== VALIDACIÓN DE FORMULARIOS (Para futuras implementaciones) =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                showError(input, 'Este campo es obligatorio');
            } else {
                input.classList.remove('error');
                removeError(input);
            }
        });

        if (isValid) {
            console.log('Formulario válido - Listo para enviar');
            // Aquí se procesaría el envío del formulario
        }
    });
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!input.nextElementSibling?.classList.contains('error-message')) {
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
}

function removeError(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage?.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

// ===== MANEJO DE CARGA DE PÁGINA =====
window.addEventListener('load', function() {
    // Ocultar loader si existe
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 500);
    }
});

// ===== PREVENCIÓN DE SCROLL HORIZONTAL =====
window.addEventListener('resize', function() {
    if (window.innerWidth !== document.documentElement.clientWidth) {
        document.documentElement.style.overflowX = 'hidden';
    }
});

// ===== DETECCIÓN DE DISPOSITIVO MÓVIL =====
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
    console.log('Dispositivo móvil detectado');
}

// ===== ANIMACIÓN DE TARJETAS DE ESPECIALIDADES =====
function initSpecialtyCardsAnimation() {
    const cards = document.querySelectorAll('.specialty-card');
    
    cards.forEach((card, index) => {
        // Añadir delay progresivo
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar animaciones de tarjetas cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpecialtyCardsAnimation);
} else {
    initSpecialtyCardsAnimation();
}

// ===== SISTEMA DE NOTIFICACIONES (Para futuras implementaciones) =====
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        this.container.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// Instancia global del sistema de notificaciones
window.notify = new NotificationSystem();

// ===== MANEJO DE ERRORES GLOBAL =====
window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.message);
    // Aquí se podría enviar a un sistema de logging
});

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('Performance entry:', entry.name, entry.duration);
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['navigation', 'paint'] });
    } catch (e) {
        console.log('Performance Observer no soportado');
    }
}

// ===== ACCESIBILIDAD: MANEJO DE TECLADO =====
document.addEventListener('keydown', function(e) {
    // ESC para cerrar modales (implementación futura)
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    // Tab trapping para modales (implementación futura)
    if (e.key === 'Tab') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            // Lógica de tab trapping
        }
    }
});

// ===== DEBUG MODE =====
const DEBUG = false; // Cambiar a true para activar modo debug

if (DEBUG) {
    console.log('=== MODO DEBUG ACTIVADO ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('Scroll Y:', window.scrollY);
    
    window.addEventListener('scroll', () => {
        console.log('Scroll position:', window.scrollY);
    });
}

// ===== EXPORTAR FUNCIONES PARA USO EXTERNO =====
window.ClinicaCarabineros = {
    notify: (message, type, duration) => window.notify.show(message, type, duration),
    isMobile: isMobileDevice,
    scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' })
};

console.log('✅ Sistema de Clínica de Carabineros inicializado correctamente');
