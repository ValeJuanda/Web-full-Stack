const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({
      success: false,
      data: null,
      mensaje: 'Token requerido'
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      data: null,
      mensaje: 'Token inválido o expirado'
    });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      data: null,
      mensaje: 'Acceso solo para administradores'
    });
  }
  next();
};

module.exports = { verificarToken, soloAdmin };