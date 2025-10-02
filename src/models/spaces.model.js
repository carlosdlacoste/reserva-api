let spaces = [];
let idCounter = 1;

function createSpace(name, type, basePrice) {
    const newSpace = {
        id: idCounter++,
        name,
        type,
        basePrice,
    };
    spaces.push(newSpace);
    return newSpace;
}

function getAllSpaces() {
    return spaces;
}

function getSpaceById(id) {
    return spaces.find(s => s.id === id);
}

function updateSpace(id, data) {
    const space = getSpaceById(id);
    if (space) {
        Object.assign(space, data);
    }
    return space;
}

function deleteSpace(id) {
    spaces = spaces.filter(s => s.id !== id);
}

module.exports = {
    createSpace,
    getAllSpaces,
    getSpaceById,
    updateSpace,
    deleteSpace,
};
