const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const connectDB = require('./config/mongodb');
const { configureJWT } = require('./middlewares/auth.middleware');

const sessionsRoutes = require('./routes/sessions.routes');
const productsRoutes = require('./routes/products.routes');
const userRoutes = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

configureJWT();
app.use(passport.initialize());

app.use('/api/sessions', sessionsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend corriendo correctamente',
    endpoints: {
      sessions: '/api/sessions',
      products: '/api/products',
      users: '/api/users',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
  });
});

const startServer = async () => {
  try {
    connectDB().catch(err => {
      console.warn('MongoDB no disponible, continuando sin BD...');
    });

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error crítico:', error.message);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
