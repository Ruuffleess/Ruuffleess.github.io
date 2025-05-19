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
        // Verificar si hay un idioma guardado en localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            currentLanguage = savedLanguage;
            // Aplicar traducción al cargar
            translatePage(currentLanguage);
            // Actualizar texto del botón
            updateLanguageToggleText();
        }
        
        languageToggleButton.addEventListener('click', function() {
            // Cambiar de idioma
            if (currentLanguage === 'es') {
                currentLanguage = 'en';
            } else {
                currentLanguage = 'es';
            }
            
            // Guardar preferencia en localStorage
            localStorage.setItem('language', currentLanguage);
            
            // Traducir contenido
            translatePage(currentLanguage);
            
            // Actualizar texto del botón
            updateLanguageToggleText();
            
            // Mostrar mensaje de confirmación
            const message = currentLanguage === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
            showFlashMessage(message);
        });
    }
    
    /**
     * Actualizar el texto del botón de cambio de idioma
     */
    function updateLanguageToggleText() {
        const languageText = languageToggleButton.querySelector('span');
        if (currentLanguage === 'es') {
            languageText.textContent = 'English';
        } else {
            languageText.textContent = 'Español';
        }
    }
    
    /**
     * Traducir contenido de la página según el idioma seleccionado
     * @param {string} language - Idioma a aplicar ('es' o 'en')
     */
    function translatePage(language) {
        // Diccionario de traducciones
        const translations = {
            es: {
                // Navegación
                'nav-mascot': 'Mascota',
                'nav-about': 'Acerca de ODS 16',
                'nav-targets': 'Objetivos',
                'nav-blog': 'Blog',
                'nav-challenges': 'Retos',
                'nav-solutions': 'Soluciones',
                'nav-contact': 'Contáctanos',
                
                // Encabezado
                'header-title': 'Paz, Justicia e Instituciones Sólidas',
                'header-subtitle': 'Promoviendo sociedades pacíficas e inclusivas para el desarrollo sostenible',
                
                // Sección de mascota
                'mascot-title': 'Conoce a Nuestra Mascota',
                'mascot-desc': '¡Esta es nuestra mascota del ODS 16, ayudándonos a promover la paz y la justicia de una manera amigable!',
                
                // Sección Acerca de
                'about-title': 'Acerca de ODS 16',
                'about-p1': 'El Objetivo de Desarrollo Sostenible 16 busca promover sociedades pacíficas e inclusivas para el desarrollo sostenible, facilitar el acceso a la justicia para todos y construir instituciones eficaces, responsables e inclusivas a todos los niveles.',
                'about-p2': 'La paz, la justicia y las instituciones eficaces, responsables e inclusivas son fundamentales para el desarrollo sostenible. Varias regiones han disfrutado de mayores y sostenidos niveles de paz y seguridad en las últimas décadas. Pero muchos países todavía enfrentan violencia prolongada y conflictos armados, y demasiadas personas luchan como resultado de instituciones débiles y falta de acceso a la justicia, información y otras libertades fundamentales.',
                'peace-text': 'Paz',
                'justice-text': 'Justicia',
                
                // Sección de objetivos
                'targets-title': 'Objetivos Clave',
                'target1-title': 'Reducir la Violencia',
                'target1-desc': 'Reducir significativamente todas las formas de violencia y las correspondientes tasas de mortalidad en todo el mundo.',
                'target2-title': 'Acabar con el Abuso',
                'target2-desc': 'Poner fin al maltrato, la explotación, la trata y todas las formas de violencia contra los niños.',
                'target3-title': 'Promover el Estado de Derecho',
                'target3-desc': 'Promover el estado de derecho en los planos nacional e internacional y garantizar la igualdad de acceso a la justicia para todos.',
                
                // Sección de Blog
                'blog-title': 'Blog: Reflexiones sobre Corrupción',
                'blog-article-title': 'La Corrupción en Nuestra Vida Diaria: Impactos y Consecuencias',
                'blog-date': '15 de mayo de 2023',
                'blog-author': 'Equipo ODS 16',
                'blog-p1': 'La corrupción es a menudo percibida como un problema abstracto que solo afecta a altos niveles de gobierno o grandes corporaciones. Sin embargo, sus efectos se infiltran en nuestra vida cotidiana de formas que quizás no reconocemos inmediatamente.',
                'blog-subtitle1': '¿Cómo nos afecta la corrupción?',
                'blog-p2': 'Cuando los recursos públicos se desvían debido a la corrupción, se reduce la calidad y disponibilidad de servicios esenciales como educación, salud y seguridad. Un hospital con menos fondos de los asignados originalmente significa menos medicamentos, equipos desactualizados o insuficientes profesionales de la salud.',
                'blog-p3': 'En el ámbito económico, la corrupción distorsiona mercados, aumenta costos, y genera competencia desleal. Para las personas, esto se traduce en precios más altos, productos y servicios de menor calidad, y menos oportunidades laborales.',
                'blog-subtitle2': 'El ciclo de la desconfianza',
                'blog-p4': 'Quizás uno de los efectos más dañinos de la corrupción es la erosión de la confianza en las instituciones públicas. Cuando los ciudadanos perciben que sus gobiernos son corruptos, disminuye su disposición a cumplir con las leyes, pagar impuestos o participar en procesos democráticos.',
                'blog-p5': 'Este ciclo de desconfianza debilita el tejido social y puede conducir a inestabilidad política, dificultando aún más el desarrollo sostenible y la implementación de soluciones efectivas a problemas colectivos.',
                'blog-subtitle3': '¿Qué podemos hacer?',
                'blog-li1': 'Exigir transparencia y rendición de cuentas a nuestros gobiernos e instituciones.',
                'blog-li2': 'Denunciar actos de corrupción a través de canales oficiales.',
                'blog-li3': 'Educarnos sobre nuestros derechos y las leyes anticorrupción.',
                'blog-li4': 'Apoyar organizaciones que trabajan para combatir la corrupción.',
                'blog-li5': 'Promover una cultura de integridad en nuestros entornos personales y profesionales.',
                'blog-p6': 'La lucha contra la corrupción requiere el compromiso de toda la sociedad. Al entender cómo nos afecta directamente, podemos reconocer nuestra responsabilidad en combatirla y contribuir a construir instituciones más fuertes y sociedades más justas.',
                'blog-share': 'Compartir:',
                'blog-tag1': 'Corrupción',
                'blog-tag2': 'Transparencia',
                'blog-tag3': 'Justicia',
                'blog-tag4': 'ODS 16',
                'recent-articles': 'Artículos Recientes',
                'article1-title': 'Movimientos Ciudadanos Contra la Corrupción',
                'article1-desc': 'Cómo la acción colectiva está generando cambios significativos en la lucha contra la corrupción en diferentes partes del mundo.',
                'article2-title': 'Tecnología y Transparencia: Nuevas Herramientas',
                'article2-desc': 'El uso de blockchain y otras tecnologías para garantizar la transparencia y prevenir la corrupción en sistemas gubernamentales.',
                'read-more': 'Leer más',
                
                // Sección de retos
                'challenges-title': 'Retos Globales',
                'challenge1-title': 'Corrupción y Soborno:',
                'challenge1-desc': 'Estas prácticas socavan el estado de derecho y desvían recursos del desarrollo sostenible.',
                'challenge2-title': 'Violencia y Conflicto:',
                'challenge2-desc': 'Muchas regiones continúan sufriendo violencia armada, inseguridad y abusos contra los derechos humanos.',
                'challenge3-title': 'Instituciones Débiles:',
                'challenge3-desc': 'Las instituciones ineficaces, corruptas o sin rendición de cuentas no logran proporcionar servicios esenciales.',
                'challenge4-title': 'Falta de Acceso a la Justicia:',
                'challenge4-desc': 'Muchas personas en todo el mundo enfrentan obstáculos para acceder a los sistemas legales y recibir un trato justo.',
                'challenge5-title': 'Exclusión:',
                'challenge5-desc': 'Los grupos marginados a menudo carecen de representación y voz en la toma de decisiones.',
                'challenge6-title': 'Acceso Limitado a la Información:',
                'challenge6-desc': 'Las restricciones a la libertad de información obstaculizan la transparencia y la rendición de cuentas.',
                'graph-violence': 'Violencia',
                'graph-corruption': 'Corrupción',
                'graph-inequality': 'Desigualdad',
                
                // Sección de soluciones
                'solutions-title': 'Trabajando Hacia Soluciones',
                'solution1-title': 'Instituciones Inclusivas',
                'solution1-desc': 'Construir instituciones eficaces, responsables y transparentes a todos los niveles.',
                'solution2-title': 'Marcos Legales',
                'solution2-desc': 'Fortalecer los marcos legales y las políticas que apoyan los derechos humanos.',
                'solution3-title': 'Participación Pública',
                'solution3-desc': 'Garantizar una toma de decisiones receptiva, inclusiva, participativa y representativa.',
                'solution4-title': 'Transparencia',
                'solution4-desc': 'Mejorar el acceso a la información y promover la transparencia en la gobernanza.',
                'solution5-title': 'Alianzas',
                'solution5-desc': 'Fomentar la cooperación global para desarrollar capacidades para el desarrollo sostenible.',
                
                // Sección de contacto
                'contact-title': 'Contáctanos',
                'contact-address-title': 'Dirección',
                'contact-address': 'Av. Principal 123, Ciudad Ejemplo, País',
                'contact-email-title': 'Email',
                'contact-phone-title': 'Teléfono',
                'contact-form-name': 'Nombre',
                'contact-form-email': 'Email',
                'contact-form-message': 'Mensaje',
                'contact-form-submit': 'Enviar Mensaje',
                
                // Footer
                'footer-about-title': 'Sobre Nosotros',
                'footer-about': 'Trabajamos para promover sociedades pacíficas e inclusivas para el desarrollo sostenible, proporcionar acceso a la justicia para todos y construir instituciones efectivas, responsables e inclusivas a todos los niveles.',
                'footer-links-title': 'Enlaces Útiles',
                'footer-subscribe-title': 'Suscríbete',
                'footer-subscribe': 'Recibe nuestras actualizaciones y noticias sobre ODS 16.',
                'footer-email-placeholder': 'Tu email',
                'footer-copyright': '© 2023 ODS 16 - Paz, Justicia e Instituciones Sólidas. Todos los derechos reservados.',
                
                // Mensajes flash
                'contact-success': '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
                'contact-error-fields': 'Por favor, complete todos los campos.',
                'contact-error-email': 'Por favor, ingrese un correo electrónico válido.'
            },
            en: {
                // Navigation
                'nav-mascot': 'Mascot',
                'nav-about': 'About SDG 16',
                'nav-targets': 'Targets',
                'nav-blog': 'Blog',
                'nav-challenges': 'Challenges',
                'nav-solutions': 'Solutions',
                'nav-contact': 'Contact Us',
                
                // Header
                'header-title': 'Peace, Justice and Strong Institutions',
                'header-subtitle': 'Promoting peaceful and inclusive societies for sustainable development',
                
                // Mascot section
                'mascot-title': 'Meet Our Mascot',
                'mascot-desc': 'This is our SDG 16 mascot, helping us promote peace and justice in a friendly way!',
                
                // About section
                'about-title': 'About SDG 16',
                'about-p1': 'Sustainable Development Goal 16 seeks to promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels.',
                'about-p2': 'Peace, justice and effective, accountable and inclusive institutions are essential for sustainable development. Several regions have enjoyed increasing and sustained levels of peace and security in recent decades. But many countries still face protracted violence and armed conflict, and too many people struggle as a result of weak institutions and lack of access to justice, information and other fundamental freedoms.',
                'peace-text': 'Peace',
                'justice-text': 'Justice',
                
                // Targets section
                'targets-title': 'Key Targets',
                'target1-title': 'Reduce Violence',
                'target1-desc': 'Significantly reduce all forms of violence and related death rates everywhere.',
                'target2-title': 'End Abuse',
                'target2-desc': 'End abuse, exploitation, trafficking and all forms of violence against children.',
                'target3-title': 'Promote Rule of Law',
                'target3-desc': 'Promote the rule of law at the national and international levels and ensure equal access to justice for all.',
                
                // Blog section
                'blog-title': 'Blog: Reflections on Corruption',
                'blog-article-title': 'Corruption in Our Daily Lives: Impacts and Consequences',
                'blog-date': 'May 15, 2023',
                'blog-author': 'SDG 16 Team',
                'blog-p1': 'Corruption is often perceived as an abstract problem that only affects high levels of government or large corporations. However, its effects infiltrate our daily lives in ways we may not immediately recognize.',
                'blog-subtitle1': 'How does corruption affect us?',
                'blog-p2': 'When public resources are diverted due to corruption, the quality and availability of essential services such as education, health and security are reduced. A hospital with less funds than originally allocated means fewer medicines, outdated equipment or insufficient health professionals.',
                'blog-p3': 'In the economic sphere, corruption distorts markets, increases costs, and generates unfair competition. For individuals, this translates into higher prices, lower quality products and services, and fewer job opportunities.',
                'blog-subtitle2': 'The cycle of distrust',
                'blog-p4': 'Perhaps one of the most damaging effects of corruption is the erosion of trust in public institutions. When citizens perceive their governments as corrupt, their willingness to comply with laws, pay taxes or participate in democratic processes decreases.',
                'blog-p5': 'This cycle of distrust weakens the social fabric and can lead to political instability, further hindering sustainable development and the implementation of effective solutions to collective problems.',
                'blog-subtitle3': 'What can we do?',
                'blog-li1': 'Demand transparency and accountability from our governments and institutions.',
                'blog-li2': 'Report acts of corruption through official channels.',
                'blog-li3': 'Educate ourselves about our rights and anti-corruption laws.',
                'blog-li4': 'Support organizations working to combat corruption.',
                'blog-li5': 'Promote a culture of integrity in our personal and professional environments.',
                'blog-p6': 'The fight against corruption requires the commitment of the entire society. By understanding how it directly affects us, we can recognize our responsibility in combating it and contributing to building stronger institutions and more just societies.',
                'blog-share': 'Share:',
                'blog-tag1': 'Corruption',
                'blog-tag2': 'Transparency',
                'blog-tag3': 'Justice',
                'blog-tag4': 'SDG 16',
                'recent-articles': 'Recent Articles',
                'article1-title': 'Citizen Movements Against Corruption',
                'article1-desc': 'How collective action is generating significant changes in the fight against corruption in different parts of the world.',
                'article2-title': 'Technology and Transparency: New Tools',
                'article2-desc': 'The use of blockchain and other technologies to ensure transparency and prevent corruption in government systems.',
                'read-more': 'Read more',
                
                // Challenges section
                'challenges-title': 'Global Challenges',
                'challenge1-title': 'Corruption and Bribery:',
                'challenge1-desc': 'These practices undermine the rule of law and divert resources from sustainable development.',
                'challenge2-title': 'Violence and Conflict:',
                'challenge2-desc': 'Many regions continue to suffer from armed violence, insecurity and human rights abuses.',
                'challenge3-title': 'Weak Institutions:',
                'challenge3-desc': 'Ineffective, corrupt or unaccountable institutions fail to provide essential services.',
                'challenge4-title': 'Lack of Access to Justice:',
                'challenge4-desc': 'Many people around the world face obstacles to accessing legal systems and receiving fair treatment.',
                'challenge5-title': 'Exclusion:',
                'challenge5-desc': 'Marginalized groups often lack representation and voice in decision-making.',
                'challenge6-title': 'Limited Access to Information:',
                'challenge6-desc': 'Restrictions on freedom of information hamper transparency and accountability.',
                'graph-violence': 'Violence',
                'graph-corruption': 'Corruption',
                'graph-inequality': 'Inequality',
                
                // Solutions section
                'solutions-title': 'Working Towards Solutions',
                'solution1-title': 'Inclusive Institutions',
                'solution1-desc': 'Build effective, accountable and transparent institutions at all levels.',
                'solution2-title': 'Legal Frameworks',
                'solution2-desc': 'Strengthen legal frameworks and policies that support human rights.',
                'solution3-title': 'Public Participation',
                'solution3-desc': 'Ensure responsive, inclusive, participatory and representative decision-making.',
                'solution4-title': 'Transparency',
                'solution4-desc': 'Improve access to information and promote transparency in governance.',
                'solution5-title': 'Partnerships',
                'solution5-desc': 'Foster global cooperation to develop capabilities for sustainable development.',
                
                // Contact section
                'contact-title': 'Contact Us',
                'contact-address-title': 'Address',
                'contact-address': '123 Main St, Example City, Country',
                'contact-email-title': 'Email',
                'contact-phone-title': 'Phone',
                'contact-form-name': 'Name',
                'contact-form-email': 'Email',
                'contact-form-message': 'Message',
                'contact-form-submit': 'Send Message',
                
                // Footer
                'footer-about-title': 'About Us',
                'footer-about': 'We work to promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels.',
                'footer-links-title': 'Useful Links',
                'footer-subscribe-title': 'Subscribe',
                'footer-subscribe': 'Receive our updates and news about SDG 16.',
                'footer-email-placeholder': 'Your email',
                'footer-copyright': '© 2023 SDG 16 - Peace, Justice and Strong Institutions. All rights reserved.',
                
                // Flash messages
                'contact-success': 'Thank you for your message! We will get in touch with you soon.',
                'contact-error-fields': 'Please complete all fields.',
                'contact-error-email': 'Please enter a valid email address.'
            }
        };
        
        // Elementos a traducir con atributos data-translate
        const translatableElements = document.querySelectorAll('[data-translate]');
        
        // Crear atributos data-translate en elementos que no los tienen
        if (translatableElements.length === 0) {
            // Navegación
            document.querySelectorAll('.nav-link').forEach((link, index) => {
                const keys = ['nav-mascot', 'nav-about', 'nav-targets', 'nav-blog', 'nav-challenges', 'nav-solutions', 'nav-contact'];
                link.setAttribute('data-translate', keys[index]);
            });
            
            // Encabezado
            document.querySelector('.header-text h1').setAttribute('data-translate', 'header-title');
            document.querySelector('.header-text p').setAttribute('data-translate', 'header-subtitle');
            
            // Sección mascota
            document.querySelector('#mascot h2').setAttribute('data-translate', 'mascot-title');
            document.querySelector('#mascot p').setAttribute('data-translate', 'mascot-desc');
            
            // Sección acerca de
            document.querySelector('#about h2').setAttribute('data-translate', 'about-title');
            const aboutParagraphs = document.querySelectorAll('#about .text-content p');
            aboutParagraphs[0].setAttribute('data-translate', 'about-p1');
            aboutParagraphs[1].setAttribute('data-translate', 'about-p2');
            
            // SVG textos
            const svgTexts = document.querySelectorAll('#about svg text');
            svgTexts[0].setAttribute('data-translate', 'peace-text');
            svgTexts[1].setAttribute('data-translate', 'justice-text');
            
            // Sección de objetivos
            document.querySelector('#targets h2').setAttribute('data-translate', 'targets-title');
            const targetCards = document.querySelectorAll('#targets .card');
            targetCards.forEach((card, index) => {
                card.querySelector('h3').setAttribute('data-translate', `target${index+1}-title`);
                card.querySelector('p').setAttribute('data-translate', `target${index+1}-desc`);
            });
            
            // Sección de blog
            document.querySelector('#blog h2').setAttribute('data-translate', 'blog-title');
            document.querySelector('.blog-header h3').setAttribute('data-translate', 'blog-article-title');
            
            const blogContent = document.querySelector('.blog-content');
            blogContent.querySelector('p').setAttribute('data-translate', 'blog-p1');
            
            const blogSubtitles = blogContent.querySelectorAll('h4');
            blogSubtitles[0].setAttribute('data-translate', 'blog-subtitle1');
            blogSubtitles[1].setAttribute('data-translate', 'blog-subtitle2');
            blogSubtitles[2].setAttribute('data-translate', 'blog-subtitle3');
            
            const blogParagraphs = blogContent.querySelectorAll('p');
            blogParagraphs[1].setAttribute('data-translate', 'blog-p2');
            blogParagraphs[2].setAttribute('data-translate', 'blog-p3');
            blogParagraphs[3].setAttribute('data-translate', 'blog-p4');
            blogParagraphs[4].setAttribute('data-translate', 'blog-p5');
            blogParagraphs[5].setAttribute('data-translate', 'blog-p6');
            
            const blogListItems = blogContent.querySelectorAll('li');
            blogListItems.forEach((item, index) => {
                item.setAttribute('data-translate', `blog-li${index+1}`);
            });
            
            // Tags del blog
            const tags = document.querySelectorAll('.blog-tags .tag');
            tags.forEach((tag, index) => {
                tag.setAttribute('data-translate', `blog-tag${index+1}`);
            });
            
            // Compartir texto
            document.querySelector('.blog-share span').setAttribute('data-translate', 'blog-share');
            
            // Artículos recientes
            document.querySelector('.recent-articles h3').setAttribute('data-translate', 'recent-articles');
            
            const articleCards = document.querySelectorAll('.article-card');
            articleCards[0].querySelector('h4').setAttribute('data-translate', 'article1-title');
            articleCards[0].querySelector('p').setAttribute('data-translate', 'article1-desc');
            articleCards[1].querySelector('h4').setAttribute('data-translate', 'article2-title');
            articleCards[1].querySelector('p').setAttribute('data-translate', 'article2-desc');
            
            // Textos "Leer más"
            document.querySelectorAll('.read-more').forEach(link => {
                link.setAttribute('data-translate', 'read-more');
            });
            
            // Sección de retos
            document.querySelector('#challenges h2').setAttribute('data-translate', 'challenges-title');
            
            const challengeItems = document.querySelectorAll('.challenges-list li');
            challengeItems.forEach((item, index) => {
                item.querySelector('strong').setAttribute('data-translate', `challenge${index+1}-title`);
                const text = item.innerHTML.split('</strong> ')[1];
                const span = document.createElement('span');
                span.setAttribute('data-translate', `challenge${index+1}-desc`);
                span.textContent = text;
                item.innerHTML = item.innerHTML.split('</strong> ')[0] + '</strong> ';
                item.appendChild(span);
            });
            
            // Gráfico de retos
            const graphTexts = document.querySelectorAll('#challenges svg text');
            graphTexts[0].setAttribute('data-translate', 'graph-violence');
            graphTexts[1].setAttribute('data-translate', 'graph-corruption');
            graphTexts[2].setAttribute('data-translate', 'graph-inequality');
            
            // Sección de soluciones
            document.querySelector('#solutions h2').setAttribute('data-translate', 'solutions-title');
            
            const solutionItems = document.querySelectorAll('.timeline-item');
            solutionItems.forEach((item, index) => {
                item.querySelector('h3').setAttribute('data-translate', `solution${index+1}-title`);
                item.querySelector('p').setAttribute('data-translate', `solution${index+1}-desc`);
            });
            
            // Sección de contacto
            document.querySelector('#contact h2').setAttribute('data-translate', 'contact-title');
            
            const contactInfoItems = document.querySelectorAll('.info-item');
            contactInfoItems[0].querySelector('h3').setAttribute('data-translate', 'contact-address-title');
            contactInfoItems[0].querySelector('p').setAttribute('data-translate', 'contact-address');
            contactInfoItems[1].querySelector('h3').setAttribute('data-translate', 'contact-email-title');
            contactInfoItems[2].querySelector('h3').setAttribute('data-translate', 'contact-phone-title');
            
            // Formulario
            const formLabels = document.querySelectorAll('.form-group label');
            formLabels[0].setAttribute('data-translate', 'contact-form-name');
            formLabels[1].setAttribute('data-translate', 'contact-form-email');
            formLabels[2].setAttribute('data-translate', 'contact-form-message');
            
            document.querySelector('.contact-form button').setAttribute('data-translate', 'contact-form-submit');
            
            // Footer
            const footerSections = document.querySelectorAll('.footer-section');
            footerSections[0].querySelector('h3').setAttribute('data-translate', 'footer-about-title');
            footerSections[0].querySelector('p').setAttribute('data-translate', 'footer-about');
            footerSections[1].querySelector('h3').setAttribute('data-translate', 'footer-links-title');
            footerSections[2].querySelector('h3').setAttribute('data-translate', 'footer-subscribe-title');
            footerSections[2].querySelector('p').setAttribute('data-translate', 'footer-subscribe');
            
            // Placeholder email
            footerSections[2].querySelector('input').setAttribute('placeholder-translate', 'footer-email-placeholder');
            
            // Copyright
            document.querySelector('.footer-bottom p').setAttribute('data-translate', 'footer-copyright');
        }
        
        // Aplicar traducciones
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        
        // Aplicar traducciones a placeholders
        document.querySelectorAll('[placeholder-translate]').forEach(element => {
            const key = element.getAttribute('placeholder-translate');
            if (translations[language][key]) {
                element.setAttribute('placeholder', translations[language][key]);
            }
        });
        
        // Cambiar el atributo lang del documento
        document.documentElement.lang = language;
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
                    const errorMessage = currentLanguage === 'es' ? 
                        'Por favor, complete todos los campos.' : 
                        'Please complete all fields.';
                    showFlashMessage(errorMessage, 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    const errorMessage = currentLanguage === 'es' ? 
                        'Por favor, ingrese un correo electrónico válido.' : 
                        'Please enter a valid email address.';
                    showFlashMessage(errorMessage, 'error');
                    return;
                }
                
                // En un sitio real, aquí enviaríamos los datos al servidor
                // Para esta versión simplificada, solo mostramos un mensaje de éxito
                const successMessage = currentLanguage === 'es' ? 
                    '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.' : 
                    'Thank you for your message! We will get in touch with you soon.';
                showFlashMessage(successMessage);
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
                    // Ajustar el desplazamiento para tener en cuenta la barra de navegación
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
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
