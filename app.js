// Importar los módulos necesarios
import { renderForm } from './components/form.js';
import { validateForm } from './utils/validation.js';
import { saveUser, getUsers } from './utils/storage.js';

// Obtener el elemento contenedor principal
const app = document.getElementById('app');

// Función de inicialización
function init() {
    console.log('Inicializando aplicación...');
    if (!app) {
        console.error('No se encontró el elemento #app');
        return;
    }

    // Renderizar el formulario
    renderForm(app);
    
    // Configurar eventos
    setupEventListeners();
    
    // Configurar el toggle del tema
    setupThemeToggle();
    
    console.log('Aplicación inicializada correctamente');
}

// Configurar los event listeners
function setupEventListeners() {
    const form = document.querySelector('#register-form');
    const toggleUsersBtn = document.querySelector('#toggle-users');
    
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    if (toggleUsersBtn) {
        toggleUsersBtn.addEventListener('click', handleToggleUsers);
    }
}

// Manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    const errors = validateForm(userData);
    if (Object.keys(errors).length === 0) {
        saveUser(userData);
        showSuccess();
        updateUsersList();
    } else {
        showErrors(errors);
    }
}

// Mostrar errores de validación
function showErrors(errors) {
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.classList.add('animate__animated', 'animate__shakeX');
        }
    });
}

// Mostrar mensaje de éxito
function showSuccess() {
    const successMessage = document.createElement('p');
    successMessage.textContent = '¡Registro exitoso!';
    successMessage.className = 'success animate__animated animate__fadeInUp';
    app.appendChild(successMessage);

    setTimeout(() => {
        successMessage.classList.add('animate__fadeOutUp');
        setTimeout(() => {
            successMessage.remove();
            document.querySelector('#register-form').reset();
        }, 500);
    }, 2500);
}

// Manejar la visualización de usuarios
function handleToggleUsers() {
    const usersList = document.querySelector('#users-list');
    if (!usersList) return;

    const isHidden = usersList.style.display === 'none' || !usersList.style.display;
    
    if (isHidden) {
        const users = getUsers();
        usersList.innerHTML = generateUsersHTML(users);
        usersList.style.display = 'block';
        usersList.classList.add('animate__animated', 'animate__fadeIn');
    } else {
        usersList.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(() => {
            usersList.style.display = 'none';
            usersList.classList.remove('animate__animated', 'animate__fadeOut');
        }, 500);
    }
}

// Generar HTML para la lista de usuarios
function generateUsersHTML(users) {
    if (!users.length) {
        return '<p class="no-users">No hay usuarios registrados</p>';
    }

    const usersHTML = users.map((user, index) => `
        <div class="user-card animate__animated animate__fadeIn" style="animation-delay: ${index * 0.1}s">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Teléfono: ${user.phone}</p>
        </div>
    `).join('');

    return `
        <h2 class="users-title">Usuarios Registrados (${users.length})</h2>
        ${usersHTML}
    `;
}

// Actualizar la lista de usuarios si está visible
function updateUsersList() {
    const usersList = document.querySelector('#users-list');
    if (usersList && usersList.style.display !== 'none') {
        const users = getUsers();
        usersList.innerHTML = generateUsersHTML(users);
    }
}

// Configuración del toggle de tema
function setupThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (!themeToggle) {
        console.error('No se encontró el botón de tema');
        return;
    }

    // Obtener tema actual
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

    // Evento de cambio de tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init);