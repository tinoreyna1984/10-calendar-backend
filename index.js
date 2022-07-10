// preparacion del servidor
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Crear el servidor de Express
const app = express();

// Base de datos -
dbConnection();

// CORS
app.use(cors());

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.get('*', (req, res) => {
    res.sendFile(__dirname, '/public/index.html');
}); // para que no se muestre error en el navegador

// Oye peticiones
app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})

