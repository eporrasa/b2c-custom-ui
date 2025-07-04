// passwordlessAutoSubmit.js
console.log("Script de auto-submit cargado");

const submitForm = () => {
    const form = document.querySelector("form[id='emailVerificationForm']");
    if (!form) {
        console.error("Formulario no encontrado");
        return;
    }

    console.log("Enviando formulario automáticamente");
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
        submitButton.click();
    } else {
        form.submit();
    }
};

const checkVerification = () => {
    // Método 1: Buscar texto de éxito
    const successText = Array.from(document.querySelectorAll("div"))
        .find(el => el.textContent.includes("verified") && getComputedStyle(el).display !== "none");

    // Método 2: Verificar si el campo de código desaparece
    const codeInput = document.getElementById("verificationCode");
    const isCodeHidden = codeInput && getComputedStyle(codeInput).display === "none";

    // Método 3: Buscar ícono de verificación
    const successIcon = document.querySelector("i.fa-check-circle, i.icon-success");

    if (successText || isCodeHidden || successIcon) {
        console.log("Verificación exitosa detectada");
        setTimeout(submitForm, 800); // Esperar 800ms para procesamiento interno
        return true;
    }

    return false;
};

// Verificar cada 500ms
const verificationInterval = setInterval(() => {
    if (checkVerification()) {
        clearInterval(verificationInterval);
    }
}, 500);

// También verificar cuando cambia el DOM
const observer = new MutationObserver(() => {
    checkVerification();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});