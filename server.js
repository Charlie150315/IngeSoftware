const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital_auth'
});

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

// Ruta de inicio de sesión
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = results[0];
    res.json({ message: 'Inicio de sesión exitoso', user });
  });
});

// 🚀 Iniciar servidor
const PORT = 3600;
app.listen(PORT, () => {
  console.log(`Servidor de autenticación corriendo en http://localhost:${PORT}`);
});

