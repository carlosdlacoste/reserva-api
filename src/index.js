const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.routes')
const spacesRoutes = require('./routes/spaces.routes');
const authRoutes = require('./routes/auth.routes');
const reservationsRoutes = require('./routes/reservations.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/spaces', spacesRoutes);
app.use('/auth', authRoutes);
app.use('/reservations', reservationsRoutes);

app.get('/ping', (req, res) => {
    res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
