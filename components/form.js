export function renderForm(container) {
    const formHTML = `
        <div class="container animate__animated animate__fadeIn">
            <h1>Registro en TiendaModa</h1>
            <form id="register-form">
                <div class="form-group">
                    <label for="name">Nombre completo</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Ingresa tu nombre completo"
                        required
                    >
                    <p id="name-error" class="error"></p>
                </div>

                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="ejemplo@correo.com"
                        required
                    >
                    <p id="email-error" class="error"></p>
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Mínimo 8 caracteres"
                        required
                    >
                    <p id="password-error" class="error"></p>
                </div>

                <div class="form-group">
                    <label for="confirm-password">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        name="confirmPassword" 
                        placeholder="Repite tu contraseña"
                        required
                    >
                    <p id="confirm-password-error" class="error"></p>
                </div>

                <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="Ej: 123456789"
                        required
                    >
                    <p id="phone-error" class="error"></p>
                </div>

                <button type="submit">Registrarse</button>
            </form>
            <button class="toggle-users" id="toggle-users">Ver Usuarios Registrados</button>
            <div id="users-list" class="users-list" style="display: none;"></div>
        </div>
    `;
    container.innerHTML = formHTML;
}

export function renderUsersList(users) {
    const usersListContainer = document.getElementById('users-list');
    if (!usersListContainer) return;

    if (!users || users.length === 0) {
        usersListContainer.innerHTML = `
            <div class="user-card animate__animated animate__fadeIn">
                <p>No hay usuarios registrados todavía</p>
            </div>
        `;
        return;
    }

    const usersHTML = users.map((user, index) => `
        <div class="user-card animate__animated animate__fadeIn" style="animation-delay: ${index * 0.1}s">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Teléfono: ${user.phone}</p>
        </div>
    `).join('');

    usersListContainer.innerHTML = `
        <h2 class="users-title">Usuarios Registrados (${users.length})</h2>
        ${usersHTML}
    `;
}