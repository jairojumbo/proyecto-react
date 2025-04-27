const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let users = [];

// Obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// Añadir nuevo usuario
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  users.push(name);
  res.status(201).json({ message: 'Usuario añadido', users });
});


// Eliminar usuario
app.delete('/users/:name', (req, res) => {
  const { name } = req.params;
  const initialLength = users.length;
  users = users.filter(user => user !== name);
  
  if (users.length === initialLength) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  res.json({ message: 'Usuario eliminado', users });
});

// Actualizar usuario
app.put('/users/:name', (req, res) => {
  const { name } = req.params;
  const { name: newName } = req.body;

  if (!newName) {
    return res.status(400).json({ error: 'El nuevo nombre es requerido' });
  }

  const userIndex = users.findIndex(user => user === name);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users[userIndex] = newName;
  res.json({ message: 'Usuario actualizado', users });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});