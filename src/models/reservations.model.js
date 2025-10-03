let reservations = [];
let idCounter = 1;

function createReservation(data) {
    const newReservation = { id: idCounter++, ...data };
    reservations.push(newReservation);
    return newReservation;
}

function getAllReservations() {
    return reservations;
}

function getReservationById(id) {
    return reservations.find(r => r.id === id);
}

function deleteReservation(id) {
    reservations = reservations.filter(r => r.id !== id);
}

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    deleteReservation,
};
