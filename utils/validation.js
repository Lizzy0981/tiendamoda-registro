export function validateForm(data) {
    const errors = {};

    // Validación del nombre
    if (!data.name || data.name.length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name)) {
        errors.name = 'El nombre solo debe contener letras';
    }

    // Validación del email
    if (!data.email || !isValidEmail(data.email)) {
        errors.email = 'Por favor, introduce un correo electrónico válido';
    }

    // Validación de la contraseña
    if (!data.password || data.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(data.password)) {
        errors.password = 'La contraseña debe contener al menos un número, una letra minúscula y una mayúscula';
    }

    // Validación de confirmación de contraseña
    if (data.password !== data.confirmPassword) {
        errors['confirm-password'] = 'Las contraseñas no coinciden';
    }

    // Validación del teléfono
    if (!data.phone || !/^\d{9,}$/.test(data.phone)) {
        errors.phone = 'Introduce un número de teléfono válido (mínimo 9 dígitos)';
    }

    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
