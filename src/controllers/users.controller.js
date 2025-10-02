const model = require('../models/users.model');

function create(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const user = model.createUser(name, email, password);
    res.status(201).json(user);
}

function list(req, res) {
    res.json(model.getAllUsers());
}

function get(req, res) {
    const user = model.getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
}

function update(req, res) {
    const user = model.updateUser(parseInt(req.params.id), req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
}

function remove(req, res) {
    model.deleteUser(parseInt(req.params.id));
    res.status(204).send();
}

module.exports = {
    create,
    list,
    get,
    update,
    remove,
};
