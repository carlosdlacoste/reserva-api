const model = require('../models/reservations.model');
const spacesModel = require('../models/spaces.model');

async function create(req, res) {
    const { spaceId, date, startHour, duration } = req.body;
    const userId = req.userId;

    if (!userId || !spaceId || !date || typeof startHour !== 'number' || typeof duration !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    const space = spacesModel.getSpaceById(spaceId);
    if (!space) {
        return res.status(404).json({ error: 'Space not found' });
    }

    const totalUSD = space.basePrice * duration;

    // Obtener tipo de cambio desde API externa
    let exchangeRate;
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        exchangeRate = data.rates.VES;

        if (!exchangeRate) {
        return res.status(500).json({ error: 'VES rate not available from exchange API' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch exchange rate' });
    }

    const totalVES = Math.round(totalUSD * exchangeRate);

    // Simular cuotas (3 pagos semanales)
    const installments = [
        { dueDate: '2025-10-10', amount: Math.round(totalVES / 3) },
        { dueDate: '2025-10-17', amount: Math.round(totalVES / 3) },
        { dueDate: '2025-10-24', amount: Math.round(totalVES / 3) },
    ];

    const existingReservations = model.getAllReservations().filter(r =>
        r.spaceId === spaceId && r.date === date
    );

    const requestedStart = parseInt(startHour);
    const requestedEnd = requestedStart + parseInt(duration);

    const isOverlapping = existingReservations.some(r => {
        const existingStart = parseInt(r.startHour);
        const existingEnd = existingStart + parseInt(r.duration);
        return (
        requestedStart < existingEnd &&
        requestedEnd > existingStart
        );
    });

    if (isOverlapping) {
        return res.status(409).json({ error: 'Time slot not available' });
    }

    const reservation = model.createReservation({
        userId,
        spaceId,
        date,
        startHour,
        duration,
        totalUSD,
        totalVES,
        exchangeRate,
        installments,
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
