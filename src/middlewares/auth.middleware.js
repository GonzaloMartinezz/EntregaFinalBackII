const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const UserRepository = require('../repositories/User.repository');

const configureJWT = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          ExtractJWT.fromAuthHeaderAsBearerToken(),
          (req) => {
            return req.cookies?.jwtToken || null;
          },
        ]),
        secretOrKey: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
      },
      async (jwt_payload, done) => {
        try {
          const user = await UserRepository.getUserById(jwt_payload.id);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const generateJWT = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'tu_secreto_super_seguro',
    { expiresIn: '24h' }
  );
};

const verifyJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'No autorizado',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado. Se requieren permisos de administrador',
    });
  }

  next();
};

const verifyPremium = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'No autorizado',
    });
  }

  if (req.user.role !== 'premium' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado. Se requiere ser premium',
    });
  }

  next();
};

module.exports = {
  configureJWT,
  generateJWT,
  verifyJWT,
  verifyAdmin,
  verifyPremium,
};
