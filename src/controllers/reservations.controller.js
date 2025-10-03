const model = require('../models/reservations.model');

function create(req, res) {
    const { userId, spaceId, date, startHour, duration } = req.body;
    if (!userId || !spaceId || !date || typeof startHour !== 'number' || typeof duration !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    const reservation = model.createReservation({
        userId,
        spaceId,
        date,
        startHour,
        duration,
        totalVES: 0, // to be calculated later
        totalUSD: 0,
        installments: [],
    });

    res.status(201).json(reservation);
}

function list(req, res) {
    res.json(model.getAllReservations());
}

function get(req, res) {
    const reservation = model.getReservationById(parseInt(req.params.id));
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
}

function remove(req, res) {
    model.deleteReservation(parseInt(req.params.id));
    res.status(204).send();
}

module.exports = {
    create,
    list,
    get,
    remove,
};
