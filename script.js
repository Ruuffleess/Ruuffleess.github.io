/**
 * SDG 16 Website - Main JavaScript File
 * 
 * Este archivo contiene todas las funcionalidades interactivas para el sitio web de SDG 16.
 * Incluye funciones para:
 * - Cambiar entre temas claro y oscuro
 * - Cambiar el idioma
 * - Animaciones de desplazamiento
 * - Manejo del formulario de contacto
 * - Mensajes flash
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM que utilizaremos
    const body = document.body;
    const toggleThemeButton = document.querySelector('.toggle-theme');
    const languageToggleButton = document.querySelector('.language-toggle');
    const fadeElements = document.querySelectorAll('.fade-in');
    const contactForm = document.getElementById('contact-form');
    const flashMessages = document.getElementById('flash-messages');
    
    // Variables para almacenar preferencias de usuario
    let currentLanguage = 'es'; // Idioma predeterminado: Español
    let currentTheme = localStorage.getItem('theme') || 'light'; // Tema predeterminado: Claro
    
    /**
     * Cambiar entre temas claro y oscuro
     */
    function initThemeToggle() {
        // Aplicar tema guardado al cargar la página
        body.classList.add(currentTheme);
        updateThemeToggleText();
        
        // Agregar event listener para el botón de cambio de tema
        toggleThemeButton.addEventListener('click', function() {
            if (body.classList.contains('light')) {
                body.classList.replace('light', 'dark');
                currentTheme = 'dark';
            } else {
                body.classList.replace('dark', 'light');
                currentTheme = 'light';
            }
            
            // Guardar preferencia en localStorage
            localStorage.setItem('theme', currentTheme);
            updateThemeToggleText();
        });
    }
    
    /**
     * Actualizar el texto del botón de cambio de tema según el tema actual
     */
    function updateThemeToggleText() {
        const toggleText = toggleThemeButton.querySelector('.toggle-text');
        if (currentTheme === 'light') {
            toggleText.textContent = 'Modo oscuro';
        } else {
            toggleText.textContent = 'Modo claro';
        }
    }
    
    /**
     * Implementar cambio de idioma
     */
    function initLanguageToggle() {
        languageToggleButton.addEventListener('click', function() {
            // En un sitio real, esto redireccionaría a la versión en inglés o español
            // Para esta versión simplificada, solo cambiamos el texto del botón
            if (currentLanguage === 'es') {
                languageToggleButton.querySelector('span').textContent = 'Español';
                currentLanguage = 'en';
                showFlashMessage('Language changed to English');
            } else {
                languageToggleButton.querySelector('span').textContent = 'English';
                currentLanguage = 'es';
                showFlashMessage('Idioma cambiado a Español');
            }
        });
    }
    
    /**
     * Animaciones de aparición al hacer scroll
     */
    function initScrollAnimations() {
        // Función para verificar si un elemento es visible en la ventana
        function checkVisibility() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Comprobar visibilidad inicialmente y al hacer scroll
        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
    }
    
    /**
     * Manejar el envío del formulario de contacto
     */
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener valores del formulario
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Validaciones básicas
                if (!name || !email || !message) {
                    showFlashMessage('Por favor, complete todos los campos.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showFlashMessage('Por favor, ingrese un correo electrónico válido.', 'error');
                    return;
                }
                
                // En un sitio real, aquí enviaríamos los datos al servidor
                // Para esta versión simplificada, solo mostramos un mensaje de éxito
                showFlashMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            });
        }
    }
    
    /**
     * Validar formato de email
     * @param {string} email - Dirección de correo electrónico a validar
     * @returns {boolean} - Verdadero si el email es válido
     */
    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
    
    /**
     * Mostrar mensaje flash
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de mensaje (success, error, etc.)
     */
    function showFlashMessage(message, type = 'success') {
        if (!flashMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        flashMessages.appendChild(messageElement);
        
        // Desplazarse hasta el mensaje
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Eliminar el mensaje después de 5 segundos
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                flashMessages.removeChild(messageElement);
            }, 500);
        }, 5000);
    }
    
    /**
     * Inicializar navegación suave al hacer clic en enlaces de anclaje
     */
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Offset para la barra de navegación
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Inicializar todas las funcionalidades
    initThemeToggle();
    initLanguageToggle();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    
    // Para desarrollo y depuración
    console.log('SDG 16 Website - JavaScript initialized successfully');
});