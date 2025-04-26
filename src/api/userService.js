import axios from 'axios';

const API_URL = 'http://ip172-18-0-33-d06diviim2rg00dab3ug-4000.direct.labs.play-with-docker.com/users'; // URL del backend

// Obtener todos los usuarios
export const getUsers = () => {
  return axios.get(API_URL);
};

// Añadir un usuario
export const addUser = (name) => {
  return axios.post(API_URL, { name });
};

// Eliminar un usuario
export const deleteUser = (name) => {
  return axios.delete(`${API_URL}/${name}`);
};
