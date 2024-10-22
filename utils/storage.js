export function saveUser(userData) {
    try {
        const users = getUsers();
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        return false;
    }
}

export function getUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}
