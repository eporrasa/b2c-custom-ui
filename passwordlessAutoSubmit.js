// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configura un observador para detectar cambios en el DOM
    const observer = new MutationObserver(function(mutations) {
        // Busca el mensaje de verificación exitosa
        const successElement = document.querySelector('.verification-success-text');

        if (successElement && successElement.textContent.includes('verified')) {
            // Encuentra el formulario y envíalo automáticamente
            const form = document.getElementById('emailVerificationForm');
            if (form) {
                setTimeout(() => {
                    form.submit();
                }, 1000); // Espera 1 segundo para asegurar procesamiento
            }
        }
    });

    // Comienza a observar el cuerpo del documento
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});