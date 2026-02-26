const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const connectDB = require('./config/mongodb');
const { configureJWT } = require('../src/middlewares/auth.middleware');

// Importación de Rutas
// Cambia estas líneas según cómo se llamen tus archivos REALMENTE:
const sessionsRoutes = require('../src/routes/sessions.routes'); // ¿Es .router o .routes?
const productsRoutes = require('../src/routes/products.routes'); // ¿Es .router o .routes?
const cartsRoutes    = require('../src/routes/carts.router');    // ¿C mayúscula o minúscula?
const userRoutes = require('../src/routes/users.routes');

const app = express();

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de Passport y JWT
configureJWT();
app.use(passport.initialize());

// Conexión a Base de Datos
connectDB();

// Rutas de la API
app.use('/api/sessions', sessionsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes); // <--- CONECTADO
app.use('/api/users', userRoutes);

// Endpoint de estado
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend Ecommerce - Coderhouse Final',
    status: 'Running',
    version: '2.0.0 (Arquitectura Profesional)'
  });
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
  });
});

// Configuración del Puerto
const PORT = process.env.PORT || 8080;

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`
  ✅ Servidor corriendo en el puerto ${PORT}
  🔗 http://localhost:${PORT}
  🚀 Arquitectura: DAO/DTO/Repository/Mailing
  `);
});

// Exportar app (Importante para tests y para el entry point)
module.exports = app;