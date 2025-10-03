const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretkey';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
