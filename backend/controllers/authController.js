const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const registro = async (req, res) => {
  const { usuario, password, rol } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Usuario y contraseña son obligatorios'
    });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
      [usuario, hash, rol || 'usuario']
    );
    res.status(201).json({
      success: true,
      data: null,
      message: 'Usuario creado correctamente'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'El usuario ya existe'
      });
    }
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al registrar usuario'
    });
  }
};

const login = async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Usuario y contraseña son obligatorios'
    });
  }
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Credenciales incorrectas'
      });
    }
    const esValido = await bcrypt.compare(password, rows[0].password);
    if (!esValido) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Credenciales incorrectas'
      });
    }
    const token = jwt.sign(
      { id: rows[0].id, usuario: rows[0].usuario, rol: rows[0].rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.status(200).json({
      success: true,
      data: {
        token,
        usuario: rows[0].usuario,
        rol: rows[0].rol,
        imagen: rows[0].imagen
      },
      message: 'Login exitoso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error en el servidor'
    });
  }
};

module.exports = { registro, login };