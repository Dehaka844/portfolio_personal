// ============================================
// CONFIGURACIÓN DE VELOCIDAD DE ESTRELLAS
// ============================================
// MODIFICA ESTA VARIABLE PARA CAMBIAR LA VELOCIDAD
// Valores recomendados: 0.1 (muy lento) a 2.0 (rápido)
const STAR_SPEED = 2;

// ============================================
// ANIMACIÓN DE ESTRELLAS
// ============================================

class StarryBackground {
    constructor() {
        this.canvas = document.getElementById('starry-background');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.animationFrame = null;

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.createStars();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        const starCount = Math.floor((this.canvas.width * this.canvas.height) / 3000);

        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * STAR_SPEED,
                speedY: (Math.random() - 0.5) * STAR_SPEED,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    animate() {
        // Limpiar canvas
        this.ctx.fillStyle = '#050814';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar y actualizar estrellas
        this.stars.forEach(star => {
            // Actualizar posición
            star.x += star.speedX;
            star.y += star.speedY;

            // Wrap around (cuando salen por un borde, aparecen por el opuesto)
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;

            // Dibujar estrella
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fill();

            // Añadir brillo sutil para estrellas más grandes
            if (star.size > 1.5) {
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(147, 197, 253, ${star.opacity * 0.2})`;
                this.ctx.fill();
            }
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// NAVEGACIÓN DEL HEADER
// ============================================

class Navigation {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.init();
    }

    init() {
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }

    handleNavClick(e) {
        const clickedButton = e.currentTarget;
        
        // Remover clase active de todos los botones
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Añadir clase active al botón clickeado
        clickedButton.classList.add('active');

        // Aquí puedes añadir lógica adicional para cambiar de sección
        const section = clickedButton.dataset.section;
        console.log(`Navegando a sección: ${section}`);
    }
}

// ============================================
// MENÚ HAMBURGUESA Y PANEL DE LENGUAJES
// ============================================

class LanguageMenu {
    constructor() {
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.closeBtn = document.getElementById('close-panel');
        this.overlay = document.getElementById('overlay');
        this.panel = document.getElementById('language-panel');
        this.languageButtons = document.querySelectorAll('.language-btn');
        this.selectedLanguage = 'php'; // Lenguaje por defecto

        this.init();
    }

    init() {
        // Event listeners para abrir/cerrar panel
        this.hamburgerBtn.addEventListener('click', () => this.openPanel());
        this.closeBtn.addEventListener('click', () => this.closePanel());
        this.overlay.addEventListener('click', () => this.closePanel());

        // Event listeners para selección de lenguaje
        this.languageButtons.forEach(button => {
            button.addEventListener('click', (e) => this.selectLanguage(e));
        });

        // Cerrar panel con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.panel.classList.contains('active')) {
                this.closePanel();
            }
        });
    }

    openPanel() {
        this.panel.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePanel() {
        this.panel.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    selectLanguage(e) {
        const clickedButton = e.currentTarget;
        const language = clickedButton.dataset.lang;

        // Remover clase active de todos los botones de lenguaje
        this.languageButtons.forEach(btn => btn.classList.remove('active'));

        // Añadir clase active al botón clickeado
        clickedButton.classList.add('active');

        // Actualizar lenguaje seleccionado
        this.selectedLanguage = language;
        console.log(`Lenguaje seleccionado: ${language.toUpperCase()}`);

        // Cerrar panel después de seleccionar
        this.closePanel();
    }

    getSelectedLanguage() {
        return this.selectedLanguage;
    }
}

// ============================================
// FORMULARIO
// ============================================

class LoginForm {
    constructor() {
        this.form = document.getElementById('login-form');
        this.passwordInput = document.getElementById('password');
        this.togglePasswordBtn = document.getElementById('toggle-password');
        this.eyeIcon = document.getElementById('eye-icon');
        this.eyeOffIcon = document.getElementById('eye-off-icon');

        this.init();
    }

    init() {
        // Toggle mostrar/ocultar contraseña
        this.togglePasswordBtn.addEventListener('click', () => this.togglePasswordVisibility());

        // Prevenir envío del formulario (sin funcionalidad por ahora)
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === 'password';
        
        this.passwordInput.type = isPassword ? 'text' : 'password';
        this.eyeIcon.style.display = isPassword ? 'none' : 'block';
        this.eyeOffIcon.style.display = isPassword ? 'block' : 'none';
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = this.passwordInput.value;

        console.log('Formulario enviado (sin funcionalidad)');
        console.log('Email:', email);
        console.log('Password:', '•'.repeat(password.length));

        // Aquí puedes añadir lógica de autenticación en el futuro
        alert('Formulario enviado correctamente (sin funcionalidad por ahora)');
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animación de estrellas
    const starryBg = new StarryBackground();

    // Inicializar navegación
    const navigation = new Navigation();

    // Inicializar menú de lenguajes
    const languageMenu = new LanguageMenu();

    // Inicializar formulario
    const loginForm = new LoginForm();

    console.log('Portfolio inicializado correctamente');
    console.log(`Velocidad de estrellas: ${STAR_SPEED}`);
});
