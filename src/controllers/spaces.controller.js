const model = require('../models/spaces.model');

function create(req, res) {
    const { name, type, basePrice } = req.body;
    if (!name || !type || typeof basePrice !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }
    const space = model.createSpace(name, type, basePrice);
    res.status(201).json(space);
}

function list(req, res) {
    res.json(model.getAllSpaces());
}

function get(req, res) {
    const space = model.getSpaceById(parseInt(req.params.id));
    if (!space) return res.status(404).json({ error: 'Space not found' });
    res.json(space);
}

function update(req, res) {
    const space = model.updateSpace(parseInt(req.params.id), req.body);
    if (!space) return res.status(404).json({ error: 'Space not found' });
    res.json(space);
}

function remove(req, res) {
    model.deleteSpace(parseInt(req.params.id));
    res.status(204).send();
}

module.exports = {
    create,
    list,
    get,
    update,
    remove,
};
