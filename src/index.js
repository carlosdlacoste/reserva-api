const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.routes')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

app.get('/ping', (req, res) => {
    res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
