let users = [];
let idCounter = 1;

function createUser(name, email, password) {
    const newUser = {
        id: idCounter++,
        name,
        email,
        password, // ToDo: Encriptar contraseñas
    };
    users.push(newUser);
    return newUser;
}

function getAllUsers() {
    return users;
}

function getUserById(id) {
    return users.find(u => u.id === id);
}

function updateUser(id, data) {
    const user = getUserById(id);
    if (user) {
        Object.assign(user, data);
    }
    return user;
}

function deleteUser(id) {
    users = users.filter(u => u.id !== id);
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
