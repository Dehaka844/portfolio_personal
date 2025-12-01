// ============================================
// VALIDACIÓN Y FUNCIONALIDAD DEL FORMULARIO
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.subjectInput = document.getElementById('subject');
        this.phoneInput = document.getElementById('phone');
        this.messageInput = document.getElementById('message');
        this.termsCheckbox = document.getElementById('terms');
        this.submitBtn = document.querySelector('.submit-btn');
        this.formSuccess = document.getElementById('form-success');
        this.charCount = document.getElementById('char-current');

        this.init();
    }

    init() {
        // Event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.messageInput.addEventListener('input', (e) => this.updateCharCount(e));
        
        // Validación en tiempo real
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.subjectInput.addEventListener('blur', () => this.validateSubject());
        this.messageInput.addEventListener('blur', () => this.validateMessage());
        this.termsCheckbox.addEventListener('change', () => this.validateTerms());
    }

    // ============================================
    // VALIDACIONES
    // ============================================

    validateName() {
        const name = this.nameInput.value.trim();
        const errorElement = document.getElementById('name-error');

        if (name === '') {
            this.showError(this.nameInput, errorElement, 'El nombre es requerido');
            return false;
        } else if (name.length < 3) {
            this.showError(this.nameInput, errorElement, 'El nombre debe tener al menos 3 caracteres');
            return false;
        } else {
            this.clearError(this.nameInput, errorElement);
            return true;
        }
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            this.showError(this.emailInput, errorElement, 'El email es requerido');
            return false;
        } else if (!emailRegex.test(email)) {
            this.showError(this.emailInput, errorElement, 'Por favor, introduce un email válido');
            return false;
        } else {
            this.clearError(this.emailInput, errorElement);
            return true;
        }
    }

    validateSubject() {
        const subject = this.subjectInput.value.trim();
        const errorElement = document.getElementById('subject-error');

        if (subject === '') {
            this.showError(this.subjectInput, errorElement, 'El asunto es requerido');
            return false;
        } else if (subject.length < 5) {
            this.showError(this.subjectInput, errorElement, 'El asunto debe tener al menos 5 caracteres');
            return false;
        } else {
            this.clearError(this.subjectInput, errorElement);
            return true;
        }
    }

    validateMessage() {
        const message = this.messageInput.value.trim();
        const errorElement = document.getElementById('message-error');

        if (message === '') {
            this.showError(this.messageInput, errorElement, 'El mensaje es requerido');
            return false;
        } else if (message.length < 10) {
            this.showError(this.messageInput, errorElement, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        } else if (message.length > 500) {
            this.showError(this.messageInput, errorElement, 'El mensaje no puede exceder 500 caracteres');
            return false;
        } else {
            this.clearError(this.messageInput, errorElement);
            return true;
        }
    }

    validateTerms() {
        const errorElement = document.getElementById('terms-error');

        if (!this.termsCheckbox.checked) {
            this.showError(this.termsCheckbox, errorElement, 'Debes aceptar los términos');
            return false;
        } else {
            this.clearError(this.termsCheckbox, errorElement);
            return true;
        }
    }

    // ============================================
    // UTILIDADES DE ERROR
    // ============================================

    showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // ============================================
    // CONTADOR DE CARACTERES
    // ============================================

    updateCharCount(e) {
        const currentLength = e.target.value.length;
        this.charCount.textContent = Math.min(currentLength, 500);

        // Limitar a 500 caracteres
        if (currentLength > 500) {
            this.messageInput.value = this.messageInput.value.substring(0, 500);
            this.charCount.textContent = 500;
        }
    }

    // ============================================
    // ENVÍO DEL FORMULARIO
    // ============================================

    handleSubmit(e) {
        e.preventDefault();

        // Validar todos los campos
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isSubjectValid = this.validateSubject();
        const isMessageValid = this.validateMessage();
        const isTermsValid = this.validateTerms();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid && isTermsValid) {
            this.submitForm();
        }
    }

    submitForm() {
        // Desabilitar botón durante el envío
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Enviando...';

        // Simular envío (en producción, aquí irían los datos al servidor)
        setTimeout(() => {
            // Recopilar datos del formulario
            const formData = {
                name: this.nameInput.value,
                email: this.emailInput.value,
                subject: this.subjectInput.value,
                phone: this.phoneInput.value,
                message: this.messageInput.value
            };

            console.log('Formulario enviado:', formData);

            // Mostrar mensaje de éxito
            this.showSuccess();

            // Resetear formulario
            this.form.reset();
            this.charCount.textContent = 0;

            // Limpiar errores
            this.form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
                input.classList.remove('error');
            });
            this.form.querySelectorAll('.form-error').forEach(error => {
                error.classList.remove('show');
            });

            // Reabilitar botón
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = '<span class="btn-text">Enviar Mensaje</span><span class="btn-icon">→</span>';

            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                this.formSuccess.style.display = 'none';
            }, 5000);
        }, 1500);
    }

    showSuccess() {
        this.formSuccess.style.display = 'flex';
        this.formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactForm();
    console.log('Formulario de contacto inicializado');
});
