const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usersModel = require('../models/users.model');

const SECRET = process.env.JWT_SECRET || 'secretkey';

function register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = usersModel.createUser(name, email, hashedPassword);
    res.status(201).json({ message: 'User registered', user });
}

function login(req, res) {
    const { email, password } = req.body;
    const user = usersModel.getAllUsers().find(u => u.email === email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
}

module.exports = {
    register,
    login,
};
